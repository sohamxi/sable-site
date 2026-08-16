"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { site } from "@/content/site";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/reveal";
import { ExplodedScrub } from "@/components/exploded-scrub";
import { LedValue } from "@/components/led-value";
import { EASE_LUXE } from "@/lib/motion";

/* THE signature moment (DESIGN.md §9, v2): an Apple-register scroll
   story. The exploded SB-01 stays pinned under a warm glow with a
   progress rail while the five engineering decisions step past it,
   each waking as it reaches the center of the viewport. */
export function Flagship() {
  const c = site.flagship;
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const railScale = useScroll({
    target: ref,
    offset: ["start center", "end end"],
  }).scrollYProgress;

  return (
    <Section id={c.id} seam={c.seam} size="catalog" ref={ref}>
      <Container>
        <div className="max-w-[52rem]">
          <Reveal>
            <h2 className="font-display text-step-5 leading-[1.02] font-medium tracking-[-0.02em]">
              {c.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-5 max-w-[46ch] text-step-0 leading-[1.6] text-secondary">
              {c.intro}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-6">
          {/* Pinned exploded view */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-20 flex h-[min(44rem,calc(100vh-6rem))] items-center">
              {/* progress rail */}
              <div
                aria-hidden
                className="absolute top-[8%] left-0 h-[84%] w-px bg-line"
              >
                <motion.div
                  style={{ scaleY: reduced ? 1 : railScale }}
                  className="h-full w-px origin-top bg-n-100"
                />
              </div>
              <div className="relative mx-auto">
                <div aria-hidden className="glow-warm absolute -inset-14" />
                <motion.div style={reduced ? undefined : { y: imgY }}>
                  <ExplodedScrub
                    progress={scrollYProgress}
                    className="relative mx-auto h-[min(40rem,calc(100vh-10rem))]"
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Mobile exploded view, unpinned */}
          <div className="relative lg:hidden">
            <div aria-hidden className="glow-warm absolute -inset-4" />
            <Image
              src={(process.env.NEXT_PUBLIC_BASE_PATH ?? "") + "/renders/exploded.png"}
              alt="Exploded view of the SB-01 earbud: grille, mic array, shell halves, driver, radio board and cell separated along one axis"
              width={1536}
              height={2688}
              sizes="88vw"
              className="relative mx-auto max-h-[34rem] w-auto object-contain"
            />
          </div>

          {/* Decision steps */}
          <div className="lg:col-span-6 lg:col-start-7">
            {c.rows.map((row, i) => (
              <motion.div
                key={row.key}
                initial={reduced ? undefined : { opacity: 0.28 }}
                whileInView={{ opacity: 1 }}
                viewport={{ amount: 0.55, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 0.5, ease: EASE_LUXE }}
                className="flex min-h-[20rem] flex-col justify-center border-t border-line py-12 first:border-t-0 lg:min-h-[26rem]"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-step-n1 tracking-[0.2em] text-tertiary uppercase">
                    {String(i + 1).padStart(2, "0")} · {row.key}
                  </span>
                </div>
                <div className="tnum mt-4 font-led text-step-5 leading-none text-ink">
                  <LedValue>{row.value}</LedValue>
                </div>
                <div className="mt-3 font-mono text-[0.7rem] tracking-[0.14em] text-tertiary uppercase">
                  {row.part}
                </div>
                <h3 className="mt-5 font-display text-step-2 leading-[1.1] font-medium tracking-[-0.01em]">
                  {row.head}
                </h3>
                <p className="mt-3 max-w-[50ch] text-step-0 leading-[1.65] text-secondary">
                  {row.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Closing shot */}
        <Reveal className="mt-20">
          <figure className="relative overflow-hidden rounded-lg border border-line">
            <Image
              src={(process.env.NEXT_PUBLIC_BASE_PATH ?? "") + "/renders/macro.png"}
              alt="Macro of the SB-01 touch plate: fine concentric machined grooves circling the mesh grille"
              width={2432}
              height={1792}
              sizes="(max-width: 1024px) 92vw, 1200px"
              className="max-h-[42rem] w-full object-cover"
            />
            <figcaption className="absolute bottom-4 left-5 font-mono text-[0.72rem] tracking-[0.18em] text-n-200/90 uppercase">
              Sealed unit · production sample 0847
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </Section>
  );
}
