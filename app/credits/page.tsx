import type { Metadata } from "next";
import Image from "next/image";
import { images } from "@/config/images";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Photo Credits",
  description: "Credits and licences for the photographs used on this website.",
  alternates: { canonical: "/credits" },
};

export default function CreditsPage() {
  const list = Object.values(images).filter((img) => img.credit);
  return (
    <LegalPage title="Photo credits">
      <p>
        We are grateful to the photographers whose work appears on this website. Photographs are used under the licences
        listed below and were resized for the web.
      </p>
      <ul className="not-prose mt-8 divide-y divide-line border-y border-line [&_li]:ml-0 [&_li]:list-none">
        {list.map((img) => (
          <li key={img.src} className="flex gap-5 py-5">
            <div className="relative size-20 shrink-0 overflow-hidden bg-sand">
              <Image src={img.src} alt="" fill sizes="80px" className="object-cover" />
            </div>
            <div className="text-[0.92rem]">
              <p className="font-semibold">{img.alt}</p>
              <p className="mt-1 text-muted">
                Photo by {img.credit!.author} ·{" "}
                {img.credit!.licenseUrl ? (
                  <a href={img.credit!.licenseUrl} className="link-line" target="_blank" rel="noopener noreferrer license">
                    {img.credit!.license}
                  </a>
                ) : (
                  img.credit!.license
                )}{" "}
                ·{" "}
                <a href={img.credit!.source} className="link-line" target="_blank" rel="noopener noreferrer">
                  Source
                </a>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </LegalPage>
  );
}
