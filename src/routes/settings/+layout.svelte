<script lang="ts">
	import SettingsSidebar from './sidebar.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import Main from '$lib/components/layouts/main.svelte';
	import { page } from '$app/state';
	import Button from '$lib/components/ui/button/button.svelte';

	let { children } = $props();
	// TOOD: navigation
</script>

<Main>
	<h1>Settings</h1>
	<br />

	<Sidebar.Provider>
		<SettingsSidebar>
			<nav id="secondary-nav" class="flex flex-col gap-4 pt-4 pr-4">
				<Button
					class="justify-start"
					variant="outline"
					href="/settings/sync"
					aria-label="Go to import export"
				>
					Import/Export
				</Button>
			</nav>
		</SettingsSidebar>
		<Sidebar.Inset>
			<header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
				<Sidebar.Trigger class="-ml-1" />
				<h2>{page.url.pathname.substring(page.url.pathname.lastIndexOf('/') + 1)}</h2>
			</header>
			<div class="p-4">
				{@render children?.()}
			</div>
		</Sidebar.Inset>
	</Sidebar.Provider>
</Main>
