<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useCountUp } from '@/composables/useCountUp'

const props = defineProps({
  value: { type: Number, required: true },
  suffix: { type: String, default: '' },
  label: { type: String, required: true },
})

const el = ref(null)
const { display, start } = useCountUp(props.value)
let observer

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        start()
        observer.disconnect()
      }
    },
    { threshold: 0.4 },
  )
  observer.observe(el.value)
})
onUnmounted(() => observer && observer.disconnect())
</script>

<template>
  <div ref="el" class="stat">
    <div class="stat__value">{{ display }}<span class="stat__suffix">{{ suffix }}</span></div>
    <div class="stat__label">{{ label }}</div>
  </div>
</template>

<style scoped>
.stat__value {
  font-family: var(--font-display);
  font-size: clamp(3.4rem, 5vw, 4.8rem);
  font-weight: 700;
  line-height: 1;
  color: var(--color-heading);
  background: var(--grad-text);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.stat__suffix {
  color: var(--color-accent-bright);
  -webkit-text-fill-color: var(--color-accent-bright);
}

.stat__label {
  margin-top: 0.8rem;
  font-size: 1.45rem;
  color: var(--color-text-dim);
  letter-spacing: 0.02em;
}
</style>
