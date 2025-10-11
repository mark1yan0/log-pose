<script lang="ts">
	import * as Field from '$lib/components/ui/field/index.js';
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import Input from '$lib/components/ui/input/input.svelte';
	import configurator from '$lib/services/configurator.svelte';
	import countriesManager from '$lib/services/countries';
	import { Slider } from '$lib/components/ui/slider/index.js';

	if (!configurator.draft) {
		throw new Error('no draft');
	}

	// interface IProps {
	// 	styles: object;
	// }

	// let { styles }: IProps = $props();

	let isNew = $derived(!configurator.draft.properties.saved);

	let styles = $state(configurator.draft.properties.style);
	// let fColor = $state(configurator.draft.properties.style.fillColor);
	// // let b = $state(configurator.draft?.properties.style.dashArray)
	// let fOpacity = $state(configurator.draft.properties.style.fillOpacity);
	// let bWeight = $state(configurator.draft.properties.style.weight);
	// let bOpacity = $state(configurator.draft.properties.style.opacity);
	// TODO: on change, preview must update

	async function confirmHandler() {
		if (!configurator.draft) {
			return;
		}

		await countriesManager.save({
			...configurator.draft,
			properties: {
				...configurator.draft.properties,
				style: styles
				// {
				// 	color: bColor,
				// 	fillColor: fColor,
				// 	fillOpacity: fOpacity,
				// 	weight: bWeight,
				// 	opacity: bOpacity,
				// 	dashArray: 3 // TODO
				// }
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

	// TODO: organize ui
</script>

<div class="flex flex-col gap-2">
	<Dialog.Header>
		<Dialog.Title>{configurator.draft?.properties.name}</Dialog.Title>
		<Dialog.Description>Manage country</Dialog.Description>
	</Dialog.Header>

	<div>
		<Field.Set class="grid grid-cols-2">
			<Field.Group>
				<Field.Field>
					<Field.Label for="color">Broder color</Field.Label>
					<Input type="color" bind:value={styles.color} id="color" />
				</Field.Field>
				<Field.Field>
					<Field.Label for="fillColor">Fill color</Field.Label>
					<Input type="color" bind:value={styles.fillColor} id="fillColor" />
				</Field.Field>
			</Field.Group>
			<Field.Group>
				<Field.Field>
					<Field.Label for="opacity">
						Border opacity
						<span class="ml-1">{styles.opacity}</span>
					</Field.Label>
					<Slider
						type="single"
						bind:value={styles.opacity}
						max={1}
						min={0}
						step={0.1}
						class="mt-2 w-full"
						aria-label="Range"
					/>
				</Field.Field>
				<Field.Field>
					<Field.Label for="fOpacity">
						Fill opacity
						<span class="ml-1">{styles.fillOpacity}</span>
					</Field.Label>
					<Slider
						type="single"
						bind:value={styles.fillOpacity}
						max={1}
						min={0}
						step={0.1}
						class="mt-2 w-full"
						aria-label="TODO: Range"
					/>
				</Field.Field>
				<Field.Field>
					<Field.Label for="bOpacity">
						Border Weight
						<span class="ml-1">{styles.weight}</span>
					</Field.Label>
					<Slider
						type="single"
						bind:value={styles.weight}
						max={10}
						min={0}
						step={0.1}
						class="mt-2 w-full"
						aria-label="TODO: Range"
					/>
				</Field.Field>
			</Field.Group>
		</Field.Set>
	</div>

	<Dialog.Footer class="self-end">
		{#if !isNew}
			<Button variant="destructive" onclick={deleteHandler}>Delete</Button>
		{/if}
		<Button onclick={confirmHandler}>{isNew ? "I've been here!" : 'Update changes'}</Button>
	</Dialog.Footer>
</div>
