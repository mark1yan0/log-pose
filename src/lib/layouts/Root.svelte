<script lang="ts">
    import Sidebar from "./Sidebar.svelte";
    import * as DefaultSidebar from "$lib/components/ui/sidebar/index";

    let props = $props();
</script>

<DefaultSidebar.Provider>
    <Sidebar />
    <main style="width:800px;height:500px;">
        {@render props.children()}
    </main>
</DefaultSidebar.Provider>
