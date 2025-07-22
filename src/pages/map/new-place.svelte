<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { buttonVariants } from "$lib/components/ui/button/index.js";
    import PlacesForm from "$lib/components/forms/places.svelte";
    import { cn } from "$lib/utils";
</script>

<Dialog.Root>
    <Dialog.Trigger
        class={cn(
            buttonVariants({ variant: "default" }),
            "absolute bottom-6 right-1 z-[10000]",
        )}
    >
        New
    </Dialog.Trigger>
    <Dialog.Content
        class="bg-transparent border-none shadow-none h-screen block sm:max-w-5xl"
        overlayClass="bg-black/90"
        closeClass="text-white"
    >
        <Dialog.Header class="h-unset">
            <Dialog.Title class="text-white">Add new Place</Dialog.Title>
        </Dialog.Header>
        <br />
        <PlacesForm />
    </Dialog.Content>
</Dialog.Root>
