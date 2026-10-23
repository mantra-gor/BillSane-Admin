import type { ReactNode } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FaqItem {
  q: string;
  a: ReactNode;
}

/**
 * Native disclosures: keyboard and screen-reader friendly with no script.
 * `onSurface` re-tints the card for use on a white band instead of the canvas.
 */
export default function Faq({
  items,
  onSurface = false,
}: {
  items: FaqItem[];
  onSurface?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl px-5 sm:px-8",
        onSurface ? "bg-canvas shadow-ring" : "bg-surface shadow-card"
      )}
    >
      {items.map((item, i) => (
        <details key={item.q} className="group border-line [&:not(:first-child)]:border-t" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-base font-semibold text-ink [&::-webkit-details-marker]:hidden">
            {item.q}
            <Plus
              size={18}
              aria-hidden="true"
              className="shrink-0 text-ink-muted transition-transform duration-200 ease-snap group-open:rotate-45"
            />
          </summary>
          <div className="-mt-1 max-w-[68ch] pb-6 text-[15px] leading-relaxed text-ink-muted">
            {item.a}
          </div>
        </details>
      ))}
    </div>
  );
}
