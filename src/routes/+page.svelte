<script lang="ts">
    import PlacesMap from '$lib/components/map/map.svelte';
    import placesManager from '$lib/services/places.svelte';
</script>

<!-- TODO: remove places? -->
<main>
    <PlacesMap places={placesManager.all()} />
</main>
