import source from '$lib/assets/countries.geo.v2.json';
import { toast } from 'svelte-sonner';
import {
	db,
	type ICoordinateModel,
	type ICountry,
	type ICountryModel,
	type ICountrySource
} from './db';
import defaults from '$lib/constants/defaults';

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
	 * Initializes map Countries and Coordinates DB
	 * If not already set, seeds coutries to indexedDB from a file
	 * On initial load, no countries are selected
	 */
	public async init() {
		if ((await db.countries.count()) > 0) {
			console.log('Countries already filled');
			return;
		}

		const parsedCountries: Omit<ICountryModel, 'id'>[] = [];
		const parsedCoords: Omit<ICoordinateModel, 'id'>[] = [];

		const features = source.features as ICountrySource[];
		features.forEach((f, i) => {
			parsedCountries.push({
				...f,
				geometry: {
					type: f.geometry.type
				},
				properties: {
					name: f.properties.NAME,
					saved: false,
					style: defaults.countries.styles.default,
					created_at: null,
					updated_at: null
				}
			});

			parsedCoords.push({
				countryId: i + 1,
				data: f.geometry.coordinates
			});
		});

		await db.countries.bulkAdd(parsedCountries);
		await db.coordinates.bulkAdd(parsedCoords);
	}

	public async geojson() {
		const features = await this.all();
		return {
			type: 'FeatureCollection',
			features
		};
	}

	// TODO: implement some caching
	public async all() {
		// handled like this because coords where giving errors on record updates
		const countries = await db.countries.toArray();
		const coords = await db.coordinates.toArray();

		return countries.map((country) => ({
			...country,
			geometry: {
				type: country.geometry.type,
				coordinates: coords.find((c) => c.countryId === country.id)?.data || []
			}
		}));
	}

	// TODO: error handling
	public async getById(id: number) {
		const found = await db.countries.get(id);

		if (!found) {
			throw new Error(`Country with id ${id} not found`);
		}

		const coords = await db.coordinates.where('countryId').equals(id).first();

		if (!coords) {
			throw new Error(`Coordinates for country with id ${id} not found`);
		}

		return {
			...found,
			geometry: {
				type: found.geometry.type,
				coordinates: coords.data
			}
		};
	}

	/**
	 * All countires are already in the db. This method updates the specific country properties
	 */
	public async save(c: ICountry | null) {
		try {
			if (!c) {
				throw new Error('No selected country to save found');
			}

			// const fill = c.properties.style.fillColor === defaults.countries.styles.default.fillColor ? '#2596be' :
			await db.countries.update(c.id, {
				properties: {
					...c.properties,
					saved: true,
					created_at: new Date().toISOString(),
					updated_at: new Date().toISOString(),
					style: {
						...c.properties.style
					}
				}
			});
			toast.success(`Country ${c.properties.name} saved`);
		} catch (error) {
			console.error(error);
			toast.error(`Failed to save country ${c.properties.name}`);
		}
	}

	public async delete(c: ICountry | null) {
		try {
			if (!c) {
				throw new Error('No selected country to delete found');
			}

			await db.countries.update(c.id, {
				properties: {
					...c.properties,
					saved: false,
					created_at: null,
					updated_at: null,
					style: defaults.countries.styles.default
				}
			});
			toast.success(`Country ${c.properties.name} deleted`);
		} catch (error) {
			console.error(error);
			toast.error(`Failed to save country ${c.properties.name}`);
		}
	}

	public async countSaved() {
		// TODO: Implement countSaved method
		return await db.countries.filter((m) => m.properties.saved).count();
	}
}

const countriesManager = CountriesManager.getInstance();

export default countriesManager;
