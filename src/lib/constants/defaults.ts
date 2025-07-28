import type { LatLngExpression } from "leaflet";

const defaults = {
    map: {
        center: [37.530697, 15.079602] as LatLngExpression,
        zoom: 4,
        maxZoom: 19,
        url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution:
            "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
    },
    shapes: {
        fill: "#542341",
    },
    marker: {
        icon: "pin",
        color: "#542341",
        label: "Pin",
    },
} as const;

export default defaults;
