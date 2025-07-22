<script lang="ts">
    import placesManager from "$services/places.svelte";
    import { Button } from "$lib/components/ui/button";
    import Input from "$lib/components/ui/input/input.svelte";

    let q = $state("");
    async function submitHandler(event: MouseEvent) {
        event.preventDefault();
        await placesManager.query(q);
    }
</script>

<div class="grid grid-cols-3 gap-6">
    <form class="flex flex-col gap-2">
        <Input
            name="place"
            bind:value={q}
            placeholder="Search for visited places..."
        />
        <Button type="submit" variant="secondary" onclick={submitHandler}>
            find
        </Button>
    </form>
    <div id="results" class="w-full col-span-2 text-white">
        {#each placesManager.previews() ?? [] as result (result.data.place_id)}
            <article
                class="mb-2 border borcer-color-white rounded-md bg-back/70 flex justify-between items-center p-2"
            >
                <div>
                    <h3>{result.data.name}</h3>
                    <p>{result.data.display_name}</p>
                </div>
                <Button onclick={() => placesManager.add(result)}>add</Button>
            </article>
        {/each}
    </div>
</div>
