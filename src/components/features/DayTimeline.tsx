const moments = [
  {
    when: "Opening up",
    what: "Check the dashboard",
    body: "See what needs restocking, which regulars have gone quiet, and how this week compares with last.",
  },
  {
    when: "At the counter",
    what: "Bill without slowing down",
    body: "Type a regular's phone number, add the items, choose cash, card or UPI, and print.",
  },
  {
    when: "Closing time",
    what: "Know how the day went",
    body: "Filter today's bills by payment method and see the totals at a glance.",
  },
  {
    when: "Month end",
    what: "Hand over clean records",
    body: "Revenue and tax collected for any period, and every bill ready to reopen or reprint.",
  },
];

/** How BillSane fits an owner's day, as one ruled line from open to month end. */
export default function DayTimeline() {
  return (
    <ol className="grid gap-px overflow-hidden rounded-2xl bg-line shadow-card md:grid-cols-4">
      {moments.map((m, i) => (
        <li key={m.when} className="relative bg-surface p-6 sm:p-7">
          <div className="flex items-center gap-3">
            <span className="tnum inline-flex size-7 items-center justify-center rounded-full bg-prussian_blue text-[13px] font-semibold text-white">
              {i + 1}
            </span>
            <span className="text-[13px] font-semibold text-munsell_blue-700">{m.when}</span>
          </div>
          <h3 className="mt-5 text-xl font-semibold leading-snug text-ink">{m.what}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{m.body}</p>
        </li>
      ))}
    </ol>
  );
}
