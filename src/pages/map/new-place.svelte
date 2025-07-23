<script lang="ts">
    import placesManager from "$services/places.svelte";
    import * as Command from "$lib/components/ui/command/index.js";
    import Button from "$lib/components/ui/button/button.svelte";
    import type { IPlace } from "$types/data";

    const OPEN_KEY = "k";

    let open = $state(false);

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === OPEN_KEY && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            open = !open;
        }
    }

    let results = $state<IPlace[] | null>(null);
    let timer = $state<ReturnType<typeof setTimeout>>();
    const debounced = async (v: string) => {
        clearTimeout(timer);
        timer = setTimeout(async () => {
            // TODO: handle with react query for better ux
            results = await placesManager.query(v);
        }, 750);
    };

    const inputHandler = async (event: Event) => {
        const target = event.target as HTMLInputElement;
        await debounced(target.value);
    };
</script>

<svelte:document onkeydown={handleKeydown} />

<Command.Dialog bind:open shouldFilter={false}>
    <Command.Input oninput={inputHandler} placeholder="Search place..." />
    <Command.List>
        {#if results && Array.isArray(results)}
            <Command.Group heading="Results">
                {#each results as result (result.data.place_id)}
                    <Command.Item>
                        <div>
                            <h3>{result.data.name}</h3>
                            <p>{result.data.display_name}</p>
                        </div>
                        <Button onclick={() => placesManager.add(result)}
                            >add</Button
                        >
                    </Command.Item>
                {/each}
            </Command.Group>
        {:else}
            <Command.Group heading="Suggested">
                <Command.Item
                    role="button"
                    onclick={async () => {
                        results = await placesManager.query("rome");
                    }}>Rome</Command.Item
                >
                <Command.Item
                    role="button"
                    onclick={async () => {
                        results = await placesManager.query("london");
                    }}>London</Command.Item
                >
            </Command.Group>
        {/if}
    </Command.List>
</Command.Dialog>

<Button
    command={OPEN_KEY}
    class="over-map bottom-6 right-2"
    onclick={() => {
        open = !open;
    }}
    >new
</Button>
