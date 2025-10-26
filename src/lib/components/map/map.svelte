<script lang="ts">
	import { Map, GeoJSON as GeoJSONComponent, ControlZoom } from 'sveaflet';
	import { type Layer, type Map as TMap, type LeafletMouseEvent, type GeoJSON } from 'leaflet';
	import defaults from '$lib/constants/defaults';
	import countriesManager from '$lib/services/countries';
	import { liveQuery } from 'dexie';
	import Configurator from './configurator/configurator.svelte';
	import configurator from '$lib/services/configurator.svelte';

	let map = $state<TMap | undefined>();
	let geojson = $state<GeoJSON | undefined>();
	let countries = liveQuery(async () => await countriesManager.all());

	// update ui on liveQuery changes
	countries.subscribe((data) => {
		if (!geojson) {
			return;
		}
		geojson.clearLayers();
		geojson.addData({
			type: 'FeatureCollection',
			features: data
		});
	});

	function onShapeClick(ev: LeafletMouseEvent) {
		if (!map) {
			return;
		}

		const layer = ev.target;
		configurator.open(layer.feature);
		map.fitBounds(layer.getBounds());
	}

	function onEachFeature(_: unknown, layer: Layer) {
		layer.on({
			click: onShapeClick
		});
	}
</script>

<div id="map-container" class="relative h-screen w-screen">
	<Map
		options={{
			center: defaults.map.center,
			zoom: defaults.map.zoom,
			zoomControl: false
		}}
		bind:instance={map}
	>
		<ControlZoom options={{ position: 'bottomleft' }} />
		{#if !!$countries}
			<GeoJSONComponent
				bind:instance={geojson}
				json={{
					type: 'FeatureCollection',
					features: $countries
				}}
				options={{
					style: (feature) => feature?.properties.style,
					onEachFeature
				}}
			/>
		{/if}
	</Map>
</div>

<Configurator {map} />
