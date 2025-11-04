<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { exportDatabase } from '$lib/services/db/sync/export';
	import { importIntoDatabase } from '$lib/services/db/sync/import';

	let inputRef = $state<HTMLInputElement | null>(null);
	let file: File | null = $state(null);
	async function importHandler() {
		inputRef?.click();
	}

	$effect(() => {
		if (!file) {
			return;
		}

		importIntoDatabase(file);
	});
</script>

<section class="flex w-full gap-4">
	<Button variant="outline" class="h-64 flex-1" onclick={exportDatabase}>Export Data</Button>
	<Button variant="outline" class="h-64 flex-1" onclick={importHandler}>Import Data</Button>
</section>
<input
	bind:this={inputRef}
	type="file"
	class="hidden"
	accept="application/json"
	onchange={(event) => {
		// TODO: validation. Must be json
		const target = event.target as HTMLInputElement;
		file = target.files?.[0] || null;
	}}
/>
