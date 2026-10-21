import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Photo } from "@/components/ui/Photo";

/**
 * Photograph first, untouched by overlays. The copy sits on a solid ivory
 * panel that rises into the bottom-left of the image — a print-style cut-out
 * that keeps the Kaaba and the lit arcades fully visible.
 */
export function Hero() { 
  return (
    <section aria-labelledby="hero-title" className="relative bg-ivory pb-14 lg:pb-20">
      <div className="relative h-[44svh] min-h-[300px] sm:h-[56svh] lg:h-[56svh] lg:max-h-[640px] lg:min-h-[460px]">
        <Photo name="tawafNight" priority sizes="100vw" className="absolute! inset-0" position="50% 36%" />
      </div>

      <div className="container-x relative">
        <div className="relative mr-[8%] -mt-16 bg-ivory pt-8 pr-5 before:absolute before:inset-y-0 before:right-full before:w-[50vw] before:bg-ivory sm:mr-0 sm:-mt-28 sm:max-w-[36rem] sm:pt-11 sm:pr-12 lg:-mt-40 lg:max-w-[47rem] lg:pt-12 lg:pr-16">
          <p className="rise text-[0.78rem] tracking-[0.04em] text-gold-deep">Hajj &amp; Umrah · Your sacred journey begins here</p>
          <h1
            id="hero-title"
            className="display rise rise-delay-1 mt-4 text-[2.4rem] leading-[1.05] sm:text-[3.2rem] lg:text-[3.5rem] xl:text-[3.75rem]"
          >
            Your journey to the Holy Cities, made meaningful.
          </h1>
          <p className="rise rise-delay-2 mt-6 max-w-[34rem] text-[1rem] leading-relaxed text-muted sm:text-[1.08rem]">
            Discover thoughtfully arranged Hajj and Umrah journeys with dedicated assistance, comfortable travel
            arrangements, and guidance at every step.
          </p>
          <div className="rise rise-delay-3 mt-9 flex flex-col gap-3 xs:flex-row xs:items-center xs:gap-6">
            <Link href="/umrah" className="btn btn-ink">
              Explore packages <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href="/contact" className="link-line self-start text-[0.82rem] font-semibold uppercase tracking-[0.14em] xs:self-center">
              Plan your journey
            </Link>
          </div>
        </div>

        <p className="mt-10 text-[0.72rem] text-muted sm:absolute sm:top-[8.25rem] sm:right-10 sm:mt-0 sm:max-w-[13rem] sm:text-right lg:top-[11.5rem]">
          Tawaf at night beneath the arcades of Masjid al-Haram, Makkah.
        </p>
      </div>
    </section>
  );
}
