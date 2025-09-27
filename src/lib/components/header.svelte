<script>
	import SettingsIcon from '@lucide/svelte/icons/settings';
	import MapIcon from '@lucide/svelte/icons/map';

	import ThemeSwitcher from './ui/theme-switcher/theme-switcher.svelte';
	import Button from './ui/button/button.svelte';
	import { Link } from './ui/link';
</script>

<header class="fixed top-0 left-0 z-[9999] flex w-full justify-between p-2">
	<Link href="/" class="flex h-16 items-center rounded-xl bg-card px-4 shadow">logpose</Link>
	<nav
		id="primary-nav"
		class="flex h-16 items-center justify-between gap-2 rounded-xl bg-card px-4 shadow"
	>
		<Button variant="outline" aria-label="Go to map" href="/">
			<MapIcon />
		</Button>
		<Button variant="outline" aria-label="Go to settings" href="/settings/dashboard">
			<SettingsIcon />
		</Button>

		<ThemeSwitcher />
	</nav>
</header>
