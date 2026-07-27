"use client";

import Link from "next/link";
import { DocPage, Callout, InlineCode } from "@/components/docs/DocLayout";
import { APP_VERSION, LAST_UPDATED } from "@/data/documentation";

const toc = [
  { id: "overview", label: "Technology Overview" },
  { id: "frontend", label: "Frontend" },
  { id: "quality", label: "Quality & Performance" },
  { id: "related", label: "Related" },
];

export default function TechnologyStackClientPage() {
  return (
    <DocPage
      title="Technology Stack"
      description="A summary of the key technologies used to build this site, why they were chosen, and how they work together."
      toc={toc}
      section="Architecture"
    >
      <section id="overview">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          Technology Overview
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Every technology in this application is chosen for a specific reason. The stack
          prioritizes <strong className="text-white/60">performance</strong>,{" "}
          <strong className="text-white/60">developer experience</strong>, and{" "}
          <strong className="text-white/60">user experience</strong> — in that order.
        </p>
      </section>

      <section id="frontend">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Frontend
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The frontend is built with modern web standards: a component-based UI library, a
          utility-first styling system, smooth animations, and progressive web app capabilities.
          The result is a fast, installable, offline-capable application that works across
          all modern browsers and devices.
        </p>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">UI Framework</strong> — A modern React-based
              framework with server-side rendering, static generation, and file-based routing.
              Pages are pre-rendered at build time for instant loading.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Styling</strong> — Utility-first CSS with a
              CSS-first configuration approach. Design tokens (colors, spacing, fonts) are
              defined once and referenced everywhere. Zero runtime overhead.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Animations</strong> — A physics-based animation
              library handles page transitions, hover effects, scroll-triggered reveals, and
              layout animations. Respects user motion preferences automatically.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Progressive Web App</strong> — Browser-native
              capabilities enable home screen installation, offline access, and splash screens.
              Works on Chrome, Edge, Firefox, and Safari.
            </span>
          </li>
        </ul>
      </section>

      <section id="quality">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Quality &amp; Performance
        </h2>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Type Safety</strong> — Strict type checking
              catches errors at build time. Every component and data file is fully typed.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Image Optimization</strong> — Modern image formats
              and responsive sizing are handled automatically. No external image services required.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">SEO</strong> — Structured data, Open Graph tags,
              automatic sitemap generation, and per-page metadata ensure strong search visibility.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Accessibility</strong> — Semantic HTML, keyboard
              navigation, screen reader support, and reduced-motion respect are built in from
              the start.
            </span>
          </li>
        </ul>

        <Callout type="info" title="Version Note">
          All technology choices and integration details are current as of version{" "}
          <InlineCode>{APP_VERSION}</InlineCode> (<InlineCode>{LAST_UPDATED}</InlineCode>).
          Dependencies are updated regularly to stay current.
        </Callout>
      </section>

      <section id="related">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Related
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/docs/architecture/project-structure"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Project Structure</p>
            <p className="text-[13px] text-white/30">How the codebase is organized.</p>
          </Link>
          <Link
            href="/docs/features/performance"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Performance</p>
            <p className="text-[13px] text-white/30">How the site stays fast.</p>
          </Link>
          <Link
            href="/docs/developer/coding-standards"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Coding Standards</p>
            <p className="text-[13px] text-white/30">Code quality conventions.</p>
          </Link>
          <Link
            href="/docs/architecture/build-deploy"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Build &amp; Deploy</p>
            <p className="text-[13px] text-white/30">How the site is built and delivered.</p>
          </Link>
        </div>
      </section>
    </DocPage>
  );
}
