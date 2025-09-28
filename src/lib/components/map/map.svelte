<script lang="ts">
	import { Map, GeoJSON as GeoJSONComponent, ControlZoom } from 'sveaflet';
	import { type Layer, type Map as TMap, type LeafletMouseEvent } from 'leaflet';
	// import MarkerIcon from '$lib/components/map/marker-icon.svelte';
	import defaults from '$lib/constants/defaults';
	import countriesManager from '$lib/services/countries';
	import { liveQuery } from 'dexie';
	import CountryModal from './modal/country-modal.svelte';
	import type { ICountry } from '$lib/services/db';

	let map = $state<TMap | undefined>();
	let geojson = $state<
		| {
				clearLayers: () => void;
				addData: (data: { type: 'FeatureCollection'; features: ICountry[] }) => void;
				resetStyle: (layer: unknown) => void;
		  }
		| undefined
	>();
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

	function style(feature: ICountry) {
		if (feature.properties.saved && feature.properties.style) {
			return feature.properties.style;
		}
		return defaults.countries.styles.default;
	}

	function hoverShape(ev: LeafletMouseEvent) {
		const layer = ev.target;

		layer.setStyle(defaults.countries.styles.hover);

		// update cursor size on mouseover
		// document.documentElement.style.setProperty('--cursor-size', '2rem');
		layer.bringToFront();
	}

	function outOfShape(ev: LeafletMouseEvent) {
		// TODO: make a generic assertin with error handling
		if (!geojson) {
			return;
		}
		const layer = ev.target;

		if (layer.feature.properties.saved) {
			geojson.resetStyle(layer);
			layer.setStyle(layer.feature.properties.style);
		} else {
			layer.setStyle(defaults.countries.styles.default);
		}

		// update cursor size on mouseout
		// document.documentElement.style.setProperty('--cursor-size', '4rem');
	}

	let selected = $state<ICountry | null>(null);
	function onShapeClick(ev: LeafletMouseEvent) {
		if (!map) {
			return;
		}

		// opens modal
		selected = ev.target.feature;
		map.fitBounds(ev.target.getBounds());
	}

	function onEachFeature(_: unknown, layer: Layer) {
		layer.on({
			mouseover: hoverShape,
			mouseout: outOfShape,
			click: onShapeClick
		});
	}
</script>

<div id="places-map" class="relative h-screen w-screen">
	<Map
		options={{
			center: defaults.map.center,
			zoom: defaults.map.zoom,
			zoomControl: false
		}}
		bind:instance={map}
	>
		<ControlZoom options={{ position: 'bottomleft' }} />
		<!-- {#if props.places && props.places.length > 0}
			{#each props.places as place (place.data.place_id)}
				<Marker
					onclick={() =>
						withMap(map, (m) => {
							m.flyTo(place.position, 8);
						})}
					latLng={place.position}
					options={{
						riseOnHover: true
					}}
				>
					<MarkerIcon contained marker={place.marker.icon} />
					<Popup>
						<h3>{place.data.name}</h3>
						<button onclick={() => placesManager.delete(place)}> delete </button>
					</Popup>
				</Marker>
			{/each}
		{/if} -->
		<!-- <TileLayer
			url={defaults.map.url}
			options={{
				maxZoom: defaults.map.maxZoom,
				attribution: defaults.map.attribution
			}}
		/> -->
		{#if !!$countries}
			<GeoJSONComponent
				bind:instance={geojson}
				json={{
					type: 'FeatureCollection',
					features: $countries
				}}
				options={{
					style,
					onEachFeature
				}}
			/>
		{/if}
	</Map>
</div>

<CountryModal {selected} {map} />
