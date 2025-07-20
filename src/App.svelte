<script lang="ts">
    import Map from "./components/Map/index.svelte";
    import type { IData, IPlace } from "./types/data";

    let q = $state("");
    let places: IPlace[] | null = $state(getPersisted());
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

    function getMarker(data: IData): IPlace["position"] {
        return [parseFloat(data.lat), parseFloat(data.lon)];
    }

    function getPersisted(): IPlace[] | null {
        const persisted = localStorage.getItem("logpose:data");
        if (!persisted) {
            return null;
        }

        return JSON.parse(persisted);
    }

    function getPlaces(data: IData[] | null): IPlace[] | null {
        if (!data || data.length === 0) {
            return null;
        }

        return data.map((d) => ({
            position: getMarker(d),
            data: d,
        }));
    }
</script>

<form>
    <input name="place" bind:value={q} />
    <button
        type="submit"
        onclick={async (event) => {
            event.preventDefault();
            const data = await findPlace(q);
            places = getPlaces(data);
        }}
    >
        find
    </button>
</form>

<main style="width:800px;height:500px;">
    <Map {places} />
</main>

<button
    onclick={() => {
        localStorage.setItem("logpose:data", JSON.stringify(places));
    }}
>
    save
</button>
