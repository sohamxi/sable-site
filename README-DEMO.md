# SABLE — Demo Guide

A fictional premium audio brand, built as a design study. Dark graphite,
one amber accent, LED instrument type, scroll-driven exploded view.

## Fastest demo (no install)

The `out/` folder is a fully static build. Serve it with anything:

```bash
npx serve out
```

or

```bash
python3 -m http.server 8080 -d out
```

Then open http://localhost:8080 (or the port serve prints). Everything
works — animations, the exploded scrub, the rack, the plot draw.
Do not open `out/index.html` via file:// — module scripts need a server.

## Full dev server (for editing)

```bash
bun install
bun run dev
```

Opens on http://localhost:3000 (or pass `-p 3210`). `npm install` /
`npm run dev` works too. `node_modules` is not in this zip; install once.

## Rebuilding the static demo after edits

Add these two lines to `next.config.ts`, run `bun run build`, then remove
them again (the repo ships without them so dev keeps image optimization):

```ts
output: "export",
images: { unoptimized: true },
```

## What to show in a demo (60 seconds)

1. Hero: the odometer designation ticking in, LED readout flicker.
2. Scroll slowly through **01 Flagship**: the exploded earbud assembles,
   then pulls apart as the decisions step past it.
3. **02 Range**: hover across the four panels — the rack expands/collapses.
4. **03 Calibration**: the bone band; the L/R deviation traces draw
   themselves through the amber tolerance corridor.
5. The night-scene band, then **04 Order**: submit any email — LOGGING →
   the honest design-study disclosure.

## Docs in this folder

- `BRIEF.md` — the locked brief and acceptance criteria (with amendments)
- `DESIGN.md` — the full design contract and dated decision log
- `.atelier/brand-spec.md` — the Index Plate identity system
- `.atelier/content-deck.md` — the authored copy deck
- `CONTENT-TODO.md` — honest list of stand-ins and known nits

SABLE is fictional; every number is part of the fiction, and the page
says so at the order point and footer.
