import type { MetadataRoute } from "next";

const BASE_URL = "https://savan.sp-net.in";

type PageConfig = {
  route: string;
  priority: MetadataRoute.Sitemap[number]["priority"];
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const pages: PageConfig[] = [
  { route: "/", priority: 1.0, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return pages.map(({ route, priority, changeFrequency }) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
