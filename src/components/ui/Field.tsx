import { forwardRef, type ComponentProps, type ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FieldProps {
  label?: string;
  htmlFor?: string;
  required?: boolean;
  /** Helper copy shown while there is no error. */
  hint?: ReactNode;
  error?: string;
  className?: string;
  children: ReactNode;
}

/**
 * The label, control and message frame every form row sits in. The control
 * itself is styled by the base layer in globals.css, so Input and Select stay
 * thin and any bare <input> on an older page matches them.
 */
export function Field({
  label,
  htmlFor,
  required = false,
  hint,
  error,
  className,
  children,
}: FieldProps) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={htmlFor} className="text-[13px] font-semibold text-ink-soft">
          {label}
          {required && (
            <span className="ml-0.5 text-danger" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      {children}
      {error ? (
        <p
          id={htmlFor ? `${htmlFor}-error` : undefined}
          className="flex items-start gap-1.5 text-xs font-medium text-danger"
        >
          <AlertCircle size={13} className="mt-px shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : (
        hint && <p className="text-xs text-ink-muted">{hint}</p>
      )}
    </div>
  );
}

interface ControlProps {
  invalid?: boolean;
}

export const Input = forwardRef<
  HTMLInputElement,
  ComponentProps<"input"> & ControlProps
>(function Input({ invalid, id, className, ...rest }, ref) {
  return (
    <input
      ref={ref}
      id={id}
      aria-invalid={invalid || undefined}
      aria-describedby={invalid && id ? `${id}-error` : undefined}
      className={className}
      {...rest}
    />
  );
});

export const Select = forwardRef<
  HTMLSelectElement,
  ComponentProps<"select"> & ControlProps
>(function Select({ invalid, id, className, ...rest }, ref) {
  return (
    <select
      ref={ref}
      id={id}
      aria-invalid={invalid || undefined}
      aria-describedby={invalid && id ? `${id}-error` : undefined}
      className={className}
      {...rest}
    />
  );
});

export default Field;
