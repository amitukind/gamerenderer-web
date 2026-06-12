<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { webglAvailable } from '@/three/webgl'
import polyPng from '@/assets/images/3d/poly.png'
import atomPng from '@/assets/images/3d/atom.png'
import solarPng from '@/assets/images/3d/solar.png'

const props = defineProps({
  scene: {
    type: String,
    required: true,
    validator: (v) => ['poly', 'atom', 'solar'].includes(v),
  },
})

const FALLBACKS = { poly: polyPng, atom: atomPng, solar: solarPng }

// Static import map keeps each scene an analyzable, separately-chunked module for Vite.
const LOADERS = {
  poly: () => import('@/three/scenes/poly.js'),
  atom: () => import('@/three/scenes/atom.js'),
  solar: () => import('@/three/scenes/solar.js'),
}

const wrapper = ref(null)
const canvas = ref(null)
/** below 1100px the component renders nothing at all — zero cost on mobile */
const active = ref(false)
/** static <img> mode (reduced motion, no WebGL, or runtime error) */
const fallback = ref(false)
/** drives the fade-in once canvas/img is actually showing */
const shown = ref(false)

const fallbackSrc = computed(() => FALLBACKS[props.scene])

let instance = null
let io = null
let ro = null
let intersecting = false
let loading = false
let destroyed = false
let warned = false

function reveal() {
  // double rAF so the opacity transition reliably plays from 0
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (!destroyed) shown.value = true
    })
  })
}

function failToFallback(err) {
  if (!warned) {
    warned = true
    console.warn('[Scene3D] 3D scene failed, using static fallback image:', err)
  }
  if (instance) {
    try {
      instance.dispose()
    } catch {
      /* already broken — nothing more to release */
    }
    instance = null
  }
  ro?.disconnect()
  ro = null
  io?.disconnect()
  io = null
  fallback.value = true
  reveal()
}

function onVisibility() {
  if (!instance) return
  if (document.hidden) {
    instance.stop()
  } else if (intersecting) {
    instance.start()
  }
}

async function onIntersect(entries) {
  intersecting = entries[entries.length - 1].isIntersecting

  if (!intersecting) {
    instance?.stop()
    return
  }

  if (instance) {
    if (!document.hidden) instance.start()
    return
  }

  if (loading) return
  loading = true
  try {
    const { createScene } = await LOADERS[props.scene]()
    if (destroyed || !canvas.value || !wrapper.value) return
    instance = createScene(canvas.value)
    const rect = wrapper.value.getBoundingClientRect()
    instance.resize(Math.max(1, Math.round(rect.width)), Math.max(1, Math.round(rect.height)))
    if (intersecting && !document.hidden) instance.start()
    ro = new ResizeObserver((roEntries) => {
      if (!instance) return
      const { width, height } = roEntries[roEntries.length - 1].contentRect
      if (width > 0 && height > 0) instance.resize(width, height)
    })
    ro.observe(wrapper.value)
    reveal()
  } catch (err) {
    failToFallback(err)
  } finally {
    loading = false
  }
}

onMounted(async () => {
  // (a) small viewports: stay completely inert
  if (window.innerWidth < 1100) return
  active.value = true

  // (b) reduced motion or no WebGL: static image
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reducedMotion || !webglAvailable()) {
    fallback.value = true
    await nextTick()
    reveal()
    return
  }

  // (c) live mode: lazy-load the scene chunk on first approach into view
  await nextTick()
  if (destroyed || !wrapper.value) return
  io = new IntersectionObserver(onIntersect, { rootMargin: '120px', threshold: 0 })
  io.observe(wrapper.value)
  document.addEventListener('visibilitychange', onVisibility)
})

onUnmounted(() => {
  destroyed = true
  document.removeEventListener('visibilitychange', onVisibility)
  io?.disconnect()
  io = null
  ro?.disconnect()
  ro = null
  instance?.dispose()
  instance = null
})
</script>

<template>
  <div v-if="active" ref="wrapper" class="scene3d" :class="{ 'is-on': shown }" aria-hidden="true">
    <img v-if="fallback" :src="fallbackSrc" alt="" loading="lazy" decoding="async" />
    <canvas v-else ref="canvas"></canvas>
  </div>
</template>

<style scoped>
.scene3d {
  position: absolute;
  pointer-events: none;
  z-index: 0;
  opacity: 0;
  transition: opacity 1.2s ease;
  /* soft edge blend so the render melts into the section background */
  mask-image: radial-gradient(closest-side, #000 62%, transparent 100%);
  -webkit-mask-image: radial-gradient(closest-side, #000 62%, transparent 100%);
}

.scene3d.is-on {
  opacity: 0.85;
}

canvas,
img {
  width: 100%;
  height: 100%;
  display: block;
}

@media (max-width: 1099px) {
  .scene3d {
    display: none;
  }
}
</style>
