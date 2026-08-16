import localFont from "next/font/local";
import { Handjet } from "next/font/google";
import { GeistMono } from "geist/font/mono";

/* v2 type system (DESIGN.md amendment 2026-08-14 v2):
   Satoshi carries luxury display and body; Handjet is the LED
   instrument face for readout values, model numbers and indices;
   Geist Mono holds labels and long-form data. */

export const satoshi = localFont({
  src: [
    {
      path: "../public/fonts/Satoshi-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
  preload: true,
});

export const led = Handjet({
  subsets: ["latin"],
  variable: "--font-led",
  display: "swap",
});

export const mono = GeistMono;
