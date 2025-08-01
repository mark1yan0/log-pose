<script lang="ts">
	import type { IPlace } from '$lib/types/data';

	const { place }: { place: IPlace } = $props();
</script>

<div>
	<h3>{place.data.name}</h3>
	<p class="text-xs">{place.data.display_name}</p>
</div>
