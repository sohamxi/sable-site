# SABLE Content Deck (v2, authored pass)

> Content editor deliverable, 2026-08-14. Register: stark, precise. Banned: playful.
> Zero em dashes, zero exclamation marks, zero banned-list words anywhere below,
> including alt text and metadata. Every number is carried over exactly from the
> current `content/site.ts`; one new number is introduced (0.2 mm groove pitch,
> for the v3 touch-plate identity cue) and conflicts with nothing.
>
> Consistency invariants preserved from the critic pass, do not undo:
> attenuation is always worn, passive seal plus active loop, never a bare
> negative-dB ANC figure; the frequency-response check is a per-unit census and
> the attenuation rating is drawn from random production pulls, and the copy
> never lets those two blur into one process; no email is promised anywhere; no
> provenance, press, or testimonials are invented; fiction is disclosed at the
> order point and in the footer.

---

## 1. Voice sheet

1. Every claim is a number with a unit, and every number rides with the decision that produced it.
2. Short declaratives, active voice, one idea per sentence; the period does the work other brands give to adjectives.
3. Warmth enters only through the physical: grams, grooves, quiet, two days of battery, never through charm.
4. SABLE reports rather than persuades; when a line starts to sell, replace it with the measurement.
5. The fiction is disclosed in the same flat voice as the specs, adjacent to any point where money or email could appear to change hands.

House vocabulary (one word per concept, everywhere): earphones (never earbuds, never in-ear monitors), the line, the rig, the plot, the serial, worn attenuation, golden sample (only ever negated). The touch plate is "turned", never "engraved" or "textured".

---

## 2. Headline systems

Three genuinely different options per section. Recommendation marked, one line of argument each.

### Hero claim

| | Option | Argument |
|---|---|---|
| A ✔ | **Earphones, measured.** | Keep. Two words carry the whole thesis and every section below is its proof; replacing it would be motion, not progress. |
| B | Sound you can check. | Moves from method to invitation; honest, but "check" is weaker than the plot-in-the-box specifics that follow it. |
| C | Within 0.5 dB of reference. | A pure number as headline, maximal candor, but it spends the calibration band's punchline in the first viewport. |

### Flagship (section 01)

| | Option | Argument |
|---|---|---|
| A ✔ | **Five decisions, one earphone.** | Names the section's actual structure, five rows, and swaps ad alliteration for count grammar. |
| B | Everything here cost something. | Tradeoff framing at its most compressed; strong, but it needs the rows to land before it means anything. |
| C | Sealed. Silenced. Certified. | Current. Reads as ad alliteration, and "Silenced" overclaims what 42 dB delivers. Kill. |

### Range (section 02)

| | Option | Argument |
|---|---|---|
| A ✔ | **Four instruments. One discipline.** | Keep. Count plus ethos; it does wayfinding and positioning in six words and touching it would be vanity. |
| B | Three certificates, four instruments. | Spec-honest and quietly provocative, the dock gets no certificate, but it makes the reader do arithmetic before the cards explain. |
| C | The catalog is short on purpose. | Pure decision grammar; authored, but it editorializes where the cards should. |

### Calibration (section 03)

| | Option | Argument |
|---|---|---|
| A ✔ | **Every unit measured. No golden samples.** | Keep. Already the strongest headline on the page; both halves are falsifiable. |
| B | The rig does not flatter. | The right coldness, but it drops the census claim that makes the section checkable. |
| C | Your serial, your plot. | Personal and specific, but it reads better as the certificate note than as a band title. |

### Order (section 04)

| | Option | Argument |
|---|---|---|
| A ✔ | **One model. One finish. One decision left.** | The tricolon lands on the reader's own move and makes the Buy button the sentence's final word. |
| B | SB-01, from the line to you. | Current. Competent logistics romance, but "from X to you" is shipping-page grammar five brands could run. |
| C | The last checkpoint is yours. | Ties purchase to the QC narrative; clever, and a shade too cute for this register. |

---

## 3. Full copy deck

Keyed to `content/site.ts`. Strings marked KEEP are unchanged. Everything else is the authored replacement, final text.

### site (metadata)

```ts
name: "SABLE",                                    // KEEP
url: "https://sable-audio.example",               // KEEP (CONTENT-TODO 2)
title: "SABLE. Earphones, measured.",             // KEEP
description:
  "SABLE builds earphones and wearables the way a calibration lab would. Every unit is measured against reference within 0.5 dB, and its plot ships in the box.",
  // 156 chars, verified. Names scope, method, tolerance, and the proof object.
```

OG title and description inherit these via `app/layout.tsx`. No separate OG strings needed there.

### nav

```ts
links: [
  { index: "01", label: "SB-01", href: "#sb-01" },        // KEEP
  { index: "02", label: "Range", href: "#range" },        // KEEP
  { index: "03", label: "Calibration", href: "#calibration" }, // KEEP
  { index: "04", label: "Order", href: "#order" },        // KEEP
],
buyCompact: { label: "Buy SB-01", price: "$349", href: "#order" }, // KEEP
```

### hero

```ts
eyebrow: "SABLE INSTRUMENTS · CALIBRATED AUDIO",
  // "WIRELESS AUDIO" was the category's most generic pair of words.
  // "CALIBRATED AUDIO" is ownable and true to the page's method.
designation: "SB-01",                             // KEEP
claim: "Earphones, measured.",                    // KEEP
subclaim:
  "Every SB-01 leaves the line within 0.5 dB of reference. The plot ships in the box, tied to the serial on the shell.",
  // Adds the serial link so the hero, certificate note, and order panel
  // tell one continuous story about the same piece of paper.
readout: [
  { value: "42 dB",   note: "attenuation at 1 kHz, worn, seal plus loop" },
    // "worn ... on-head" said the wearing condition twice. "seal plus loop"
    // keeps the passive-plus-active framing in the readout itself.
  { value: "11.2 mm", note: "driver, sub-40 Hz without a vent" },
  { value: "6.1 g",   note: "per bud, mass 1.2 mm forward of the canal" },
    // Pulls the 1.2 mm figure up from the FIT row; same number, now the
    // readout argues judgment instead of gesturing at it.
  { value: "32 h",    note: "with case. 8 h sealed and cancelling" },  // KEEP
],
primaryCta: { label: "Buy SB-01", price: "$349", href: "#order" },    // KEEP
secondaryCta: { label: "See the range", href: "#range" },             // KEEP
```

### flagship

```ts
id: "sb-01",                                      // KEEP
seam: { index: "01", label: "FLAGSHIP" },         // KEEP
heading: "Five decisions, one earphone.",
intro:
  "Each one cost something. Each one is a number you can check against the plot in your box.",
rows: [
  {
    key: "ATTENUATION",                           // KEEP
    value: "42 dB",                               // KEEP
    part: "PARTS 01, 02 · MESH GRILLE, MIC ARRAY", // KEEP
    head: "Quiet you can verify",                 // KEEP
    body: "Six microphones close the loop every 19 microseconds. Worn attenuation at 1 kHz reaches 42 dB, passive seal plus active loop. The rating comes from production units pulled at random. A golden sample would flatter it, and we do not keep one.",
    // Ends on the vocabulary the calibration band pays off. The random-pull
    // rating and the per-unit response census remain two distinct processes.
  },
  {
    key: "DRIVER",                                // KEEP
    value: "11.2 mm",                             // KEEP
    part: "PART 04 · TITANIUM-COATED DIAPHRAGM, COPPER COIL", // KEEP
    head: "Sub-40 Hz, sealed",
    body: "Reaching below 40 Hz usually costs a bass vent, and a vent costs the seal. The 11.2 mm titanium-coated driver does it with displacement instead. Distortion holds under 0.08% at 94 dB SPL.",
    // The row now states the tradeoff before the escape from it. Decision,
    // then number, per the brief's decision-plus-number criterion.
  },
  {
    key: "FIT",                                   // KEEP
    value: "6.1 g",                               // KEEP
    part: "PARTS 03, 07 · SHELL HALVES, GLASS-FILLED NYLON", // KEEP
    head: "Weight the ear ignores",               // KEEP
    body: "Each bud weighs 6.1 grams, its mass set 1.2 mm forward of the canal axis so the seal carries the load. The outer face is a flat plate turned with concentric grooves, 0.2 mm apart. Under a thumb it reads like the face of a record. You find it without looking.",
    // The v3 identity cue lands here, as a fit decision rather than a
    // styling note: the grooves are the tactile landmark for the controls.
  },
  {
    key: "POWER",                                 // KEEP
    value: "32 h",                                // KEEP
    part: "PART 06 · 68 mAh CELL, STEEL CAN",     // KEEP
    head: "Two days between docks",               // KEEP
    body: "Eight hours sealed and cancelling, rated at 75 dB SPL rather than at a whisper. The case holds 24 more. Ten minutes on the dock returns two hours of playback.",
    // "rather than at a whisper" names the industry habit the rating refuses.
  },
  {
    key: "LINK",                                  // KEEP
    value: "19 ms",                               // KEEP
    part: "PART 05 · RADIO BOARD, BLUETOOTH 5.4", // KEEP
    head: "Close to the wire",                    // KEEP
    body: "Bluetooth 5.4 with LE Audio and LC3. Game mode holds latency at 19 ms. Two hosts stay connected at once and switch in under 80 ms.",
    // Tightened: "drops to" implied variance; "holds at" is the stronger
    // and more instrument-true verb.
  },
],
```

### range

```ts
id: "range",                                      // KEEP
seam: { index: "02", label: "RANGE" },            // KEEP
heading: "Four instruments. One discipline.",     // KEEP
intro:
  "Built to one tolerance on one rig. SB-01, SB-02 and SW-01 ship with calibration certificates.",
  // First clause earns the heading; second keeps the honest asymmetry
  // (the A-01 dock gets no certificate, and the copy does not pretend).
products: [
  {
    model: "SB-01",                               // KEEP
    name: "Wireless earphones",                   // KEEP
    sentence: "Reference-tuned earphones. Quiet that holds on a train.",
      // "in-ear monitors" was a second category name on a page that says
      // earphones everywhere else. The train stays; it is the best sensory
      // proof on the card.
    specs: ["IPX4 sealed", "Turned touch plate, 0.2 mm grooves", "Wear detect, skin sensor"],
      // Tip sizes move out (the order panel lists them); the identity cue
      // moves in, phrased as a spec because on this page it is one.
    price: "$349",                                // KEEP
    featured: true,                               // KEEP
    cta: { label: "Full specs", href: "#sb-01" }, // KEEP
  },
  {
    model: "SB-02",                               // KEEP
    name: "Over-ear headphones",                  // KEEP
    sentence: "The range-topping over-ear. Forty hours, folded aluminium, closed back.", // KEEP
      // Brief criterion: $549 framed as range-topping so "flagship SB-01"
      // reads as intent. Already exact. Keep.
    specs: ["48 dB attenuation at 1 kHz", "42 mm driver", "312 g"], // KEEP
    price: "$549",                                // KEEP
  },
  {
    model: "SW-01",                               // KEEP
    name: "Sensor band",                          // KEEP
    sentence: "Heart rate, rhythm and skin temperature. Fourteen days between charges.",
      // Two clean declaratives instead of one comma chain; "between charges"
      // agrees with the 14 day battery spec below it.
    specs: ["HR, HRV, skin temp", "14 day battery", "22 g"], // KEEP
    price: "$199",                                // KEEP
  },
  {
    model: "A-01",                                // KEEP
    name: "Charge dock",                          // KEEP
    sentence: "Two wells, one cable, machined from a single billet.", // KEEP
    specs: ["2 charge wells", "30 W USB-C", "410 g"], // KEEP
    price: "$79",                                 // KEEP
  },
],
certificateNote:
  "The plot in the box matches the serial on the shell. Keep it. It is the unit's only birth record.", // KEEP
  // The best-authored line already on the page. Do not touch it.
```

### calibration

```ts
id: "calibration",                                // KEEP
seam: { index: "03", label: "CALIBRATION" },      // KEEP
heading: "Every unit measured. No golden samples.", // KEEP
body:
  "Every unit runs its response against the reference rig before packing. The window is 0.5 dB from 20 Hz to 12 kHz. When a batch drifts, it stays in the building.",
  // One word added: "response". It pins the census to frequency response,
  // so it can never be read against the flagship's random-pull attenuation
  // rating. The closing sentence stays; it is the band's spine.
stats: [
  { value: "0.5 dB",   label: "tolerance window, 20 Hz to 12 kHz" },   // KEEP
  { value: "100%",     label: "of units measured before packing" },    // KEEP
  { value: "3 of 214", label: "batches held back this year" },         // KEEP
],
plot: {
  caption: "REFERENCE PLOT · UNIT 0847 · WITHIN 0.5 dB",               // KEEP
  axis: ["20 Hz", "100 Hz", "1 kHz", "12 kHz"],                        // KEEP
  band: "±0.5 dB",                                                     // KEEP
  alt: "Frequency response plot of unit 0847: the measured trace stays inside the half-decibel tolerance corridor from 20 hertz to 12 kilohertz", // KEEP
},
```

### order

```ts
id: "order",                                      // KEEP
seam: { index: "04", label: "ORDER" },            // KEEP
heading: "One model. One finish. One decision left.",
finish: "Graphite. The touch plate is turned, not stamped.",
  // The old line ("One finish. Graphite.") would duplicate the new heading.
  // This one carries the finish and the identity cue in nine words.
price: "$349",                                    // KEEP
inBox: [
  "SB-01 earphones",                              // KEEP
  "Charge case",                                  // KEEP
  "Four tip sizes, S to XL",                      // KEEP
  "USB-C cable, 1.2 m",                           // KEEP
  "The frequency response plot for your serial",
    // "Your unit's frequency response plot" was fine; this phrasing closes
    // the serial motif opened in the hero subclaim and certificate note.
],
shipping: "Ships in 5 business days. 30 day return, no restocking fee.", // KEEP
emailLabel: "EMAIL",
  // "EMAIL FOR CONFIRMATION" promised a confirmation that is never sent.
  // The label goes neutral; the disclosure below does the honest work.
emailPlaceholder: "you@example.com",              // KEEP
emailError: "That address does not parse.",
  // Instrument voice for the one error the page can throw. Specific enough
  // to act on, cold enough to belong here.
submit: { label: "Buy SB-01", price: "$349" },    // KEEP
disclosure: "Design study. Nothing is charged, sent, or stored.",
  // NEW KEY. Render as a mono caption directly beneath the submit button in
  // every phase, so the fiction is disclosed at the order point before the
  // click, not only after it. One component-line change in order.tsx.
success: "Logged. A real order would leave the line here.",
  // "Order noted for the study" was clerical. This names exactly what the
  // click would have set in motion, in the page's own line-and-rig language.
studyNote:
  "SABLE is a design study. No payment was taken and no email was sent or stored.",
  // Past tense after the action; adds "or stored", closing the last privacy
  // question the form could raise.
```

### footer

```ts
line: "SABLE is a fictional brand, built as a design study. Every number on this page is part of the fiction.",
  // The second sentence extends the disclosure to the specs themselves,
  // which is the honest version of a spec-led fake brand.
copyright: "© 2026 SABLE. A study, not a store.",
  // Sharper than "Measurements are part of the study", which the new footer
  // line now covers, and it restates the no-commerce fact in five words.
links: [                                          // KEEP all four
  { label: "SB-01", href: "#sb-01" },
  { label: "Range", href: "#range" },
  { label: "Calibration", href: "#calibration" },
  { label: "Order", href: "#order" },
],
```

### Strings hardcoded in components (bring into line, same pass)

`app/opengraph-image.tsx` (spec chips at the card's foot):

```
"42 dB attenuation, worn"   // REPLACES "-42 dB ANC", see kill list item 1
"11.2 mm driver"            // KEEP
"6.1 g per bud"             // KEEP
"32 h with case"            // KEEP
Eyebrow "SABLE INSTRUMENTS" // KEEP
Designation "SB-01" and claim "Earphones, measured." // KEEP
```

`components/sections/order.tsx` loading state:

```
"LOGGING"                   // KEEP. Correct instrument verb for a study
                            // that logs and does nothing else.
```

`app/not-found.tsx` (verified, keep as a set):

```
Eyebrow  "Signal lost"
H1       "404"
Body     "This address is outside the calibrated range. The instrument you want is on the main line."
CTA      "Back to SB-01"
```

`app/error.tsx` (verified, keep as a set):

```
Eyebrow  "Fault detected"
H1       "The instrument tripped."
Body     "Something failed on our side, not yours. A reset usually clears it."
CTAs     "Reset and retry" · "Back to SB-01"
```

### Alt text set (components)

```
hero.tsx, hero render:
  "SB-01 earphones above their open charge case, graphite, amber rim light"

order.tsx, panel render:
  "SB-01 earphones and charge case, graphite"        // KEEP

flagship.tsx, exploded render:
  "Exploded view of the SB-01 earbud: grille, mic array, shell halves, driver, radio board and cell separated along one axis"
  // Names the same parts the row index numbers, so screen reader and
  // sighted reader get the same catalog.

flagship.tsx, macro render:
  "Macro of the SB-01 touch plate: fine concentric machined grooves circling the mesh grille"
  // Written to the v3 identity. Lands with the CONTENT-TODO item 1 render
  // regeneration; until macro.png is regenerated it describes the intent,
  // ship them together.

range.tsx RENDERS map:
  SB-01: "SB-01 wireless earphones above their open charge case"   // KEEP
  SB-02: "SB-02 over-ear headphones, three-quarter view"           // KEEP
  SW-01: "SW-01 sensor band coiled in a loop"                      // KEEP
  A-01:  "A-01 charge dock with two recessed wells"                // KEEP
```

---

## 4. Kill list

Strings that must not survive this pass, with reasons.

1. `app/opengraph-image.tsx` chip `"-42 dB ANC"`. Reintroduces the bare negative-dB ANC framing the critic pass banned; every other mention on the site is worn attenuation, seal plus loop. The share card is the one surface most likely to travel alone, so it must carry the corrected framing.
2. `order.emailLabel` `"EMAIL FOR CONFIRMATION"`. Promises a confirmation email that is never sent; the last residue of the false-promise class the critic pass cleared.
3. `flagship.heading` `"Sealed. Silenced. Certified."`. Alliterative ad tricolon, the single place the page sounds like it is selling, and "Silenced" overclaims what 42 dB of attenuation delivers.
4. `flagship.intro` `"Five decisions carry the SB-01."`. Soft metaphor ("carry"), and the recommended heading now states the count, so the line would say it twice.
5. `hero.readout[0].note` `"worn attenuation at 1 kHz, on-head"`. "Worn" and "on-head" state the same condition twice; a page about measurement cannot afford a redundant condition in its own readout.
6. `hero.eyebrow` `"... WIRELESS AUDIO"`. The category's most generic pair of words; fails the logo-cover test on the page's first line.
7. `range` SB-01 sentence `"Reference-tuned in-ear monitors ..."`. Introduces a second category name on a page that says "earphones" in the hero, the meta description, the product name, and the order panel. One name per concept.
8. `order.heading` `"SB-01, from the line to you."`. Shipping-page grammar five brands could run; the section's real content is that only one decision remains.
9. `order.success` `"Order noted for the study."`. Clerical; it files the moment instead of honoring it. The replacement names what the click would have set in motion.
10. `order.finish` `"One finish. Graphite."`. Conditional kill: duplicates the recommended order heading's "One finish". Falls away automatically with the new heading; if the heading is not adopted, the line may stay.
11. `flagship.tsx` macro alt `"Macro detail of the SB-01 earbud mesh and machined ring"`. Describes the retired v2 domed shell; the v3 identity is the concentric touch plate, and the alt must move with it.
12. `footer.copyright` `"Measurements are part of the study."`. True but half-said; superseded by the new footer line, which extends the disclosure to every number explicitly.

---

## Integration notes (mechanical)

1. All `site.ts` keys above map one-to-one onto the existing structure; the only schema addition is `order.disclosure` (string), rendered beneath the submit button in all phases of `components/sections/order.tsx`.
2. Update the four hardcoded surfaces in the same commit: OG chips, flagship alt pair, hero alt, range SB-01 sentence and specs.
3. The macro alt ships with the CONTENT-TODO item 1 render regeneration; do not pair the v3 alt with the v2 image.
4. Verification: grep the diff for em dashes, exclamation marks, "ANC" outside the corrected chip, "confirmation", and "in-ear"; all five should return nothing.
