# DESIGN.md — SABLE

> Direction: "Instrument Panel". Locked 2026-08-14. Amendments append below with dates.

## 1. Visual Theme & Atmosphere

**Mood:** stark, precise
**Banned register:** playful
**Density:** Oscillating — dense catalog moments (nav index, spec tables, range grid) set against monumental sparse moments (hero, flagship band). The page must never sit at one uniform density; the oscillation IS the rhythm.
**Philosophy:** SABLE presents audio hardware the way a calibration lab would: model designations instead of slogans, spec tables as ornament, one amber LED of warmth in a graphite room. Engineering candor is the luxury signal — where competitors sell mood, this site shows the instrument. It would never use a lifestyle mood photo as a hero, never crack a joke, never decorate. Every luxury cue comes from scale, dark air, or machined typographic detail.
**Reference DNA:** Teenage Engineering — parts-catalog index grammar, model-number typography, black-monolith product cards, dense→sparse oscillation. Nothing — one-sentence-per-product card grammar; a single frosted-glass card moment in the flagship band. Bang & Olufsen — the bottom-left product-name pin only. (Full theft table: `.atelier/inspiration/notes.md`.)

## 2. Color Palette & Roles

| Token | Hex | Role | Never used for |
|-------|-----|------|----------------|
| `--canvas` | `#0E0F11` | Page background | Cards (use `--surface`) |
| `--surface` | `#141618` | Monolith cards, panels, order stub | Full-page background |
| `--surface-raised` | `#1C1F21` | Hover lift, sticky nav fill, popovers | Body text backgrounds |
| `--surface-inverse` | `#EDEDEA` | Rare light interlude band (max one per page) | Default sections |
| `--text-primary` | `#EDEDEA` | Headings, body on dark | — |
| `--text-secondary` | `#B9BBB8` | Supporting copy, feature sentences | — |
| `--text-tertiary` | `#979A98` | Meta, captions ≥ 14px mono | Body copy — perception fails even where ratio passes |
| `--border-subtle` | `rgba(255,255,255,0.08)` | Hairlines, card borders, section rules | — |
| `--border-strong` | `rgba(255,255,255,0.16)` | Focused/hovered hairlines | Decoration |
| `--accent` | `#FFB300` | Primary CTA fill, active states of the Buy action | Decoration, icons, borders, headings, hover tints |
| `--accent-fg` | `#141618` | Text on accent | — |
| `--support` | `#6E7681` | Spec-table data accents, state dots | CTAs, text below 18px |

Full 11-step neutral ramp (graphite, faint cool cast):
`--n-50: #F6F6F4` · `--n-100: #EDEDEA` · `--n-200: #D8D9D6` · `--n-300: #B9BBB8` · `--n-400: #979A98` · `--n-500: #767A79` · `--n-600: #5C6060` · `--n-700: #444848` · `--n-800: #2E3132` · `--n-900: #1C1F21` · `--n-950: #141618`

**Contrast verified:** 2026-08-14 — `#EDEDEA`/`#0E0F11` ≈ 15:1 ✓, `#B9BBB8`/`#0E0F11` ≈ 9:1 ✓, `#979A98`/`#0E0F11` ≈ 6:1 ✓ (capped at meta/caption roles), `#FFB300`/`#0E0F11` ≈ 10:1 ✓, `#141618`/`#FFB300` ≈ 9:1 ✓. Exception: `--support #6E7681` on canvas ≈ 4.1:1 — restricted to ≥ 18px data text and non-text marks; never body copy. Re-verify any new pair before use.

**Dark mode:** the site IS dark — no toggle. Elevation via lightness (`--surface` → `--surface-raised`), never shadow stacks. Borders `rgba(255,255,255,0.08)`. The one `--surface-inverse` band flips text tokens (`--text-primary` → `#141618`).

## 3. Typography Rules

**Display:** Space Grotesk — self-hosted via `next/font/google`
**Body:** Space Grotesk (copy is short-measure by design; body sizes never below 16px)
**Mono:** Geist Mono — model numbers, eyebrows, spec data, captions, prices. Nothing else.
**Scale ratio:** 1.333 (perfect fourth), fluid 320→1440px. Values below generated at that ratio; regenerate at utopia.fyi only if the ratio itself changes (that's an amendment).
**Banned:** Inter, Poppins, Montserrat, Roboto, Open Sans, Lato, Raleway.

```css
--step--1: clamp(0.75rem, 0.72rem + 0.13vw, 0.84rem);
--step-0:  clamp(1.00rem, 0.96rem + 0.18vw, 1.13rem);
--step-1:  clamp(1.33rem, 1.28rem + 0.24vw, 1.50rem);
--step-2:  clamp(1.78rem, 1.71rem + 0.32vw, 2.00rem);
--step-3:  clamp(2.37rem, 2.28rem + 0.43vw, 2.67rem);
--step-4:  clamp(3.16rem, 3.04rem + 0.57vw, 3.55rem);
--step-5:  clamp(4.21rem, 4.05rem + 0.76vw, 4.74rem);
--step-6:  clamp(5.61rem, 5.40rem + 1.01vw, 6.31rem);
--step-7:  clamp(7.48rem, 7.19rem + 1.34vw, 8.42rem);
--step-8:  clamp(9.97rem, 9.61rem + 1.79vw, 11.22rem);
```

| Role | Family | Size | Weight | Line-height | Tracking | Case |
|------|--------|------|--------|-------------|----------|------|
| Display (hero designation) | Space Grotesk | `var(--step-8)` | 700 | 0.92 | -0.03em | UPPER |
| H2 section | Space Grotesk | `var(--step-5)` | 500 | 1.02 | -0.02em | Sentence |
| H3 / card title | Space Grotesk | `var(--step-2)` | 500 | 1.15 | -0.01em | Sentence |
| Eyebrow / model no. | Geist Mono | `var(--step--1)` | 400 | 1.2 | 0.2em | UPPER |
| Body large | Space Grotesk | `var(--step-1)` | 400 | 1.55 | 0 | Sentence |
| Body | Space Grotesk | `var(--step-0)` | 400 | 1.6 | 0 | Sentence |
| Spec data / price | Geist Mono | `var(--step-0)` | 400 | 1.4 | 0.02em | UPPER for units |
| Caption / meta | Geist Mono | `var(--step--1)` | 400 | 1.4 | 0.02em | Sentence |
| Button | Space Grotesk | `var(--step-0)` | 500 | 1 | -0.01em | Sentence |

**Measure:** body copy capped at 65ch (`max-w-[65ch]`, never `max-w-2xl`); feature sentences on cards capped at 40ch.
**Weights loaded:** Space Grotesk 400/500/700, Geist Mono 400. Nothing more.
**Numerals:** `font-variant-numeric: tabular-nums` on every spec table, price, and stat.
**Headlines:** `text-wrap: balance`; paragraphs `text-wrap: pretty`.

## 4. Component Stylings

**Button — primary (Buy)**
- Resting: `bg-[--accent] text-[--accent-fg]`, radius 2px, padding 14px 28px, weight 500
- Hover: fill shifts to `#FFC533` and the mono price suffix inside the label slides in 4px, 150ms ease-out
- Focus-visible: 2px ring `--accent` at 2px offset
- Active: `scale-[0.98]`, 80ms
- Disabled: `--n-800` fill, `--n-500` text, `cursor-not-allowed`
- Loading: spinner replaces label, width held constant

**Button — secondary / ghost**
- Resting: transparent fill, 1px `--border-strong` border, `--text-primary` label, radius 2px, same padding
- Hover: border to `rgba(255,255,255,0.32)`, background `--surface-raised`, 150ms
- Focus/active/disabled: as primary but ring `--n-300`

**Card — monolith (range index)**
- Fill `--surface`, 1px `--border-subtle` border, radius 4px, internal padding 24px, product image emerging from shadow within
- Model number top-left: Geist Mono eyebrow style; price bottom-right in mono tabular
- Hover: border to `--border-strong` + fill to `--surface-raised`, translate-y 0 (monoliths do not float), 180ms; image brightens ~8%
- No icon-in-rounded-square anywhere

**Input (order stub email/qty)**
- Resting: `--surface` fill, 1px `--border-subtle`, radius 2px, label above in mono eyebrow style
- Focus: border `--n-300`, no glow; Error: 1px `#E5484D` border + mono helper line below; helper text always reserved space

**Navigation**
- Resting: transparent over hero, hairline bottom rule, SABLE wordmark left (Space Grotesk 500, +0.08em tracking), mono index links right (`01 SB-01 · 02 RANGE · 03 ORDER`)
- Scrolled: condenses to 56px, `--surface-raised` fill at 92% opacity + backdrop blur, hairline stays
- Mobile: full-screen overlay, canvas fill, index links at `--step-3`, close is a 44px hit target
- Active link: 1px amber underline offset 6px — the sole non-CTA amber exception, only in nav active state… **No.** Active link marker is `--n-100` underline; amber stays CTA-only. (Rule kept absolute.)

**Link (inline)**
- Underline 1px, offset 4px, `--text-secondary` → `--text-primary` on hover, no color links

**Radius system:** `--r-sm: 2px` · `--r-md: 4px` · `--r-lg: 8px` (glass card only) · `--r-full: 9999px` (never on buttons; reserved for state dots). Personality: **sharp**. One radius per component class, never mixed.

## 5. Layout Principles

**Spacing scale:** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160 — no arbitrary values.
**Container:** max-width 1280px, gutter 24px mobile / 48px desktop.
**Grid:** 12-column, 24px gap. Spec tables and the range index snap to it; the hero designation deliberately overflows its column to the right edge.
**Section rhythm:** `py-24 md:py-32 lg:py-40` for sparse sections; catalog sections (range index, spec tables) tighten to `py-16 md:py-24` — the two rhythms alternate, never repeat twice in a row.
**Whitespace philosophy:** dark air is the luxury budget — spend it around the hero designation and the flagship band; be stingy inside catalog moments, where tightness reads as precision.
**Asymmetry budget:** (1) Hero — designation block left-anchored, spec-changelog table set into its right shoulder, no centering. (2) Flagship band — sticky product image column left, scrolling spec rows right. (3) Range index — 2-1-1 span rhythm (SB-01 card double-width), not equal thirds.

## 6. Depth & Elevation

| Level | Use | Value |
|-------|-----|-------|
| 0 | Canvas, sections | none |
| 1 | Monolith card at rest | 1px `--border-subtle`, fill `--surface` |
| 2 | Card hover / sticky nav | fill `--surface-raised`, border `--border-strong` |
| 3 | Dropdown, mobile overlay | fill `--surface-raised`, `0 24px 48px -12px rgba(0,0,0,0.5)` |
| 4 | Glass card (flagship band, one use) | `rgba(20,22,24,0.6)` + `backdrop-blur(16px)`, 1px `--border-subtle` |

**Surface texture:** 2% monochrome grain overlay site-wide (build-skill mandate); hairline rules (`--border-subtle`) as section dividers with mono index numbers (`01`, `02`, `03`) at their left ends.
**Border-first or shadow-first?** Border-first. Shadows only at levels 3–4. Never both stacked on one component.

## 7. Do's and Don'ts

**Always**
- Model numbers in Geist Mono, uppercase, tracked +0.2em — they are the ornament system.
- Every numeric claim specific and unit-bearing (hours, dB, mm, g), set in mono tabular.
- Alternate dense and sparse sections; if two adjacent sections share a density, change one.
- Amber `#FFB300` = the Buy action. One fill, one page, no exceptions.
- Canvas `#0E0F11`, never `#000000`; text `#EDEDEA`, never `#FFFFFF`.
- Hairline + mono index number at every section seam.
- Product imagery: dark objects emerging from shadow, single consistent light setup.

**Never**
- Use Inter or any ban-list face.
- Use the accent for anything other than the primary action.
- Ship a centered hero with h1 + subtitle + two buttons + a screenshot in a browser frame.
- Use emoji as icons, or icons in rounded squares.
- Use a purple-to-pink gradient anywhere, or any gradient on text.
- Ship three identical feature cards; the range index uses the 2-1-1 span rhythm.
- Use arbitrary spacing values outside the scale.
- Anything playful: mascots, wink-copy, decorative illustration, rounded-friendly shapes.
- Organic/bouncy easing — motion is mechanical (see §9); no spring overshoot.
- Lifestyle mood photography as a hero.

## 8. Responsive Behavior

| Breakpoint | Width | Behavior |
|------------|-------|----------|
| Mobile | <640 | Single column; nav → full-screen overlay; display drops to `--step-6`; hero spec-changelog moves below the designation; sticky flagship column unsticks to stacked |
| Tablet | 640–1024 | Range index 2-up (SB-01 card full-width first row); flagship band stacks, image top |
| Desktop | 1024–1440 | Full 12-col grid, sticky flagship column active |
| Wide | >1440 | Container caps at 1280px; canvas + hairlines extend full-bleed |

**Touch targets:** 44×44px minimum, 8px minimum spacing.
**No horizontal scroll at any width** — verified by the gauntlet (the overflowing hero designation clips via `overflow-x: clip` on the section, not the body).
**Reduced motion:** all entrance animation collapses to opacity-only at `prefers-reduced-motion: reduce`; the odometer signature moment renders as a static designation.

## 9. Agent Prompt Guide

**Palette one-liner:** canvas `#0E0F11` · ink `#EDEDEA` · accent `#FFB300` (Buy only) · support `#6E7681`
**Type one-liner:** Space Grotesk display+body / Geist Mono model numbers, eyebrows, specs — 1.333 scale
**Motion one-liner:** mechanical-subtle, 120–300ms, `cubic-bezier(0.2, 0, 0, 1)`, no springs; **one** signature moment: the hero designation's digits tick into place once on load, odometer-style, 600ms total

**Ready-to-use prompt:**
> Build <section> for SABLE. Use canvas `#0E0F11`, ink `#EDEDEA`, amber `#FFB300` on the Buy CTA only. Display is Space Grotesk at `var(--step-8)` weight 700, tracking -0.03em, line-height 0.92, uppercase; body is Space Grotesk at `var(--step-0)` capped at 65ch; model numbers and spec data are Geist Mono uppercase tracked +0.2em, tabular-nums. Sparse sections `py-32 lg:py-40`, catalog sections `py-16 md:py-24`. Borders are 1px `rgba(255,255,255,0.08)`; radius 2–4px; border-first, no shadows below level 3. Entrance: fade + 8px rise, 240ms, `cubic-bezier(0.2,0,0,1)`, 40ms stagger, opacity-only under reduced motion. Do not center the layout — anchor left, let the designation overflow right, and keep the amber off everything except the Buy action.

---

## Amendments

<!-- Append dated entries. Never edit above this line after lock. -->

**2026-08-14 — Devil's-advocate verdict SERIOUS; amendments applied before build.** Named flaw: four coordinated Teenage Engineering lifts (nav grammar, model-number ornament, monolith cards, hero changelog) tipped the direction from "school" into "citation" for the exact audience targeted. Binding changes:

1. **Hero readout, not changelog.** The hero designation carries a *calibration-readout strip* — hairline-ruled measurement rows (`-42 dB ANC @ 1 kHz, measured · 11.2 mm · 6.1 g`) set into the designation's right shoulder. Changelog grammar (version numbers per model) is banned site-wide as TE's named signature; measurement grammar is SABLE's own per §1's calibration-lab philosophy. This supersedes every §5/§9 mention of a "spec-changelog table."
2. **Specs argue judgment.** Every flagship spec row is written as *decision + number* ("11.2 mm — sized for sub-40 Hz without a vent"), never bare feature + number; the table must demonstrate engineering judgment, not invite line-item parity comparison at $349.
3. **Buy CTA position is composed.** Desktop hero: primary Buy button bottom-left beneath the designation, inside the first viewport. 390px hero: Buy directly below the designation, above the relocated readout strip. The 56px condensed nav state carries a compact mono-priced Buy action (`BUY SB-01 · $349`) — amber-filled, and it counts as the same single amber element (the Buy action) for the accent rule.
4. **Display-face test before token lock in code.** Set the step-8 designation in Space Grotesk vs Archivo Expanded vs Instrument Sans during the build's token phase; keep Space Grotesk only if the designation reads ownable next to the 2025-26 dev-tool dark-mode field. Outcome recorded here as a further amendment.
5. **Range cards never use buy-grammar.** Card CTAs are `Specs →` anchors; SB-02's blurb frames $549 as the range-topping over-ear so SB-01's "flagship" naming reads as intent, not error.

**2026-08-14 (build) — Display-face check (amendment 4), provisional outcome: Space Grotesk kept.** At first render the step-8 designation reads instrument-like rather than dev-tool-generic: at weight 700 the rounded-square terminals and the squarish zero give SB-01 a machined character the accent and mono system reinforce. Alternates (Archivo Expanded, Instrument Sans) were not loaded side by side; if the gauntlet's critic flags the designation as cliché, run the full three-face comparison in the polish phase and supersede this entry.

**2026-08-14 (v2) — Register correction on principal review: "immature, not professional" verdict on v1.** Direction stays Instrument Panel; execution moves from austere-industrial to cinematic-premium. Binding changes, superseding earlier entries where they conflict:

1. **Type system replaced.** Display + body: Satoshi (300 monumental designation, 400 body, 500 headings, self-hosted). LED instrument face: Handjet (variable, Google) for readout values, model numbers, nav/seam indices, stat values — this is the unique identity face. Geist Mono keeps labels, spec lists, captions. Space Grotesk retired (supersedes the display-face-check entry).
2. **Imagery: photo renders are canonical.** Six-image Recraft V4.1 set in `public/renders/`, one grade (key light upper left, amber rim right, charcoal ground, palette-locked). The exploded SB-01 view anchors the flagship story. Schematics retired from the main flow (file kept).
3. **Gradients as light are legal.** Ambient body gradients (warm key upper right, cool fill lower left), warm product glows, and the amber gradient + glow on Buy CTAs are permitted as *light*. Solid amber fills remain Buy-only. The "flat fills only" reading of §2 is dead.
4. **Radius personality: refined.** sm 6 / md 12 / lg 20, buttons full pill. Supersedes "sharp".
5. **Motion: choreographed.** Lenis smooth scroll (disabled under reduced motion), blur-and-rise reveals at 0.7s expo-out, hero parallax. The signature moment is now the flagship scroll story (pinned exploded render + progress rail + stepped decisions); the hero odometer is demoted to an entrance detail.
6. **Density guardrail unchanged.** Oscillation, one accent, no playful, banned faces — all still binding.

**2026-08-14 (v3.1) — Lab-grade calibration plot; corrected exploded stack.** Principal flagged the chart as amateur and the exploded order as technically off. The plot is now a framed deviation chart: log-frequency axis with real ticks (20 Hz-10 kHz + Hz unit), dB scale (+1.0 to -1.0), ±0.5 corridor, separate L/R traces (R at 50%, staggered draw), legend, and rig metadata grounded in real practice (IEC 60318-4 occluded-ear coupler, 1/12-octave smoothing, 94 dB SPL); IPX4 now cites IEC 60529. The exploded render was regenerated in correct assembly order (grooved end cap → faceted shell → cell → board → driver → mesh grille on nozzle ring → tip), visibly the same cylindrical product as the hero; flagship PART indices renumbered to match (01 plate … 08 tip).

**2026-08-14 (v3) — Brand identity, choreography system, stateful range.** Per principal direction and the new plugin methodology: (1) Brand identity locked per `.atelier/brand-spec.md` — the "Index Plate" mark (two broken concentric groove arcs + spindle dot, keyway at 12 o'clock) on favicon/apple/OG (plate-live, amber dot) and footer/404 (plate-ink); wordmark stays Satoshi 500 caps. Asset-prompt clause (append verbatim to every image prompt): "Matte graphite-anodized aluminum with precision-machined chamfers, every flat touch surface finished as a record-like disc of fine concentric grooves with a single small recessed amber LED point at its center, shot dark-on-dark against near-black charcoal under one soft key light from the upper left with a faint warm amber rim light from the right, no logos, no text, no visible branding." (2) Motion is a choreography system sharing one easing vocabulary: exploded scrub (signature) + LED flicker-ons + self-drawing plot + spec ticker marquee + hero/scene parallax. (3) The range is a stateful rack: hover/focus expands a panel while neighbours compress; tap-accordion on mobile; reduced motion gets equal static panels. (4) Copy integrated from `.atelier/content-deck.md` (authored pass): "Five decisions, one earphone.", "One model. One finish. One decision left.", order-point disclosure before the click, 0.2 mm groove pitch as the one new number. (5) New scene band: full-bleed field-conditions frame with parallax between calibration and order.

**2026-08-14 (polish) — Signature moment upgraded; render identity locked.** The flagship exploded view is now scroll-scrubbed (`components/exploded-scrub.tsx`): eight strips of the render sit compressed into an assembled stack as the section enters and pull apart to full exploded spacing with scroll; reduced motion gets the static render. Product identity v3: cylindrical buds with concentric-machined touch plates (record-groove disc) — this is SABLE's ownable ID cue; SW-01 and A-01 regraded darker into the hero grade (previous renders in `.atelier/prev-renders/`). Known residual: `exploded.png` and `macro.png` still show the v2 domed shell; regenerate to the v3 ID in the next assets pass (CONTENT-TODO).

**2026-08-14 (gauntlet round 3) — Responsive correction.** Mobile hero display holds `--step-7` (not the §8 table's step-6): SB-01 is five glyphs, fits 390px with zero overflow, and the monumental read is the hero's job. §8 table amended accordingly. Also formalizing: seam/index numerals and readout values use the Handjet LED face (v2 item 1), and the flagship story value size is `--step-5`.

**2026-08-14 (build) — Imagery decision: calibration drawings, not renders.** The asset audit found no photography and no assets phase run yet; the honest type-first answer for this direction is technical drawings. Product imagery is hairline SVG schematics (`components/schematics.tsx`): stroke `--n-500` on canvas (`--n-600` in cards, brightening to `--n-400` on hover), hidden edges dashed, dimension labels in Geist Mono 11px, every figure captioned `FIG. NN · MODEL`. This is canonical brand art, not a placeholder: it extends §1's calibration-lab philosophy. Photo renders from `/atelier:assets` may later join as a second layer, graded to one lens/light/finish set recorded here; the drawings stay. §2's "product imagery: dark objects emerging from shadow" in Do's applies to those future renders, not to the drawings.
