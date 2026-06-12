<script setup>
import { work, clients } from '@/data/content'

// Original portfolio thumbnails (preserved from the legacy site), converted to
// 640px WebP at build time by vite-imagetools and fingerprinted by Vite.
const thumbs = import.meta.glob('@/assets/images/portfolio/*.jpg', {
  eager: true,
  import: 'default',
  query: '?format=webp&w=640',
})

// precomputed name → url map (avoids a linear scan per template call)
const thumbByName = Object.fromEntries(
  Object.entries(thumbs).map(([path, url]) => [
    path.split('/').pop().replace(/\.jpg.*$/, ''),
    url,
  ]),
)

function thumb(name) {
  return thumbByName[name] || ''
}
</script>

<template>
  <section id="work" class="section section--surface work">
    <div class="container">
      <div class="section-head">
        <p class="eyebrow" v-reveal>{{ work.kicker }}</p>
        <h2 v-reveal="60">{{ work.title }}</h2>
        <p class="lead" v-reveal="120">{{ work.body }}</p>
      </div>

      <div class="work__grid">
        <article
          v-for="(item, i) in work.items"
          :key="item.title"
          class="tile"
          :style="{ '--accent': item.accent }"
          v-reveal="(i % 3) * 80"
        >
          <div class="tile__art">
            <img :src="thumb(item.image)" :alt="item.alt" loading="lazy" />
          </div>
          <div class="tile__body">
            <h3 class="tile__title">{{ item.title }}</h3>
            <p class="tile__cat">{{ item.category }}</p>
          </div>
        </article>
      </div>

      <p class="work__note" v-reveal>
        <span class="work__note-dot"></span>{{ work.note }}
      </p>

      <div class="clients" v-reveal>
        <span class="clients__label">Trusted by teams worldwide</span>
        <ul class="clients__list">
          <li v-for="c in clients" :key="c">{{ c }}</li>
          <li class="clients__more">&amp; many more</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.work__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.tile {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  box-shadow: var(--bevel);
  transition: transform var(--transition), border-color var(--transition),
    box-shadow var(--transition);
}

.tile:hover {
  /* gentle 3D pivot — pairs with the image zoom for layered depth */
  transform: perspective(var(--persp)) rotateX(2deg) translateY(-6px);
  border-color: var(--color-border-strong);
  box-shadow: var(--bevel), var(--shadow-card);
}

.tile__art {
  position: relative;
  aspect-ratio: 16 / 11;
  overflow: hidden;
  background: var(--color-bg-darker);
}

.tile__art::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    radial-gradient(120% 120% at 80% 10%, color-mix(in srgb, var(--accent) 45%, transparent) 0%, transparent 55%),
    linear-gradient(180deg, transparent 35%, rgba(13, 13, 13, 0.55) 100%);
  mix-blend-mode: screen;
  opacity: 0.85;
  transition: opacity var(--transition);
}

.tile__art img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.04);
  transition: transform 0.8s ease;
}

.tile:hover .tile__art img {
  transform: scale(1.12);
}

.tile:hover .tile__art::after {
  opacity: 1;
}

.tile__body {
  padding: 2.2rem 2.4rem;
}

.tile__title {
  font-size: 1.9rem;
  margin: 0 0 0.4rem;
}

.tile__cat {
  font-size: 1.35rem;
  color: var(--color-accent-bright);
  margin: 0;
  letter-spacing: 0.02em;
}

.work__note {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  margin-top: 3.4rem;
  padding: 1.2rem 2rem;
  border-radius: var(--radius-pill);
  background: var(--color-accent-soft);
  border: 1px solid var(--color-border);
  font-size: 1.45rem;
  color: var(--color-text);
}

.work__note-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--color-accent-bright);
  box-shadow: 0 0 0 0 rgba(154, 95, 206, 0.5);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(154, 95, 206, 0.5); }
  70% { box-shadow: 0 0 0 10px rgba(154, 95, 206, 0); }
  100% { box-shadow: 0 0 0 0 rgba(154, 95, 206, 0); }
}

/* ---- clients ---- */
.clients {
  margin-top: clamp(5rem, 8vw, 8rem);
  padding-top: clamp(4rem, 6vw, 6rem);
  border-top: 1px solid var(--color-border);
  text-align: center;
}

.clients__label {
  display: block;
  font-family: var(--font-display);
  font-size: 1.3rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-text-dim);
  margin-bottom: 3rem;
}

.clients__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.4rem 3.2rem;
}

.clients__list li {
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 2.4vw, 2.4rem);
  font-weight: 600;
  color: var(--color-text-faint);
  transition: color var(--transition);
  cursor: default;
}

.clients__list li:hover {
  color: var(--color-heading);
}

.clients__more {
  color: var(--color-accent-bright) !important;
}

@media (max-width: 880px) {
  .work__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .work__grid {
    grid-template-columns: 1fr;
  }
}
</style>
