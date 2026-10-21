import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { packages } from "@/data/packages";
import { guides } from "@/data/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/umrah",
    "/hajj",
    "/about",
    "/contact",
    "/guides",
    ...packages.map((p) => `/packages/${p.slug}`),
    ...guides.map((g) => `/guides/${g.slug}`),
    "/privacy",
    "/terms",
    "/credits",
  ];
  return paths.map((path) => ({ url: new URL(path, site.url).toString() }));
}
