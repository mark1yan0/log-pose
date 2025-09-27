<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import countriesManager from '$lib/services/countries.ts';
	import type { ICountry } from '$lib/services/db/index';
	import type { Map } from 'leaflet';

	// TODO: error handler
	interface IProps {
		selected: ICountry | null;
		map: Map | undefined;
	}

	let { selected = $bindable(null), map }: IProps = $props();
	let isNew = $derived(selected && !selected.properties.saved);

	function close() {
		selected = null;

		if (!map) {
			return;
		}

		map.setZoom(5);
	}

	function changeHandler(open: boolean) {
		if (!open) {
			close();
		}
	}

	async function confirmHandler() {
		if (!selected) {
			return;
		}

		await countriesManager.save(selected);
		close();
	}

	async function deleteHandler() {
		if (!selected) {
			return;
		}

		await countriesManager.delete(selected);
		close();
	}
</script>

<Dialog.Root open={!!selected} onOpenChange={changeHandler}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>{selected?.properties.name}</Dialog.Title>
			<Dialog.Description>Manage country</Dialog.Description>
		</Dialog.Header>
		<Dialog.Footer>
			{#if !isNew}
				<Button variant="destructive" onclick={deleteHandler}>Delete</Button>
			{/if}
			<Button onclick={confirmHandler}>{isNew ? 'Save' : 'Update'} changes</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
