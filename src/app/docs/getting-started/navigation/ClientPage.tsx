"use client";

import Link from "next/link";
import { DocPage, Callout, InlineCode } from "@/components/docs/DocLayout";

const shortcutGroups = [
  {
    title: "Navigation",
    shortcuts: [
      { keys: ["↑", "↓"], description: "Navigate between items in lists, search results, and sidebar links" },
      { keys: ["←", "→"], description: "Navigate to the previous or next documentation page" },
      { keys: ["Tab"], description: "Move focus to the next interactive element (buttons, links, inputs)" },
      { keys: ["Shift", "Tab"], description: "Move focus to the previous interactive element" },
    ],
  },
  {
    title: "Search",
    shortcuts: [
      { keys: ["⌘", "K"], description: "Open the global search dialog (macOS)" },
      { keys: ["Ctrl", "K"], description: "Open the global search dialog (Windows/Linux)" },
      { keys: ["Esc"], description: "Close search dialog or dismiss any open overlay" },
      { keys: ["Enter"], description: "Navigate to the selected search result" },
    ],
  },
  {
    title: "General",
    shortcuts: [
      { keys: ["⌘", "R"], description: "Refresh the current page (macOS)" },
      { keys: ["F5"], description: "Refresh the current page (Windows/Linux)" },
      { keys: ["⌘", "Shift", "R"], description: "Hard refresh, bypassing cache (macOS)" },
      { keys: ["Ctrl", "F5"], description: "Hard refresh, bypassing cache (Windows/Linux)" },
    ],
  },
];

const mobileGestures = [
  {
    gesture: "Tap hamburger menu",
    action: "Opens the sidebar navigation overlay from the left edge",
    when: "Any page, top-left corner",
  },
  {
    gesture: "Tap search icon",
    action: "Opens the full-screen search dialog",
    when: "Any page, header area",
  },
  {
    gesture: "Tap outside sidebar",
    action: "Closes the sidebar overlay",
    when: "When sidebar is open",
  },
  {
    gesture: "Pull down",
    action: "Refreshes the current page content",
    when: "At the top of any page",
  },
  {
    gesture: "Swipe back",
    action: "Navigates to the previous page in history",
    when: "Supported on iOS Safari and some Android browsers",
  },
];

const urlExamples = [
  { path: "/", page: "Home / Landing page" },
  { path: "/projects", page: "Projects overview — all projects listed" },
  { path: "/downloads", page: "Downloads center — apps and resources" },
  { path: "/docs", page: "Documentation hub — all doc sections" },
  { path: "/docs/getting-started/introduction", page: "Introduction guide (this page)" },
  { path: "/docs/features/offline", page: "Offline experience documentation" },
  { path: "/docs/architecture/technology-stack", page: "Technology stack breakdown" },
];

export default function ClientPage() {
  return (
    <DocPage
      title="Navigation"
      description="How to move through the Portfolio App — sidebar, keyboard shortcuts, URLs, breadcrumbs, search, and mobile gestures."
      toc={[
        { id: "sidebar-navigation", label: "Sidebar Navigation" },
        { id: "keyboard-shortcuts", label: "Keyboard Shortcuts" },
        { id: "url-based-navigation", label: "URL-Based Navigation" },
        { id: "breadcrumbs", label: "Breadcrumbs" },
        { id: "search", label: "Search" },
        { id: "mobile-navigation", label: "Mobile Navigation" },
        { id: "best-practices", label: "Best Practices" },
        { id: "limitations", label: "Limitations" },
        { id: "common-mistakes", label: "Common Mistakes" },
        { id: "related", label: "Related" },
      ]}
      section="Getting Started"
    >
      <section id="sidebar-navigation">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">Sidebar Navigation</h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The sidebar is the primary navigation interface, located on the left side
          of the screen on desktop (below 1024px, it collapses to a hamburger menu).
          It organizes all sections into collapsible groups:
        </p>
        <ul className="space-y-3 mb-4">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <div>
              <strong className="text-white/50 text-[14px]">Home</strong>
              <p className="text-[14px] text-white/40 leading-relaxed mt-0.5">
                The landing page with a summary of the portfolio, featured projects,
                and quick links to key sections.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <div>
              <strong className="text-white/50 text-[14px]">Projects</strong>
              <p className="text-[14px] text-white/40 leading-relaxed mt-0.5">
                A detailed showcase of engineering projects, each with descriptions,
                technology stacks, and links to live demos or repositories.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <div>
              <strong className="text-white/50 text-[14px]">Downloads</strong>
              <p className="text-[14px] text-white/40 leading-relaxed mt-0.5">
                Software distribution — download applications, tools, and resources.
                Includes the PWA install button.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <div>
              <strong className="text-white/50 text-[14px]">Documentation</strong>
              <p className="text-[14px] text-white/40 leading-relaxed mt-0.5">
                The knowledge base you are reading now — guides covering installation,
                features, architecture, and development.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <div>
              <strong className="text-white/50 text-[14px]">Settings</strong>
              <p className="text-[14px] text-white/40 leading-relaxed mt-0.5">
                Application preferences: theme selection, notification settings, data
                management, and PWA status.
              </p>
            </div>
          </li>
        </ul>
        <Callout type="tip" title="Collapsible Groups">
          Click any section header in the sidebar to expand or collapse it. Collapsed
          sections are remembered across sessions using local storage. This keeps the
          navigation compact and focused on the sections you use most.
        </Callout>
      </section>

      <section id="keyboard-shortcuts">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">Keyboard Shortcuts</h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-6">
          Keyboard shortcuts work when the app is installed as a PWA or open in a
          browser tab. Shortcuts are disabled when a text input is focused to avoid
          intercepting normal typing.
        </p>
        {shortcutGroups.map((group) => (
          <div key={group.title} className="mb-6">
            <h3 className="text-base font-medium text-white/60 mb-3 mt-0">{group.title}</h3>
            <div className="space-y-2">
              {group.shortcuts.map((shortcut) => (
                <div
                  key={shortcut.keys.join("+")}
                  className="flex items-center justify-between rounded-lg border border-white/[0.04] bg-white/[0.01] px-4 py-2.5"
                >
                  <span className="text-[14px] text-white/40">{shortcut.description}</span>
                  <div className="flex items-center gap-1.5">
                    {shortcut.keys.map((key) => (
                      <span
                        key={key}
                        className="inline-flex items-center justify-center min-w-[24px] h-6 px-1.5 rounded border border-white/[0.08] bg-white/[0.03] text-[10px] font-mono text-white/40"
                      >
                        {key}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <Callout type="info" title="The Most Useful Shortcut">
          <InlineCode>⌘K</InlineCode> / <InlineCode>Ctrl+K</InlineCode> opens the
          search dialog from anywhere in the app. This is the fastest way to navigate
          — type a few characters and press Enter to jump directly to any page.
        </Callout>
      </section>

      <section id="url-based-navigation">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">URL-Based Navigation</h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Every page has a unique, human-readable URL. You can navigate directly by
          typing addresses into the browser bar or sharing links. The URL structure
          follows a hierarchical pattern:
        </p>
        <div className="space-y-2 mb-4">
          {urlExamples.map((route) => (
            <div
              key={route.path}
              className="flex items-center gap-3 rounded-lg px-4 py-2 border border-white/[0.03] bg-white/[0.01]"
            >
              <span className="font-mono text-[12px] text-white/30 bg-white/[0.04] rounded px-1.5 py-0.5 shrink-0">
                {route.path}
              </span>
              <span className="text-[13px] text-white/40">{route.page}</span>
            </div>
          ))}
        </div>
        <p className="text-[14px] text-white/40 leading-relaxed">
          The pattern is <InlineCode>/section/subsection/page</InlineCode>. For
          example, <InlineCode>/docs/features/offline</InlineCode> breaks down as
          Documentation → Features → Offline. This makes URLs predictable and
          bookmarkable.
        </p>
      </section>

      <section id="breadcrumbs">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">Breadcrumbs</h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Every documentation page displays a breadcrumb trail at the top, showing
          your current position in the information hierarchy:
        </p>
        <div className="flex items-center gap-1.5 text-[12px] text-white/20 mb-4 px-4 py-3 rounded-lg border border-white/[0.04] bg-white/[0.01]">
          <span className="text-white/30">Docs</span>
          <span className="text-white/10">&gt;</span>
          <span className="text-white/30">Getting Started</span>
          <span className="text-white/10">&gt;</span>
          <span className="text-white/50">Navigation</span>
        </div>
        <ul className="space-y-2 mb-4">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span className="text-[14px] text-white/40 leading-relaxed">
              Each segment is a clickable link that navigates to the parent page.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span className="text-[14px] text-white/40 leading-relaxed">
              On mobile, the breadcrumb truncates to show only the current page
              title when horizontal space is limited.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span className="text-[14px] text-white/40 leading-relaxed">
              Non-documentation pages (Home, Projects, Downloads) do not display
              breadcrumbs.
            </span>
          </li>
        </ul>
      </section>

      <section id="search">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">Search</h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The global search provides instant access to all pages, projects, and
          documentation. Two ways to open it:
        </p>
        <ul className="space-y-2 mb-4">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span className="text-[14px] text-white/40 leading-relaxed">
              Press <InlineCode>⌘K</InlineCode> (macOS) or{" "}
              <InlineCode>Ctrl+K</InlineCode> (Windows/Linux) from anywhere.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span className="text-[14px] text-white/40 leading-relaxed">
              Click the search icon or search bar in the header.
            </span>
          </li>
        </ul>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The search dialog provides:
        </p>
        <ul className="space-y-2 mb-4">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span className="text-[14px] text-white/40 leading-relaxed">
              <strong className="text-white/50">Fuzzy matching</strong> — results
              appear even if your query contains typos or partial words.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span className="text-[14px] text-white/40 leading-relaxed">
              <strong className="text-white/50">Keyboard navigation</strong> — use
              arrow keys to move between results, Enter to navigate, Esc to close.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span className="text-[14px] text-white/40 leading-relaxed">
              <strong className="text-white/50">Section grouping</strong> — results
              are organized by category (Pages, Documentation, Projects) with section
              headers.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span className="text-[14px] text-white/40 leading-relaxed">
              <strong className="text-white/50">Instant results</strong> — search
              indexes are pre-built and stored locally. No network request is needed
              for search queries.
            </span>
          </li>
        </ul>
      </section>

      <section id="mobile-navigation">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">Mobile Navigation</h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          On mobile devices (below 1024px), the sidebar is replaced by a hamburger
          menu to maximize content space. The mobile navigation provides:
        </p>
        <div className="space-y-3 mb-6">
          {mobileGestures.map((item) => (
            <div
              key={item.gesture}
              className="rounded-lg border border-white/[0.04] bg-white/[0.01] px-4 py-3"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[14px] text-white/50 font-medium">{item.gesture}</span>
                <span className="text-[12px] text-white/20">{item.when}</span>
              </div>
              <p className="text-[14px] text-white/40 leading-relaxed">{item.action}</p>
            </div>
          ))}
        </div>
        <Callout type="tip" title="Install for the Best Mobile Experience">
          When installed as a PWA on mobile, the app opens in full-screen mode
          without the browser address bar. The sidebar slides in from the left and
          search opens as a full-screen overlay — the experience is designed for
          touch-first interaction.
        </Callout>
      </section>

      <section id="best-practices">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">Best Practices</h2>
        <ul className="space-y-3 mb-4">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <div>
              <strong className="text-white/50 text-[14px]">Use search for speed</strong>
              <p className="text-[14px] text-white/40 leading-relaxed mt-0.5">
                Press <InlineCode>⌘K</InlineCode> and type a few characters instead
                of scrolling through the sidebar. Search is the fastest navigation
                method for users who know what they are looking for.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <div>
              <strong className="text-white/50 text-[14px]">Bookmark deep links</strong>
              <p className="text-[14px] text-white/40 leading-relaxed mt-0.5">
                Every page has a unique URL. Bookmark specific documentation pages
                or project pages for direct access without navigating through the
                sidebar each time.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <div>
              <strong className="text-white/50 text-[14px]">Collapse unused sidebar sections</strong>
              <p className="text-[14px] text-white/40 leading-relaxed mt-0.5">
                If you only use certain sections, collapse the ones you don&apos;t
                need. The sidebar remembers your preferences across sessions.
              </p>
            </div>
          </li>
        </ul>
      </section>

      <section id="limitations">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">Limitations</h2>
        <ul className="space-y-3 mb-4">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <div>
              <strong className="text-white/50 text-[14px]">No deep linking to specific sections within a page</strong>
              <p className="text-[14px] text-white/40 leading-relaxed mt-0.5">
                Anchor links (e.g., <InlineCode>/docs/page#section</InlineCode>)
                are supported, but the table of contents observer may not scroll to
                the exact position on initial page load in all browsers.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <div>
              <strong className="text-white/50 text-[14px]">Search requires pre-cached content</strong>
              <p className="text-[14px] text-white/40 leading-relaxed mt-0.5">
                The search index is built from cached content. Pages not yet visited
                may not appear in search results when offline.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <div>
              <strong className="text-white/50 text-[14px]">Swipe gestures vary by browser</strong>
              <p className="text-[14px] text-white/40 leading-relaxed mt-0.5">
                Edge swipe to go back is supported natively by Safari on iOS and some
                Android browsers, but not all browsers support this gesture.
              </p>
            </div>
          </li>
        </ul>
      </section>

      <section id="common-mistakes">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">Common Mistakes</h2>
        <ul className="space-y-3 mb-4">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <div>
              <strong className="text-white/50 text-[14px]">Using browser back/forward instead of in-app navigation</strong>
              <p className="text-[14px] text-white/40 leading-relaxed mt-0.5">
                The app uses client-side routing. Browser back/forward buttons work
                but may behave differently than expected when navigating between
                documentation pages and main app pages.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <div>
              <strong className="text-white/50 text-[14px]">Expecting the sidebar on mobile</strong>
              <p className="text-[14px] text-white/40 leading-relaxed mt-0.5">
                Below 1024px, the sidebar is hidden behind the hamburger menu. If you
                are testing on a mobile device or narrow browser window, look for the
                menu icon in the top-left corner.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <div>
              <strong className="text-white/50 text-[14px]">Not using keyboard shortcuts</strong>
              <p className="text-[14px] text-white/40 leading-relaxed mt-0.5">
                Many users rely solely on mouse/touch navigation. Learning{" "}
                <InlineCode>⌘K</InlineCode> for search and arrow keys for list
                navigation significantly speeds up browsing.
              </p>
            </div>
          </li>
        </ul>
      </section>

      <section id="related">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Related
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/docs/getting-started/introduction"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Introduction</p>
            <p className="text-[13px] text-white/30">What the app is and why it was built as a PWA.</p>
          </Link>
          <Link
            href="/docs/getting-started/quick-start"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Quick Start</p>
            <p className="text-[13px] text-white/30">Get the app installed in under 2 minutes.</p>
          </Link>
          <Link
            href="/docs/features/accessibility"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Accessibility</p>
            <p className="text-[13px] text-white/30">Keyboard navigation and screen reader support details.</p>
          </Link>
          <Link
            href="/docs/application/search"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Search</p>
            <p className="text-[13px] text-white/30">Full-text search implementation and capabilities.</p>
          </Link>
        </div>
      </section>
    </DocPage>
  );
}
