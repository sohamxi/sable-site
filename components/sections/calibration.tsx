"use client";

import { motion, useReducedMotion } from "motion/react";
import { site } from "@/content/site";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/reveal";
import { LedValue } from "@/components/led-value";
import { EASE_LUXE } from "@/lib/motion";

/* The single inverse band (DESIGN.md §2: max one per page). */
export function Calibration() {
  const c = site.calibration;
  const reduced = useReducedMotion();
  return (
    <Section id={c.id} seam={c.seam} tone="inverse" size="sparse">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-6">
            <Reveal>
              <h2 className="font-display text-step-5 leading-[1.02] font-medium tracking-[-0.02em] text-canvas">
                {c.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.04}>
              <p className="mt-6 max-w-[52ch] text-step-0 leading-[1.6] text-canvas/70">
                {c.body}
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <dl>
              {c.stats.map((stat, i) => (
                <Reveal key={stat.value} delay={i * 0.04}>
                  <div className="flex flex-col-reverse border-t border-canvas/15 py-5">
                    <dt className="mt-1 font-mono text-step-n1 tracking-[0.1em] text-canvas/60 uppercase">
                      {stat.label}
                    </dt>
                    <dd className="tnum font-led text-step-4 leading-none text-canvas">
                      <LedValue delay={i * 0.08}>{stat.value}</LedValue>
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>

        {/* Lab-report deviation plot: log-frequency axis, dB scale,
            ±0.5 corridor, separate L/R traces. Trace in ink, corridor as
            amber light per the v2 gradient amendment. Plot area
            x 64-936, y 24-236; 1 dB = 106 px; x(f) log-scaled 20 Hz-12 kHz. */}
        <Reveal className="mt-16">
          <figure className="rounded-md border border-canvas/15 p-5 lg:p-8">
            <div className="flex flex-col gap-1 lg:flex-row lg:items-baseline lg:justify-between">
              <span className="font-mono text-step-n1 tracking-[0.14em] text-canvas/80">
                {c.plot.title}
              </span>
              <span className="font-mono text-[0.7rem] tracking-[0.1em] text-canvas/50">
                {c.plot.meta}
              </span>
            </div>
            <svg
              viewBox="0 0 960 290"
              role="img"
              aria-label={c.plot.alt}
              className="mt-5 h-auto w-full"
            >
              {/* horizontal grid: +1.0 / +0.5 / 0 / -0.5 / -1.0 dB */}
              <g stroke="rgba(14,15,17,0.12)" strokeWidth="1">
                {[24, 77, 130, 183, 236].map((y) => (
                  <line key={y} x1="64" y1={y} x2="936" y2={y} />
                ))}
              </g>
              {/* zero line, slightly stronger */}
              <line
                x1="64"
                y1="130"
                x2="936"
                y2="130"
                stroke="rgba(14,15,17,0.30)"
                strokeWidth="1"
              />
              {/* vertical grid at log-spaced ticks */}
              <g stroke="rgba(14,15,17,0.10)" strokeWidth="1">
                {[64, 188.9, 283.4, 377.9, 502.8, 597.3, 691.8, 816.7, 911.2].map(
                  (x) => (
                    <line key={x} x1={x} y1="24" x2={x} y2="236" />
                  ),
                )}
              </g>
              {/* ±0.5 dB tolerance corridor */}
              <rect
                x="64"
                y="77"
                width="872"
                height="106"
                fill="rgba(240,164,0,0.16)"
              />
              {/* L channel */}
              <motion.path
                d="M 64 148 C 120 120, 170 104, 230 118 C 290 130, 330 146, 390 142 C 450 138, 490 112, 550 116 C 610 120, 650 152, 710 158 C 770 163, 810 128, 860 118 C 900 112, 920 120, 936 124"
                fill="none"
                stroke="#0E0F11"
                strokeWidth="2"
                initial={reduced ? undefined : { pathLength: 0 }}
                whileInView={reduced ? undefined : { pathLength: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.8, ease: EASE_LUXE, delay: 0.2 }}
              />
              {/* R channel */}
              <motion.path
                d="M 64 140 C 120 128, 170 114, 230 126 C 290 136, 330 152, 390 148 C 450 143, 490 120, 550 124 C 610 128, 650 158, 710 162 C 770 166, 810 134, 860 124 C 900 118, 920 126, 936 130"
                fill="none"
                stroke="#0E0F11"
                strokeWidth="1.5"
                opacity="0.5"
                initial={reduced ? undefined : { pathLength: 0 }}
                whileInView={reduced ? undefined : { pathLength: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.8, ease: EASE_LUXE, delay: 0.45 }}
              />
              {/* y-axis labels */}
              <g
                className="font-mono"
                fill="rgba(14,15,17,0.55)"
                fontSize="11"
                letterSpacing="0.04em"
              >
                <text x="54" y="28" textAnchor="end">+1.0</text>
                <text x="54" y="81" textAnchor="end">+0.5</text>
                <text x="54" y="134" textAnchor="end">0 dB</text>
                <text x="54" y="187" textAnchor="end">-0.5</text>
                <text x="54" y="240" textAnchor="end">-1.0</text>
              </g>
              {/* x-axis labels at log ticks */}
              <g
                className="font-mono"
                fill="rgba(14,15,17,0.55)"
                fontSize="11"
                letterSpacing="0.04em"
                textAnchor="middle"
              >
                <text x="64" y="262">20</text>
                <text x="188.9" y="262">50</text>
                <text x="283.4" y="262">100</text>
                <text x="377.9" y="262">200</text>
                <text x="502.8" y="262">500</text>
                <text x="597.3" y="262">1k</text>
                <text x="691.8" y="262">2k</text>
                <text x="816.7" y="262">5k</text>
                <text x="911.2" y="262">10k</text>
                <text x="948" y="262">Hz</text>
              </g>
              {/* corridor label + legend */}
              <g
                className="font-mono"
                fontSize="11"
                letterSpacing="0.06em"
              >
                <text x="932" y="70" textAnchor="end" fill="rgba(14,15,17,0.55)">
                  {c.plot.band}
                </text>
                <line x1="740" y1="36" x2="768" y2="36" stroke="#0E0F11" strokeWidth="2" />
                <text x="776" y="40" fill="rgba(14,15,17,0.7)">L</text>
                <line x1="800" y1="36" x2="828" y2="36" stroke="#0E0F11" strokeWidth="1.5" opacity="0.5" />
                <text x="836" y="40" fill="rgba(14,15,17,0.7)">R</text>
              </g>
            </svg>
            <figcaption className="mt-4 font-mono text-[0.72rem] tracking-[0.16em] text-canvas/60 uppercase">
              {c.plot.caption}
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </Section>
  );
}
