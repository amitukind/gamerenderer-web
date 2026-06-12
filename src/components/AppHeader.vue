<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import logo from '@/assets/images/logo.png'
import { nav } from '@/data/content'
import { useActiveSection } from '@/composables/useActiveSection'

const menuOpen = ref(false)
const scrolled = ref(false)

const { active } = useActiveSection(nav.map((n) => n.target))

function onScroll() {
  scrolled.value = window.scrollY > 24
}

function go(target, event) {
  event.preventDefault()
  menuOpen.value = false
  const el = document.getElementById(target)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function onKey(e) {
  if (e.key === 'Escape') menuOpen.value = false
}

watch(menuOpen, (open) => {
  document.body.classList.toggle('is-menu-open', open)
})

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
  document.body.classList.remove('is-menu-open')
})
</script>

<template>
  <header class="header" :class="{ 'is-scrolled': scrolled }">
    <div class="header__inner container">
      <a class="header__logo" href="#top" @click="go('top', $event)" aria-label="GameRenderer Studios — home">
        <img :src="logo" alt="GameRenderer Studios" />
      </a>

      <nav class="header__nav" :class="{ 'is-open': menuOpen }" aria-label="Primary">
        <ul class="header__list">
          <li v-for="item in nav" :key="item.target">
            <a
              :href="`#${item.target}`"
              :class="{ 'is-active': active === item.target }"
              @click="go(item.target, $event)"
              >{{ item.label }}</a
            >
          </li>
        </ul>

        <!-- primary action stays reachable inside the mobile drawer -->
        <a
          href="#contact"
          class="btn btn--primary header__drawer-cta"
          @click="go('contact', $event)"
          >Let's talk</a
        >
      </nav>

      <a
        :href="`#${nav[nav.length - 1].target}`"
        class="btn btn--primary header__cta"
        @click="go('contact', $event)"
        >Let's talk</a
      >

      <button
        class="header__toggle"
        :class="{ 'is-open': menuOpen }"
        :aria-expanded="menuOpen"
        aria-label="Toggle menu"
        @click="menuOpen = !menuOpen"
      >
        <span></span><span></span><span></span>
      </button>
    </div>

    <div class="header__backdrop" :class="{ 'is-open': menuOpen }" @click="menuOpen = false"></div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 100;
  height: var(--header-h);
  display: flex;
  align-items: center;
  transition: background var(--transition), box-shadow var(--transition), height var(--transition);
}

.header.is-scrolled {
  height: 66px;
  background: rgba(13, 13, 13, 0.78);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--color-border);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  width: 100%;
}

.header__logo img {
  height: 34px;
  width: auto;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 3rem;
  margin-left: auto;
}

.header__list {
  display: flex;
  gap: 2.4rem;
}

.header__list a {
  position: relative;
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-text);
  padding: 0.4rem 0;
}

.header__list a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 2px;
  background: var(--color-accent-bright);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--transition);
}

.header__list a:hover,
.header__list a.is-active {
  color: var(--color-heading);
}

.header__list a.is-active::after,
.header__list a:hover::after {
  transform: scaleX(1);
}

.header__cta {
  padding: 1.2rem 2.4rem;
  font-size: 1.35rem;
}

/* drawer-only CTA — hidden on desktop where the header CTA is visible */
.header__drawer-cta {
  display: none;
}

.header__toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 46px;
  height: 46px;
  padding: 0;
  background: transparent;
  border: 1px solid var(--color-border-strong);
  border-radius: 12px;
  cursor: pointer;
  z-index: 120;
}

.header__toggle span {
  display: block;
  width: 22px;
  height: 2px;
  margin-inline: auto;
  background: var(--color-heading);
  transition: transform var(--transition), opacity var(--transition);
}

.header__toggle.is-open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.header__toggle.is-open span:nth-child(2) {
  opacity: 0;
}
.header__toggle.is-open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.header__backdrop {
  display: none;
}

/* ---------- mobile ---------- */
@media (max-width: 1080px) {
  .header__cta {
    display: none;
  }
  .header__toggle {
    display: flex;
  }

  .header__nav {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    height: 100dvh;
    width: min(360px, 84vw);
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 3rem;
    padding: 4rem;
    margin: 0;
    background: var(--color-bg-darker);
    border-left: 1px solid var(--color-border);
    transform: translateX(105%);
    transition: transform var(--transition);
    z-index: 110;
  }

  .header__nav.is-open {
    transform: translateX(0);
    box-shadow: -30px 0 70px -30px rgba(0, 0, 0, 0.9);
  }

  .header__list {
    flex-direction: column;
    gap: 2rem;
  }

  .header__list a {
    font-size: 2rem;
  }

  .header__drawer-cta {
    display: inline-flex;
    align-self: stretch;
    margin-top: 1rem;
  }

  .header__backdrop {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--transition);
    z-index: 105;
  }

  .header__backdrop.is-open {
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
