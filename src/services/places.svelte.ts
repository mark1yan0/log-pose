import type { IData, IPlace } from "../types/data";
import countries from "../assets/countries.geo.json";

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
    public get() {
        return this.places;
    }

    public add(place: IData) {
        this.places.push({
            position: this.getParkerPosition(place),
            data: place,
            countryShape: this.getGeoJSON(place),
        });

        this.persist();
    }

    public delete(place: IPlace) {
        const idx = this.places.findIndex(
            (p) => p.data.place_id === place.data.place_id,
        );
        this.places.splice(idx, 1);
        this.persist();
    }

    public preview(place: IData) {
        return [
            {
                position: this.getParkerPosition(place),
                data: place,
                countryShape: this.getGeoJSON(place),
            },
        ];
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

    private getParkerPosition(place: IData): [number, number] {
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
