/**
 * Central business configuration for BR Tour & Travels.
 *
 * Everything a visitor might rely on (phone numbers, addresses, licences)
 * is `null` until the agency confirms it. Components hide or soften any
 * element whose value is missing, so nothing invented ever reaches the page.
 */

export type NavItem = { label: string; href: string };

export const site = {
  name: "BR Tour & Travels",
  shortName: "BR Tour & Travels",
  // Taken verbatim from the Instagram bio (@brtourandtravels_).
  tagline: "Taking you closer to your spiritual journey.",
  description:
    "BR Tour & Travels helps pilgrims plan Hajj and Umrah journeys with clear package information, travel coordination and attentive support from first enquiry to departure.",

  // Used for canonical URLs and Open Graph. Set NEXT_PUBLIC_SITE_URL in production.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  announcement: {
    // Keep this free of dates or availability claims unless confirmed.
    text: "Hajj & Umrah enquiries are open — share your plans and our team will guide you through the available options.",
    link: { label: "Start an enquiry", href: "/contact" },
  },

  contact: {
    // Set once confirmed by the agency. Leave null to hide.
    phone: null as string | null, // e.g. "+00 00000 00000"
    email: null as string | null, // e.g. "info@example.com"
    address: null as string | null, // full postal address of the office
    hours: null as string | null, // e.g. "Mon–Sat, 10:00–19:00"
    // Default country code for the enquiry form's phone field, e.g. "+91".
    defaultDialCode: null as string | null,
  },

  whatsapp: {
    // International format, digits only, no "+" — e.g. "919876543210".
    // Leave null until the official business number is confirmed.
    number: null as string | null,
  },

  social: {
    instagram: {
      handle: "@brtourandtravels_",
      url: "https://www.instagram.com/brtourandtravels_/",
    },
    facebook: null as string | null,
    youtube: null as string | null,
  },

  /**
   * Licences and official registrations.
   *
   * The Instagram bio states the agency is approved by the Ministry of Hajj
   * and Umrah of Saudi Arabia. Add an entry here only after the approval has
   * been verified (with its reference number), and it will appear in the
   * footer and About page.
   */
  credentials: [] as { label: string; reference?: string }[],

  nav: [
    { label: "Home", href: "/" },
    { label: "Umrah Packages", href: "/umrah" },
    { label: "Hajj Packages", href: "/hajj" },
    { label: "Our Services", href: "/#services" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[],
} as const;

export const hasWhatsApp = () => Boolean(site.whatsapp.number);
