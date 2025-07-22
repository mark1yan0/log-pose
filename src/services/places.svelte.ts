import type { IData, IPlace } from "$types/data";
import { toast } from "svelte-sonner";
import countries from "../assets/countries.geo.json";

class PlacesManager {
    private static instance: PlacesManager;
    private key = "logpose:data";

    private found: IData[] | null = $state(null);
    private places: IPlace[] = $state(this.persisted());

    constructor() {}

    public static getInstance(): PlacesManager {
        if (!PlacesManager.instance) {
            PlacesManager.instance = new PlacesManager();
        }
        return PlacesManager.instance;
    }

    // methods
    public async query(q: string) {
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

        this.found = await res.json();
    }

    /**
     * If in search mode, will return the preview, othrwize all saved
     */
    public all() {
        if (this.found && this.found.length > 0) {
            return [
                {
                    position: this.getMarkerPosition(this.found[0]),
                    data: this.found[0],
                    countryShape: this.getGeoJSON(this.found[0]),
                },
            ];
        }

        return this.places;
    }

    public add() {
        if (!this.found) {
            return null;
        }

        const place = this.found[0];
        this.places.push({
            position: this.getMarkerPosition(place),
            data: place,
            countryShape: this.getGeoJSON(place),
        });

        this.found = null;
        this.persist();
        toast.success(`Place "${place.name}" added successfully`);
    }

    public delete(place: IPlace) {
        const idx = this.places.findIndex(
            (p) => p.data.place_id === place.data.place_id,
        );
        this.places.splice(idx, 1);
        this.persist();
        toast.success(`Place "${place.data.name}" removed successfully`);
    }

    public preview() {
        if (!this.found) {
            return null;
        }

        return [
            {
                position: this.getMarkerPosition(this.found[0]),
                data: this.found[0],
                // TODO: refactor
                countryShape: this.getGeoJSON(this.found[0]),
            },
        ];
    }

    public isPreview() {
        return !!this.found;
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
