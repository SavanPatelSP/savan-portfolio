"use client";

import Link from "next/link";
import { DocPage, Callout, CodeBlock, InlineCode } from "@/components/docs/DocLayout";
import { APP_VERSION, LAST_UPDATED } from "@/data/docs";

const toc = [
  { id: "how-seo-works", label: "How SEO Works Here" },
  { id: "metadata-api", label: "Metadata API" },
  { id: "open-graph", label: "Open Graph" },
  { id: "twitter-cards", label: "Twitter Cards" },
  { id: "json-ld", label: "JSON-LD Structured Data" },
  { id: "sitemap", label: "Sitemap" },
  { id: "robots", label: "robots.txt" },
  { id: "canonical-urls", label: "Canonical URLs" },
  { id: "page-metadata", label: "Page Metadata Patterns" },
  { id: "best-practices", label: "Best Practices" },
  { id: "common-mistakes", label: "Common Mistakes" },
];

export default function SEOClientPage() {
  return (
    <DocPage
      title="SEO & Metadata"
      description="Every page in this application exports structured metadata that search engines and social platforms use to index and display the content. This page documents the metadata system, Open Graph tags, structured data, sitemap generation, and robots.txt configuration."
      toc={toc}
      section="Architecture"
    >
      <section id="how-seo-works">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          How SEO Works Here
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Search engine optimization in this application is built on four layers:
        </p>
        <ol className="list-decimal list-inside space-y-3 mb-6">
          <li className="text-[14px] text-white/40 leading-relaxed">
            <strong className="text-white/60">Metadata API</strong> — Each page exports a{" "}
            <InlineCode>metadata</InlineCode> object that generates{" "}
            <InlineCode>&lt;title&gt;</InlineCode>, <InlineCode>&lt;meta&gt;</InlineCode>, and{" "}
            <InlineCode>&lt;link&gt;</InlineCode> tags in the document{" "}
            <InlineCode>&lt;head&gt;</InlineCode>.
          </li>
          <li className="text-[14px] text-white/40 leading-relaxed">
            <strong className="text-white/60">Static Generation</strong> — All pages are
            pre-rendered at build time as static HTML. Search engines receive fully rendered HTML
            with no client-side JavaScript required to see the content.
          </li>
          <li className="text-[14px] text-white/40 leading-relaxed">
            <strong className="text-white/60">Sitemap</strong> — An XML sitemap at{" "}
            <InlineCode>/sitemap.xml</InlineCode> lists every public route with priority and
            change frequency metadata.
          </li>
          <li className="text-[14px] text-white/40 leading-relaxed">
            <strong className="text-white/60">Structured Data</strong> — JSON-LD embedded in
            the page helps search engines understand the content type and display rich results.
          </li>
        </ol>

        <Callout type="info" title="Static HTML Advantage">
          Because all pages are statically generated, search engine crawlers receive complete HTML
          on the first request. There is no client-side rendering delay, no JavaScript-dependent
          content, and no render-blocking resources that would prevent indexing. This is the same
          HTML that the service worker caches for offline use.
        </Callout>
      </section>

      <section id="metadata-api">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Metadata API
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Next.js provides a co-located metadata API. Each <InlineCode>page.tsx</InlineCode>{" "}
          exports a <InlineCode>metadata</InlineCode> object. The root layout defines base
          metadata that is inherited by all pages.
        </p>

        <CodeBlock
          code={`// Root layout base metadata
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s — Portfolio App",
    default: "Portfolio App — Savan Patel",
  },
  description:
    "Engineering portfolio showcasing projects, downloads, and technical documentation.",
  metadataBase: new URL("https://savan.sp-net.in"),
};`}
          language="typescript"
          filename="app/layout.tsx (base metadata)"
        />

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Title Template
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The <InlineCode>title.template</InlineCode> pattern means each page only specifies its
          unique title. For example, exporting{" "}
          <InlineCode>title: &quot;Projects&quot;</InlineCode> produces{" "}
          <InlineCode>&lt;title&gt;Projects — Portfolio App&lt;/title&gt;</InlineCode>. The{" "}
          <InlineCode>default</InlineCode> title is used only for the root page (<InlineCode>/</InlineCode>).
        </p>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          metadataBase
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The <InlineCode>metadataBase</InlineCode> provides the root URL for resolving relative
          paths. When a page exports{" "}
          <InlineCode>alternates: &#123; canonical: &quot;/docs/routing&quot; &#125;</InlineCode>,
          Next.js resolves it to{" "}
          <InlineCode>https://savan.sp-net.in/docs/routing</InlineCode>. Without{" "}
          <InlineCode>metadataBase</InlineCode>, relative canonical URLs would be invalid.
        </p>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Metadata Merging
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Next.js merges metadata from parent layouts to child pages. The root layout provides
          the base. The docs layout can override or extend it. A specific documentation page can
          override both. The merge is shallow — a page&apos;s <InlineCode>openGraph</InlineCode>{" "}
          completely replaces the parent&apos;s <InlineCode>openGraph</InlineCode>, it does not
          merge individual fields.
        </p>
      </section>

      <section id="open-graph">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Open Graph
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Open Graph tags control how the application appears when shared on Facebook, LinkedIn,
          Discord, Slack, and other platforms that support the OG protocol. Each page exports Open
          Graph metadata defining title, description, image, URL, and content type.
        </p>

        <CodeBlock
          code={`export const metadata: Metadata = {
  openGraph: {
    title: "Portfolio App — Savan Patel",
    description:
      "Engineering portfolio showcasing projects, downloads, and technical documentation.",
    url: "https://savan.sp-net.in",
    siteName: "SP NET INC",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og/hero.png",
        width: 1200,
        height: 630,
        alt: "Portfolio App",
      },
    ],
  },
};`}
          language="typescript"
          filename="Open Graph metadata"
        />

        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The recommended OG image size is 1200×630 pixels. This is the size that Facebook and
          LinkedIn use for link previews. Images smaller than this may be cropped or displayed at
          lower resolution.
        </p>

        <Callout type="tip" title="Testing Open Graph Tags">
          Use the Facebook Sharing Debugger (developers.facebook.com/tools/debug) to test Open
          Graph tags. It shows exactly how your page will appear when shared and identifies any
          missing or incorrect tags.
        </Callout>
      </section>

      <section id="twitter-cards">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Twitter Cards
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Twitter/X uses its own card metadata system. The{" "}
          <InlineCode>summary_large_image</InlineCode> card type displays a large preview image
          below the tweet text.
        </p>

        <CodeBlock
          code={`export const metadata: Metadata = {
  twitter: {
    card: "summary_large_image",
    title: "Portfolio App — Savan Patel",
    description:
      "Engineering portfolio showcasing projects, downloads, and technical documentation.",
    images: ["/og/hero.png"],
    creator: "@savanpatel",
  },
};`}
          language="typescript"
          filename="Twitter card metadata"
        />

        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Twitter cards require the <InlineCode>twitter:card</InlineCode>,{" "}
          <InlineCode>twitter:title</InlineCode>, and <InlineCode>twitter:image</InlineCode> tags.
          The <InlineCode>twitter:creator</InlineCode> tag attributes the card to the Twitter
          account. Without it, the card still displays but without author attribution.
        </p>
      </section>

      <section id="json-ld">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          JSON-LD Structured Data
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          JSON-LD structured data is embedded in the page as a{" "}
          <InlineCode>&lt;script type=&quot;application/ld+json&quot;&gt;</InlineCode> element.
          Search engines use this to understand the content type and generate rich results
          (knowledge panels, breadcrumbs, etc.).
        </p>

        <CodeBlock
          code={`// Structured data for the homepage
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Savan Patel",
  url: "https://savan.sp-net.in",
  jobTitle: "Software Engineer",
  sameAs: [
    "https://github.com/savanpatel",
    "https://linkedin.com/in/savanpatel",
  ],
};

// Rendered in the page component
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>`}
          language="tsx"
          filename="JSON-LD structured data"
        />

        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          This application uses the <InlineCode>Person</InlineCode> schema for the homepage and
          founder pages, and the <InlineCode>WebSite</InlineCode> schema for the site root. Each
          schema is specific to the page it appears on — there is no global JSON-LD block.
        </p>
      </section>

      <section id="sitemap">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Sitemap
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The sitemap is generated at build time by <InlineCode>src/app/sitemap.ts</InlineCode>.
          It lists every public route with a priority (0.0–1.0) and change frequency hint. The
          sitemap is revalidated daily (<InlineCode>revalidate = 86400</InlineCode>) and uses{" "}
          <InlineCode>force-static</InlineCode> generation.
        </p>

        <CodeBlock
          code={`// src/app/sitemap.ts
import type { MetadataRoute } from "next";

export const dynamic = "force-static";
export const revalidate = 86400;

const BASE_URL = "https://savan.sp-net.in";

type PageConfig = {
  route: string;
  priority: MetadataRoute.Sitemap[number]["priority"];
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const pages: PageConfig[] = [
  { route: "/", priority: 1.0, changeFrequency: "monthly" },
  { route: "/company", priority: 0.9, changeFrequency: "monthly" },
  { route: "/contact", priority: 0.9, changeFrequency: "monthly" },
  { route: "/products", priority: 0.9, changeFrequency: "monthly" },
  { route: "/founder", priority: 0.9, changeFrequency: "monthly" },
  { route: "/trust/status", priority: 0.9, changeFrequency: "daily" },
  // ... 80+ routes total
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ route, priority, changeFrequency }) => ({
    url: new URL(route, BASE_URL).toString(),
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}`}
          language="typescript"
          filename="src/app/sitemap.ts"
        />

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Priority Values
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Priority values signal to search engines which pages are most important relative to
          others on the same site. They do not affect ranking against other sites.
        </p>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Priority Distribution</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Priority   Routes
────────────────────────────────────────────
1.0        / (homepage)
0.9        /company, /contact, /products,
           /founder, /downloads, /trust/status
0.8        /company/about, /company/mission,
           /company/careers, /portfolio-app/*,
           /founder/*, /research, /trust/*
0.7        /explore/*, /research/*,
           /products/*, /resources/faqs
0.6        /company/brand, /company/newsletter,
           /resources/media-kit, /explore/learning`}
            </code>
          </pre>
        </div>
      </section>

      <section id="robots">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          robots.txt
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The robots file is generated by <InlineCode>src/app/robots.ts</InlineCode>. It allows
          all crawlers to access all public pages while blocking the API directory.
        </p>

        <CodeBlock
          code={`// src/app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: "https://savan.sp-net.in/sitemap.xml",
  };
}`}
          language="typescript"
          filename="src/app/robots.ts"
        />

        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The <InlineCode>disallow: &quot;/api/&quot;</InlineCode> rule prevents search engines
          from crawling the contact form endpoint. There is no reason to index API routes, and
          crawling them could trigger unnecessary POST requests or expose endpoint structure.
        </p>

        <Callout type="warning" title="robots.txt is not security">
          The robots file is a courtesy guideline for well-behaved crawlers. Malicious bots
          ignore it. Do not rely on robots.txt to protect sensitive endpoints — use
          authentication and rate limiting instead.
        </Callout>
      </section>

      <section id="canonical-urls">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Canonical URLs
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Every page defines a canonical URL to prevent duplicate content issues. The canonical URL
          is the single preferred URL that search engines should index for that page. If the same
          content is accessible at multiple URLs, the canonical tag tells search engines which one
          to rank.
        </p>

        <CodeBlock
          code={`// Each page exports a canonical URL
export const metadata: Metadata = {
  alternates: {
    canonical: "/docs/features/offline",
  },
};

// Resolves to: https://savan.sp-net.in/docs/features/offline
// The metadataBase from the root layout provides the origin`}
          language="typescript"
          filename="canonical URL pattern"
        />

        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Without canonical URLs, search engines might index both{" "}
          <InlineCode>https://savan.sp-net.in/docs</InlineCode> and{" "}
          <InlineCode>https://savan.sp-net.in/docs/</InlineCode> as separate pages (trailing
          slash variation). The canonical tag resolves this ambiguity.
        </p>
      </section>

      <section id="page-metadata">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Page Metadata Patterns
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Each page type follows a consistent metadata pattern:
        </p>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Page Metadata Patterns</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Page Type          Title Pattern              Canonical
────────────────────────────────────────────────────────────
Homepage           Default (from template)    /
Section index      Section Name               /section
Sub-page           Page Name — Section        /section/page
Documentation      Doc Title — Documentation  /docs/path
404                404 — Page Not Found        (no index)
API routes         (no metadata)              (no index)`}
            </code>
          </pre>
        </div>

        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Pages that should not be indexed (404, API routes) include{" "}
          <InlineCode>robots: &#123; index: false &#125;</InlineCode> in their metadata. The 404
          page also sets <InlineCode>follow: false</InlineCode> to prevent crawlers from following
          links on the error page.
        </p>
      </section>

      <section id="best-practices">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Best Practices
        </h2>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Export <InlineCode>metadata</InlineCode> from every <InlineCode>page.tsx</InlineCode>{" "}
              file. Missing metadata means the page inherits the parent layout&apos;s title and
              description, which may not be accurate.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Add every new public route to <InlineCode>src/app/sitemap.ts</InlineCode> with
              appropriate priority. Pages not in the sitemap may still be indexed (via links),
              but the sitemap signals which pages to prioritize.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Test metadata with the Facebook Sharing Debugger and Twitter Card Validator before
              deploying. Social preview images that are too small or missing will not display
              correctly.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Keep <InlineCode>description</InlineCode> under 160 characters. Search engines
              truncate descriptions longer than this in search results.
            </span>
          </li>
        </ul>
      </section>

      <section id="common-mistakes">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Common Mistakes
        </h2>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Using absolute URLs in metadata:</strong> The{" "}
              <InlineCode>metadataBase</InlineCode> handles origin resolution. Use relative paths
              like <InlineCode>canonical: &quot;/docs/routing&quot;</InlineCode>, not{" "}
              <InlineCode>&quot;https://savan.sp-net.in/docs/routing&quot;</InlineCode>. Absolute
              paths break if the domain changes.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Missing sitemap entry for new routes:</strong>{" "}
              When adding a new page, forgetting to add it to{" "}
              <InlineCode>src/app/sitemap.ts</InlineCode> means the page may not be discovered
              by search engines until they follow links to it.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Duplicate titles across pages:</strong> If two
              pages export the same <InlineCode>title</InlineCode>, search engines cannot
              distinguish them. Each page should have a unique title that reflects its specific
              content.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">OG image path without leading slash:</strong>{" "}
              Open Graph image URLs without a leading slash (e.g.,{" "}
              <InlineCode>&quot;og/hero.png&quot;</InlineCode> instead of{" "}
              <InlineCode>&quot;/og/hero.png&quot;</InlineCode>) are resolved relative to the
              current page URL, not the site root. Always use absolute paths starting with{" "}
              <InlineCode>/</InlineCode>.
            </span>
          </li>
        </ul>
      </section>

      <section id="related">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Related
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/docs/architecture/routing"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Routing</p>
            <p className="text-[13px] text-white/30">File-based routing and per-route metadata configuration.</p>
          </Link>
          <Link
            href="/docs/features/performance"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Performance</p>
            <p className="text-[13px] text-white/30">Core Web Vitals and page speed impact on SEO.</p>
          </Link>
          <Link
            href="/docs/architecture/technology-stack"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Technology Stack</p>
            <p className="text-[13px] text-white/30">Next.js Metadata API and framework features.</p>
          </Link>
          <Link
            href="/docs/architecture/build-deploy"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Build &amp; Deploy</p>
            <p className="text-[13px] text-white/30">Static generation and deployment pipeline.</p>
          </Link>
        </div>
      </section>

      <Callout type="info" title="Version Note">
        SEO configurations are maintained and updated as part of each release. Current settings
        are for version <InlineCode>{APP_VERSION}</InlineCode> (
        <InlineCode>{LAST_UPDATED}</InlineCode>).
      </Callout>
    </DocPage>
  );
}
