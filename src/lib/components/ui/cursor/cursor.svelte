<script lang="ts">
    import { twMerge } from "tailwind-merge";

    const defaultValues = {
        x: 0,
        y: 0,
        hovering: false
    }

    let mouse = $state(defaultValues)

    function isHovering(target: EventTarget | null): target is HTMLButtonElement | HTMLInputElement | HTMLAnchorElement {
        const instances = [HTMLButtonElement, HTMLInputElement, HTMLAnchorElement]
        return instances.some(instance => target instanceof instance)
    }

    function initCursor<E extends HTMLDivElement>(cursor: E) {
        const rect = cursor.getBoundingClientRect()

        function mouseListerner(event: MouseEvent) {
            mouse.x = event.clientX - rect.width / 2
            mouse.y = event.clientY - rect.height / 2

            if (isHovering(event.target)) {
                if (event.target instanceof HTMLButtonElement && !event.target.disabled) {
                    mouse.hovering = true
                } else {
                    mouse.hovering = true
                }
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
        `, mouse.hovering ? 'w-[3rem] h-[3rem]' : 'w-[2rem] h-[2rem]')
    }
>
</div>
