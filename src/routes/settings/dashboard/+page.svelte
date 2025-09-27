<script>
	import countriesManager from '$lib/services/countries';
	import { liveQuery } from 'dexie';
	let count = liveQuery(async () => await countriesManager.countSaved());
</script>

<p>You've visited {$count}</p>
