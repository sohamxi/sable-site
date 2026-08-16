"use client";

import { motion, useReducedMotion } from "motion/react";

/* Instrument turn-on: LED values flicker to life once when they enter
   view, like a meter powering up. Part of the choreography system, not
   a competing signature moment. */
export function LedValue({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: [0, 1, 0.25, 1, 0.6, 1] }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.5,
        delay,
        times: [0, 0.2, 0.35, 0.55, 0.7, 1],
        ease: "linear",
      }}
    >
      {children}
    </motion.span>
  );
}
