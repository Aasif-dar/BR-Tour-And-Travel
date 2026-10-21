import { Plus } from "lucide-react";
import { faqs, type Faq as FaqItem } from "@/data/faqs";

export function FaqList({ items = faqs }: { items?: FaqItem[] }) {
  return (
    <div className="border-t border-ink">
      {items.map((f) => (
        <details key={f.q} className="faq group border-b border-line">
          <summary className="flex cursor-pointer items-start justify-between gap-6 py-5 text-left">
            <h3 className="font-display text-[1.35rem] leading-snug transition-colors group-hover:text-gold-deep sm:text-[1.45rem]">
              {f.q}
            </h3>
            <Plus className="faq-icon mt-1.5 size-4 shrink-0 text-gold-deep transition-transform duration-300" aria-hidden="true" />
          </summary>
          <p className="prose-body max-w-2xl pb-6 text-[0.96rem]">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
