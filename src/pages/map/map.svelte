<script lang="ts">
    import { Map, TileLayer, GeoJSON, Marker, Popup } from "sveaflet";
    import type { Layer, Map as TMap, LeafletMouseEvent } from "leaflet";
    import type { IPlace } from "$types/data";
    import placesManager from "$services/places.svelte";
    import MarkerIcon from "$lib/components/map/marker-icon.svelte";
    import defaults from "$lib/constants/defaults";

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
            fillColor: feature.properties.style.fillColor,
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
        options={{ center: defaults.map.center, zoom: defaults.map.zoom }}
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
                    <MarkerIcon contained marker={place.marker.icon} />
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
            url={defaults.map.url}
            options={{
                maxZoom: defaults.map.maxZoom,
                attribution: defaults.map.attribution,
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
