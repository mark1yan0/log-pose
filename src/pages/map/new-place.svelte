<script lang="ts">
    import placesManager from "$services/places.svelte";
    import * as Command from "$lib/components/ui/command/index.js";
    import Button from "$lib/components/ui/button/button.svelte";
    import type { IQuery } from "$types/query";
    import type { IPlace } from "$types/data";
    import AlertCircleIcon from "@lucide/svelte/icons/alert-circle";
    import * as Alert from "$lib/components/ui/alert";
    import { Skeleton } from "$lib/components/ui/skeleton";

    const OPEN_KEY = "k";

    let open = $state(false);

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === OPEN_KEY && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            open = !open;
        }
    }

    // TODO: better api handling
    let query = $state<IQuery<IPlace[]>>({
        isLoading: false,
        data: null,
        error: null,
    });
    let timer = $state<ReturnType<typeof setTimeout>>();
    const debounced = async (v: string) => {
        clearTimeout(timer);
        timer = setTimeout(async () => {
            query.isLoading = true;
            query = await placesManager.search(v);
        }, 750);
    };

    const inputHandler = async (event: Event) => {
        const target = event.target as HTMLInputElement;

        if (!target.value) {
            query = {
                isLoading: false,
                data: null,
                error: null,
            };
            return;
        }

        if (query.error) {
            query.error = null;
        }

        if (query.isLoading) {
            query.isLoading = false;
        }

        await debounced(target.value);
    };
</script>

<svelte:document onkeydown={handleKeydown} />

<Command.Dialog bind:open shouldFilter={false}>
    <Command.Input oninput={inputHandler} placeholder="Search place..." />
    {#if !!query.error}
        <Command.Item>
            <Alert.Root variant="destructive" class="mt-2">
                <AlertCircleIcon />
                <Alert.Title>An error occurred</Alert.Title>
                <Alert.Description>
                    {query.error.message}
                </Alert.Description>
            </Alert.Root>
        </Command.Item>
    {/if}

    {#if query.isLoading}
        <Command.Loading class="p-2">
            <Skeleton class="h-16 w-full mb-2" />
            <Skeleton class="h-16 w-full mb-2" />
            <Skeleton class="h-16 w-full mb-2" />
            <Skeleton class="h-16 w-full" />
        </Command.Loading>
    {/if}

    {#if query.data && Array.isArray(query.data)}
        {#if query.data.length === 0}
            <Command.Empty>No results found</Command.Empty>
        {:else}
            <Command.List>
                <Command.Group heading="Results">
                    {#each query.data as result (result.data.place_id)}
                        <Command.Item>
                            <div>
                                <h3>{result.data.name}</h3>
                                <p>{result.data.display_name}</p>
                            </div>
                            <Button onclick={() => placesManager.add(result)}>
                                add
                            </Button>
                        </Command.Item>
                    {/each}
                </Command.Group>
            </Command.List>
        {/if}
    {/if}

    {#if !query.data && !query.isLoading && !query.error}
        <Command.List>
            <Command.Group heading="Suggested">
                <Command.Item
                    role="button"
                    onclick={async () => {
                        query.isLoading = true;
                        query = await placesManager.search("rome");
                    }}
                >
                    Rome
                </Command.Item>
                <Command.Item
                    role="button"
                    onclick={async () => {
                        query.isLoading = true;
                        query = await placesManager.search("london");
                    }}
                >
                    London
                </Command.Item>
            </Command.Group>
        </Command.List>
    {/if}
</Command.Dialog>

<Button
    command={OPEN_KEY}
    class="over-map bottom-6 right-2"
    onclick={() => {
        open = !open;
    }}
>
    new
</Button>
