import Link from "next/link";
import type { ReactNode } from "react";
import type { ImageKey } from "@/config/images";
import { Photo } from "@/components/ui/Photo";

type Crumb = { label: string; href?: string };

/**
 * Inner-page header: title and intro set on ivory, then the photograph as an
 * uncovered full-bleed band. No overlays — the type never sits on the image.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  crumbs,
  position,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  image?: ImageKey;
  crumbs?: Crumb[];
  position?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-ivory">
      <div className="container-x pt-8 pb-12 sm:pt-10 lg:pb-16">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-12 lg:mb-16">
            <ol className="flex flex-wrap items-center gap-2 text-[0.75rem] text-muted">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {c.href ? (
                    <Link href={c.href} className="hover:text-ink">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-ink">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <p className="text-[0.78rem] tracking-[0.04em] text-gold-deep">{eyebrow}</p>
            <h1 className="display mt-4 text-[2.6rem] sm:text-[3.6rem] lg:text-[4.25rem]">{title}</h1>
          </div>
          {intro && <div className="prose-body text-[1.02rem] lg:col-span-5 lg:pb-2">{intro}</div>}
        </div>
        {children}
      </div>
      {image && (
        <div className="relative h-[34svh] min-h-[240px] sm:h-[44svh] lg:h-[54svh] lg:max-h-[560px]">
          <Photo name={image} priority sizes="100vw" className="absolute! inset-0" position={position} />
        </div>
      )}
    </section>
  );
}
