import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { guides } from "@/data/guides";
import { FaqList } from "./Faq";

/** Guides and FAQs together: everything a pilgrim reads before enquiring. */
export function Prepare() {
  return (
    <section aria-labelledby="prepare-title" className="bg-ivory py-20 lg:py-28">
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h2 id="prepare-title" className="display text-[2.3rem] sm:text-[2.8rem]">
            Before you travel
          </h2>
          <p className="prose-body mt-5 max-w-md">
            Practical notes on documents, packing and reading a package — general guidance, not religious rulings or
            immigration advice.
          </p>
          <ul className="mt-10 border-t border-ink">
            {guides.map((g) => (
              <li key={g.slug} className="group relative border-b border-line py-5">
                <p className="text-[0.72rem] tracking-[0.04em] text-gold-deep">{g.kicker}</p>
                <h3 className="mt-1 flex items-start justify-between gap-4 font-display text-[1.45rem] leading-tight">
                  <Link href={`/guides/${g.slug}`} className="after:absolute after:inset-0">
                    {g.title}
                  </Link>
                  <ArrowUpRight
                    className="mt-1 size-4 shrink-0 text-muted transition-colors group-hover:text-gold-deep"
                    aria-hidden="true"
                  />
                </h3>
              </li>
            ))}
          </ul>
        </div>

        <div id="faq" className="lg:col-span-6 lg:col-start-7">
          <h2 className="display text-[2.3rem] sm:text-[2.8rem]">Questions pilgrims ask</h2>
          <p className="prose-body mt-5 max-w-md">
            Rules and fees change from season to season, so we confirm the details for your journey when you enquire.
          </p>
          <div className="mt-10">
            <FaqList />
          </div>
        </div>
      </div>
    </section>
  );
}
