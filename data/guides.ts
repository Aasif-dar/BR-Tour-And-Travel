import type { ImageKey } from "@/config/images";

/**
 * Journey preparation guides. These are practical travel notes, not religious
 * rulings or immigration advice — each guide says so, and points readers to
 * scholars and official sources for anything authoritative.
 */

export type GuideSection = { heading: string; items: string[] };

export type Guide = {
  slug: string;
  title: string;
  kicker: string;
  excerpt: string;
  image: ImageKey;
  intro: string;
  sections: GuideSection[];
  note: string;
};

export const guides: Guide[] = [
  {
    slug: "umrah-preparation-checklist",
    title: "Umrah preparation checklist",
    kicker: "Before you travel",
    excerpt: "A calm, step-by-step list of what to arrange in the weeks before departure.",
    image: "haramDay",
    intro:
      "Good preparation leaves more room for the journey itself. Use this list as a starting point and adapt it to your own circumstances.",
    sections: [
      {
        heading: "Weeks before departure",
        items: [
          "Check that your passport has enough validity remaining for travel to Saudi Arabia.",
          "Confirm your travel dates, hotels and flights in writing with your travel agent.",
          "Ask about the current visa process and the documents needed for each traveller.",
          "Speak to your doctor about recommended vaccinations and any medication you take.",
          "Learn the rites of Umrah from a trusted scholar or reliable learning resource.",
        ],
      },
      {
        heading: "The final week",
        items: [
          "Keep copies of your passport, visa and booking confirmations, on paper and on your phone.",
          "Share your itinerary and hotel details with family at home.",
          "Arrange a phone plan or roaming so you can stay in contact.",
          "Pack your ihram garments or modest clothing where you can reach them easily.",
        ],
      },
      {
        heading: "On the day",
        items: [
          "Carry your passport, visa, tickets and any medication in your hand luggage.",
          "Allow plenty of time at the airport.",
          "Know where and when you will enter ihram, as advised by your scholar or group.",
        ],
      },
    ],
    note: "This checklist is general travel guidance. For the rites of Umrah, please learn from a qualified scholar.",
  },
  {
    slug: "documents-and-travel-requirements",
    title: "Documents & travel requirements",
    kicker: "Paperwork",
    excerpt: "The documents pilgrims are typically asked for, and how to keep them organised.",
    image: "jeddahTerminal",
    intro:
      "Requirements depend on your nationality, the type of visa and the season, and they change from time to time. Here is what pilgrims are commonly asked to prepare.",
    sections: [
      {
        heading: "Commonly requested",
        items: [
          "A valid passport, usually with several months of validity remaining.",
          "Recent passport-style photographs to the required specification.",
          "Completed visa application details for each traveller.",
          "Proof of relationship documents where family members travel together, if requested.",
          "Vaccination certificates, if required for the season.",
        ],
      },
      {
        heading: "Keeping documents safe",
        items: [
          "Keep originals in a zipped pouch in your hand luggage.",
          "Store digital copies somewhere you can reach without internet access.",
          "Note your hotel addresses and your group contact number on paper.",
        ],
      },
    ],
    note: "This is not immigration advice. Always confirm current requirements with us at the time of booking and with official Saudi government sources.",
  },
  {
    slug: "what-to-pack",
    title: "What to pack for the journey",
    kicker: "Packing",
    excerpt: "Light, practical and modest — the essentials for days of walking and worship.",
    image: "nabawiUmbrellas",
    intro:
      "You will walk a great deal, often in warm weather and large crowds. Pack light and choose comfort over everything else.",
    sections: [
      {
        heading: "Clothing",
        items: [
          "Ihram garments for men; loose, modest clothing for women.",
          "Comfortable, broken-in sandals or shoes, and a small bag for footwear at the mosque.",
          "Light layers — mosques and hotels can be strongly air-conditioned.",
        ],
      },
      {
        heading: "Personal items",
        items: [
          "Unscented toiletries for the time you are in ihram.",
          "Any regular medication, with a copy of the prescription.",
          "A refillable water bottle, sun protection and a small umbrella.",
          "A compact prayer mat and pocket-sized dua book.",
        ],
      },
      {
        heading: "Practical extras",
        items: [
          "A universal travel adaptor and a power bank.",
          "A small cross-body bag for your passport and phone.",
          "A few light snacks for long days.",
        ],
      },
    ],
    note: "Check your airline's baggage allowance before packing.",
  },
  {
    slug: "understanding-package-inclusions",
    title: "Understanding package inclusions",
    kicker: "Choosing a package",
    excerpt: "How to read a pilgrimage package and the questions worth asking before you book.",
    image: "kaabaDoor",
    intro:
      "Two packages with similar prices can include very different things. These are the details worth comparing.",
    sections: [
      {
        heading: "What to look for",
        items: [
          "Hotel names, or at least category and approximate distance to the Haram.",
          "Number of nights in Makkah and in Madinah.",
          "Whether flights, visa processing, transfers and meals are included.",
          "Room sharing — double, triple or quad — and how it affects the price.",
          "Transport type between cities: coach, private car or train.",
        ],
      },
      {
        heading: "Questions to ask",
        items: [
          "What exactly is excluded, and what might cost extra?",
          "What happens if flight times or hotel availability change?",
          "What are the payment schedule and cancellation terms?",
          "Who can I contact during the journey?",
        ],
      },
    ],
    note: "Your written quote is the final word on what a package includes.",
  },
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
