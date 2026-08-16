# CONTENT-TODO — SABLE

Items awaiting real content or a later pipeline phase. Nothing here blocks
the build; everything ships with a deliberate stand-in.

| # | Item | Stand-in today | Replace with |
|---|------|----------------|--------------|
| 1 | Product photography | DONE (v3.1): full set on one identity — hero, corrected-order exploded, grooved-plate macro, night scene, regraded SW-01/A-01 | Optional: scene-shot buds carry short stems (minor ID drift); regenerate in a future assets pass |
| 1b | Promo video | Scroll-driven story stands in (flagship band) | Optional short product film via `/atelier:assets` video generation; slot would sit between hero and flagship |
| 2 | Domain | `https://sable-audio.example` in `content/site.ts` | Real domain before deploy (feeds metadataBase, sitemap, robots) |
| 3 | OG image typeface | System sans in `app/opengraph-image.tsx` | Space Grotesk loaded as font data in the ImageResponse |
| 4 | Checkout | Client-side stub in `components/sections/order.tsx` (no network, no persistence; success copy says so) | Real commerce only if the brief ever changes; currently out of scope |
| 5 | Display-face test (DESIGN.md amendment 4) | Space Grotesk shipped | Verify designation vs Archivo Expanded / Instrument Sans at first render in the gauntlet; record outcome as a DESIGN.md amendment |
| 6 | Prices / specs | Invented, internally consistent (`content/site.ts`) | Client-real numbers if SABLE ever stops being fictional |

All copy is real (no lorem). The fiction is disclosed in the footer and at
the point of order.
