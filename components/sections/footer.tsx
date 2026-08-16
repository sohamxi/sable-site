import { site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Mark } from "@/components/mark";

export function Footer() {
  const c = site.footer;
  return (
    <footer className="border-t border-line">
      <Container className="py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <span className="flex items-center gap-3 font-medium text-step-1 tracking-[0.08em]">
            <Mark size={26} colorway="ink" className="text-ink" />
            {site.name}
          </span>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
            {c.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex min-h-11 min-w-11 items-center font-mono text-step-n1 tracking-[0.1em] text-tertiary uppercase transition-colors duration-150 hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 md:flex-row md:justify-between">
          <p className="font-mono text-step-n1 tracking-[0.02em] text-tertiary">
            {c.line}
          </p>
          <p className="tnum font-mono text-step-n1 tracking-[0.02em] text-tertiary">
            {c.copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
}
