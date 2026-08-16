"use client";

import {
  motion,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import Image from "next/image";

/* The signature moment, upgraded (polish pass): the exploded render is
   sliced into horizontal strips that sit compressed into an assembled
   stack as the section enters, then pull apart to the full exploded
   spacing as the reader scrolls. The near-black ground hides the seams.
   Reduced motion renders the plain image. */

const STRIPS = 8;
const SRC = "/renders/exploded.png";
// Raw CSS url() is not touched by the next/image loader, so prefix it here.
const SRC_RAW = (process.env.NEXT_PUBLIC_BASE_PATH ?? "") + SRC;

function Strip({
  index,
  progress,
}: {
  index: number;
  progress: MotionValue<number>;
}) {
  /* Distance from the stack's center decides how far this strip
     travels; percentages are relative to the strip's own height. */
  const offset = (index - (STRIPS - 1) / 2) * 72;
  const y = useTransform(progress, [0.08, 0.42], [`${-offset}%`, "0%"]);

  return (
    <motion.div
      style={{
        y,
        top: `${(index * 100) / STRIPS}%`,
        height: `${100 / STRIPS}%`,
        backgroundImage: `url(${SRC_RAW})`,
        backgroundSize: `100% ${STRIPS * 100}%`,
        backgroundPosition: `0% ${(index * 100) / (STRIPS - 1)}%`,
      }}
      className="absolute inset-x-0 will-change-transform"
    />
  );
}

export function ExplodedScrub({
  progress,
  className,
}: {
  progress: MotionValue<number>;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const scale = useTransform(progress, [0.08, 0.42], [0.97, 1]);

  if (reduced) {
    return (
      <Image
        src={SRC}
        alt="Exploded view of the SB-01 earbud: mesh grille, machined ring, shell, driver with copper coil, board, battery, inner shell and tip"
        width={1536}
        height={2688}
        sizes="(max-width: 1024px) 0px, 34vw"
        className={className}
      />
    );
  }

  return (
    <motion.div
      role="img"
      aria-label="Exploded view of the SB-01 earbud assembling and separating with scroll: mesh grille, machined ring, shell, driver with copper coil, board, battery, inner shell and tip"
      style={{ scale, aspectRatio: "1536 / 2688" }}
      className={className}
    >
      <div className="relative h-full w-full">
        {Array.from({ length: STRIPS }, (_, i) => (
          <Strip key={i} index={i} progress={progress} />
        ))}
      </div>
    </motion.div>
  );
}
