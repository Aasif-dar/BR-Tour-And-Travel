import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/config/site";
import { whatsappLink, packageWhatsappMessage } from "@/lib/whatsapp";
import { Photo } from "@/components/ui/Photo";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

/**
 * Bookends the hero: the same photograph-and-panel construction, inverted to
 * ink so the page closes into the footer.
 */
export function FinalCta() {
  const wa = whatsappLink(packageWhatsappMessage());
  return (
    <section aria-labelledby="cta-title" className="on-dark relative bg-ink text-ivory">
      <div className="relative h-[42svh] min-h-[280px] sm:h-[52svh] lg:h-[68svh] lg:max-h-[700px] lg:min-h-[500px]">
        <Photo name="madinahSunrise" sizes="100vw" className="absolute! inset-0" position="50% 45%" />
      </div>

      <div className="container-x relative pb-16 lg:pb-20">
        <div className="relative mr-[8%] -mt-14 bg-ink pt-8 pr-5 before:absolute before:inset-y-0 before:right-full before:w-[50vw] before:bg-ink sm:mr-0 sm:-mt-24 sm:max-w-[34rem] sm:pt-11 sm:pr-12 lg:-mt-40 lg:max-w-[40rem] lg:pt-14 lg:pr-16">
          <h2 id="cta-title" className="display text-[2.3rem] sm:text-[3rem] lg:text-[3.5rem]">
            Let’s plan your journey to the Holy Cities.
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-mist">
            Tell us what you need, and our team can help you explore the available travel arrangements.
          </p>
          <div className="mt-9 flex flex-col gap-4 xs:flex-row xs:items-center xs:gap-7">
            <Link href="/contact" className="btn btn-gold">
              Start your enquiry <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            {wa ? (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="link-line inline-flex items-center gap-2 self-start text-[0.82rem] font-semibold xs:self-center">
                <WhatsAppIcon className="size-4" /> WhatsApp us
              </a>
            ) : (
              <a
                href={site.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line self-start text-[0.82rem] font-semibold xs:self-center"
              >
                Message us on Instagram
              </a>
            )}
          </div>
        </div>
        <p className="mt-10 text-[0.72rem] text-mist sm:absolute sm:top-[7.25rem] sm:right-10 sm:mt-0 sm:max-w-[13rem] sm:text-right lg:top-[11.5rem]">
          Dawn prayer in the courtyard of Masjid an-Nabawi, Madinah.
        </p>
      </div>
    </section>
  );
}
