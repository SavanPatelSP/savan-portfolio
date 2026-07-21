"use client";

import Link from "next/link";
import {
  DocPage,
  Callout,
  InlineCode,
} from "@/components/docs/DocLayout";

const toc = [
  { id: "overview", label: "Overview" },
  { id: "filter-tabs", label: "Filter Tabs" },
  { id: "project-cards", label: "Project Cards" },
  { id: "tech-stack-tags", label: "Tech Stack Tags" },
  { id: "progress-tracking", label: "Progress Tracking" },
  { id: "url-state", label: "URL State" },
  { id: "best-practices", label: "Best Practices" },
  { id: "limitations", label: "Limitations" },
  { id: "common-mistakes", label: "Common Mistakes" },
  { id: "related", label: "Related" },
];

export default function ClientPage() {
  return (
    <DocPage
      title="Projects"
      description="The project showcase page — a filterable grid that presents every project with its status, tech stack, and progress."
      toc={toc}
      section="Application"
    >
      <section id="overview">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          Overview
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The Projects page is the primary surface for browsing the engineering
          portfolio. It renders all projects in a card-based grid layout, with
          filter tabs above the grid to narrow results by status. Each card is a
          summary — it shows the project name, a one-line description, its
          status badge, tech stack tags, and a progress bar for active projects.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Projects are sorted by last-updated date in descending order by
          default. The most recently modified project appears first. This
          sorting is not configurable from the UI.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">Typical workflow:</strong> You land
          on the page, scan the grid for the project you want, optionally tap a
          filter tab (e.g., &quot;Active&quot;) to narrow results, then click
          the card to open the full project detail page with description,
          screenshots, changelog, and download links.
        </p>
      </section>

      <section id="filter-tabs">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Filter Tabs
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          A row of filter tabs sits above the project grid. Each tab
          corresponds to a project status. The tabs are mutually exclusive —
          only one can be active at a time.
        </p>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-[13px] text-white/40 border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left py-3 pr-4 text-white/50 font-medium">
                  Tab
                </th>
                <th className="text-left py-3 pr-4 text-white/50 font-medium">
                  Projects Shown
                </th>
                <th className="text-left py-3 text-white/50 font-medium">
                  Count Badge
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              <tr>
                <td className="py-3 pr-4 text-white/50">All</td>
                <td className="py-3 pr-4">
                  Every project regardless of status. This is the default view
                  on page load.
                </td>
                <td className="py-3">Total project count</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-white/50">Active</td>
                <td className="py-3 pr-4">
                  Projects currently in development or actively maintained.
                  These show progress bars.
                </td>
                <td className="py-3">Active project count</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-white/50">Published</td>
                <td className="py-3 pr-4">
                  Projects that have been released and are publicly available.
                  Progress bars show 100%.
                </td>
                <td className="py-3">Published project count</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-white/50">Archived</td>
                <td className="py-3 pr-4">
                  Completed or retired projects no longer under active
                  development. These show 100% progress.
                </td>
                <td className="py-3">Archived project count</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The active tab is highlighted with a visible border and brighter text.
          A numeric count badge appears next to each tab label, showing how many
          projects fall under that filter.
        </p>
        <Callout type="info" title="URL Persistence">
          The selected filter is reflected in the URL query parameter. For
          example, selecting &quot;Active&quot; updates the URL to
          <InlineCode>/docs/application/projects?filter=active</InlineCode>.
          This makes filtered views shareable — you can send a link that opens
          the Projects page with a specific filter pre-selected.
        </Callout>
      </section>

      <section id="project-cards">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Project Cards
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Each project is rendered as a card in the grid. The card contains the
          following elements:
        </p>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Project name</strong> — Displayed
              prominently at the top. Clicking it navigates to the project detail
              page.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Description</strong> — A single-line
              summary truncated with ellipsis if it exceeds the card width.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Status badge</strong> — A
              color-coded pill: green for Active, blue for Published, gray for
              Archived.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Tech stack</strong> — Compact
              tags showing the primary technologies.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Progress bar</strong> — A
              gradient-filled bar indicating completion percentage. Only visible
              on active projects.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Last updated</strong> — Relative
              timestamp below the card.
            </span>
          </li>
        </ul>
        <p className="text-[14px] text-white/40 leading-relaxed mt-4">
          Cards animate into view using Framer Motion with a staggered fade-in.
          Hovering a card reveals a subtle border highlight and a slight shadow
          elevation. Clicking anywhere on the card (not just the project name)
          navigates to the detail page.
        </p>
      </section>

      <section id="tech-stack-tags">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Tech Stack Tags
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Each project card displays its tech stack as compact, color-coded
          tags. Tags are grouped by category:
        </p>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Languages</strong> — TypeScript,
              Python, Rust, Go, etc.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Frameworks</strong> — Next.js,
              React, Django, FastAPI, etc.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Infrastructure</strong> — Vercel,
              AWS, Docker, Cloudflare, etc.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Tools</strong> — Git, Figma,
              Tailwind CSS, Playwright, etc.
            </span>
          </li>
        </ul>
        <p className="text-[14px] text-white/40 leading-relaxed mt-4">
          Tags wrap within the card. If a project uses more than three
          technologies, the card shows the first three and a
          <InlineCode>+N more</InlineCode> indicator. Hovering over the
          overflow indicator reveals the full list in a tooltip.
        </p>
        <Callout type="note" title="Tag Assignment">
          Tech stack tags are assigned manually when a project is created or
          edited. They are not auto-detected from the project&apos;s source
          code. A project&apos;s tags may lag behind its actual technology
          usage if the author has not updated them.
        </Callout>
      </section>

      <section id="progress-tracking">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Progress Tracking
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Active projects display a progress bar at the bottom of the card.
          This bar represents the overall completion percentage based on
          milestones and tasks defined within the project.
        </p>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              The progress bar fills from left to right with a gradient
              animation on initial render.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              The numeric percentage is displayed as text adjacent to or below
              the bar.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              Published and archived projects always display 100%. The progress
              bar is still rendered but appears fully filled.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              Progress values are recalculated when milestones are modified.
              There is a short delay (up to a few seconds) before the UI
              reflects the change.
            </span>
          </li>
        </ul>
        <Callout type="tip" title="Project Detail">
          Click any project card to view its full detail page, which includes
          the complete description, screenshot gallery, changelog, download
          links, and milestone breakdown.
        </Callout>
      </section>

      <section id="url-state">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          URL State
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The Projects page uses URL query parameters to persist filter state.
          This has two practical consequences:
        </p>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Shareable links</strong> — Copying
              the URL while a filter is active preserves that filter for anyone
              who opens the link.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Browser navigation</strong> —
              Using the back/forward buttons restores the previous filter state
              correctly.
            </span>
          </li>
        </ul>
        <p className="text-[14px] text-white/40 leading-relaxed mt-4">
          If the URL contains an invalid filter value (e.g.,{" "}
          <InlineCode>?filter=invalid</InlineCode>), the page falls back to the
          &quot;All&quot; tab without displaying an error.
        </p>
      </section>

      <section id="best-practices">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Best Practices
        </h2>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Use filter tabs to reduce visual clutter when the portfolio has
              many projects. The &quot;Active&quot; tab is the most commonly
              useful filter.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Share filtered views by copying the URL after selecting a filter.
              This is faster than asking someone to navigate and filter
              manually.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              If a project appears under the wrong filter, its status may need
              to be updated on the backend. The grid reads status data directly
              from the project record.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              For a quick overview of project metrics, check the Dashboard
              stat cards instead — they aggregate counts across all statuses.
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
              There is no text search within the Projects page itself. To search
              projects by name or description, use the global search modal
              (Cmd/Ctrl + K).
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              Sorting is fixed to last-updated descending. There is no option
              to sort by name, creation date, or progress percentage.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              Tech stack tags are manually assigned. They are not
              auto-generated from source code analysis, so they can become
              stale.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              The grid layout is responsive but does not support switching
              between list and grid views.
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
              <strong className="text-white/60">Expecting real-time filtering</strong> —
              Filter tabs update the URL and re-render the grid, but they do
              not trigger a new network request. If a project was recently
              added on another device, you may need to refresh the page.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Misreading progress bars</strong> —
              Published and archived projects show 100% progress. This does
              not mean they are &quot;complete&quot; in an absolute sense — it
              means they are no longer in active development.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Clicking the +N more indicator</strong> —
              The overflow indicator is a hover-triggered tooltip, not a
              clickable link. Hovering reveals all tags; clicking does nothing.
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
            href="/docs/application/dashboard"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">
              Dashboard
            </p>
            <p className="text-[13px] text-white/30">
              Overview of stats, activity, and quick actions.
            </p>
          </Link>
          <Link
            href="/docs/application/downloads"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">
              Downloads
            </p>
            <p className="text-[13px] text-white/30">
              Download project files and view release history.
            </p>
          </Link>
          <Link
            href="/docs/application/search"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">
              Search
            </p>
            <p className="text-[13px] text-white/30">
              Find projects, documentation, and pages quickly.
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
              Overview of the portfolio and its features.
            </p>
          </Link>
        </div>
      </section>
    </DocPage>
  );
}
