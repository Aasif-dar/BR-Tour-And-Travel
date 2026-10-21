import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  children,
  align = "left",
  as: Tag = "h2",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <Tag className="display text-[2.2rem] sm:text-5xl lg:text-[3.5rem]">{title}</Tag>
      {children && <div className="prose-body mt-5 text-[1.05rem]">{children}</div>}
    </div>
  );
}

/** Discreet notice used wherever sample content is displayed. */
export function SampleNotice({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <p
      className={`flex items-start gap-2.5 text-[0.8rem] leading-relaxed ${
        tone === "dark" ? "text-mist" : "text-muted"
      }`}
    >
      <span
        className={`mt-1.5 inline-block size-1.5 shrink-0 rotate-45 ${tone === "dark" ? "bg-gold" : "bg-gold-deep"}`}
        aria-hidden="true"
      />
      <span>{children}</span>
    </p>
  );
}
