<script lang="ts">
    import SunIcon from "@lucide/svelte/icons/sun";
    import MoonIcon from "@lucide/svelte/icons/moon";

    import { toggleMode } from "mode-watcher";
    import { Button } from "$lib/components/ui/button/index.js";
</script>

<header
    class="flex items-center justify-between py-2 px-3 fixed top-1 left-0.5 right-1 z-[10000] bg-background rounded-xl opacity-90"
>
    <h1>log:pose</h1>

    <div class="flex items-center gap-2">
        <nav>navigation</nav>

        <Button onclick={toggleMode} variant="outline" size="icon">
            <SunIcon
                class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 !transition-all dark:-rotate-90 dark:scale-0"
            />
            <MoonIcon
                class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 !transition-all dark:rotate-0 dark:scale-100"
            />
            <span class="sr-only">Toggle theme</span>
        </Button>
    </div>
</header>
