import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BadgeTone =
  | "neutral"
  | "brand"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "on-dark";

const TONES: Record<BadgeTone, { chip: string; dot: string }> = {
  neutral: { chip: "bg-surface text-ink-soft shadow-ring", dot: "bg-ink-faint" },
  brand: {
    chip: "bg-prussian_blue-5 text-prussian_blue shadow-[inset_0_0_0_1px_var(--color-prussian_blue-25)]",
    dot: "bg-prussian_blue",
  },
  accent: {
    chip: "bg-munsell_blue-5 text-munsell_blue-700 shadow-[inset_0_0_0_1px_var(--color-munsell_blue-50)]",
    dot: "bg-munsell_blue",
  },
  success: {
    chip: "bg-success-soft text-success-ink shadow-[inset_0_0_0_1px_var(--color-success-border)]",
    dot: "bg-success",
  },
  warning: {
    chip: "bg-warning-soft text-warning-ink shadow-[inset_0_0_0_1px_var(--color-warning-border)]",
    dot: "bg-warning",
  },
  danger: {
    chip: "bg-danger-soft text-danger-ink shadow-[inset_0_0_0_1px_var(--color-danger-border)]",
    dot: "bg-danger",
  },
  info: {
    chip: "bg-info-soft text-info-ink shadow-[inset_0_0_0_1px_var(--color-info-border)]",
    dot: "bg-info",
  },
  "on-dark": {
    chip: "bg-white/[0.06] text-white/80 shadow-[inset_0_0_0_1px_rgb(255_255_255_/_0.12)]",
    dot: "bg-munsell_blue-400",
  },
};

interface BadgeProps {
  tone?: BadgeTone;
  /** Leading status dot: Active, Expired, Popular. */
  dot?: boolean;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function Badge({
  tone = "neutral",
  dot = false,
  icon,
  className,
  children,
}: BadgeProps) {
  const { chip, dot: dotColor } = TONES[tone];
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 text-xs font-medium",
        chip,
        className
      )}
    >
      {dot && <span className={cn("size-1.5 rounded-full", dotColor)} />}
      {icon}
      {children}
    </span>
  );
}

export default Badge;
