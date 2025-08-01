<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import favicon from '$lib/assets/favicon.svg';
	import Cursor from '$lib/components/ui/cursor/cursor.svelte';
	import Header from '$lib/components/header/header.svelte';
	import { Toaster } from '$lib/components/ui/sonner';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />

<Cursor />

<Header />

{@render children?.()}

<Toaster />
