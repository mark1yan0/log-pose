import type { IData, IMarker, IPlace, IPlaceOptions } from "$types/data";
import type { GeoJSON } from "leaflet";
import { toast } from "svelte-sonner";
import countries from "../assets/countries.geo.json";
import type { IQuery } from "$types/query";
import apiEndpoints from "$lib/constants/api";

class PlacesManager {
    private static instance: PlacesManager;
    private key = "logpose:data";
    private places: IPlace[] = $state(this.persisted().places);
    private defaultMarker: IMarker = {
        icon: "pin",
        color: "blue", // TODO:
        label: "Pin",
    };

    public geojson: {
        instance: GeoJSON | undefined;
        shapes: typeof countries.features;
    } = $state({
        instance: undefined,
        shapes: this.persisted().shapes,
    });

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
            const res = await fetch(apiEndpoints.geocoding(q), {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Accept-Language": "en",
                },
            });

            const data: IData[] = await res.json();

            return {
                isLoading: false,
                error: null,
                data: data.map<IPlace>((d) => ({
                    position: this.getMarkerPosition(d),
                    data: d,
                    marker: this.defaultMarker,
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

    public add(place: IPlace, config?: IPlaceOptions) {
        if (config?.marker) {
            place.marker = config.marker;
        }

        this.places.push(place);

        this.updateGeoJSON(place, config);
        this.persist();
        toast.success(`Place "${place.data.name}" added successfully`);
    }

    public delete(place: IPlace) {
        const idx = this.places.findIndex(
            (p) => p.data.place_id === place.data.place_id,
        );

        this.places.splice(idx, 1);

        // TODO: refactor
        // remove geojson if no country anymore
        const curr = this.places.map((p) => p.data.address.country);
        const featureByContry = this.geojson.shapes.map(
            (f) => f.properties.name,
        );
        for (const c of featureByContry) {
            if (!curr.includes(c)) {
                // TODO: handle
                const feature = this.geojson.shapes.find(
                    (s) => s.properties.name === c,
                );
                // TODO: solve issue where is removed only on reload
                this.geojson.instance?.removeLayer(feature);
                this.geojson.shapes = this.geojson.shapes.filter(
                    (f) => f.properties.name !== c,
                );
            }
        }

        this.persist();
        toast.success(`Place "${place.data.name}" removed successfully`);
    }

    public getGeojson() {
        return {
            type: "FeatureCollection",
            features: this.geojson.shapes,
        };
    }

    // private
    private persist() {
        localStorage.setItem(
            this.key,
            JSON.stringify({
                places: this.places,
                shapes: this.geojson.shapes,
            }),
        );
    }

    private persisted(): {
        places: IPlace[];
        shapes: typeof countries.features;
    } {
        const persisted = localStorage.getItem(this.key);
        if (!persisted) {
            return {
                places: [],
                shapes: [],
            };
        }

        return JSON.parse(persisted);
    }

    private getMarkerPosition(place: IData): [number, number] {
        return [parseFloat(place.lat), parseFloat(place.lon)];
    }

    private updateGeoJSON(place: IPlace, config?: IPlaceOptions) {
        if (
            !this.geojson.instance ||
            this.geojson.shapes.find(
                (f) => f.properties.name === place.data.address.country,
            )
        ) {
            // is already in there. skip
            return;
        }

        const found = countries.features.find(
            (f) => f.properties.name === place.data.address.country,
        );

        if (!found) {
            return;
        }

        // defaults
        if (!config) {
            config = { style: { fillColor: "#000000" } };
        }

        const newFeature = {
            ...found,
            properties: {
                ...found.properties,
                style: config.style,
            },
        };
        this.geojson.shapes.push(newFeature);
        this.geojson.instance.addData(newFeature);
    }
}

export default PlacesManager.getInstance();
