import { onUnmounted, ref } from 'vue'

/**
 * Animated count-up that fires once when triggered (e.g. on scroll into view).
 * Respects prefers-reduced-motion by snapping straight to the target value.
 */
export function useCountUp(target, duration = 1600) {
  const display = ref(0)
  let raf = null
  let started = false
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function start(now) {
    if (started) return
    started = true

    if (reduced) {
      display.value = target
      return
    }

    const begin = now ?? performance.now()
    const tick = (t) => {
      const progress = Math.min((t - begin) / duration, 1)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3)
      display.value = Math.round(target * eased)
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
  }

  onUnmounted(() => raf && cancelAnimationFrame(raf))

  return { display, start }
}
