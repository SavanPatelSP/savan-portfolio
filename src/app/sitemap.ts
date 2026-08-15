import type { MetadataRoute } from "next";
import { APP_CONFIG } from "@/config/app";
import { getBlogCategories, getPublishedBlogPosts } from "@/data/blog";
import { getPublishedNewsroomPosts } from "@/data/newsroom";

const BASE_URL = APP_CONFIG.url;

type PageConfig = {
  route: string;
  priority: MetadataRoute.Sitemap[number]["priority"];
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const pages: PageConfig[] = [
  { route: "/", priority: 1.0, changeFrequency: "monthly" },

  { route: "/blog", priority: 0.9, changeFrequency: "weekly" },

  { route: "/newsroom", priority: 0.8, changeFrequency: "weekly" },

  { route: "/company", priority: 0.9, changeFrequency: "monthly" },
  { route: "/company/about", priority: 0.9, changeFrequency: "monthly" },
  { route: "/company/mission", priority: 0.8, changeFrequency: "monthly" },
  { route: "/company/leadership", priority: 0.8, changeFrequency: "monthly" },
  { route: "/company/partners", priority: 0.7, changeFrequency: "monthly" },
  { route: "/company/careers", priority: 0.8, changeFrequency: "monthly" },
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
  { route: "/products/sp-net-workplace", priority: 0.7, changeFrequency: "monthly" },
  { route: "/products/sp-net-game", priority: 0.7, changeFrequency: "monthly" },
  { route: "/products/sp-net-cloud", priority: 0.7, changeFrequency: "monthly" },
  { route: "/products/sp-net-security", priority: 0.7, changeFrequency: "monthly" },
  { route: "/products/sp-net-robotics", priority: 0.7, changeFrequency: "monthly" },
  { route: "/products/sp-net-ecosystem", priority: 0.7, changeFrequency: "monthly" },
  { route: "/products/sp-net-api", priority: 0.7, changeFrequency: "monthly" },
  { route: "/products/sp-net-blockchain", priority: 0.8, changeFrequency: "monthly" },
  { route: "/products/savaro-x", priority: 0.8, changeFrequency: "monthly" },

  { route: "/downloads", priority: 0.9, changeFrequency: "monthly" },
  { route: "/downloads/portfolio-app", priority: 0.9, changeFrequency: "monthly" },

  { route: "/portfolio-app", priority: 0.9, changeFrequency: "monthly" },
  { route: "/portfolio-app/install", priority: 0.8, changeFrequency: "monthly" },
  { route: "/portfolio-app/platform-support", priority: 0.8, changeFrequency: "monthly" },
  { route: "/portfolio-app/offline", priority: 0.8, changeFrequency: "monthly" },
  { route: "/portfolio-app/release-notes", priority: 0.8, changeFrequency: "monthly" },
  { route: "/portfolio-app/privacy", priority: 0.8, changeFrequency: "monthly" },
  { route: "/portfolio-app/faq", priority: 0.8, changeFrequency: "monthly" },
  { route: "/install", priority: 0.7, changeFrequency: "monthly" },

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
  { route: "/trust/cookies", priority: 0.7, changeFrequency: "monthly" },
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
  { route: "/resources/open-source", priority: 0.7, changeFrequency: "monthly" },
  { route: "/resources/media-kit", priority: 0.6, changeFrequency: "monthly" },
  { route: "/resources/press-releases", priority: 0.6, changeFrequency: "monthly" },
  { route: "/resources/press-contact", priority: 0.6, changeFrequency: "monthly" },

  { route: "/founder", priority: 0.9, changeFrequency: "monthly" },
  { route: "/founder/about", priority: 0.9, changeFrequency: "monthly" },
  { route: "/founder/journey", priority: 0.8, changeFrequency: "monthly" },
  { route: "/founder/philosophy", priority: 0.8, changeFrequency: "monthly" },
  { route: "/founder/roadmap", priority: 0.8, changeFrequency: "monthly" },

  { route: "/docs", priority: 0.7, changeFrequency: "monthly" },
  { route: "/docs/getting-started/introduction", priority: 0.6, changeFrequency: "monthly" },
  { route: "/docs/getting-started/quick-start", priority: 0.6, changeFrequency: "monthly" },
  { route: "/docs/getting-started/navigation", priority: 0.6, changeFrequency: "monthly" },
  { route: "/docs/installation/overview", priority: 0.6, changeFrequency: "monthly" },
  { route: "/docs/installation/web", priority: 0.6, changeFrequency: "monthly" },
  { route: "/docs/installation/pwa", priority: 0.6, changeFrequency: "monthly" },
  { route: "/docs/installation/android", priority: 0.6, changeFrequency: "monthly" },
  { route: "/docs/installation/ios", priority: 0.6, changeFrequency: "monthly" },
  { route: "/docs/application/dashboard", priority: 0.6, changeFrequency: "monthly" },
  { route: "/docs/application/projects", priority: 0.6, changeFrequency: "monthly" },
  { route: "/docs/application/downloads", priority: 0.6, changeFrequency: "monthly" },
  { route: "/docs/application/documentation", priority: 0.6, changeFrequency: "monthly" },
  { route: "/docs/application/settings", priority: 0.6, changeFrequency: "monthly" },
  { route: "/docs/application/search", priority: 0.6, changeFrequency: "monthly" },
  { route: "/docs/features/offline", priority: 0.6, changeFrequency: "monthly" },
  { route: "/docs/features/updates", priority: 0.6, changeFrequency: "monthly" },
  { route: "/docs/features/responsive", priority: 0.6, changeFrequency: "monthly" },
  { route: "/docs/features/accessibility", priority: 0.6, changeFrequency: "monthly" },
  { route: "/docs/features/performance", priority: 0.6, changeFrequency: "monthly" },
  { route: "/docs/features/privacy", priority: 0.6, changeFrequency: "monthly" },
  { route: "/docs/architecture/technology-stack", priority: 0.6, changeFrequency: "monthly" },
  { route: "/docs/architecture/project-structure", priority: 0.6, changeFrequency: "monthly" },
  { route: "/docs/architecture/routing", priority: 0.6, changeFrequency: "monthly" },
  { route: "/docs/architecture/service-worker", priority: 0.6, changeFrequency: "monthly" },
  { route: "/docs/architecture/seo", priority: 0.6, changeFrequency: "monthly" },
  { route: "/docs/architecture/build-deploy", priority: 0.6, changeFrequency: "monthly" },
  { route: "/docs/developer/project-setup", priority: 0.6, changeFrequency: "monthly" },
  { route: "/docs/developer/component-architecture", priority: 0.6, changeFrequency: "monthly" },
  { route: "/docs/developer/coding-standards", priority: 0.6, changeFrequency: "monthly" },
  { route: "/docs/developer/contributing", priority: 0.6, changeFrequency: "monthly" },
  { route: "/docs/reference/faq", priority: 0.6, changeFrequency: "monthly" },
  { route: "/docs/reference/troubleshooting", priority: 0.6, changeFrequency: "monthly" },
  { route: "/docs/reference/changelog", priority: 0.6, changeFrequency: "monthly" },
  { route: "/docs/reference/platform-support", priority: 0.6, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = pages.map(({ route, priority, changeFrequency }) => ({
    url: new URL(route, BASE_URL).toString(),
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const blogPosts = getPublishedBlogPosts().map((post) => ({
    url: new URL(`/blog/${post.slug}`, BASE_URL).toString(),
    lastModified: new Date(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.8,
  }));

  const blogCategories = getBlogCategories().map((category) => ({
    url: new URL(`/blog/category/${category.slug}`, BASE_URL).toString(),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const newsroomPosts = getPublishedNewsroomPosts().map((post) => ({
    url: new URL(`/newsroom/${post.slug}`, BASE_URL).toString(),
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPosts, ...blogCategories, ...newsroomPosts];
}
