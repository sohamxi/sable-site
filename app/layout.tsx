import type { Metadata } from "next";
import { MotionConfig } from "motion/react";
import { satoshi, led, mono } from "./fonts";
import { site } from "@/content/site";
import { Grain } from "@/components/grain";
import { Cursor } from "@/components/cursor";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${led.variable} ${mono.variable}`}
    >
      <body className="font-body text-ink antialiased">
        <MotionConfig reducedMotion="user">
          <SmoothScroll />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-80 focus:rounded-sm focus:bg-inverse focus:px-4 focus:py-2 focus:text-canvas"
          >
            Skip to content
          </a>
          {children}
          <Grain />
          <Cursor />
        </MotionConfig>
      </body>
    </html>
  );
}
