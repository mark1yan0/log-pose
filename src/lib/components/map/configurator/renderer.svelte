<script lang="ts">
	import defaults from '$lib/constants/defaults';
	import { Map, GeoJSON as GeoJSONComponent } from 'sveaflet';
	import { type Map as TMap } from 'leaflet';

	import configurator from '$lib/services/configurator.svelte';
	import type { ICountry } from '$lib/services/db';

	if (!configurator.draft) {
		throw new Error('Renderer could not be opened as no contry selected');
	}

	let map = $state<TMap | undefined>();
	let geojson = $state<
		| {
				clearLayers: () => void;
				addData: (data: { type: 'FeatureCollection'; features: ICountry[] }) => void;
				resetStyle: (layer: unknown) => void;
				setStyle: (style: object) => void;
		  }
		| undefined
	>();

	$effect(() => {
		if (!configurator.draft || !geojson) {
			throw new Error('Renderer could not be opened as no contry selected');
		}

		geojson.setStyle(configurator.draft.properties.style);
	});

	// TODO: center the shape in the view
</script>

{#if configurator.draft}
	<div class="h-full">
		<Map
			options={{
				center: defaults.map.center,
				zoom: defaults.map.zoom,
				zoomControl: false
			}}
			bind:instance={map}
		>
			<GeoJSONComponent
				bind:instance={geojson}
				json={{
					type: 'FeatureCollection',
					features: [configurator.draft]
				}}
				options={{
					style: configurator.draft.properties.style
				}}
			/>
		</Map>
	</div>
{/if}
