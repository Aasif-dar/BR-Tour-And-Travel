import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { TravelPackage } from "@/data/packages";
import { Photo } from "@/components/ui/Photo";
import { priceLabel } from "./PackageMeta";

const facts: { label: string; value: (p: TravelPackage) => string }[] = [
  { label: "Best for", value: (p) => p.bestFor },
  { label: "Duration", value: (p) => p.duration },
  { label: "Hotels", value: (p) => p.hotels[0]?.category ?? "Confirmed at booking" },
  { label: "Transfers", value: (p) => p.transfers },
];

/**
 * A brochure-style specification sheet. On large screens each package is a
 * column and the rows line up across columns (CSS subgrid), so packages can
 * be compared at a glance. On small screens the columns scroll sideways.
 */
export function PackageCompare({ items, headingLevel = "h3" }: { items: TravelPackage[]; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  const rows = facts.length + 4; // image, name, facts…, price, link
  return (
    <div
      className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:-mx-10 sm:px-10 lg:mx-0 lg:grid lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0"
      style={{ gridTemplateColumns: `8rem repeat(${items.length}, minmax(0, 1fr))` }}
    >
      {/* Row labels (large screens) */}
      <div aria-hidden="true" className="hidden lg:grid lg:grid-rows-subgrid" style={{ gridRow: `span ${rows}` }}>
        <span />
        <span />
        {facts.map((f) => (
          <span key={f.label} className="border-t border-ink/15 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">
            {f.label}
          </span>
        ))}
        <span className="border-t border-ink/15 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">
          Price
        </span>
        <span />
      </div>

      {items.map((p) => (
        <article
          key={p.slug}
          className="group relative w-[78%] shrink-0 snap-start bg-ivory/70 p-4 xs:w-[62%] sm:w-[40%] lg:grid lg:w-auto lg:grid-rows-subgrid lg:border-l lg:border-ink/10 lg:bg-transparent lg:p-0 lg:px-4 xl:px-5"
          style={{ gridRow: `span ${rows}` }}
        >
          <Photo
            name={p.image}
            sizes="(min-width: 1024px) 17vw, 60vw"
            className="aspect-4/5 w-full"
            imgClassName="transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="pt-5 pb-4">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold-deep">{p.category}</p>
            <Heading className="mt-1.5 font-display text-[1.6rem] leading-tight">
              <Link href={`/packages/${p.slug}`} className="after:absolute after:inset-0">
                {p.name}
              </Link>
            </Heading>
          </div>
          <dl className="contents">
            {facts.map((f) => (
              <div key={f.label} className="border-t border-ink/15 py-3.5">
                <dt className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-muted lg:sr-only">{f.label}</dt>
                <dd className="mt-1 text-[0.88rem] leading-snug lg:mt-0">{f.value(p)}</dd>
              </div>
            ))}
            <div className="border-t border-ink/15 py-3.5">
              <dt className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-muted lg:sr-only">Price</dt>
              <dd className="mt-1 font-display text-[1.25rem] leading-tight lg:mt-0">{priceLabel(p)}</dd>
            </div>
          </dl>
          <p className="flex items-center gap-2 border-t border-ink pt-4 text-[0.75rem] font-semibold uppercase tracking-[0.14em] transition-colors group-hover:text-gold-deep">
            View package
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </p>
        </article>
      ))}
    </div>
  );
}
