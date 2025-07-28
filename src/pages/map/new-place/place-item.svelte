<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import * as Select from "$lib/components/ui/select/index";
    import placesManager from "$services/places.svelte";
    import type { IPlace, IMarker } from "$types/data";
    import MarkerIcon from "$lib/components/map/marker-icon.svelte";
    import defaults from "$lib/constants/defaults";

    const {
        place,
        clearQuery,
    }: {
        place: IPlace;
        clearQuery: () => void;
    } = $props();

    const MARKERS: IMarker[] = [
        {
            label: "Pin",
            icon: "pin",
            color: "#542341",
        },
        {
            label: "City",
            icon: "city",
            color: "#542341",
        },
        {
            label: "Sea",
            icon: "sea",
            color: "#542341",
        },
        {
            label: "Mountains",
            icon: "mountains",
            color: "#542341",
        },
    ];

    let color = $state<`#${string}`>(defaults.shapes.fill);
    let marker = $state<IMarker>(defaults.marker);

    const selectLabel = $derived(
        MARKERS.find((m) => m.icon === marker.icon)?.label ?? "Select a marker",
    );

    function countryAlreadySet(place: IPlace) {
        return !!placesManager
            .getGeojson()
            .features.find(
                (feature) =>
                    feature.properties.name === place.data.address.country,
            );
    }
</script>

<div>
    <h3>{place.data.name}</h3>
    <p>{place.data.display_name}</p>
</div>
{#if !countryAlreadySet(place)}
    <Input type="color" bind:value={color} />
{/if}
<Select.Root type="single" bind:value={marker.icon}>
    <Select.Trigger class="w-[180px]">
        <MarkerIcon marker={marker.icon} />
        {selectLabel}
    </Select.Trigger>
    <Select.Content class="z-[10001]">
        {#each MARKERS as m (m.icon)}
            <Select.Item value={m.icon}>
                <MarkerIcon marker={m.icon} />
                {m.label}
            </Select.Item>
        {/each}
    </Select.Content>
</Select.Root>
<Button
    onclick={() => {
        // TODO: cannot chose color if is from the same country
        placesManager.add(place, {
            style: { fillColor: color },
            marker,
        });
        clearQuery();
    }}
>
    add
</Button>
