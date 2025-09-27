<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { exportDatabase } from '$lib/services/db/sync/export';
	import { importIntoDatabase } from '$lib/services/db/sync/import';

	let file: File | null = null;
	let status: string = '';

	async function handleImport() {
		if (!file) {
			status = 'Please select a file first.';
			return;
		}
		try {
			status = 'Importing...';
			await importIntoDatabase(file);
			status = 'Import successful!';
		} catch (err) {
			status = 'Import failed: ' + (err as Error).message;
		}
	}
</script>

<br />
<br />
<h1>Settings</h1>

<Button variant="outline" onclick={exportDatabase}>export</Button>

<div class="import-section">
	<input
		type="file"
		accept="application/json"
		on:change={(e) => (file = (e.target as HTMLInputElement).files?.[0] || null)}
	/>
	<button on:click={handleImport}>Import Database</button>
	{#if status}
		<p>{status}</p>
	{/if}
</div>

<style>
	.import-section {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		max-width: 300px;
	}
	button {
		padding: 0.5rem 1rem;
		cursor: pointer;
	}
	p {
		font-size: 0.9rem;
		color: #333;
	}
</style>
