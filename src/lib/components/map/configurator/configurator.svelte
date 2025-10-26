<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import type { Map } from 'leaflet';
	import configurator from '$lib/services/configurator.svelte';
	import Settings from './settings.svelte';

	interface IProps {
		map: Map | undefined;
	}

	let { map }: IProps = $props();

	function close() {
		configurator.close();

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
</script>

{#if configurator.opened}
	<Dialog.Root open={!!configurator.opened} onOpenChange={changeHandler}>
		<Dialog.Content>
			<Settings />
		</Dialog.Content>
	</Dialog.Root>
{/if}
