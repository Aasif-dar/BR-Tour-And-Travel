import { whatsappLink, packageWhatsappMessage } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

/** Renders only once an official WhatsApp number is set in config/site.ts. */
export function FloatingWhatsApp() {
  const href = whatsappLink(packageWhatsappMessage());
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with BR Tour & Travels on WhatsApp"
      className="fixed right-4 bottom-4 z-40 inline-flex size-14 items-center justify-center rounded-full bg-ink text-gold shadow-(--shadow-float) transition-transform hover:-translate-y-0.5 sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-6" />
    </a>
  );
}
