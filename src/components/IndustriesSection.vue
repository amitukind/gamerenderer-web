<script setup>
import { industries } from '@/data/content'
</script>

<template>
  <section id="industries" class="section section--surface industries">
    <div class="container">
      <div class="section-head">
        <p class="eyebrow" v-reveal>{{ industries.kicker }}</p>
        <h2 v-reveal="60">{{ industries.title }}</h2>
      </div>

      <div class="industries__grid">
        <article v-for="(item, i) in industries.items" :key="item.title" class="industry" v-reveal="(i % 3) * 80">
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.industries__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.industry {
  position: relative;
  padding: 2.8rem 2.6rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  box-shadow: var(--bevel);
  overflow: hidden;
  transition: transform var(--transition), border-color var(--transition);
}

.industry::after {
  content: '';
  position: absolute;
  left: 0;
  top: 2.6rem;
  bottom: 2.6rem;
  width: 3px;
  border-radius: 3px;
  background: var(--grad-accent);
  opacity: 0.45;
  transition: opacity var(--transition);
}

.industry:hover {
  /* lean toward the accent edge on the left */
  transform: perspective(var(--persp)) rotateY(-1.5deg) translateY(-4px);
  border-color: var(--color-border-strong);
}

.industry:hover::after {
  opacity: 1;
}

.industry h3 {
  font-size: 1.8rem;
  margin-bottom: 0.9rem;
}

.industry p {
  font-size: 1.5rem;
  color: var(--color-text);
  margin: 0;
}

@media (max-width: 880px) {
  .industries__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .industries__grid {
    grid-template-columns: 1fr;
  }
}
</style>
