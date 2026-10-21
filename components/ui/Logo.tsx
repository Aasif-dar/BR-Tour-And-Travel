import Link from "next/link";

/**
 * Text-based logo treatment derived from the BR Tour & Travels mark:
 * a serif "BR" monogram under a dome-shaped arch, with the wordmark set
 * in spaced capitals. Swap in the official vector logo here once supplied.
 */
export function LogoMark({ className = "size-11" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path d="M8 46V22C8 12.6 15.2 5 24 5s16 7.6 16 17v24" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M24 1.5v3.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="24" cy="1.6" r="1.1" fill="currentColor" />
      <text
        x="24"
        y="35"
        textAnchor="middle"
        fontFamily="var(--font-cormorant), Georgia, serif"
        fontSize="19"
        fontWeight="600"
        fill="currentColor"
        letterSpacing="0.5"
      >
        BR
      </text>
    </svg>
  );
}

export function Logo({ tone = "dark", onNavigate }: { tone?: "dark" | "light"; onNavigate?: () => void }) {
  const mark = tone === "light" ? "text-gold" : "text-gold-deep";
  const word = tone === "light" ? "text-ivory" : "text-ink";
  return (
    <Link href="/" onNavigate={onNavigate} className="group flex items-center gap-3" aria-label="BR Tour & Travels — home">
      <LogoMark className={`h-11 w-11 shrink-0 transition-colors ${mark}`} />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.45rem] font-semibold tracking-wide ${word}`}>BR</span>
        <span className={`mt-1 text-[0.6rem] font-semibold tracking-[0.3em] ${mark}`}>TOUR &amp; TRAVELS</span>
      </span>
    </Link>
  );
}
