# Audit — AUDIT FAIL

http://localhost:3210 · 2026-08-14T07:44:05.468Z
**1 critical · 2 warning · 12 pass**

## Critical (blocks the gate)

- **color.contrast** — 2 text/background pair(s) below WCAG AA
  `[{"selector":"a.inline-flex.items-center","text":"Buy SB-01$349","ratio":1.03,"required":4.5,"size":16,"color":"rgb(22, 19, 10)","background":"rgb(14, 15, 17)"},{"selector":"span.tnum.font-mono","text":"$349","ratio":1.03,"required":4.5,"size":14.4,"color":"rgb(22, 19, 10)","background":"rgb(14, 15,`

## Warnings

- **color.ramp** — Only 7 distinct opaque colours rendered. A full neutral ramp usually yields 10+.
- **a11y.touch-targets** — 5 target(s) under 44x44px on mobile

## Passing

- console — No console errors
- responsive.overflow.desktop — No horizontal overflow at 1440px
- typography.banned-font — Fonts in use: satoshi, handjet, geistmono
- typography.scale — h1 is 13.41x body
- copy.banned-words — No banned copy words
- a11y.h1 — Exactly one h1
- a11y.focus — Focus styles present
- detail.grain — Grain present at 0.04 (soft-light)
- detail.cursor — Custom cursor overlay present
- responsive.overflow.tablet — No horizontal overflow at 768px
- responsive.overflow.mobile — No horizontal overflow at 390px
- detail.cursor.touch — Custom cursor correctly absent on touch
