<script setup>
import { whyUs } from '@/data/content'
import BaseIcon from './BaseIcon.vue'
</script>

<template>
  <section id="why-us" class="section why">
    <div class="container">
      <div class="section-head">
        <p class="eyebrow" v-reveal>{{ whyUs.kicker }}</p>
        <h2 v-reveal="60">{{ whyUs.title }}</h2>
        <p class="lead" v-reveal="120">{{ whyUs.body }}</p>
      </div>

      <div class="why__grid">
        <article v-for="(r, i) in whyUs.reasons" :key="r.title" class="reason" v-reveal="(i % 3) * 80">
          <div class="reason__icon"><BaseIcon :name="r.icon" :size="24" /></div>
          <h3 class="reason__title">{{ r.title }}</h3>
          <p class="reason__text">{{ r.text }}</p>
        </article>
      </div>

      <div class="engage" v-reveal>
        <h3 class="engage__title">{{ whyUs.engagement.title }}</h3>
        <div class="engage__grid">
          <div v-for="(m, i) in whyUs.engagement.models" :key="m.title" class="engage__card" v-reveal="i * 80">
            <span class="engage__num">{{ String(i + 1).padStart(2, '0') }}</span>
            <h4>{{ m.title }}</h4>
            <p>{{ m.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.why__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.reason {
  position: relative;
  padding: 3rem 2.8rem;
  border-radius: var(--radius-lg);
  background: linear-gradient(170deg, var(--color-surface-2), var(--color-surface));
  border: 1px solid var(--color-border);
  box-shadow: var(--bevel);
  transition: transform var(--transition), border-color var(--transition);
}

.reason::before {
  content: '';
  position: absolute;
  top: 0;
  left: 2.8rem;
  right: 2.8rem;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(154, 95, 206, 0.55), transparent);
  opacity: 0;
  transition: opacity var(--transition);
}

.reason:hover {
  transform: perspective(var(--persp)) rotateX(2deg) rotateY(1.5deg) translateY(-5px);
  border-color: var(--color-border-strong);
}

.reason:hover::before {
  opacity: 1;
}

.reason__icon {
  display: grid;
  place-items: center;
  width: 5.4rem;
  height: 5.4rem;
  border-radius: var(--radius);
  background: var(--color-accent-soft);
  color: var(--color-accent-bright);
  margin-bottom: 2rem;
}

.reason__title {
  font-size: 1.85rem;
  margin-bottom: 1rem;
}

.reason__text {
  font-size: 1.5rem;
  color: var(--color-text);
  margin: 0;
}

/* ---- engagement models ---- */
.engage {
  margin-top: clamp(5rem, 8vw, 8rem);
  padding: clamp(3rem, 5vw, 5rem);
  border-radius: var(--radius-lg);
  background:
    radial-gradient(80% 120% at 100% 0%, rgba(121, 62, 165, 0.16) 0%, transparent 55%),
    var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: var(--bevel);
}

.engage__title {
  font-size: 2.2rem;
  margin-bottom: 3rem;
}

.engage__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(2rem, 4vw, 4rem);
}

.engage__num {
  display: block;
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: var(--color-accent-bright);
  margin-bottom: 1.2rem;
}

.engage__card h4 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.engage__card p {
  font-size: 1.5rem;
  color: var(--color-text);
  margin: 0;
}

@media (max-width: 880px) {
  .why__grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .engage__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .why__grid {
    grid-template-columns: 1fr;
  }
}
</style>
