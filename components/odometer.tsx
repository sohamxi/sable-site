"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_MECH } from "@/lib/motion";

/* THE signature motion moment (exactly one per page, DESIGN.md §9):
   the hero designation's digits tick into place once on load,
   odometer-style. Letters rise in; digits roll a short column.
   Under reduced motion the designation renders static. */

const ROLL = 5; // glyphs each digit rolls through before settling

function digitColumn(target: number): number[] {
  const seq: number[] = [];
  for (let i = 0; i <= ROLL; i++) seq.push((target - ROLL + i + 20) % 10);
  return seq;
}

export function Odometer({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline-flex leading-none">
        {text.split("").map((ch, i) => {
          const isDigit = /\d/.test(ch);
          if (!isDigit) {
            return (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: "0.25em" }}
                animate={{ opacity: 1, y: "0em" }}
                transition={{
                  duration: 0.3,
                  delay: i * 0.06,
                  ease: EASE_MECH,
                }}
              >
                {ch}
              </motion.span>
            );
          }
          const col = digitColumn(Number(ch));
          return (
            <span
              key={i}
              className="inline-block h-[1em] overflow-hidden align-baseline"
            >
              <motion.span
                className="inline-flex flex-col"
                initial={{ y: "0em" }}
                animate={{ y: `-${ROLL}em` }}
                transition={{
                  duration: 0.6,
                  delay: 0.12 + i * 0.06,
                  ease: EASE_MECH,
                }}
              >
                {col.map((d, j) => (
                  <span key={j} className="block h-[1em] leading-none">
                    {d}
                  </span>
                ))}
              </motion.span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
