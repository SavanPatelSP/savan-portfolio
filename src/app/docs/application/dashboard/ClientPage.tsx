"use client";

import Link from "next/link";
import {
  DocPage,
  Callout,
  InlineCode,
} from "@/components/docs/DocLayout";

const toc = [
  { id: "overview", label: "Overview" },
  { id: "what-the-dashboard-shows", label: "What the Dashboard Shows" },
  { id: "stat-cards", label: "Stat Cards" },
  { id: "recent-projects", label: "Recent Projects Table" },
  { id: "activity-feed", label: "Activity Feed" },
  { id: "quick-actions", label: "Quick Actions" },
  { id: "data-freshness", label: "Data Freshness" },
  { id: "best-practices", label: "Best Practices" },
  { id: "limitations", label: "Limitations" },
  { id: "common-mistakes", label: "Common Mistakes" },
  { id: "related", label: "Related" },
];

export default function ClientPage() {
  return (
    <DocPage
      title="Dashboard"
      description="The landing page of the Portfolio App — an overview surface that surfaces key metrics, recent projects, and activity in one place."
      toc={toc}
      section="Application"
    >
      <section id="overview">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          Overview
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The Dashboard is the first screen you see after launching the Portfolio
          App. It functions as an aggregation layer: rather than navigating to
          Projects, Downloads, or Settings individually, the Dashboard pulls
          selected data from each section and presents it on a single surface.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The page is divided into four regions — stat cards at the top, a
          recent projects table below them, a vertical activity feed on the
          side, and a row of quick-action buttons at the bottom. Each region
          loads independently, so the page feels responsive even when some data
          sources are slow.
        </p>

        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">Typical workflow:</strong> You open
          the app, scan the stat cards for anomalies (a drop in downloads, a
          spike in active projects), check the activity feed for unexpected
          events, and use a quick-action button to jump to the relevant section
          for deeper investigation.
        </p>
      </section>

      <section id="what-the-dashboard-shows">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          What the Dashboard Shows
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Each region on the Dashboard answers a different question:
        </p>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Stat cards</strong> — &quot;How
              is the portfolio performing right now?&quot;
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Recent projects</strong> —
              &quot;What was I last working on?&quot;
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Activity feed</strong> —
              &quot;What changed since my last visit?&quot;
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Quick actions</strong> —
              &quot;Where do I go next?&quot;
            </span>
          </li>
        </ul>
      </section>

      <section id="stat-cards">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Stat Cards
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Four animated stat cards sit at the top of the Dashboard. Each card
          displays a single numeric metric, a label, and a trend indicator
          showing whether the value has increased, decreased, or held steady
          compared to the previous measurement period.
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-[13px] text-white/40 border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left py-3 pr-4 text-white/50 font-medium">
                  Card
                </th>
                <th className="text-left py-3 pr-4 text-white/50 font-medium">
                  Metric
                </th>
                <th className="text-left py-3 pr-4 text-white/50 font-medium">
                  Update Frequency
                </th>
                <th className="text-left py-3 text-white/50 font-medium">
                  Data Source
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              <tr>
                <td className="py-3 pr-4 text-white/50">Projects</td>
                <td className="py-3 pr-4">
                  Total count with active vs. archived breakdown
                </td>
                <td className="py-3 pr-4">On project CRUD events</td>
                <td className="py-3">Projects API</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-white/50">Downloads</td>
                <td className="py-3 pr-4">
                  Cumulative download count across all releases
                </td>
                <td className="py-3 pr-4">Real-time stream</td>
                <td className="py-3">Analytics service</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-white/50">Active</td>
                <td className="py-3 pr-4">
                  Number of in-progress projects
                </td>
                <td className="py-3 pr-4">On project status changes</td>
                <td className="py-3">Projects API</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-white/50">Uptime</td>
                <td className="py-3 pr-4">
                  Application uptime over the last 30 days
                </td>
                <td className="py-3 pr-4">Daily refresh</td>
                <td className="py-3">Health check endpoint</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Each card animates on load using Framer Motion with a staggered delay.
          The trend arrow uses a three-state system: green upward arrow for
          increase, red downward arrow for decrease, and a neutral dash for no
          change.
        </p>

        <Callout type="note" title="Trend Comparison">
          The trend comparison period depends on the metric. Downloads compare
          this week to last week. Projects compare this month to last month.
          Uptime compares the current 30-day window to the previous one.
        </Callout>
      </section>

      <section id="recent-projects">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Recent Projects Table
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Below the stat cards, a compact table displays the five most recently
          updated projects. Each row contains:
        </p>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Project name</strong> — A link
              to the full project detail page.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Status badge</strong> —
              Color-coded: green for Active, blue for Published, gray for
              Archived.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Last updated</strong> — Relative
              timestamp (e.g., &quot;2 hours ago&quot;). Hover to see the exact
              date and time.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Tech stack</strong> — Up to
              three compact tags. Overflow is hidden; the full list is visible on
              the project detail page.
            </span>
          </li>
        </ul>
        <p className="text-[14px] text-white/40 leading-relaxed mt-4">
          If no projects exist yet, the table displays an empty state with a
          link to the Projects page.
        </p>
      </section>

      <section id="activity-feed">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Activity Feed
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The activity feed is a chronological list of events across the
          portfolio. It appears in a scrollable panel and includes:
        </p>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>Project creation, updates, and status transitions.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>Release uploads and version publications.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>Documentation page additions and edits.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>System events: deployments, maintenance windows, and error alerts.</span>
          </li>
        </ul>
        <p className="text-[14px] text-white/40 leading-relaxed mt-4">
          Each event shows a timestamp, a type-specific icon, and a short
          description. New events animate into the top of the feed. The feed
          loads the 20 most recent events on initial render and lazy-loads older
          entries as you scroll down.
        </p>

        <Callout type="warning" title="Event Retention">
          The activity feed retains events for 90 days. Events older than 90
          days are removed from the feed. If you need a historical record,
          export the data before it expires.
        </Callout>
      </section>

      <section id="quick-actions">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Quick Actions
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Four buttons at the bottom of the Dashboard provide direct navigation
          to the main sections of the app:
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-[13px] text-white/40 border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left py-3 pr-4 text-white/50 font-medium">
                  Button
                </th>
                <th className="text-left py-3 text-white/50 font-medium">
                  Destination
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              <tr>
                <td className="py-3 pr-4 text-white/50">View All Projects</td>
                <td className="py-3">
                  <InlineCode>/docs/application/projects</InlineCode> — full
                  project listing with filters
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-white/50">Browse Downloads</td>
                <td className="py-3">
                  <InlineCode>/docs/application/downloads</InlineCode> —
                  available releases and install options
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-white/50">Read Documentation</td>
                <td className="py-3">
                  <InlineCode>/docs/application/documentation</InlineCode> —
                  built-in docs viewer
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-white/50">Open Settings</td>
                <td className="py-3">
                  <InlineCode>/docs/application/settings</InlineCode> —
                  appearance, notifications, and security
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-[14px] text-white/40 leading-relaxed">
          These buttons are always visible regardless of scroll position. They
          use Next.js{" "}
          <InlineCode>Link</InlineCode> for client-side navigation, so
          transitions are fast without a full page reload.
        </p>
      </section>

      <section id="data-freshness">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Data Freshness
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The Dashboard does not poll on a fixed interval. Instead, it reacts to
          data changes through two mechanisms:
        </p>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Event-driven updates</strong> —
              When a project or release changes elsewhere in the app, the
              Dashboard receives the update and re-renders the affected
              component.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Focus-based refresh</strong> —
              When the browser tab regains focus, the Dashboard re-fetches all
              stat cards to catch any changes that occurred while the tab was
              backgrounded.
            </span>
          </li>
        </ul>

        <Callout type="tip" title="Force Refresh">
          To force a complete data refresh, press{" "}
          <InlineCode>Cmd+R</InlineCode> (macOS) or{" "}
          <InlineCode>Ctrl+R</InlineCode> (Windows/Linux). This triggers a
          full page reload, clearing the React component tree and re-fetching
          all data sources.
        </Callout>
      </section>

      <section id="best-practices">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Best Practices
        </h2>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Check the stat cards first when opening the app. They provide a
              quick health check before you dive into specific sections.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Monitor the activity feed for unexpected events — a failed
              deployment or an unintended status change on a project.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              If the uptime card shows a value below 99%, check the
              troubleshooting guide for root-cause analysis.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              Use quick-action buttons instead of the sidebar for faster
              navigation — they skip the sidebar expansion step.
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
              The Dashboard does not support custom widget arrangement. The
              layout is fixed and cannot be rearranged or hidden.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              The activity feed caps at 20 visible events per load. Older
              events require scrolling to trigger lazy loading, which may not
              work reliably on older browsers.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              Stat card trends are based on fixed comparison periods (weekly or
              monthly). There is no way to set a custom comparison window.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              When offline, the Dashboard shows cached data from the last
              successful fetch. Stale data is not distinguished from fresh data
              in the UI.
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
              <strong className="text-white/60">Assuming real-time data when
              offline</strong> — The Dashboard does not indicate when data is
              stale. If you opened the app and then lost connectivity, the
              metrics shown may be hours or days old.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Ignoring the uptime card</strong>{" "}
              — A low uptime value is easy to miss among the other cards. Check
              it specifically if you are diagnosing availability issues.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Using the Dashboard as a
              project browser</strong> — The recent projects table shows only 5
              entries. For a complete listing, use the Projects page via the
              quick-action button.
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
            href="/docs/application/projects"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">
              Projects
            </p>
            <p className="text-[13px] text-white/30">
              Full project listing with filters, cards, and progress tracking.
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
              Release browsing, platform selection, and file verification.
            </p>
          </Link>
          <Link
            href="/docs/application/settings"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">
              Settings
            </p>
            <p className="text-[13px] text-white/30">
              Appearance, notification, and security configuration.
            </p>
          </Link>
          <Link
            href="/docs/features/updates"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">
              Updates
            </p>
            <p className="text-[13px] text-white/30">
              How automatic updates and version detection work.
            </p>
          </Link>
        </div>
      </section>
    </DocPage>
  );
}
