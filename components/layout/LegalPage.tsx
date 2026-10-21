import type { ReactNode } from "react";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="bg-ivory py-16 lg:py-24">
      <div className="container-x max-w-3xl!">
        <p className="eyebrow mb-4">Legal</p>
        <h1 className="display text-5xl sm:text-6xl">{title}</h1>
        <div className="mt-10 space-y-6 text-[1rem] leading-relaxed text-ink/85 [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
          {children}
        </div>
      </div>
    </section>
  );
}

export function TemplateNotice() {
  return (
    <p className="border-l-2 border-gold bg-sand p-5 text-[0.9rem]">
      <strong>Template:</strong> this page is a starting point and has not been reviewed for any particular
      jurisdiction. Please have it checked and completed with the agency’s legal details before publishing.
    </p>
  );
}
