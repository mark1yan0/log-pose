<script lang="ts">
    import { Map, TileLayer, GeoJSON } from "sveaflet";
    import data from "./assets/countries.geo.json";

    let geojson;
    let map;

    function getColor(d) {
        return d > 1000
            ? "#800026"
            : d > 500
              ? "#BD0026"
              : d > 200
                ? "#E31A1C"
                : d > 100
                  ? "#FC4E2A"
                  : d > 50
                    ? "#FD8D3C"
                    : d > 20
                      ? "#FEB24C"
                      : d > 10
                        ? "#FED976"
                        : "#FFEDA0";
    }

    function style(feature) {
        return {
            weight: 2,
            opacity: 1,
            color: "white",
            dashArray: "3",
            fillOpacity: 0.7,
            fillColor: getColor(feature.properties.density),
        };
    }

    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature,
        });
    }

    function highlightFeature(e) {
        const layer = e.target;

        layer.setStyle({
            weight: 5,
            color: "#666",
            dashArray: "",
            fillOpacity: 0.7,
        });

        layer.bringToFront();
        featureProperties = layer.feature.properties;
    }

    function resetHighlight(e) {
        geojson.resetStyle(e.target);
        featureProperties = {};
    }

    function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
    }
</script>

<main style="width:800px;height:500px;">
    <Map options={{ center: [37.8, -96], zoom: 4 }} bind:instance={map}>
        <TileLayer
            url={"https://tile.openstreetmap.org/{z}/{x}/{y}.png"}
            options={{
                maxZoom: 19,
                attribution:
                    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }}
        />
        <GeoJSON
            bind:instance={geojson}
            json={data}
            options={{
                style,
                onEachFeature,
            }}
        />
    </Map>
</main>

<style>
    :global(h1, h2, h3, h4) {
        font-weight: 700;
    }
    :global(.info) {
        padding: 6px 8px;
        font:
            14px/16px Arial,
            Helvetica,
            sans-serif;
        background: white;
        background: rgba(255, 255, 255, 0.8);
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
        border-radius: 5px;
    }
    :global(.info h4) {
        margin: 0 0 5px;
        color: #777;
    }
    :global(.legend) {
        text-align: left;
        line-height: 18px;
        color: #555;
    }
    :global(.legend i) {
        width: 18px;
        height: 18px;
        float: left;
        margin-right: 8px;
        opacity: 0.7;
    }
</style>
