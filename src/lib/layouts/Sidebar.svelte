<script lang="ts">
    import placesManager from "$services/places.svelte";
    import { Button } from "$lib/components/ui/button";
    import type { IData } from "$types/data";
    import * as Sidebar from "$lib/components/ui/sidebar/index";

    let q = $state("");
    let results: IData[] | null = $state(null);

    async function findPlace(q: string) {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${q}&format=json&addressdetails=1`,
            {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Accept-Language": "en",
                },
            },
        );

        return await res.json();
    }

    async function submitHandler(event: MouseEvent) {
        event.preventDefault();

        const data = await findPlace(q);

        // const firstResult = data[0];
        // preview should be shown
        results = data;
    }

    function saveHandler(event: MouseEvent) {
        event.preventDefault();
        if (!results) {
            // if no results nothing to add
            return;
        }

        placesManager.add(results[0]);
        // clear results preview
        results = null;
    }
</script>

<Sidebar.Root>
    <Sidebar.Header />
    <Sidebar.Content>
        <form>
            <input name="place" bind:value={q} />
            <Button type="submit" onclick={submitHandler}>find</Button>
            <Button type="button" onclick={saveHandler}>save</Button>
        </form>
    </Sidebar.Content>
    <Sidebar.Footer />
</Sidebar.Root>
