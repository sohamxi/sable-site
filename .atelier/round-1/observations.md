# Round 1 — Observations (before scoring)

1. **First thing the eye lands on:** desktop fold — the monumental light "SB-01" designation, then the warm-lit render right. That is the intended order. On tablet the designation dominates and the render sits below the CTAs; also correct.
2. **Where the layout breaks the centered stack:** hero (asymmetric split, left-anchored designation + right render + full-width LED readout strip); flagship (pinned exploded column + stepped rows); range (2-1-1 span rhythm with horizontal featured card); calibration (6/4 split on the inverse band). Four sections break it.
3. **Generic-template section:** none reads as template in the section shots; the order panel is the most conventional (summary card + form) but the render cap and LED labels keep it branded.
4. **Spacing wrong:** flagship rows at `min-h-[52svh]` balloon in full-page capture (document inflates to 16k px) and read over-tall even at 1440; the gap between the range seam and the cards is fine, but the space between flagship's last row and the macro shot is tight relative to the row rhythm.
5. **Mobile:** designed-for-mobile, not squeezed — designation scales, readout stacks 2-up, buy above readout. But 7 touch targets under 44px (footer links, spec links) and glow divs push 8px of horizontal overflow.
6. **Section a designer would post:** the flagship scroll story frame (exploded render + LED value + progress rail). That is the screenshot.

**Capture-honesty finding:** below-fold sections (range, calibration, order) appear as voids in `desktop--full.png` — whileInView reveals caught at opacity 0 during full-page viewport expansion. Real scrolling shows them; captures and juries do not. Fix: fixed rem heights instead of svh in the story rows, and a settle wait before full-page shots.
