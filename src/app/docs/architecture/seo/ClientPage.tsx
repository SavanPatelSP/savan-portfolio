"use client";

import Link from "next/link";
import { DocPage, Callout, InlineCode } from "@/components/docs/DocLayout";
import { APP_VERSION, LAST_UPDATED } from "@/data/documentation";

const toc = [
  { id: "overview", label: "Search Visibility" },
  { id: "structured", label: "Structured Content" },
  { id: "social", label: "Social Sharing" },
  { id: "related", label: "Related" },
];

export default function SEOClientPage() {
  return (
    <DocPage
      title="SEO & Metadata"
      description="How the site is optimized for search engines and social platforms."
      toc={toc}
      section="Architecture"
    >
      <section id="overview">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          Search Visibility
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Every page exports structured metadata that search engines and social platforms
          use to index and display content. This includes descriptive titles, concise
          descriptions, and canonical URLs that prevent duplicate content issues.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          All pages are pre-rendered at build time as static HTML. Search engines receive
          fully rendered content on the first request — no client-side rendering delays,
          no JavaScript-dependent content, and no render-blocking resources that would
          prevent indexing.
        </p>
      </section>

      <section id="structured">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Structured Content
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          JSON-LD structured data is embedded in pages to help search engines understand
          content types and display rich results (knowledge panels, breadcrumbs, etc.).
          Each page uses schema types specific to its content.
        </p>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">XML Sitemap</strong> — An auto-generated sitemap
              lists every public page with priority and change frequency hints for search engines.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Robots Configuration</strong> — Search crawlers
              are guided to index public pages while avoiding API endpoints.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Canonical URLs</strong> — Every page defines a
              single preferred URL to prevent duplicate content indexing.
            </span>
          </li>
        </ul>
      </section>

      <section id="social">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Social Sharing
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Open Graph and Twitter Card metadata control how pages appear when shared on
          social platforms. Each page defines a title, description, and preview image
          optimized for link previews.
        </p>

        <Callout type="info" title="Version Note">
          SEO configurations are maintained and updated as part of each release. Current
          settings are for version <InlineCode>{APP_VERSION}</InlineCode> (
          <InlineCode>{LAST_UPDATED}</InlineCode>).
        </Callout>
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
            <p className="text-[13px] text-white/30">How pages map to URLs.</p>
          </Link>
          <Link
            href="/docs/features/performance"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Performance</p>
            <p className="text-[13px] text-white/30">How speed supports SEO.</p>
          </Link>
          <Link
            href="/docs/architecture/technology-stack"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Technology Stack</p>
            <p className="text-[13px] text-white/30">The platform powering the site.</p>
          </Link>
          <Link
            href="/docs/architecture/build-deploy"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Build &amp; Deploy</p>
            <p className="text-[13px] text-white/30">How static pages are generated.</p>
          </Link>
        </div>
      </section>
    </DocPage>
  );
}
