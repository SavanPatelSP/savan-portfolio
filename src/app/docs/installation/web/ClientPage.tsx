"use client";

import Link from "next/link";
import {
  DocPage,
  Callout,
  InlineCode,
} from "@/components/docs/DocLayout";

const toc = [
  { id: "direct-browser-access", label: "Direct Browser Access" },
  { id: "what-happens-in-the-background", label: "What Happens in the Background" },
  { id: "browser-requirements", label: "Browser Requirements" },
  { id: "no-installation-needed", label: "No Installation Needed" },
  { id: "limitations", label: "Limitations vs Installed App" },
  { id: "when-to-use-web", label: "When to Use Web vs Installed" },
  { id: "common-mistakes", label: "Common Mistakes" },
  { id: "best-practices", label: "Best Practices" },
  { id: "related", label: "Related" },
];

export default function ClientPage() {
  return (
    <DocPage
      title="Web"
      description="Use the Portfolio App directly in your browser without installing anything."
      toc={toc}
      section="Installation"
    >
      {/* ── Direct Browser Access ───────────────────────── */}
      <section id="direct-browser-access">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          Direct Browser Access
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The fastest way to use the Portfolio App is to open it directly in
          your browser. No downloads, no setup, no permissions required.
        </p>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>Navigate to <InlineCode>savan.sp-net.in</InlineCode> in your browser.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>The app loads immediately with all features available.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>Bookmark the page for quick access in the future.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>Works identically on desktop and mobile browsers.</span>
          </li>
        </ul>

        <Callout type="info" title="Full Application">
          The web version is the full application. Every feature available in the
          installed version is also available in the browser. The only
          differences relate to offline access, window behavior, and how
          updates are delivered.
        </Callout>
      </section>

      {/* ── What Happens in the Background ──────────────── */}
      <section id="what-happens-in-the-background">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          What Happens in the Background
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Even when you use the app in a browser tab without installing it,
          several PWA technologies are still active behind the scenes:
        </p>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Service Worker Registers</strong> — The
              service worker installs on your first visit and begins caching
              static assets (JS, CSS, images). This happens whether or not you
              install the app.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Assets Are Cached</strong> — After the
              first visit, subsequent page loads use cached assets for faster
              rendering. The browser still makes network requests for dynamic
              content, but static resources load from disk.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Update Checks Run</strong> — The service
              worker periodically checks for new versions. If an update is
              found, the next page load will use the updated files.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Offline Fallback Available</strong> — If
              you lose connectivity after the first visit, the service worker
              can serve cached pages. However, this only works for previously
              visited routes.
            </span>
          </li>
        </ul>

        <Callout type="note" title="Caching vs Offline">
          Caching in a browser tab does not guarantee full offline access. The
          service worker caches assets for performance, but the offline fallback
          only serves pages you have already visited. For guaranteed offline
          access, install the app as a PWA.
        </Callout>
      </section>

      {/* ── Browser Requirements ────────────────────────── */}
      <section id="browser-requirements">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Browser Requirements
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The web version works in any modern browser with JavaScript enabled.
          For the best experience, use one of the following:
        </p>

        <div className="overflow-x-auto my-6 rounded-xl border border-white/[0.06]">
          <table className="w-full text-[13px] text-white/40 border-collapse">
            <thead>
              <tr className="bg-white/[0.02]">
                <th className="text-left py-3 px-4 text-white/50 font-medium">
                  Browser
                </th>
                <th className="text-left py-3 px-4 text-white/50 font-medium">
                  Minimum Version
                </th>
                <th className="text-left py-3 px-4 text-white/50 font-medium">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              <tr>
                <td className="py-3 px-4 text-white/50">Chrome</td>
                <td className="py-3 px-4">90+</td>
                <td className="py-3 px-4">Recommended for full feature set</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-white/50">Edge</td>
                <td className="py-3 px-4">90+</td>
                <td className="py-3 px-4">Chromium-based, same engine as Chrome</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-white/50">Safari</td>
                <td className="py-3 px-4">16.0+</td>
                <td className="py-3 px-4">Web version fully supported</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-white/50">Firefox</td>
                <td className="py-3 px-4">110+</td>
                <td className="py-3 px-4">Web version fully supported</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-white/50">Samsung Internet</td>
                <td className="py-3 px-4">15+</td>
                <td className="py-3 px-4">Full support on Android</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── No Installation Needed ──────────────────────── */}
      <section id="no-installation-needed">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          No Installation Needed
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Unlike the PWA or native app workflow, the web version requires
          nothing from your device beyond a browser:
        </p>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>No app store account required</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>No storage space consumed beyond browser cache</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>No permissions to grant</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>No home screen icon to manage</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>No updates to apply — always the latest version</span>
          </li>
        </ul>
        <p className="text-[14px] text-white/40 leading-relaxed mt-4">
          Visit the URL and the app is ready. Each page load fetches the latest
          version from the server automatically.
        </p>
      </section>

      {/* ── Limitations ─────────────────────────────────── */}
      <section id="limitations">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Limitations vs Installed App
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The web version is functionally identical to the installed version but
          has behavioral differences tied to running inside a browser tab:
        </p>

        <div className="overflow-x-auto my-6 rounded-xl border border-white/[0.06]">
          <table className="w-full text-[13px] text-white/40 border-collapse">
            <thead>
              <tr className="bg-white/[0.02]">
                <th className="text-left py-3 px-4 text-white/50 font-medium">
                  Feature
                </th>
                <th className="text-left py-3 px-4 text-white/50 font-medium">
                  Web (Browser)
                </th>
                <th className="text-left py-3 px-4 text-white/50 font-medium">
                  Installed (PWA)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              <tr>
                <td className="py-3 px-4 text-white/50">Offline access</td>
                <td className="py-3 px-4 text-red-400/70">No</td>
                <td className="py-3 px-4 text-emerald-400/70">Yes</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-white/50">Dedicated window</td>
                <td className="py-3 px-4 text-red-400/70">No</td>
                <td className="py-3 px-4 text-emerald-400/70">Yes</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-white/50">Home screen icon</td>
                <td className="py-3 px-4 text-red-400/70">No</td>
                <td className="py-3 px-4 text-emerald-400/70">Yes</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-white/50">Background updates</td>
                <td className="py-3 px-4 text-red-400/70">No</td>
                <td className="py-3 px-4 text-emerald-400/70">Yes</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-white/50">All app features</td>
                <td className="py-3 px-4 text-emerald-400/70">Yes</td>
                <td className="py-3 px-4 text-emerald-400/70">Yes</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-white/50">Fastest load time</td>
                <td className="py-3 px-4 text-amber-400/70">After first visit</td>
                <td className="py-3 px-4 text-emerald-400/70">Always cached</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-white/50">Works without internet</td>
                <td className="py-3 px-4 text-red-400/70">No</td>
                <td className="py-3 px-4 text-emerald-400/70">Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── When to Use Web ─────────────────────────────── */}
      <section id="when-to-use-web">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          When to Use Web vs Installed
        </h2>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Choose the web version when:
        </h3>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>You are on a shared or public computer where installing software is restricted or discouraged</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>You want to check one specific thing quickly without managing another app</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>You are on iOS and prefer the browser experience over the limited PWA capabilities</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>You are testing the app for the first time and want to evaluate before installing</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>You want the absolute latest version immediately without waiting for the service worker update cycle</span>
          </li>
        </ul>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Choose the installed version when:
        </h3>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>You use the app daily and want one-tap launch from your home screen or desktop</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>You work in low-connectivity environments and need offline access</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>You prefer a dedicated window without browser tabs, bookmarks bar, or URL field</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>You want the fastest possible load times from locally cached assets</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>You want the app icon alongside your other applications for a consistent workflow</span>
          </li>
        </ul>

        <Callout type="tip" title="Start with Web">
          The web version is a good way to try the app before installing. If you
          find yourself using it regularly, consider installing it as a PWA for
          a more integrated experience.
        </Callout>
      </section>

      {/* ── Common Mistakes ─────────────────────────────── */}
      <section id="common-mistakes">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Common Mistakes
        </h2>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Assuming offline works in a browser tab</strong> — The web version
              requires an active internet connection. The service worker caches
              assets for speed, but it does not serve full pages offline unless
              the app is installed as a PWA.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Using the wrong URL</strong> — The app is hosted at{" "}
              <InlineCode>savan.sp-net.in</InlineCode>. Typing variations like{" "}
              <InlineCode>www.savan.sp-net.in</InlineCode> or misspelling the
              domain will result in a DNS error.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Confusing &quot;Add to Home Screen&quot; with installing</strong> — On
              Android Chrome, &quot;Add to Home Screen&quot; and &quot;Install
              App&quot; are different. The former creates a shortcut; the latter
              installs the PWA with offline support.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Not bookmarking the URL</strong> — If you use the web version regularly
              without bookmarking, you will have to search for the URL each time
              or type it manually.
            </span>
          </li>
        </ul>
      </section>

      {/* ── Best Practices ──────────────────────────────── */}
      <section id="best-practices">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Best Practices
        </h2>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Bookmark the URL</strong> — Save{" "}
              <InlineCode>savan.sp-net.in</InlineCode> to your bookmarks bar or
              favorites for instant access without typing.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Use keyboard shortcuts</strong> — Press{" "}
              <InlineCode>Cmd/Ctrl + K</InlineCode> to open the in-app search
              and navigate between sections quickly.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Pin the tab</strong> — In Chrome or Edge, right-click the tab and
              select &quot;Pin&quot; to keep it accessible and reduce accidental
              closure.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Keep the browser updated</strong> — Newer browser versions include
              performance improvements and security patches that affect how the
              app loads and caches content.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Clear cache if something looks wrong</strong> — If the app appears
              broken or outdated, clear the browser cache for{" "}
              <InlineCode>savan.sp-net.in</InlineCode> and reload. Stale cached
              assets are the most common cause of display issues.
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
            href="/docs/installation/overview"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Installation Overview</p>
            <p className="text-[13px] text-white/30">All installation methods and platform comparison.</p>
          </Link>
          <Link
            href="/docs/installation/pwa"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">PWA Installation</p>
            <p className="text-[13px] text-white/30">Install as a progressive web app for offline access.</p>
          </Link>
          <Link
            href="/docs/features/performance"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Performance</p>
            <p className="text-[13px] text-white/30">Load times and optimization strategies.</p>
          </Link>
          <Link
            href="/docs/reference/platform-support"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Platform Support</p>
            <p className="text-[13px] text-white/30">Browser compatibility and feature matrix.</p>
          </Link>
        </div>
      </section>
    </DocPage>
  );
}
