import { onMounted, onUnmounted, ref } from 'vue'

/**
 * Tracks which section id is currently in view so the nav can highlight it.
 * @param {string[]} ids - section ids to observe, in document order.
 */
export function useActiveSection(ids) {
  const active = ref(ids[0])
  let observer

  onMounted(() => {
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) active.value = entry.target.id
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    targets.forEach((t) => observer.observe(t))
  })

  onUnmounted(() => observer && observer.disconnect())

  return { active }
}
