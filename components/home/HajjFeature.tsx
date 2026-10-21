import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Photo } from "@/components/ui/Photo";

const days = [
  { date: "8 Dhul Hijjah", place: "Mina", note: "Enter ihram and spend the day and night in the camp." },
  { date: "9 Dhul Hijjah", place: "Arafat · Muzdalifah", note: "The Day of Arafah, then the night under open sky." },
  { date: "10 Dhul Hijjah", place: "Jamarat · Makkah", note: "Stoning, sacrifice and Tawaf al-Ifadah." },
  { date: "11–13 Dhul Hijjah", place: "Mina", note: "The days of Tashreeq, before the farewell tawaf." },
];

export function HajjFeature() {
  return (
    <section aria-labelledby="hajj-title" className="on-dark bg-ink text-ivory">
      <figure>
        <Photo name="kaabaHajj" sizes="100vw" className="aspect-4/3 w-full sm:aspect-16/9 lg:aspect-[21/8]" position="50% 55%" />
        <figcaption className="container-x pt-4 text-[0.72rem] text-mist">
          The Kaaba during the Hajj season, Masjid al-Haram.
        </figcaption>
      </figure>

      <div className="container-x grid gap-16 py-16 lg:grid-cols-12 lg:gap-12 lg:py-24">
        <div className="lg:col-span-5">
          <p className="text-[0.78rem] tracking-[0.04em] text-gold">Hajj packages</p>
          <h2 id="hajj-title" className="display mt-4 text-[2.4rem] sm:text-5xl lg:text-[3.4rem]">
            The journey of a lifetime deserves careful planning.
          </h2>
          <p className="prose-body mt-6 max-w-md">
            Hajj is planned months ahead and shaped by each season’s regulations. We help you understand the options
            open to you, prepare your documents, and coordinate stays in Makkah, Madinah and the camps of Mina and
            Arafat.
          </p>
          <p className="mt-6 max-w-md border-l border-gold/50 pl-4 text-[0.85rem] leading-relaxed text-mist">
            Places, eligibility and availability depend on the season and on the rules of your country of residence,
            and are confirmed with you individually before any booking.
          </p>
          <div className="mt-10 flex flex-col gap-4 xs:flex-row xs:items-center xs:gap-7">
            <Link href="/hajj#enquire" className="btn btn-gold">
              Discuss your Hajj journey <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href="/hajj" className="link-line self-start text-[0.82rem] font-semibold xs:self-center">
              Read the Hajj overview
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <p lang="ar" dir="rtl" className="text-left font-arabic text-[2.1rem] leading-snug text-gold sm:text-[2.6rem]">
            لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ
          </p>
          <p className="mt-2 font-display text-lg italic text-mist">“Here I am, O Allah, here I am.”</p>

          <ol className="mt-10 border-t border-gold/30" aria-label="The days of Hajj">
            {days.map((d) => (
              <li key={d.date} className="grid gap-1 border-b border-ivory/10 py-5 sm:grid-cols-[9.5rem_1fr] sm:gap-6">
                <span className="text-[0.75rem] tracking-[0.04em] text-gold sm:pt-1.5">{d.date}</span>
                <div>
                  <p className="font-display text-[1.55rem] leading-tight">{d.place}</p>
                  <p className="mt-1 text-[0.88rem] text-mist">{d.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
