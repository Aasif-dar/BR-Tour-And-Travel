import type { ImageKey } from "@/config/images";

/**
 * Package catalogue.
 *
 * IMPORTANT: every entry below is SAMPLE content (`isSample: true`) that shows
 * how a package is presented. Replace names, durations, hotels, inclusions and
 * itineraries with the agency's confirmed offers, then set `isSample: false`.
 * Leave `price` null to show "Request a quote"; leave `travelDates` null to show
 * "Dates on request".
 */

export type PackageType = "umrah" | "hajj";

export type Availability = "enquire" | "open" | "limited" | "waitlist" | "closed";

export type HotelStay = {
  city: string;
  nights: number | null;
  name: string | null; // null = "Hotel confirmed at booking"
  category: string;
  note?: string;
};

export type ItineraryStep = {
  when: string;
  title: string;
  detail: string;
};

export type TravelPackage = {
  slug: string;
  type: PackageType;
  category: string;
  name: string;
  summary: string;
  image: ImageKey;
  /** One line on who the package suits — used in the comparison sheet. */
  bestFor: string;
  /** Short transfer description for the comparison sheet. */
  transfers: string;
  price: { amount: number; currency: string; basis: string } | null;
  duration: string;
  departureCity: string | null;
  travelDates: string | null;
  hotels: HotelStay[];
  accommodation: string;
  transport: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  availability: Availability;
  itinerary: ItineraryStep[];
  isSample: boolean;
};

export const availabilityLabel: Record<Availability, string> = {
  enquire: "Enquire for availability",
  open: "Open for booking",
  limited: "Limited places",
  waitlist: "Waitlist",
  closed: "Closed for this season",
};

const commonUmrahExclusions = [
  "Personal expenses, laundry and telephone charges",
  "Meals not stated in the package",
  "Travel insurance unless confirmed in writing",
  "Charges arising from changes in government fees or airline fares after booking",
];

const umrahItinerary = (makkahNights: string, madinahNights: string): ItineraryStep[] => [
  {
    when: "Arrival",
    title: "Arrive in the Kingdom",
    detail:
      "Arrival at Jeddah or Madinah airport, assistance with transfer to your hotel and time to rest before your rites.",
  },
  {
    when: `Makkah · ${makkahNights}`,
    title: "Umrah and days in Makkah",
    detail:
      "Perform your Umrah at a comfortable pace, then spend the remaining days in worship at Masjid al-Haram.",
  },
  {
    when: "Transfer",
    title: "Makkah to Madinah",
    detail: "Road or rail transfer between the holy cities, as stated in the confirmed package.",
  },
  {
    when: `Madinah · ${madinahNights}`,
    title: "Days in Madinah",
    detail:
      "Time for prayer at Masjid an-Nabawi, with optional visits to historic sites such as Masjid Quba where arranged.",
  },
  {
    when: "Departure",
    title: "Return journey",
    detail: "Check-out and transfer to the airport for your flight home.",
  },
];

export const packages: TravelPackage[] = [
  {
    slug: "economy-umrah",
    type: "umrah",
    category: "Economy",
    name: "Economy Umrah",
    summary:
      "A practical, well-organised Umrah for pilgrims who want the essentials handled clearly and affordably.",
    image: "haramDay",
    bestFor: "Pilgrims keeping costs in check",
    transfers: "Shared coach",
    price: null,
    duration: "Approx. 10–14 nights",
    departureCity: null,
    travelDates: null,
    hotels: [
      { city: "Makkah", nights: null, name: null, category: "Economy hotel", note: "Distance to the Haram confirmed at booking" },
      { city: "Madinah", nights: null, name: null, category: "Economy hotel" },
    ],
    accommodation: "Shared or private rooms, depending on the option you choose.",
    transport: "Shared ground transfers between airport, Makkah and Madinah.",
    highlights: ["Essential arrangements", "Shared transfers", "Room sharing options"],
    inclusions: [
      "Umrah visa processing assistance",
      "Hotel accommodation in Makkah and Madinah",
      "Ground transfers as listed",
      "Pre-departure briefing",
    ],
    exclusions: ["Return flights unless stated in your quote", ...commonUmrahExclusions],
    availability: "enquire",
    itinerary: umrahItinerary("approx. 5–7 nights", "approx. 4–6 nights"),
    isSample: true,
  },
  {
    slug: "standard-umrah",
    type: "umrah",
    category: "Standard",
    name: "Standard Umrah",
    summary:
      "Balanced comfort and value, with closer hotels and a more relaxed pace between Makkah and Madinah.",
    image: "greenDome",
    bestFor: "First-time pilgrims and couples",
    transfers: "Coach or private",
    price: null,
    duration: "Approx. 12–15 nights",
    departureCity: null,
    travelDates: null,
    hotels: [
      { city: "Makkah", nights: null, name: null, category: "3–4 star hotel", note: "Distance to the Haram confirmed at booking" },
      { city: "Madinah", nights: null, name: null, category: "3–4 star hotel" },
    ],
    accommodation: "Double, triple or quad rooms.",
    transport: "Ground transfers by coach or private vehicle, as quoted.",
    highlights: ["Closer hotels", "Return flights quoted", "Ziyarat on request"],
    inclusions: [
      "Return flights (where quoted)",
      "Umrah visa processing assistance",
      "Hotel accommodation in Makkah and Madinah",
      "Airport and inter-city transfers",
      "Pre-departure briefing",
    ],
    exclusions: commonUmrahExclusions,
    availability: "enquire",
    itinerary: umrahItinerary("approx. 6–8 nights", "approx. 5–7 nights"),
    isSample: true,
  },
  {
    slug: "premium-umrah",
    type: "umrah",
    category: "Premium",
    name: "Premium Umrah",
    summary:
      "For pilgrims who value proximity and calm — hotels close to the Haram and private transfers throughout.",
    image: "kaabaDoor",
    bestFor: "Those who value proximity and privacy",
    transfers: "Private car",
    price: null,
    duration: "Flexible, tailored to you",
    departureCity: null,
    travelDates: null,
    hotels: [
      { city: "Makkah", nights: null, name: null, category: "5 star hotel", note: "Proximity to the Haram confirmed at booking" },
      { city: "Madinah", nights: null, name: null, category: "5 star hotel" },
    ],
    accommodation: "Private double or family rooms; room views on request, subject to hotel availability.",
    transport: "Private transfers by car or van.",
    highlights: ["Hotels near the Haram", "Private transfers", "Flexible dates"],
    inclusions: [
      "Return flights (where quoted)",
      "Umrah visa processing assistance",
      "Premium hotel accommodation in Makkah and Madinah",
      "Private airport and inter-city transfers",
      "Breakfast at hotels (where quoted)",
    ],
    exclusions: commonUmrahExclusions,
    availability: "enquire",
    itinerary: umrahItinerary("tailored", "tailored"),
    isSample: true,
  },
  {
    slug: "family-umrah",
    type: "umrah",
    category: "Family",
    name: "Family Umrah",
    summary:
      "Arranged around parents, children and elders travelling together — room layouts, pacing and transfers planned as one group.",
    image: "nabawiUmbrellas",
    bestFor: "Parents, children and elders together",
    transfers: "Private van",
    price: null,
    duration: "Approx. 10–15 nights",
    departureCity: null,
    travelDates: null,
    hotels: [
      { city: "Makkah", nights: null, name: null, category: "3–5 star, as preferred" },
      { city: "Madinah", nights: null, name: null, category: "3–5 star, as preferred" },
    ],
    accommodation: "Family rooms or connecting rooms, subject to hotel availability.",
    transport: "Private family transfers.",
    highlights: ["Family room planning", "Private transfers", "Pacing for elders"],
    inclusions: [
      "Return flights (where quoted)",
      "Umrah visa processing assistance for each traveller",
      "Family accommodation in Makkah and Madinah",
      "Private transfers",
      "Pre-departure briefing for the whole family",
    ],
    exclusions: ["Wheelchair or mobility services unless requested and confirmed", ...commonUmrahExclusions],
    availability: "enquire",
    itinerary: umrahItinerary("approx. 5–8 nights", "approx. 4–7 nights"),
    isSample: true,
  },
  {
    slug: "ramadan-umrah",
    type: "umrah",
    category: "Ramadan",
    name: "Ramadan Umrah",
    summary:
      "Umrah during the blessed month. Demand is high, so dates, hotels and prices are confirmed individually on enquiry.",
    image: "haramOverlook",
    bestFor: "Worship in the blessed month",
    transfers: "As quoted",
    price: null,
    duration: "Part or whole of Ramadan",
    departureCity: null,
    travelDates: null,
    hotels: [
      { city: "Makkah", nights: null, name: null, category: "Subject to Ramadan availability" },
      { city: "Madinah", nights: null, name: null, category: "Subject to Ramadan availability" },
    ],
    accommodation: "Room types confirmed with the quote.",
    transport: "Transfers as stated in your quote.",
    highlights: ["Ramadan dates", "Early enquiry advised", "Last ten nights options"],
    inclusions: [
      "Umrah visa processing assistance",
      "Hotel accommodation in Makkah and Madinah",
      "Transfers as quoted",
      "Pre-departure briefing",
    ],
    exclusions: ["Suhoor and iftar unless stated in your quote", ...commonUmrahExclusions],
    availability: "enquire",
    itinerary: umrahItinerary("as quoted", "as quoted"),
    isSample: true,
  },

  // ---------------------------------------------------------------- Hajj
  {
    slug: "hajj-standard",
    type: "hajj",
    category: "Standard",
    name: "Hajj — Standard",
    summary:
      "A structured Hajj journey covering the days of Hajj in Mina, Arafat and Muzdalifah, with time in Makkah and Madinah.",
    image: "kaabaHajj",
    bestFor: "Pilgrims planning their first Hajj",
    transfers: "Coach, organised for the season",
    price: null,
    duration: "Approx. 3–5 weeks",
    departureCity: null,
    travelDates: null,
    hotels: [
      { city: "Makkah", nights: null, name: null, category: "As confirmed for the season" },
      { city: "Madinah", nights: null, name: null, category: "As confirmed for the season" },
      { city: "Mina & Arafat", nights: null, name: null, category: "Tented camp", note: "Camp category set by the season's allocation" },
    ],
    accommodation: "Shared rooms in Makkah and Madinah; shared tents in Mina and Arafat.",
    transport: "Coach transfers between the holy sites as organised for the season.",
    highlights: ["Days of Hajj covered", "Makkah & Madinah stays", "Group coordination"],
    inclusions: [
      "Hajj visa processing assistance, subject to eligibility",
      "Accommodation in Makkah and Madinah",
      "Mina and Arafat camp arrangements",
      "Transfers between the holy sites",
      "Pre-departure Hajj briefing",
    ],
    exclusions: [
      "Qurbani (sacrifice) unless included in your quote",
      "Personal expenses and meals not stated",
      "Changes required by Saudi authorities or the season's regulations",
    ],
    availability: "enquire",
    itinerary: [],
    isSample: true,
  },
  {
    slug: "hajj-premium",
    type: "hajj",
    category: "Premium",
    name: "Hajj — Premium",
    summary:
      "Greater comfort through the Hajj days, with higher-category hotels and camps where the season's allocation allows.",
    image: "kaabaAerial",
    bestFor: "Greater comfort through the Hajj days",
    transfers: "As organised for the season",
    price: null,
    duration: "Approx. 3–4 weeks",
    departureCity: null,
    travelDates: null,
    hotels: [
      { city: "Makkah", nights: null, name: null, category: "Higher-category hotel, as available" },
      { city: "Madinah", nights: null, name: null, category: "Higher-category hotel, as available" },
      { city: "Mina & Arafat", nights: null, name: null, category: "Upgraded camp, where available" },
    ],
    accommodation: "Double, triple or quad rooms; camp category confirmed with your quote.",
    transport: "Transfers between the holy sites as organised for the season.",
    highlights: ["Higher-category stays", "Smaller group sizes", "Personal coordination"],
    inclusions: [
      "Hajj visa processing assistance, subject to eligibility",
      "Accommodation in Makkah and Madinah",
      "Mina and Arafat camp arrangements",
      "Transfers between the holy sites",
      "Pre-departure Hajj briefing",
    ],
    exclusions: [
      "Qurbani (sacrifice) unless included in your quote",
      "Personal expenses and meals not stated",
      "Changes required by Saudi authorities or the season's regulations",
    ],
    availability: "enquire",
    itinerary: [],
    isSample: true,
  },
];

/** A general, tentative outline of the Hajj days. Exact timings vary each season. */
export const hajjItinerary: ItineraryStep[] = [
  {
    when: "Before Hajj",
    title: "Arrival and settling in",
    detail:
      "Arrive in the Kingdom and stay in Makkah or Madinah. Many groups visit Madinah before or after the days of Hajj.",
  },
  {
    when: "8 Dhul Hijjah",
    title: "Day of Tarwiyah — Mina",
    detail: "Enter ihram for Hajj and travel to Mina, spending the day and night in the camp.",
  },
  {
    when: "9 Dhul Hijjah",
    title: "Day of Arafah — Arafat, then Muzdalifah",
    detail:
      "Spend the day at Arafat in worship and supplication, then move to Muzdalifah after sunset to spend the night.",
  },
  {
    when: "10 Dhul Hijjah",
    title: "Eid al-Adha — Jamarat and Tawaf al-Ifadah",
    detail:
      "The rites of the day include stoning Jamarat al-Aqabah, the sacrifice, shaving or trimming the hair, and Tawaf al-Ifadah (with Sa'i where required).",
  },
  {
    when: "11–13 Dhul Hijjah",
    title: "Days of Tashreeq — Mina",
    detail: "Remain in Mina and stone the three Jamarat each day, leaving on the 12th or 13th.",
  },
  {
    when: "After Hajj",
    title: "Farewell and return",
    detail: "Tawaf al-Wada' before leaving Makkah, then onward travel to Madinah or home.",
  },
];

export const getPackage = (slug: string) => packages.find((p) => p.slug === slug);
export const packagesByType = (type: PackageType) => packages.filter((p) => p.type === type);
