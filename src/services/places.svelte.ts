import type { IData, IPlace } from "$types/data";
import { toast } from "svelte-sonner";
import countries from "../assets/countries.geo.json";
import type { IQuery } from "$types/query";

class PlacesManager {
    private static instance: PlacesManager;
    private key = "logpose:data";
    private places: IPlace[] = $state(this.persisted());

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
                    countryShape: this.getGeoJSON(d),
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

        this.persist();
        toast.success(`Place "${place.data.name}" added successfully`);
    }

    public delete(place: IPlace) {
        const idx = this.places.findIndex(
            (p) => p.data.place_id === place.data.place_id,
        );
        this.places.splice(idx, 1);
        this.persist();
        toast.success(`Place "${place.data.name}" removed successfully`);
    }

    // private
    private persist() {
        localStorage.setItem(this.key, JSON.stringify(this.places));
    }

    private persisted(): IPlace[] {
        const persisted = localStorage.getItem(this.key);
        if (!persisted) {
            return [];
        }

        return JSON.parse(persisted);
    }

    private getMarkerPosition(place: IData): [number, number] {
        return [parseFloat(place.lat), parseFloat(place.lon)];
    }

    private getGeoJSON(place: IData) {
        // TODO: must be enhaced. For example we can find the same city in a country
        // TODO: multiple countries
        const found = countries.features.find(
            (f) => f.properties.name === place.address.country,
        );

        if (!found) {
            return {
                type: "FeatureCollection",
                features: [],
            };
        }

        return {
            type: "FeatureCollection",
            features: [found],
        };
    }
}

export default PlacesManager.getInstance();
