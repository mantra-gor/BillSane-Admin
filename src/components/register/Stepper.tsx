import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const STEPS = ["Business", "Admin", "Review", "Payment", "License key"];

/** Where the owner is in registration: full rail on wider screens, a bar on phones. */
export default function Stepper({ current }: { current: number }) {
  return (
    <nav aria-label="Registration progress">
      <div className="sm:hidden">
        <p className="text-sm text-ink-muted">
          Step {current} of {STEPS.length} ·{" "}
          <span className="font-semibold text-ink">{STEPS[current - 1]}</span>
        </p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-sunken">
          <div
            className="h-full rounded-full bg-munsell_blue transition-[width] duration-300 ease-snap"
            style={{ width: `${(current / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      <ol className="hidden items-center sm:flex">
        {STEPS.map((label, i) => {
          const n = i + 1;
          const done = n < current;
          const active = n === current;
          return (
            <li
              key={label}
              aria-current={active ? "step" : undefined}
              className="flex flex-1 items-center last:flex-none"
            >
              <span
                className={cn(
                  "tnum inline-flex size-8 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold transition-colors duration-200",
                  done && "bg-munsell_blue text-white",
                  active && "bg-prussian_blue text-white shadow-btn-primary",
                  !done && !active && "bg-surface text-ink-muted shadow-ring"
                )}
              >
                {done ? <Check size={15} strokeWidth={2.5} aria-hidden="true" /> : n}
              </span>
              <span
                className={cn(
                  "ml-2.5 whitespace-nowrap text-sm font-medium",
                  active ? "text-ink" : "text-ink-muted"
                )}
              >
                {label}
                {done && <span className="sr-only"> (done)</span>}
              </span>
              {n < STEPS.length && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "mx-3 h-px flex-1 transition-colors duration-300",
                    done ? "bg-munsell_blue" : "bg-line-strong"
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
