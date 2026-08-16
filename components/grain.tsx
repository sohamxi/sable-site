/* 4% monochrome grain, soft-light for the dark cinematic register
   (signature-effects reference, mandatory). Static, never animated. */

export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-60 opacity-[0.04] mix-blend-soft-light [contain:strict]"
    >
      <svg className="h-full w-full">
        <filter id="sable-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#sable-grain)" />
      </svg>
    </div>
  );
}
