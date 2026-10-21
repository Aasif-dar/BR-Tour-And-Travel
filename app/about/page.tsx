import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/config/site";
import { reasons } from "@/data/content";
import { PageHero } from "@/components/layout/PageHero";
import { Photo } from "@/components/ui/Photo";

export const metadata: Metadata = {
  title: "About Us",
  description: "BR Tour & Travels plans Hajj and Umrah journeys with clear information and attentive support.",
  alternates: { canonical: "/about" },
};

const commitments = [
  {
    title: "We explain before you commit",
    body: "Package details — hotels, inclusions, exclusions and payment terms — are set out in writing before you book.",
  },
  {
    title: "We keep you informed",
    body: "You will know what is happening with your documents and arrangements, and who to contact with questions.",
  },
  {
    title: "We respect the purpose of the journey",
    body: "Our role is to take care of the logistics, so that your attention can stay on worship.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Taking you closer to your spiritual journey."
        image="nabawiInterior"
        crumbs={[{ label: "Home", href: "/" }, { label: "About us" }]}
      />

      <section className="bg-ivory py-16 lg:py-24">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-4">Who we are</p>
            <h2 className="display text-[2.4rem] sm:text-5xl">A travel agency devoted to pilgrimage.</h2>
            <div className="prose-body mt-8 max-w-2xl space-y-5 text-[1.05rem]">
              <p>
                {site.name} helps Muslims plan Hajj and Umrah. For most pilgrims this is one of the most important
                journeys they will ever make — and often their first time travelling to the holy cities.
              </p>
              <p>
                Our approach is simple: listen carefully, explain clearly, and organise the practical side of the
                journey well, so that pilgrims and their families can travel with peace of mind.
              </p>
              {/* Add the agency's own story here: how it began, where it is based, the team. */}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="arch mx-auto max-w-sm">
              <Photo name="kaabaNight" sizes="(min-width: 1024px) 30vw, 80vw" className="aspect-3/4 w-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="on-dark bg-ink py-16 text-ivory lg:py-24">
        <div className="container-x">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">Our commitments</p>
            <h2 className="display text-[2.4rem] sm:text-5xl">Clear communication, from the first message.</h2>
          </div>
          <ul className="mt-14 grid gap-px bg-gold/20 md:grid-cols-3">
            {commitments.map((c) => (
              <li key={c.title} className="bg-ink p-8 lg:p-10">
                <h3 className="font-display text-[1.7rem] font-semibold leading-tight">{c.title}</h3>
                <p className="prose-body mt-3 text-[0.95rem]">{c.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-sand py-16 lg:py-24">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <Photo name="madinahSunrise" sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-4/5 w-full" />
          </div>
          <div className="lg:col-span-7 lg:pl-8">
            <p className="eyebrow mb-4">How we work</p>
            <h2 className="display text-[2.4rem] sm:text-5xl">What you can expect from us.</h2>
            <ol className="mt-10 border-t border-ink/15">
              {reasons.map((r, i) => (
                <li key={r.title} className="grid grid-cols-[3rem_1fr] border-b border-ink/15 py-6">
                  <span className="font-display text-3xl text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-semibold">{r.title}</h3>
                    <p className="prose-body mt-1 text-[0.95rem]">{r.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            {site.credentials.length > 0 && (
              <div className="mt-10">
                <h3 className="eyebrow mb-3">Registrations</h3>
                <ul className="space-y-1 text-[0.95rem]">
                  {site.credentials.map((c) => (
                    <li key={c.label}>
                      {c.label}
                      {c.reference && <span className="text-muted"> · Ref. {c.reference}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Link href="/contact" className="btn btn-ink mt-10">
              Talk to our team <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
