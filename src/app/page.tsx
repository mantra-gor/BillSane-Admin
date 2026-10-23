import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AskBillSane from "@/components/home/AskBillSane";
import Faq, { type FaqItem } from "@/components/ui/Faq";
import HeroStack from "@/components/home/HeroStack";
import Kbd from "@/components/home/Kbd";
import LedgerList from "@/components/home/LedgerList";
import { ButtonLink } from "@/components/ui/Button";
import ProductShot from "@/components/ui/ProductShot";
import Section, { Container, SectionHeading } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "BillSane | Less time learning software. More time running your business.",
  description:
    "Everyday billing, inventory and business insights in one simple, intuitive desktop app. Tax-ready invoices, one-time payment, lifetime license.",
  openGraph: {
    title: "BillSane",
    description: "Less time learning software. More time running your business.",
    images: [{ url: "/screens/new-invoice.webp", width: 1800, height: 1125 }],
  },
};

const faq: FaqItem[] = [
  {
    q: "How long does it take to learn BillSane?",
    a: "If you can write a bill by hand, you can make one in BillSane. Type the customer's phone number, pick the items, choose how they paid, and print. Everything for a bill is on one screen, and keyboard shortcuts are there when you want to go faster.",
  },
  {
    q: "Does it handle sales tax, GST and VAT?",
    a: "Every item carries its own tax type and rate, every bill shows the tax on each line, and the dashboard shows how much tax you've collected for the period so you can set it aside. BillSane works with GST and VAT.",
  },
  {
    q: "Can I bring my existing item list?",
    a: "Yes. Save your list from Excel, Google Sheets or a Tally export as a CSV file and import it. BillSane understands the column names people actually use, like Particulars, Qty, Tax % and UOM, and shows you exactly what will change before anything is saved.",
  },
  {
    q: "Can my staff use it too?",
    a: "Yes. Add an account for each person and give them a role. A cashier can create bills without being able to change prices, an accountant can read the books without editing them, and you decide what every role is allowed to do.",
  },
  {
    q: "Which computers does it run on?",
    a: "BillSane is a desktop app for macOS, Windows and Linux. It runs on the computer at your counter and keeps billing even if your internet connection drops.",
  },
  {
    q: "How does the license work?",
    a: "You pay once and the license is yours for life. Choose a plan, register your business and pay securely through Razorpay, then you'll get your license key and the download for your computer.",
  },
  {
    q: "When will Ask BillSane be available?",
    a: "The AI assistant is in development. When it launches, you'll be able to ask questions about your sales, stock and customers in plain language.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section data-hero className="overflow-hidden bg-canvas pb-16 pt-12 sm:pb-24 sm:pt-20">
        <Container className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
          <div className="max-w-xl">
            <h1 className="text-[2.75rem] font-semibold leading-[1.02] text-ink sm:text-6xl">
              <span className="text-ink-muted">Less time learning software.</span>{" "}
              More time running your business.
            </h1>
            <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-ink-soft">
              You have customers to serve, sales to manage, and a business to
              grow. Get everything you need for everyday billing in one simple,
              intuitive solution.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink
                href="/pricing"
                variant="accent"
                size="lg"
                trailing={<ArrowRight size={16} aria-hidden="true" />}
              >
                Get started
              </ButtonLink>
              <ButtonLink href="#how-it-works" variant="secondary" size="lg">
                See how it works
              </ButtonLink>
            </div>
            <p className="mt-6 text-sm text-ink-muted">
              One-time payment · Lifetime license · macOS, Windows and Linux
            </p>
          </div>
          <HeroStack />
        </Container>
      </section>

      {/* Billing */}
      <Section tone="surface" id="how-it-works" className="scroll-mt-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              title="Billing you already know how to use"
              description="No training days, no manuals. If you can write a bill by hand, you can make one in BillSane."
            />
            <LedgerList
              className="mt-8"
              items={[
                {
                  title: "Regulars fill themselves in",
                  body: "Type a phone number and BillSane finds the customer, with their visits and what they've spent.",
                },
                {
                  title: "New items are added as you bill",
                  body: "Sell something that isn't in your list yet and it's saved to your inventory with the bill.",
                },
                {
                  title: "Cash, card or UPI, then print",
                  body: "Choose how they paid on the same screen and print a tax invoice with your business and tax details on it.",
                },
                {
                  title: "Shortcuts when you're quick",
                  body: (
                    <span className="flex flex-wrap items-center gap-x-2 gap-y-2">
                      <span className="inline-flex gap-1">
                        <Kbd>Ctrl</Kbd>
                        <Kbd>N</Kbd>
                      </span>
                      new bill
                      <span className="mx-1 text-line-strong">·</span>
                      <span className="inline-flex gap-1">
                        <Kbd>Ctrl</Kbd>
                        <Kbd>K</Kbd>
                      </span>
                      jump anywhere
                      <span className="text-ink-faint">(⌘ on Mac)</span>
                    </span>
                  ),
                },
              ]}
            />
          </div>
          <div className="rounded-[20px] bg-canvas p-3 shadow-ring sm:p-5">
            <Image
              src="/screens/customer-found.webp"
              alt="The customer panel on a new bill: typing 9876500105 finds Meera Iyer, with 15 invoices, ₹5,500 spent and a last visit on 21 October."
              width={1100}
              height={399}
              className="h-auto w-full rounded-xl shadow-card"
              sizes="(min-width: 1024px) 560px, 100vw"
            />
            <p className="mt-4 px-1 text-sm text-ink-muted">
              A regular walks in. One phone number later, their details are on the bill.
            </p>
          </div>
        </div>
      </Section>

      {/* Inventory */}
      <Section>
        <SectionHeading
          title="Inventory that keeps up with the counter"
          description="Every bill takes stock off the shelf, so you always know what's left, what's running low, and what it's worth."
        />
        <ProductShot
          className="mt-10"
          src="/screens/inventory.webp"
          alt="BillSane's Inventory screen: 26 items, 9 needing restocking and ₹1,20,287 of stock value, with each item's code, HSN, rate, stock and revenue."
          width={1800}
          height={1125}
          title="BillSane · Inventory"
        />
        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
          <div>
            <h3 className="text-[1.75rem] font-semibold leading-tight text-ink sm:text-[2rem]">
              Bring your item list with you
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
              Import from Excel, Google Sheets or a Tally export. BillSane reads
              the columns you already use and shows every change before
              anything is saved.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Column names BillSane recognises">
              {["Particulars", "Item Name", "Qty", "Rate", "Tax %", "UOM", "Reorder Level"].map(
                (col) => (
                  <li
                    key={col}
                    className="rounded-full bg-surface px-3 py-1 text-[13px] font-medium text-ink-soft shadow-ring"
                  >
                    {col}
                  </li>
                )
              )}
            </ul>
            <LedgerList
              className="mt-6"
              items={[
                {
                  title: "Re-import as often as you like",
                  body: "Items are matched by code or name, so a corrected sheet updates what changed and leaves the rest alone.",
                },
                {
                  title: "One bad row doesn't stop the rest",
                  body: "Problem rows are listed with their line number in your file, and the good rows still go in.",
                },
              ]}
            />
          </div>
          <ProductShot
            src="/screens/import-preview.webp"
            alt="The import check before saving: 23 rows read from a price list, 4 new items, 5 updates, 13 unchanged and 1 problem."
            width={1800}
            height={1125}
            title="BillSane · Import items"
          />
        </div>
      </Section>

      {/* Insights + AI */}
      <Section tone="shell">
        <SectionHeading
          className="[&_h2]:text-white [&_p]:text-white/70"
          title="Know what to do next, not just what happened"
          description="BillSane reads your own sales and stock and tells you what needs your attention today."
        />
        <ProductShot
          className="mt-10"
          src="/screens/dashboard-alerts.webp"
          alt="BillSane's dashboard: alerts that 9 items need restocking, 2 regulars have gone quiet, ₹36,255 of stock isn't moving and GST to set aside, above revenue, invoice and tax totals."
          width={1800}
          height={556}
          title="BillSane · Dashboard"
          onDark
        />
        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <LedgerList
            tone="dark"
            items={[
              {
                title: "What to restock, before it runs out",
                body: "Low and out-of-stock items, with how many days of stock are left at the rate you're selling.",
              },
              {
                title: "Regulars who've gone quiet",
                body: "Customers who used to come often and haven't been in for two months, worth a phone call.",
              },
              {
                title: "Money sitting on the shelf",
                body: "Stock that hasn't sold all period, and exactly how much it's worth.",
              },
              {
                title: "Revenue, repeat customers and tax",
                body: "Compared with the previous period, plus the tax you've collected to set aside for filing.",
              },
            ]}
          />
          <AskBillSane />
        </div>
      </Section>

      {/* Ways of working */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-16">
          <ProductShot
            src="/screens/roles.webp"
            alt="BillSane's Roles settings: Administrator, Manager, Cashier and Accountant, each with the permissions it allows."
            width={1800}
            height={1125}
            title="BillSane · Settings · Roles"
            className="lg:order-1"
          />
          <div className="lg:order-2">
            <SectionHeading
              title="Built for the way you work"
              description="Your team, your records and your counter, set up the way your business runs."
            />
            <LedgerList
              className="mt-8"
              items={[
                {
                  title: "A role for everyone on your team",
                  body: "Cashiers bill without changing prices, accountants read without editing, and you decide what each role can do.",
                },
                {
                  title: "Every bill on record",
                  body: "Find any invoice by number, customer name or phone, and filter by date or payment method.",
                },
                {
                  title: "Runs on the computer you have",
                  body: "A desktop app for macOS, Windows and Linux that keeps billing even when the internet drops.",
                },
              ]}
            />
          </div>
        </div>
      </Section>

      {/* Steps */}
      <Section tone="surface">
        <SectionHeading
          title="From payment to your first bill"
          description="Three steps from choosing a plan to printing your first bill."
        />
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["Choose your plan", "Pick the plan that fits your team. You pay once and it's yours for life."],
            ["Register and pay", "Add your business details, then pay securely with Razorpay."],
            ["Install and start billing", "Get your license key, download BillSane for your computer, and make your first bill."],
          ].map(([title, body], i) => (
            <li key={title} className="relative rounded-2xl bg-canvas p-6 shadow-ring">
              <span className="tnum font-display text-5xl font-semibold leading-none text-munsell_blue [font-stretch:92%]">
                {i + 1}
              </span>
              <div role="presentation" className="rule-perforated my-5 text-ink" />
              <h3 className="text-xl font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{body}</p>
            </li>
          ))}
        </ol>
      </Section>


      {/* FAQ */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <SectionHeading
            title="Questions owners ask us"
            description={
              <>
                Something else on your mind?{" "}
                <Link href="/support" className="font-medium text-munsell_blue-700 underline underline-offset-4">
                  Ask us on the support page
                </Link>
                .
              </>
            }
            className="lg:sticky lg:top-24 lg:self-start"
          />
          <Faq items={faq} />
        </div>
      </Section>
    </>
  );
}
