/* The SABLE mark: "Index Plate" (.atelier/brand-spec.md §2, verbatim
   geometry). Two colorways only — plate-ink in-page (amber law), plate-live
   (amber dot) on off-page surfaces. Detail tier (fine grooves) at ≥64px. */

export function Mark({
  size = 24,
  colorway = "ink",
  className,
}: {
  size?: number;
  colorway?: "ink" | "live";
  className?: string;
}) {
  const detail = size >= 64;
  const dot = colorway === "live" ? "#FFB300" : "currentColor";
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      aria-hidden
      className={className}
    >
      <g stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="butt">
        <path d="M 28 4.3 A 28 28 0 1 0 36 4.3" />
        <path d="M 28 15.5 A 17 17 0 1 0 36 15.5" />
      </g>
      {detail && (
        <g
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="butt"
          opacity="0.55"
        >
          <path d="M 28 9.3 A 23 23 0 1 0 36 9.3" />
          <path d="M 28 20.7 A 12 12 0 1 0 36 20.7" />
        </g>
      )}
      <circle cx="32" cy="32" r="7" fill={dot} />
    </svg>
  );
}
