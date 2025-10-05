<script lang="ts">
	import defaults from '$lib/constants/defaults';
	import type { ICountry } from '$lib/services/db/index';
	import { Map, GeoJSON as GeoJSONComponent } from 'sveaflet';
	import { type Map as TMap } from 'leaflet';
	import configurator from '$lib/services/configurator.svelte';

	let map = $state<TMap | undefined>();
	let geojson = $state<
		| {
				clearLayers: () => void;
				addData: (data: { type: 'FeatureCollection'; features: ICountry[] }) => void;
				resetStyle: (layer: unknown) => void;
		  }
		| undefined
	>();

	// TODO: center the shape in the view
</script>

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
				style: defaults.countries.styles.default
				// onEachFeature
			}}
		/>
	</Map>
</div>
