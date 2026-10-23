import type { ReactNode } from "react";
import LedgerList, { type LedgerItem } from "@/components/home/LedgerList";
import { Container } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

const TONES = {
  canvas: "bg-canvas",
  surface: "bg-surface",
  shell: "bg-shell",
};

interface FeatureSectionProps {
  id: string;
  title: string;
  /** The everyday problem this part of BillSane takes away. */
  problem: string;
  items: LedgerItem[];
  /** One plain sentence on what changes for the business. */
  outcome: string;
  visual: ReactNode;
  tone?: keyof typeof TONES;
  /** Put the visual on the left on wide screens. */
  reverse?: boolean;
  children?: ReactNode;
}

/** One feature, told as problem, capabilities, outcome, with the real screen. */
export default function FeatureSection({
  id,
  title,
  problem,
  items,
  outcome,
  visual,
  tone = "canvas",
  reverse = false,
  children,
}: FeatureSectionProps) {
  const dark = tone === "shell";
  return (
    <section id={id} className={cn("scroll-mt-32 py-16 sm:py-24", TONES[tone])}>
      <Container>
        <header className="max-w-2xl">
          <h2
            className={cn(
              "text-[2rem] font-semibold leading-[1.05] sm:text-[2.75rem]",
              dark ? "text-white" : "text-ink"
            )}
          >
            {title}
          </h2>
          <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", dark ? "text-white/70" : "text-ink-muted")}>
            {problem}
          </p>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-14">
          <div className={cn(reverse && "lg:order-2")}>
            <LedgerList items={items} tone={dark ? "dark" : "light"} />
            <p
              className={cn(
                "mt-6 rounded-xl px-5 py-4 text-[15px] leading-relaxed",
                dark
                  ? "bg-white/[0.06] text-white/85 shadow-[inset_0_0_0_1px_rgb(255_255_255_/_0.1)]"
                  : "bg-munsell_blue-5 text-munsell_blue-800 shadow-[inset_0_0_0_1px_var(--color-munsell_blue-50)]"
              )}
            >
              <span className="font-semibold">What it means for you: </span>
              {outcome}
            </p>
          </div>
          <div className={cn("lg:sticky lg:top-36", reverse && "lg:order-1")}>{visual}</div>
        </div>
        {children}
      </Container>
    </section>
  );
}
