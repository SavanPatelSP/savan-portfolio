import type { Metadata } from "next";
import { APP_CONFIG } from "@/config/app";

interface ProductPageMetadataConfig {
  slug: string;
  title: string;
  description: string;
  ogDescription: string;
  twitterDescription: string;
  category: string;
  operatingSystem?: string;
  hasOgImage?: boolean;
}

interface ProductPageJsonLdConfig {
  slug: string;
  title: string;
  description: string;
  category: string;
  operatingSystem?: string;
}

export function generateProductMetadata(config: ProductPageMetadataConfig): Metadata {
  const { slug, title, description, ogDescription, twitterDescription, hasOgImage = true } = config;
  const url = `${APP_CONFIG.url}/products/${slug}`;

  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      title,
      description: ogDescription,
      type: "website",
      url,
      siteName: APP_CONFIG.organization.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: twitterDescription,
      creator: "@savanpatel",
    },
    alternates: {
      canonical: `/products/${slug}`,
    },
  };

  if (hasOgImage) {
    const ogImage = { url: `/og?section=${slug}`, width: 1200, height: 630 };
    metadata.openGraph!.images = [ogImage];
    metadata.twitter!.images = [ogImage];
  }

  return metadata;
}

export function generateProductJsonLd(config: ProductPageJsonLdConfig) {
  const { slug, description, category, operatingSystem = "Cross-platform" } = config;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: config.title.split("—")[0].trim(),
    description,
    applicationCategory: category,
    operatingSystem,
    url: `${APP_CONFIG.url}/products/${slug}`,
    creator: {
      "@type": "Person",
      name: APP_CONFIG.founder.name,
      url: APP_CONFIG.url,
    },
    publisher: {
      "@type": "Organization",
      name: APP_CONFIG.organization.name,
      url: APP_CONFIG.organizationUrl,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/PreRelease",
    },
  };
}
