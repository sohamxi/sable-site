"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const FRAMES = 60;
const frameSrc = (i: number) =>
  `${BASE}/calibration/frame-${String(i + 1).padStart(3, "0")}.jpg`;

/* Deviation traces, drawn in the same plot space as the lab report
   (x 64-936 = 20 Hz-12 kHz log, y 130 = 0 dB, 106 px = 1 dB). */
const TRACE_L =
  "M 64 148 C 120 120, 170 104, 230 118 C 290 130, 330 146, 390 142 C 450 138, 490 112, 550 116 C 610 120, 650 152, 710 158 C 770 163, 810 128, 860 118 C 900 112, 920 120, 936 124";
const TRACE_R =
  "M 64 140 C 120 128, 170 114, 230 126 C 290 136, 330 152, 390 148 C 450 143, 490 120, 550 124 C 610 128, 650 158, 710 162 C 770 166, 810 134, 860 124 C 900 118, 920 126, 936 130";

const X_TICKS: [number, string][] = [
  [64, "20"], [188.9, "50"], [283.4, "100"], [377.9, "200"], [502.8, "500"],
  [597.3, "1k"], [691.8, "2k"], [816.7, "5k"], [911.2, "10k"],
];

function hz(p: number) {
  const f = 20 * Math.pow(12000 / 20, Math.min(Math.max(p, 0), 1));
  return f >= 1000 ? `${(f / 1000).toFixed(f < 10000 ? 2 : 1)} kHz` : `${Math.round(f)} Hz`;
}

/**
 * The calibration run, performed by scrolling: a scroll-scrubbed frame
 * sequence of the reference rig, with the live deviation trace drawing
 * over it as an instrument HUD and a sweep cursor reporting frequency.
 * Reduced motion / no JS: first frame + the completed trace, static.
 */
export function CalibrationScrub({
  band,
  caption,
  title,
  meta,
}: {
  band: string;
  caption: string;
  title: string;
  meta: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const readout = useRef<HTMLSpanElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start start", "end end"],
  });

  /* The sweep runs across the middle 70% of the pass, so the shot can
     settle before the measurement starts and hold after it completes. */
  const sweep = useTransform(scrollYProgress, [0.15, 0.85], [0, 1], {
    clamp: true,
  });
  const traceOffset = useTransform(sweep, (v) => 1 - v);
  const cursorX = useTransform(sweep, (v) => 64 + v * 872);
  const hudOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
  const cursorOpacity = useTransform(
    scrollYProgress,
    [0.13, 0.17, 0.85, 0.92],
    [0, 1, 1, 0],
  );

  /* Preload the sequence, then draw whichever frame scroll asks for. */
  useEffect(() => {
    if (reduced) {
      const img = new Image();
      img.onload = () => {
        images.current[0] = img;
        setReady(true);
        draw(0);
      };
      img.src = frameSrc(0);
      return;
    }
    let loaded = 0;
    const list: HTMLImageElement[] = [];
    for (let i = 0; i < FRAMES; i++) {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        loaded += 1;
        if (loaded === 1) {
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
    /* cover-fit */
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

  useMotionValueEvent(sweep, "change", (v) => {
    if (readout.current) readout.current.textContent = hz(v);
  });

  useEffect(() => {
    const onResize = () => draw(0);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div ref={wrap} className="relative mt-16 h-[320vh] md:h-[380vh]">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        {/* the rig */}
        <canvas
          ref={canvas}
          aria-hidden
          className="absolute inset-0 h-full w-full"
        />
        {!ready && <div className="absolute inset-0 bg-surface" aria-hidden />}
        {/* vignette + floor so the HUD always has ground */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_45%,transparent_35%,rgba(14,15,17,0.85)_100%)]"
        />

        {/* instrument HUD */}
        <div className="relative mx-auto w-full max-w-[1200px] px-6 lg:px-8">
          <div className="flex flex-col gap-1 lg:flex-row lg:items-baseline lg:justify-between">
            <span className="font-mono text-step-n1 tracking-[0.14em] text-ink/85">
              {title}
            </span>
            <span className="font-mono text-[0.7rem] tracking-[0.1em] text-ink/45">
              {meta}
            </span>
          </div>

          <motion.svg
            viewBox="0 0 960 290"
            role="img"
            aria-label={caption}
            className="mt-4 h-auto w-full"
            style={reduced ? undefined : { opacity: hudOpacity }}
          >
            <g stroke="rgba(237,237,234,0.10)" strokeWidth="1">
              {[24, 77, 130, 183, 236].map((y) => (
                <line key={y} x1="64" y1={y} x2="936" y2={y} />
              ))}
            </g>
            <line x1="64" y1="130" x2="936" y2="130" stroke="rgba(237,237,234,0.28)" strokeWidth="1" />
            <g stroke="rgba(237,237,234,0.07)" strokeWidth="1">
              {X_TICKS.map(([x]) => (
                <line key={x} x1={x} y1="24" x2={x} y2="236" />
              ))}
            </g>

            {/* tolerance corridor */}
            <rect x="64" y="77" width="872" height="106" fill="rgba(255,179,0,0.10)" />
            <line x1="64" y1="77" x2="936" y2="77" stroke="rgba(255,179,0,0.45)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="64" y1="183" x2="936" y2="183" stroke="rgba(255,179,0,0.45)" strokeWidth="1" strokeDasharray="4 4" />

            {/* traces, drawn by the sweep */}
            <motion.path
              d={TRACE_R}
              fill="none"
              stroke="rgba(237,237,234,0.45)"
              strokeWidth="1.5"
              pathLength={1}
              strokeDasharray={1}
              style={reduced ? undefined : { strokeDashoffset: traceOffset }}
              strokeDashoffset={reduced ? 0 : undefined}
            />
            <motion.path
              d={TRACE_L}
              fill="none"
              stroke="#FFB300"
              strokeWidth="2.25"
              pathLength={1}
              strokeDasharray={1}
              style={reduced ? undefined : { strokeDashoffset: traceOffset }}
              strokeDashoffset={reduced ? 0 : undefined}
            />

            {/* sweep cursor */}
            {!reduced && (
              <motion.g style={{ x: cursorX, opacity: cursorOpacity }}>
                <line x1="0" y1="18" x2="0" y2="242" stroke="#FFB300" strokeWidth="1" opacity="0.8" />
                <circle cx="0" cy="130" r="3" fill="#FFB300" />
              </motion.g>
            )}

            {/* Tick labels render below ~11px on phones, where they read as
                noise rather than data — the trace and corridor carry it. */}
            <g className="hidden font-mono sm:block" fill="rgba(237,237,234,0.5)" fontSize="11" letterSpacing="0.04em">
              <text x="54" y="28" textAnchor="end">+1.0</text>
              <text x="54" y="81" textAnchor="end">+0.5</text>
              <text x="54" y="134" textAnchor="end">0 dB</text>
              <text x="54" y="187" textAnchor="end">-0.5</text>
              <text x="54" y="240" textAnchor="end">-1.0</text>
            </g>
            <g className="hidden font-mono sm:block" fill="rgba(237,237,234,0.5)" fontSize="11" letterSpacing="0.04em" textAnchor="middle">
              {X_TICKS.map(([x, label]) => (
                <text key={label} x={x} y="262">{label}</text>
              ))}
              <text x="948" y="262">Hz</text>
            </g>
            <g className="font-mono" fontSize="11" letterSpacing="0.06em">
              <text x="932" y="70" textAnchor="end" fill="rgba(255,179,0,0.75)">{band}</text>
              <line x1="740" y1="36" x2="768" y2="36" stroke="#FFB300" strokeWidth="2" />
              <text x="776" y="40" fill="rgba(237,237,234,0.7)">L</text>
              <line x1="800" y1="36" x2="828" y2="36" stroke="rgba(237,237,234,0.45)" strokeWidth="1.5" />
              <text x="836" y="40" fill="rgba(237,237,234,0.7)">R</text>
            </g>
          </motion.svg>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
            <span className="font-mono text-[0.72rem] tracking-[0.16em] text-ink/50 uppercase">
              {caption}
            </span>
            {!reduced && (
              <span className="font-led text-step-1 leading-none whitespace-nowrap text-accent tabular-nums">
                <span ref={readout}>20 Hz</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
