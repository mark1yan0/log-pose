<script>
	import Main from '$lib/components/layouts/main.svelte';
	import countriesManager from '$lib/services/countries';
	import { liveQuery } from 'dexie';
	let count = liveQuery(async () => await countriesManager.countSaved());
</script>

<Main>
	<p>You've visited {$count} different countries</p>
</Main>
