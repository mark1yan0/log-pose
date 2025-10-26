<script lang="ts">
	import { Map, GeoJSON as GeoJSONComponent } from 'sveaflet';
	import { type Map as TMap, type GeoJSON } from 'leaflet';
	import defaults from '$lib/constants/defaults';
	import countriesManager from '$lib/services/countries';
	import { liveQuery } from 'dexie';
	import Download from '@lucide/svelte/icons/download';
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { snapdom } from '@zumer/snapdom';
	import { toast } from 'svelte-sonner';

	let opened = $state(false);

	let map = $state<TMap | undefined>();
	let geojson = $state<GeoJSON | undefined>();
	let countries = liveQuery(async () => await countriesManager.all());

	async function printHandler() {
		if (!map) {
			return;
		}

		const preview = document.querySelector<HTMLElement>('#print-map-preview .leaflet-container');

		if (!preview) {
			throw new Error('no map container');
		}

		const paths = preview.querySelectorAll(
			'svg path, svg circle, svg rect, svg polyline, svg polygon'
		);

		// snapdom doesn't capture css, so apply styles
		paths.forEach((path) => {
			const computed = getComputedStyle(path);

			// Apply computed fill if not 'none' and not transparent
			if (
				computed.fill &&
				computed.fill !== 'none' &&
				!computed.fill.includes('rgba(0, 0, 0, 0)')
			) {
				path.setAttribute('fill', computed.fill);
				path.setAttribute('fill-opacity', '0.9');
			}

			// Apply computed stroke if not 'none'
			if (computed.stroke && computed.stroke !== 'none') {
				path.setAttribute('stroke', computed.stroke);
			}
		});

		try {
			const result = await snapdom(preview, {
				width: 3840,
				height: 2160
			});

			await result.toPng();

			await result.download({ format: 'jpg', filename: 'my-capture' });
		} catch (err) {
			console.error(err);
			toast.error('Error occured while exporting the poster');
		}
	}
</script>

<Button
	onclick={() => (opened = true)}
	size="icon"
	class="over-map absolute right-6 bottom-6 scale-140 shadow-md transition hover:scale-180 hover:rounded-full hover:bg-primary hover:text-primary-foreground"
>
	<Download />
</Button>

<Dialog.Root open={opened} onOpenChange={() => (opened = false)}>
	<Dialog.Content class="min-w-[90%] lg:max-w-4xl lg:min-w-[0]">
		<Dialog.Header>
			<Dialog.Title>Print</Dialog.Title>
			<Dialog.Description>Print you custom poster</Dialog.Description>
		</Dialog.Header>
		<div
			id="print-map-preview"
			class="overflow-hidden rounded-2xl border border-primary"
			style="aspect-ratio: 16/8;"
		>
			<Map
				options={{
					center: defaults.map.center,
					zoom: defaults.map.zoom,
					zoomControl: false,
					attributionControl: false
				}}
				bind:instance={map}
			>
				{#if !!$countries}
					<GeoJSONComponent
						bind:instance={geojson}
						json={{
							type: 'FeatureCollection',
							features: $countries
						}}
						options={{
							style: (feature) => feature?.properties.style
						}}
					/>
				{/if}
			</Map>
		</div>

		<Dialog.Footer>
			<Button onclick={printHandler}>Confirm</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
