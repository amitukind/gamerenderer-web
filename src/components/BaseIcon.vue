<script setup>
/**
 * Inline SVG icon set — stroke icons inherit currentColor.
 * Keeps the bundle dependency-free and crisp at any size.
 */
defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 24 },
})

// stroke-based UI / service icons (24x24 viewBox)
const stroke = {
  gamepad:
    'M6 12h4m-2-2v4M15 11h.01M18 13h.01M17.5 5h-11A4.5 4.5 0 0 0 2 9.5v.5l1.2 6A3 3 0 0 0 6.13 18.4 3 3 0 0 0 8.7 17l.8-1h5l.8 1a3 3 0 0 0 5.37-.4l1.13-6.1v-.5A4.5 4.5 0 0 0 17.5 5Z',
  globe:
    'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20Z',
  cube:
    'M12 2 3 7v10l9 5 9-5V7l-9-5ZM3 7l9 5 9-5M12 22V12',
  vr:
    'M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-4.2a2 2 0 0 1-1.6-.8l-.9-1.2a1.5 1.5 0 0 0-2.4 0l-.9 1.2a2 2 0 0 1-1.6.8H5a2 2 0 0 1-2-2V8Z',
  palette:
    'M12 22a10 10 0 1 1 0-20c5.5 0 10 4 10 9 0 3-2.5 4-4 4h-2a2 2 0 0 0-1.6 3.2A1.8 1.8 0 0 1 12 22ZM7.5 11.5h.01M10 7.5h.01M14.5 7.5h.01',
  film:
    'M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM3 8h4M17 8h4M3 16h4M17 16h4M8 3v18M16 3v18',
  layout:
    'M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1ZM3 9h18M9 21V9',
  server:
    'M5 3h14a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2ZM5 14h14a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2ZM7 6.5h.01M7 17.5h.01',
  gauge:
    'M12 21a9 9 0 1 1 0-18 9 9 0 0 1 9 9M12 13l4-4M9 21h6',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  arrowUp: 'M12 19V5M6 11l6-6 6 6',
  mail: 'M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1ZM3 7l9 6 9-6',
  pin: 'M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11ZM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  check: 'M5 13l4 4L19 7',
  copy: 'M9 9h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1ZM5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1',
  chevron: 'M6 9l6 6 6-6',
  trophy:
    'M8 21h8M12 17v4M7 4h10v6a5 5 0 0 1-10 0V4ZM7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3',
  users:
    'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M15.5 3.13a4 4 0 0 1 0 7.75',
  clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM12 6v6l4 2',
  shield: 'M12 22s8-3.6 8-10V5l-8-3-8 3v7c0 6.4 8 10 8 10ZM9 12l2 2 4-4',
  spark:
    'M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2Z',
  quote:
    'M7.5 11H4.6c.2-3 1.6-4.8 4.4-5.6V3C4.6 3.9 2 7 2 11.6V19h7.5v-8H7.5ZM20 11h-2.9c.2-3 1.6-4.8 4.4-5.6V3c-4.4.9-7 4-7 8.6V19H22v-8h-2Z',
}
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path :d="stroke[name]" />
  </svg>
</template>
