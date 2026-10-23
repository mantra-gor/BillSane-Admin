# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: business owners (retail, wholesale, services and similar categories) who run their own business, value their time, and need tax-ready billing without the learning curve of advanced accounting software. BillSane is not positioned as India-only: it is built to work with different tax systems, GST and VAT among them. On this site the owner evaluates BillSane, picks a plan, registers the business, pays, receives the license key and downloads the desktop application.

Inside the desktop app, the owner is the Administrator and adds staff under custom roles. The seeded roles are Manager, Cashier / Staff and Accountant. Staff never touch this website. The owner is the only customer-side person it serves.

Secondary: the BillSane team, who will use the admin panel in this repo to oversee businesses, licenses and payments.

## Product Purpose

BillSane is billing, inventory and business-insight software for independent business owners. It is delivered as a cross-platform desktop application and is growing into a lightweight ERP that also shows the owner how the business is doing.

The product spans two repos:

- **`billsane-client`** (`../billsane-client`): the Electron desktop app (macOS, Windows, Linux) where the daily work happens.
- **`billsane-admin`** (this repo) serves four roles:
  1. Public website: home, features, about, support and pricing pages.
  2. Licensing flow: business registration, plan purchase via Razorpay, license key generation and the desktop app download.
  3. Admin panel for the BillSane team (planned).
  4. Next.js API backend for the desktop client (e.g. `/api/license/validate`). The client does not call it yet.

Success on this site means an owner moves from interest to a paid, registered business with a working license key and the app installed, without confusion or a support call.

## Positioning

Simplicity, and time given back. Less time learning software, more time running the business. BillSane gives owners everything they need for everyday billing in one simple, intuitive app, without the complexity and steep learning curve of tools like Tally. Every surface should prove that claim by being easy, not just by stating it.

The desktop app backs the claim with concrete mechanisms that marketing may describe truthfully:

- Fast invoicing with sensible defaults and keyboard shortcuts (⌘/Ctrl+N new invoice, ⌘/Ctrl+K command palette).
- Bringing an existing catalog in from Excel, Google Sheets or a Tally export in minutes. The CSV import shows a preview before anything is written, and re-importing a corrected sheet is safe.
- Inventory management: a catalog with tax codes (HSN/SAC), tax types and rates, stock counts, low-stock alerts and days of stock left.
- Insights from the owner's own sales: restock alerts, regulars who have gone quiet, stock that isn't moving, revenue changes and GST set-aside.
- AI assistant (in development, not shipped): AI insights and a chat assistant the owner can ask about their business and its patterns. Present it as coming soon until it ships.
- Reliability: billing keeps working if the internet drops. This is a supporting fact, never the headline. An online model is planned, so the brand must not be positioned as offline-only or offline-first.
- Role-aware access, so a cashier can bill without being able to reprice items.

## Operating Context

- **Website flow:** registration captures business name, category, GST number (optional), number of branches, staff count, country and state, plus the admin user's name, email and phone. Payment runs through Razorpay, with amounts in the smallest currency unit (INR default). Licenses are encrypted keys tied to a business, with a staff limit and an ACTIVE, INACTIVE or EXPIRED status.
- **Master data** (countries, states, categories, currencies and plans) lives in Neon Postgres via Prisma and is seeded in `prisma/seed.ts`.
- **Support:** by email and WhatsApp or phone, with a demo available on request. Customers request a demo through a ready-written email or WhatsApp message (no booking tool). The contact details live in `src/lib/support.ts` and are intentionally empty until the owner fills them in; the /support page hides any channel left empty. There is no ticket form or helpdesk.
- **Desktop first run:** a fresh install has no accounts. A one-time setup creates the Administrator, and nothing ships with a default credential. Every other account is added in Settings → Users.
- **Desktop data:** two modes. *Offline* uses local SQLite only. *Hybrid* adds a PostgreSQL cloud database for sync, but the sync engine is not built yet.
- **Invoices** are printed at the counter. Payment methods are Cash, Card and UPI.

## Capabilities and Constraints

- **This repo's stack:** Next.js 15 (App Router), React 19, Tailwind CSS 4, Prisma on Postgres, Razorpay, GSAP and lucide-react.
- **Licensing:** for now a license is a one-time payment for lifetime use. Subscription plans may come later with an online version; the site does not mention either yet.
- **Plans** live in the database (`Plan`: name, description, features, price, original price, popular flag). Pricing UI reads from there rather than hard-coding plans. Plans will be managed from the admin panel (next to be built).
- **Desktop app, built:** invoice builder with per-line tax and totals, a print-ready branded invoice, a customer directory, inventory with an item catalog and bulk CSV import, sales history, a dashboard, user accounts, custom roles and permissions, business settings, and a database settings screen.
- **Desktop app, planned (not shipped):** cloud sync, a tax master-data table (GST and VAT rules and rates, to be supplied by the product owner), deeper GST handling (CGST/SGST/IGST split), WhatsApp invoice delivery and campaigns via Infobip, catalog and ledger export, an audit trail and multi-branch support. Marketing must not present these as available.
- **Undecided or unbuilt here:** the home, features, about and support pages are placeholders. The admin panel and its authentication are not defined. How the desktop client will enforce the license and staff limit is not yet wired up.

## Brand Commitments

- **Name:** BillSane.
- **Taglines in use:** "Simplify Your Billing" (this site's metadata) and "Make your finances sane." (client README). It is not decided which one is canonical.
- **Logo assets:** `public/logo-no-background.svg`, `public/logo-no-background.png`, `public/favicon_logo.png`, `public/favicon.png`. The same branding lives in the client at `src/react/assets/branding/`.
- **Shared brand palette:** `BillSane-Color-Palette.png` exists in both repos. The desktop client's design system is the most developed expression of the brand, and the website should feel like the same product.
- **Origin:** "Crafted with ❤️ in India" (client README).

## Voice

- Never describe customers as "small" or "local", including "small business" and "local shop". These words can make owners feel their businesses are undervalued or limited in potential.
- Use respectful, empowering language about their ambition, independence and the way they work. These are serious business owners who value their time.
- Lead with time and simplicity: "Less time learning software. More time running your business."
- Approved copy (from the owner of BillSane): "You have customers to serve, sales to manage, and a business to grow. You don't need complicated billing software that takes days to understand. Get everything you need for everyday billing in one simple, intuitive solution."
- Don't market BillSane as India-only. Say "tax" in general copy and mention GST and VAT together; keep country-specific details (a GSTIN, ₹, a Pune address) to screenshots and sample data.
- Don't lead with offline. An online model is coming.

## Evidence on Hand

- **Seeded plans:** Starter, Professional and Enterprise, with feature lists in `prisma/seed.ts`. Treat their copy as provisional. Several of the listed features (AI categorization, a mobile app, real-time forecasting, API access) are not capabilities of the desktop app.
- **Real product material:** the client repo itself. The running desktop app can supply honest screenshots, and the CSV example lives at `../billsane-client/examples/inventory-import-example.csv`.
- **Absent:** there are no testimonials, customer logos, usage numbers, press or case studies. Do not fabricate any.

## Product Principles

1. **Simplicity is the product.** If a flow needs explaining, simplify the flow before adding copy.
2. **Few steps to a working license.** Get owners from interest to a working license in as few steps as possible, with clear recovery when payment or registration fails.
3. **Speak to serious business owners, wherever they work.** Tax, currency and payment methods are first-class: GST and VAT, the owner's own currency, and local payment methods such as UPI. The language respects the owner's ambition and independence.
4. **Never overclaim.** The website promises only what the desktop app ships today, and roadmap items are labelled as such.
5. **One product, two surfaces.** The website and the desktop app should read as the same BillSane.
