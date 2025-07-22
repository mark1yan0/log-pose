<script lang="ts">
    import PlacesForm from "$lib/components/forms/places.svelte";
    import * as Sidebar from "$lib/components/ui/sidebar/index";
</script>

<Sidebar.Root>
    <Sidebar.Header />
    <Sidebar.Content class="px-2">
        <PlacesForm />
    </Sidebar.Content>
    <Sidebar.Footer />
</Sidebar.Root>
