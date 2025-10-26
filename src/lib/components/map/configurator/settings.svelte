<script lang="ts">
	import * as Field from '$lib/components/ui/field/index.js';
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import Input from '$lib/components/ui/input/input.svelte';
	import configurator from '$lib/services/configurator.svelte';
	import countriesManager from '$lib/services/countries';

	// This is not necessary anymore but keep here for the future
	if (!configurator.draft) {
		throw new Error('no draft');
	}

	// TODO: handle live updates
	let isNew = $derived(!configurator.draft.properties.saved);
	// let styles = $state(configurator.draft.properties.style);

	async function confirmHandler() {
		if (!configurator.draft) {
			return;
		}

		await countriesManager.save({
			...configurator.draft,
			properties: {
				...configurator.draft.properties,
				style: {
					className: 'saved'
				}
			}
		});
		configurator.close();
	}

	async function deleteHandler() {
		if (!configurator.draft) {
			return;
		}

		await countriesManager.delete(configurator.draft);
		configurator.close();
	}

	// TODO: add dates
</script>

<div class="flex h-full flex-col justify-between">
	<div>
		<Dialog.Header>
			<Dialog.Title>{configurator.draft?.properties.name}</Dialog.Title>
			<Dialog.Description>Manage country</Dialog.Description>
		</Dialog.Header>
		<br />
		<!-- <Field.Set class="flex-row items-center gap-2">
			<Field.Field>
				<Field.Label for="color">Broder color</Field.Label>
				<Input type="color" bind:value={styles.color} id="color" />
			</Field.Field>
			<Field.Field>
				<Field.Label for="fillColor">Fill color</Field.Label>
				<Input type="color" bind:value={styles.fillColor} id="fillColor" />
			</Field.Field>
		</Field.Set> -->
	</div>

	<Dialog.Footer class="self-end">
		{#if !isNew}
			<Button variant="destructive" onclick={deleteHandler}>Delete</Button>
		{/if}
		<Button onclick={confirmHandler}>{isNew ? "I've been here!" : 'Update changes'}</Button>
	</Dialog.Footer>
</div>
