import { availabilityLabel, type TravelPackage } from "@/data/packages";

export function priceLabel(p: TravelPackage) {
  if (!p.price) return "Request a quote";
  const amount = new Intl.NumberFormat("en", {
    style: "currency",
    currency: p.price.currency,
    maximumFractionDigits: 0,
  }).format(p.price.amount);
  return `From ${amount}`;
}

export function PriceLine({ pkg, tone = "light" }: { pkg: TravelPackage; tone?: "light" | "dark" }) {
  return (
    <p className="flex flex-col">
      <span className={`font-display text-2xl font-semibold leading-none ${tone === "dark" ? "text-gold-bright" : "text-ink"}`}>
        {priceLabel(pkg)}
      </span>
      <span className={`mt-1.5 text-[0.75rem] ${tone === "dark" ? "text-mist" : "text-muted"}`}>
        {pkg.price ? pkg.price.basis : "Priced on your dates & room sharing"}
      </span>
    </p>
  );
}

export function AvailabilityTag({ pkg, tone = "light" }: { pkg: TravelPackage; tone?: "light" | "dark" }) {
  const strong = pkg.availability === "open" || pkg.availability === "limited";
  return (
    <span
      className={`inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] ${
        tone === "dark" ? "text-mist" : "text-muted"
      }`}
    >
      <span
        className={`size-1.5 rounded-full ${strong ? "bg-success" : tone === "dark" ? "bg-gold" : "bg-gold-deep"}`}
        aria-hidden="true"
      />
      {availabilityLabel[pkg.availability]}
    </span>
  );
}
