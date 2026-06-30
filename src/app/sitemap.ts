import type { MetadataRoute } from "next";
import { site } from "@/lib/data/site";
import { collections } from "@/lib/data/collections";
import { watches } from "@/lib/data/watches";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();

  const staticRoutes: { path: string; priority: number; freq: "weekly" | "monthly" }[] = [
    { path: "", priority: 1, freq: "weekly" },
    { path: "/collections", priority: 0.9, freq: "weekly" },
    { path: "/new-arrivals", priority: 0.8, freq: "weekly" },
    { path: "/limited-edition", priority: 0.8, freq: "monthly" },
    { path: "/men", priority: 0.7, freq: "monthly" },
    { path: "/women", priority: 0.7, freq: "monthly" },
    { path: "/unisex", priority: 0.7, freq: "monthly" },
    { path: "/metal-strap", priority: 0.6, freq: "monthly" },
    { path: "/leather-strap", priority: 0.6, freq: "monthly" },
    { path: "/about", priority: 0.6, freq: "monthly" },
    { path: "/contact", priority: 0.6, freq: "monthly" },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${base}${r.path}`,
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
    })),
    ...collections.map((c) => ({
      url: `${base}/collections/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...watches.map((w) => ({
      url: `${base}/watches/${w.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
