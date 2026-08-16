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
    /* No micro sign here: CSS uppercase renders it as a capital Mu. */
    stat: "6 mics",
    note: "closing the loop every 19 microseconds",
    at: [0.43, 0.78] as const,
  },
  {
    index: "04",
    label: "THE QUIET",
    line: "Then he takes it out.",
    stat: "42 dB",
    note: "attenuation at 1 kHz, worn",
    at: [0.78, 0.92] as const,
  },
];

const SPECS: [string, string][] = [
  ["42 dB", "attenuation at 1 kHz, worn"],
  ["11.2 mm", "driver, sub-40 Hz"],
  ["6.1 g", "per bud"],
  ["32 h", "with case"],
];

/* Each chapter clears the frame before the next arrives: the windows sit
   strictly inside the chapter's own range, so two lines never share the
   same space and print over each other.
   Offsets must also stay inside 0..1 and never decrease — Motion compiles
   these into Web Animations keyframes, and one out-of-range value throws
   during hydration and takes the whole tree with it. */
function useChapterOpacity(p: MotionValue<number>, at: readonly [number, number]) {
  const [s, e] = at;
  const pts = [s + 0.005, s + 0.05, e - 0.05, e - 0.005].map((v) =>
    Math.min(1, Math.max(0, v)),
  );
  for (let i = 1; i < pts.length; i++) {
    if (pts[i] < pts[i - 1]) pts[i] = pts[i - 1];
  }
  return useTransform(p, pts, [0, 1, 1, 0], { clamp: true });
}

/**
 * The product journey, performed by scrolling: a 126-frame scrub of four
 * crossfaded shots (he seats the bud, the signal travels the canal, a
 * Bengaluru hyperlapse for the cancelling loop, then he takes it out),
 * chaptered in copy. On resolve the footage does not sit behind a card:
 * it is clipped down into the card's own media window, and the spec panel
 * grows directly beneath it, so the film becomes the product card.
 * Reduced motion / no JS: the resolved layout, static.
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

  /* The resolve is latched by an observer rather than mapped from scroll
     progress: past progress 1 the scroll-linked values drop back to their
     start, which blanked the card while it was still on screen. */
  const [resolved, setResolved] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setResolved(entry.isIntersecting || entry.boundingClientRect.top < 0);
      },
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

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
      img.src = frameSrc(FRAMES - 4);
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

  const shown = reduced || resolved;

  return (
    <div ref={wrap} className="sable-journey relative mt-16 h-[520vh]">
      {/* Trips the resolve as the last shot lands. */}
      <div ref={sentinel} aria-hidden className="absolute top-[94%] h-px w-full" />
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* The film. On resolve it is clipped into the card's media window
            rather than being covered by a floating panel. */}
        <div
          className={`absolute inset-0 transition-[clip-path] duration-[900ms] ease-[var(--ease-luxe)] ${
            shown ? "journey-clipped" : ""
          }`}
        >
          <canvas ref={canvas} aria-hidden className="h-full w-full" />
          {!ready && <div className="absolute inset-0 bg-surface" aria-hidden />}
        </div>

        {/* grounding vignette, retired once the card forms */}
        <div
          aria-hidden
          className={`absolute inset-0 bg-[linear-gradient(to_top,rgba(14,15,17,0.92)_0%,rgba(14,15,17,0.35)_38%,transparent_70%)] transition-opacity duration-700 ${
            shown ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* chapter copy */}
        {!reduced && (
          <div
            className={`pointer-events-none absolute inset-x-0 bottom-0 transition-opacity duration-500 ${
              resolved ? "opacity-0" : "opacity-100"
            }`}
          >
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

        {/* The panel grows directly under the clipped film: one object. */}
        <div
          className={`journey-panel absolute border-x border-b border-line-strong bg-raised transition-[opacity,transform] duration-[900ms] ease-[var(--ease-luxe)] ${
            shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
          }`}
        >
          <div className="px-6 pt-5 pb-6 lg:px-7">
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-mono text-step-n1 tracking-[0.2em] text-ink/55 uppercase">
                SB-01 · Earphones, measured.
              </span>
              <span className="font-led text-step-1 leading-none text-accent">{price}</span>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4">
              {SPECS.map(([v, n]) => (
                <div key={v} className="border-t border-line pt-2.5">
                  <dd className="tnum font-led text-step-1 leading-none text-ink">{v}</dd>
                  <dt className="mt-1 font-mono text-[0.68rem] tracking-[0.08em] text-ink/50 uppercase">
                    {n}
                  </dt>
                </div>
              ))}
            </dl>
            <a
              href={buyHref}
              className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-accent font-medium text-accent-fg transition-colors duration-300 hover:bg-accent-hover"
            >
              Buy SB-01 {price}
            </a>
          </div>
        </div>

        {/* journey rail */}
        {!reduced && (
          <div
            aria-hidden
            className={`absolute inset-x-0 bottom-0 transition-opacity duration-500 ${
              resolved ? "opacity-0" : "opacity-100"
            }`}
          >
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
