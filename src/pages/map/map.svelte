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

    let map: TMap | undefined = $state();

    function style(feature: {
        properties: {
            name: string;
            style: {
                fillColor: string;
            };
        };
    }) {
        return {
            weight: 2,
            opacity: 1,
            // border collor
            color: "black", // TODO: dynamic
            dashArray: "3",
            fillOpacity: 0.4,
            fillColor: feature.properties.style.fillColor, // TODO: solve
        };
    }

    function hoverShape(e: LeafletMouseEvent) {
        const layer = e.target;

        layer.setStyle({
            weight: 5,
            // border color
            color: "#FFF",
            dashArray: "",
            fillOpacity: 0.7,
        });

        // update cursor size on mouseover
        document.documentElement.style.setProperty("--cursor-size", "1.5rem");
        layer.bringToFront();
    }

    function outOfShape(e: LeafletMouseEvent) {
        if (!placesManager.geojson.instance) {
            return;
        }

        // update cursor size on mouseout
        document.documentElement.style.setProperty("--cursor-size", "2rem");
        placesManager.geojson.instance.resetStyle(e.target);
    }

    function onShapeClick(e: LeafletMouseEvent) {
        if (!map) {
            return;
        }

        map.fitBounds(e.target.getBounds());
    }

    function onEachFeature(_: unknown, layer: Layer) {
        layer.on({
            mouseover: hoverShape,
            mouseout: outOfShape,
            click: onShapeClick,
        });
    }
</script>

<div id="places-map" class="w-screen h-screen relative">
    <Map
        options={{ center: [37.530697, 15.079602], zoom: 4 }}
        bind:instance={map}
    >
        {#if props.places && props.places.length > 0}
            {#each props.places as place}
                <Marker
                    latLng={place.position}
                    options={{
                        riseOnHover: true,
                    }}
                >
                    <Popup>
                        <h3>{place.data.name}</h3>
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
        <GeoJSON
            bind:instance={placesManager.geojson.instance}
            json={placesManager.getGeojson() as any}
            options={{
                style,
                onEachFeature,
            }}
        />
    </Map>
</div>
