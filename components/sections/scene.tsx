"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { site } from "@/content/site";

/* Field-conditions interlude: one full-bleed cinematic frame between
   the calibration band and the order panel. The image drifts slower
   than the page (parallax) inside a clipped viewport-height window. */
export function Scene() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={ref}
      aria-label={site.scene.alt}
      className="relative h-[64svh] overflow-hidden lg:h-[78svh]"
    >
      <motion.div
        style={reduced ? undefined : { y }}
        className="absolute inset-0 -top-[10%] -bottom-[10%]"
      >
        <Image
          src={(process.env.NEXT_PUBLIC_BASE_PATH ?? "") + "/renders/scene.png"}
          alt={site.scene.alt}
          width={2688}
          height={1536}
          sizes="100vw"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-canvas to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-canvas to-transparent"
      />
      <p className="absolute bottom-8 left-6 font-mono text-step-n1 tracking-[0.18em] text-n-200/90 uppercase lg:left-12">
        {site.scene.caption}
      </p>
    </section>
  );
}
