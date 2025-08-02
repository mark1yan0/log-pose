<script lang="ts" module>
	import { page } from '$app/state';
	import { cn, type WithElementRef } from '$lib/utils';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
</script>

<script lang="ts">
	let {
		class: className,
		ref = $bindable(null),
		href = undefined,
		children,
		...restProps
	}: WithElementRef<HTMLAnchorAttributes> = $props();
</script>

<a
	data-active={page.url.pathname === href}
	bind:this={ref}
	class={cn('data-[active="true"]:underline', className)}
	{href}
	{...restProps}
>
	{@render children?.()}
</a>
