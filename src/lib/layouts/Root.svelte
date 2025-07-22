<script lang="ts">
    import { Toaster } from "$lib/components/ui/sonner/index";
    import Sidebar from "./sidebar.svelte";
    import * as DefaultSidebar from "$lib/components/ui/sidebar/index";
    import Cursor from "$lib/components/ui/cursor/cursor.svelte";
    import PlacesMap from "../../pages/map/map.svelte";
    import placesManager from "$services/places.svelte";
    import NewPlaceDialog from "../../pages/map/new-place.svelte";
</script>

<Cursor />

<DefaultSidebar.Provider open={false}>
    <Sidebar />
    <main>
        <PlacesMap places={placesManager.all()} />
        <NewPlaceDialog />
    </main>
</DefaultSidebar.Provider>

<Toaster />
