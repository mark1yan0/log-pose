import countries from '$lib/assets/countries.geo.json';
import { db, type ICountry } from './db';

class CountriesManager {
    private static instance: CountriesManager;
    constructor() {}

    public static getInstance(): CountriesManager {
        if (!CountriesManager.instance) {
            CountriesManager.instance = new CountriesManager();
        }
        return CountriesManager.instance;
    }

    /**
     * Initializes map with Countries
     * If not already set, adds coutries to indexedDB from a file
     * On initial load, no countries are selected
     */
    public async init() {
        if ((await db.countries.count()) > 0) {
            console.log('Countries already filled');
            return;
        }

        const enriched = countries.features.map((f) => ({
            ...f,
            properties: {
                ...f.properties,
                places: [],
                saved: false,
                style: null,
                created_at: null,
                updated_at: null
            }
        }));
        await db.countries.bulkAdd(enriched as ICountry[]);
    }

    public async geojson() {
        const features = await this.all();
        return {
            type: 'FeatureCollection',
            features
        };
    }
    public async all() {
        return await db.countries.toArray();
    }

    public async getById(id: string) {
        return await db.countries.get(id);
    }

    /**
     * All countires are already in the db. This method updates the specific country properties
     */
    public async add(id: string, c: ICountry) {
        await db.countries.update(id, c);
    }
}

const countriesManager = CountriesManager.getInstance();

export default countriesManager;
