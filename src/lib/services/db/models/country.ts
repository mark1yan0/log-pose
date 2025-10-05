/**
 * The country coords are in a saparate table and
 * then joined in a query
 */
export interface ICountryModel {
	type: 'Feature';
	id: number;
	properties: {
		name: string;
		saved: boolean;
		style: IGeometryStyle;
		created_at: string | null;
		updated_at: string | null;
	};
	geometry: {
		type: 'Polygon';
		// coordinates: unknown[];
	};
}

// TODO: better interface
/**
 * The country coords are in a saparate table and
 * then joined in a query
 */
export interface ICountry {
	type: 'Feature';
	id: number;
	properties: {
		name: string;
		// places: IPlace[];
		saved: boolean;
		style: IGeometryStyle;
		created_at: string | null;
		updated_at: string | null;
	};
	geometry: {
		type: 'Polygon';
		coordinates: unknown[];
	};
}

export interface ICountrySource {
	type: 'Feature';
	id: number;
	properties: {
		NAME: string;
	};
	geometry: {
		type: 'Polygon';
		coordinates: unknown[];
	};
}

export interface IGeometryStyle {
	color: string;
	dashArray: number;
	fillColor: string;
	fillOpacity: number;
	opacity: number;
	weight: number;
}
