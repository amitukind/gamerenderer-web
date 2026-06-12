<script setup>
import logo from '@/assets/images/logo.png'
import { company, nav, services } from '@/data/content'
import BaseIcon from './BaseIcon.vue'

const year = 2026

// keyword-rich internal links — good for users, good for crawlers
const serviceLinks = services.slice(0, 6).map((s) => s.title)

function go(target, event) {
  event.preventDefault()
  document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
}
function toTop(event) {
  event.preventDefault()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__top">
        <div class="footer__brand">
          <img :src="logo" alt="GameRenderer Studios — game development company in India" class="footer__logo" />
          <p class="footer__tagline">{{ company.tagline }}</p>
          <p class="footer__desc">
            Unity game development · HTML5 &amp; WebGL games · AR/VR experiences ·
            Game art &amp; animation · Multiplayer backends · Optimization &amp; QA
          </p>
        </div>

        <nav class="footer__nav" aria-label="Footer">
          <span class="footer__col-title">Explore</span>
          <ul>
            <li v-for="item in nav" :key="item.target">
              <a :href="`#${item.target}`" @click="go(item.target, $event)">{{ item.label }}</a>
            </li>
          </ul>
        </nav>

        <nav class="footer__nav" aria-label="Services">
          <span class="footer__col-title">Services</span>
          <ul>
            <li v-for="s in serviceLinks" :key="s">
              <a href="#services" @click="go('services', $event)">{{ s }}</a>
            </li>
          </ul>
        </nav>

        <div class="footer__contact">
          <span class="footer__col-title">Get in touch</span>
          <a :href="`mailto:${company.email}`" class="footer__email">{{ company.email }}</a>
          <address>
            <p class="footer__addr">
              {{ company.address.line1 }}<br />
              {{ company.address.line2 }}<br />
              {{ company.address.line3 }}
            </p>
          </address>
          <p class="footer__addr footer__regions">Serving Europe · USA · UK · Worldwide</p>
        </div>
      </div>

      <div class="footer__bottom">
        <span>© {{ year }} {{ company.legalName }}. All rights reserved.</span>
        <span class="footer__made">Game Development Company in India</span>
        <a href="#top" class="footer__top-link" @click="toTop">
          Back to top <BaseIcon name="arrowUp" :size="16" />
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--color-bg-darker);
  border-top: 1px solid var(--color-border);
  padding-block: clamp(4rem, 6vw, 6rem) 3rem;
}

.footer__top {
  display: grid;
  grid-template-columns: 1.5fr 0.8fr 1fr 1.1fr;
  gap: clamp(3rem, 5vw, 5rem);
  padding-bottom: 4rem;
  border-bottom: 1px solid var(--color-border);
}

.footer__logo {
  height: 30px;
  width: auto;
  margin-bottom: 2rem;
}

.footer__tagline {
  max-width: 340px;
  font-size: 1.5rem;
  color: var(--color-text);
  margin-bottom: 1.8rem;
}

.footer__desc {
  max-width: 340px;
  font-size: 1.3rem;
  line-height: 1.8;
  color: var(--color-text-dim);
  margin: 0;
}

.footer__col-title {
  display: block;
  font-family: var(--font-display);
  font-size: 1.3rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-heading);
  margin-bottom: 1.8rem;
}

.footer__nav ul {
  display: grid;
  gap: 1rem;
}

.footer__nav a {
  font-size: 1.45rem;
  color: var(--color-text);
}
.footer__nav a:hover {
  color: var(--color-accent-bright);
}

.footer__email {
  display: block;
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: 1.6rem;
  overflow-wrap: anywhere;
}
.footer__email:hover {
  color: var(--color-accent-bright);
}

/* semantic <address> wrapper — neutralize the default italic styling */
address {
  font-style: normal;
}

.footer__addr {
  font-size: 1.4rem;
  color: var(--color-text-dim);
  margin: 0;
  line-height: 1.7;
}

.footer__regions {
  margin-top: 1.4rem;
  color: var(--color-accent-bright);
}

.footer__bottom {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding-top: 2.6rem;
  font-size: 1.35rem;
  color: var(--color-text-dim);
}

.footer__top-link {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  font-family: var(--font-display);
  font-size: 1.35rem;
  color: var(--color-text);
}
.footer__top-link:hover {
  color: var(--color-accent-bright);
}

@media (max-width: 980px) {
  .footer__top {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 600px) {
  .footer__top {
    grid-template-columns: 1fr;
    gap: 3.5rem;
  }
}
</style>
