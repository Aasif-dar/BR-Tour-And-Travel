import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Info } from "lucide-react";
import { getGuide, guides } from "@/data/guides";
import { images } from "@/config/images";
import { PageHero } from "@/components/layout/PageHero";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.excerpt,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: { title: guide.title, description: guide.excerpt, images: [{ url: images[guide.image].src }] },
  };
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const others = guides.filter((g) => g.slug !== guide.slug);

  return (
    <>
      <PageHero
        eyebrow={guide.kicker}
        title={guide.title}
        intro={guide.intro}
        image={guide.image}
        crumbs={[{ label: "Home", href: "/" }, { label: "Guides", href: "/guides" }, { label: guide.title }]}
      />

      <article className="bg-ivory py-16 lg:py-24">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="space-y-14 lg:col-span-8">
            {guide.sections.map((s, si) => (
              <section key={s.heading}>
                <h2 className="display flex items-baseline gap-4 text-4xl">
                  <span className="font-display text-xl text-gold-deep">{String(si + 1).padStart(2, "0")}</span>
                  {s.heading}
                </h2>
                <ul className="mt-6 border-t border-line">
                  {s.items.map((item) => (
                    <li key={item} className="flex gap-4 border-b border-line py-4 text-[1rem] leading-relaxed">
                      <span className="mt-2.5 size-1.5 shrink-0 rotate-45 bg-gold-deep" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
            <p className="flex gap-3 border-l-2 border-gold bg-sand p-5 text-[0.92rem] leading-relaxed text-ink/85">
              <Info className="mt-0.5 size-4 shrink-0 text-gold-deep" aria-hidden="true" />
              {guide.note}
            </p>
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <h2 className="eyebrow mb-4">More guides</h2>
              <ul className="border-t border-ink">
                {others.map((g) => (
                  <li key={g.slug} className="border-b border-line">
                    <Link href={`/guides/${g.slug}`} className="block py-4 font-display text-xl font-semibold hover:text-gold-deep">
                      {g.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="on-dark mt-10 bg-ink p-7 text-ivory">
                <p className="font-display text-2xl leading-snug">Have a question about your own journey?</p>
                <Link href="/contact" className="btn btn-gold mt-6 w-full">
                  Ask our team <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
