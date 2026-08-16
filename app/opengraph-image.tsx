import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const dynamic = "force-static";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Designed OG card, not a screenshot. System sans stands in for
   Space Grotesk here; see CONTENT-TODO.md. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0E0F11",
          color: "#EDEDEA",
          padding: 64,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            letterSpacing: 6,
            color: "#979A98",
          }}
        >
          <span>SABLE INSTRUMENTS</span>
          <svg viewBox="0 0 64 64" width="72" height="72">
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

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: 280,
              fontWeight: 700,
              letterSpacing: -8,
              lineHeight: 0.9,
            }}
          >
            SB-01
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 40,
              color: "#B9BBB8",
            }}
          >
            Earphones, measured.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 48,
            borderTop: "1px solid rgba(255,255,255,0.16)",
            paddingTop: 24,
            fontSize: 26,
            color: "#979A98",
          }}
        >
          <span>42 dB attenuation, worn</span>
          <span>11.2 mm driver</span>
          <span>6.1 g per bud</span>
          <span>32 h with case</span>
        </div>
      </div>
    ),
    size,
  );
}
