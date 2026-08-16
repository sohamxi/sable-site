import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 " +
  "font-medium text-step-0 tracking-[-0.01em] leading-none select-none " +
  "transition-all duration-200 ease-mech active:scale-[0.985] " +
  "disabled:cursor-not-allowed disabled:bg-n-800 disabled:text-n-500";

const variants = {
  /* The single amber element on the page. CTA work only (DESIGN.md §2).
     Gradient + glow are amber-as-light, allowed by the v2 amendment. */
  primary:
    "bg-accent bg-linear-to-b from-accent-hover to-accent-deep text-accent-fg " +
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_30px_-12px_rgba(255,179,0,0.45)] " +
    "hover:brightness-[1.06] focus-visible:outline-accent",
  ghost:
    "border border-line-strong bg-white/[0.03] text-ink backdrop-blur-sm " +
    "hover:border-white/30 hover:bg-raised focus-visible:outline-n-300",
} as const;

type ButtonProps = {
  variant?: keyof typeof variants;
  href?: string;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentProps<"button">, "className"> &
  Pick<React.ComponentProps<"a">, "target" | "rel">;

export function Button({
  variant = "primary",
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const cls = cn(base, variants[variant], className);
  if (href) {
    return (
      <a href={href} className={cls} {...(props as React.ComponentProps<"a">)}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} {...(props as React.ComponentProps<"button">)}>
      {children}
    </button>
  );
}
