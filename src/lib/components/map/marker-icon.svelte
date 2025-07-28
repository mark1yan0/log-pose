<script lang="ts">
    import Waves from "@lucide/svelte/icons/waves";
    import Mountain from "@lucide/svelte/icons/mountain";
    import Building2 from "@lucide/svelte/icons/building-2";
    import MapPin from "@lucide/svelte/icons/map-pin";
    import type { TMarkerIcon } from "$types/data";
    import { DivIcon } from "sveaflet";

    const { marker, contained }: { marker: TMarkerIcon; contained?: boolean } =
        $props();

    const HEIGHT = 64;
</script>

{#if contained}
    <DivIcon
        options={{
            className:
                "bg-primary border-none !w-fit !h-fit p-2 rounded-full !ml-[-1rem] !mt-[-1rem]",
        }}
    >
        {#if marker === "pin"}
            <MapPin class="text-secondary" />
        {/if}

        {#if marker === "sea"}
            <Waves class="text-secondary" />
        {/if}

        {#if marker === "mountains"}
            <Mountain class="text-secondary" />
        {/if}

        {#if marker === "city"}
            <Building2 class="text-secondary" />
        {/if}
    </DivIcon>
{/if}

{#if marker === "pin"}
    <MapPin />
{/if}

{#if marker === "sea"}
    <Waves />
{/if}

{#if marker === "mountains"}
    <Mountain />
{/if}

{#if marker === "city"}
    <Building2 />
{/if}
<!--
`
    height: ${HEIGHT}px; /* control the size */
    aspect-ratio: 2/3;
    mask:
        conic-gradient(from -30deg at bottom,#0000,#000 1deg 59deg,#0000 60deg) bottom/100% 50% no-repeat,
        radial-gradient(circle at 50% calc(100% / 3),#000 22% 44%,#0000 44.5%);
    background: #ec1a23;
    transform: translate(-10px, -${HEIGHT}px);
` -->
