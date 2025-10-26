<script lang="ts">
	import defaults from '$lib/constants/defaults';
	import { Map, GeoJSON as GeoJSONComponent } from 'sveaflet';
	import { type LatLngExpression, type Map as TMap, type GeoJSON } from 'leaflet';

	import configurator from '$lib/services/configurator.svelte';

	if (!configurator.draft) {
		throw new Error('Renderer could not be opened as no contry selected');
	}

	let map = $state<TMap | undefined>();
	let geojson = $state<GeoJSON | undefined>();
	let center = $state<LatLngExpression>(defaults.map.center);

	// TODO: center the shape in the view
</script>

{#if configurator.draft}
	<div class="h-full">
		<Map
			options={{
				center,
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
