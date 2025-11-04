<script>
	import AnalyticsIcon from '@lucide/svelte/icons/chart-column';
	import MapIcon from '@lucide/svelte/icons/map';

	import NavButton from './nav-button.svelte';
	import PrintModal from '../map/printer/print-modal.svelte';
	import Settings from '../settings/settings.svelte';
	import ThemeSwitcher from '../ui/theme-switcher/theme-switcher.svelte';
</script>

<div
	class="over-map relative bottom-6 left-1/2 flex w-full -translate-x-1/2 items-center justify-end px-2"
>
	<nav
		id="primary-nav"
		class="glass absolute bottom-0 left-1/2 w-fit -translate-x-1/2 items-center justify-between gap-4 rounded-xl p-2"
	>
		<NavButton label="Map" href="/">
			<MapIcon />
		</NavButton>

		<NavButton label="Analytics" href="/analytics">
			<AnalyticsIcon />
		</NavButton>

		<PrintModal />
	</nav>

	<div class="glass flex items-center gap-2 rounded-xl p-1">
		<Settings />
		<ThemeSwitcher />
	</div>
</div>
