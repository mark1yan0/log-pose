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
    // TODO: refacotr
    shapes: {
        fill: '#542341'
    },
    marker: {
        icon: 'pin',
        color: '#542341',
        label: 'Pin'
    },
    countries: {
        styles: {
            default: {
                weight: 2,
                opacity: 1,
                // border collor
                color: 'black', // TODO: dynamic
                dashArray: '3',
                fillOpacity: 0.4,
                fillColor: '#123' // feature.properties.style.fillColor
            },
            hover: {
                weight: 5,
                // border color
                color: '#FFF',
                dashArray: '',
                fillOpacity: 0.7
            }
        }
    }
} as const;

export default defaults;
