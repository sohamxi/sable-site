"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const FRAMES = 126;
const frameSrc = (i: number) =>
  `${BASE}/calibration/frame-${String(i + 1).padStart(3, "0")}.jpg`;

/* Chapter ranges track the four shots in the master sequence:
   the fit, the signal, the noise, the quiet. */
const CHAPTERS = [
  {
    index: "01",
    label: "THE FIT",
    line: "Seated once, then forgotten.",
    stat: "6.1 g",
    note: "per bud, mass 1.2 mm forward of the canal",
    at: [0.0, 0.22] as const,
  },
  {
    index: "02",
    label: "THE SIGNAL",
    line: "Sub-40 Hz, sealed, without a vent.",
    stat: "11.2 mm",
    note: "titanium-coated driver",
    at: [0.22, 0.43] as const,
  },
  {
    index: "03",
    label: "THE NOISE",
    line: "Bengaluru at six in the evening.",
    stat: "19 µs",
    note: "six microphones close the loop this often",
    at: [0.43, 0.78] as const,
  },
  {
    index: "04",
    label: "THE QUIET",
    line: "Then most of it is simply gone.",
    stat: "42 dB",
    note: "attenuation at 1 kHz, worn",
    at: [0.78, 0.94] as const,
  },
];

function useChapterOpacity(p: MotionValue<number>, at: readonly [number, number]) {
  const [s, e] = at;
  const fade = 0.035;
  return useTransform(p, [s - fade, s + fade, e - fade, e + fade], [0, 1, 1, 0], {
    clamp: true,
  });
}

/**
 * The product journey, performed by scrolling: a 126-frame scrub of four
 * crossfaded shots (the bud seating, the signal travelling the canal, a
 * Bengaluru hyperlapse for the cancelling loop, and a dolly-zoom resolve),
 * chaptered in copy and landing on the product card.
 * Reduced motion / no JS: the resolve frame plus the full card, static.
 */
export function CalibrationScrub({
  price,
  buyHref,
}: {
  price: string;
  buyHref: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start start", "end end"],
  });

  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  /* Footage dims and the card assembles over the last sixth. */
  const scrimOpacity = useTransform(scrollYProgress, [0.82, 0.95], [0, 0.72], { clamp: true });
  const cardOpacity = useTransform(scrollYProgress, [0.86, 0.95], [0, 1], { clamp: true });
  const cardY = useTransform(scrollYProgress, [0.86, 0.97], [40, 0], { clamp: true });

  const o1 = useChapterOpacity(scrollYProgress, CHAPTERS[0].at);
  const o2 = useChapterOpacity(scrollYProgress, CHAPTERS[1].at);
  const o3 = useChapterOpacity(scrollYProgress, CHAPTERS[2].at);
  const o4 = useChapterOpacity(scrollYProgress, CHAPTERS[3].at);
  const opacities = [o1, o2, o3, o4];

  useEffect(() => {
    if (reduced) {
      const img = new Image();
      img.onload = () => {
        images.current[0] = img;
        setReady(true);
        draw(0);
      };
      img.src = frameSrc(FRAMES - 6);
      return;
    }
    const list: HTMLImageElement[] = [];
    let first = true;
    for (let i = 0; i < FRAMES; i++) {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        if (first) {
          first = false;
          setReady(true);
          draw(0);
        }
      };
      img.src = frameSrc(i);
      list.push(img);
    }
    images.current = list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  function draw(index: number) {
    const c = canvas.current;
    const img = images.current[index] ?? images.current[0];
    if (!c || !img || !img.complete || img.naturalWidth === 0) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = c.clientWidth;
    const h = c.clientHeight;
    if (c.width !== w * dpr || c.height !== h * dpr) {
      c.width = w * dpr;
      c.height = h * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
  }

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (reduced) return;
    const i = Math.min(FRAMES - 1, Math.max(0, Math.round(p * (FRAMES - 1))));
    draw(i);
  });

  useEffect(() => {
    const onResize = () => draw(0);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div ref={wrap} className="relative mt-16 h-[520vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <canvas ref={canvas} aria-hidden className="absolute inset-0 h-full w-full" />
        {!ready && <div className="absolute inset-0 bg-surface" aria-hidden />}

        {/* grounding vignette so copy always has contrast */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(14,15,17,0.92)_0%,rgba(14,15,17,0.35)_38%,transparent_70%)]"
        />
        <motion.div
          aria-hidden
          className="absolute inset-0 bg-canvas"
          style={reduced ? { opacity: 0.72 } : { opacity: scrimOpacity }}
        />

        {/* chapter copy */}
        {!reduced && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0">
            <div className="mx-auto w-full max-w-[1200px] px-6 pb-16 lg:px-8 lg:pb-20">
              <div className="relative h-[8.5rem] sm:h-[7.5rem]">
                {CHAPTERS.map((ch, i) => (
                  <motion.div
                    key={ch.index}
                    className="absolute inset-x-0 bottom-0"
                    style={{ opacity: opacities[i] }}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-led text-step-0 text-accent">{ch.index}</span>
                      <span className="font-mono text-step-n1 tracking-[0.2em] text-ink/60 uppercase">
                        {ch.label}
                      </span>
                    </div>
                    <p className="mt-3 max-w-[24ch] font-display text-step-3 leading-[1.06] font-medium tracking-[-0.02em] text-ink">
                      {ch.line}
                    </p>
                    <p className="mt-3 font-mono text-step-n1 tracking-[0.1em] text-ink/55 uppercase">
                      <span className="text-accent">{ch.stat}</span> · {ch.note}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* the resolve: product card */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-6"
          style={
            reduced
              ? undefined
              : { opacity: cardOpacity, y: cardY, pointerEvents: "none" }
          }
        >
          <div className="w-full max-w-[560px] border border-line-strong bg-raised/80 p-7 backdrop-blur-md lg:p-9">
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-mono text-step-n1 tracking-[0.2em] text-ink/55 uppercase">
                SB-01
              </span>
              <span className="font-led text-step-1 leading-none text-accent">{price}</span>
            </div>
            <p className="mt-5 font-display text-step-3 leading-[1.05] font-medium tracking-[-0.02em] text-ink">
              Earphones, measured.
            </p>
            <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5">
              {[
                ["42 dB", "attenuation at 1 kHz, worn"],
                ["11.2 mm", "driver, sub-40 Hz"],
                ["6.1 g", "per bud"],
                ["32 h", "with case"],
              ].map(([v, n]) => (
                <div key={v} className="border-t border-line pt-3">
                  <dd className="tnum font-led text-step-1 leading-none text-ink">{v}</dd>
                  <dt className="mt-1.5 font-mono text-[0.7rem] tracking-[0.08em] text-ink/50 uppercase">
                    {n}
                  </dt>
                </div>
              ))}
            </dl>
            <a
              href={buyHref}
              className="pointer-events-auto mt-8 flex h-12 w-full items-center justify-center rounded-full bg-accent font-medium text-accent-fg transition-colors duration-300 hover:bg-accent-hover"
            >
              Buy SB-01 {price}
            </a>
          </div>
        </motion.div>

        {/* journey rail */}
        {!reduced && (
          <div aria-hidden className="absolute inset-x-0 bottom-0">
            <div className="relative mx-auto w-full max-w-[1200px] px-6 lg:px-8">
              <div className="relative h-px w-full bg-line-strong">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-accent"
                  style={{ scaleX: railScale, transformOrigin: "left" }}
                />
                {CHAPTERS.map((ch) => (
                  <span
                    key={ch.index}
                    className="absolute -top-1 h-2 w-px bg-line-strong"
                    style={{ left: `${ch.at[0] * 100}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
