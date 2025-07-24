<script lang="ts">
    import { twMerge } from "tailwind-merge";

    const defaultValues = {
        x: 0,
        y: 0,
        hovering: false
    }

    let mouse = $state(defaultValues)

    function isHovering(target: EventTarget | null): target is HTMLButtonElement | HTMLInputElement | HTMLAnchorElement {
        if (!(target instanceof HTMLElement)) {
            return false
        }

        const instances = [HTMLButtonElement, HTMLInputElement, HTMLAnchorElement]

        // TODO: handle disabled buttons?

        if (instances.some(instance => target instanceof instance)) {
            return true
        }

        // TODO: handle geojson shapes, which is only a map layer (svg)
        if (target.role === 'button') {
            return true
        }

        return false
    }

    function initCursor<E extends HTMLDivElement>(cursor: E) {
        const rect = cursor.getBoundingClientRect()

        function mouseListerner(event: MouseEvent) {
            mouse.x = event.clientX - rect.width / 2
            mouse.y = event.clientY - rect.height / 2

            if (isHovering(event.target)) {
                mouse.hovering = true
            } else {
                mouse.hovering = false
            }
        }

        document.addEventListener('mousemove', mouseListerner);

        return () => {
            document.removeEventListener('mousemove', mouseListerner)
        }
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
    class={twMerge(`
        absolute top-[var(--y)] left-[var(--x)] z-[11000]
        rounded-full border-dashed border-2 border-primary-foreground
        bg-primary mix-blend-difference pointer-events-none
        animate-spin animation-duration-[10s] animation-timing-function-ease-in-out
        `, mouse.hovering ? 'w-[1.5rem] h-[1.5rem]' : 'w-[var(--cursor-size)] h-[var(--cursor-size)]')
    }
>
</div>
