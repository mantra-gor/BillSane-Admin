import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import RequestedPath from "@/components/not-found/RequestedPath";

export const metadata: Metadata = {
  title: "Page not found | BillSane",
};

const ROWS = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Support", href: "/support" },
];

const OVERLINE =
  "text-[11px] font-bold uppercase tracking-[0.07em] text-ink-muted";

export default function NotFound() {
  return (
    <section data-hero className="overflow-x-clip bg-canvas">
      <Container className="grid min-h-[calc(100svh-4rem)] items-center gap-14 py-14 sm:py-20 lg:grid-cols-[1fr_minmax(0,26rem)] lg:gap-24">
        <div className="min-w-0 max-w-xl">
          <h1 className="text-[clamp(2.75rem,6vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-ink text-balance">
            This page isn&rsquo;t on the books.
          </h1>
          <p className="mt-5 max-w-[48ch] text-base leading-relaxed text-ink-muted">
            The link may be old, or the address mistyped. Nothing was charged
            and nothing is lost, so head back and pick up where you left off.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink
              href="/"
              variant="accent"
              size="lg"
              trailing={<ArrowRight size={16} aria-hidden />}
            >
              Back to home
            </ButtonLink>
            <ButtonLink href="/pricing" variant="secondary" size="lg">
              See pricing
            </ButtonLink>
          </div>
        </div>

        <div className="mx-auto w-full min-w-0 max-w-sm drop-shadow-[0_2px_3px_rgb(12_34_49_/_0.06)] drop-shadow-[0_14px_20px_rgb(12_34_49_/_0.1)] lg:mx-0 lg:-rotate-[1.5deg]">
          <div className="bill-paper bill-print rounded-b-2xl bg-surface px-6 pb-7 pt-9 text-sm">
            <div className="flex items-start justify-between gap-4">
              <p className={OVERLINE}>Lookup receipt</p>
              <span className="rounded-full bg-danger-soft px-2 py-0.5 text-[11px] font-semibold text-danger-ink">
                Not found
              </span>
            </div>
            <p
              className="tnum mt-3 font-[family-name:var(--font-anek)] text-[5.5rem] font-semibold leading-[0.9] tracking-[-0.02em] text-ink"
              style={{ fontVariationSettings: "'wdth' 92" }}
            >
              404
            </p>

            <div className="rule-perforated my-5 text-ink" />

            <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-6 gap-y-2.5">
              <dt className="text-ink-muted">Requested</dt>
              <dd className="text-right">
                <RequestedPath />
              </dd>
              <dt className="text-ink-muted">Amount due</dt>
              <dd className="tnum text-right font-semibold text-ink">0.00</dd>
            </dl>

            <div className="rule-perforated my-5 text-ink" />

            <p className={OVERLINE}>Try one of these</p>
            <ul className="mt-1">
              {ROWS.map((row) => (
                <li key={row.href}>
                  <Link
                    href={row.href}
                    className="group flex h-11 items-center justify-between rounded-md font-semibold text-ink transition-colors duration-150 ease-snap hover:text-munsell_blue-700"
                  >
                    {row.label}
                    <ArrowRight
                      size={16}
                      aria-hidden
                      className="text-ink-faint transition-transform duration-150 ease-snap group-hover:translate-x-0.5 group-hover:text-munsell_blue-700"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
