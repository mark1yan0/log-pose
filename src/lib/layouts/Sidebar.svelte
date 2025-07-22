<script lang="ts">
    import placesManager from "$services/places.svelte";
    import { Button } from "$lib/components/ui/button";
    import * as Sidebar from "$lib/components/ui/sidebar/index";
    import Input from "$lib/components/ui/input/input.svelte";

    // TODO: move to a form
    let q = $state("");
    async function submitHandler(event: MouseEvent) {
        event.preventDefault();
        await placesManager.query(q);
    }

    function saveHandler(event: MouseEvent) {
        event.preventDefault();
        placesManager.add();
    }
</script>

<Sidebar.Root>
    <Sidebar.Header />
    <Sidebar.Content class="px-2">
        <form class="flex flex-col gap-2">
            <Input name="place" bind:value={q} />
            <Button type="submit" onclick={submitHandler}>find</Button>
            <Button type="button" onclick={saveHandler}>save</Button>
        </form>
    </Sidebar.Content>
    <Sidebar.Footer />
</Sidebar.Root>
