import type { IData, IPlace } from "$types/data";
import { toast } from "svelte-sonner";
import countries from "../assets/countries.geo.json";
import type { IQuery } from "$types/query";

class PlacesManager {
    private static instance: PlacesManager;
    private key = "logpose:data";
    private places: IPlace[] = $state(this.persisted().places);
    private geojson: typeof countries = $state(this.persisted().geojson);

    constructor() {}

    public static getInstance(): PlacesManager {
        if (!PlacesManager.instance) {
            PlacesManager.instance = new PlacesManager();
        }
        return PlacesManager.instance;
    }

    // methods
    public async search(q: string): Promise<IQuery<IPlace[]>> {
        if (!q) {
            return {
                isLoading: false,
                error: null,
                data: null,
            };
        }

        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${q}&format=json&addressdetails=1`,
                {
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept-Language": "en",
                    },
                },
            );

            const data: IData[] = await res.json();

            return {
                isLoading: false,
                error: null,
                data: data.map<IPlace>((d) => ({
                    position: this.getMarkerPosition(d),
                    data: d,
                    style: {
                        fillColor: "#542341",
                    },
                })),
            };
        } catch (error) {
            console.error(error);
            return {
                isLoading: false,
                error: error as Error,
                data: null,
            };
        }
    }

    /**
     * If in search mode, will return the preview, othrwize all saved
     */
    public all() {
        return this.places;
    }

    public add(place: IPlace) {
        this.places.push(place);

        this.updateGeoJSON(place);
        this.persist();
        toast.success(`Place "${place.data.name}" added successfully`);
    }

    public delete(place: IPlace) {
        const idx = this.places.findIndex(
            (p) => p.data.place_id === place.data.place_id,
        );

        this.places.splice(idx, 1);

        // remove geojson if no country anymore
        const curr = this.places.map((p) => p.data.address.country);
        const featureByContry = this.geojson.features.map(
            (f) => f.properties.name,
        );
        for (const c of featureByContry) {
            if (!curr.includes(c)) {
                this.geojson.features = this.geojson.features.filter(
                    (f) => f.properties.name !== c,
                );
            }
        }

        this.persist();
        toast.success(`Place "${place.data.name}" removed successfully`);
    }

    public getGeoJSON() {
        return this.geojson;
    }

    // private
    private persist() {
        localStorage.setItem(
            this.key,
            JSON.stringify({
                places: this.places,
                geojson: this.geojson,
            }),
        );
    }

    private persisted(): {
        places: IPlace[];
        geojson: typeof countries;
    } {
        const persisted = localStorage.getItem(this.key);
        if (!persisted) {
            return {
                places: [],
                geojson: {
                    type: "FeatureCollection",
                    features: [],
                },
            };
        }

        return JSON.parse(persisted);
    }

    private getMarkerPosition(place: IData): [number, number] {
        return [parseFloat(place.lat), parseFloat(place.lon)];
    }

    private updateGeoJSON(place: IPlace) {
        if (
            this.geojson.features.find(
                (f) => f.properties.name === place.data.address.country,
            )
        ) {
            // is already in there. skip
            return this.geojson;
        }

        const found = countries.features.find(
            (f) => f.properties.name === place.data.address.country,
        );

        if (!found) {
            return this.geojson;
        }

        this.geojson.features.push(found);
    }
}

export default PlacesManager.getInstance();
