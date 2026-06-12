<script setup>
import { onMounted, ref } from 'vue'
// LCP image: AVIF/WebP srcsets generated at build time by vite-imagetools
import heroAvif from '@/assets/images/hero-studio.jpg?format=avif&w=768;1280;1920&as=srcset'
import heroWebp from '@/assets/images/hero-studio.jpg?format=webp&w=768;1280;1920&as=srcset'
import heroJpg from '@/assets/images/hero-studio.jpg?format=jpeg&w=1280'
import { hero } from '@/data/content'
import BaseIcon from './BaseIcon.vue'

const mounted = ref(false)

function go(target, event) {
  event.preventDefault()
  document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  // next frame so the entry transition plays
  requestAnimationFrame(() => (mounted.value = true))
})
</script>

<template>
  <section id="top" class="hero" :class="{ 'is-in': mounted }">
    <picture>
      <source type="image/avif" :srcset="heroAvif" sizes="100vw" />
      <source type="image/webp" :srcset="heroWebp" sizes="100vw" />
      <img
        class="hero__bg"
        :src="heroJpg"
        sizes="100vw"
        width="1280"
        height="1280"
        alt=""
        fetchpriority="high"
        decoding="async"
        aria-hidden="true"
      />
    </picture>
    <div class="hero__overlay"></div>
    <div class="hero__grid"></div>

    <div class="hero__inner container">
      <p class="hero__kicker">{{ hero.kicker }}</p>

      <h1 class="hero__title">
        <span v-for="(line, i) in hero.titleLines" :key="i" class="hero__line">
          <span class="hero__line-inner" :style="{ '--d': `${0.15 + i * 0.12}s` }">{{ line }}</span>
        </span>
      </h1>

      <p class="hero__subtitle">{{ hero.subtitle }}</p>

      <div class="hero__cta">
        <a :href="`#${hero.primaryCta.target}`" class="btn btn--primary btn--lg" @click="go(hero.primaryCta.target, $event)">
          {{ hero.primaryCta.label }}
          <BaseIcon name="arrow" :size="18" />
        </a>
        <a :href="`#${hero.secondaryCta.target}`" class="btn btn--ghost btn--lg" @click="go(hero.secondaryCta.target, $event)">
          {{ hero.secondaryCta.label }}
        </a>
      </div>
    </div>

    <a href="#about" class="hero__scroll" @click="go('about', $event)" aria-label="Scroll to content">
      <span>Scroll</span>
      <span class="hero__scroll-line"></span>
    </a>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding-block: var(--header-h);
}

.hero picture {
  display: contents;
}

.hero__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transform: scale(1.12);
  transition: transform 8s ease-out;
}
.hero.is-in .hero__bg {
  transform: scale(1);
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(13, 13, 13, 0.55) 0%, rgba(18, 18, 18, 0.82) 55%, var(--color-bg) 100%),
    radial-gradient(120% 80% at 15% 20%, rgba(121, 62, 165, 0.42) 0%, transparent 55%);
}

/* perspective grid floor — recedes toward a horizon behind the headline */
.hero__grid {
  position: absolute;
  left: -12%;
  right: -12%;
  bottom: -4%;
  height: 52%;
  background-image:
    linear-gradient(rgba(154, 95, 206, 0.22) 1px, transparent 1px),
    linear-gradient(90deg, rgba(154, 95, 206, 0.22) 1px, transparent 1px);
  background-size: 56px 56px;
  transform: perspective(620px) rotateX(58deg);
  transform-origin: 50% 100%;
  mask-image: linear-gradient(to top, #000 0%, transparent 92%);
  -webkit-mask-image: linear-gradient(to top, #000 0%, transparent 92%);
  pointer-events: none;
}

.hero__inner {
  position: relative;
  z-index: 2;
  max-width: 940px;
}

.hero__kicker {
  display: inline-block;
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--color-accent-bright);
  padding: 0.8rem 1.6rem;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-pill);
  margin-bottom: 2.6rem;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.hero.is-in .hero__kicker {
  opacity: 1;
  transform: none;
}

.hero__title {
  font-size: clamp(4.2rem, 8.5vw, 8.6rem);
  font-weight: 700;
  line-height: 1.02;
  margin-bottom: 2.6rem;
}

.hero__line {
  display: block;
  overflow: hidden;
}

.hero__line:last-child .hero__line-inner {
  background: var(--grad-text);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero__line-inner {
  display: block;
  transform: translateY(110%);
  transition: transform 0.9s cubic-bezier(0.22, 0.61, 0.36, 1);
  transition-delay: var(--d);
}
.hero.is-in .hero__line-inner {
  transform: translateY(0);
}

.hero__subtitle {
  max-width: 620px;
  font-size: clamp(1.7rem, 2.1vw, 2rem);
  color: var(--color-text);
  margin-bottom: 3.6rem;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.7s ease 0.45s, transform 0.7s ease 0.45s;
}
.hero.is-in .hero__subtitle {
  opacity: 1;
  transform: none;
}

.hero__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.6rem;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.7s ease 0.6s, transform 0.7s ease 0.6s;
}
.hero.is-in .hero__cta {
  opacity: 1;
  transform: none;
}

.btn--lg {
  padding: 1.9rem 3.4rem;
  font-size: 1.5rem;
}

.hero__scroll {
  position: absolute;
  left: 50%;
  bottom: 3rem;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-family: var(--font-display);
  font-size: 1.1rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-text-dim);
}

.hero__scroll-line {
  width: 1px;
  height: 46px;
  background: linear-gradient(var(--color-accent-bright), transparent);
  animation: scrollPulse 2.2s ease-in-out infinite;
}

@keyframes scrollPulse {
  0%, 100% { transform: scaleY(0.4); opacity: 0.4; transform-origin: top; }
  50% { transform: scaleY(1); opacity: 1; transform-origin: top; }
}

@media (max-width: 600px) {
  .hero__cta .btn {
    flex: 1 1 100%;
  }
  .hero__scroll {
    display: none;
  }
}
</style>
