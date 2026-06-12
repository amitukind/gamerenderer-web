/**
 * Build-time prerender + structured-data injection.
 *
 * Renders a semantic, crawlable HTML snapshot of the page straight from
 * src/data/content.js and injects it into dist/index.html inside the
 * <div id="app"> mount point, plus a FAQPage JSON-LD block in <head>.
 *
 * - Pure Node (>= 20) ESM. No dependencies, no browser.
 * - Idempotent: re-runs detect previously injected blocks via the
 *   <!--prerender:*--> comment markers and replace them.
 *
 * Usage: node scripts/prerender.mjs   (runs automatically via `npm run build`)
 */

import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

import {
  company,
  hero,
  about,
  services,
  process as processSteps,
  techGroups,
  work,
  whyUs,
  industries,
  testimonials,
  faq,
  contact,
} from '../src/data/content.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST_INDEX = path.resolve(__dirname, '..', 'dist', 'index.html')

const APP_START = '<!--prerender:start-->'
const APP_END = '<!--prerender:end-->'
const HEAD_START = '<!--prerender:ld:start-->'
const HEAD_END = '<!--prerender:ld:end-->'

/** Escape text for safe interpolation into HTML. */
function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function fail(message) {
  console.error(`[prerender] ERROR: ${message}`)
  process.exit(1)
}

/* ---------------------------------------------------------------- *
 * Static HTML snapshot (global CSS classes + plain semantic tags)
 * ---------------------------------------------------------------- */

function section(id, surface, inner) {
  const cls = surface ? 'section section--surface' : 'section'
  return `<section id="${id}" class="${cls}"><div class="container">${inner}</div></section>`
}

function sectionHead(kicker, title) {
  return `<div class="section-head"><p class="eyebrow">${esc(kicker)}</p><h2>${esc(title)}</h2></div>`
}

function buildStaticHtml() {
  const heroHtml = section(
    'top',
    false,
    `<p class="eyebrow">${esc(hero.kicker)}</p>` +
      `<h1>${esc(hero.titleLines.join(' '))}</h1>` +
      `<p class="lead">${esc(hero.subtitle)}</p>`,
  )

  const aboutHtml = section(
    'about',
    true,
    sectionHead(about.kicker, about.title) +
      about.body.map((p) => `<p>${esc(p)}</p>`).join('') +
      `<ul>${about.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>`,
  )

  const servicesHtml = section(
    'services',
    false,
    sectionHead('What we do', 'Full-cycle game development services') +
      `<ul>${services
        .map((s) => `<li><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`)
        .join('')}</ul>`,
  )

  const processHtml = section(
    'process',
    true,
    sectionHead('How we work', 'Our game development process') +
      `<ol>${processSteps
        .map((s) => `<li><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`)
        .join('')}</ol>` +
      techGroups
        .map((g) => `<h3>${esc(g.title)}</h3><p>${esc(g.items.join(', '))}</p>`)
        .join(''),
  )

  const workHtml = section(
    'work',
    false,
    sectionHead(work.kicker, work.title) +
      `<p class="lead">${esc(work.body)}</p>` +
      `<ul>${work.items
        .map((i) => `<li>${esc(i.title)} — ${esc(i.category)}</li>`)
        .join('')}</ul>`,
  )

  const whyUsHtml = section(
    'why-us',
    true,
    sectionHead(whyUs.kicker, whyUs.title) +
      `<p class="lead">${esc(whyUs.body)}</p>` +
      `<ul>${whyUs.reasons
        .map((r) => `<li><h3>${esc(r.title)}</h3><p>${esc(r.text)}</p></li>`)
        .join('')}</ul>` +
      `<h3>${esc(whyUs.engagement.title)}</h3>` +
      `<ul>${whyUs.engagement.models
        .map((m) => `<li><strong>${esc(m.title)}</strong> — ${esc(m.text)}</li>`)
        .join('')}</ul>`,
  )

  const industriesHtml = section(
    'industries',
    false,
    sectionHead(industries.kicker, industries.title) +
      `<ul>${industries.items
        .map((i) => `<li><h3>${esc(i.title)}</h3><p>${esc(i.text)}</p></li>`)
        .join('')}</ul>`,
  )

  const testimonialsHtml = section(
    'testimonials',
    true,
    sectionHead(testimonials.kicker, testimonials.title) +
      testimonials.items
        .map(
          (t) =>
            `<blockquote><p>${esc(t.quote)}</p><footer>${esc(t.author)}, ${esc(t.meta)}</footer></blockquote>`,
        )
        .join(''),
  )

  const faqHtml = section(
    'faq',
    false,
    sectionHead(faq.kicker, faq.title) +
      faq.items.map((i) => `<h3>${esc(i.q)}</h3><p>${esc(i.a)}</p>`).join(''),
  )

  const addr = company.address
  const contactHtml = section(
    'contact',
    true,
    sectionHead(contact.kicker, contact.title) +
      `<p class="lead">${esc(contact.body)}</p>` +
      `<p><a href="mailto:${esc(company.email)}">${esc(company.email)}</a></p>` +
      `<address>${esc(company.name)}<br>${esc(addr.line1)}<br>${esc(addr.line2)}<br>${esc(addr.line3)}</address>`,
  )

  return (
    '<main>' +
    heroHtml +
    aboutHtml +
    servicesHtml +
    processHtml +
    workHtml +
    whyUsHtml +
    industriesHtml +
    testimonialsHtml +
    faqHtml +
    contactHtml +
    '</main>'
  )
}

/* ---------------------------------------------------------------- *
 * FAQPage JSON-LD
 * ---------------------------------------------------------------- */

function buildFaqJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }
  // Escape "<" so the payload can never break out of its <script> tag.
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

/* ---------------------------------------------------------------- *
 * Injection into dist/index.html
 * ---------------------------------------------------------------- */

async function main() {
  let html
  try {
    html = await readFile(DIST_INDEX, 'utf8')
  } catch {
    fail(`${DIST_INDEX} not found — run \`vite build\` first.`)
  }

  // Idempotency: strip any previously injected blocks (marker-delimited).
  html = html.replace(
    new RegExp(`${APP_START}[\\s\\S]*?${APP_END}`, 'g'),
    '',
  )
  html = html.replace(
    new RegExp(`\\s*${HEAD_START}[\\s\\S]*?${HEAD_END}`, 'g'),
    '',
  )

  const marker = '<div id="app"></div>'
  if (!html.includes(marker)) {
    fail(`Mount-point marker ${marker} not found in ${DIST_INDEX}.`)
  }
  if (!html.includes('</head>')) {
    fail(`</head> not found in ${DIST_INDEX}.`)
  }

  const staticHtml = buildStaticHtml()
  const faqJson = buildFaqJsonLd()

  html = html.replace(
    marker,
    `<div id="app">${APP_START}${staticHtml}${APP_END}</div>`,
  )
  html = html.replace(
    '</head>',
    `${HEAD_START}<script type="application/ld+json">${faqJson}</script>${HEAD_END}\n  </head>`,
  )

  await writeFile(DIST_INDEX, html, 'utf8')

  const bytes = Buffer.byteLength(staticHtml, 'utf8') + Buffer.byteLength(faqJson, 'utf8')
  console.log(
    `[prerender] OK: injected ${bytes} bytes of static HTML + FAQPage JSON-LD (${faq.items.length} questions) into dist/index.html`,
  )
}

main().catch((err) => {
  fail(err && err.stack ? err.stack : String(err))
})
