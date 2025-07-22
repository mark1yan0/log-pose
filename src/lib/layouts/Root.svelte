<script lang="ts">
    import { Toaster } from "$lib/components/ui/sonner/index";
    import Sidebar from "./sidebar.svelte";
    import * as DefaultSidebar from "$lib/components/ui/sidebar/index";
    import Cursor from "$lib/components/ui/cursor/cursor.svelte";
    import PlacesMap from "$lib/layouts/map.svelte";
    import placesManager from "$services/places.svelte";
</script>

<Cursor />

<DefaultSidebar.Provider>
    <Sidebar />
    <main>
        <PlacesMap places={placesManager.all()} />
    </main>
</DefaultSidebar.Provider>

<Toaster />
