<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import placesManager from "$services/places.svelte";
    import type { IPlace } from "$types/data";

    const {
        place,
        clearQuery,
    }: {
        place: IPlace;
        clearQuery: () => void;
    } = $props();

    let color = $state<`#${string}`>("#542341"); // TODO: define default
</script>

<div>
    <h3>{place.data.name}</h3>
    <p>{place.data.display_name}</p>
</div>
<Input type="color" bind:value={color} />
<Button
    onclick={() => {
        // TODO: cannot chose color if is from the same country
        placesManager.add(place, { style: { fillColor: color } });
        clearQuery();
    }}
>
    add
</Button>
