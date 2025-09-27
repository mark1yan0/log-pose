<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import Button from '../button/button.svelte';

	// TODO: make cursor prettier on hover on items. For example add a call to action. Make it promiment
	const defaultValues = {
		x: 0,
		y: 0,
		hovering: false,
		hoveringCountry: false
	};

	let mouse = $state(defaultValues);

	function isHovering(
		target: EventTarget | null
	): target is HTMLButtonElement | HTMLInputElement | HTMLAnchorElement {
		if (!(target instanceof HTMLElement)) {
			return false;
		}

		const instances = [HTMLButtonElement, HTMLInputElement, HTMLAnchorElement];

		// TODO: handle disabled buttons?

		if (instances.some((instance) => target instanceof instance)) {
			return true;
		}

		// TODO: handle geojson shapes, which is only a map layer (svg)
		if (target.role === 'button') {
			return true;
		}

		return false;
	}

	function isHoveringCountry(target: EventTarget | null) {
		if (!(target instanceof HTMLElement)) {
			return false;
		}

		if (target.classList.contains('leaflet-interactive')) {
			return true;
		}

		return false;
	}

	function initCursor<E extends HTMLDivElement>(cursor: E) {
		const rect = cursor.getBoundingClientRect();

		function mouseListerner(event: MouseEvent) {
			mouse.x = event.clientX - rect.width / 2;
			mouse.y = event.clientY - rect.height / 2;

			if (isHovering(event.target)) {
				mouse.hovering = true;
			} else {
				mouse.hovering = false;
			}
			if (isHoveringCountry(event.target)) {
				mouse.hoveringCountry = true;
				mouse.hovering = false;
			} else {
				mouse.hoveringCountry = false;
				mouse.hovering = false;
			}
		}

		document.addEventListener('mousemove', mouseListerner);

		return () => {
			document.removeEventListener('mousemove', mouseListerner);
		};
	}
</script>

<div
	{@attach initCursor}
	id="cursor"
	style={`
        --x: ${mouse.x}px;
        --y: ${mouse.y}px;
        transition: width 0.2s ease-in-out, height 0.2s ease-in-out;
    `}
	class={twMerge('cursor', mouse.hovering ? 'cursor-hovering' : '')}
></div>

{#if mouse.hoveringCountry}
	<ul
		style={`
           --x: ${mouse.x}px;
           --y: ${mouse.y + 48}px;
       `}
		class={`
	    absolute top-[var(--y)] left-[var(--x)] z-[11000] flex
		items-center gap-4
	`}
	>
		<li><Button variant="default">Add</Button></li>
		<li><button>Edit</button></li>
		<li><button>Delete</button></li>
	</ul>
{/if}
