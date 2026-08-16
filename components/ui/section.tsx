import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

type SectionProps = React.ComponentProps<"section"> & {
  /* sparse = luxury air, catalog = precision density (DESIGN.md §5) */
  size?: "sparse" | "catalog";
  tone?: "default" | "inverse";
  /* Hairline seam with mono index number at every section boundary */
  seam?: { index: string; label: string };
};

export function Section({
  size = "sparse",
  tone = "default",
  seam,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "relative",
        size === "sparse" ? "py-24 md:py-32 lg:py-40" : "py-16 md:py-24",
        tone === "inverse" && "bg-inverse text-canvas",
        className,
      )}
      {...props}
    >
      {seam && (
        <div
          aria-hidden
          className={cn(
            "absolute inset-x-0 top-0 border-t",
            tone === "inverse" ? "border-canvas/15" : "border-line",
          )}
        >
          <Container className="flex items-baseline gap-3 pt-3">
            <span
              className={cn(
                "font-led text-step-0 tracking-[0.1em]",
                tone === "inverse" ? "text-canvas/60" : "text-tertiary",
              )}
            >
              {seam.index}
            </span>
            <span
              className={cn(
                "font-mono text-step-n1 uppercase tracking-[0.2em]",
                tone === "inverse" ? "text-canvas/60" : "text-tertiary",
              )}
            >
              {seam.label}
            </span>
          </Container>
        </div>
      )}
      {children}
    </section>
  );
}
