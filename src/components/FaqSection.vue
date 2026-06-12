<script setup>
import { ref } from 'vue'
import { faq } from '@/data/content'
import BaseIcon from './BaseIcon.vue'

const open = ref(0)

function toggle(i) {
  open.value = open.value === i ? -1 : i
}
</script>

<template>
  <section id="faq" class="section section--surface faq">
    <div class="container container--narrow">
      <div class="section-head section-head--center">
        <p class="eyebrow" v-reveal>{{ faq.kicker }}</p>
        <h2 v-reveal="60">{{ faq.title }}</h2>
      </div>

      <div class="faq__list" v-reveal="80">
        <div v-for="(item, i) in faq.items" :key="i" class="faq__item" :class="{ 'is-open': open === i }">
          <h3 class="faq__q">
            <button :aria-expanded="open === i" @click="toggle(i)">
              <span>{{ item.q }}</span>
              <span class="faq__chevron"><BaseIcon name="chevron" :size="18" /></span>
            </button>
          </h3>
          <div class="faq__a-wrap" :style="{ gridTemplateRows: open === i ? '1fr' : '0fr' }">
            <div class="faq__a">
              <p>{{ item.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq__list {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.faq__item {
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-surface);
  box-shadow: var(--bevel);
  overflow: hidden;
  transition: border-color var(--transition);
}

.faq__item.is-open {
  border-color: var(--color-accent);
}

.faq__q {
  margin: 0;
}

.faq__q button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  width: 100%;
  padding: 2rem 2.4rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: var(--font-display);
  font-size: 1.65rem;
  font-weight: 600;
  color: var(--color-heading);
  transition: color var(--transition);
}

.faq__q button:hover {
  color: var(--color-accent-bright);
}

.faq__chevron {
  flex: none;
  display: grid;
  place-items: center;
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  border: 1px solid var(--color-border-strong);
  color: var(--color-text);
  transition: transform var(--transition), color var(--transition), border-color var(--transition);
}

.faq__item.is-open .faq__chevron {
  transform: rotate(180deg);
  color: var(--color-accent-bright);
  border-color: var(--color-accent);
}

.faq__a-wrap {
  display: grid;
  transition: grid-template-rows 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.faq__a {
  overflow: hidden;
}

.faq__a p {
  margin: 0;
  padding: 0 2.4rem 2.4rem;
  font-size: 1.55rem;
  color: var(--color-text);
  line-height: 1.75;
  /* faint page-fold as the answer opens; lands flat for reading */
  transform: perspective(600px) rotateX(-4deg);
  transform-origin: top center;
  transition: transform 0.45s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.faq__item.is-open .faq__a p {
  transform: perspective(600px) rotateX(0deg);
}
</style>
