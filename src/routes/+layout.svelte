<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { ModeWatcher } from 'mode-watcher';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/header.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import countriesManager from '$lib/services/countries';
	import Navigation from '$lib/components/navigation/navigation.svelte';

	let { children } = $props();

	// TODO: find better way
	onMount(async () => {
		await countriesManager.init();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />

<Header />

{@render children?.()}

<Navigation />

<Toaster />
