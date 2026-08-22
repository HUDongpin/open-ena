import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-22T00:00:00.000Z");
  return [
    {
      url: "https://www.open-ena.com/",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.open-ena.com/about",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
