/* All copy for SABLE. Voice: engineering candor. Short declaratives.
   Every claim carries a number. No em dashes, no exclamation marks,
   no banned words (see BRIEF.md register). */

export const site = {
  name: "SABLE",
  url: "https://sable-audio.example", // CONTENT-TODO: real domain
  title: "SABLE. Earphones, measured.",
  description:
    "SABLE builds earphones and wearables the way a calibration lab would. Every unit is measured against reference within 0.5 dB, and its plot ships in the box.",

  nav: {
    links: [
      { index: "01", label: "SB-01", href: "#sb-01" },
      { index: "02", label: "Range", href: "#range" },
      { index: "03", label: "Calibration", href: "#calibration" },
      { index: "04", label: "Order", href: "#order" },
    ],
    buyCompact: { label: "Buy SB-01", price: "$349", href: "#order" },
  },

  hero: {
    eyebrow: "SABLE INSTRUMENTS · CALIBRATED AUDIO",
    designation: "SB-01",
    claim: "Earphones, measured.",
    subclaim:
      "Every SB-01 leaves the line within 0.5 dB of reference. The plot ships in the box, tied to the serial on the shell.",
    readout: [
      { value: "42 dB", note: "attenuation at 1 kHz, worn, seal plus loop" },
      { value: "11.2 mm", note: "driver, sub-40 Hz without a vent" },
      { value: "6.1 g", note: "per bud, mass 1.2 mm forward of the canal" },
      { value: "32 h", note: "with case. 8 h sealed and cancelling" },
    ],
    primaryCta: { label: "Buy SB-01", price: "$349", href: "#order" },
    secondaryCta: { label: "See the range", href: "#range" },
  },

  marquee: [
    "SB-01",
    "42 dB WORN",
    "11.2 MM DRIVER",
    "6.1 G PER BUD",
    "±0.5 dB TOLERANCE",
    "NO GOLDEN SAMPLES",
    "32 H WITH CASE",
    "UNIT 0847 CERTIFIED",
  ],

  flagship: {
    id: "sb-01",
    seam: { index: "01", label: "FLAGSHIP" },
    heading: "Five decisions, one earphone.",
    intro:
      "Each one cost something. Each one is a number you can check against the plot in your box.",
    rows: [
      {
        key: "ATTENUATION",
        value: "42 dB",
        part: "PARTS 04, 06 · MIC ARRAY, MESH GRILLE",
        head: "Quiet you can verify",
        body: "Six microphones close the loop every 19 microseconds. Worn attenuation at 1 kHz reaches 42 dB, passive seal plus active loop. The rating comes from production units pulled at random. A golden sample would flatter it, and we do not keep one.",
      },
      {
        key: "DRIVER",
        value: "11.2 mm",
        part: "PART 05 · TITANIUM-COATED DIAPHRAGM, COPPER COIL",
        head: "Sub-40 Hz, sealed",
        body: "Reaching below 40 Hz usually costs a bass vent, and a vent costs the seal. The 11.2 mm titanium-coated driver does it with displacement instead. Distortion holds under 0.08% at 94 dB SPL.",
      },
      {
        key: "FIT",
        value: "6.1 g",
        part: "PARTS 01, 02 · TOUCH PLATE, SHELL HALF",
        head: "Weight the ear ignores",
        body: "Each bud weighs 6.1 grams, its mass set 1.2 mm forward of the canal axis so the seal carries the load. The outer face is a flat plate turned with concentric grooves, 0.2 mm apart. Under a thumb it reads like the face of a record. You find it without looking.",
      },
      {
        key: "POWER",
        value: "32 h",
        part: "PART 03 · 68 mAh CELL, STEEL CAN",
        head: "Two days between docks",
        body: "Eight hours sealed and cancelling, rated at 75 dB SPL rather than at a whisper. The case holds 24 more. Ten minutes on the dock returns two hours of playback.",
      },
      {
        key: "LINK",
        value: "19 ms",
        part: "PART 04 · RADIO BOARD, BLUETOOTH 5.4",
        head: "Close to the wire",
        body: "Bluetooth 5.4 with LE Audio and LC3. Game mode holds latency at 19 ms. Two hosts stay connected at once and switch in under 80 ms.",
      },
    ],
  },

  range: {
    id: "range",
    seam: { index: "02", label: "RANGE" },
    heading: "Four instruments. One discipline.",
    intro:
      "Built to one tolerance on one rig. SB-01, SB-02 and SW-01 ship with calibration certificates.",
    products: [
      {
        model: "SB-01",
        name: "Wireless earphones",
        sentence: "Reference-tuned earphones. Quiet that holds on a train.",
        specs: [
          "IPX4, IEC 60529",
          "Turned touch plate, 0.2 mm grooves",
          "Wear detect, skin sensor",
        ],
        price: "$349",
        featured: true,
        cta: { label: "Full specs", href: "#sb-01" },
      },
      {
        model: "SB-02",
        name: "Over-ear headphones",
        sentence:
          "The range-topping over-ear. Forty hours, folded aluminium, closed back.",
        specs: ["48 dB attenuation at 1 kHz", "42 mm driver", "312 g"],
        price: "$549",
      },
      {
        model: "SW-01",
        name: "Sensor band",
        sentence:
          "Heart rate, rhythm and skin temperature. Fourteen days between charges.",
        specs: ["HR, HRV, skin temp", "14 day battery", "22 g"],
        price: "$199",
      },
      {
        model: "A-01",
        name: "Charge dock",
        sentence: "Two wells, one cable, machined from a single billet.",
        specs: ["2 charge wells", "30 W USB-C", "410 g"],
        price: "$79",
      },
    ],
    certificateNote:
      "The plot in the box matches the serial on the shell. Keep it. It is the unit's only birth record.",
  },

  calibration: {
    id: "calibration",
    seam: { index: "03", label: "CALIBRATION" },
    heading: "Every unit measured. No golden samples.",
    body: "Every unit runs against the reference rig before packing. The tolerance window is 0.5 dB from 20 Hz to 12 kHz. When a batch drifts, it stays in the building.",
    stats: [
      { value: "0.5 dB", label: "tolerance window, 20 Hz to 12 kHz" },
      { value: "100%", label: "of units measured before packing" },
      { value: "3 of 214", label: "batches held back this year" },
    ],
    plot: {
      title: "FREQUENCY RESPONSE · DEVIATION FROM REFERENCE",
      meta: "IEC 60318-4 COUPLER · 1/12 OCT SMOOTHING · 94 dB SPL",
      caption: "UNIT 0847 · BOTH CHANNELS WITHIN ±0.5 dB · 20 Hz TO 12 kHz",
      band: "±0.5 dB",
      alt: "Deviation plot for unit 0847: left and right channel traces on a logarithmic frequency axis from 20 hertz to 12 kilohertz, both staying inside the half-decibel tolerance corridor",
    },
  },

  scene: {
    caption: "SB-01 · Field conditions · 23:40",
    alt: "SB-01 earphones with concentric-grooved touch plates resting on a dark desk beside their open case, lit by a warm lamp",
  },

  order: {
    id: "order",
    seam: { index: "04", label: "ORDER" },
    heading: "One model. One finish. One decision left.",
    finish: "Graphite. The touch plate is turned, not stamped.",
    price: "$349",
    inBox: [
      "SB-01 earphones",
      "Charge case",
      "Four tip sizes, S to XL",
      "USB-C cable, 1.2 m",
      "The frequency response plot for your serial",
    ],
    shipping: "Ships in 5 business days. 30 day return, no restocking fee.",
    emailLabel: "EMAIL",
    emailPlaceholder: "you@example.com",
    emailError: "That address does not parse.",
    submit: { label: "Buy SB-01", price: "$349" },
    disclosure: "Design study. Nothing is charged, sent, or stored.",
    success: "Logged. A real order would leave the line here.",
    studyNote:
      "SABLE is a design study. No payment was taken and no email was sent or stored.",
  },

  footer: {
    line: "SABLE is a fictional brand, built as a design study. Every number on this page is part of the fiction.",
    copyright: "© 2026 SABLE. A study, not a store.",
    links: [
      { label: "SB-01", href: "#sb-01" },
      { label: "Range", href: "#range" },
      { label: "Calibration", href: "#calibration" },
      { label: "Order", href: "#order" },
    ],
  },
} as const;

export type Product = (typeof site.range.products)[number];
