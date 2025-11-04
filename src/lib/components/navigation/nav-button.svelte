<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Button } from '../ui/button';
	import { page } from '$app/state';
	import { cn } from '$lib/utils';

	interface IProps {
		label: string;
		href: string;
		children: Snippet;
	}

	let { label, href, children }: IProps = $props();
</script>

<!-- TODO: focus visible -->
<Button
	aria-label={`Go to ${label}`}
	{href}
	size="icon-lg"
	variant="link"
	class="group relative w-fit min-w-10 gap-0 overflow-hidden hover:mx-4 hover:gap-2 data-[active='true']:mx-4 data-[active='true']:gap-2 data-[active='true']:bg-transparent data-[active='true']:text-secondary-foreground"
>
	{@render children()}
	<span
		class={cn(
			'invisible w-0 -translate-x-full transition-[translate] group-hover:visible group-hover:w-fit group-hover:translate-x-0',
			page.url.pathname === href ? 'visible w-fit translate-x-0 underline' : ''
		)}
	>
		{label}
	</span>
</Button>
