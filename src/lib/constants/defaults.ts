import type { IGeometryStyle } from '$lib/services/db/models/country';
import type { LatLngExpression } from 'leaflet';

const defaults = {
	map: {
		center: [37.530697, 15.079602] as LatLngExpression,
		zoom: 4,
		maxZoom: 19,
		url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
		attribution:
			"&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
	},
	countries: {
		styles: {
			default: {
				weight: 2,
				opacity: 1,
				// border color
				color: 'black',
				dashArray: 3,
				fillOpacity: 0.4,
				fillColor: '#123'
			},
			hover: {
				weight: 5,
				opacity: 1,
				// border color
				color: '#FFF',
				dashArray: 0,
				fillOpacity: 0.7,
				fillColor: '#123'
			}
		} as Record<'default' | 'hover', IGeometryStyle>
	}
} as const;

export default defaults;
