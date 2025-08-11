<script lang="ts">
    import SunIcon from '@lucide/svelte/icons/sun';
    import MoonIcon from '@lucide/svelte/icons/moon';

    import { toggleMode } from 'mode-watcher';
    import { Button } from '$lib/components/ui/button/index.js';
    import { Link } from '../ui/link';
    import countriesManager from '$lib/services/countries.svelte';
</script>

<header
    class="fixed top-1 right-1 left-0.5 z-[10000] flex items-center justify-between rounded-xl bg-background px-3 py-2 opacity-90"
>
    <h1>log:pose</h1>

    <div class="flex items-center gap-6">
        <nav class="flex items-center gap-6">
            <Link aria-label="Go to map" href="/">Map</Link>
            <Link aria-label="Go to overview" href="/overview">Overview</Link>
            <Link aria-label="Go to about" href="/about">About</Link>
        </nav>

        <Button aria-label="Toggle theme" onclick={toggleMode} variant="outline" size="icon">
            <SunIcon
                class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 !transition-all dark:scale-0 dark:-rotate-90"
            />
            <MoonIcon
                class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 !transition-all dark:scale-100 dark:rotate-0"
            />
            <span class="sr-only">Toggle theme</span>
        </Button>
        <button
            onclick={async () => {
                const italy = await countriesManager.getById('ITA');
                if (!italy) {
                    console.log('No ITA found');
                    return;
                }
                italy.properties.saved = true;
                italy.properties.created_at = new Date().toISOString();
                italy.properties.updated_at = new Date().toISOString();
                italy.properties.style = {
                    fillColor: '#2596be'
                };
                await countriesManager.add('ITA', italy);
            }}>add new</button
        >

        <button
            onclick={async () => {
                const italy = await countriesManager.getById('ITA');
                if (!italy) {
                    console.log('No ITA found');
                    return;
                }
                italy.properties.saved = false;
                italy.properties.created_at = null;
                italy.properties.updated_at = null;
                italy.properties.style = null;
                await countriesManager.add('ITA', italy);
            }}>undo</button
        >
    </div>
</header>
