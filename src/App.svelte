<script lang="ts">
    import "./app.css";
    import PlacesMap from "$lib/layouts/map.svelte";
    import placesManager from "$services/places.svelte";
    import Root from "$lib/layouts/root.svelte";
</script>

<!-- shows results preview or places -->
<Root>
    <PlacesMap places={placesManager.all()} />
</Root>
