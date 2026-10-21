import Link from "next/link";
import { site } from "@/config/site";

/** A typographic pause: the agency's own line (from its Instagram bio), large. */
export function AboutStatement() {
  return (
    <section aria-labelledby="about-title" className="bg-sand py-20 lg:py-28">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-end">
        <figure className="lg:col-span-8">
          <h2 id="about-title" className="sr-only">
            About {site.name}
          </h2>
          <blockquote className="display text-[2.4rem] italic leading-[1.08] sm:text-[3.6rem] lg:text-[4.4rem]">
            {site.tagline}
          </blockquote>
          <figcaption className="mt-6 text-[0.78rem] tracking-[0.04em] text-gold-deep">— {site.name}</figcaption>
        </figure>
        <div className="lg:col-span-4 lg:pb-3">
          <p className="prose-body">
            We are a travel agency devoted to Hajj and Umrah. Our work is the planning — so that pilgrims and their
            families can keep their attention on worship.
          </p>
          <Link href="/about" className="link-line mt-6 inline-block text-[0.82rem] font-semibold">
            Our story and approach
          </Link>
        </div>
      </div>
    </section>
  );
}
