import Dexie, { type EntityTable } from 'dexie';
import type { ICountry, ICountryModel, ICountrySource } from './models/country';
import type { ICoordinateModel } from './models/coords';

const db = new Dexie('LogPose:Countries') as Dexie & {
	countries: EntityTable<
		ICountryModel,
		'id' // primary key "id" (for the typings only)
	>;
	coordinates: EntityTable<
		ICoordinateModel,
		'id' // primary key "id" (for the typings only)
	>;
};

// Schema declaration:
db.version(1).stores({
	countries: '++id, properties.saved', // primary key "id" (for the runtime!)
	coordinates: '++id, countryId' // primary key "id" (for the runtime!)
});

export type { ICountryModel, ICoordinateModel, ICountry, ICountrySource };
export { db };
