import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { TravelPackage } from "@/data/packages";
import { Photo } from "@/components/ui/Photo";
import { AvailabilityTag, PriceLine } from "./PackageMeta";

/**
 * A package laid out like a brochure spread: photograph on one side, the
 * essentials on the other. Alternate `reverse` down a list for rhythm.
 */
export function PackageSpread({
  pkg,
  reverse = false,
  headingLevel = "h3",
}: {
  pkg: TravelPackage;
  reverse?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const href = `/packages/${pkg.slug}`;
  const shown = pkg.inclusions.slice(0, 3);
  const more = pkg.inclusions.length - shown.length;

  return (
    <article className="grid gap-8 border-t border-ink/15 py-12 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-16">
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className={`group block overflow-hidden lg:col-span-6 ${reverse ? "lg:order-2 lg:col-start-7" : ""}`}
      >
        <Photo
          name={pkg.image}
          sizes="(min-width: 1024px) 46vw, 100vw"
          className="aspect-4/3 w-full"
          imgClassName="transition-transform duration-1000 group-hover:scale-[1.03]"
        />
      </Link>

      <div className={`lg:col-span-5 ${reverse ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"}`}>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="text-[0.78rem] tracking-[0.04em] text-gold-deep">{pkg.category}</span>
          <AvailabilityTag pkg={pkg} />
        </div>
        <Heading className="display mt-3 text-[2.3rem] sm:text-[2.7rem]">
          <Link href={href} className="hover:text-gold-deep">
            {pkg.name}
          </Link>
        </Heading>
        <p className="prose-body mt-4">{pkg.summary}</p>

        <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-line py-5 sm:grid-cols-3">
          {[
            ["Duration", pkg.duration],
            ["Hotels", pkg.hotels[0]?.category ?? "At booking"],
            ["Transfers", pkg.transfers],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-muted">{label}</dt>
              <dd className="mt-1 text-[0.9rem] leading-snug">{value}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-6 space-y-2">
          {shown.map((item) => (
            <li key={item} className="flex gap-3 text-[0.92rem]">
              <Check className="mt-1 size-3.5 shrink-0 text-gold-deep" aria-hidden="true" />
              {item}
            </li>
          ))}
          {more > 0 && <li className="pl-6.5 text-[0.85rem] text-muted">and {more} more in the full outline</li>}
        </ul>

        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <PriceLine pkg={pkg} />
          <div className="flex items-center gap-6">
            <Link href={`${href}#package-enquiry`} className="link-line text-[0.8rem] font-semibold">
              Enquire
            </Link>
            <Link href={href} className="btn btn-ink">
              View details <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

/** Compact index row — for "other options" lists. */
export function PackageRow({ pkg }: { pkg: TravelPackage }) {
  return (
    <li className="group relative border-b border-line">
      <div className="flex items-center gap-5 py-5">
        <Photo name={pkg.image} sizes="96px" className="hidden size-20 shrink-0 xs:block" />
        <div className="min-w-0 flex-1">
          <p className="text-[0.75rem] text-gold-deep">{pkg.category}</p>
          <h3 className="font-display text-[1.5rem] leading-tight">
            <Link href={`/packages/${pkg.slug}`} className="after:absolute after:inset-0">
              {pkg.name}
            </Link>
          </h3>
          <p className="mt-0.5 text-[0.82rem] text-muted">{pkg.duration}</p>
        </div>
        <ArrowRight
          className="size-4 shrink-0 text-muted transition-all group-hover:translate-x-1 group-hover:text-gold-deep"
          aria-hidden="true"
        />
      </div>
    </li>
  );
}
