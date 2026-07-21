"use client";

import Link from "next/link";
import {
  DocPage,
  Callout,
  InlineCode,
} from "@/components/docs/DocLayout";

const toc = [
  { id: "overview", label: "Overview" },
  { id: "three-column-layout", label: "Three-Column Layout" },
  { id: "navigation-structure", label: "Navigation Structure" },
  { id: "code-samples", label: "Code Samples" },
  { id: "table-of-contents", label: "Table of Contents" },
  { id: "breadcrumbs-and-previous-next", label: "Breadcrumbs and Previous/Next" },
  { id: "search-within-docs", label: "Search Within Docs" },
  { id: "best-practices", label: "Best Practices" },
  { id: "limitations", label: "Limitations" },
  { id: "common-mistakes", label: "Common Mistakes" },
  { id: "related", label: "Related" },
];

export default function ClientPage() {
  return (
    <DocPage
      title="Documentation Viewer"
      description="The built-in documentation system — a three-column reading interface with structured navigation, code samples, and inline search."
      toc={toc}
      section="Application"
    >
      <section id="overview">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          Overview
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The Documentation Viewer is the in-app knowledge base. It renders
          Markdown-derived content in a three-column layout: a navigation
          sidebar on the left, the main content area in the center, and a
          page-level table of contents on the right. The system is designed for
          reading reference material without leaving the application.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Documentation pages are static — they are built at compile time and
          served as pre-rendered HTML. This means they load quickly and work
          offline after the first visit, but content updates require a
          redeployment.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">Typical workflow:</strong> You open
          the Documentation Viewer from the Dashboard or sidebar, browse or
          search for a topic, read the page, copy a code snippet if needed, and
          use Previous/Next links or the sidebar to continue reading adjacent
          pages.
        </p>
      </section>

      <section id="three-column-layout">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Three-Column Layout
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The layout adapts to your screen width. On wide displays, all three
          columns are visible. Narrower screens progressively hide columns:
        </p>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-[13px] text-white/40 border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left py-3 pr-4 text-white/50 font-medium">
                  Column
                </th>
                <th className="text-left py-3 pr-4 text-white/50 font-medium">
                  Width
                </th>
                <th className="text-left py-3 text-white/50 font-medium">
                  Behavior at Narrow Viewports
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              <tr>
                <td className="py-3 pr-4 text-white/50">Left sidebar</td>
                <td className="py-3 pr-4">224px (w-56)</td>
                <td className="py-3">
                  Below 1024px (lg): collapses into a hamburger menu that slides
                  in from the left as an overlay.
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-white/50">Main content</td>
                <td className="py-3 pr-4">Flexible (max-w-3xl)</td>
                <td className="py-3">
                  Always visible. Uses the full remaining width on small screens.
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-white/50">Right sidebar (TOC)</td>
                <td className="py-3 pr-4">224px (w-56)</td>
                <td className="py-3">
                  Below 1280px (xl): hidden completely. The TOC content is still
                  accessible by scrolling the main content.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[14px] text-white/40 leading-relaxed">
          The hamburger menu on mobile is a temporary overlay — it does not
          displace the main content. Tapping a navigation link in the overlay
          closes it automatically and navigates to the selected page.
        </p>
      </section>

      <section id="navigation-structure">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Navigation Structure
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The left sidebar organizes documentation into collapsible sections.
          Each section groups related pages under a common topic:
        </p>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Getting Started</strong> —
              Introduction, quick start, and navigation basics.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Installation</strong> — Platform
              guides for web, PWA, Android, and iOS.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Application</strong> —
              Documentation for each page: Dashboard, Projects, Downloads,
              Settings, Search.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Features</strong> — Deep dives
              into offline support, updates, responsive design, accessibility,
              performance, and security.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Architecture</strong> —
              Technology stack, project structure, routing, service worker,
              SEO, and deployment.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Developer Guide</strong> — Setup,
              component architecture, coding standards, and contribution
              guidelines.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Reference</strong> — FAQ,
              troubleshooting, changelog, and platform support matrix.
            </span>
          </li>
        </ul>
        <p className="text-[14px] text-white/40 leading-relaxed mt-4">
          The currently active page is highlighted in the sidebar with a
          brighter background and a left border accent. Sections can be
          collapsed or expanded individually — the state is not persisted across
          page navigations.
        </p>
      </section>

      <section id="code-samples">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Code Samples
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Documentation pages include syntax-highlighted code blocks for
          technical content. Each code block has:
        </p>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              A <strong className="text-white/60">filename header</strong>{" "}
              showing the file path or command context (e.g.,{" "}
              <InlineCode>Terminal</InlineCode>,{" "}
              <InlineCode>package.json</InlineCode>).
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              A <strong className="text-white/60">copy button</strong> that
              copies the entire code block to your clipboard. Displays a
              &quot;Copied!&quot; confirmation for two seconds after clicking.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              Monospace font rendering with whitespace preservation for
              multi-line code.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              Inline code elements using <InlineCode>backticks</InlineCode> for
              referencing commands, file paths, or short snippets within body
              text.
            </span>
          </li>
        </ul>

        <Callout type="note" title="Copy Button Limitation">
          The copy button uses the Clipboard API, which requires a secure
          context (HTTPS or localhost). If you are viewing documentation over
          plain HTTP, the copy button will fail silently.
        </Callout>
      </section>

      <section id="table-of-contents">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Table of Contents
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The right sidebar displays a page-level table of contents (TOC)
          generated from the section headings on the current page. It uses an{" "}
          <InlineCode>IntersectionObserver</InlineCode> to highlight the
          currently visible heading as you scroll.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The TOC updates in real-time as you scroll through the page. The
          active heading is highlighted with a brighter text color and a left
          border accent. Clicking a TOC entry scrolls the page to that section
          with a smooth scroll animation.
        </p>

        <Callout type="tip" title="Deep Linking">
          Each section heading has a unique ID that can be used as an anchor
          link. You can link directly to a specific section by appending{" "}
          <InlineCode>#section-id</InlineCode> to the page URL.
        </Callout>
      </section>

      <section id="breadcrumbs-and-previous-next">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Breadcrumbs and Previous/Next
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Two navigation aids help you move through the documentation:
        </p>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Breadcrumbs</strong> — Appear
              above each page title, showing the path from Docs to Section to
              Page. Clicking any breadcrumb level navigates up the hierarchy.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Previous/Next links</strong> —
              Appear at the bottom of every page. These follow the sidebar
              navigation order, so you can read through the documentation
              sequentially.
            </span>
          </li>
        </ul>
        <p className="text-[14px] text-white/40 leading-relaxed mt-4">
          The Previous/Next links wrap around at the boundaries — the last page
          in a section links to the first page of the next section, and vice
          versa.
        </p>
      </section>

      <section id="search-within-docs">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Search Within Docs
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The Documentation Viewer integrates with the app-wide search system.
          Press <InlineCode>Cmd+K</InlineCode> (macOS) or{" "}
          <InlineCode>Ctrl+K</InlineCode> (Windows/Linux) to open the search
          modal from any documentation page.
        </p>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              Search results include matching documentation pages with their
              section context and a text excerpt.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Results are ranked by relevance — title matches rank higher than
              body content matches.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              Clicking a result navigates directly to that page. The search
              modal closes automatically after navigation.
            </span>
          </li>
        </ul>
      </section>

      <section id="best-practices">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Best Practices
        </h2>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Use the TOC on the right to jump between sections on long pages.
              It avoids the need to scroll manually through extended content.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Use keyboard shortcuts (Cmd/Ctrl + K) to search rather than
              manually browsing the sidebar. Search is faster when you know the
              topic name.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              If a code sample does not work as expected, check the filename
              header — it may indicate a different file or environment than
              what you assumed.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              On mobile, collapse the sidebar after navigating to a page to
              maximize reading space.
            </span>
          </li>
        </ul>
      </section>

      <section id="limitations">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Limitations
        </h2>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              Documentation is static and built at compile time. Content updates
              require a redeployment — there is no live editing or real-time
              content refresh.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              The right-side TOC is hidden on screens below 1280px (xl). There
              is no alternative access method for the TOC on narrower viewports.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              The left sidebar does not persist its collapse state across
              navigations. Every page load starts with all sections expanded.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              Code blocks do not support line highlighting, line numbers, or
              diff views. They render as plain syntax-highlighted text.
            </span>
          </li>
        </ul>
      </section>

      <section id="common-mistakes">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Common Mistakes
        </h2>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Assuming the copy button works
              everywhere</strong> — The Clipboard API requires HTTPS or
              localhost. Over plain HTTP, the button will not function and
              there is no error message.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Confusing sidebar sections with
              page sections</strong> — The left sidebar groups pages into
              sections (Getting Started, Installation, etc.). The TOC on the
              right groups headings within the current page. These are
              different hierarchies.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Using the back button to
              navigate documentation</strong> — The browser back button works,
              but Previous/Next links at the bottom of each page provide a
              more predictable reading order.
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
            href="/docs/application/search"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">
              Search
            </p>
            <p className="text-[13px] text-white/30">
              Full-text search across all documentation and content.
            </p>
          </Link>
          <Link
            href="/docs/application/dashboard"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">
              Dashboard
            </p>
            <p className="text-[13px] text-white/30">
              Return to the main dashboard overview.
            </p>
          </Link>
          <Link
            href="/docs/getting-started/introduction"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">
              Introduction
            </p>
            <p className="text-[13px] text-white/30">
              Start here for a high-level overview of the portfolio.
            </p>
          </Link>
          <Link
            href="/docs/reference/faq"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">
              FAQ
            </p>
            <p className="text-[13px] text-white/30">
              Answers to common questions about the application.
            </p>
          </Link>
        </div>
      </section>
    </DocPage>
  );
}
