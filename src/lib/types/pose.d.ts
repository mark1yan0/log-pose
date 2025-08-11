/**
 * Interface of a saved country
 */
export interface IPose {
    places: IPlace[];
    style: {
        fillColor: string | null;
        borderColor: string | null;
    };
    created_at: string;
    updated_at: string;
}

export interface IPlaceDetails {
    address: {
        'ISO3166-2-lvl4': string;
        'ISO3166-2-lvl6'?: string;
        borough?: string;
        city: string;
        country: string;
        country_code: string;
        county?: string;
        state?: string;
        historic?: string;
        house_number?: string;
        neighbourhood?: string;
        postcode?: string;
        road?: string;
        suburb?: string;
        district?: string;
        municipality?: string;
        state_district?: string;
    };
    addresstype: string;
    boundingbox: string[];
    class: string;
    display_name: string;
    importance: number;
    lat: string;
    licence: 'Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright';
    lon: string;
    name: string;
    osm_id: number;
    osm_type: string;
    place_id: number;
    place_rank: number;
    type: string;
}

export interface IPlace {
    details: IPlaceDetails;
    position: [number, number];
    marker: IMarker;
}

// map markers
export type TMarkerIcon = 'pin' | 'city' | 'sea' | 'mountains';

export interface IMarker {
    icon: TMarkerIcon;
    color: string;
    label: string;
}

export interface IPlaceOptions {
    style?: { fillColor: color };
    marker?: IMarker;
}
