import type { Metadata } from "next";
import { Mail, MessageCircle, Phone } from "lucide-react";
import FeatureNav, { type NavItem } from "@/components/features/FeatureNav";
import Faq, { type FaqItem } from "@/components/ui/Faq";
import { ButtonLink } from "@/components/ui/Button";
import ProductShot from "@/components/ui/ProductShot";
import Section, { Container, SectionHeading } from "@/components/ui/Section";
import {
  DEMO_MESSAGE,
  DEMO_SUBJECT,
  hasAnyChannel,
  hasEmail,
  hasPhone,
  hasWhatsApp,
  mailLink,
  phoneLink,
  support,
  whatsAppLink,
} from "@/lib/support";

export const metadata: Metadata = {
  title: "Support | BillSane",
  description:
    "Get help with your BillSane license, billing, inventory and team, or ask our team for a demo.",
};

const licenseFaq: FaqItem[] = [
  {
    q: "Where do I get my license key?",
    a: "When you register your business and pay, your license key appears on the last step. Copy it and keep it somewhere safe.",
  },
  {
    q: "Which computers does BillSane run on?",
    a: "BillSane is a desktop app for macOS, Windows and Linux. It runs on your own computer and keeps billing even if your internet connection drops.",
  },
  {
    q: "How many people can use my license?",
    a: "Your license is set up for the number of people you entered when you registered. If your team grows, contact us and we'll help.",
  },
  {
    q: "I can't find my license key.",
    a: "Contact us with your business name and the email address you registered with, and we'll help you.",
  },
];

const billingFaq: FaqItem[] = [
  {
    q: "How do I make a bill?",
    a: "Choose New Invoice (Ctrl+N, or ⌘N on a Mac). Type the customer's phone number, and a returning customer's details appear for you to use. Add the items, choose cash, card or UPI, and create the invoice. Then print it from the invoice screen.",
  },
  {
    q: "How do I reprint an old bill?",
    a: "Open Sales, search for the bill by number, customer name or phone, and open it. The Print button is at the top of the bill.",
  },
  {
    q: "I sold something that isn't in my item list.",
    a: "Type its name on the bill as normal. BillSane saves it to your inventory with the bill, and you can count it and set its tax later.",
  },
  {
    q: "How do I bring in my existing item list?",
    a: "Save your list from Excel, Google Sheets or Tally as a CSV file. In Inventory, choose Import and pick the file. Only the item name is required, and BillSane recognises common column names like Particulars, Qty, Rate and Tax %. Before anything is saved, you see what will be added, updated or skipped. You can also download an example file from the import window.",
  },
  {
    q: "Why does an item show negative stock?",
    a: "BillSane records a sale even when the counted stock is zero, so an item can go below zero. Count the item on the shelf and update its quantity in Inventory.",
  },
  {
    q: "Can I delete a bill?",
    a: "Yes, if your role allows it. Deleting a bill removes it and its items permanently, and it can't be undone.",
  },
];

const teamFaq: FaqItem[] = [
  {
    q: "How do I add someone to my team?",
    a: "Go to Settings, then Users, and choose Add user. Give them a role and a temporary password. They'll be asked to choose their own the first time they sign in.",
  },
  {
    q: "What can each role do?",
    a: "BillSane starts you with Administrator, Manager, Cashier and Accountant. A cashier can create bills but not change prices, and an accountant can read the books without editing them. In Settings, then Roles, you can change what each role can do or create your own.",
  },
  {
    q: "Someone on my team forgot their password.",
    a: "An administrator can set a new password for them in Settings, then Users. They'll be asked to choose another one when they next sign in.",
  },
  {
    q: "I forgot the administrator password.",
    a: "BillSane doesn't send password reset emails, so keep the administrator password somewhere safe. If another administrator exists, they can set a new one for you in Settings, then Users. If you're locked out, contact us.",
  },
  {
    q: "Someone has left my business.",
    a: 'In Settings, then Users, edit their account and untick "Account is active". They can no longer sign in, and the bills they created stay on record with their name.',
  },
];

export default function SupportPage() {
  const demoPossible = hasEmail() || hasWhatsApp();

  const nav: NavItem[] = [
    ...(demoPossible ? [{ id: "demo", label: "Request a demo" }] : []),
    { id: "license", label: "License & installation" },
    { id: "billing", label: "Billing & inventory" },
    { id: "team", label: "Team & passwords" },
  ];

  return (
    <>
      {/* Contact */}
      <section data-hero className="bg-canvas pb-14 pt-12 sm:pb-20 sm:pt-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-[2.75rem] font-semibold leading-[1.02] text-ink sm:text-6xl">
              We&apos;re here to help.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Find quick answers below, or talk to our team.
            </p>
          </div>

          {hasAnyChannel() ? (
            <div className="mt-12">
              <ul className="grid gap-5 md:grid-cols-3">
                {hasEmail() && (
                  <li className="rounded-2xl bg-surface p-6 shadow-card">
                    <Mail
                      size={22}
                      aria-hidden="true"
                      className="text-munsell_blue"
                    />
                    <h2 className="mt-4 font-sans text-base font-semibold tracking-normal text-ink">
                      Email
                    </h2>
                    <p className="mt-1 break-all text-[15px] text-ink-muted">
                      {support.email}
                    </p>
                    <ButtonLink
                      href={mailLink(
                        "BillSane support",
                        "Hello BillSane team,\n\n",
                      )}
                      variant="secondary"
                      className="mt-5"
                    >
                      Send an email
                    </ButtonLink>
                  </li>
                )}
                {hasWhatsApp() && (
                  <li className="rounded-2xl bg-surface p-6 shadow-card">
                    <MessageCircle
                      size={22}
                      aria-hidden="true"
                      className="text-munsell_blue"
                    />
                    <h2 className="mt-4 font-sans text-base font-semibold tracking-normal text-ink">
                      WhatsApp
                    </h2>
                    <p className="mt-1 text-[15px] text-ink-muted">
                      {support.whatsapp}
                    </p>
                    <ButtonLink
                      href={whatsAppLink(
                        "Hello BillSane team, I need some help.",
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="accent"
                      className="mt-5"
                    >
                      Message us
                    </ButtonLink>
                  </li>
                )}
                {hasPhone() && (
                  <li className="rounded-2xl bg-surface p-6 shadow-card">
                    <Phone
                      size={22}
                      aria-hidden="true"
                      className="text-munsell_blue"
                    />
                    <h2 className="mt-4 font-sans text-base font-semibold tracking-normal text-ink">
                      Phone
                    </h2>
                    <p className="mt-1 text-[15px] text-ink-muted">
                      {support.phone}
                    </p>
                    <ButtonLink
                      href={phoneLink()}
                      variant="secondary"
                      className="mt-5"
                    >
                      Call us
                    </ButtonLink>
                  </li>
                )}
              </ul>
              {support.hours.trim() !== "" && (
                <p className="mt-5 text-sm text-ink-muted">
                  <span className="font-semibold text-ink-soft">
                    Support hours:
                  </span>{" "}
                  {support.hours}
                </p>
              )}
            </div>
          ) : (
            <p className="mt-10 max-w-xl rounded-2xl bg-surface p-6 text-[15px] leading-relaxed text-ink-muted shadow-card">
              Our contact details are being added. In the meantime, the answers
              below cover the most common questions.
            </p>
          )}
        </Container>
      </section>

      <FeatureNav items={nav} />

      {/* Demo */}
      {demoPossible && (
        <section
          id="demo"
          className="scroll-mt-32 bg-shell py-16 text-white sm:py-24"
        >
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
              <div>
                <h2 className="text-[2rem] font-semibold leading-[1.05] sm:text-[2.75rem]">
                  See BillSane before you decide
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-white/70 sm:text-lg">
                  Ask for a demo and our team will walk you through billing,
                  inventory and insights.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {hasWhatsApp() && (
                    <ButtonLink
                      href={whatsAppLink(DEMO_MESSAGE)}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="accent"
                      size="lg"
                    >
                      Request on WhatsApp
                    </ButtonLink>
                  )}
                  {hasEmail() && (
                    <ButtonLink
                      href={mailLink(DEMO_SUBJECT, DEMO_MESSAGE)}
                      variant="on-dark"
                      size="lg"
                    >
                      Request by email
                    </ButtonLink>
                  )}
                </div>
                <p className="mt-5 text-sm text-white/55">
                  Your message opens ready to send, with a few details for us to
                  fill in.
                </p>
              </div>
              <ProductShot
                src="/screens/new-invoice.webp"
                alt="BillSane's New Invoice screen with a returning customer, three items and UPI selected."
                width={1800}
                height={1125}
                title="BillSane · New Invoice"
                onDark
              />
            </div>
          </Container>
        </section>
      )}

      {/* Help topics */}
      {(
        [
          [
            "license",
            "License & installation",
            "Your key, your computer and your team size.",
            licenseFaq,
            "canvas",
          ],
          [
            "billing",
            "Billing & inventory",
            "Making bills, finding them again, and keeping your items in order.",
            billingFaq,
            "surface",
          ],
          [
            "team",
            "Team & passwords",
            "Adding people, choosing what they can do, and getting back in.",
            teamFaq,
            "canvas",
          ],
        ] as const
      ).map(([id, title, description, items, tone]) => (
        <Section key={id} id={id} tone={tone} className="scroll-mt-32">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <SectionHeading
              title={title}
              description={description}
              className="lg:sticky lg:top-40 lg:self-start"
            />
            <Faq items={items} onSurface={tone === "surface"} />
          </div>
        </Section>
      ))}

      {/* Still stuck */}
      <Section tone="surface">
        <div className="rounded-[28px] bg-canvas px-6 py-12 text-center shadow-ring sm:px-12 sm:py-16">
          <h2 className="mx-auto max-w-xl text-[2rem] font-semibold leading-[1.05] text-ink sm:text-[2.75rem]">
            Still need a hand?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink-muted sm:text-lg">
            Tell us what you&apos;re trying to do and we&apos;ll help you get
            there.
          </p>
          {hasAnyChannel() && (
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {hasWhatsApp() && (
                <ButtonLink
                  href={whatsAppLink("Hello BillSane team, I need some help.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="accent"
                  size="lg"
                >
                  Message us on WhatsApp
                </ButtonLink>
              )}
              {hasEmail() && (
                <ButtonLink
                  href={mailLink(
                    "BillSane support",
                    "Hello BillSane team,\n\n",
                  )}
                  variant="secondary"
                  size="lg"
                >
                  Email us
                </ButtonLink>
              )}
              {!hasWhatsApp() && !hasEmail() && hasPhone() && (
                <ButtonLink href={phoneLink()} variant="secondary" size="lg">
                  Call us
                </ButtonLink>
              )}
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
