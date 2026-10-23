---
name: BillSane
description: Simple billing for business owners, one system across the desktop app and the website.
colors:
  prussian-navy: "#053247"
  prussian-navy-deep: "#054261"
  prussian-navy-wash: "#ECF8FE"
  counter-teal: "#298E9E"
  counter-teal-deep: "#248A94"
  counter-teal-bright: "#3AC3CF"
  counter-teal-wash: "#DEF5F7"
  palette-grey: "#F7F7F7"
  shell-night: "#062639"
  shell-raised: "#0B3A54"
  shell-hover: "#0E4763"
  shell-border: "#14536F"
  canvas: "#F1F5F9"
  surface: "#FFFFFF"
  surface-subtle: "#F8FAFC"
  surface-muted: "#F1F5F9"
  surface-sunken: "#E9EFF5"
  line: "#E3EAF1"
  line-strong: "#CBD8E3"
  line-faint: "#EEF3F8"
  ink: "#0C2231"
  ink-soft: "#3F5769"
  ink-muted: "#64798B"
  ink-faint: "#93A5B4"
  success: "#0E9F6E"
  success-soft: "#E6F6F0"
  success-ink: "#07603F"
  warning: "#C77700"
  warning-soft: "#FDF4E3"
  warning-ink: "#7A4A00"
  danger: "#DC2B2B"
  danger-soft: "#FDECEC"
  danger-border: "#F5B9B9"
  danger-ink: "#8E1616"
  info: "#2A78D6"
  info-soft: "#EAF2FD"
  info-ink: "#17457F"
typography:
  display:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "2.75rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  web-display:
    fontFamily: "Anek Latin, Inter, sans-serif"
    fontSize: "clamp(2.75rem, 6vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 92"
  web-heading:
    fontFamily: "Anek Latin, Inter, sans-serif"
    fontSize: "clamp(2rem, 4vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 92"
  headline:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.014em"
  title:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.43
    letterSpacing: "-0.014em"
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "'cv02', 'cv03', 'cv04', 'cv11'"
  label:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.4
  overline:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "11px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.07em"
  numeric:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: 1
    fontFeature: "'tnum'"
  kbd:
    fontFamily: "SF Mono, ui-monospace, Menlo, Consolas, monospace"
    fontSize: "10px"
    fontWeight: 600
    lineHeight: 1
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  2xl: "28px"
  full: "9999px"
spacing:
  xs: "6px"
  sm: "12px"
  md: "16px"
  lg: "20px"
  xl: "24px"
  2xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.prussian-navy}"
    textColor: "{colors.surface}"
    typography: "{typography.title}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "40px"
  button-primary-hover:
    backgroundColor: "{colors.prussian-navy-deep}"
  button-accent:
    backgroundColor: "{colors.counter-teal}"
    textColor: "{colors.surface}"
    typography: "{typography.title}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "40px"
  button-accent-hover:
    backgroundColor: "{colors.counter-teal-deep}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "40px"
  button-secondary-hover:
    backgroundColor: "{colors.surface-subtle}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "40px"
  button-lg:
    rounded: "{rounded.lg}"
    padding: "0 20px"
    height: "48px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "10px 12px"
  input-invalid:
    backgroundColor: "{colors.danger-soft}"
    textColor: "{colors.ink}"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.xl}"
    padding: "{spacing.lg}"
  badge-accent:
    backgroundColor: "{colors.counter-teal-wash}"
    textColor: "{colors.counter-teal-deep}"
    rounded: "{rounded.full}"
    padding: "0 8px"
    height: "24px"
  badge-success:
    backgroundColor: "{colors.success-soft}"
    textColor: "{colors.success-ink}"
    rounded: "{rounded.full}"
    padding: "0 8px"
    height: "24px"
  shell-panel:
    backgroundColor: "{colors.shell-night}"
    textColor: "{colors.surface}"
  web-button-accent:
    backgroundColor: "{colors.counter-teal}"
    textColor: "{colors.surface}"
    rounded: "{rounded.full}"
    padding: "0 18px"
    height: "40px"
  web-button-primary:
    backgroundColor: "{colors.prussian-navy}"
    textColor: "{colors.surface}"
    rounded: "{rounded.full}"
    padding: "0 18px"
    height: "40px"
  web-button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "0 18px"
    height: "40px"
  web-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.xl}"
    padding: "{spacing.lg}"
  web-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "10px 14px"
  web-footer:
    backgroundColor: "{colors.shell-night}"
    textColor: "{colors.surface}"
---

# Design System: BillSane

## Overview

**Creative North Star: "The Shop Counter"**

BillSane is built for an owner standing at a busy counter with a customer waiting. Everything they need is one step away, the main action is obvious and big enough to hit without aiming, and nothing on screen is there to be admired. The design proves the product's one claim, simplicity, by never making the owner wait, hunt or decode. This holds on both surfaces. In the desktop app the counter is literal. On the website it is the owner's first visit: the plans are clear, the path to a license is short, and the page never feels like a sales pitch.

The system is one world in two densities. The desktop client (`../billsane-client`) is the source of truth and the most complete expression of it. It uses light paper-white planes on a cool canvas, ink-navy text, hairline borders, a short and deliberate ladder of shadows, and a dark navy shell (the sidebar and brand panel) that anchors the brand. Teal is the counter's signal colour, used for focus, the active state and the one accent that says "here". The website shares the palette, tokens and Inter, and adds its own web layer, influenced by cal.com's patterns but never copying them. That layer has four parts: white cards on the cool canvas edged by a 1px ink ring instead of a border, pill-shaped actions with an inset top highlight, large condensed headlines in Anek Latin, and generous whitespace inside a 1200px column. Its signature is BillSane's own: a dashed perforation rule, the tear line of a printed bill.

The system is light-only by design. The navy shell is brand chrome, not a dark theme. Motion is short and snappy (160–220ms, one shared ease), and it confirms that something happened rather than performing.

**Key Characteristics:**

- **Palette:** three locked brand colours (Prussian navy `#053247`, counter teal `#298E9E`, palette grey `#F7F7F7`), extended by a semantic layer of ink, surface, line and status tokens.
- **Type:** Inter for everything, with stylistic alternates on. Tabular figures for every rupee, count and ID.
- **Edges and depth:** hairline borders (`#E3EAF1`) do the separating. Low, navy-tinted ambient shadows add depth only where it means something.
- **Shapes:** rounded but not soft. 8px on controls, 16px on cards, full pills only on badges.
- **Chrome:** a dark navy shell for brand panels and navigation chrome, with white surfaces for work.
- **Motion:** one easing curve, `cubic-bezier(0.22, 1, 0.36, 1)`, with short fades and lifts and nothing that bounces.

## Colors

The palette is navy ink on cool paper, with a single teal signal. Colour carries meaning (brand, focus, status) and never decoration.

### Primary

- **Prussian Navy** (`prussian-navy`): the brand. It fills primary buttons, carries the brand shadow and is the deepest ink on light surfaces. On the website it is the colour of "this is BillSane".
- **Prussian Navy Deep** (`prussian-navy-deep`): the hover and pressed state of primary actions.
- **Prussian Wash** (`prussian-navy-wash`): the background of brand-toned badges and selected options.

### Secondary

- **Counter Teal** (`counter-teal`): the signal colour. It marks the focus ring, active navigation, the accent button and accent underlines in headlines. On the dark shell, the brighter teal (`counter-teal-bright`) does the same job.
- **Teal Deep** (`counter-teal-deep`): accent hover, and teal text on light washes.
- **Teal Wash** (`counter-teal-wash`): the background of accent badges and soft highlights. Text selection uses teal at 22% opacity.

### Neutral

- **Palette Grey** (`palette-grey`): the third brand swatch. It is kept for brand assets and the legacy grey ramp, but new UI uses the cool neutrals below.
- **Shell Night** (`shell-night`), **Shell Raised** (`shell-raised`), **Shell Hover** (`shell-hover`) and **Shell Border** (`shell-border`): the dark navy chrome for the sidebar, the auth and brand panels, the invoice footer and the site footer.
- **Canvas** (`canvas`): the page background that every surface sits on.
- **Surface** (`surface`, `surface-subtle`, `surface-muted`, `surface-sunken`): white working planes, plus three steps down for hover, disabled and recessed areas.
- **Line** (`line`, `line-strong`, `line-faint`): the hairlines. A bare border resolves to `line`, and hover steps it up to `line-strong`.
- **Ink** (`ink`, `ink-soft`, `ink-muted`, `ink-faint`): text in four steps. `ink` is for headings and values, `ink-soft` for labels, `ink-muted` for descriptions and `ink-faint` for placeholders and captions.

### Status

- **Success, Warning, Danger and Info**: each has a solid colour plus `-soft` (background), `-border` and `-ink` (readable text) variants for badges, banners and inline errors. Danger also tints invalid inputs.

### Named Rules

**The Signal Rule.** Teal means "here": focus, active and the single accent action. If two things on a screen are teal and only one of them is where the owner should look, one of them is wrong.

**The Semantic-First Rule.** New code uses `ink`, `surface`, `line`, `shell` and the status tokens, never Tailwind's stock `gray-*`, `slate-*`, `blue-*` or `teal-*`, and never a raw ramp step where a semantic token exists.

**The Light-Only Rule.** There is no dark mode and no `dark:` variant. `color-scheme` is pinned to light, and the navy shell is brand chrome, not a theme.

## Typography

**Display font:** Inter (fallback: -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial)
**Body font:** Inter
**Keyboard and mono font:** SF Mono (fallback: ui-monospace, Menlo, Consolas), only for keyboard-shortcut chips

**Character:** Inter is used plainly. Stylistic alternates (`cv02`, `cv03`, `cv04`, `cv11`) give it a slightly more open, legible figure set, and headings tighten a little (-0.014em) so they read as one block. It is the voice of a ledger rather than a brochure.

### Hierarchy

- **Display** (700, 2.75rem, line height 1.1, -0.025em): brand-panel statements such as "Make your finances sane." The final word is in bright teal. On the website this is the top hero size until a marketing scale is set on the first page built.
- **Headline** (700, 22px, line height 1.25): page titles at the top of every screen.
- **Title** (600, 14px): card titles and button labels.
- **Body** (400, 14px, line height 1.5): descriptions, table cells and form text. The website's reading copy may step up to 16px, with lines kept to 65–75 characters.
- **Label** (600, 13px, `ink-soft`): form field labels.
- **Overline** (700, 11px, uppercase, 0.07em): stat labels and group headings. In the sidebar it is 10px with 0.12em spacing.
- **Numeric** (700, 22px, tabular figures): KPI values and totals. Tabular figures apply to every money, count and ID column at any size.

### Named Rules

**The Tabular Rupee Rule.** Every amount, quantity, invoice number and license figure uses tabular figures (`tnum`), so digits never jitter as values change and columns line up to the pixel.

**The One Family Rule.** Inter only, with one exception: website headlines. Weight and size do all the hierarchy work. Monospace appears only inside keyboard chips.

### Website headlines

**Web display font:** Anek Latin by Ek Type (an Indian foundry), loaded through `next/font` as `--font-anek`. It is set at weight 600, width 92% and tracking −0.02em on every `h1` to `h3` on the website. The condensed signboard character matches the BillSane wordmark, and the family extends to Devanagari, Gujarati, Tamil and other Indian scripts if the site is localised. Hero headlines run 2.75rem on phones to 3.75rem on desktop, section headings 2rem to 2.75rem, and card titles 1.125rem. Everything else on the website, including footer column headings, is Inter.

## Layout

The desktop app is a fixed navy sidebar beside a scrolling content column on the canvas. The column is capped at 1400px (1700px for wide tables) with 24px padding, so wide monitors never stretch a table into nonsense. Screens open with a page header (title, description and actions on the right), followed by a stack of cards with 16–24px between them. Forms use a single label, control and message frame with 6px internal gaps, and an error never shifts the layout.

The website uses the same container logic at web density. Content sits in a centred container on the canvas, and sections separate through space and a change between surface and canvas rather than decorative dividers. The top navigation is a white bar over the page. The footer is a shell-night band, the web counterpart of the app's sidebar. Below the `md` breakpoint (768px), navigation collapses into a right-hand drawer with large tap targets.

The rhythm is a 4px base, used in practice as 6, 12, 16, 20, 24 and 48px.

### Named Rules

**The One-Step Rule.** The primary action of any screen is visible without scrolling and sits in a predictable place: top right of a page header in the app, and directly under the headline on the website.

## Elevation & Depth

Depth is a hybrid. Hairline borders do most of the separating, and a short scale of low-spread, navy-tinted shadows (`rgba(12, 34, 49, …)`) adds lift only where an element is above the page or responds to the pointer. Shadows are never grey and never smudged.

### Shadow Vocabulary

- **xs** (`0 1px 2px 0 rgba(12,34,49,0.05)`): inputs, secondary buttons and keyboard chips.
- **card** (`0 1px 2px 0 rgba(12,34,49,0.04), 0 1px 3px 0 rgba(12,34,49,0.06)`): every card at rest.
- **raised** (`0 2px 4px -1px rgba(12,34,49,0.06), 0 8px 16px -4px rgba(12,34,49,0.08)`): an interactive card on hover.
- **pop** (`0 8px 12px -4px rgba(12,34,49,0.08), 0 20px 32px -8px rgba(12,34,49,0.14)`): menus and popovers.
- **overlay** (`0 16px 24px -8px rgba(12,34,49,0.12), 0 32px 64px -16px rgba(12,34,49,0.24)`): modals and the command palette.
- **brand** (`0 4px 12px -2px rgba(5,50,71,0.28)`): primary buttons.
- **accent** (`0 4px 12px -2px rgba(41,142,158,0.32)`): accent buttons.

### Website shadow vocabulary (`src/app/globals.css`)

On the website, the ring is the border: cards and fields carry no CSS border.

- **ring** (`0 0 0 1px rgb(12 34 49 / 0.08)`): neutral badges and hover outlines.
- **field** (ring at 0.11 plus a 1px drop): every input, select and textarea. Focus swaps it for a teal ring plus a 4px teal halo at 16%.
- **card** (ring plus `0 1px 5px -4px` at 0.55 and `0 4px 8px` at 0.04): every card at rest, secondary buttons and the active nav pill.
- **raised** and **pop**: hovered interactive cards, and the mobile menu.
- **btn-primary** and **btn-accent**: an inset 1px white highlight at the top edge, a 1px ring in the button's own colour, and a tight coloured drop.

### Named Rules

**The Deliberate Ladder Rule.** Pick from the scale above and do not add steps. Cards never use `shadow-xl` or `shadow-2xl`, and depth increases only with real elevation: resting card, then hovered card, then menu, then modal.

## Shapes

Corners are rounded but not soft. Controls (buttons, inputs and selects) use 8px, large buttons and icon tiles use 12px, cards and panels use 16px, and only badges, avatars and the status dot are full pills. Borders are 1px hairlines in `line`. Brand washes may sit behind content as faint teal or navy blurred circles at 5–7% opacity in panel corners. This is the only place blur is allowed, and it is never animated.

On the website, every button is a full pill. Cards keep 16px corners, fields use 12px, and product screenshots sit in a 20px frame around a 14px window. The perforation rule (`.rule-perforated`, a 1.5px dashed line at 18% of the current colour) separates the major parts of a band, such as the footer's statement from its link grid.

## Components

### Buttons

Buttons are crisp and composed: a solid fill, a tight radius and a short state change.

- **Shape:** gently curved (8px). The large size is 12px.
- **Sizes:** small is 32px high with 12px padding and 13px text. Medium (the default) is 40px high with 16px padding and 14px text. Large is 48px high with 20px padding and 15px text. All use weight 600 with a 6–8px gap between icon and label.
- **Primary:** Prussian navy with white text and the brand shadow. Hover moves to navy deep and pressed to navy 900. Use one per view.
- **Accent:** counter teal with the accent shadow. This is the website's conversion action ("Get Started", "Buy", "Download"). Use it where the owner should act next, never next to a primary button of equal weight.
- **Secondary:** a white surface with a hairline border and the xs shadow. Hover moves to `surface-subtle` with a `line-strong` border.
- **Ghost:** transparent with `ink-soft` text. Hover moves to `surface-muted`.
- **Danger:** a solid danger fill for destructive confirmation. The subtle variant is the soft danger wash.
- **States:** transitions take 150ms on the snap ease. Disabled buttons drop to 50% opacity and lose their shadow. While loading, a spinner replaces the icon and the button blocks input.

### Badges

- **Style:** a full pill, 24px tall (20px in the small size), with 11px semibold text, a soft background, a matching border and readable ink-tone text.
- **Tones:** neutral, brand, accent, success, warning, danger and info. An optional leading 6px dot marks status (Active, Expired, Paid) without needing an icon.

### Cards and containers

- **Corners:** 16px.
- **Background:** white `surface` on the `canvas`.
- **Shadows:** `card` at rest. Interactive cards lift 2px to `raised` with a `line-strong` border on hover.
- **Border:** a 1px `line` hairline.
- **Internal padding:** 20px. The header is a 14px semibold title with an optional 12px `ink-muted` subtitle and an action slot on the right. Flush cards remove the body padding for full-bleed tables.

### Inputs and fields

- **Style:** a white surface, a 1px `line` border, an 8px radius, 10px × 12px padding, 14px `ink` text, `ink-faint` placeholders and the xs shadow. Hover (when not focused) steps the border to `line-strong`.
- **Focus:** a counter teal border plus a 3px teal halo at 16% opacity. The global focus-visible ring is a 2px teal outline with a 2px offset.
- **Invalid:** a `danger-border` border on a `danger-soft` fill. On focus, the border goes to danger with a red halo at 14%.
- **Disabled:** `surface-muted` with `ink-muted` text and a not-allowed cursor.
- **Field frame:** a 13px semibold `ink-soft` label (required fields get a danger asterisk), then the control, then either a 12px `ink-muted` hint or a 12px danger error with an alert icon.
- **Select:** native, with the default appearance removed and a custom `ink-muted` chevron 12px from the right.

### Navigation

- **App sidebar:** a shell-night column with a 10px uppercase group overline at 30% white. Items are 13–14px. The active item gets a 4px bright-teal bar on its left edge, and keyboard hints appear on hover in dark keyboard chips. The user block sits at the bottom on a white tile at 4% opacity.
- **Website top bar:** one white, ring-edged plane that floats 8px below the top of the page, with the logo on the left, links centred and a navy action on the right. The active link is a teal wash pill with `munsell_blue-700` text, which keeps teal as the "you are here" signal and leaves the page's own accent button as the only teal action. On mobile the same plane opens downward over an ink scrim at 20%, with the perforation rule as the tear line between the bar and the links.
- **Website footer:** a shell-night band with white-at-75% links, hover to white, and `shell-border` hairlines.

### Brand panel (signature)

This is the app's auth screen and its strongest brand moment. A shell-night panel holds an ambient product video behind a navy gradient scrim (from shell to 70% to 30% opacity). The display headline sits over it with its final word in bright teal, followed by a checklist of three plain benefits. Each benefit has a teal tick in a 20px circle at 25% teal, with 14px text in white at 75%. The website's hero may reuse this panel so the first thing an owner sees matches the app they are about to install.

### Website components (`src/components/ui/`)

- **Button and ButtonLink** (`Button.tsx`): pills in primary (navy), accent (teal, the conversion action), secondary (white with the card ring), ghost and on-dark (for the shell). Sizes are 32, 40 and 48px. Pressing moves the button down 1px, and loading swaps the icon for a spinner.
- **Card and CardHeader** (`Card.tsx`): a white ring-edged plane. The header is an 18px Anek title with an Inter description and an optional action slot. `interactive` lifts the card 2px to `raised`.
- **Badge** (`Badge.tsx`): a 24px pill with an inset 1px tone ring and an optional status dot. The `on-dark` tone is used for chips on the shell.
- **Field, Input and Select** (`Field.tsx`): the label, hint and error frame. The controls are styled by the base layer, so bare inputs on older pages match them.
- **Container, Section and SectionHeading** (`Section.tsx`): a 1200px column with 16px phone gutters; bands in canvas, surface or shell tone with 64–96px of vertical padding; and a heading with an optional description and no eyebrow.
- **ProductShot** (`ProductShot.tsx`): a desktop-app screenshot inside a neutral window frame (grey dots, title bar), deliberately not tied to one OS. Use real screenshots only, saved under `public/screens/`.
- **Header** (`Navbar.tsx`): a fixed 64px strip. Over the hero it is flat: an opaque canvas strip (hairline once scrolled) with no plane, so the logo lines up with the hero copy. Once the bottom of the page's `[data-hero]` element (falling back to the first child of `main`) passes under the header, the canvas strip fades out and the links sit in a 48px white plane (24px radius, `raised` shadow, `pop` while the phone menu is open) inset 8px from the top; nothing moves, only the plane fades in. Every page marks its hero with `data-hero`. Its padding is concentric with the pill action (4px on the right), so the primary "Get started" sits flush in the end of the plane. The logo is on the left, the links are centred, and the active link is a teal wash pill. "Get started" stays visible on phones beside the menu button. The menu expands out of the plane itself with 48px rows, and closes on Escape (focus returns to the menu button), route change, a tap on the scrim, or growing past `md`. The header keeps its 64px footprint, so `pt-16`, `top-16` and `scroll-mt-*` elsewhere still hold.
- **Footer** (`Footer.tsx`): a shell-night band. It opens with the brand statement "Make your finances sane." in Anek, with "sane." in bright teal, and two actions. A perforation rule follows, then the logo on a white plate, the platform chips (macOS, Windows, Linux), the Product and Company link columns, and a small-print row.

### Home page components (`src/components/home/`)

- **HeroStack**: the New Invoice window, with the printed tax invoice tucked under its lower-left corner and tilted −2°. The bill has a perforated top edge (`.bill-paper`). On load it feeds out once over 900ms on the snap ease (`.bill-print`); with reduced motion it simply sits there. This is the page's only authored animation.
- **LedgerList**: feature points set like lines on a bill (a bold entry, a muted detail, and perforation rules between rows). Use it instead of grids of icon cards, in light or dark tone.
- **AskBillSane**: a panel on the shell for the AI assistant, marked "Coming soon". It shows example questions only, never invented answers, until the feature ships.
- **Faq** (`ui/Faq.tsx`): native `<details>` disclosures inside one card; the plus icon rotates into a ×. `onSurface` re-tints the card for white bands.

### Pricing components (`src/components/pricing/`)

- **PlanCard**: an `<article>` in the ring-edged card. The order is name and Recommended badge, description, price with the struck-through original and a "Save N%" badge, the action, a perforation rule, then the checklist of everything the plan includes. The recommended plan has a 2px teal ring and the accent button; the others use secondary buttons.
- **PlanGrid**: plans come from the admin-managed table, so the count is not fixed. One plan centres, up to three share a row, four sit in narrower columns, and more wrap.
- **SelectPlanButton** (client): writes `sessionStorage["order"] = {planId}` and opens `/register`. That key and shape are the hand-off contract with registration.
- Prices go through `formatPrice` and `savingPercent` in `src/lib/utils.ts`, so the currency can change in one place.
- **Product screenshots** live in `public/screens/`, captured from the real desktop app with a fictional sample business (Mehta Traders, Pune). When a screenshot changes, give it a new filename, because Next's image cache is keyed by URL.

### Features components (`src/components/features/`)

- **FeatureSection**: one feature told as problem, capabilities and outcome. It has a heading and the problem sentence, then a 5/12 column (a LedgerList plus a "What it means for you" callout, teal-tinted on light bands and white-tinted on the shell) beside a 7/12 sticky visual. Sections alternate tone and side. The section id is the jump-nav target, with `scroll-mt-32`.
- **FeatureNav** (client): a sticky jump bar under the site header. An IntersectionObserver marks the section in the middle of the viewport as current with the white active pill. It scrolls sideways on phones.
- **ShotWithDetail**: an app window with one real close-up laid over its lower-right corner (the printed bill, or the "found by phone" customer card).
- **DayTimeline**: four moments of an owner's day (opening up, at the counter, closing time, month end) in one card split by hairlines, numbered because the order is the point.

### Support page (`src/app/support/page.tsx`)

- Contact channels are plain cards (email, WhatsApp, phone) with one action each; WhatsApp uses the accent button. They come from `src/lib/support.ts`, and a channel with no value is not rendered.
- The demo band sits on the shell with the New Invoice screenshot in the dark frame. Its buttons open a pre-written WhatsApp or email message.
- Help answers use `Faq` in three bands (License & installation, Billing & inventory, Team & passwords), with the heading sticky beside each. The jump bar is the shared `FeatureNav`.
- Every answer states only what the desktop app does today, in the app's own words (for example "Account is active", "Add user").

### Registration components (`src/components/register/`)

- **Stepper**: five steps (Business, Admin, Review, Payment, License key). Done steps are teal circles with a tick and a teal connector, the current step is a navy circle with the primary button shadow, and upcoming steps are white with a ring. On phones it collapses to "Step N of 5" and a teal progress bar. It carries `aria-current="step"`.
- **PlanSummary**: the plan carried over from `/pricing`, sticky beside the form on desktop and after the form on phones. "Change" disappears once the business is registered, and with no plan chosen it offers "Choose a plan".
- **Register page patterns**: one white card per step, whose heading takes focus on step change; the page scrolls back to the stepper. A danger banner (`role="alert"`) holds request errors, and field errors sit under each field, with the first one focused. Review groups are canvas-tinted with ghost "Edit" buttons. The license key sits in a perforated `.bill-paper` ticket with a copy button that confirms in place.

### Keyboard chip (signature)

A 20px chip with a `line-strong` border, a `surface-subtle` background, a 10px SF Mono label and the xs shadow. The dark variant sits on `shell-raised`. Every shortcut hint uses it with ⌘ on macOS and Ctrl elsewhere. The website should show shortcuts the same way when it talks about speed at the counter.

## Do's and Don'ts

### Do:

- **Do** reach for the semantic tokens (`ink`, `surface`, `line`, `shell` and the status colours) before any raw ramp step.
- **Do** keep one primary or accent action per view and put it where the One-Step Rule says it goes.
- **Do** set every amount, count and license figure in tabular figures.
- **Do** use the shadow ladder exactly: `card` at rest, `raised` on hover, `pop` for menus and `overlay` for modals.
- **Do** keep motion between 160ms and 220ms on `cubic-bezier(0.22, 1, 0.36, 1)`, as fade, fade-and-lift 8px, or scale-in from 0.96. Respect reduced-motion preferences.
- **Do** use the navy shell for brand chrome (footer, brand panels and app sidebar), with the logo seated on a white plate when it sits on navy.
- **Do** use the one focus treatment everywhere: a 2px teal outline with a 2px offset, and a teal halo on inputs.

### Don't:

- **Don't** use gradient fills on buttons, and don't use gradient-clipped (transparent) text.
- **Don't** use Tailwind's stock `gray-*`, `slate-*`, `blue-*` or `teal-*` colours.
- **Don't** add decorative motion: no bouncing elements, no springy `back.out` eases, no staggered entrance choreography on navigation, and no scale-on-hover for logos or icons.
- **Don't** add a dark mode or `dark:` variants.
- **Don't** use Arial, Geist or any typeface other than Inter, and Anek Latin for website headlines.
- **Don't** put an eyebrow or kicker label (such as `[How it works]`) above a heading, or number sections 01, 02, 03.
- **Don't** use `shadow-xl` or `shadow-2xl` on cards, and don't use grey (`rgba(0,0,0,…)`) shadows.
- **Don't** add decorative blur blobs, skewed bands or animated glows beyond the faint corner wash described in Shapes.
- **Don't** ship placeholder contact details, social links that go nowhere, or links to pages that don't exist.

### Drift in the current website

These patterns exist in `billsane-admin` today and conflict with this system. Bring them into line as each surface is touched.

The tokens, header, footer, loader and core primitives are now done. What remains:

- The pricing and register pages use gradient backgrounds and gradient text, GSAP entrance fades, `shadow-xl`, and stock `gray-*` and `red-*` colours instead of the danger tokens. They should be rebuilt on the primitives in `src/components/ui/`.
- The home, features, about and support pages are placeholders.
- `ink-muted` is `#5C7184` on the website, darker than the client's `#64798B`, so muted text clears 4.5:1 contrast on the canvas. Consider bringing the client in line.
