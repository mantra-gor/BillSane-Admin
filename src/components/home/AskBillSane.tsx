import { Sparkles } from "lucide-react";
import Badge from "@/components/ui/Badge";

// Example questions only. The assistant is in development, so the page shows
// what an owner will be able to ask, never an invented answer.
const questions = [
  "Which items sold the most over the holiday season?",
  "Which regulars haven't come in this month?",
  "How much tax should I keep aside this quarter?",
  "What should I reorder before the weekend?",
];

export default function AskBillSane() {
  return (
    <div className="rounded-2xl bg-shell-raised p-6 shadow-[inset_0_0_0_1px_var(--color-shell-border)] sm:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex size-9 items-center justify-center rounded-xl bg-munsell_blue/20 text-munsell_blue-400">
          <Sparkles size={18} aria-hidden="true" />
        </span>
        <h3 className="text-2xl font-semibold text-white">Ask BillSane</h3>
        <Badge tone="on-dark" dot>
          Coming soon
        </Badge>
      </div>
      <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/70">
        An AI assistant that reads your own sales, stock and customers, and
        answers in plain language. Ask about patterns you&apos;d never have time
        to dig out of the books yourself.
      </p>
      <p className="mt-6 text-[13px] font-medium text-white/55">You&apos;ll be able to ask</p>
      <ul className="mt-3 flex flex-col gap-2.5">
        {questions.map((q) => (
          <li
            key={q}
            className="w-fit max-w-full rounded-2xl rounded-bl-md bg-white/[0.07] px-4 py-2.5 text-[15px] text-white/90 shadow-[inset_0_0_0_1px_rgb(255_255_255_/_0.08)]"
          >
            {q}
          </li>
        ))}
      </ul>
    </div>
  );
}
