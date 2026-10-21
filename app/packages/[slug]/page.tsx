import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { images } from "@/config/images";
import { availabilityLabel, getPackage, hajjItinerary, packages } from "@/data/packages";
import { whatsappLink, packageWhatsappMessage } from "@/lib/whatsapp";
import { PageHero } from "@/components/layout/PageHero";
import { PackageRow } from "@/components/packages/PackageSpread";
import { PriceLine } from "@/components/packages/PackageMeta";
import { InclusionLists, ItineraryTimeline } from "@/components/packages/Itinerary";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { SampleNotice } from "@/components/ui/Section";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/packages/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) return {};
  const img = images[pkg.image];
  return {
    title: pkg.name,
    description: pkg.summary,
    alternates: { canonical: `/packages/${pkg.slug}` },
    openGraph: { title: pkg.name, description: pkg.summary, images: [{ url: img.src, alt: img.alt }] },
  };
}

export default async function PackagePage({ params }: PageProps<"/packages/[slug]">) {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) notFound();

  const typeLabel = pkg.type === "hajj" ? "Hajj" : "Umrah";
  const listHref = pkg.type === "hajj" ? "/hajj" : "/umrah";
  const itinerary = pkg.itinerary.length > 0 ? pkg.itinerary : pkg.type === "hajj" ? hajjItinerary : [];
  const related = packages.filter((p) => p.type === pkg.type && p.slug !== pkg.slug).slice(0, 3);
  const wa = whatsappLink(packageWhatsappMessage(pkg.name));

  const facts = [
    { label: "Duration", value: pkg.duration },
    { label: "Departure city", value: pkg.departureCity ?? "Confirmed on enquiry" },
    { label: "Travel dates", value: pkg.travelDates ?? "Dates on request" },
    { label: "Availability", value: availabilityLabel[pkg.availability] },
  ];

  return (
    <>
      <PageHero
        eyebrow={`${typeLabel} · ${pkg.category}`}
        title={pkg.name}
        intro={pkg.summary}
        image={pkg.image}
        crumbs={[
          { label: "Home", href: "/" },
          { label: `${typeLabel} packages`, href: listHref },
          { label: pkg.name },
        ]}
      />

      {/* Key facts */}
      <section aria-label="Key facts" className="border-b border-line bg-ivory">
        <dl className="container-x grid grid-cols-2 lg:grid-cols-4">
          {facts.map((f, i) => (
            <div
              key={f.label}
              className={`border-line py-6 pr-4 ${i % 2 === 1 ? "border-l pl-4 lg:pl-6" : ""} ${i === 2 ? "lg:border-l lg:pl-6" : ""} ${i < 2 ? "border-b lg:border-b-0" : ""}`}
            >
              <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted">{f.label}</dt>
              <dd className="mt-2 font-display text-xl font-semibold leading-tight sm:text-2xl">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="bg-ivory py-14 lg:py-20">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="space-y-16 lg:col-span-8">
            {pkg.isSample && (
              <div className="border-l-2 border-gold bg-sand px-5 py-4">
                <SampleNotice>
                  This is a sample package outline. Hotels, dates, inclusions and prices are confirmed individually in
                  your written quote.
                </SampleNotice>
              </div>
            )}

            <section aria-labelledby="highlights">
              <h2 id="highlights" className="display text-4xl">
                At a glance
              </h2>
              <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-y border-line py-5">
                {pkg.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2.5 text-[0.95rem]">
                    <span className="size-1.5 rotate-45 bg-gold-deep" aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="stay">
              <h2 id="stay" className="display text-4xl">
                Accommodation &amp; transport
              </h2>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-120 text-left text-[0.95rem]">
                  <thead>
                    <tr className="border-b border-ink text-[0.7rem] uppercase tracking-[0.16em] text-muted">
                      <th scope="col" className="py-3 pr-4 font-semibold">City</th>
                      <th scope="col" className="py-3 pr-4 font-semibold">Hotel</th>
                      <th scope="col" className="py-3 font-semibold">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pkg.hotels.map((h) => (
                      <tr key={h.city} className="border-b border-line align-top">
                        <th scope="row" className="py-4 pr-4 font-display text-xl font-semibold">
                          {h.city}
                          {h.nights && <span className="block text-sm font-normal text-muted">{h.nights} nights</span>}
                        </th>
                        <td className="py-4 pr-4">{h.name ?? <span className="text-muted">Confirmed at booking</span>}</td>
                        <td className="py-4">
                          {h.category}
                          {h.note && <span className="block text-[0.82rem] text-muted">{h.note}</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <dl className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <dt className="eyebrow">Rooms</dt>
                  <dd className="prose-body mt-2">{pkg.accommodation}</dd>
                </div>
                <div>
                  <dt className="eyebrow">Transport</dt>
                  <dd className="prose-body mt-2">{pkg.transport}</dd>
                </div>
              </dl>
            </section>

            <section aria-labelledby="inclusions">
              <h2 id="inclusions" className="display mb-8 text-4xl">
                What’s included
              </h2>
              <InclusionLists included={pkg.inclusions} excluded={pkg.exclusions} />
            </section>

            {itinerary.length > 0 && (
              <section aria-labelledby="itinerary">
                <h2 id="itinerary" className="display text-4xl">
                  {pkg.type === "hajj" ? "Tentative itinerary" : "Sample itinerary"}
                </h2>
                <p className="prose-body mt-3 mb-10 max-w-xl text-[0.95rem]">
                  An outline of how the journey is usually structured. Your final itinerary is shared before departure.
                </p>
                <ItineraryTimeline steps={itinerary} />
              </section>
            )}
          </div>

          {/* Sticky quote panel */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="on-dark bg-ink p-7 text-ivory">
                <p className="eyebrow mb-4">Pricing</p>
                <PriceLine pkg={pkg} tone="dark" />
                <p className="mt-5 border-t border-ivory/15 pt-5 text-[0.88rem] leading-relaxed text-mist">
                  Prices depend on dates, flights, hotels and room sharing. Send your details for a written quote.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <a href="#package-enquiry" className="btn btn-gold w-full">
                    Enquire about this package
                  </a>
                  {wa && (
                    <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light w-full">
                      <WhatsAppIcon className="size-4" /> Ask on WhatsApp
                    </a>
                  )}
                </div>
              </div>
              <Link href={listHref} className="link-line mt-6 inline-block text-sm font-semibold">
                ← All {typeLabel} packages
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <section id="package-enquiry" aria-labelledby="pe-title" className="border-t border-line bg-sand py-16 lg:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4">Enquire</p>
            <h2 id="pe-title" className="display text-4xl sm:text-5xl">
              Request a quote for {pkg.name}.
            </h2>
            <p className="prose-body mt-5">We will reply with available dates, hotel options and a written price.</p>
          </div>
          <div className="lg:col-span-8">
            <div className="border border-line bg-white p-6 sm:p-10">
              <EnquiryForm
                defaultType={pkg.type === "hajj" ? "Hajj" : "Umrah"}
                packageName={pkg.name}
                idPrefix={`pkg-${pkg.slug}`}
              />
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="bg-ivory py-16 lg:py-24">
          <div className="container-x">
            <div className="flex items-end justify-between gap-6">
              <h2 id="related-title" className="display text-4xl sm:text-5xl">
                Other {typeLabel} options
              </h2>
              <Link href={listHref} className="link-line hidden items-center gap-2 text-sm font-semibold sm:inline-flex">
                View all <ArrowRight className="size-4" />
              </Link>
            </div>
            <ul className="mt-8 border-t border-ink lg:max-w-3xl">
              {related.map((p) => (
                <PackageRow key={p.slug} pkg={p} />
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
