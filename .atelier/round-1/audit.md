# Audit — AUDIT FAIL

http://localhost:3210 · 2026-08-14T07:36:06.801Z
**3 critical · 2 warning · 10 pass**

## Critical (blocks the gate)

- **color.contrast** — 11 text/background pair(s) below WCAG AA
  `[{"selector":"span.font-led.text-[0.9rem]","text":"01","ratio":4.17,"required":4.5,"size":14.4,"color":"rgb(110, 118, 129)","background":"rgb(14, 15, 17)"},{"selector":"span.font-led.text-[0.9rem]","text":"02","ratio":4.17,"required":4.5,"size":14.4,"color":"rgb(110, 118, 129)","background":"rgb(14,`
- **responsive.overflow.tablet** — Horizontal overflow at 768px (776 > 768)
  `["div.glow-warm","div.glow-warm"]`
- **responsive.overflow.mobile** — Horizontal overflow at 390px (398 > 390)
  `["header.fixed","div.mx-auto","div.glow-warm","div.glow-warm","div.pointer-events-none"]`

## Warnings

- **typography.scale** — h1 is only 1.19x body (16px / 13.392px). Target 2.5x+ on desktop.
- **a11y.touch-targets** — 7 target(s) under 44x44px on mobile

## Passing

- console — No console errors
- responsive.overflow.desktop — No horizontal overflow at 1440px
- typography.banned-font — Fonts in use: satoshi, handjet, geistmono
- color.ramp — 8 distinct colours rendered
- copy.banned-words — No banned copy words
- a11y.h1 — Exactly one h1
- a11y.focus — Focus styles present
- detail.grain — Grain present at 0.04 (soft-light)
- detail.cursor — Custom cursor overlay present
- detail.cursor.touch — Custom cursor correctly absent on touch
