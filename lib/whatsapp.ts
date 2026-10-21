import { site } from "@/config/site";

/** Returns a wa.me link with an encoded message, or null when no number is configured. */
export function whatsappLink(message: string): string | null {
  const number = site.whatsapp.number?.replace(/\D/g, "");
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function packageWhatsappMessage(packageName?: string) {
  return packageName
    ? `Assalamu alaikum, I would like to know more about the ${packageName} package from BR Tour & Travels.`
    : "Assalamu alaikum, I would like to enquire about a Hajj or Umrah journey with BR Tour & Travels.";
}
