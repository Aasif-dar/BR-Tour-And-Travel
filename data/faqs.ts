/**
 * Frequently asked questions. Answers are deliberately general — visa rules,
 * fees and Hajj regulations change, so point visitors to a confirmed answer
 * at enquiry time rather than stating requirements as permanent facts.
 */

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "What is included in an Umrah package?",
    a: "It depends on the package you choose. Packages commonly cover visa processing assistance, hotels in Makkah and Madinah, and ground transfers, and some also include return flights or meals. Every package page lists its inclusions and exclusions, and your written quote confirms exactly what you are paying for.",
  },
  {
    q: "Can families enquire together?",
    a: "Yes. Tell us how many adults, children and elderly travellers are in your group and any mobility needs, and we will look for room layouts and transfers that keep the family together.",
  },
  {
    q: "How can I request package pricing?",
    a: "Send an enquiry with your preferred month, number of travellers and package type. Prices depend on dates, hotels and flights, so we share a written quote based on your details rather than a fixed public rate.",
  },
  {
    q: "What documents may be required?",
    a: "Typically a passport with sufficient validity, recent photographs and the details needed for the visa application. Requirements differ by nationality and change from time to time, so we confirm the current list with you when you enquire. Always check official Saudi government sources for the latest rules.",
  },
  {
    q: "How can I find out about upcoming departures?",
    a: "Follow us on Instagram for announcements, or send an enquiry and we will tell you which departures are currently available for your preferred dates.",
  },
  {
    q: "What is the difference between Hajj and Umrah packages?",
    a: "Hajj takes place on fixed days in the month of Dhul Hijjah and includes the stays in Mina, Arafat and Muzdalifah, with eligibility and places governed by each season's regulations. Umrah can be performed at most times of the year and is usually shorter and more flexible to plan.",
  },
  {
    q: "How can I contact BR Tour & Travels?",
    a: "Use the enquiry form on our contact page or message us on Instagram. Our team will get back to you with the information you need.",
  },
];
