import Link from "next/link";
import { Check } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { formatPrice, savingPercent } from "@/lib/utils";

export interface ChosenPlan {
  id: number;
  name: string;
  price: string;
  originalPrice: string;
}

/** The plan carried over from /pricing, kept in view for the whole flow. */
export default function PlanSummary({
  plan,
  loading,
  locked = false,
}: {
  plan: ChosenPlan | null;
  loading: boolean;
  /** After registration the plan can no longer be swapped from here. */
  locked?: boolean;
}) {
  return (
    <section
      aria-label="Your plan"
      className="rounded-2xl bg-surface p-6 shadow-card"
    >
      {loading ? (
        <div className="space-y-3" aria-hidden="true">
          <div className="h-4 w-24 rounded bg-surface-sunken" />
          <div className="h-9 w-40 rounded bg-surface-sunken" />
          <div className="h-4 w-48 rounded bg-surface-sunken" />
        </div>
      ) : plan ? (
        <>
          <div className="flex items-center justify-between gap-3">
            <p className="text-[13px] font-semibold text-ink-soft">Your plan</p>
            {!locked && (
              <Link
                href="/pricing"
                className="text-[13px] font-semibold text-munsell_blue-700 underline-offset-4 hover:underline"
              >
                Change
              </Link>
            )}
          </div>
          <p className="mt-2 text-xl font-semibold text-ink">{plan.name}</p>
          <p className="tnum mt-3 font-display text-4xl font-semibold tracking-[-0.02em] text-ink [font-stretch:92%]">
            {formatPrice(plan.price)}
          </p>
          <p className="mt-1.5 flex flex-wrap items-center gap-2 text-sm text-ink-muted">
            One-time payment · lifetime license
            {savingPercent(plan.price, plan.originalPrice) !== null && (
              <Badge tone="success">
                Save {savingPercent(plan.price, plan.originalPrice)}%
              </Badge>
            )}
          </p>
        </>
      ) : (
        <>
          <p className="text-[13px] font-semibold text-ink-soft">Your plan</p>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">
            You haven&apos;t chosen a plan yet. Pick one before you pay.
          </p>
          <ButtonLink
            href="/pricing"
            variant="secondary"
            size="sm"
            className="mt-4"
          >
            Choose a plan
          </ButtonLink>
        </>
      )}

      <div role="presentation" className="rule-perforated my-5 text-ink" />
      <ul className="space-y-2.5 text-sm text-ink-soft">
        {[
          "Your license key as soon as you pay",
          "Desktop app for macOS, Windows and Linux",
        ].map((line) => (
          <li key={line} className="flex items-start gap-2.5">
            <Check
              size={16}
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-munsell_blue"
            />
            {line}
          </li>
        ))}
      </ul>
    </section>
  );
}
