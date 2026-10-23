import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface LedgerItem {
  title: ReactNode;
  body: ReactNode;
}

/**
 * Feature points set like lines on a bill: a bold entry, its detail, and a
 * perforation between rows. Used instead of a grid of icon cards.
 */
export default function LedgerList({
  items,
  tone = "light",
  className,
}: {
  items: LedgerItem[];
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <ul className={cn("flex flex-col", className)}>
      {items.map((item, i) => (
        <li key={i}>
          {i > 0 && (
            <div
              role="presentation"
              className={cn("rule-perforated", dark ? "text-white" : "text-ink")}
            />
          )}
          <div className="py-5">
            <p className={cn("text-base font-semibold", dark ? "text-white" : "text-ink")}>
              {item.title}
            </p>
            <p
              className={cn(
                "mt-1.5 text-[15px] leading-relaxed",
                dark ? "text-white/70" : "text-ink-muted"
              )}
            >
              {item.body}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
