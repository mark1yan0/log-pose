<script lang="ts">
	import * as Field from '$lib/components/ui/field/index.js';
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import Input from '$lib/components/ui/input/input.svelte';
	import configurator from '$lib/services/configurator.svelte';
	import countriesManager from '$lib/services/countries';

	let isNew = $derived(!configurator.draft?.properties.saved);

	// TODO: on change, preview must update
	let values = $state(configurator.draft?.properties.style);

	async function confirmHandler() {
		if (!configurator.draft) {
			return;
		}

		await countriesManager.save(configurator.draft);
		configurator.close();
	}

	async function deleteHandler() {
		if (!configurator.draft) {
			return;
		}

		await countriesManager.delete(configurator.draft);
		configurator.close();
	}
</script>

<div class="flex flex-col gap-2">
	<Dialog.Header>
		<Dialog.Title>{configurator.draft?.properties.name}</Dialog.Title>
		<Dialog.Description>Manage country</Dialog.Description>
	</Dialog.Header>

	<div>
		<Field.Set class="grid grid-cols-2">
			{#each configurator.fields as field (field.label)}
				<Field.Group>
					<Field.Field>
						<Field.Label for={field.label}>{field.label}</Field.Label>
						<Input type={field.type} bind:value={values[field.label]} id={field.label} />
					</Field.Field>
				</Field.Group>
			{/each}
		</Field.Set>
	</div>

	<Dialog.Footer class="self-end">
		{#if !isNew}
			<Button variant="destructive" onclick={deleteHandler}>Delete</Button>
		{/if}
		<Button onclick={confirmHandler}>{isNew ? "I've been here!" : 'Update changes'}</Button>
	</Dialog.Footer>
</div>
