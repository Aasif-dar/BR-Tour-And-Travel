import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { hajjItinerary, packagesByType } from "@/data/packages";
import { PageHero } from "@/components/layout/PageHero";
import { PackageSpread } from "@/components/packages/PackageSpread";
import { InclusionLists, ItineraryTimeline } from "@/components/packages/Itinerary";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Photo } from "@/components/ui/Photo";
import { SampleNotice, SectionHeading } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Hajj Packages",
  description:
    "Plan your Hajj with BR Tour & Travels — an overview of Hajj package options, a tentative itinerary of the days of Hajj, accommodation, documents and eligibility.",
  alternates: { canonical: "/hajj" },
};

const stays = [
  {
    title: "Makkah & Madinah",
    body: "Hotel stays before and after the days of Hajj. Hotel category and distance to the Haram are confirmed with your quote.",
  },
  {
    title: "Mina & Arafat",
    body: "Tented camps during the days of Hajj. Camp category and location are set by each season's allocation and confirmed in advance.",
  },
  {
    title: "Transport",
    body: "Transfers between the airport, the holy cities and the sites of Hajj, as organised for the season.",
  },
];

const documents = [
  "A passport with sufficient validity for the season.",
  "Recent photographs to the required specification.",
  "Vaccination certificates required for Hajj in that season.",
  "Any registration required by the Hajj authorities of your country of residence.",
  "Proof of relationship for family members travelling together, where requested.",
];

export default function HajjPage() {
  const hajj = packagesByType("hajj");
  return (
    <>
      <PageHero
        eyebrow="Hajj packages"
        title="Hajj, planned with clarity and care."
        intro="The fifth pillar of Islam, and for many the journey of a lifetime. We help you understand the options for the season and prepare every step with you."
        image="arafat"
        position="50% 40%"
        crumbs={[{ label: "Home", href: "/" }, { label: "Hajj packages" }]}
      />

      {/* Overview + important notice */}
      <section className="bg-ivory py-16 lg:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Overview" title="How Hajj planning works.">
              <p>
                Hajj takes place on fixed days in Dhul Hijjah, and places are allocated each season under the
                regulations of Saudi Arabia and of the pilgrim’s country of residence. Planning usually starts many
                months ahead.
              </p>
              <p className="mt-4">
                We talk through your situation, explain which options may be available to you, and — once a place is
                confirmed — coordinate your accommodation, transport and preparation.
              </p>
            </SectionHeading>
          </div>
          <aside className="lg:col-span-5">
            <div className="border border-gold/60 bg-sand p-7">
              <p className="flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-gold-deep">
                <AlertTriangle className="size-4" aria-hidden="true" /> Please note
              </p>
              <ul className="mt-4 space-y-3 text-[0.94rem] leading-relaxed text-ink/85">
                <li>Hajj places, quotas and eligibility rules differ by country and change each season.</li>
                <li>Package availability, prices and dates must be confirmed for the relevant season before booking.</li>
                <li>No Hajj booking is final until the required approvals and visa have been issued.</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Package categories */}
      <section className="border-t border-line bg-ivory py-16 lg:py-24">
        <div className="container-x">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading eyebrow="Package categories" title="Two ways to travel." />
            <div className="max-w-sm">
              <SampleNotice>
                Sample categories shown. Categories offered for a given season are confirmed on enquiry.
              </SampleNotice>
            </div>
          </div>
          <ul className="mt-10 border-b border-ink/15">
            {hajj.map((p, i) => (
              <li key={p.slug}>
                <PackageSpread pkg={p} reverse={i % 2 === 1} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Tentative itinerary */}
      <section aria-labelledby="itinerary-title" className="on-dark bg-ink py-20 text-ivory lg:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
            <p className="text-[0.78rem] tracking-[0.04em] text-gold">Tentative itinerary</p>
            <h2 id="itinerary-title" className="display mt-4 text-[2.4rem] sm:text-5xl">
              The days of Hajj
            </h2>
            <p className="prose-body mt-5">
              A general outline only. Exact timings, the order of Makkah and Madinah, and movements between the sites
              depend on the season and your group’s schedule.
            </p>
            <p lang="ar" dir="rtl" className="mt-10 font-arabic text-[2rem] leading-snug text-gold">
              لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ
            </p>
            <p className="mt-1 font-display text-lg italic text-mist">“Here I am, O Allah, here I am.”</p>
            </div>
          </div>
          <div className="lg:col-span-7 lg:pt-4">
            <ItineraryTimeline steps={hajjItinerary} tone="dark" />
          </div>
        </div>
      </section>

      {/* Accommodation & transport */}
      <section className="bg-ivory py-16 lg:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Stays & transport" title="Where you will stay, and how you will travel." />
          <ul className="mt-12 grid border-t border-line md:grid-cols-3">
            {stays.map((s, i) => (
              <li key={s.title} className={`border-b border-line py-8 md:border-b-0 md:px-8 ${i === 0 ? "md:pl-0" : "md:border-l"}`}>
                <h3 className="font-display text-[1.6rem]">{s.title}</h3>
                <p className="prose-body mt-2 text-[0.95rem]">{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Inclusions + documents */}
      <section className="bg-sand py-16 lg:py-24">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="display mb-10 text-4xl sm:text-5xl">What a Hajj package covers.</h2>
            <InclusionLists included={hajj[0].inclusions} excluded={hajj[0].exclusions} />
            <div className="mt-8">
              <SampleNotice>Your quote lists exactly what is included for your season and package.</SampleNotice>
            </div>
          </div>
          <div className="lg:col-span-5">
            <h2 className="display mb-10 text-4xl sm:text-5xl">Documents &amp; eligibility.</h2>
            <ol className="space-y-4">
              {documents.map((d, i) => (
                <li key={d} className="grid grid-cols-[2rem_1fr] text-[0.95rem] leading-relaxed">
                  <span className="font-display text-xl text-gold-deep">{i + 1}.</span>
                  {d}
                </li>
              ))}
            </ol>
            <p className="mt-8 border-l-2 border-gold pl-4 text-[0.85rem] leading-relaxed text-muted">
              Requirements vary by nationality and season. This list is general guidance, not immigration advice — we
              confirm the current requirements with you individually.
            </p>
          </div>
        </div>
      </section>

      {/* Enquiry */}
      <section id="enquire" aria-labelledby="enquire-title" className="bg-ivory py-16 lg:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4">Consultation</p>
            <h2 id="enquire-title" className="display text-[2.4rem] sm:text-5xl">
              Discuss your Hajj journey.
            </h2>
            <p className="prose-body mt-5">
              Share a few details and our team will contact you to talk through the options for the coming season —
              with no obligation.
            </p>
            <div className="arch mt-10 hidden max-w-sm lg:block">
              <Photo name="kaabaNight" sizes="30vw" className="aspect-3/4 w-full" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="border border-line bg-white p-6 sm:p-10">
              <EnquiryForm defaultType="Hajj" idPrefix="hajj" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
