"use client";

import { useId, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { TravelPackage } from "@/data/packages";
import { PackageSpread } from "./PackageSpread";

export function PackageBrowser({ items }: { items: TravelPackage[] }) {
  const categories = useMemo(() => ["All", ...new Set(items.map((p) => p.category))], [items]);
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const searchId = useId();

  const q = query.trim().toLowerCase();
  const results = items.filter((p) => {
    if (category !== "All" && p.category !== category) return false;
    if (!q) return true;
    return [p.name, p.category, p.summary, p.duration, ...p.highlights, ...p.inclusions]
      .join(" ")
      .toLowerCase()
      .includes(q);
  });

  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-line pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div role="group" aria-label="Filter by category" className="-mx-1 flex flex-wrap gap-x-1 gap-y-2">
          {categories.map((c) => {
            const active = c === category;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(c)}
                className={`relative min-h-11 px-3 text-[0.82rem] font-semibold tracking-wide transition-colors after:absolute after:inset-x-3 after:bottom-1 after:h-px after:bg-current after:transition-transform ${
                  active ? "text-gold-deep after:scale-x-100" : "text-muted after:scale-x-0 hover:text-ink"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
        <div className="relative w-full lg:w-80">
          <label htmlFor={searchId} className="sr-only">
            Search packages
          </label>
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search e.g. family, private transfers"
            className="field pl-10"
          />
        </div>
      </div>

      <p className="mt-6 text-[0.82rem] text-muted" aria-live="polite">
        Showing {results.length} of {items.length} packages
      </p>

      {results.length > 0 ? (
        <ul className="mt-4 border-b border-ink/15">
          {results.map((p, i) => (
            <li key={p.slug}>
              <PackageSpread pkg={p} reverse={i % 2 === 1} headingLevel="h2" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10 border border-dashed border-line px-6 py-14 text-center">
          <p className="font-display text-2xl">No packages match your search.</p>
          <p className="prose-body mt-2 text-sm">Try a different word, or tell us what you need — we can tailor a package.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="link-line mt-5 inline-flex items-center gap-1.5 text-sm font-semibold"
          >
            <X className="size-3.5" /> Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
