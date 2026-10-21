import { testimonials } from "@/data/content";

/**
 * Real customer words only. Renders nothing until `testimonials` in
 * data/content.ts has entries — no placeholder section on the page.
 */
export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section aria-labelledby="testimonials-title" className="bg-ivory py-20 lg:py-28">
      <div className="container-x">
        <h2 id="testimonials-title" className="display text-[2.3rem] sm:text-[2.8rem]">
          In our pilgrims’ words
        </h2>
        <ul className="mt-12 grid gap-px border-y border-line bg-line md:grid-cols-2">
          {testimonials.map((t) => (
            <li key={t.name + t.context} className="bg-ivory py-10 md:px-10 md:first:pl-0">
              <figure>
                <blockquote className="font-display text-[1.6rem] italic leading-snug">“{t.quote}”</blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="font-semibold">{t.name}</span>
                  <span className="text-muted"> · {t.context}</span>
                  {t.verified && <span className="ml-2 text-xs tracking-wide text-gold-deep">Verified traveller</span>}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
