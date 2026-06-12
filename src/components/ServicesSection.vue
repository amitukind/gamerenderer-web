<script setup>
import { services } from '@/data/content'
import BaseIcon from './BaseIcon.vue'
import Scene3D from './Scene3D.vue'
</script>

<template>
  <section id="services" class="section section--surface services">
    <Scene3D scene="atom" class="services__scene" />
    <div class="container">
      <div class="section-head">
        <p class="eyebrow" v-reveal>What we do</p>
        <h2 v-reveal="60">Full-cycle game development, end to end.</h2>
        <p class="lead" v-reveal="120">
          One team for the whole journey — concept, art, engineering, optimization and launch.
          Web-first, Unity-strong, and equally at home in XR.
        </p>
      </div>

      <div class="services__grid">
        <article
          v-for="(s, i) in services"
          :key="s.title"
          class="service"
          v-reveal="(i % 3) * 80"
        >
          <div class="service__icon">
            <BaseIcon :name="s.icon" :size="26" />
          </div>
          <h3 class="service__title">{{ s.title }}</h3>
          <p class="service__text">{{ s.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* fills the empty zone right of the section-head; cards (container z1) slide over it */
.services__scene {
  top: clamp(2rem, 5vw, 5rem);
  right: 3%;
  width: min(24vw, 360px);
  aspect-ratio: 1;
}

.services__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.service {
  position: relative;
  padding: 3.4rem 3rem;
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: var(--bevel);
  overflow: hidden;
  transition: transform var(--transition), border-color var(--transition),
    background var(--transition), box-shadow var(--transition);
}

.service::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--grad-glow);
  opacity: 0;
  transition: opacity var(--transition);
}

.service:hover {
  /* subtle 3D lift — top edge tips back a touch */
  transform: perspective(var(--persp)) rotateX(2deg) rotateY(-1.5deg) translateY(-6px);
  border-color: var(--color-border-strong);
  background: var(--color-surface-2);
  box-shadow: var(--bevel), var(--shadow-card);
}

.service:hover::before {
  opacity: 1;
}

.service > * {
  position: relative;
  z-index: 1;
}

.service__icon {
  display: grid;
  place-items: center;
  width: 6rem;
  height: 6rem;
  border-radius: var(--radius);
  background: var(--color-accent-soft);
  color: var(--color-accent-bright);
  margin-bottom: 2.2rem;
  transition: transform var(--transition);
}

.service:hover .service__icon {
  transform: scale(1.08) rotate(-4deg);
}

.service__title {
  font-size: 2rem;
  margin-bottom: 1.2rem;
}

.service__text {
  font-size: 1.55rem;
  color: var(--color-text);
  margin: 0;
}

@media (max-width: 880px) {
  .services__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .services__grid {
    grid-template-columns: 1fr;
  }
}
</style>
