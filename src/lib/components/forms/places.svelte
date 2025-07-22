<script lang="ts">
    import placesManager from "$services/places.svelte";
    import { Button } from "$lib/components/ui/button";
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

<form class="flex flex-col gap-2">
    <Input name="place" bind:value={q} />
    <Button type="submit" onclick={submitHandler}>find</Button>
    <Button
        type="button"
        disabled={!placesManager.isPreview()}
        onclick={saveHandler}>save</Button
    >
</form>
