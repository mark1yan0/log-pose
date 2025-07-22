<script lang="ts">
    import { Toaster } from "$lib/components/ui/sonner/index";
    import Sidebar from "./sidebar.svelte";
    import * as DefaultSidebar from "$lib/components/ui/sidebar/index";
    import Cursor from "$lib/components/ui/cursor/cursor.svelte";

    let props = $props();
</script>

<Cursor />

<DefaultSidebar.Provider>
    <Sidebar />
    <main>
        {@render props.children()}
    </main>
</DefaultSidebar.Provider>

<Toaster />
