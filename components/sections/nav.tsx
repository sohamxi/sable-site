"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { DUR, EASE_MECH } from "@/lib/motion";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Scroll spy: active link tracks the section in view */
  useEffect(() => {
    const ids = site.nav.links.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* Overlay a11y: scroll lock, background inert, Escape, focus trap,
     focus into the sheet on open and back to the trigger on close. */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const behind = [
      document.querySelector("main"),
      document.querySelector("footer"),
    ].filter(Boolean) as HTMLElement[];

    if (!open) {
      behind.forEach((el) => el.removeAttribute("inert"));
      document.body.style.overflow = "";
      return;
    }

    behind.forEach((el) => el.setAttribute("inert", ""));
    const trigger = triggerRef.current;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const root = overlayRef.current;
      if (!root) return;
      const focusables = Array.from(
        root.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const current = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (current === first || !root.contains(current))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && current === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      behind.forEach((el) => el.removeAttribute("inert"));
      document.body.style.overflow = "";
      trigger?.focus();
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-150 ease-mech",
        scrolled
          ? "h-14 border-line bg-raised/90 backdrop-blur-md"
          : "h-[72px] border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-full items-center justify-between">
        <a
          href="#top"
          className="inline-flex min-h-11 items-center font-medium text-step-0 tracking-[0.08em] text-ink"
          aria-label="SABLE, back to top"
        >
          {site.name}
        </a>

        {/* Desktop index links */}
        <nav aria-label="Sections" className="hidden items-center gap-8 md:flex">
          {site.nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "group font-mono text-step-n1 tracking-[0.2em] uppercase transition-colors duration-150",
                active === link.href
                  ? "text-ink"
                  : "text-tertiary hover:text-ink",
              )}
            >
              <span className="font-led text-[0.9rem] text-tertiary">
                {link.index}
              </span>{" "}
              <span
                className={cn(
                  "underline-offset-[6px]",
                  active === link.href
                    ? "underline decoration-n-100 decoration-1"
                    : "group-hover:underline group-hover:decoration-n-100 group-hover:decoration-1",
                )}
              >
                {link.label}
              </span>
            </a>
          ))}

          {/* Compact Buy: the same single amber Buy action, condensed state only */}
          <AnimatePresence>
            {scrolled && (
              <motion.a
                href={site.nav.buyCompact.href}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: DUR.fast, ease: EASE_MECH }}
                className="inline-flex items-center gap-2 rounded-full bg-accent bg-linear-to-b from-accent-hover to-accent-deep px-5 py-2.5 font-medium text-step-n1 leading-none text-accent-fg shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] transition-all duration-150 hover:brightness-[1.06] focus-visible:outline-accent"
              >
                {site.nav.buyCompact.label}
                <span className="tnum font-mono">{site.nav.buyCompact.price}</span>
              </motion.a>
            )}
          </AnimatePresence>
        </nav>

        {/* Mobile trigger */}
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="grid h-11 w-11 place-items-center md:hidden"
          aria-label="Open menu"
        >
          <span aria-hidden className="flex flex-col gap-1.5">
            <span className="block h-px w-6 bg-n-100" />
            <span className="block h-px w-6 bg-n-100" />
          </span>
        </button>
      </Container>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DUR.base, ease: EASE_MECH }}
            className="fixed inset-0 z-50 bg-canvas md:hidden"
          >
            <Container className="flex h-[72px] items-center justify-between">
              <span className="font-medium text-step-0 tracking-[0.08em]">
                {site.name}
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-11 w-11 place-items-center"
                aria-label="Close menu"
              >
                <span aria-hidden className="relative block h-6 w-6">
                  <span className="absolute top-1/2 left-0 block h-px w-6 rotate-45 bg-n-100" />
                  <span className="absolute top-1/2 left-0 block h-px w-6 -rotate-45 bg-n-100" />
                </span>
              </button>
            </Container>
            <nav aria-label="Sections" className="mt-8">
              <Container className="flex flex-col">
                {site.nav.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-t border-line py-5 font-display text-step-3 font-medium tracking-[-0.01em]"
                  >
                    <span className="font-led text-step-0 text-tertiary">
                      {link.index}
                    </span>
                    {link.label}
                  </a>
                ))}
                <a
                  href={site.nav.buyCompact.href}
                  onClick={() => setOpen(false)}
                  className="mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-accent bg-linear-to-b from-accent-hover to-accent-deep px-7 py-4 font-medium leading-none text-accent-fg shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"
                >
                  {site.nav.buyCompact.label}
                  <span className="tnum font-mono">
                    {site.nav.buyCompact.price}
                  </span>
                </a>
              </Container>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
