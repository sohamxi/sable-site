"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { site } from "@/content/site";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

type Phase = "idle" | "loading" | "done";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Order() {
  const c = site.order;
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const successRef = useRef<HTMLParagraphElement>(null);

  /* Announce and focus the success message once it lands
     (a11y audit blocker 3). */
  useEffect(() => {
    if (phase === "done") successRef.current?.focus();
  }, [phase]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (phase === "loading") return;
    if (!EMAIL_RE.test(email)) {
      setError(c.emailError);
      return;
    }
    setError(null);
    setPhase("loading");
    /* Design study: no network, no persistence (BRIEF.md, out of scope). */
    window.setTimeout(() => setPhase("done"), 900);
  }

  return (
    <Section id={c.id} seam={c.seam} size="sparse">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-6">
            <Reveal>
              <h2 className="font-display text-step-5 leading-[1.02] font-medium tracking-[-0.02em]">
                {c.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.04}>
              <p className="mt-4 text-step-0 text-secondary">{c.finish}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <ul className="mt-10">
                {c.inBox.map((item) => (
                  <li
                    key={item}
                    className="border-t border-line py-3 text-step-0 leading-[1.6] last:border-b last:border-line"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 font-mono text-step-n1 tracking-[0.02em] text-tertiary">
                {c.shipping}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={0.08}>
              <div className="card-sheen overflow-hidden rounded-lg border border-line">
                <div className="relative h-44 overflow-hidden border-b border-line">
                  <Image
                    src={(process.env.NEXT_PUBLIC_BASE_PATH ?? "") + "/renders/hero.png"}
                    alt="SB-01 earphones and charge case, graphite"
                    width={1792}
                    height={2304}
                    sizes="(max-width: 1024px) 92vw, 34vw"
                    className="h-full w-full object-cover object-[50%_38%]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-linear-to-t from-surface via-transparent to-transparent"
                  />
                </div>
                <div className="p-8">
                  <dl>
                    {[
                      ["MODEL", "SB-01"],
                      ["FINISH", "GRAPHITE"],
                      ["PRICE", c.price],
                    ].map(([k, v]) => (
                      <div
                        key={k}
                        className="flex items-baseline justify-between border-b border-line py-3"
                      >
                        <dt className="font-mono text-step-n1 tracking-[0.2em] text-tertiary">
                          {k}
                        </dt>
                        <dd className="tnum font-mono text-step-0 text-ink">
                          {v}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {/* Persistent live region: mounted across all phases so
                      the success text is actually announced. */}
                  <p
                    ref={successRef}
                    aria-live="polite"
                    tabIndex={-1}
                    className={cn(
                      "font-mono text-step-0 leading-[1.6] text-ink focus:outline-none",
                      phase === "done" ? "mt-8" : "sr-only",
                    )}
                  >
                    {phase === "done" ? c.success : ""}
                  </p>

                  {phase === "done" ? (
                    <p className="mt-4 font-mono text-step-n1 tracking-[0.02em] text-tertiary">
                      {c.studyNote}
                    </p>
                  ) : null}
                  {phase !== "done" && (
                    <form onSubmit={submit} noValidate className="mt-8">
                      <label
                        htmlFor="order-email"
                        className="block font-mono text-step-n1 tracking-[0.2em] text-tertiary uppercase"
                      >
                        {c.emailLabel}
                      </label>
                      <input
                        id="order-email"
                        type="email"
                        autoComplete="email"
                        aria-required="true"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError(null);
                        }}
                        placeholder={c.emailPlaceholder}
                        aria-invalid={Boolean(error)}
                        aria-describedby="order-email-error"
                        className={cn(
                          "mt-2 w-full rounded-md border bg-canvas px-4 py-3 text-step-0 text-ink placeholder:text-n-600",
                          "transition-colors duration-150 focus:border-n-300 focus:outline-none",
                          error ? "border-error" : "border-line",
                        )}
                      />
                      <p
                        id="order-email-error"
                        aria-live="polite"
                        className="mt-2 h-5 font-mono text-step-n1 text-error"
                      >
                        {error ?? ""}
                      </p>

                      <button
                        type="submit"
                        aria-disabled={phase === "loading"}
                        data-cursor="BUY"
                        className={cn(
                          "mt-4 inline-flex w-full items-center justify-center gap-3 rounded-full px-7 py-4",
                          "bg-accent bg-linear-to-b from-accent-hover to-accent-deep text-accent-fg",
                          "shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_30px_-12px_rgba(255,179,0,0.45)]",
                          "font-medium text-step-0 leading-none select-none",
                          "transition-all duration-150 ease-mech hover:brightness-[1.06]",
                          "focus-visible:outline-accent active:scale-[0.985]",
                          phase === "loading" && "cursor-wait brightness-90",
                        )}
                      >
                        {phase === "loading" ? (
                          <span
                            role="status"
                            className="inline-flex items-center gap-3"
                          >
                            <span
                              aria-hidden
                              className="block h-4 w-4 animate-spin rounded-full border-2 border-accent-fg/30 border-t-accent-fg"
                            />
                            <span className="font-mono text-step-n1 tracking-[0.18em]">
                              LOGGING
                            </span>
                          </span>
                        ) : (
                          <>
                            {c.submit.label}
                            <span className="tnum font-mono">
                              {c.submit.price}
                            </span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                  <p className="mt-4 font-mono text-[0.72rem] tracking-[0.06em] text-tertiary">
                    {c.disclosure}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
