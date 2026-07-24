import type { MetadataRoute } from "next";
import { APP_CONFIG } from "@/config/app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/app-preview/", "/sentry-example-page/", "/og/"],
    },
    sitemap: `${APP_CONFIG.url}/sitemap.xml`,
  };
}
