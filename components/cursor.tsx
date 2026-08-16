"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";

const INTERACTIVE =
  'a, button, [role="button"], input[type="submit"], summary, [data-cursor]';

export function Cursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);
  const [down, setDown] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const dotX = useSpring(x, { stiffness: 1400, damping: 60, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 1400, damping: 60, mass: 0.2 });
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const sync = () => setEnabled(fine.matches);
    sync();
    fine.addEventListener("change", sync);
    return () => fine.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    /* Own the native cursor from inside the effect so an unmount
       always restores it (signature-effects hard rule 2). */
    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { cursor: none !important; }
      input, textarea, [contenteditable="true"] { cursor: text !important; }
    `;
    document.head.appendChild(style);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as Element)?.closest?.(
        INTERACTIVE,
      ) as HTMLElement | null;
      setHot(Boolean(el));
      setLabel(el?.dataset?.cursor ?? null);
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    const onLeave = () => {
      x.set(-100);
      y.set(-100);
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      style.remove();
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ringScale = label ? 2.4 : hot ? 1.6 : down ? 0.85 : 1;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-70">
      <motion.div
        style={{ x: reduced ? x : ringX, y: reduced ? y : ringY }}
        className="absolute -mt-5 -ml-5 grid h-10 w-10 place-items-center rounded-full border border-n-100/30"
        animate={{ scale: ringScale, opacity: hot || label ? 1 : 0.55 }}
        transition={{ type: "spring", stiffness: 340, damping: 28 }}
      >
        {label && (
          <span className="font-mono text-[9px] tracking-[0.18em] text-ink uppercase">
            {label}
          </span>
        )}
      </motion.div>

      <motion.div
        style={{ x: reduced ? x : dotX, y: reduced ? y : dotY }}
        className="absolute -mt-[3px] -ml-[3px] h-1.5 w-1.5 rounded-full bg-n-100"
        animate={{ scale: hot ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </div>
  );
}
