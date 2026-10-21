import Link from "next/link";
import { journeySteps } from "@/data/content";

const numerals = ["I", "II", "III", "IV"];

/** Four steps set like a contents page: numeral, title, a line of text. */
export function JourneySteps() {
  return (
    <section aria-labelledby="journey-title" className="bg-ivory py-20 lg:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="journey-title" className="display text-[2.3rem] sm:text-[2.8rem]">
            How an enquiry becomes a journey
          </h2>
          <Link href="/contact" className="link-line self-start text-[0.82rem] font-semibold sm:self-auto">
            Start with step one
          </Link>
        </div>

        <ol className="mt-12 grid border-t border-ink sm:grid-cols-2 lg:grid-cols-4">
          {journeySteps.map((step, i) => (
            <li
              key={step.title}
              className={`border-b border-line py-8 sm:px-6 lg:border-b-0 lg:py-10 ${i % 2 === 1 ? "sm:border-l" : "sm:pl-0"} ${
                i > 0 ? "lg:border-l lg:pl-6" : ""
              }`}
            >
              <span className="font-display text-[2.6rem] italic leading-none text-gold-deep">{numerals[i]}</span>
              <h3 className="mt-5 font-display text-[1.45rem] leading-tight">{step.title}</h3>
              <p className="prose-body mt-3 text-[0.92rem]">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
