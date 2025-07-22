<script lang="ts">
    import { twMerge } from "tailwind-merge";

    const defaultValues = {
        x: 0,
        y: 0,
        w: 2, // rem
        h: 2, // rem
        hovering: false
    }

    let mouse = $state(defaultValues)

    function trackCursor<E extends HTMLDivElement>(cursor: E) {
        const rect = cursor.getBoundingClientRect()
        // what happens if the number of hoverables changes?
        const hoverables = document.querySelectorAll<HTMLElement>('button, input, a')

        function mouseListerner(event: MouseEvent) {
            mouse.x = event.clientX - rect.width / 2
            mouse.y = event.clientY - rect.height / 2
        }

        function hoverableOverListener(_: MouseEvent) {
            mouse.w = mouse.w + 2
            mouse.h = mouse.h + 2
            mouse.hovering = true

        }

        function hoverableOutListener(_: MouseEvent) {
            mouse.w = defaultValues.w
            mouse.h = defaultValues.h
            mouse.hovering = false
        }

        document.addEventListener('mousemove', mouseListerner);

        hoverables.forEach(h => {
            h.addEventListener('mouseover', hoverableOverListener)
            h.addEventListener('mouseout', hoverableOutListener)
        })
        return () => {
            document.removeEventListener('mousemove', mouseListerner)
            hoverables.forEach(h => {
                h.removeEventListener('mouseover', hoverableOverListener)
               h.removeEventListener('mousemove', hoverableOutListener)
            })
        }
    }
</script>

<div
    {@attach trackCursor}
    id="cursor"
    style={`
        --x: ${mouse.x}px;
        --y: ${mouse.y}px;
        --w: ${mouse.w}rem;
        --h: ${mouse.h}rem;
        transition: width 0.2s ease-in-out, height 0.2s ease-in-out;
    `}
    class={twMerge(`
        w-[var(--w)] h-[var(--h)] absolute top-[var(--y)] left-[var(--x)] z-[11000]
        rounded-full border-dashed border-2 border-primary-foreground
        bg-primary mix-blend-difference pointer-events-none
        animate-spin animation-duration-[10s] animation-timing-function-ease-in-out
        `, mouse.hovering ? 'translate-[-25%]' : ' translate-0')
    }
>
</div>
