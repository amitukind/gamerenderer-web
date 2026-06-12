# GameRenderer Studios — Website

The official website of **GameRenderer Studios** — a game development company in
India building Web (HTML5/WebGL) and Unity games for clients across Europe, the
USA and worldwide.

Rebuilt from the original static template into a fast, component-driven
**Vue 3 + Vite (ES6)** single-page application. The original brand assets —
logo, favicon set and portfolio thumbnails — are carried over from the legacy
site.

## Tech stack

- **Vue 3** (`<script setup>` SFCs, Composition API)
- **Vite 6** (ES modules, fast HMR, optimized production build)
- **vite-imagetools** — AVIF/WebP renditions + responsive `srcset` generated at build time
- **Plain CSS** with design tokens (CSS custom properties) — no UI framework
- **Local variable web fonts** (Montserrat + Nunito Sans, self-hosted and preloaded `.woff2`)
- Zero runtime dependencies beyond Vue — icons are inline SVG

## Getting started

```bash
npm install
npm run dev      # start dev server (http://localhost:5173)
npm run build    # production build to /dist
npm run preview  # preview the production build
```

Requires Node.js 20+.

## Architecture

```
src/
├── main.js                 # app bootstrap + global v-reveal directive
├── App.vue                 # page composition
├── assets/
│   ├── fonts/              # self-hosted Montserrat + Nunito Sans (variable woff2)
│   ├── images/             # hero + studio photography, portfolio thumbnails
│   └── styles/
│       ├── fonts.css       # @font-face declarations (local fonts)
│       ├── variables.css   # design tokens (colors, type, spacing, 3D depth)
│       └── base.css        # reset, typography, layout helpers, buttons, reveals
├── data/
│   └── content.js          # all marketing copy (single source of truth)
├── composables/
│   ├── reveal.js           # v-reveal scroll-reveal directive (IntersectionObserver)
│   ├── useActiveSection.js # active-nav highlighting on scroll
│   └── useCountUp.js       # animated stat counters
└── components/
    ├── AppHeader.vue       # sticky nav + mobile drawer
    ├── BaseIcon.vue        # inline SVG icon set
    ├── HeroSection.vue     # LCP-optimized hero + perspective grid floor
    ├── AboutSection.vue
    ├── StatCounter.vue
    ├── ServicesSection.vue
    ├── ProcessSection.vue      # process steps + tech stack
    ├── WorkSection.vue         # portfolio tiles + clients
    ├── WhyUsSection.vue        # differentiators + engagement models
    ├── IndustriesSection.vue
    ├── TestimonialsSection.vue
    ├── FaqSection.vue          # accordion, mirrored in FAQPage JSON-LD
    ├── ContactSection.vue
    ├── AppFooter.vue
    └── BackToTop.vue
```

### Design system

The look carries over the original brand: a dark `#121212` canvas with a purple
`#793ea5` accent. All values live as CSS custom properties in
[`variables.css`](src/assets/styles/variables.css), so re-theming is a
single-file change. Subtle CSS-only 3D depth (perspective fold-in reveals, card
tilts, a hero grid floor) is tokenized via `--persp` and `--bevel`.

### Fonts

Montserrat (display/headings) and Nunito Sans (body) are **self-hosted** as
variable `.woff2` files in [`src/assets/fonts`](src/assets/fonts) — no external
Google Fonts request at runtime. The two critical fonts are preloaded from
`index.html`.

### Images

Source JPEGs are converted to **AVIF/WebP** with responsive `srcset` at build
time by `vite-imagetools` (hero: 348 KB JPEG → ~29 KB AVIF). The hero renders
as `<img fetchpriority="high">` for fast LCP; below-the-fold imagery is lazy.

### SEO

- Keyword-targeted title/description, canonical URL, Open Graph + Twitter cards
- JSON-LD structured data: `Organization`, `WebSite`, `ProfessionalService`
  (full service catalog) and `FAQPage`
- `robots.txt` + `sitemap.xml` in [`public/`](public/)
- Crawlable `<noscript>` fallback

> The canonical/OG URLs assume `https://gamerenderer.com/` — update
> [`index.html`](index.html) and [`public/sitemap.xml`](public/sitemap.xml) if
> the production domain differs.

### Accessibility & performance

- Semantic landmarks, `aria-*` on interactive controls, visible focus rings
- WCAG AA contrast on text tokens; respects `prefers-reduced-motion`
- Responsive from 320px up; mobile drawer nav with backdrop + Esc to close
- `scroll-padding-top` keeps anchored sections clear of the fixed header

## Editing content

All copy — services, process, tech, clients, testimonials, FAQ, contact
details — is in [`src/data/content.js`](src/data/content.js). Components are
presentational; edit content there without touching markup.

> **Note:** the FAQ answers are mirrored in the `FAQPage` JSON-LD block in
> [`index.html`](index.html) — keep both in sync when editing.

## License

© GameRenderer Studios Pvt Ltd. All rights reserved.
