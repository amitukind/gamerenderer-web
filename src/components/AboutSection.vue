<script setup>
// AVIF/WebP renditions generated at build time by vite-imagetools
import studioAvif from '@/assets/images/studio-2.jpg?format=avif&w=560;960&as=srcset'
import studioWebp from '@/assets/images/studio-2.jpg?format=webp&w=560;960&as=srcset'
import studioJpg from '@/assets/images/studio-2.jpg?format=jpeg&w=960'
import { about, stats } from '@/data/content'
import BaseIcon from './BaseIcon.vue'
import StatCounter from './StatCounter.vue'

const mediaSizes = '(max-width: 860px) 92vw, 460px'
</script>

<template>
  <section id="about" class="section about">
    <div class="container">
      <div class="about__grid">
        <div class="about__media" v-reveal>
          <picture>
            <source type="image/avif" :srcset="studioAvif" :sizes="mediaSizes" />
            <source type="image/webp" :srcset="studioWebp" :sizes="mediaSizes" />
            <img
              :src="studioJpg"
              :sizes="mediaSizes"
              width="960"
              height="960"
              alt="Game developers working at the GameRenderer Studios office in India"
              loading="lazy"
              decoding="async"
            />
          </picture>
          <div class="about__media-badge">
            <span class="about__media-badge-num">Est. {{ 2014 }}</span>
            <span>Crafting games with passion</span>
          </div>
        </div>

        <div class="about__content">
          <p class="eyebrow" v-reveal>{{ about.kicker }}</p>
          <h2 v-reveal="60">{{ about.title }}</h2>
          <p v-for="(para, i) in about.body" :key="i" class="about__para" v-reveal="100 + i * 60">
            {{ para }}
          </p>

          <ul class="about__list">
            <li v-for="(h, i) in about.highlights" :key="i" v-reveal="160 + i * 70">
              <span class="about__check"><BaseIcon name="check" :size="16" /></span>
              {{ h }}
            </li>
          </ul>
        </div>
      </div>

      <div class="about__stats">
        <StatCounter
          v-for="s in stats"
          :key="s.label"
          :value="s.value"
          :suffix="s.suffix"
          :label="s.label"
          v-reveal
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.about__grid {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: clamp(3rem, 6vw, 7rem);
  align-items: center;
}

.about__media {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  /* stands at a slight angle toward the copy; straightens on hover.
   * note: overrides the v-reveal transform — element fades in already tilted,
   * so opacity is included here to preserve the reveal fade. */
  transform: perspective(1200px) rotateY(4deg) rotateX(0.5deg);
  transition: transform 0.6s cubic-bezier(0.22, 0.61, 0.36, 1), opacity 0.7s ease;
}

.about__media:hover {
  transform: perspective(1200px) rotateY(0deg);
}

@media (max-width: 860px) {
  .about__media {
    transform: none; /* flat in single-column layout */
  }
}

.about__media::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, transparent 40%, rgba(121, 62, 165, 0.32));
  mix-blend-mode: screen;
}

.about__media picture {
  display: contents;
}

.about__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 4 / 5;
}

.about__media-badge {
  position: absolute;
  left: 2rem;
  bottom: 2rem;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 1.6rem 2rem;
  border-radius: var(--radius);
  background: rgba(13, 13, 13, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid var(--color-border-strong);
  font-size: 1.3rem;
  color: var(--color-text);
}

.about__media-badge-num {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.8rem;
  color: var(--color-heading);
}

.about__para {
  color: var(--color-text);
  font-size: 1.75rem;
}

.about__list {
  display: grid;
  gap: 1.4rem;
  margin-top: 2.6rem;
}

.about__list li {
  display: flex;
  align-items: flex-start;
  gap: 1.4rem;
  font-size: 1.6rem;
  color: var(--color-heading);
}

.about__check {
  flex: none;
  display: grid;
  place-items: center;
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50%;
  background: var(--color-accent-soft);
  color: var(--color-accent-bright);
  margin-top: 0.2rem;
}

.about__stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-top: clamp(5rem, 8vw, 8rem);
  padding-top: clamp(4rem, 6vw, 6rem);
  border-top: 1px solid var(--color-border);
}

@media (max-width: 860px) {
  .about__grid {
    grid-template-columns: 1fr;
  }
  .about__media {
    max-width: 460px;
  }
  .about__stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem 2rem;
  }
}
</style>
