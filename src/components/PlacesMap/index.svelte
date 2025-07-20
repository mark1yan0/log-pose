<script lang="ts">
    import { Map, TileLayer, GeoJSON, Marker, Popup } from "sveaflet";
    import type {
        GeoJSON as TGeoJSON,
        Layer,
        Map as TMap,
        LeafletMouseEvent,
    } from "leaflet";
    import type { IPlace } from "$types/data";
    import placesManager from "$services/places.svelte";

    const props: {
        places: IPlace[] | null;
    } = $props();

    let geojson: TGeoJSON | undefined = $state();
    let map: TMap | undefined = $state();

    function style(_: unknown) {
        return {
            weight: 2,
            opacity: 1,
            color: "black",
            dashArray: "3",
            fillOpacity: 0.4,
            fillColor: "#542341",
        };
    }

    function onEachFeature(_: unknown, layer: Layer) {
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
        if (!geojson) {
            return;
        }

        geojson.resetStyle(e.target);
    }

    function zoomToFeature(e: LeafletMouseEvent) {
        if (!map) {
            return;
        }

        map.fitBounds(e.target.getBounds());
    }
</script>

<Map options={{ center: [37.530697, 15.079602], zoom: 4 }} bind:instance={map}>
    {#if props.places && props.places.length > 0}
        {#each props.places as place}
            <Marker
                latLng={place.position}
                options={{
                    riseOnHover: true,
                }}
            >
                <Popup>
                    <button onclick={() => placesManager.delete(place)}>
                        delete
                    </button>
                </Popup>
            </Marker>
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
                json={place.countryShape}
                options={{
                    style,
                    onEachFeature,
                }}
            />
        {/each}
    {/if}
</Map>
