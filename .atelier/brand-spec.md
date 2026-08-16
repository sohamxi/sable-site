# SABLE — Brand Identity Spec

> Authored 2026-08-14 by brand-director. Sits downstream of BRIEF.md and DESIGN.md
> (Instrument Panel direction, v2 cinematic-premium execution). Tokens, faces, and
> the single-amber rule are inherited, not restated as options. Amendments append below.

---

## 1. Identity thesis

**SABLE's mark is the product's own touch plate read as a calibration dial — concentric
machined grooves, one index corridor cut to top dead center, one LED point — ownable
because every competitor in this category sells mood, and SABLE's identity is literally
a measurement surface.**

The mark is not a symbol *about* the product; it is the product's signature part
(the record-groove touch plate, locked as the v3 physical ID in DESIGN.md) drawn as
an instrument face. The corridor is the tolerance corridor from the spec bands; the
dot is the unit under test. Everything the site claims — per-unit plots, no golden
samples, decision-plus-number specs — is compressed into this one piece of geometry.

It replaces the placeholder calibration square in `app/icon.svg` / `app/apple-icon.tsx`
and the bare amber square in `app/opengraph-image.tsx`.

---

## 2. Logo mark spec — "the Index Plate"

### 2.1 Construction grid

- **Grid:** 64 × 64 units. Center of the plate at **(32, 32)**.
- **All strokes:** `stroke-linecap="butt"`, `fill="none"` unless stated. Machined
  cuts, never rounded ends.
- **The index corridor:** an 8-unit-wide channel cut through every groove, centered
  on x = 32, opening at 12 o'clock (top dead center) and terminating at the dot.
  Every arc endpoint sits exactly on the verticals **x = 28** and **x = 36**; the
  butt caps fall on radial lines, so the corridor walls taper toward center like a
  keyway — this is intentional and must not be "corrected" to parallel walls.
- **Rotation:** corridor always points to 12 o'clock. The mark is never tilted at
  rest (sole exception: the loading rotation, §2.6).

### 2.2 Primitives — core tier (16–48 px rendered)

Three primitives. Transcribe verbatim; do not re-derive.

| # | Primitive | Geometry (64-unit grid) | Stroke / fill |
|---|-----------|-------------------------|---------------|
| 1 | Outer groove | arc, r 28, center (32,32), gap at top — path `M 28 4.3 A 28 28 0 1 0 36 4.3` | stroke 4, ink |
| 2 | Inner groove | arc, r 17, center (32,32), gap at top — path `M 28 15.5 A 17 17 0 1 0 36 15.5` | stroke 4, ink |
| 3 | Spindle dot | circle, cx 32, cy 32, r 7 | fill (color per §2.5) |

Derived checks (for verification, not re-specification): outer groove edges at
r 26–30; inner groove edges at r 15–19; ring-to-ring air gap 7 units; inner-groove-
to-dot air gap 8 units. At 16 px (scale 0.25) strokes render at exactly 1 px, the
dot at 3.5 px radius, the corridor at 2 px — nothing aliases away.

**Canonical `app/icon.svg` (favicon surface — replaces the placeholder square):**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#0E0F11"/>
  <g stroke="#EDEDEA" stroke-width="4" fill="none" stroke-linecap="butt">
    <path d="M 28 4.3 A 28 28 0 1 0 36 4.3"/>
    <path d="M 28 15.5 A 17 17 0 1 0 36 15.5"/>
  </g>
  <circle cx="32" cy="32" r="7" fill="#FFB300"/>
</svg>
```

### 2.3 Primitives — detail tier (≥ 64 px rendered)

Adds two hairline grooves — the "fine machining" that makes the plate read as a
record surface at Apple-icon and OG scale. Same corridor, same endpoints on
x = 28 / x = 36.

| # | Primitive | Geometry | Stroke |
|---|-----------|----------|--------|
| 4 | Fine groove A | arc, r 23 — path `M 28 9.3 A 23 23 0 1 0 36 9.3` | stroke 1.5, ink at 55% opacity |
| 5 | Fine groove B | arc, r 12 — path `M 28 20.7 A 12 12 0 1 0 36 20.7` | stroke 1.5, ink at 55% opacity |

Insert primitives 4–5 into the same `<g>` as 1–2 but in their own group with
`opacity="0.55"`. Below 64 px rendered, the fine grooves are omitted entirely —
never scaled down, never thickened to survive.

### 2.4 Size floors and survival matrix

| Rendered size | Tier | Result |
|---------------|------|--------|
| 16 px (favicon) | Core | Dial with notch and pip — verified geometry, 1 px strokes |
| 32 px (tab, hi-dpi) | Core | 2 px strokes, corridor clearly a cut |
| 48 px | Core | Last core-only size |
| 64 px+ | Detail | Fine grooves appear |
| 180 px (apple icon) | Detail | Full machined plate |
| < 16 px | — | **Never rendered.** Use nothing instead of a mushed mark |

### 2.5 Color rules (the amber law, applied to the mark)

The site's rule is inviolable: **amber = the Buy action, one element per page.**
The mark therefore has exactly two colorways:

1. **Plate-ink (in-page, default):** grooves and dot all `--text-primary #EDEDEA`
   (or the stated quiet variant, e.g. watermark). Used anywhere a Buy action can
   coexist on the surface: nav, footer, 404, loading, watermarks, print.
2. **Plate-live (off-page only):** grooves ink, **dot `#FFB300`** — the LED lit.
   Permitted only on surfaces that carry no Buy action and sit outside the page's
   accent budget: favicon, apple icon, OG image, social avatar. These surfaces
   already carried amber under the existing rules (the placeholder icon and OG
   square), so this extends no permission — it inherits one.

Monochrome / one-color hard reproduction (engraving, laser-etch, single-ink print):
core tier only, all one color. The mark must and does survive this — it is three
shapes.

**No gradients inside the mark at any size** (stricter than the 32 px constraint —
the plate is machined, not lit-from-within). No shadows, no glows, ever.

### 2.6 Motion (loading state only)

The two colorways never animate color. The only sanctioned motion: **the groove
group (primitives 1–2, plus 4–5 at detail tier) rotates 360° about (32,32), 1.2 s,
`linear`, infinite; the dot does not move.** The corridor sweeps like a scan — the
logo is the spinner. Under `prefers-reduced-motion: reduce`: static plate-ink mark,
no pulse, no fade loop.

### 2.7 What this mark is not (drift guards from `.atelier/inspiration/notes.md`)

- Not a crosshair or target — no radial or cross lines through the plate.
- Not a vinyl-record illustration — the corridor and pip make it an instrument face.
- Not Nothing's territory — grooves are continuous strokes, never dotted, never
  dot-matrix, never pixelated.
- Not TE's — no orange, no version digits, no changelog grammar near the mark.
- Not a monogram — no S, no letterform hidden in the geometry. The plate is the mark.

---

## 3. Wordmark spec

### 3.1 Primary wordmark

- **Face:** Satoshi **Medium (500)** — already loaded (`public/fonts/Satoshi-Medium.woff2`).
- **Case:** UPPERCASE, always: `SABLE`.
- **Tracking:** **+0.08em** (matches the shipped nav treatment — the nav is already
  correct and is the reference render).
- **Color:** `--text-primary #EDEDEA`. Never amber, never gradient, never Handjet.
- **Size floor:** 14 px. Below that, use the mark alone.
- No ligatures, no stylistic alternates, no outlines, no glyph surgery.

### 3.2 Nameplate variant (meta surfaces)

`SABLE INSTRUMENTS` — Geist Mono 400, UPPERCASE, tracking **+0.2em**, color
`--text-tertiary #979A98`. For OG eyebrow (already shipped), footer legal line,
document headers, render captions. Never a substitute for the primary wordmark in
navigation.

### 3.3 Lockup rules (all distances in mark-units, never pixels)

- **Horizontal lockup (the only lockup):** mark left, wordmark right.
- **Scale:** mark optical height (60 units, outer groove edge to edge) = **1.5 ×**
  wordmark cap height.
- **Alignment:** dot center (y 32) sits on the wordmark's cap-height midline.
- **Gap:** **24 units** between the outer groove's right edge and the S.
- **Clearspace:** **16 units** minimum on all sides of the lockup (and of the mark
  alone), measured from the outer groove edge and the wordmark extremes. Nothing
  enters it — not hairlines, not seam indices.
- **Minimum lockup size:** mark 20 px + wordmark 14 px cap height. Smaller: mark only.
- **Stacked lockups, curved text, mark-behind-text: do not exist.**

---

## 4. Tagline system

Register: stark, precise. Banned: playful — no puns, no winks, no exclamation
marks. Every line is a flat declarative that a lab report could sign.

| Role | Line | Where |
|------|------|-------|
| **Primary** | **Every unit, measured.** | Footer (under lockup), OG description, press boilerplate, meta description |
| Situational — proof | **No golden samples.** | Order panel, calibration section, spec-band contexts where the per-unit plot appears |
| Situational — category | **Instruments, not accessories.** | Positioning contexts: about blurbs, launch copy, partner decks |
| Product-line pattern | *`<Product>`, measured.* (e.g. "Earphones, measured.") | Product-level claims — already shipped on the OG image; the pattern generalizes to SB-02/SW-01 |

Register check: no adjectives at all in the primary and proof lines; "premium",
"beautifully", "crafted" and the anti-slop list never appear within a tagline.
Taglines are set in Satoshi 400 sentence case at body sizes, or Geist Mono caption
style when used as a meta line. Never in Handjet — the LED face renders values,
not sentences.

---

## 5. Application map

| Surface | File | Mark variant | Wordmark | Tokens / notes |
|---------|------|--------------|----------|----------------|
| Favicon | `app/icon.svg` | Core tier, **plate-live** (amber dot) | — | Canvas `#0E0F11` field; SVG in §2.2 verbatim |
| Apple icon 180 px | `app/apple-icon.tsx` | Detail tier, **plate-live**, mark at 128 px centered | — | Canvas field full-bleed; strokes scale ×2.8125 (stroke 4 → 11.25 px) |
| OG image 1200×630 | `app/opengraph-image.tsx` | Detail tier, **plate-live**, 72 px top-right — replaces the bare amber square | Nameplate top-left (shipped) | Keeps SB-01 designation + "Earphones, measured." + measurement footer row |
| Social avatar | export from icon | Detail tier, **plate-live**, mark at 62.5% of frame | — | Canvas field; same file discipline as apple icon |
| Nav (resting + condensed) | `components/sections/nav.tsx` | **None** — wordmark only | Primary wordmark (shipped treatment) | Amber budget belongs to the condensed Buy pill; adding the mark here is banned |
| Footer | `components/sections/footer.tsx` | Core tier, **plate-ink**, 24 px | Full lockup per §3.3 | Primary tagline in Geist Mono caption `--text-tertiary` beneath; nameplate in legal line |
| 404 | `app/not-found.tsx` | Core tier, **plate-ink**, 48 px above the "Signal lost" eyebrow | — | Ghost CTA stays the only button; mark ink, static |
| Loading state | wherever a wait exists | Core tier, **plate-ink**, 32 px, §2.6 rotation | — | Reduced motion: static |
| Render watermark corner | render pipeline / figure chrome | Core tier, **plate-ink at 40% opacity**, 20 px, bottom-right | — | Beside the existing `FIG. NN · MODEL` mono caption; never plate-live on imagery |
| Error boundary | `app/error.tsx` | Same treatment as 404 | — | — |
| Order panel / Buy contexts | `components/sections/order.tsx` | **None** | — | Amber is spoken for; the mark never shares a viewport region with the Buy fill |

---

## 6. Asset-prompt clause

Append this sentence **verbatim** to every image-generation prompt (renders,
macro shots, future promo frames), after the scene description:

**"Matte graphite-anodized aluminum with precision-machined chamfers, every flat touch surface finished as a record-like disc of fine concentric grooves with a single small recessed amber LED point at its center, shot dark-on-dark against near-black charcoal under one soft key light from the upper left with a faint warm amber rim light from the right, no logos, no text, no visible branding."**

Rationale: materials (graphite anodize, chamfers) + signature detail (concentric-
groove touch plate = the mark's own geometry) + the one warmth source (amber LED /
rim = the accent as light, legal per DESIGN.md v2 item 3) + the locked grade (key
upper-left, amber rim right, charcoal ground) + a no-baked-branding guard so the
watermark and captions stay the only marks on imagery.

---

## 7. Don'ts — five absolutes

1. **Never let amber leave the dot.** Grooves, wordmark, and taglines are never
   amber; the dot is amber only on off-page surfaces (favicon, apple icon, OG,
   avatar). In-page, the mark is always plate-ink — the Buy action owns the page's
   amber, without exception.
2. **Never soften the machining.** No round linecaps, no radius on the corridor,
   no gradients, shadows, or glows inside the mark at any size, no strokes thinned
   or thickened beyond the two specified weights.
3. **Never put letters in the plate or the plate behind letters.** No S monogram,
   no mark-as-background, no pattern fills or groove-texture wallpaper built from
   the mark.
4. **Never rotate, tilt, or multiply it.** Corridor at 12 o'clock always; one mark
   per surface; the only motion is the 1.2 s linear loading rotation.
5. **Never render it below 16 px, and never redraw the grooves as dots, dashes, or
   pixels** — dotted geometry is Nothing's identity, and a mushed mark is worse
   than no mark.

---

## Amendments

<!-- Append dated entries. Never edit above this line. -->
