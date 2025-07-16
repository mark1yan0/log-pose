<script lang="ts">
    import Map from "./components/Map/index.svelte";
    import type { IData } from "./interafaces/data";

    let q = $state("");
    let data: IData[] | null = $state(null);
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
        data = await res.json();
    }

    function getMarker(data: IData): [number, number] {
        return [parseFloat(data.lat), parseFloat(data.lon)];
    }
</script>

<form>
    <input name="place" bind:value={q} />
    <button
        type="submit"
        onclick={(event) => {
            event.preventDefault();
            findPlace(q);
        }}>find</button
    >
</form>

<main style="width:800px;height:500px;">
    <Map
        places={data
            ? [
                  {
                      position: getMarker(data[0]),
                      data: data[0],
                  },
              ]
            : null}
    />
</main>
