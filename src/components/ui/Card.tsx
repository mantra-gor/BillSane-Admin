import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const PADDING = {
  none: "",
  md: "p-5",
  lg: "p-6 sm:p-8",
};

interface CardProps extends ComponentProps<"section"> {
  padding?: keyof typeof PADDING;
  /** Lifts on hover; use when the whole card is a link or button. */
  interactive?: boolean;
}

/** White plane on the canvas, edged by a ring shadow rather than a border. */
export function Card({
  padding = "md",
  interactive = false,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <section
      className={cn(
        "rounded-2xl bg-surface shadow-card",
        interactive &&
          "transition-[box-shadow,transform] duration-200 ease-snap hover:-translate-y-0.5 hover:shadow-raised",
        PADDING[padding],
        className
      )}
      {...rest}
    >
      {children}
    </section>
  );
}

interface CardHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  /** Right-aligned slot: a badge, a link, a small action. */
  action?: ReactNode;
  className?: string;
}

export function CardHeader({
  title,
  description,
  action,
  className,
}: CardHeaderProps) {
  return (
    <header className={cn("flex items-start justify-between gap-4", className)}>
      <div className="min-w-0">
        <h3 className="text-lg font-semibold leading-snug text-ink">{title}</h3>
        {description && (
          <p className="mt-1 text-sm leading-relaxed text-ink-muted">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
}

export default Card;
