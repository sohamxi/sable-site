import { site } from "@/content/site";

/* Spec ticker: a slow full-bleed marquee of production readouts between
   hero and flagship. CSS-driven; freezes to a static strip under
   reduced motion (globals.css backstop kills the animation). */
export function Marquee() {
  const items = site.marquee;
  const strip = (
    <span aria-hidden className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="tnum px-6 font-led text-step-1 whitespace-nowrap text-n-300">
            {item}
          </span>
          <span className="h-1 w-1 shrink-0 rounded-full bg-n-700" />
        </span>
      ))}
    </span>
  );

  return (
    <div
      role="marquee"
      aria-label={`Production readouts: ${items.join(", ")}`}
      className="relative overflow-hidden border-y border-line py-4"
    >
      <div className="animate-marquee flex w-max">
        {strip}
        {strip}
      </div>
    </div>
  );
}
