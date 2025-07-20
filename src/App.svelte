<script lang="ts">
    import PlacesMap from "./components/PlacesMap/index.svelte";
    import type { IData } from "$types/data";
    import placesManager from "$services/places.svelte";

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
</script>

<form>
    <input name="place" bind:value={q} />
    <button type="submit" onclick={submitHandler}> find </button>
    <button
        type="button"
        onclick={() => {
            if (!results) {
                // if no results nothing to add
                return;
            }

            placesManager.add(results[0]);
            // clear results preview
            results = null;
        }}
    >
        save
    </button>
</form>

<!-- shows results preview or places -->
<main style="width:800px;height:500px;">
    <PlacesMap
        places={results
            ? placesManager.preview(results[0])
            : placesManager.get()}
    />
</main>
