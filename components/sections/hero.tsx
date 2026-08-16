"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Odometer } from "@/components/odometer";
import { Magnetic } from "@/components/magnetic";
import { Reveal } from "@/components/reveal";
import { LedValue } from "@/components/led-value";

/* v2 hero: cinematic split. Monumental light-weight designation left,
   floating product render right under a warm glow, LED readout strip
   across the base. The render drifts slower than the page (parallax). */
export function Hero() {
  const c = site.hero;
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-svh flex-col justify-center overflow-x-clip"
    >
      <div aria-hidden className="grid-texture absolute inset-0" />

      <Container className="relative pt-24 pb-14 lg:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-6">
          <motion.div
            style={reduced ? undefined : { y: textY }}
            className="lg:col-span-7"
          >
            <Reveal>
              <p className="font-mono text-step-n1 tracking-[0.25em] text-tertiary uppercase">
                {c.eyebrow}
              </p>
            </Reveal>

            <h1 className="mt-6 font-display text-step-7 leading-[0.9] font-light tracking-[-0.02em] lg:mt-8 xl:text-step-8">
              <Odometer
                text={c.designation}
                className="tnum block whitespace-nowrap"
              />
              <span className="sr-only">{c.claim}</span>
            </h1>

            <Reveal delay={0.5}>
              <p
                aria-hidden
                className="mt-6 font-display text-step-3 leading-[1.05] font-medium tracking-[-0.02em]"
              >
                {c.claim}
              </p>
            </Reveal>
            <Reveal delay={0.56}>
              <p className="mt-5 max-w-[42ch] text-step-0 leading-[1.6] text-secondary">
                {c.subclaim}
              </p>
            </Reveal>

            <Reveal delay={0.64}>
              <div className="mt-8 flex flex-wrap items-center gap-4 lg:mt-10">
                <Magnetic>
                  <Button
                    href={c.primaryCta.href}
                    variant="primary"
                    data-cursor="BUY"
                  >
                    {c.primaryCta.label}
                    <span className="tnum font-mono text-[0.9em]">
                      {c.primaryCta.price}
                    </span>
                  </Button>
                </Magnetic>
                <Button href={c.secondaryCta.href} variant="ghost">
                  {c.secondaryCta.label}
                </Button>
              </div>
            </Reveal>
          </motion.div>

          {/* Floating render under a warm glow */}
          <div className="relative lg:col-span-5">
            <div
              aria-hidden
              className="glow-warm absolute -inset-4 lg:-inset-16"
            />
            <motion.div
              style={reduced ? undefined : { y: imgY }}
              className="relative"
            >
              <Reveal delay={0.2}>
                <Image
                  src="/renders/hero.png"
                  alt="SB-01 earphones above their open charge case, graphite, amber rim light"
                  width={1792}
                  height={2304}
                  priority
                  sizes="(max-width: 1024px) 88vw, 40vw"
                  className="mx-auto w-full max-w-[19rem] rounded-lg sm:max-w-[26rem] lg:max-w-none"
                />
              </Reveal>
            </motion.div>
          </div>
        </div>

        {/* LED production readout strip */}
        <Reveal delay={0.7}>
          <div className="mt-12 lg:mt-16">
            <div aria-hidden className="hairline-fade h-px w-full" />
            <ul className="grid grid-cols-2 gap-x-8 lg:grid-cols-4">
              {c.readout.map((row, i) => (
                <li
                  key={row.value}
                  className="border-line py-5 lg:border-r lg:pr-6 lg:last:border-r-0"
                >
                  <span className="tnum block font-led text-step-3 leading-none text-ink">
                    <LedValue delay={0.75 + i * 0.09}>{row.value}</LedValue>
                  </span>
                  <span className="mt-2 block font-mono text-[0.72rem] leading-[1.5] tracking-[0.04em] text-tertiary">
                    {row.note}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
