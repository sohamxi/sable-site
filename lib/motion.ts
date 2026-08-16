/* Motion constants (DESIGN.md §9, v2 amendment). Register:
   choreographed-cinematic for entrances, mechanical for micro
   interactions. One signature moment: the flagship scroll story. */

export const EASE_MECH: [number, number, number, number] = [0.2, 0, 0, 1];
export const EASE_LUXE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const DUR = {
  fast: 0.15,
  base: 0.24,
  slow: 0.7,
} as const;

export const STAGGER = 0.07;

export const REVEAL = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-12% 0px" as const },
  transition: { duration: DUR.slow, ease: EASE_LUXE },
} as const;
