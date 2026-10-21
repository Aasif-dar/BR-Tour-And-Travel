import Link from "next/link";
import { packagesByType } from "@/data/packages";
import { PackageCompare } from "@/components/packages/PackageCompare";
import { SampleNotice } from "@/components/ui/Section";

export function UmrahCollection() {
  return (
    <section aria-labelledby="umrah-title" className="bg-sand py-20 lg:py-28">
      <div className="container-x">
        <div className="mb-12 grid gap-6 lg:mb-14 lg:grid-cols-12 lg:items-end">
          <h2 id="umrah-title" className="display text-[2.4rem] sm:text-5xl lg:col-span-6">
            The Umrah collection
          </h2>
          <p className="prose-body lg:col-span-4">
            Five ways to make the journey, compared side by side. Each is a starting point — dates, hotels and room
            sharing are shaped around your group.
          </p>
          <Link
            href="/umrah"
            className="link-line justify-self-start text-[0.82rem] font-semibold lg:col-span-2 lg:justify-self-end"
          >
            All Umrah details
          </Link>
        </div>

        <PackageCompare items={packagesByType("umrah")} />

        <div className="mt-8 max-w-xl">
          <SampleNotice>
            Sample outlines shown for illustration. Hotels, dates and prices are confirmed in your written quote.
          </SampleNotice>
        </div>
      </div>
    </section>
  );
}
