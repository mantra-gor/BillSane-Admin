import Link from "next/link";
import { forwardRef, type ComponentProps, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "accent"
  | "secondary"
  | "ghost"
  | "on-dark";
export type ButtonSize = "sm" | "md" | "lg";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-prussian_blue text-white shadow-btn-primary hover:bg-prussian_blue-800 active:bg-prussian_blue-900",
  accent:
    "bg-munsell_blue text-white shadow-btn-accent hover:bg-munsell_blue-600 active:bg-munsell_blue-700",
  secondary:
    "bg-surface text-ink shadow-card hover:bg-surface-subtle hover:shadow-raised active:bg-surface-muted",
  ghost:
    "bg-transparent text-ink-soft hover:bg-surface hover:text-ink hover:shadow-ring active:bg-surface-muted",
  "on-dark":
    "bg-white/[0.08] text-white shadow-[inset_0_0_0_1px_rgb(255_255_255_/_0.14)] hover:bg-white/[0.14] active:bg-white/[0.1]",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-8 px-3.5 text-[13px] gap-1.5",
  md: "h-10 px-[18px] text-sm gap-2",
  lg: "h-12 px-6 text-[15px] gap-2",
};

interface StyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export function buttonClasses({
  variant = "primary",
  size = "md",
  fullWidth = false,
}: StyleProps = {}) {
  return cn(
    "inline-flex shrink-0 cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-full font-semibold tracking-[-0.01em]",
    "transition-[background-color,box-shadow,transform] duration-150 ease-snap active:translate-y-px",
    "disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none",
    VARIANTS[variant],
    SIZES[size],
    fullWidth && "w-full"
  );
}

interface ButtonProps extends ComponentProps<"button">, StyleProps {
  loading?: boolean;
  /** Rendered before the label; replaced by the spinner while loading. */
  icon?: ReactNode;
  /** Rendered after the label: arrows, shortcut hints, counts. */
  trailing?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    type = "button",
    variant,
    size = "md",
    fullWidth,
    loading = false,
    disabled,
    icon,
    trailing,
    className,
    children,
    ...rest
  },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(buttonClasses({ variant, size, fullWidth }), className)}
      {...rest}
    >
      {loading ? (
        <Loader2 className="animate-spin" size={size === "sm" ? 14 : 16} />
      ) : (
        icon
      )}
      {children}
      {trailing}
    </button>
  );
});

interface ButtonLinkProps extends ComponentProps<typeof Link>, StyleProps {
  icon?: ReactNode;
  trailing?: ReactNode;
}

/** A link styled as a button, for navigation actions. */
export function ButtonLink({
  variant,
  size,
  fullWidth,
  icon,
  trailing,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(buttonClasses({ variant, size, fullWidth }), className)}
      {...rest}
    >
      {icon}
      {children}
      {trailing}
    </Link>
  );
}

export default Button;
