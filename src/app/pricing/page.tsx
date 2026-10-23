import { Suspense } from "react";
import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import Link from "next/link";
import Faq, { type FaqItem } from "@/components/ui/Faq";
import { type Plan } from "@/components/pricing/PlanCard";
import PlanGrid from "@/components/pricing/PlanGrid";
import { PlanGridSkeleton } from "@/components/pricing/PlanSkeleton";
import { ButtonLink } from "@/components/ui/Button";
import Section, { SectionHeading } from "@/components/ui/Section";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Pricing | BillSane",
  description:
    "Choose a BillSane plan. One payment, a lifetime license, and the desktop app for macOS, Windows and Linux.",
};

// Cache and revalidate plans periodically (every 5 minutes) rather than hitting
// the database synchronously on every request.
export const revalidate = 300;

type PlansResult = { status: "ok"; plans: Plan[] } | { status: "error" };

const getCachedPlans = unstable_cache(
  async () => {
    return prisma.plan.findMany({ where: { isActive: true } });
  },
  ["pricing-plans-list"],
  {
    revalidate: 300,
    tags: ["plans"],
  }
);

async function getPlans(): Promise<PlansResult> {
  try {
    const plans = await getCachedPlans();
    return {
      status: "ok",
      plans: [...plans].sort((a, b) => Number(a.price) - Number(b.price)),
    };
  } catch (error) {
    console.error("Pricing: could not load plans", error);
    return { status: "error" };
  }
}

const faq: FaqItem[] = [
  {
    q: "Is this a subscription?",
    a: "No. You pay once and the license is yours for life. There is nothing to renew.",
  },
  {
    q: "What do I get after I pay?",
    a: "Your license key and the BillSane download for macOS, Windows or Linux.",
  },
  {
    q: "How do I pay?",
    a: "Securely online through Razorpay, after you register your business.",
  },
  {
    q: "Can I talk to someone before I buy?",
    a: "Yes. Reach our team from the support page and we'll help you choose the right plan.",
  },
];

function Notice({ title, body }: { title: string; body: string }) {
  return (
    <div className="mx-auto max-w-lg rounded-2xl bg-surface p-8 text-center shadow-card">
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{body}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/pricing" variant="primary">
          Try again
        </ButtonLink>
        <ButtonLink href="/support" variant="secondary">
          Contact support
        </ButtonLink>
      </div>
    </div>
  );
}

async function PlansContainer() {
  const result = await getPlans();

  if (result.status === "error") {
    return (
      <Notice
        title="We couldn't load the plans"
        body="Something went wrong on our side. Please try again in a moment."
      />
    );
  }

  if (result.status === "ok" && result.plans.length === 0) {
    return (
      <Notice
        title="Plans are being updated"
        body="New plans will be here shortly. If you'd like to buy now, our team can help."
      />
    );
  }

  return <PlanGrid plans={result.plans} />;
}

export default function PricingPage() {
  return (
    <>
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
          <Suspense fallback={<PlanGridSkeleton />}>
            <PlansContainer />
          </Suspense>
        </div>
      </Section>

      <Section tone="surface">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <SectionHeading
            title="Questions before you buy"
            description={
              <>
                Not sure which plan fits?{" "}
                <Link
                  href="/support"
                  className="font-medium text-munsell_blue-700 underline underline-offset-4"
                >
                  Talk to our team
                </Link>
                .
              </>
            }
            className="lg:sticky lg:top-24 lg:self-start"
          />
          <Faq items={faq} onSurface />
        </div>
      </Section>
    </>
  );
}
