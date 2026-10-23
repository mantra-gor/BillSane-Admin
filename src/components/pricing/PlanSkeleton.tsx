import { cn } from "@/lib/utils";

/**
 * Skeleton placeholder for an individual pricing plan card.
 * Mirrors PlanCard's exact structure, padding, and visual hierarchy.
 */
export function PlanCardSkeleton({ isPopular = false }: { isPopular?: boolean }) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-2xl bg-surface p-6 shadow-card transition-shadow duration-200 ease-snap sm:p-8 animate-pulse",
        isPopular && "ring-2 ring-munsell_blue/40"
      )}
    >
      <header className="flex items-center justify-between gap-3">
        <div className="h-7 w-32 rounded-lg bg-surface-sunken" />
        {isPopular && (
          <div className="h-6 w-24 rounded-full bg-munsell_blue-5" />
        )}
      </header>

      <div className="mt-3 space-y-2">
        <div className="h-4 w-full rounded bg-surface-muted" />
        <div className="h-4 w-3/4 rounded bg-surface-muted" />
      </div>

      <div className="mt-8">
        <div className="flex items-baseline gap-3">
          <div className="h-12 w-36 rounded-lg bg-surface-sunken" />
          <div className="h-5 w-20 rounded bg-surface-muted" />
        </div>
        <div className="mt-3 flex items-center gap-2">
          <div className="h-4 w-44 rounded bg-surface-muted" />
          {isPopular && <div className="h-5 w-16 rounded-full bg-surface-sunken" />}
        </div>
      </div>

      <div className="mt-6">
        <div className="h-10 w-full rounded-full bg-surface-sunken" />
      </div>

      <div role="presentation" className="rule-perforated my-7 text-ink opacity-40" />

      <ul className="flex flex-col gap-3.5">
        {[85, 65, 90, 75, 55].map((width, idx) => (
          <li key={idx} className="flex items-center gap-3">
            <div className="size-4 shrink-0 rounded-full bg-surface-sunken" />
            <div
              className="h-4 rounded bg-surface-muted"
              style={{ width: `${width}%` }}
            />
          </li>
        ))}
      </ul>
    </article>
  );
}

/**
 * Skeleton grid matching PlanGrid's responsive layout and column sizing.
 */
export function PlanGridSkeleton({ count = 3 }: { count?: number }) {
  const minColumn = count >= 4 ? 250 : 300;
  return (
    <ul
      className="mx-auto grid gap-5"
      style={{
        maxWidth: `${Math.min(count, 4) * (count >= 4 ? 300 : 400)}px`,
        gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${minColumn}px), 1fr))`,
      }}
      aria-busy="true"
      aria-label="Loading pricing plans"
    >
      {Array.from({ length: count }).map((_, i) => (
        <li key={i}>
          <PlanCardSkeleton isPopular={i === 1} />
        </li>
      ))}
    </ul>
  );
}

export default PlanGridSkeleton;
