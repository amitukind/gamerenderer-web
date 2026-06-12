<script setup>
import { process, techGroups } from '@/data/content'
</script>

<template>
  <section id="process" class="section process">
    <div class="container">
      <div class="section-head">
        <p class="eyebrow" v-reveal>How we work</p>
        <h2 v-reveal="60">A clear path from idea to launch.</h2>
        <p class="lead" v-reveal="120">
          Milestone-driven, transparent and collaborative. You always know what we are building,
          why, and what comes next.
        </p>
      </div>

      <ol class="process__steps">
        <li v-for="(p, i) in process" :key="p.step" class="step" v-reveal="i * 80">
          <span class="step__num">{{ p.step }}</span>
          <h3 class="step__title">{{ p.title }}</h3>
          <p class="step__text">{{ p.text }}</p>
        </li>
      </ol>

      <div class="tech">
        <h3 class="tech__heading" v-reveal>Our toolbox</h3>
        <div class="tech__grid">
          <div v-for="(g, i) in techGroups" :key="g.title" class="tech__group" v-reveal="i * 70">
            <h4 class="tech__group-title">{{ g.title }}</h4>
            <ul class="tech__tags">
              <li v-for="item in g.items" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.process__steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  counter-reset: step;
}

.step {
  position: relative;
  padding: 3rem 2.4rem;
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: var(--bevel);
  transition: transform var(--transition), border-color var(--transition);
}

.step:hover {
  transform: perspective(var(--persp)) rotateX(1.5deg) translateY(-4px);
  border-color: var(--color-border-strong);
}

.step::after {
  content: '';
  position: absolute;
  top: 4.6rem;
  right: -1rem;
  width: 2rem;
  height: 2px;
  background: var(--color-border-strong);
}

.step:last-child::after {
  display: none;
}

.step__num {
  font-family: var(--font-display);
  font-size: 3.4rem;
  font-weight: 700;
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1.4px var(--color-accent-bright);
  display: block;
  margin-bottom: 1.8rem;
}

.step__title {
  font-size: 1.9rem;
  margin-bottom: 1rem;
}

.step__text {
  font-size: 1.5rem;
  color: var(--color-text);
  margin: 0;
}

/* ---- tech ---- */
.tech {
  margin-top: clamp(5rem, 8vw, 8rem);
  padding-top: clamp(4rem, 6vw, 6rem);
  border-top: 1px solid var(--color-border);
}

.tech__heading {
  font-size: 2.2rem;
  margin-bottom: 3rem;
}

.tech__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem 2.4rem;
}

.tech__group-title {
  font-size: 1.45rem;
  letter-spacing: 0.04em;
  color: var(--color-accent-bright);
  margin-bottom: 1.6rem;
}

.tech__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.tech__tags li {
  font-size: 1.35rem;
  padding: 0.6rem 1.2rem;
  border-radius: var(--radius-pill);
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  transition: color var(--transition), border-color var(--transition);
}

.tech__tags li:hover {
  color: var(--color-heading);
  border-color: var(--color-accent);
}

@media (max-width: 900px) {
  .process__steps {
    grid-template-columns: repeat(2, 1fr);
  }
  .step::after {
    display: none;
  }
  .tech__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 540px) {
  .process__steps,
  .tech__grid {
    grid-template-columns: 1fr;
  }
}
</style>
