import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/* Index Plate mark, detail tier, plate-live (brand-spec §2.3-2.5) */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0E0F11",
        }}
      >
        <svg viewBox="0 0 64 64" width="132" height="132">
          <g
            stroke="#EDEDEA"
            strokeWidth="4"
            fill="none"
            strokeLinecap="butt"
          >
            <path d="M 28 4.3 A 28 28 0 1 0 36 4.3" />
            <path d="M 28 15.5 A 17 17 0 1 0 36 15.5" />
          </g>
          <g
            stroke="#EDEDEA"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="butt"
            opacity="0.55"
          >
            <path d="M 28 9.3 A 23 23 0 1 0 36 9.3" />
            <path d="M 28 20.7 A 12 12 0 1 0 36 20.7" />
          </g>
          <circle cx="32" cy="32" r="7" fill="#FFB300" />
        </svg>
      </div>
    ),
    size,
  );
}
