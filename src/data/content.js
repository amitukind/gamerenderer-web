/**
 * Single source of truth for all site copy.
 * Editing marketing content here keeps the Vue components purely presentational.
 */

export const company = {
  name: 'GameRenderer Studios',
  legalName: 'GameRenderer Studios Pvt Ltd',
  tagline:
    'A leading game development company in India, crafting world-class Web and Unity games for clients across Europe, the USA and beyond.',
  foundedYear: 2014,
  email: 'enquiry@gamerenderer.com',
  address: {
    line1: 'Omaxe Plaza, Indirapuram',
    line2: 'Ghaziabad, Uttar Pradesh',
    line3: 'India — 201014',
  },
}

export const nav = [
  { label: 'Home', target: 'top' },
  { label: 'About', target: 'about' },
  { label: 'Services', target: 'services' },
  { label: 'Process', target: 'process' },
  { label: 'Work', target: 'work' },
  { label: 'Why Us', target: 'why-us' },
  { label: 'FAQ', target: 'faq' },
  { label: 'Contact', target: 'contact' },
]

export const hero = {
  kicker: 'India’s Game Development Experts · Since 2014',
  titleLines: ['We craft', 'games that', 'render dreams.'],
  subtitle:
    'GameRenderer Studios is a full-cycle game development company headquartered in India, trusted by studios, publishers and brands across Europe and the USA. From a single spark of an idea to a polished, optimized title shipping on the web and every major platform — we design, build and launch games players remember.',
  primaryCta: { label: 'Start a project', target: 'contact' },
  secondaryCta: { label: 'Explore our services', target: 'services' },
}

export const stats = [
  { value: 11, suffix: '+', label: 'Years shipping games' },
  { value: 120, suffix: '+', label: 'Titles delivered worldwide' },
  { value: 30, suffix: '+', label: 'Platforms supported' },
  { value: 40, suffix: 'M+', label: 'Players reached' },
]

export const about = {
  kicker: 'Who we are',
  title: 'A studio built around the full game lifecycle.',
  body: [
    'Founded in 2014, GameRenderer Studios has grown into one of India’s most dependable game development partners — a senior, tightly-knit team of designers, engineers, artists and producers who live and breathe games. We cover the entire lifecycle under one roof: game design, art production, development, QA, deployment, live-ops and monetization.',
    'We specialize in multiplatform, multi-dimensional games and are deeply experienced in AR and VR. Clients in Berlin, London, Amsterdam, New York and San Francisco work with us the same way they would with a local team — overlapping hours, transparent milestones, design reviews and demo builds you can play every sprint.',
    'Years of shipping have taught us how to make rich experiences run flawlessly, even on low-memory smartphones and inside the browser. Performance budgets, clean architecture and ruthless optimization are the standard here — not the exception. We know what works, and what does not.',
  ],
  highlights: [
    'Full-cycle studio — concept, art, code, QA, launch and live-ops',
    'Web-first engineering with native-grade Unity delivery',
    'Working-hours overlap with European and US time zones',
    'NDA-first engagements: your IP, code and data stay yours',
    'Transparent, collaborative, milestone-driven production',
  ],
}

export const services = [
  {
    icon: 'gamepad',
    title: 'Full-Cycle Game Development',
    text: 'End-to-end production of 2D, 3D, multiplayer and casual games — concept to launch, architected for performance and built to scale with your audience.',
  },
  {
    icon: 'globe',
    title: 'Web & HTML5 Game Development',
    text: 'Instant-play browser games with WebGL, Three.js, PlayCanvas, Babylon.js, Phaser and PIXI — no installs, console-quality feel, optimized for every device.',
  },
  {
    icon: 'cube',
    title: 'Unity Game Development',
    text: 'Cross-platform Unity titles for mobile, desktop, console and XR — clean, maintainable, review-ready C# delivered by senior Unity engineers.',
  },
  {
    icon: 'vr',
    title: 'AR / VR / MR Experiences',
    text: 'Immersive experiences on Meta Quest, ARKit, ARCore, Vuforia and Magic Leap — from enterprise training simulators to location-based entertainment.',
  },
  {
    icon: 'palette',
    title: 'Game Art & 3D Modelling',
    text: 'Concept art, 2D sketching, character and environment modelling, texturing, stylized and realistic worlds — art direction that sells your game.',
  },
  {
    icon: 'film',
    title: '2D / 3D Animation & VFX',
    text: 'Rigging, skeletal and procedural animation, particle VFX and cinematics that bring characters and worlds convincingly to life.',
  },
  {
    icon: 'layout',
    title: 'Game UI / UX Design',
    text: 'Interface and experience design tuned for engagement, retention and frictionless play — validated with real players, not guesswork.',
  },
  {
    icon: 'server',
    title: 'Multiplayer & Backend Engineering',
    text: 'Realtime networking with Photon, SmartFox, Node.js and WebSockets, matchmaking, leaderboards and scalable cloud infrastructure on AWS.',
  },
  {
    icon: 'gauge',
    title: 'Optimization, QA & Porting',
    text: 'Profiling, memory and draw-call optimization, device-lab testing and cross-platform porting — so your game ships fast and stays stable everywhere.',
  },
]

export const process = [
  {
    step: '01',
    title: 'Discovery & Concept',
    text: 'We dig into your vision, audience, market and platform goals, then shape a concept, scope, budget and technical plan you can stand behind.',
  },
  {
    step: '02',
    title: 'Design & Prototype',
    text: 'Art direction, UX flows, game-design documentation and a playable prototype prove out the core loop before full production begins.',
  },
  {
    step: '03',
    title: 'Production',
    text: 'Art, engineering and audio come together in tight, milestone-driven sprints — with playable builds and design reviews every step of the way.',
  },
  {
    step: '04',
    title: 'Optimize, Launch & Live-Ops',
    text: 'We profile, polish and harden for every target device, handle store submission and certification, then stay on for updates, events and live-ops.',
  },
]

export const techGroups = [
  {
    title: 'Engines & Frameworks',
    items: ['Unity3D', 'Unreal Engine', 'Three.js', 'WebGL / GLSL', 'PlayCanvas', 'Babylon.js', 'Phaser', 'PIXI.js', 'Cocos2D', 'GameMaker'],
  },
  {
    title: 'Art & Design',
    items: ['Photoshop', 'Illustrator', 'Blender', '3ds Max', 'Maya', 'ZBrush', 'Substance Painter', 'Spine', 'Premiere Pro'],
  },
  {
    title: 'Backend & Realtime',
    items: ['Photon', 'SmartFox', 'Node.js', 'Socket.IO', 'WebSockets', 'MySQL', 'PHP', 'AWS', 'UNet'],
  },
  {
    title: 'XR & Platforms',
    items: ['Quest / Oculus', 'ARKit', 'ARCore', 'Vuforia', 'Magic Leap', 'iOS', 'Android', 'WebGL', 'Steam', 'Switch'],
  },
]

export const work = {
  kicker: 'Our work',
  title: 'Experiences crafted with passion.',
  body: 'We create games, products and interactive experiences that people genuinely love. Our portfolio spans hyper-casual mobile hits, immersive WebGL worlds and bespoke Unity titles for publishers and brands across Europe, the USA and Asia.',
  note: 'A refreshed showcase of our latest projects is on the way.',
  items: [
    {
      title: 'WebGL Racer',
      category: 'Browser · Three.js',
      image: 'the-beetle',
      accent: '#9a5fce',
      alt: 'WebGL browser racing game built with Three.js by GameRenderer Studios',
    },
    {
      title: 'Hyper-Casual Pack',
      category: 'Mobile · Unity',
      image: 'fuji',
      accent: '#6b8fce',
      alt: 'Collection of hyper-casual mobile games developed in Unity by GameRenderer Studios',
    },
    {
      title: 'AR Product Viewer',
      category: 'AR · Vuforia',
      image: 'lamp',
      accent: '#ce5f9a',
      alt: 'Augmented reality product viewer built with Vuforia by GameRenderer Studios',
    },
    {
      title: 'Multiplayer Arena',
      category: 'Realtime · Photon',
      image: 'woodcraft',
      accent: '#5fcea8',
      alt: 'Real-time multiplayer arena game with Photon networking by GameRenderer Studios',
    },
    {
      title: 'Character Studio',
      category: 'Art · 3D / Animation',
      image: 'lady-shutterbug',
      accent: '#cea85f',
      alt: '3D game character art and animation crafted by GameRenderer Studios artists',
    },
    {
      title: 'Casual Puzzle Series',
      category: 'Web & Mobile',
      image: 'salad',
      accent: '#9a5fce',
      alt: 'Casual puzzle game series for web and mobile by GameRenderer Studios',
    },
  ],
}

export const clients = [
  'Simfusion', 'HSRTI', 'PIXLR', 'INMAGINE', 'Carter Hickman', '3D Fish',
  'Terahard', 'Capitol Sheds', 'Mozilla', 'Apple', 'Google', 'Asus',
]

export const whyUs = {
  kicker: 'Why GameRenderer',
  title: 'A global standard of craft, delivered from India.',
  body: 'Clients in Europe and the USA choose us because we combine senior engineering talent and world-class art with the cost advantage and work ethic India is known for — without compromising on communication, quality or ownership.',
  reasons: [
    {
      icon: 'trophy',
      title: 'Proven track record',
      text: 'Over a decade in business, 120+ shipped titles and long-running client relationships that span multiple years and multiple games.',
    },
    {
      icon: 'users',
      title: 'Senior, dedicated teams',
      text: 'No revolving door of juniors. Your project gets a stable, senior team — designers, engineers and artists who stay with it from kickoff to launch.',
    },
    {
      icon: 'clock',
      title: 'Time-zone friendly',
      text: 'We structure our day around yours, with guaranteed working-hours overlap for European and US clients, daily standups and same-day responses.',
    },
    {
      icon: 'shield',
      title: 'Your IP, fully protected',
      text: 'NDA-first engagements, clean contracts and full IP transfer. Source code, assets and documentation are yours — always.',
    },
    {
      icon: 'gauge',
      title: 'Performance obsessed',
      text: 'Performance budgets from day one. Our games run smoothly in the browser, on low-end Android devices and everywhere in between.',
    },
    {
      icon: 'spark',
      title: 'Cost-smart, not cheap',
      text: 'World-class output at India-based rates. Most clients save 40–60% versus equivalent teams in Western Europe or North America.',
    },
  ],
  engagement: {
    title: 'Flexible engagement models',
    models: [
      {
        title: 'Fixed-scope projects',
        text: 'A defined game, a defined budget, a defined date. Best for well-scoped titles, advergames and prototypes.',
      },
      {
        title: 'Dedicated teams',
        text: 'A full cross-functional pod that works as an extension of your studio — month to month, scaling up or down as you need.',
      },
      {
        title: 'Staff augmentation',
        text: 'Senior Unity, WebGL or backend engineers and artists who slot directly into your existing team and pipeline.',
      },
    ],
  },
}

export const industries = {
  kicker: 'Industries we serve',
  title: 'Games for every audience and business.',
  items: [
    { title: 'Casual & Hyper-Casual', text: 'Snackable, satisfying mobile and web games engineered for retention and virality.' },
    { title: 'Education & EdTech', text: 'Learning games and gamified curricula that make knowledge stick for K-12 and beyond.' },
    { title: 'Advergames & Brand Engagement', text: 'Branded playable experiences and playable ads that turn campaigns into play sessions.' },
    { title: 'Training & Simulation', text: 'VR/AR simulators and serious games for enterprise training, safety and healthcare.' },
    { title: 'Card, Board & Casino', text: 'Multiplayer card and board games with rock-solid realtime networking and fair play.' },
    { title: 'Sports & Racing', text: 'Physics-driven sports and racing titles with responsive, competitive game feel.' },
  ],
}

export const testimonials = {
  kicker: 'What clients say',
  title: 'Partners in Europe and the USA trust us with their games.',
  items: [
    {
      quote:
        'GameRenderer felt like our own in-house team from week one. The build quality, the communication, the way they hit every milestone — outstanding. Our WebGL title runs beautifully on hardware we didn’t think possible.',
      author: 'Studio Head',
      meta: 'Games Publisher · Germany',
    },
    {
      quote:
        'We’ve worked with development partners on three continents. Nobody matched the combination of Unity expertise, art quality and honest, proactive communication we get from this team.',
      author: 'Product Director',
      meta: 'Entertainment Brand · USA',
    },
    {
      quote:
        'They took a rough concept and turned it into a polished, shippable game — on budget and ahead of schedule. The optimization work alone paid for the engagement.',
      author: 'Founder',
      meta: 'Mobile Gaming Startup · UK',
    },
  ],
}

export const faq = {
  kicker: 'FAQ',
  title: 'Answers to common questions.',
  items: [
    {
      q: 'How much does game development cost in India?',
      a: 'It depends on scope, art style and platforms. A polished hyper-casual or advergame typically starts around a few thousand dollars; mid-core mobile, multiplayer or VR titles range significantly higher. Working with our India-based team, most European and US clients save 40–60% versus equivalent local teams. Send us a short brief and we will return a transparent, itemized estimate within 48 hours.',
    },
    {
      q: 'Do you work with clients in Europe and the USA?',
      a: 'Yes — the majority of our clients are in Europe (Germany, UK, Netherlands, France) and North America. We guarantee daily working-hours overlap with your time zone, communicate in fluent English over your preferred tools (Slack, Teams, Jira, Linear), and run demos and reviews at times that suit you.',
    },
    {
      q: 'Which platforms and engines do you develop for?',
      a: 'We ship for web (WebGL/HTML5), iOS, Android, Windows, macOS, Steam, consoles and XR headsets. Our core engines are Unity and web technologies such as Three.js, PlayCanvas, Babylon.js, Phaser and PIXI — plus Unreal Engine for select 3D productions.',
    },
    {
      q: 'How do you protect our idea and intellectual property?',
      a: 'Every engagement starts with an NDA. Contracts include full IP assignment — source code, art assets, documentation and store accounts belong to you. Code lives in repositories you control, and we are happy to work inside your infrastructure.',
    },
    {
      q: 'Can you take over or rescue an existing game project?',
      a: 'Yes. We regularly audit, stabilize and complete projects started elsewhere. We begin with a technical audit of the codebase and assets, give you an honest assessment, then propose a recovery plan with clear milestones.',
    },
    {
      q: 'How long does it take to build a game?',
      a: 'A playable prototype typically takes 2–4 weeks. Hyper-casual and advergames ship in 4–10 weeks. Mid-core mobile, multiplayer and VR titles usually run 3–9 months depending on content volume. We will give you a realistic timeline — not an optimistic one — at the estimate stage.',
    },
    {
      q: 'Do you provide post-launch support and live-ops?',
      a: 'Absolutely. Most of our client relationships continue well past launch: content updates, seasonal events, A/B testing, analytics-driven tuning, monetization optimization and platform compliance updates.',
    },
  ],
}

export const contact = {
  kicker: 'Keep in touch',
  title: 'Let’s build your next game.',
  body: 'Have a project idea, need a dedicated team, or want a second opinion on an existing build? Tell us about it — we reply to every enquiry within 24 hours, and your details stay strictly confidential.',
  points: [
    'Free, no-obligation consultation and estimate',
    'NDA signed before you share sensitive details',
    'Response within 24 hours — usually much faster',
  ],
}
