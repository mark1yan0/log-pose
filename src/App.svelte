<script lang="ts">
    import "./app.css";
    import PlacesMap from "./components/PlacesMap/index.svelte";
    import placesManager from "$services/places.svelte";
    import Root from "$lib/layouts/Root.svelte";

    // TODO: handle preview
    // places={results
    //     ? placesManager.preview(results[0])
    //     : placesManager.get()
    // }
</script>

<!-- shows results preview or places -->
<Root>
    <PlacesMap places={placesManager.get()} />
</Root>
