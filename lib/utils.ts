import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/* Register the custom fluid type scale as font-size classes, otherwise
   tailwind-merge classifies `text-step-*` as colors and silently drops
   real color utilities that share a cn() call (found by the gauntlet:
   the order Buy button lost `text-accent-fg`). */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "step-n1",
            "step-0",
            "step-1",
            "step-2",
            "step-3",
            "step-4",
            "step-5",
            "step-6",
            "step-7",
            "step-8",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
