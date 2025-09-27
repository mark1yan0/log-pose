<script lang="ts">
	let { children } = $props();
</script>

<main class="mx-auto mt-24 sm:max-w-4xl">
	{@render children?.()}
</main>
