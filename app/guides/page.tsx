import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/data/guides";
import { PageHero } from "@/components/layout/PageHero";
import { Photo } from "@/components/ui/Photo";

export const metadata: Metadata = {
  title: "Journey Preparation Guides",
  description: "Practical guides to help you prepare for Umrah and Hajj: checklists, documents, packing and package inclusions.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return (
    <>
      <PageHero
        eyebrow="Journey preparation"
        title="Prepare with confidence."
        intro="Practical notes for the weeks before you travel. For religious guidance on the rites, please learn from a qualified scholar."
        image="jabalNur"
        crumbs={[{ label: "Home", href: "/" }, { label: "Guides" }]}
      />
      <section className="bg-ivory py-16 lg:py-24">
        <ul className="container-x grid gap-x-10 gap-y-14 md:grid-cols-2">
          {guides.map((g) => (
            <li key={g.slug} className="group relative">
              <Photo
                name={g.image}
                sizes="(min-width: 768px) 45vw, 100vw"
                className="aspect-16/10 w-full"
                imgClassName="transition-transform duration-[1.2s] group-hover:scale-[1.03]"
              />
              <p className="eyebrow mt-6">{g.kicker}</p>
              <h2 className="mt-2 font-display text-3xl font-semibold">
                <Link href={`/guides/${g.slug}`} className="after:absolute after:inset-0">
                  {g.title}
                </Link>
              </h2>
              <p className="prose-body mt-2">{g.excerpt}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
