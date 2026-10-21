"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { site } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { InstagramIcon } from "@/components/ui/BrandIcons";

const leftNav = site.nav.filter((n) => ["/umrah", "/hajj", "/#services"].includes(n.href));
const rightNav = site.nav.filter((n) => ["/about", "/contact"].includes(n.href));

function isActive(pathname: string, href: string) {
  if (href.includes("#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({ href, label, pathname }: { href: string; label: string; pathname: string }) {
  const active = isActive(pathname, href);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`relative py-2 text-[0.8rem] tracking-[0.04em] transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-gold-deep after:transition-transform after:duration-300 ${
        active ? "text-ink after:scale-x-100" : "text-ink/70 after:scale-x-0 hover:text-ink hover:after:scale-x-100"
      }`}
    >
      {label}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuTop, setMenuTop] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  const toggle = () => {
    if (!open) setMenuTop(headerRef.current?.getBoundingClientRect().bottom ?? 0);
    setOpen(!open);
  };
  const close = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu if Activity hides this route, so it never reappears open.
  useLayoutEffect(() => () => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        open ? "border-line bg-ivory" : "border-line/80 bg-ivory/95 backdrop-blur-md"
      }`}
    >
      <div
        className={`container-x flex items-center justify-between gap-6 transition-[height] duration-300 lg:grid lg:grid-cols-[1fr_auto_1fr] ${
          scrolled ? "h-16 lg:h-[4.25rem]" : "h-(--header-h)"
        }`}
      >
        <nav aria-label="Packages and services" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {leftNav.map((item) => (
              <li key={item.href}>
                <NavLink {...item} pathname={pathname} />
              </li>
            ))}
          </ul>
        </nav>

        <Logo onNavigate={close} />

        <div className="flex items-center justify-end gap-8">
          <nav aria-label="About and contact" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {rightNav.map((item) => (
                <li key={item.href}>
                  <NavLink {...item} pathname={pathname} />
                </li>
              ))}
            </ul>
          </nav>
          <Link
            href="/contact"
            className="hidden items-center gap-2 border-l border-line pl-8 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-gold-deep transition-colors hover:text-ink sm:inline-flex"
          >
            Enquire now <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
          <button
            ref={menuButton}
            type="button"
            className="-mr-2 inline-flex h-11 items-center gap-2.5 px-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={toggle}
          >
            <span className="sr-only sm:not-sr-only">{open ? "Close" : "Menu"}</span>
            <span className="relative block h-3 w-6" aria-hidden="true">
              <span
                className={`absolute left-0 h-px w-6 bg-ink transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 h-px bg-ink transition-all duration-300 ${open ? "top-1.5 w-6 -rotate-45" : "top-3 w-4"}`}
              />
            </span>
            <span className="sr-only sm:hidden">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={panel}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 z-40 overflow-y-auto bg-ivory lg:hidden"
        style={{ top: menuTop }}
      >
        <nav aria-label="Mobile" className="container-x flex min-h-full flex-col py-8">
          <ul className="border-t border-line">
            {site.nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    onNavigate={close}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={`display flex items-center justify-between py-4 text-[1.85rem] ${active ? "text-gold-deep" : "text-ink"}`}
                  >
                    {item.label}
                    <ArrowRight className="size-4 text-ink/30" aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-auto flex flex-col gap-5 pt-10">
            <Link href="/contact" onNavigate={close} onClick={close} className="btn btn-ink w-full">
              Start an enquiry
            </Link>
            <a
              href={site.social.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-sm text-muted"
            >
              <InstagramIcon className="size-4" /> {site.social.instagram.handle}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
