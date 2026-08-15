import type { Metadata } from "next";
import { APP_CONFIG } from "@/config/app";
import type { BlogPost, BlogCategory } from "@/data/blog";
import type { NewsroomPost } from "@/data/newsroom";
import { formatDate, formatDateShort, readingTimeMinutes } from "@/lib/content";

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

/* ─── Breadcrumbs (shared) ─────────────────────────────────────── */

export function generateBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/* ─── Blog ─────────────────────────────────────────────────────── */

export function generateBlogIndexMetadata(): Metadata {
  const url = `${APP_CONFIG.url}/blog`;
  const title = "Blog — Thoughts, Ideas & Things I'm Building";
  const description =
    "Personal writing from Savan Patel on engineering lessons, product-building, technology, and ideas. A space for founder thoughts, experiments, and what comes next.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url,
      siteName: APP_CONFIG.organization.name,
      images: [{ url: "/og?section=blog", width: 1200, height: 630, alt: "Savan Patel — Blog" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@savanpatel",
      images: [{ url: "/og?section=blog", width: 1200, height: 630, alt: "Savan Patel — Blog" }],
    },
    alternates: {
      canonical: "/blog",
    },
  };
}

export function generateBlogPostMetadata(post: BlogPost): Metadata {
  const url = `${APP_CONFIG.url}/blog/${post.slug}`;
  const minutes = post.readingTime ?? readingTimeMinutes(post.content);
  const description = post.excerpt;
  const title = `${post.title} — Blog`;
  const publishedTime = new Date(post.date).toISOString();

  return {
    title,
    description,
    authors: [{ name: post.author, url: APP_CONFIG.url }],
    openGraph: {
      title: post.title,
      description,
      type: "article",
      url,
      siteName: APP_CONFIG.organization.name,
      publishedTime,
      authors: [APP_CONFIG.url],
      section: post.category,
      tags: post.tags,
      images: post.heroImage
        ? [{ url: post.heroImage, alt: post.heroAlt || post.title }]
        : [{ url: "/og?section=blog", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      creator: "@savanpatel",
      images: post.heroImage
        ? [{ url: post.heroImage, alt: post.heroAlt || post.title }]
        : [{ url: "/og?section=blog", width: 1200, height: 630, alt: title }],
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    other: {
      "article:published_time": publishedTime,
      "article:section": post.category,
      "article:tag": post.tags.join(","),
      "article:reading_time": String(minutes),
    },
  };
}

export function generateBlogIndexJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog — Savan Patel",
    description:
      "Personal writing from Savan Patel on engineering lessons, product-building, technology, and ideas.",
    url: `${APP_CONFIG.url}/blog`,
    isPartOf: { "@type": "WebSite", name: "Savan Patel — Portfolio", url: APP_CONFIG.url },
    mainEntity: {
      "@type": "Blog",
      name: "Savan Patel — Blog",
      author: { "@type": "Person", name: APP_CONFIG.founder.name, url: APP_CONFIG.url },
      url: `${APP_CONFIG.url}/blog`,
    },
  };
}

export function generateBlogCategoryMetadata(category: BlogCategory): Metadata {
  const url = `${APP_CONFIG.url}/blog/category/${category.slug}`;
  const title = `${category.label} — Blog`;
  const description = `${category.description} Read ${category.label.toLowerCase()} stories from Savan Patel, founder and product engineer at SP NET INC.`;

  return {
    title,
    description,
    openGraph: {
      title: `${category.label} — Blog`,
      description,
      type: "website",
      url,
      siteName: APP_CONFIG.organization.name,
      images: [{ url: "/og?section=blog", width: 1200, height: 630, alt: `Savan Patel — ${category.label}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@savanpatel",
      images: [{ url: "/og?section=blog", width: 1200, height: 630, alt: `Savan Patel — ${category.label}` }],
    },
    alternates: {
      canonical: `/blog/category/${category.slug}`,
    },
  };
}

export function generateBlogCategoryJsonLd(category: BlogCategory, posts: BlogPost[]) {
  const categoryUrl = `${APP_CONFIG.url}/blog/category/${category.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.label} — Blog`,
    description: category.description,
    url: categoryUrl,
    isPartOf: { "@type": "Blog", name: "Savan Patel — Blog", url: `${APP_CONFIG.url}/blog` },
    hasPart: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${APP_CONFIG.url}/blog/${post.slug}`,
      datePublished: new Date(post.date).toISOString(),
      author: { "@type": "Person", name: post.author, url: APP_CONFIG.url },
    })),
  };
}

export function generateBlogPostJsonLd(post: BlogPost) {
  const minutes = post.readingTime ?? readingTimeMinutes(post.content);
  const articleUrl = `${APP_CONFIG.url}/blog/${post.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        url: articleUrl,
        image: post.heroImage ? `${APP_CONFIG.url}${post.heroImage}` : undefined,
        datePublished: new Date(post.date).toISOString(),
        dateModified: new Date(post.date).toISOString(),
        timeRequired: `PT${minutes}M`,
        author: {
          "@type": "Person",
          name: post.author,
          url: APP_CONFIG.url,
          jobTitle: post.authorRole,
        },
        publisher: {
          "@type": "Organization",
          name: APP_CONFIG.organization.name,
          url: APP_CONFIG.organizationUrl,
          logo: { "@type": "ImageObject", url: `${APP_CONFIG.url}/android-chrome-512x512.png` },
        },
        articleSection: post.category,
        keywords: post.tags.join(", "),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": articleUrl,
        },
      },
      generateBreadcrumbJsonLd([
        { name: "Home", url: APP_CONFIG.url },
        { name: "Blog", url: `${APP_CONFIG.url}/blog` },
        { name: post.title, url: articleUrl },
      ]),
    ],
  };
}

/* ─── Newsroom ─────────────────────────────────────────────────── */

export function generateNewsroomIndexMetadata(): Metadata {
  const url = `${APP_CONFIG.url}/newsroom`;
  const title = "Newsroom — Official Updates from SP NET INC";
  const description =
    "Official announcements and updates from Savan Patel & SP NET INC — product launches, major milestones, and company news. Only official, confirmed announcements are published here.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url,
      siteName: APP_CONFIG.organization.name,
      images: [{ url: "/og?section=newsroom", width: 1200, height: 630, alt: "SP NET INC — Newsroom" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@savanpatel",
      images: [{ url: "/og?section=newsroom", width: 1200, height: 630, alt: "SP NET INC — Newsroom" }],
    },
    alternates: {
      canonical: "/newsroom",
    },
  };
}

export function generateNewsroomPostMetadata(post: NewsroomPost): Metadata {
  const url = `${APP_CONFIG.url}/newsroom/${post.slug}`;
  const description = post.summary;
  const title = `${post.title} — Newsroom`;
  const publishedTime = new Date(post.date).toISOString();

  return {
    title,
    description,
    authors: [{ name: post.author, url: APP_CONFIG.url }],
    openGraph: {
      title: post.title,
      description,
      type: "article",
      url,
      siteName: APP_CONFIG.organization.name,
      publishedTime,
      authors: [APP_CONFIG.url],
      section: post.category,
      images: [{ url: "/og?section=newsroom", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      creator: "@savanpatel",
      images: [{ url: "/og?section=newsroom", width: 1200, height: 630, alt: title }],
    },
    alternates: {
      canonical: `/newsroom/${post.slug}`,
    },
    other: {
      "article:published_time": publishedTime,
      "article:section": post.category,
    },
  };
}

export function generateNewsroomIndexJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Newsroom — SP NET INC",
    description:
      "Official announcements and updates from Savan Patel & SP NET INC — product launches, major milestones, and company news.",
    url: `${APP_CONFIG.url}/newsroom`,
    isPartOf: { "@type": "WebSite", name: "Savan Patel — Portfolio", url: APP_CONFIG.url },
    publisher: {
      "@type": "Organization",
      name: APP_CONFIG.organization.name,
      url: APP_CONFIG.organizationUrl,
    },
  };
}

export function generateNewsroomPostJsonLd(post: NewsroomPost) {
  const articleUrl = `${APP_CONFIG.url}/newsroom/${post.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsArticle",
        headline: post.title,
        description: post.summary,
        url: articleUrl,
        datePublished: new Date(post.date).toISOString(),
        dateModified: new Date(post.date).toISOString(),
        author: {
          "@type": "Person",
          name: post.author,
          url: APP_CONFIG.url,
          jobTitle: post.authorRole,
        },
        publisher: {
          "@type": "Organization",
          name: APP_CONFIG.organization.name,
          url: APP_CONFIG.organizationUrl,
          logo: { "@type": "ImageObject", url: `${APP_CONFIG.url}/android-chrome-512x512.png` },
        },
        articleSection: post.category,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": articleUrl,
        },
      },
      generateBreadcrumbJsonLd([
        { name: "Home", url: APP_CONFIG.url },
        { name: "Newsroom", url: `${APP_CONFIG.url}/newsroom` },
        { name: post.title, url: articleUrl },
      ]),
    ],
  };
}

/* ─── Formatters reused by blog/newsroom UI ────────────────────── */

export { formatDate, formatDateShort };
