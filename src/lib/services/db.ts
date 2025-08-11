import type { IPlace } from '$lib/types/pose';
import Dexie, { type EntityTable } from 'dexie';

// TODO: put in separate file
interface ICountry {
    type: 'Feature';
    id: string;
    properties: {
        name: string;
        places: IPlace[];
        saved: boolean;
        style: {
            color?: string;
            dashArray?: string;
            fillColor?: string;
            fillOpacity?: string;
            opacity?: string;
            weight?: string;
        } | null;
        created_at: string | null;
        updated_at: string | null;
    };
    geometry: {
        type: 'Polygon';
        coordinates: unknown[];
    };
}

const db = new Dexie('LogPose:Countries') as Dexie & {
    countries: EntityTable<
        ICountry,
        'id' // primary key "id" (for the typings only)
    >;
};

// Schema declaration:
db.version(1).stores({
    countries: '++id, properties.name, properties.saved' // primary key "id" (for the runtime!)
});

export type { ICountry };
export { db };
