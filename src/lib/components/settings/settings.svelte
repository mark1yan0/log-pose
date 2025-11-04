<script lang="ts">
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { Button } from '../ui/button';
	import SettingsIcon from '@lucide/svelte/icons/settings';
	import Sync from './sync.svelte';
	import { cn } from '$lib/utils';

	let view = $state<'sync' | 'theme'>('sync');

	function show(v: 'sync' | 'theme') {
		view = v;
	}
</script>

<Drawer.Root>
	<Drawer.Trigger asChild>
		<Button aria-label="Show settings" size="icon-sm" variant="link">
			<SettingsIcon />
		</Button>
	</Drawer.Trigger>
	<Drawer.Content class="h-[75vh] px-12">
		<Drawer.Header class="p-0">
			<div class="flex items-center gap-2">
				<Button
					variant="link"
					class={cn('p-0', view === 'theme' ? 'underline' : null)}
					onclick={() => show('theme')}
				>
					Theme
				</Button>
				<Button
					variant="link"
					class={cn('p-0', view === 'sync' ? 'underline' : null)}
					onclick={() => show('sync')}
				>
					Sync
				</Button>
			</div>
			<Drawer.Title class="capitalize">{view}</Drawer.Title>
			<Drawer.Description>
				{#if view === 'sync'}
					We do not save your data anywehere. <br />This way you are the owner of your data but
					there's no cloud sync between devices. <br />From this section you can export or import
					your data
				{:else}
					Change theme
				{/if}
			</Drawer.Description>
		</Drawer.Header>
		<br />
		{#if view === 'sync'}
			<Sync />
		{:else}
			<p>theme</p>
		{/if}

		<!-- <Drawer.Footer>
			<Button>Submit</Button>
			<Drawer.Close>Cancel</Drawer.Close>
		</Drawer.Footer> -->
	</Drawer.Content>
</Drawer.Root>
