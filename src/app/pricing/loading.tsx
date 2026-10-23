import Section, { SectionHeading } from "@/components/ui/Section";
import { PlanGridSkeleton } from "@/components/pricing/PlanSkeleton";

export default function PricingLoading() {
  return (
    <Section>
      <div data-hero>
        <SectionHeading
          as="h1"
          align="center"
          title="One payment. Yours for life."
          description="Choose the plan that fits your business. No subscriptions and nothing to renew: pay once and keep your license."
        />
        <p className="mt-5 text-center text-sm text-ink-muted">
          Desktop app for macOS, Windows and Linux
        </p>
      </div>

      <div className="mt-12">
        <PlanGridSkeleton />
      </div>
    </Section>
  );
}
