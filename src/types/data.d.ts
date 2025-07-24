// TODO: rename
export interface IData {
    address: {
        "ISO3166-2-lvl4": string;
        "ISO3166-2-lvl6": string;
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
    };
    addresstype: string;
    boundingbox: string[];
    class: string;
    display_name: string;
    importance: number;
    lat: string;
    licence: "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright";
    lon: string;
    name: string;
    osm_id: number;
    osm_type: string;
    place_id: number;
    place_rank: number;
    type: string;
}

export interface IPlace {
    data: IData; // TODO: change to details?
    position: [number, number];
}
