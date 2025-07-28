<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import * as Select from "$lib/components/ui/select/index";
    import placesManager from "$services/places.svelte";
    import type { IPlace, IMarker } from "$types/data";
    import MarkerIcon from "$lib/components/map/marker-icon.svelte";
    import defaults from "$lib/constants/defaults";
    import { Label } from "$lib/components/ui/label";
    import PlaceDetails from "./details.svelte";

    const {
        place,
        clearQuery,
        onSelectionClose,
    }: {
        place: IPlace;
        clearQuery: () => void;
        onSelectionClose: (opts: { close: boolean }) => void;
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

<PlaceDetails {place} />

<br />

<!-- TODO: date from - to -->
<div class="w-full flex items-center gap-4">
    <div class="flex flex-col">
        <Select.Label>Pin Icon:</Select.Label>
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
    </div>
    {#if !countryAlreadySet(place)}
        <div class="flex flex-col">
            <Label for="shape-color">Country color:</Label>
            <Input
                type="color"
                id="shape-color"
                name="shape-color"
                bind:value={color}
                class="w-9 p-0 rounded-full"
            />
        </div>
    {/if}
</div>
<br />
<div class="flex justify-end">
    <Button
        onclick={() => {
            // TODO: cannot chose color if is from the same country
            placesManager.add(place, {
                style: { fillColor: color },
                marker,
            });
            clearQuery();
            onSelectionClose({
                close: true,
            });
        }}
    >
        Save
    </Button>
</div>
