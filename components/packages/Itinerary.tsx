import { Check, Minus } from "lucide-react";
import type { ItineraryStep } from "@/data/packages";

export function ItineraryTimeline({ steps, tone = "light" }: { steps: ItineraryStep[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <ol className="relative">
      <span className={`absolute top-3 bottom-3 left-[0.3rem] w-px ${dark ? "bg-gold/35" : "bg-gold-deep/30"}`} aria-hidden="true" />
      {steps.map((s) => (
        <li key={s.when + s.title} className="relative grid gap-1 pb-9 pl-9 last:pb-0 sm:grid-cols-[11rem_1fr] sm:gap-6">
          <span
            className={`absolute top-1.5 left-0 size-[0.65rem] rotate-45 border ${
              dark ? "border-gold bg-ink" : "border-gold-deep bg-ivory"
            }`}
            aria-hidden="true"
          />
          <p className={`text-[0.72rem] font-semibold uppercase tracking-[0.16em] sm:pt-1 ${dark ? "text-gold" : "text-gold-deep"}`}>
            {s.when}
          </p>
          <div>
            <h3 className={`font-display text-[1.5rem] font-semibold leading-tight ${dark ? "text-ivory" : "text-ink"}`}>{s.title}</h3>
            <p className={`mt-1.5 text-[0.95rem] leading-relaxed ${dark ? "text-mist" : "text-muted"}`}>{s.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function InclusionLists({ included, excluded }: { included: string[]; excluded: string[] }) {
  return (
    <div className="grid gap-10 sm:grid-cols-2">
      <div>
        <h3 className="eyebrow mb-5">Typically included</h3>
        <ul className="space-y-3.5">
          {included.map((item) => (
            <li key={item} className="flex gap-3 text-[0.95rem] leading-relaxed">
              <Check className="mt-1 size-4 shrink-0 text-success" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="eyebrow mb-5">Not included</h3>
        <ul className="space-y-3.5">
          {excluded.map((item) => (
            <li key={item} className="flex gap-3 text-[0.95rem] leading-relaxed text-muted">
              <Minus className="mt-1 size-4 shrink-0 text-muted" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
