import Link from "next/link";
import { site } from "@/config/site";

export function AnnouncementBar() {
  const { text, link } = site.announcement;
  return (
    <div className="on-dark border-b border-gold/15 bg-ink text-mist">
      <div className="container-x flex min-h-10 items-center justify-center gap-3 py-2 text-center text-[0.78rem] leading-snug">
        <p>
          <span className="hidden sm:inline">{text} </span>
          <span className="sm:hidden">Hajj &amp; Umrah enquiries are open. </span>
          <Link href={link.href} className="link-line font-semibold text-gold-bright">
            {link.label}
          </Link>
        </p>
      </div>
    </div>
  );
}
