import { Check } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { cn, formatPrice, savingPercent } from "@/lib/utils";
import SelectPlanButton from "./SelectPlanButton";

export interface Plan {
  id: number;
  name: string;
  description: string | null;
  features: string[];
  price: string;
  originalPrice: string;
  isPopular: boolean;
}

/** One plan: the price and the action first, then everything it includes. */
export default function PlanCard({ plan }: { plan: Plan }) {
  const saving = savingPercent(plan.price, plan.originalPrice);

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-2xl bg-surface p-6 shadow-card transition-shadow duration-200 ease-snap hover:shadow-raised sm:p-8",
        plan.isPopular && "ring-2 ring-munsell_blue"
      )}
    >
      <header className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold text-ink">{plan.name}</h2>
        {plan.isPopular && (
          <Badge tone="accent" dot>
            Recommended
          </Badge>
        )}
      </header>
      {plan.description && (
        <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{plan.description}</p>
      )}

      <div className="mt-8">
        <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="tnum font-display text-5xl font-semibold tracking-[-0.02em] text-ink [font-stretch:92%]">
            {formatPrice(plan.price)}
          </span>
          {saving !== null && (
            <span className="tnum text-base text-ink-faint line-through">
              {formatPrice(plan.originalPrice)}
            </span>
          )}
        </p>
        <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm text-ink-muted">
          One-time payment · lifetime license
          {saving !== null && <Badge tone="success">Save {saving}%</Badge>}
        </p>
      </div>

      <div className="mt-6">
        <SelectPlanButton
          planId={plan.id}
          planName={plan.name}
          variant={plan.isPopular ? "accent" : "secondary"}
        />
      </div>

      <div role="presentation" className="rule-perforated my-7 text-ink" />

      <ul className="flex flex-col gap-3.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-[15px] leading-snug text-ink-soft">
            <Check size={18} aria-hidden="true" className="mt-px shrink-0 text-munsell_blue" />
            {feature}
          </li>
        ))}
      </ul>
    </article>
  );
}
