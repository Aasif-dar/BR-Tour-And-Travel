import Link from "next/link";
import { approach, services } from "@/data/content";

/** What the agency arranges — set as a typographic list rather than icon cards. */
export function Approach() {
  return (
    <section id="services" aria-labelledby="services-title" className="bg-ivory">
      <div className="container-x grid gap-12 border-t border-line py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
        <div className="lg:col-span-4">
          <h2 id="services-title" className="display text-[2.3rem] sm:text-[2.8rem]">
            What we arrange for you
          </h2>
          <p className="prose-body mt-6 max-w-sm">{approach}</p>
          <Link href="/about" className="link-line mt-8 inline-block text-[0.82rem] font-semibold">
            How we work
          </Link>
        </div>

        <ul className="lg:col-span-8">
          {services.map((s) => (
            <li
              key={s.title}
              className="grid gap-2 border-t border-line py-6 first:border-ink sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-10 sm:py-7"
            >
              <h3 className="font-display text-[1.7rem] leading-tight">{s.title}</h3>
              <p className="prose-body text-[0.97rem] sm:pt-1.5">{s.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
