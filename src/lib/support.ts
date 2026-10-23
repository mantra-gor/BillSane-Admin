/**
 * BillSane's support contact details. Fill these in and the /support page
 * shows the matching channels; any value left empty hides its channel, so
 * nothing placeholder ever reaches a visitor.
 */
export const support = {
  /** e.g. "help@yourdomain.com" */
  email: "",
  /** WhatsApp number with country code, any formatting, e.g. "+91 98765 43210" */
  whatsapp: "",
  /** Phone number with country code, e.g. "+91 98765 43210" */
  phone: "",
  /** When someone will answer, with a time zone, e.g. "Mon to Sat, 10am to 7pm IST" */
  hours: "",
};

const digits = (value: string) => value.replace(/\D/g, "");

export const hasEmail = () => support.email.trim() !== "";
export const hasWhatsApp = () => digits(support.whatsapp).length > 0;
export const hasPhone = () => digits(support.phone).length > 0;
export const hasAnyChannel = () => hasEmail() || hasWhatsApp() || hasPhone();

export const mailLink = (subject: string, body: string) =>
  `mailto:${support.email.trim()}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export const whatsAppLink = (message: string) =>
  `https://wa.me/${digits(support.whatsapp)}?text=${encodeURIComponent(message)}`;

export const phoneLink = () => `tel:+${digits(support.phone)}`;

export const DEMO_SUBJECT = "Demo request";
export const DEMO_MESSAGE =
  "Hello BillSane team, I'd like a demo of BillSane for my business.\n\nBusiness name:\nType of business:\nNumber of people on my team:";
