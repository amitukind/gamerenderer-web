<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import BaseIcon from './BaseIcon.vue'

const visible = ref(false)

function onScroll() {
  visible.value = window.scrollY > window.innerHeight
}
function toTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <Transition name="fade-up">
    <button v-show="visible" class="to-top" aria-label="Back to top" @click="toTop">
      <BaseIcon name="arrowUp" :size="22" />
    </button>
  </Transition>
</template>

<style scoped>
.to-top {
  position: fixed;
  right: clamp(1.6rem, 3vw, 3rem);
  bottom: clamp(1.6rem, 3vw, 3rem);
  z-index: 90;
  display: grid;
  place-items: center;
  width: 5.2rem;
  height: 5.2rem;
  border-radius: 50%;
  background: var(--grad-accent);
  color: #fff;
  border: none;
  cursor: pointer;
  box-shadow: var(--shadow-accent);
  transition: transform var(--transition);
}

.to-top:hover {
  transform: translateY(-4px);
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(16px);
}
</style>
