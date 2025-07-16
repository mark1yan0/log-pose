<script lang="ts">
    import { Map, TileLayer, GeoJSON, Marker } from "sveaflet";
    import type {
        GeoJSON as TGeoJSON,
        Layer,
        Map as TMap,
        LeafletMouseEvent,
    } from "leaflet";
    import data from "../../assets/countries.geo.json";
    import type { IData } from "../../interafaces/data";

    const props: {
        places?: {
            position: [number, number];
            data: IData;
        }[];
    } = $props();

    let geojson: TGeoJSON = $state();
    let map: TMap = $state();

    function getVisited(country: string): typeof data {
        const found = data.features.find((f) => f.properties.name === country);

        if (!found) {
            return {
                type: "FeatureCollection",
                features: [],
            };
        }

        return {
            type: "FeatureCollection",
            features: [found],
        };
    }

    function style(_) {
        return {
            weight: 2,
            opacity: 1,
            color: "black",
            dashArray: "3",
            fillOpacity: 0.4,
            fillColor: "#542341",
        };
    }

    function onEachFeature(_, layer: Layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature,
        });
    }

    function highlightFeature(e: LeafletMouseEvent) {
        const layer = e.target;

        layer.setStyle({
            weight: 5,
            color: "#666",
            dashArray: "",
            fillOpacity: 0.7,
        });

        layer.bringToFront();
    }

    function resetHighlight(e: LeafletMouseEvent) {
        geojson.resetStyle(e.target);
    }

    function zoomToFeature(e: LeafletMouseEvent) {
        map.fitBounds(e.target.getBounds());
    }
</script>

<Map options={{ center: [37.530697, 15.079602], zoom: 4 }} bind:instance={map}>
    {#if props.places && props.places.length > 0}
        {#each props.places as place}
            <Marker latLng={place.position} />
        {/each}
    {/if}
    <TileLayer
        url={"https://tile.openstreetmap.org/{z}/{x}/{y}.png"}
        options={{
            maxZoom: 19,
            attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }}
    />
    {#if props.places && props.places.length > 0}
        {#each props.places as place}
            <GeoJSON
                bind:instance={geojson}
                json={getVisited(place.data.address.country)}
                options={{
                    style,
                    onEachFeature,
                }}
            />
        {/each}
    {/if}
</Map>
