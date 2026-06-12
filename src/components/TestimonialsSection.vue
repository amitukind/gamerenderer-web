<script setup>
import { testimonials } from '@/data/content'
</script>

<template>
  <section id="testimonials" class="section quotes">
    <div class="container">
      <div class="section-head section-head--center">
        <p class="eyebrow" v-reveal>{{ testimonials.kicker }}</p>
        <h2 v-reveal="60">{{ testimonials.title }}</h2>
      </div>

      <div class="quotes__grid">
        <figure v-for="(t, i) in testimonials.items" :key="i" class="quote" v-reveal="i * 100">
          <span class="quote__mark" aria-hidden="true">“</span>
          <blockquote>{{ t.quote }}</blockquote>
          <figcaption>
            <span class="quote__author">{{ t.author }}</span>
            <span class="quote__meta">{{ t.meta }}</span>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.quotes__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.quote {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 3.4rem 3rem 3rem;
  border-radius: var(--radius-lg);
  background: linear-gradient(170deg, var(--color-surface-2), var(--color-surface));
  border: 1px solid var(--color-border);
  box-shadow: var(--bevel);
  transition: transform var(--transition), border-color var(--transition);
}

.quote:hover {
  transform: perspective(var(--persp)) rotateX(2deg) translateY(-5px);
  border-color: var(--color-border-strong);
}

.quote__mark {
  font-family: var(--font-display);
  font-size: 6rem;
  font-weight: 700;
  line-height: 0.6;
  background: var(--grad-text);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 1.6rem;
}

.quote blockquote {
  flex: 1;
  margin: 0 0 2.4rem;
  font-size: 1.6rem;
  font-style: italic;
  line-height: 1.7;
  color: var(--color-text);
}

.quote figcaption {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding-top: 1.8rem;
  border-top: 1px solid var(--color-border);
}

.quote__author {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-heading);
}

.quote__meta {
  font-size: 1.35rem;
  color: var(--color-accent-bright);
}

@media (max-width: 880px) {
  .quotes__grid {
    grid-template-columns: 1fr;
    max-width: 620px;
    margin-inline: auto;
  }
}
</style>
