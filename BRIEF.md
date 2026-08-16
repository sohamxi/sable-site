# Brief — SABLE

> Direction: "Instrument Panel". Locked 2026-08-14. Amendments append below with dates.

## One-liner

A single landing page for SABLE, a fictional premium audio-and-wearables company, that presents the flagship SB-01 earphones and the full product range as one engineered system — dark, precise, and expensive-feeling.

## Audience and first-8-seconds job

Design-literate buyers of premium audio (the people who cross-shop AirPods Pro, Nothing Ear, and B&O) landing from a product-launch link. In the first 8 seconds they must register three things: this is a hardware company with taste, the flagship is the SB-01, and there is a Buy action within one scroll. The hero is a monumental model designation, not a lifestyle mood — confidence through specificity.

## Success action

Click **Buy SB-01** (pre-order CTA). Everything else — the range index, the spec bands — exists to make that click feel justified at $349. No real checkout: the CTA resolves to the order panel section stub. Secondary success: a range-card click into a product anchor.

## Positioning (with vs against)

**Against** the category's two dominant clones: the Apple-clone (light, sentimental, feature-per-viewport) and the B&O-clone (dark mood photography, atmosphere over information). SABLE sits **with** the Teenage Engineering / Nothing school — engineering candor as the luxury signal — but executed severe and dark, without their playfulness. Where competitors sell mood, SABLE shows the instrument.

## Register

**Stark, precise. Banned: playful.**
Also banned by inheritance: quirky mascots, wink-copy, decorative illustration. Severity is the brand. Warmth enters only through the amber accent — the instrument's LED, not a smile. (Direction risk on file: severity drifting into cold retail catalog — every section must carry one luxury cue: monumental scale, generous dark space, or machined typographic detail.)

## Reference set

Captured 2026-08-14 in `.atelier/inspiration/` (see `notes.md` for the full extraction table):

- **Teenage Engineering** — parts-catalog nav grammar, model-number typography as ornament, black-monolith product cards, dense→sparse density oscillation.
- **Nothing** — one-sentence-per-product card grammar; frosted-glass card floating over full-bleed imagery (used once, in the flagship band).
- **Bang & Olufsen** — what we are against: their hero proves atmosphere alone can carry price; we take only the bottom-left product-name pin.
- **Daylight Computer** — canvas temperature as product argument (our graphite-and-amber says "instrument at night").
- **Even Realities** (scout notes) — flagship-plus-range told as one narrative spine.

Not taken, ever: Nothing's dot-matrix face or parenthetical naming, TE's orange workshop identity, any reference palette, wordmark, imagery, or copy.

## Content inventory (what exists, what must be written)

Nothing exists — SABLE is invented, so **every asset must be written or generated**:

- Brand: SABLE wordmark (set in type, no logo mark needed), voice = engineering candor, short declaratives.
- Products (all fictional, prices in USD):
  - **SB-01** — flagship wireless earphones, $349. Hero + flagship spec band + order panel.
  - **SB-02** — over-ear headphones, $549. Range card + anchor blurb.
  - **SW-01** — sensor band (wearable), $199. Range card + anchor blurb.
  - **A-01** — charge dock, $79. Range card, one line.
- Copy: hero designation + one claim line, 3–5 spec rows per flagship band, one feature sentence per range product, order-panel microcopy, footer. All falsifiable-style claims (driver size, ANC depth in dB, battery hours) — invented but internally consistent, never superlatives without a number.
- Imagery: product renders (generated in the assets phase) — earphones/headphones/band as dark objects emerging from shadow, consistent lens/light/finish set once in DESIGN.md §Asset direction note.

## Technical requirements

- Next.js App Router + TypeScript + Tailwind v4 + shadcn, per the build skill's stack conventions.
- Fonts self-hosted via `next/font`: Space Grotesk (400/500/700), Geist Mono (400). No Google Fonts `<link>`, no Inter anywhere.
- All copy in `content/site.ts`; colors and type only via tokens from `globals.css`.
- Static site — no auth, no database, no persisted forms. The Buy CTA scrolls to the order panel stub.
- Runs with bun (`bun install`, `bun dev`). Never npm.
- Component sourcing note: the 21st MCP was unauthenticated at brief time — authorize it before the build phase via claude.ai connector settings, or hand-build the blocks (hero, sticky spec band, monolith card grid, order panel).
- Grain overlay + custom cursor mounted (build-skill mandates); `prefers-reduced-motion` respected globally.

## Out of scope

Real checkout/payments, CMS, blog, multi-page product detail pages, i18n, dark/light toggle (the site is dark, period), newsletter capture, analytics.

## Acceptance criteria

- [ ] Hero opens on the monumental SB-01 model designation with a spec-changelog table set into it — no centered h1-subtitle-two-buttons stack, no lifestyle mood photo.
- [ ] A visitor can reach a working Buy SB-01 CTA within one scroll of the top, and the CTA is the only amber-filled element on the page.
- [ ] The full range (SB-01, SB-02, SW-01, A-01) appears as a monolith-card index — model number top-left in mono, one feature sentence, one price, one CTA per card; cards are not three-identical-icon-cards.
- [ ] At least two sections break the centered-stack default (hero designation block; sticky flagship spec band).
- [ ] Every numeric claim on the page is specific (hours, dB, mm, grams) — zero adjective-only claims, zero banned words from the anti-slop list.
- [ ] Space Grotesk + Geist Mono only; amber #FFB300 appears on CTAs and nowhere else; canvas is #0E0F11, never pure black.
- [ ] Density oscillates: dense catalog moments (nav index, spec tables) against monumental sparse moments (hero, flagship band) — the page never sits at one uniform density.
- [ ] Nothing on the page reads playful: no emoji, no wink-copy, no decorative illustration.
- [ ] Mobile (390px): no horizontal scroll, display drops to step-6, monolith grid single-column, touch targets ≥ 44px.
- [ ] The user would say "this looks like it cost $10k" — proxy: gauntlet self-score ≥ 85 with zero audit criticals.

## Watch item (from direction risk)

Severity → cold catalog drift. If the gauntlet reads any section as "retail parts list," the fix is scale and space (bigger designation, more dark air), never added decoration.

---

## Amendments

<!-- Append dated entries. Never edit above this line after lock. -->

**2026-08-14 — Devil's-advocate verdict SERIOUS; corrections (not drift):**

- Acceptance criterion 1 superseded: the hero opens on the monumental SB-01 designation with a **calibration-readout strip** (measurement rows) set into its right shoulder — *not* a spec-changelog table. Changelog grammar is banned site-wide (TE's named signature).
- Acceptance criterion 2 clarified: "Buy within one scroll" is composed, not hoped — hero Buy sits bottom-left beneath the designation (below it at 390px), and the condensed nav carries a mono-priced `BUY SB-01 · $349`. Both render the single amber Buy action.
- New criterion: every flagship spec row reads decision + number ("11.2 mm — sized for sub-40 Hz without a vent"); bare feature-lists fail.
- New criterion: range-card CTAs are `Specs →` anchors, never buy-grammar; SB-02's blurb frames $549 as the range-topping over-ear.
- Watch item added: the amber-mono-on-graphite kit borders the "terminal industrial" dev-tool cluster — the build's display-face test (DESIGN.md amendment 4) is the checkpoint.

**2026-08-14 (later) — 21st MCP authorized; component sweep done.** Supersedes the "unauthenticated" note in Technical requirements. Four searches run (hero / product cards / sticky spec sections / navbars). Adapt-worthy IDs for the build phase — per build rules, strip palette, fonts, radius, and change proportions:

- **id 18041 — "Scroll 01"** (felipemenezes098): sticky media column + scrolling text that swaps the image per block — the flagship spec-band mechanic. Primary candidate.
- **id 1888 — "Sticky Section Tabs"** (aghasisahakyan1): sticky per-section headers under the nav — possible fit for the section-seam index numbers.
- **id 23554 — "Scroll Spy"** (ddoemonn): scroll-tracking active nav state + `useScrollSpy` hook — take the hook, restyle pill → hairline underline.

Registry heroes, product cards, and navbars all read wrong-register (mega-menus, rounded e-commerce cards, decorative glows) — hero, monolith range cards, and nav are **hand-built**. This is the originality-preserving outcome.

**2026-08-14 (v2) — Principal review correction.** Soham reviewed v1: "very immature, not professional; improve assets, look and feel, fonts, layouts, animations, buttons" and asked for exploded views, Apple-register promo storytelling, a unique face, gradients, and a continuous scroll feel. Corrections (not drift): six-image render set generated and wired (hero, macro, exploded, SB-02, SW-01, A-01); type system now Satoshi + Handjet LED + Geist Mono; flagship band rebuilt as a pinned exploded-view scroll story; Lenis continuous scroll; gradient light and refined pill CTAs. Promo *video* deliberately deferred to `/atelier:assets` (noted in CONTENT-TODO.md). Acceptance criterion 1's "no lifestyle mood photo" is amended to "no *stock* lifestyle photography; graded product renders are canonical." The severity watch item flips: watch for drift toward generic dark-premium; the LED readouts and measurement copy are what keep it SABLE.
