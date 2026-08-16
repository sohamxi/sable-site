/* Product imagery as calibration drawings (DESIGN.md amendment 2026-08-14).
   Hairline strokes in currentColor; parent sets text-n-500. Dimension
   labels in Geist Mono. Photo renders arrive via /atelier:assets and
   replace or accompany these; the drawings stay canonical. */

type SchematicProps = {
  className?: string;
  title: string;
};

function Label({
  x,
  y,
  children,
  anchor = "middle",
}: {
  x: number;
  y: number;
  children: string;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      className="fill-n-400 font-mono"
      fontSize="11"
      letterSpacing="0.08em"
    >
      {children}
    </text>
  );
}

function Caption({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="end"
      className="fill-n-600 font-mono"
      fontSize="10"
      letterSpacing="0.14em"
    >
      {children}
    </text>
  );
}

/* Horizontal dimension line with end ticks */
function DimH({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <g strokeWidth="1">
      <line x1={x1} y1={y} x2={x2} y2={y} />
      <line x1={x1} y1={y - 5} x2={x1} y2={y + 5} />
      <line x1={x2} y1={y - 5} x2={x2} y2={y + 5} />
    </g>
  );
}

export function EarbudSchematic({ className, title }: SchematicProps) {
  return (
    <svg
      viewBox="0 0 420 420"
      role="img"
      aria-label={title}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
    >
      {/* centerlines */}
      <g strokeWidth="0.75" strokeDasharray="2 7" className="stroke-n-700">
        <line x1="180" y1="30" x2="180" y2="390" />
        <line x1="20" y1="210" x2="400" y2="210" />
      </g>
      {/* shell */}
      <circle cx="180" cy="210" r="92" strokeWidth="1.5" />
      {/* canal stem and tip */}
      <path d="M 262 174 Q 322 158 342 184 L 350 210 Q 336 244 264 248" />
      <ellipse
        cx="348"
        cy="206"
        rx="22"
        ry="30"
        transform="rotate(-16 348 206)"
        strokeDasharray="3 4"
      />
      {/* driver, hidden line */}
      <circle cx="180" cy="210" r="56" strokeDasharray="4 5" />
      {/* mic ports */}
      <circle cx="132" cy="132" r="2.5" />
      <circle cx="152" cy="122" r="2.5" />
      {/* driver dimension */}
      <DimH x1={124} x2={236} y={210} />
      <Label x={180} y={196}>11.2 mm</Label>
      {/* weight leader */}
      <line x1="116" y1="146" x2="64" y2="104" strokeWidth="0.75" />
      <Label x={60} y={96} anchor="end">6.1 g</Label>
      <Caption x={396} y={396}>FIG. 01 · SB-01 SHELL, SIDE</Caption>
    </svg>
  );
}

export function OverEarSchematic({ className, title }: SchematicProps) {
  return (
    <svg
      viewBox="0 0 420 420"
      role="img"
      aria-label={title}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
    >
      <g strokeWidth="0.75" strokeDasharray="2 7" className="stroke-n-700">
        <line x1="210" y1="30" x2="210" y2="390" />
      </g>
      {/* headband */}
      <path d="M 92 210 A 118 118 0 0 1 328 210" strokeWidth="1.5" />
      <path d="M 108 210 A 102 102 0 0 1 312 210" strokeDasharray="3 4" />
      {/* yokes */}
      <line x1="92" y1="210" x2="92" y2="236" />
      <line x1="328" y1="210" x2="328" y2="236" />
      {/* cups */}
      <rect x="60" y="236" width="64" height="98" rx="16" strokeWidth="1.5" />
      <rect x="296" y="236" width="64" height="98" rx="16" strokeWidth="1.5" />
      {/* driver in right cup, hidden line */}
      <circle cx="328" cy="285" r="24" strokeDasharray="4 5" />
      <line x1="328" y1="261" x2="382" y2="212" strokeWidth="0.75" />
      <Label x={384} y={204} anchor="end">42 mm</Label>
      {/* weight leader */}
      <line x1="92" y1="334" x2="60" y2="372" strokeWidth="0.75" />
      <Label x={58} y={384} anchor="start">312 g</Label>
      <Caption x={396} y={396}>FIG. 02 · SB-02 PROFILE</Caption>
    </svg>
  );
}

export function BandSchematic({ className, title }: SchematicProps) {
  return (
    <svg
      viewBox="0 0 420 420"
      role="img"
      aria-label={title}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
    >
      <g strokeWidth="0.75" strokeDasharray="2 7" className="stroke-n-700">
        <line x1="210" y1="30" x2="210" y2="390" />
        <line x1="30" y1="210" x2="390" y2="210" />
      </g>
      {/* band, outer and inner wall */}
      <rect x="100" y="118" width="220" height="184" rx="92" strokeWidth="1.5" />
      <rect x="122" y="140" width="176" height="140" rx="70" strokeDasharray="3 4" />
      {/* sensor module */}
      <rect x="182" y="288" width="56" height="22" rx="6" strokeWidth="1.5" />
      <circle cx="198" cy="299" r="2" />
      <circle cx="210" cy="299" r="2" />
      <circle cx="222" cy="299" r="2" />
      {/* weight leader */}
      <line x1="308" y1="146" x2="356" y2="106" strokeWidth="0.75" />
      <Label x={360} y={98} anchor="start">22 g</Label>
      <Caption x={396} y={396}>FIG. 03 · SW-01 LOOP</Caption>
    </svg>
  );
}

export function DockSchematic({ className, title }: SchematicProps) {
  return (
    <svg
      viewBox="0 0 420 420"
      role="img"
      aria-label={title}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
    >
      <g strokeWidth="0.75" strokeDasharray="2 7" className="stroke-n-700">
        <line x1="30" y1="268" x2="390" y2="268" />
      </g>
      {/* base, elevation */}
      <rect x="80" y="240" width="260" height="56" rx="8" strokeWidth="1.5" />
      {/* wells, hidden line */}
      <path d="M 124 240 A 26 26 0 0 0 176 240" strokeDasharray="4 5" />
      <path d="M 244 240 A 26 26 0 0 0 296 240" strokeDasharray="4 5" />
      {/* cable port */}
      <line x1="340" y1="268" x2="364" y2="268" strokeWidth="1.5" />
      <line x1="150" y1="214" x2="150" y2="196" strokeWidth="0.75" />
      <Label x={150} y={188}>WELL 1</Label>
      <line x1="270" y1="214" x2="270" y2="196" strokeWidth="0.75" />
      <Label x={270} y={188}>WELL 2</Label>
      <Label x={364} y={288} anchor="end">30 W</Label>
      <Caption x={396} y={396}>FIG. 04 · A-01 ELEVATION</Caption>
    </svg>
  );
}

export const SCHEMATICS = {
  "SB-01": EarbudSchematic,
  "SB-02": OverEarSchematic,
  "SW-01": BandSchematic,
  "A-01": DockSchematic,
} as const;
