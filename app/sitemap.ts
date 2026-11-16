import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";
import { PROJECTS } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.siteUrl, priority: 1 },
    ...PROJECTS.map((p) => ({ url: `${SITE.siteUrl}/${p.slug}`, priority: 0.9 })),
  ];
}
