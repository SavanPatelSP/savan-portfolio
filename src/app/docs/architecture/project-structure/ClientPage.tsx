"use client";

import Link from "next/link";
import { DocPage, Callout, InlineCode } from "@/components/docs/DocLayout";
import { APP_VERSION, LAST_UPDATED } from "@/data/documentation";

const toc = [
  { id: "overview", label: "Organizational Approach" },
  { id: "pages", label: "Pages & Routes" },
  { id: "components", label: "Component Organization" },
  { id: "data", label: "Data Layer" },
  { id: "quality", label: "Quality Standards" },
  { id: "related", label: "Related" },
];

export default function ProjectStructureClientPage() {
  return (
    <DocPage
      title="Project Structure"
      description="The project follows a feature-based directory structure with strict separation of concerns. Each directory owns a single responsibility."
      toc={toc}
      section="Architecture"
    >
      <section id="overview">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          Organizational Approach
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The codebase follows a <strong className="text-white/60">feature-based</strong> directory
          structure where each top-level folder owns a single concern. Routes, reusable UI, typed
          data, shared logic, and custom hooks each live in their dedicated location. This makes the
          codebase navigable without needing to open individual files.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Folders are organized so that every publicly accessible page is easy to find, while
          supporting files (layouts, components, data) are colocated with the features they serve.
        </p>
      </section>

      <section id="pages">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Pages &amp; Routes
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Each route is defined by a dedicated page file. Sections use shared layouts to provide
          persistent navigation chrome (sidebars, headers) across all pages in that section. This
          means users see instant transitions between sibling pages while the shared layout remains
          mounted.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Dynamic routes handle content that varies by URL segment. Each dynamic route maps to a
          known set of content — there are no catch-all routes that could expose unexpected content.
        </p>
      </section>

      <section id="components">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Component Organization
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Components are organized by <strong className="text-white/60">feature domain</strong>,
          not by type. Each subdirectory groups components that serve the same section of the
          application. This keeps related code colocated and makes it easy to find where a
          particular UI is defined.
        </p>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Reusable primitives</strong> — Shared UI components
              (buttons, badges, skeletons, icons) used across the entire application.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Layout components</strong> — Structural components
              that define the page shell (header, footer, scroll indicators).
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Feature directories</strong> — Domain-specific
              components (contact form, project cards, downloads, product listings) grouped by
              the page section they serve.
            </span>
          </li>
        </ul>
      </section>

      <section id="data">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Data Layer
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Content data is separated from component logic. Typed data files export structured
          arrays and interfaces — no side effects, no runtime fetching. This separation means
          components never define their own content data inline, making it easy to update
          content without touching component code.
        </p>
      </section>

      <section id="quality">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Quality Standards
        </h2>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              One component per file. Sub-components only used together live in the same file.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Types are co-located with their components. Shared types are centralized.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Every new page is registered in the sitemap for search engine discovery.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Default exports for components, named exports for types and utilities.
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
            href="/docs/architecture/technology-stack"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Technology Stack</p>
            <p className="text-[13px] text-white/30">The frameworks and libraries powering the site.</p>
          </Link>
          <Link
            href="/docs/architecture/routing"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Routing</p>
            <p className="text-[13px] text-white/30">How pages map to URLs.</p>
          </Link>
          <Link
            href="/docs/developer/coding-standards"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Coding Standards</p>
            <p className="text-[13px] text-white/30">Code quality and organization guidelines.</p>
          </Link>
          <Link
            href="/docs/developer/component-architecture"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Component Architecture</p>
            <p className="text-[13px] text-white/30">How components are structured and composed.</p>
          </Link>
        </div>
      </section>

      <Callout type="info" title="Version Note">
        Structure conventions are maintained across version{" "}
        <InlineCode>{APP_VERSION}</InlineCode> and documented as of{" "}
        <InlineCode>{LAST_UPDATED}</InlineCode>.
      </Callout>
    </DocPage>
  );
}
