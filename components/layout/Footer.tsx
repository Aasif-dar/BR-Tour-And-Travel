import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/config/site";
import { packages } from "@/data/packages";
import { guides } from "@/data/guides";
import { whatsappLink, packageWhatsappMessage } from "@/lib/whatsapp";
import { Logo } from "@/components/ui/Logo";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { CopyrightYear } from "./CopyrightYear";

const linkClass = "text-[0.92rem] text-mist transition-colors hover:text-gold-bright";

export function Footer() {
  const { contact, social, credentials } = site;
  const wa = whatsappLink(packageWhatsappMessage());
  const hasDirectContact = Boolean(contact.phone || contact.email || contact.address || wa);

  return (
    <footer className="on-dark bg-ink text-ivory">
      <div className="container-x pb-10">
        <div className="mb-16 h-px bg-ivory/12" />
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="prose-body mt-6 max-w-sm text-[0.92rem]">{site.description}</p>
            {credentials.length > 0 && (
              <ul className="mt-6 space-y-1 text-sm text-mist">
                {credentials.map((c) => (
                  <li key={c.label}>
                    {c.label}
                    {c.reference && <span className="text-mist/70"> · Ref. {c.reference}</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-5">
            <div>
              <h2 className="eyebrow mb-5">Explore</h2>
              <ul className="space-y-3">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="eyebrow mb-5">Packages</h2>
              <ul className="space-y-3">
                {packages.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/packages/${p.slug}`} className={linkClass}>
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h2 className="eyebrow mb-5">Prepare</h2>
              <ul className="space-y-3">
                {guides.map((g) => (
                  <li key={g.slug}>
                    <Link href={`/guides/${g.slug}`} className={linkClass}>
                      {g.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/#faq" className={linkClass}>
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="eyebrow mb-5">Get in touch</h2>
            <ul className="space-y-4 text-[0.92rem] text-mist">
              {contact.phone && (
                <li className="flex gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.5} />
                  <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="hover:text-gold-bright">
                    {contact.phone}
                  </a>
                </li>
              )}
              {contact.email && (
                <li className="flex gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.5} />
                  <a href={`mailto:${contact.email}`} className="hover:text-gold-bright">
                    {contact.email}
                  </a>
                </li>
              )}
              {contact.address && (
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.5} />
                  <span>{contact.address}</span>
                </li>
              )}
              {wa && (
                <li>
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-gold-bright">
                    <WhatsAppIcon className="mt-0.5 size-4 shrink-0 text-gold" /> Chat on WhatsApp
                  </a>
                </li>
              )}
              <li>
                <a
                  href={social.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-3 hover:text-gold-bright"
                >
                  <InstagramIcon className="mt-0.5 size-4 shrink-0 text-gold" /> {social.instagram.handle}
                </a>
              </li>
            </ul>
            {!hasDirectContact && (
              <p className="mt-5 text-[0.85rem] leading-relaxed text-mist/80">
                Send an enquiry through our{" "}
                <Link href="/contact" className="link-line text-ivory">
                  contact page
                </Link>{" "}
                or message us on Instagram.
              </p>
            )}
          </div>
        </div>

        <div className="mt-16 h-px bg-ivory/12" />

        <div className="mt-8 flex flex-col gap-4 text-[0.8rem] text-mist/80 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/privacy" className="hover:text-gold-bright">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-gold-bright">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/credits" className="hover:text-gold-bright">
                Photo credits
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
