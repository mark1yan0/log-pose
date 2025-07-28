<script lang="ts">
    import { Toaster } from "$lib/components/ui/sonner/index";
    import Cursor from "$lib/components/ui/cursor/cursor.svelte";
    import PlacesMap from "$pages/map/map.svelte";
    import NewPlaceDialog from "$pages/map/new-place/list.svelte";
    import placesManager from "$services/places.svelte";

    import Header from "./header.svelte";
</script>

<Cursor />

<Header />

<main>
    <PlacesMap places={placesManager.all()} />
    <NewPlaceDialog />
</main>

<Toaster />
