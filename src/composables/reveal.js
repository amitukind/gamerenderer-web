/**
 * v-reveal — lightweight scroll-reveal directive backed by a single shared
 * IntersectionObserver. Adds `.is-visible` when an element scrolls into view.
 *
 * Usage:
 *   <div v-reveal>...</div>
 *   <div v-reveal="120">...</div>   // stagger delay in ms
 */

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    }
  },
  { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
)

export const reveal = {
  mounted(el, binding) {
    el.classList.add('reveal')
    const delay = Number(binding.value) || 0
    if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`)

    if (REDUCED) {
      el.classList.add('is-visible')
      return
    }
    observer.observe(el)
  },
  unmounted(el) {
    observer.unobserve(el)
  },
}
