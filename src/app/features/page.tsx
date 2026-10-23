import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import AskBillSane from "@/components/home/AskBillSane";
import Kbd from "@/components/home/Kbd";
import DayTimeline from "@/components/features/DayTimeline";
import FeatureNav, { type NavItem } from "@/components/features/FeatureNav";
import FeatureSection from "@/components/features/FeatureSection";
import ShotWithDetail from "@/components/features/ShotWithDetail";
import { ButtonLink } from "@/components/ui/Button";
import ProductShot from "@/components/ui/ProductShot";
import Section, { Container, SectionHeading } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Features | BillSane",
  description:
    "Billing, customers, inventory, sales records, insights and team access in one simple desktop app. See how each part saves you time and helps you run your business.",
};

const nav: NavItem[] = [
  { id: "billing", label: "Billing" },
  { id: "customers", label: "Customers" },
  { id: "inventory", label: "Inventory" },
  { id: "sales", label: "Sales records" },
  { id: "insights", label: "Insights" },
  { id: "team", label: "Team & control" },
];

const shortcut = (key: string) => (
  <span className="inline-flex gap-1">
    <Kbd>Ctrl</Kbd>
    <Kbd>{key}</Kbd>
  </span>
);

export default function FeaturesPage() {
  return (
    <>
      {/* Overview */}
      <section data-hero className="bg-canvas pb-14 pt-12 sm:pb-20 sm:pt-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-[2.75rem] font-semibold leading-[1.02] text-ink sm:text-6xl">
              Everything your business needs. Nothing it doesn&apos;t.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
              BillSane brings billing, customers, inventory, sales records and
              insights together in one simple app. Here&apos;s how each part
              saves you time and helps you make better decisions.
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
              <ButtonLink href="#billing" variant="secondary" size="lg">
                Explore the features
              </ButtonLink>
            </div>
          </div>

          <div className="mt-14 sm:mt-16">
            <h2 className="font-sans text-base font-semibold tracking-normal text-ink">
              How BillSane fits your day
            </h2>
            <div className="mt-4">
              <DayTimeline />
            </div>
          </div>
        </Container>
      </section>

      <FeatureNav items={nav} />

      <FeatureSection
        id="billing"
        tone="surface"
        title="Serve the next customer faster"
        problem="When there's a queue at the counter, every second spent hunting for a price or retyping a name is a customer kept waiting."
        items={[
          {
            title: "One screen for every bill",
            body: "Customer, items, discount, payment and total sit together, and the totals update as you type.",
          },
          {
            title: "Regulars recognised by phone",
            body: "Type a phone number and their name, visits and spend appear. One key puts them on the bill.",
          },
          {
            title: "Items find themselves",
            body: "Search your list by name or code. Something new? It's saved to your inventory with the bill.",
          },
          {
            title: "Cash, card or UPI, then print",
            body: "Choose how they paid and print a tax invoice with your logo, business details and tax number.",
          },
          {
            title: "Built for speed when you want it",
            body: (
              <span className="flex flex-wrap items-center gap-x-2 gap-y-2">
                {shortcut("N")} new bill{" "}
                <span className="text-line-strong">·</span>
                {shortcut("K")} jump anywhere{" "}
                <span className="text-line-strong">·</span>
                {shortcut("P")} print
                <span className="text-ink-faint">(⌘ on Mac)</span>
              </span>
            ),
          },
        ]}
        outcome="Shorter queues, fewer mistakes, and bills your customers can trust."
        visual={
          <ShotWithDetail
            title="BillSane · New Invoice"
            shot={{
              src: "/screens/new-invoice.webp",
              alt: "The New Invoice screen with a returning customer linked by phone, three items with tax, and UPI selected.",
              width: 1800,
              height: 1125,
            }}
            detail={{
              src: "/screens/bill.webp",
              alt: "The printed tax invoice: business details and tax number, four items with tax per line, and the total.",
              width: 900,
              height: 952,
            }}
            detailWidth="w-[38%]"
          />
        }
      />

      <FeatureSection
        id="customers"
        reverse
        title="Know your regulars by name"
        problem="Your regulars are the heart of your business. Remembering who they are, what they spend and when they last came in shouldn't depend on memory."
        items={[
          {
            title: "Saved with their first bill",
            body: "There's no separate customer form. Bill someone once and they're in your customer list.",
          },
          {
            title: "Their whole history in one row",
            body: "How many bills, how much they've spent and when they last visited, for every customer.",
          },
          {
            title: "Repeat customers and lifetime value",
            body: "See how many customers come back and what they're worth to your business, at a glance.",
          },
          {
            title: "Found in a second",
            body: "Search by name, phone number or email, from the customer list or right at the counter.",
          },
        ]}
        outcome="Treat regulars like regulars, and notice when one stops coming in."
        visual={
          <ShotWithDetail
            title="BillSane · Customers"
            shot={{
              src: "/screens/customers.webp",
              alt: "The Customers screen: 16 customers, repeat customers and lifetime value, with each customer's bills, total spent and last visit.",
              width: 1800,
              height: 813,
            }}
            detail={{
              src: "/screens/customer-found.webp",
              alt: "A regular found by phone number on a new bill, with 15 invoices and their last visit.",
              width: 1100,
              height: 399,
            }}
          />
        }
      />

      <FeatureSection
        id="inventory"
        tone="surface"
        title="Always know what's on the shelf"
        problem="Running out of a best-seller loses sales. Over-ordering ties up money. Both come from not knowing exactly what you have."
        items={[
          {
            title: "Stock that keeps itself up to date",
            body: "Every bill takes stock off the shelf, so the numbers match what's really there.",
          },
          {
            title: "A low-stock mark for every item",
            body: "Set the level you never want to drop below, and BillSane flags the item when it gets there.",
          },
          {
            title: "Products and services, each with its tax",
            body: "Every item carries its rate, tax and tax code. Services are never counted as stock.",
          },
          {
            title: "Bring your list from Excel, Google Sheets or Tally",
            body: "BillSane reads the columns you already use and shows every change before anything is saved. Bad rows are listed, and the rest still go in.",
          },
        ]}
        outcome="Restock before you run out, and stop money sitting on the shelf."
        visual={
          <div className="space-y-6">
            <ProductShot
              src="/screens/inventory.webp"
              alt="The Inventory screen: 26 items, 9 needing restocking and the total stock value, with each item's code, tax code, rate, stock and sales."
              width={1800}
              height={1125}
              title="BillSane · Inventory"
            />
            <ProductShot
              src="/screens/import-preview.webp"
              alt="The import check: 23 rows read from a price list, with 4 new items, 5 updates, 13 unchanged and 1 problem, before anything is saved."
              width={1800}
              height={1125}
              title="BillSane · Import items"
            />
          </div>
        }
      />

      <FeatureSection
        id="sales"
        reverse
        title="Every bill, ready when you need it"
        problem="A customer wants a copy of last month's bill. Your accountant wants totals. Neither should mean digging through a drawer of paper."
        items={[
          {
            title: "Find any bill in seconds",
            body: "Search by bill number, customer name or phone number.",
          },
          {
            title: "Filter by date and payment",
            body: "Narrow down to a day, a month or any range, and to cash, card or UPI.",
          },
          {
            title: "Totals that add themselves up",
            body: "The number of bills, revenue and tax collected for whatever you've filtered.",
          },
          {
            title: "Reopen and reprint",
            body: "Open any past bill exactly as it was issued, and print it again.",
          },
        ]}
        outcome="Answers in seconds, for your customers and for your accountant."
        visual={
          <ProductShot
            src="/screens/sales.webp"
            alt="The Sales screen: 176 bills with total revenue and tax collected, filters for search, payment type and dates, and a list of recent bills."
            width={1800}
            height={813}
            title="BillSane · Sales"
          />
        }
      />

      <FeatureSection
        id="insights"
        tone="shell"
        title="Know what to do next, not just what happened"
        problem="Reports tell you what already happened. BillSane reads your own sales and stock and points to what needs your attention today."
        items={[
          {
            title: "Alerts worth acting on",
            body: "Items to restock, regulars who've gone quiet, stock that isn't moving, a change in revenue, and tax to set aside.",
          },
          {
            title: "The numbers that matter",
            body: "Revenue, bills, tax collected, average bill, repeat rate and what each customer is worth, against the previous period.",
          },
          {
            title: "Trends from a week to a year",
            body: "Sales over time, how customers pay, your top items and your top customers.",
          },
          {
            title: "A reorder list that thinks ahead",
            body: "Items running low, with how many days of stock are left at the rate you're selling.",
          },
        ]}
        outcome="Spend your time on decisions, not on adding up numbers."
        visual={
          <div className="space-y-8">
            <ProductShot
              src="/screens/dashboard-alerts.webp"
              alt="The dashboard: alerts that 9 items need restocking, 2 regulars have gone quiet, stock isn't moving and tax to set aside, above revenue, bills, tax and average bill."
              width={1800}
              height={556}
              title="BillSane · Dashboard"
              onDark
            />
            <AskBillSane />
          </div>
        }
      />

      <FeatureSection
        id="team"
        title="Give your team access, keep control"
        problem="You can't be at the counter every hour. The people you trust need to bill, without being able to change what they shouldn't."
        items={[
          {
            title: "A role for everyone",
            body: "Start with Administrator, Manager, Cashier and Accountant, or create your own and choose exactly what each can see and change.",
          },
          {
            title: "Cashiers bill, owners decide",
            body: "A cashier can create bills without repricing items. An accountant can read the books without editing them.",
          },
          {
            title: "You add every account",
            body: "There's no open sign-up. Give someone a temporary password and they choose their own when they first sign in.",
          },
          {
            title: "Suspend, don't lose history",
            body: "When someone leaves, suspend their account. Their bills stay on record with their name.",
          },
        ]}
        outcome="Hand over the counter with confidence."
        visual={
          <ProductShot
            src="/screens/roles.webp"
            alt="Roles in Settings: Administrator, Manager, Cashier and Accountant, each with the permissions it allows."
            width={1800}
            height={1125}
            title="BillSane · Settings · Roles"
          />
        }
      />

      {/* Foundations */}
      <Section tone="surface">
        <SectionHeading
          title="Built to be relied on"
          description="The basics that keep BillSane out of your way."
        />
        <ul className="mt-10 grid gap-x-10 md:grid-cols-3">
          {[
            [
              "Runs on the computer you have",
              "A desktop app for macOS, Windows and Linux.",
            ],
            [
              "Keeps billing when the internet drops",
              "Your bills and stock are saved on your computer as you work.",
            ],
            [
              "Your business on every bill",
              "Your logo, address and tax number print on each invoice.",
            ],
          ].map(([title, body]) => (
            <li key={title}>
              <div role="presentation" className="rule-perforated text-ink" />
              <p className="pt-5 text-base font-semibold text-ink">{title}</p>
              <p className="mb-6 mt-1.5 text-[15px] leading-relaxed text-ink-muted">
                {body}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Close */}
      <Section>
        <div className="rounded-[28px] bg-surface px-6 py-12 text-center shadow-card sm:px-12 sm:py-16">
          <h2 className="mx-auto max-w-2xl text-[2rem] font-semibold leading-[1.05] text-ink sm:text-[2.75rem]">
            Ready to make billing the easy part of your day?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
            Choose a plan, pay once, and start billing with BillSane.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink
              href="/pricing"
              variant="accent"
              size="lg"
              trailing={<ArrowRight size={16} aria-hidden="true" />}
            >
              See plans
            </ButtonLink>
            <ButtonLink href="/support" variant="secondary" size="lg">
              Talk to us
            </ButtonLink>
          </div>
          <p className="mt-6 text-sm text-ink-muted">
            One-time payment · Lifetime license · macOS, Windows and Linux
          </p>
        </div>
      </Section>
    </>
  );
}
