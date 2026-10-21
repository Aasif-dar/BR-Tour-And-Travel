import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { packagesByType } from "@/data/packages";
import { PageHero } from "@/components/layout/PageHero";
import { PackageBrowser } from "@/components/packages/PackageBrowser";
import { PackageCompare } from "@/components/packages/PackageCompare";
import { SampleNotice } from "@/components/ui/Section";
import { JourneySteps } from "@/components/home/JourneySteps";

export const metadata: Metadata = {
  title: "Umrah Packages",
  description:
    "Explore Umrah package options from BR Tour & Travels — economy, standard, premium, family and Ramadan journeys, each tailored to your dates and group.",
  alternates: { canonical: "/umrah" },
};

export default function UmrahPage() {
  const umrah = packagesByType("umrah");
  return (
    <>
      <PageHero
        eyebrow="Umrah packages"
        title="Umrah, arranged around your group."
        intro="Start from the style of journey that suits you. Every package is confirmed around your dates, room sharing and preferences."
        image="greenDome"
        position="50% 88%"
        crumbs={[{ label: "Home", href: "/" }, { label: "Umrah packages" }]}
      />

      <section aria-labelledby="compare-title" className="bg-sand py-16 lg:py-24">
        <div className="container-x">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <h2 id="compare-title" className="display text-[2.2rem] sm:text-[2.7rem]">
              Compare at a glance
            </h2>
            <div className="max-w-md">
              <SampleNotice>
                Sample outlines showing the kinds of journeys available. Durations, hotels, inclusions and prices are
                confirmed in your written quote.
              </SampleNotice>
            </div>
          </div>
          <PackageCompare items={umrah} />
        </div>
      </section>

      <section aria-labelledby="details-title" className="bg-ivory py-16 lg:py-24">
        <div className="container-x">
          <h2 id="details-title" className="display mb-10 text-[2.2rem] sm:text-[2.7rem]">
            Each package in detail
          </h2>
          <PackageBrowser items={umrah} />
        </div>
      </section>

      <section className="on-dark bg-ink text-ivory">
        <div className="container-x flex flex-col gap-6 py-14 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="display text-[2rem] sm:text-[2.4rem]">Not sure which suits you?</h2>
            <p className="mt-2 text-mist">Tell us about your group and we will suggest suitable options.</p>
          </div>
          <Link href="/contact" className="btn btn-gold self-start lg:self-auto">
            Ask our team <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <JourneySteps />
    </>
  );
}
