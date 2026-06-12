<script setup>
import { ref } from 'vue'
import { company, contact } from '@/data/content'
import BaseIcon from './BaseIcon.vue'

const copied = ref(false)

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(company.email)
  } catch {
    // fallback for non-secure contexts
    const el = document.createElement('textarea')
    el.value = company.email
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}
</script>

<template>
  <section id="contact" class="section contact">
    <div class="contact__glow" aria-hidden="true"></div>
    <div class="container container--narrow">
      <div class="section-head section-head--center">
        <p class="eyebrow" v-reveal>{{ contact.kicker }}</p>
        <h2 v-reveal="60">{{ contact.title }}</h2>
        <p class="lead" v-reveal="120">{{ contact.body }}</p>
      </div>

      <div class="contact__card" v-reveal="80">
        <div class="contact__primary">
          <span class="contact__label">Email us</span>
          <div class="contact__email-row">
            <a :href="`mailto:${company.email}`" class="contact__email">{{ company.email }}</a>
            <button class="contact__copy" :class="{ 'is-copied': copied }" @click="copyEmail" :aria-label="copied ? 'Copied' : 'Copy email address'">
              <BaseIcon :name="copied ? 'check' : 'copy'" :size="18" />
              <span>{{ copied ? 'Copied' : 'Copy' }}</span>
            </button>
          </div>
          <ul class="contact__points">
            <li v-for="(p, i) in contact.points" :key="i">
              <span class="contact__point-icon"><BaseIcon name="check" :size="15" /></span>
              {{ p }}
            </li>
          </ul>

          <a :href="`mailto:${company.email}`" class="btn btn--primary contact__cta">
            <BaseIcon name="mail" :size="18" /> Send us a message
          </a>
        </div>

        <div class="contact__meta">
          <div class="contact__meta-item">
            <span class="contact__meta-icon"><BaseIcon name="pin" :size="20" /></span>
            <div>
              <span class="contact__label">Studio — India</span>
              <address>
                <p>
                  {{ company.address.line1 }}<br />
                  {{ company.address.line2 }}<br />
                  {{ company.address.line3 }}
                </p>
              </address>
            </div>
          </div>

          <div class="contact__meta-item">
            <span class="contact__meta-icon"><BaseIcon name="globe" :size="20" /></span>
            <div>
              <span class="contact__label">Serving clients in</span>
              <p>Europe · United States<br />United Kingdom · Worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  position: relative;
  overflow: hidden;
}

.contact__glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(60% 50% at 50% 0%, rgba(121, 62, 165, 0.28) 0%, transparent 70%);
  pointer-events: none;
}

.contact__card {
  position: relative;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: clamp(3rem, 5vw, 5rem);
  padding: clamp(3rem, 5vw, 5rem);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: var(--bevel), var(--shadow-card);
}

.contact__label {
  display: block;
  font-family: var(--font-display);
  font-size: 1.25rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-text-dim);
  margin-bottom: 1.2rem;
}

.contact__email-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.4rem;
  margin-bottom: 2.6rem;
}

.contact__email {
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 2.4vw, 2.05rem);
  font-weight: 600;
  color: var(--color-heading);
  overflow-wrap: anywhere;
}

.contact__email:hover {
  color: var(--color-accent-bright);
}

.contact__copy {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.8rem 1.4rem;
  font-family: var(--font-body);
  font-size: 1.3rem;
  color: var(--color-text);
  background: var(--color-surface-2);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition: color var(--transition), border-color var(--transition);
}

.contact__copy:hover,
.contact__copy.is-copied {
  color: var(--color-accent-bright);
  border-color: var(--color-accent);
}

.contact__points {
  display: grid;
  gap: 1.1rem;
  margin-bottom: 2.8rem;
}

.contact__points li {
  display: flex;
  align-items: flex-start;
  gap: 1.1rem;
  font-size: 1.45rem;
  color: var(--color-text);
}

.contact__point-icon {
  flex: none;
  display: grid;
  place-items: center;
  width: 2.3rem;
  height: 2.3rem;
  border-radius: 50%;
  background: var(--color-accent-soft);
  color: var(--color-accent-bright);
  margin-top: 0.2rem;
}

.contact__cta {
  width: 100%;
}

.contact__meta {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding-left: clamp(0rem, 3vw, 3rem);
  border-left: 1px solid var(--color-border);
}

.contact__meta-item {
  display: flex;
  gap: 1.6rem;
}

.contact__meta-icon {
  flex: none;
  display: grid;
  place-items: center;
  width: 4.4rem;
  height: 4.4rem;
  border-radius: var(--radius);
  background: var(--color-accent-soft);
  color: var(--color-accent-bright);
}

/* semantic <address> wrapper — neutralize the default italic styling */
address {
  font-style: normal;
}

.contact__meta-item p {
  margin: 0;
  font-size: 1.5rem;
  color: var(--color-text);
  line-height: 1.6;
}

@media (max-width: 760px) {
  .contact__card {
    grid-template-columns: 1fr;
  }
  .contact__meta {
    padding-left: 0;
    border-left: none;
    padding-top: 3rem;
    border-top: 1px solid var(--color-border);
  }
}
</style>
