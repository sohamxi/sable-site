"use client";

import { motion, useReducedMotion } from "motion/react";
import { REVEAL, STAGGER } from "@/lib/motion";

/* Cinematic entrance: rise + soft focus pull. Collapses to a plain
   fade under reduced motion (blur and transform both dropped). */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={REVEAL.viewport}
        transition={{ duration: 0.3, delay }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ ...REVEAL.initial, filter: "blur(10px)" }}
      whileInView={{ ...REVEAL.whileInView, filter: "blur(0px)" }}
      viewport={REVEAL.viewport}
      transition={{ ...REVEAL.transition, delay }}
    >
      {children}
    </motion.div>
  );
}

export function RevealStagger({
  children,
  className,
  step = STAGGER,
}: {
  children: React.ReactNode[];
  className?: string;
  step?: number;
}) {
  return (
    <>
      {children.map((child, i) => (
        <Reveal key={i} delay={i * step} className={className}>
          {child}
        </Reveal>
      ))}
    </>
  );
}
