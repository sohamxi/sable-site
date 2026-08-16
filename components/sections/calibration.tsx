"use client";

import { site } from "@/content/site";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/reveal";
import { LedValue } from "@/components/led-value";
import { CalibrationScrub } from "@/components/calibration-scrub";

/* Calibration runs in the page's own dark field: the measurement is the
   site's signature moment, and an inverse band was interrupting it. */
export function Calibration() {
  const c = site.calibration;
  return (
    <Section id={c.id} seam={c.seam} size="sparse">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-6">
            <Reveal>
              <h2 className="font-display text-step-5 leading-[1.02] font-medium tracking-[-0.02em] text-ink">
                {c.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.04}>
              <p className="mt-6 max-w-[52ch] text-step-0 leading-[1.6] text-secondary">
                {c.body}
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <dl>
              {c.stats.map((stat, i) => (
                <Reveal key={stat.value} delay={i * 0.04}>
                  <div className="flex flex-col-reverse border-t border-line py-5">
                    <dt className="mt-1 font-mono text-step-n1 tracking-[0.1em] text-tertiary uppercase">
                      {stat.label}
                    </dt>
                    <dd className="tnum font-led text-step-4 leading-none text-ink">
                      <LedValue delay={i * 0.08}>{stat.value}</LedValue>
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </Container>

      {/* The calibration run: scroll performs the sweep. */}
      <CalibrationScrub
        title={c.plot.title}
        meta={c.plot.meta}
        band={c.plot.band}
        caption={c.plot.caption}
      />
    </Section>
  );
}
