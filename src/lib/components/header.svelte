<script>
	import SettingsIcon from '@lucide/svelte/icons/settings';
	import MapIcon from '@lucide/svelte/icons/map';

	import ThemeSwitcher from './ui/theme-switcher/theme-switcher.svelte';
	import Button from './ui/button/button.svelte';
</script>

<nav
	class="fixed top-2 right-2 z-[9999] flex h-16 min-w-48 items-center justify-between rounded-xl bg-card px-4 shadow"
>
	<Button variant="link" aria-label="Go to map" href="/">
		<MapIcon />
	</Button>
	<Button variant="link" aria-label="Go to settings" href="/settings">
		<SettingsIcon />
	</Button>

	<ThemeSwitcher />
</nav>
