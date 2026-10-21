import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/config/site";
import { whatsappLink, packageWhatsappMessage } from "@/lib/whatsapp";
import { PageHero } from "@/components/layout/PageHero";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { FaqList } from "@/components/home/Faq";
import { faqs } from "@/data/faqs";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";

export const metadata: Metadata = {
  title: "Contact & Enquiries",
  description: "Send an enquiry to BR Tour & Travels about Hajj or Umrah packages, or message us on Instagram.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const { contact, social } = site;
  const wa = whatsappLink(packageWhatsappMessage());

  const channels = [
    contact.phone && { icon: Phone, label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
    contact.email && { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    contact.address && { icon: MapPin, label: "Office", value: contact.address },
    contact.hours && { icon: Clock, label: "Hours", value: contact.hours },
  ].filter(Boolean) as { icon: typeof Phone; label: string; value: string; href?: string }[];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start your enquiry."
        intro="Tell us a little about your plans. There is no obligation — we will reply with options and answers to your questions."
        image="nabawiDusk"
        position="50% 55%"
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="bg-ivory py-16 lg:py-24">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="border border-line bg-white p-6 sm:p-10">
              <h2 className="display mb-8 text-4xl">Enquiry form</h2>
              <EnquiryForm idPrefix="contact" />
            </div>
          </div>

          <aside className="space-y-12 lg:col-span-5">
            <div>
              <h2 className="eyebrow mb-6">Other ways to reach us</h2>
              <ul className="divide-y divide-line border-y border-line">
                {channels.map((c) => (
                  <li key={c.label} className="flex gap-4 py-5">
                    <c.icon className="mt-1 size-5 shrink-0 text-gold-deep" strokeWidth={1.4} aria-hidden="true" />
                    <div>
                      <p className="text-[0.72rem] uppercase tracking-[0.16em] text-muted">{c.label}</p>
                      {c.href ? (
                        <a href={c.href} className="link-line mt-1 inline-block text-lg">
                          {c.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-lg">{c.value}</p>
                      )}
                    </div>
                  </li>
                ))}
                {wa && (
                  <li className="flex gap-4 py-5">
                    <WhatsAppIcon className="mt-1 size-5 shrink-0 text-gold-deep" />
                    <div>
                      <p className="text-[0.72rem] uppercase tracking-[0.16em] text-muted">WhatsApp</p>
                      <a href={wa} target="_blank" rel="noopener noreferrer" className="link-line mt-1 inline-block text-lg">
                        Chat with our team
                      </a>
                    </div>
                  </li>
                )}
                <li className="flex gap-4 py-5">
                  <InstagramIcon className="mt-1 size-5 shrink-0 text-gold-deep" />
                  <div>
                    <p className="text-[0.72rem] uppercase tracking-[0.16em] text-muted">Instagram</p>
                    <a href={social.instagram.url} target="_blank" rel="noopener noreferrer" className="link-line mt-1 inline-block text-lg">
                      {social.instagram.handle}
                    </a>
                    <p className="mt-1 text-[0.85rem] text-muted">Updates and announcements, and direct messages.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="eyebrow mb-2">Common questions</h2>
              <FaqList items={faqs.slice(0, 4)} />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
