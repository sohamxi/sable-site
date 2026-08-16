"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { site, type Product } from "@/content/site";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";
import { EASE_LUXE } from "@/lib/motion";

const RENDERS: Record<
  string,
  { src: string; width: number; height: number; alt: string }
> = {
  "SB-01": {
    src: "/renders/hero.png",
    width: 1792,
    height: 2304,
    alt: "SB-01 wireless earphones above their open charge case",
  },
  "SB-02": {
    src: "/renders/sb02.png",
    width: 1024,
    height: 1024,
    alt: "SB-02 over-ear headphones, three-quarter view",
  },
  "SW-01": {
    src: "/renders/sw01.png",
    width: 1024,
    height: 1024,
    alt: "SW-01 sensor band coiled in a loop",
  },
  "A-01": {
    src: "/renders/a01.png",
    width: 1024,
    height: 1024,
    alt: "A-01 charge dock with two recessed wells",
  },
};

function PanelDetails({
  product,
  visible,
}: {
  product: Product;
  visible: boolean;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.45, ease: EASE_LUXE, delay: 0.12 }}
          className="absolute inset-x-0 bottom-0 p-6 lg:p-8"
        >
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-display text-step-1 leading-[1.1] font-medium tracking-[-0.01em]">
              {product.name}
            </span>
            <span className="tnum font-mono text-step-0 text-ink">
              {product.price}
            </span>
          </div>
          <p className="mt-2 max-w-[38ch] text-step-n1 leading-[1.55] text-secondary lg:text-step-0">
            {product.sentence}
          </p>
          <ul className="mt-4 hidden max-w-[30rem] border-t border-line lg:block">
            {product.specs.map((spec) => (
              <li
                key={spec}
                className="tnum border-b border-line py-2 font-mono text-step-n1 tracking-[0.02em] text-tertiary"
              >
                {spec}
              </li>
            ))}
          </ul>
          {"cta" in product && product.cta && (
            <a
              href={product.cta.href}
              data-cursor="SPECS"
              className="mt-4 inline-flex min-h-11 items-center font-mono text-step-n1 tracking-[0.1em] text-ink uppercase underline decoration-n-100/40 decoration-1 underline-offset-4 transition-colors duration-150 hover:decoration-n-100"
            >
              {product.cta.label} →
            </a>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* The rack (v3, principal request): one row of four instruments. The
   active panel expands while its neighbours compress; moving along the
   rack collapses the previous panel as the next one opens. Hover and
   keyboard focus drive it on desktop; taps toggle on mobile. */
export function Range() {
  const c = site.range;
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  return (
    <Section id={c.id} seam={c.seam} size="catalog">
      <Container>
        <Reveal>
          <h2 className="font-display text-step-5 leading-[1.02] font-medium tracking-[-0.02em]">
            {c.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-4 max-w-[42ch] text-step-0 leading-[1.6] text-secondary">
            {c.intro}
          </p>
        </Reveal>

        {/* Desktop rack */}
        <Reveal className="mt-12 hidden lg:block">
          <div
            className="flex h-[38rem] gap-3"
            onMouseLeave={() => setActive(0)}
          >
            {c.products.map((product, i) => {
              const render = RENDERS[product.model];
              const open = active === i;
              return (
                <button
                  key={product.model}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-expanded={open}
                  aria-label={`${product.model} ${product.name}`}
                  className={cn(
                    "group relative min-w-0 cursor-pointer overflow-hidden rounded-lg border text-left",
                    "transition-[flex-grow,border-color] duration-700 ease-luxe",
                    open
                      ? "border-line-strong"
                      : "border-line hover:border-line-strong",
                  )}
                  style={{
                    flexGrow: reduced ? 1 : open ? 3.2 : 1,
                    flexBasis: 0,
                  }}
                >
                  <Image
                    src={render.src}
                    alt={render.alt}
                    width={render.width}
                    height={render.height}
                    sizes="(max-width: 1024px) 92vw, 60vw"
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover transition-[transform,opacity] duration-700 ease-luxe",
                      open
                        ? "scale-100 opacity-100"
                        : "scale-[1.06] opacity-60 group-hover:opacity-80",
                    )}
                  />
                  <div
                    aria-hidden
                    className={cn(
                      "absolute inset-0 bg-linear-to-t transition-opacity duration-700",
                      open
                        ? "from-canvas/85 via-canvas/20 to-transparent opacity-100"
                        : "from-canvas/70 to-transparent opacity-90",
                    )}
                  />
                  <span className="tnum absolute top-5 left-5 font-led text-step-1 text-n-100/90">
                    {product.model}
                  </span>
                  {/* Collapsed label */}
                  <span
                    className={cn(
                      "absolute bottom-6 left-5 font-mono text-step-n1 tracking-[0.14em] text-secondary uppercase transition-opacity duration-300",
                      open ? "opacity-0" : "opacity-100",
                    )}
                  >
                    {product.name}
                    <span className="tnum mt-1 block text-tertiary">
                      {product.price}
                    </span>
                  </span>
                  <PanelDetails product={product} visible={open && !reduced} />
                  {reduced && (
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <span className="font-display text-step-1 font-medium">
                        {product.name}
                      </span>
                      <span className="tnum ml-3 font-mono text-step-0">
                        {product.price}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Mobile accordion */}
        <div className="mt-10 flex flex-col gap-3 lg:hidden">
          {c.products.map((product, i) => {
            const render = RENDERS[product.model];
            const open = active === i;
            return (
              <Reveal key={product.model} delay={i * 0.05}>
                <button
                  type="button"
                  onClick={() => setActive(open ? -1 : i)}
                  aria-expanded={open}
                  className={cn(
                    "relative block w-full overflow-hidden rounded-lg border text-left transition-[height,border-color] duration-500 ease-luxe",
                    open ? "h-[26rem] border-line-strong" : "h-24 border-line",
                  )}
                >
                  <Image
                    src={render.src}
                    alt={render.alt}
                    width={render.width}
                    height={render.height}
                    sizes="92vw"
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
                      open ? "opacity-100" : "opacity-45",
                    )}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-linear-to-t from-canvas/85 via-canvas/25 to-transparent"
                  />
                  <span className="tnum absolute top-4 left-4 font-led text-step-1 text-n-100/90">
                    {product.model}
                  </span>
                  {!open && (
                    <span className="absolute right-4 bottom-4 left-24 flex items-baseline justify-between font-mono text-step-n1 tracking-[0.1em] text-secondary uppercase">
                      {product.name}
                      <span className="tnum">{product.price}</span>
                    </span>
                  )}
                  <PanelDetails product={product} visible={open} />
                </button>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-8 max-w-[52ch] border-l-2 border-line-strong pl-6 font-mono text-step-n1 leading-[1.7] tracking-[0.02em] text-tertiary lg:mt-10 lg:text-step-0">
          {c.certificateNote}
        </p>
      </Container>
    </Section>
  );
}
