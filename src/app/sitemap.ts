import type { MetadataRoute } from "next";

const BASE_URL = "https://savan.sp-net.in";

type PageConfig = {
  route: string;
  priority: MetadataRoute.Sitemap[number]["priority"];
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const pages: PageConfig[] = [
  { route: "/", priority: 1.0, changeFrequency: "monthly" },

  { route: "/company", priority: 0.9, changeFrequency: "monthly" },
  { route: "/company/about", priority: 0.9, changeFrequency: "monthly" },
  { route: "/company/mission", priority: 0.8, changeFrequency: "monthly" },
  { route: "/company/leadership", priority: 0.8, changeFrequency: "monthly" },
  { route: "/company/partners", priority: 0.7, changeFrequency: "monthly" },
  { route: "/company/careers", priority: 0.8, changeFrequency: "monthly" },
  { route: "/company/newsroom", priority: 0.7, changeFrequency: "weekly" },
  { route: "/company/brand", priority: 0.6, changeFrequency: "monthly" },
  { route: "/company/contact", priority: 0.8, changeFrequency: "monthly" },
  { route: "/contact", priority: 0.9, changeFrequency: "monthly" },
  { route: "/get-in-touch", priority: 0.9, changeFrequency: "monthly" },
  { route: "/company/socials", priority: 0.7, changeFrequency: "monthly" },
  { route: "/company/support", priority: 0.7, changeFrequency: "monthly" },
  { route: "/company/updates", priority: 0.7, changeFrequency: "weekly" },
  { route: "/company/newsletter", priority: 0.6, changeFrequency: "monthly" },

  { route: "/products", priority: 0.9, changeFrequency: "monthly" },
  { route: "/products/sp-net-gram", priority: 0.9, changeFrequency: "monthly" },
  { route: "/products/sp-net-admin-os", priority: 0.9, changeFrequency: "monthly" },
  { route: "/products/sp-net-ai", priority: 0.9, changeFrequency: "monthly" },
  { route: "/products/sp-net-ecosystem", priority: 0.7, changeFrequency: "monthly" },

  { route: "/research", priority: 0.8, changeFrequency: "monthly" },
  { route: "/research/ai", priority: 0.8, changeFrequency: "monthly" },
  { route: "/research/cloud", priority: 0.7, changeFrequency: "monthly" },
  { route: "/research/cybersecurity", priority: 0.7, changeFrequency: "monthly" },
  { route: "/research/innovation-lab", priority: 0.7, changeFrequency: "monthly" },
  { route: "/research/future-tech", priority: 0.7, changeFrequency: "monthly" },

  { route: "/trust", priority: 0.8, changeFrequency: "monthly" },
  { route: "/trust/privacy", priority: 0.8, changeFrequency: "monthly" },
  { route: "/trust/security", priority: 0.8, changeFrequency: "monthly" },
  { route: "/trust/transparency", priority: 0.7, changeFrequency: "monthly" },
  { route: "/trust/responsible-ai", priority: 0.7, changeFrequency: "monthly" },
  { route: "/trust/status", priority: 0.9, changeFrequency: "daily" },

  { route: "/explore", priority: 0.8, changeFrequency: "monthly" },
  { route: "/explore/products", priority: 0.8, changeFrequency: "monthly" },
  { route: "/explore/projects", priority: 0.7, changeFrequency: "monthly" },
  { route: "/explore/innovation", priority: 0.7, changeFrequency: "monthly" },
  { route: "/explore/technology", priority: 0.7, changeFrequency: "monthly" },
  { route: "/explore/vision", priority: 0.7, changeFrequency: "monthly" },
  { route: "/explore/learning", priority: 0.6, changeFrequency: "monthly" },

  { route: "/resources", priority: 0.8, changeFrequency: "monthly" },
  { route: "/resources/documentation", priority: 0.7, changeFrequency: "monthly" },
  { route: "/resources/faqs", priority: 0.8, changeFrequency: "monthly" },
  { route: "/resources/blog", priority: 0.7, changeFrequency: "weekly" },
  { route: "/resources/open-source", priority: 0.7, changeFrequency: "monthly" },
  { route: "/resources/media-kit", priority: 0.6, changeFrequency: "monthly" },
  { route: "/resources/press-releases", priority: 0.6, changeFrequency: "monthly" },
  { route: "/resources/press-contact", priority: 0.6, changeFrequency: "monthly" },

  { route: "/founder", priority: 0.9, changeFrequency: "monthly" },
  { route: "/founder/about", priority: 0.9, changeFrequency: "monthly" },
  { route: "/founder/journey", priority: 0.8, changeFrequency: "monthly" },
  { route: "/founder/philosophy", priority: 0.8, changeFrequency: "monthly" },
  { route: "/founder/roadmap", priority: 0.8, changeFrequency: "monthly" },
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
