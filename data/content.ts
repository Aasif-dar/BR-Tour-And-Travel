import type { ImageKey } from "@/config/images";

/**
 * Editable marketing copy. Statements here describe how the agency works;
 * review each one with the agency and remove anything it does not offer.
 */

/** What the agency arranges. Remove any line the agency does not offer. */
export const services = [
  {
    title: "Journey planning",
    body: "We start with your dates, budget and who is travelling, then shape the options around your group.",
  },
  {
    title: "Flights & hotels",
    body: "Flights where quoted, with hotels in Makkah and Madinah arranged as one itinerary.",
  },
  {
    title: "Visa assistance",
    body: "Help preparing the documents and applications each traveller needs.",
  },
  {
    title: "Ground transfers",
    body: "Airport, Makkah–Madinah and local transfers by coach or private vehicle, as quoted.",
  },
  {
    title: "Pre-departure guidance",
    body: "A briefing on documents, timings and what to expect, well before you fly.",
  },
];

export const approach =
  "Every quote sets out hotels, inclusions and exclusions in writing, and you keep one point of contact from first question to departure day.";

export const reasons = [
  {
    title: "Thoughtful planning",
    body: "Every journey starts with a conversation about your needs, not a fixed brochure.",
  },
  {
    title: "Transparent package information",
    body: "Inclusions, exclusions and hotel details are set out clearly before you commit.",
  },
  {
    title: "Dedicated assistance",
    body: "A point of contact who knows your booking and answers your questions.",
  },
  {
    title: "Clear communication before departure",
    body: "Documents, timings and travel details shared well ahead of your journey.",
  },
];

export const journeySteps = [
  {
    title: "Share your travel requirements",
    body: "Tell us who is travelling, your preferred month and the kind of stay you are looking for.",
  },
  {
    title: "Explore suitable packages",
    body: "We set out the options that fit — with hotels, durations, inclusions and price clearly listed.",
  },
  {
    title: "Confirm arrangements & documents",
    body: "Once you choose, we guide you through bookings, payments and the documents each traveller needs.",
  },
  {
    title: "Prepare for your sacred journey",
    body: "Receive your travel details and pre-departure guidance, so you can focus on the journey itself.",
  },
];

export type GalleryItem = { image: ImageKey; caption: string; layout: "tall" | "wide" | "square" };

// Order matters: on the 4-column desktop grid these tiles interlock into
// three complete rows (tall = 2 rows, wide = 2 columns).
export const gallery: GalleryItem[] = [
  { image: "kaabaNight", caption: "The Kaaba at night, Makkah", layout: "tall" },
  { image: "nabawiDusk", caption: "Masjid an-Nabawi at dusk, Madinah", layout: "wide" },
  { image: "kaabaAerial", caption: "The mataf, Masjid al-Haram", layout: "square" },
  { image: "nabawiInterior", caption: "Inside Masjid an-Nabawi", layout: "square" },
  { image: "quba", caption: "Masjid Quba, Madinah", layout: "square" },
  { image: "nabawiGate", caption: "A gate of Masjid an-Nabawi", layout: "tall" },
  { image: "jeddahTerminal", caption: "The Hajj Terminal, Jeddah", layout: "wide" },
  { image: "jabalNur", caption: "Jabal al-Nour, Makkah", layout: "square" },
];

export type Testimonial = {
  quote: string;
  name: string;
  context: string; // e.g. "Umrah, March 2026"
  verified: boolean; // set true only when confirmed by the agency
};

/**
 * Real customer feedback only. Add entries with the customer's permission.
 * The section shows a considered empty state while this list is empty.
 */
export const testimonials: Testimonial[] = [];
