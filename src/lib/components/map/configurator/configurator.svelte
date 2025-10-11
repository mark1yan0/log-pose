<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import type { Map } from 'leaflet';
	import configurator from '$lib/services/configurator.svelte';
	import Settings from './settings.svelte';
	import Renderer from './renderer.svelte';
	import { Button } from '$lib/components/ui/button';
	import X from '@lucide/svelte/icons/x';

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
		<Dialog.Content
			class="flex h-[30rem] gap-2 border-none bg-transparent shadow-none sm:max-w-full"
			showCloseButton={false}
		>
			<Button
				variant="outline"
				class="absolute -top-5 right-6 !bg-sidebar"
				onclick={() => changeHandler(false)}
			>
				<X />
			</Button>
			<section id="country-renderer" class="flex-1 overflow-hidden rounded-lg border shadow">
				<Renderer />
			</section>
			<section id="country-config" class="flex-1 rounded-lg border bg-sidebar p-4 shadow">
				<Settings />
			</section>
		</Dialog.Content>
	</Dialog.Root>
{/if}
