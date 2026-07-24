"use client";

import Link from "next/link";
import { DocPage, Callout, CodeBlock, InlineCode } from "@/components/docs/DocLayout";
import { APP_VERSION, LAST_UPDATED } from "@/data/documentation";

const toc = [
  { id: "detection", label: "How Update Detection Works" },
  { id: "lifecycle", label: "Service Worker Update Lifecycle" },
  { id: "install-activate", label: "Install vs Activate Phases" },
  { id: "waiting-state", label: "The Waiting State and Client Claiming" },
  { id: "versioning", label: "Versioning and Cache Invalidation" },
  { id: "force-update", label: "Forcing an Update" },
  { id: "browser-behavior", label: "Browser-Specific Behavior" },
  { id: "best-practices", label: "Best Practices" },
  { id: "common-mistakes", label: "Common Mistakes" },
  { id: "limitations", label: "Limitations" },
];

export default function UpdatesClientPage() {
  return (
    <DocPage
      title="Updates"
      description="A detailed breakdown of how the service worker detects, installs, and activates updates — including the waiting state, client claiming, browser-specific quirks, and how to force an update when needed."
      toc={toc}
      section="Features"
    >
      <section id="detection">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          How Update Detection Works
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The browser checks for a service worker update every time the app is loaded. Unlike all other assets in the application (which are content-hashed and served from cache), the service worker file (<InlineCode>sw.js</InlineCode>) is fetched from the network on every page load. The browser performs a byte-for-byte comparison between the newly fetched file and the currently installed version. If they differ — even by a single character — a new service worker is downloaded and the update cycle begins.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          This detection happens silently in the background. The current service worker continues to serve all requests while the new one is being prepared. The user experiences no interruption, no prompt, and no delay. The update only takes effect when the new service worker has finished installing all its cached assets and all tabs controlling the old version are closed.
        </p>

        <CodeBlock
          code={`// Registration — triggers update check on every page load
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").then((reg) => {
    // Check for updates every time the page loads
    reg.update();

    // Listen for a new service worker being detected
    reg.addEventListener("updatefound", () => {
      const newWorker = reg.installing;
      newWorker?.addEventListener("statechange", () => {
        if (newWorker.state === "installed") {
          if (navigator.serviceWorker.controller) {
            // A new version is installed but not yet active
            // This is the "waiting" state
            console.log("New version available");
          } else {
            // First install — content is now cached
            console.log("App is ready for offline use");
          }
        }
      });
    });
  });
}`}
          language="javascript"
          filename="registration.js — update detection"
        />

        <Callout type="info" title="Why Not Check Periodically?">
          The spec-driven behavior of fetching <InlineCode>sw.js</InlineCode> from the network on every load is the update mechanism. There is no need for a polling interval or WebSocket connection. If the file hasn&apos;t changed, the browser&apos;s HTTP cache returns a 304 Not Modified response, and the check costs minimal bandwidth (typically under 1KB).
        </Callout>
      </section>

      <section id="lifecycle">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Service Worker Update Lifecycle
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The update lifecycle is a six-step process that ensures the old version continues serving content while the new version is fully prepared in the background. Each step has a specific purpose and failure mode:
        </p>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Complete Update Flow</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Step 1: Browser loads page
  └── Fetches sw.js from network (bypasses HTTP cache)
      └── Byte-compares against installed version
          └── If different → update found

Step 2: New service worker downloads
  └── Browser downloads the full new sw.js
      └── Fires "install" event on the new worker
          └── New worker calls cache.addAll(PRECACHE_MANIFEST)
              └── Fetches ALL assets in the manifest from network
                  └── If any fetch fails → install fails → retry next load

Step 3: Installation complete
  └── New worker enters "installed" state
      └── Browser waits (new worker is in "waiting" state)
          └── Old worker still controls all tabs and fetches

Step 4: All tabs for this origin are closed
  └── Old worker has no more clients
      └── Old worker is eligible for termination

Step 5: New worker fires "activate" event
  └── Iterates all cache keys
      └── Deletes caches that don't match current version prefix
          └── Calls self.clients.claim()
              └── New worker now controls all open tabs

Step 6: All subsequent requests served by new worker
  └── User is on the latest version
      └── New cache is populated and ready`}
            </code>
          </pre>
        </div>
      </section>

      <section id="install-activate">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Install vs Activate Phases
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The install and activate phases serve distinct purposes and handle different failure modes. Understanding the distinction is critical for debugging update issues:
        </p>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Phase Comparison</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Phase       Purpose                        Failure Handling
─────────────────────────────────────────────────────────────
Install     Precache all static assets     If any asset fails,
            for the new version            the entire install
                                           fails. Browser will
                                           retry on next page
                                           load.

Activate    Clean up old caches and        If cleanup fails,
            take control of clients        old caches persist
                                           but new worker still
                                           takes over. Orphaned
                                           caches waste storage
                                           but don't break
                                           functionality.`}
            </code>
          </pre>
        </div>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Install Phase in Detail
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          During install, the new service worker opens a cache store named with the current version prefix and fetches every URL in the precache manifest. This is an all-or-nothing operation — if even one URL fails to fetch (network error, 404, timeout), the entire install phase fails. The browser will retry the install on the next page load. This design ensures the new version&apos;s cache is always complete before it takes over.
        </p>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Activate Phase in Detail
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          During activate, the new service worker enumerates all cache keys and deletes any that don&apos;t match the current version prefix. It then calls <InlineCode>self.clients.claim()</InlineCode> to take control of all open tabs. Without <InlineCode>clients.claim()</InlineCode>, the new worker would only control tabs opened after activation — existing tabs would continue using the old worker until they are closed.
        </p>
      </section>

      <section id="waiting-state">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          The Waiting State and Client Claiming
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The waiting state is the most common source of confusion in service worker updates. When a new service worker finishes installing, it does not immediately take over. Instead, it waits for all tabs that are currently controlled by the old service worker to close. This is a browser-enforced behavior designed to prevent inconsistent state — you don&apos;t want one tab running version A&apos;s code while another tab runs version B&apos;s code.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          This means that if a user has 5 tabs open for this app, all 5 must be closed before the new version activates. Closing 4 tabs is not enough — the 5th tab still holds a reference to the old worker. Only when the last tab closes does the old worker terminate and the new worker&apos;s activate phase fire.
        </p>

        <CodeBlock
          code={`// The skipWaiting() call can bypass the waiting state,
// but this app intentionally does NOT call it during install.
// Reason: skipWaiting() causes the new worker to immediately
// take control, which can result in mixed-version requests
// within the same page load — old assets served by old cache,
// new assets not yet available.

// Instead, clients.claim() is called during activate:
self.addEventListener("activate", (event) => {
  event.waitUntil(
    self.clients.claim() // Takes control of ALL open tabs
  );
});

// This means:
// - Old tabs keep using old worker until they close
// - New tabs (opened after activation) use new worker immediately
// - When old tabs close, they trigger activation for the next update`}
          language="javascript"
          filename="sw.js — waiting and claiming"
        />
      </section>

      <section id="versioning">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Versioning and Cache Invalidation
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Each deployment uses a unique version identifier that is embedded in cache names. The current version is <InlineCode>{APP_VERSION}</InlineCode> (last updated <InlineCode>{LAST_UPDATED}</InlineCode>). When a new version deploys, its service worker references a new cache name, which means the old and new caches coexist during the update cycle.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The versioning strategy works as follows:
        </p>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span><strong className="text-white/60">Cache names include the version prefix.</strong> For example, <InlineCode>portfolio-v1.2.0-static</InlineCode> and <InlineCode>portfolio-v1.2.0-docs</InlineCode>. The new version creates <InlineCode>portfolio-v1.3.0-*</InlineCode> caches.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span><strong className="text-white/60">Old caches are deleted during activate.</strong> The new service worker iterates all cache keys and removes any that don&apos;t match its version prefix. This prevents storage waste from orphaned caches.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span><strong className="text-white/60">Content-hashed assets are inherently versioned.</strong> JavaScript and CSS files have hashes in their filenames (<InlineCode>main.a3f8c1.js</InlineCode>). These naturally expire when the old version&apos;s cache is deleted, and the new version&apos;s cache contains the new filenames.</span>
          </li>
        </ul>

        <Callout type="warning" title="Cache Name Collision">
          If two deployments accidentally use the same version number, the new service worker will overwrite the old cache entries during install. This can cause partial caches if the asset manifest differs between versions. Version numbers must be unique per deployment.
        </Callout>
      </section>

      <section id="force-update">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Forcing an Update
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Although updates happen automatically, there are situations where you want to force an update — typically during development or when debugging a caching issue. Here are the available methods, ordered from least to most disruptive:
        </p>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Force Update Methods</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Method                    What It Does                   Persistence
─────────────────────────────────────────────────────────────────────
Hard refresh              Bypasses HTTP cache for this    Low — old SW
(Ctrl+Shift+R)            page load, triggers SW check    still controls

Close all tabs +          Old SW terminates, new SW      High — new
reopen                    activates on next load          SW takes over

DevTools: uncheck         Forces SW to re-register on    Dev only —
"Update on reload"        every reload                    resets on close

DevTools: "Unregister"    Removes the SW entirely.        High — fresh
SW + reload               Next visit re-registers         registration

Clear site data           Removes all caches, localStorage Full reset —
(Browser Settings)        and SW registration             like first visit`}
            </code>
          </pre>
        </div>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Developer Workflow
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          During development, Chrome DevTools provides the most control. Open the Application tab, navigate to Service Workers, and check &quot;Update on reload.&quot; This forces the service worker to re-register on every page reload, ensuring you always see the latest version. For production debugging, the &quot;Unregister&quot; button followed by a page reload is the cleanest approach — it removes the old worker entirely and starts fresh.
        </p>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          User-Facing Workflow
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          End users cannot access DevTools. The most reliable way for a user to force an update is to close all tabs for this app and reopen it. On mobile, this means closing the app from the recent apps list (not just minimizing it) and then reopening it. The new service worker will activate on the next page load.
        </p>
      </section>

      <section id="browser-behavior">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Browser-Specific Behavior
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Service worker update behavior varies across browsers in ways that affect when and how updates activate:
        </p>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Browser Differences</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Behavior                Chrome/Edge     Firefox         Safari
────────────────────────────────────────────────────────────
SW update check         Every load      Every load      Every load
on page load

Byte comparison         Yes             Yes             Yes

SW lifecycle            Standard        Standard        Limited
(activate timing)                                       on iOS

Update on background    Yes (after ~24   Yes (after      Limited
tab                     hours idle)     ~48 hours)      (standalone)

Service worker          Per-origin      Per-origin      Per-origin
persistence             (persistent)    (persistent)    (can be
                                                        evicted)

DevTools "Update on     Yes             Yes             No
reload" support`}
            </code>
          </pre>
        </div>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          iOS Safari Specifics
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          iOS Safari has the most restrictive update behavior. In standalone mode (PWA installed to home screen), the service worker functions similarly to Chrome. In browser-tab mode, the service worker may be evicted by the system under memory pressure, which can delay or prevent updates. Apple&apos;s WebKit team has been gradually improving PWA support, but iOS remains the platform with the most caveats.
        </p>

        <Callout type="warning" title="Safari Private Browsing">
          Safari in private browsing mode does not persist service workers across sessions. The service worker is registered during the session but is removed when the private window closes. Updates are effectively ignored in this context.
        </Callout>
      </section>

      <section id="best-practices">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Best Practices
        </h2>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Close and reopen the app after a deployment.</strong> The simplest way to ensure you are running the latest version. On desktop, close all tabs for this origin. On mobile, close the app from the recent apps list and reopen it.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Check the version in Settings.</strong> The app displays the current version number in the settings page. If you suspect you are running an old version, compare the displayed version against the latest release.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span><strong className="text-white/60">Do not leave tabs open indefinitely.</strong> A tab that has been open for weeks without being refreshed will continue running the old service worker. This delays update activation. Closing stale tabs is the simplest way to avoid this.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Use DevTools during development.</strong> Enable &quot;Update on reload&quot; in the Application tab during development to ensure you always see the latest code. Disable it before testing offline behavior.</span>
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
            <span><strong className="text-white/60">Assuming a hard refresh updates the service worker.</strong> A hard refresh (Ctrl+Shift+R) bypasses the HTTP cache and reloads the page, but it does not necessarily replace the active service worker. The old worker may still control the page. Close all tabs instead.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span><strong className="text-white/60">Expecting instant updates across all devices.</strong> The update only activates when all tabs for the origin are closed. If the app is installed as a PWA on a phone, the service worker may persist even after the app is minimized (not fully closed). Force-close the app from the recent apps list.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span><strong className="text-white/60">Confusing HTTP cache with service worker cache.</strong> The browser HTTP cache and the service worker Cache API are separate systems. Clearing the HTTP cache (via DevTools network tab) does not affect the service worker cache. The service worker intercepts requests before they reach the HTTP cache.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span><strong className="text-white/60">Not testing updates on iOS Safari.</strong> The update behavior on iOS Safari differs from Chrome. If you only test on Chrome, you may miss update issues that affect iOS users. Test the full update lifecycle on Safari at least once before major releases.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span><strong className="text-white/60">Leaving &quot;Update on reload&quot; enabled in DevTools.</strong> This forces the service worker to re-register on every reload, which prevents you from testing the real update flow. Disable it when you want to test how the update behaves for actual users.</span>
          </li>
        </ul>
      </section>

      <section id="limitations">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Limitations
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The update system has these constraints:
        </p>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Update Limitations</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Limitation                     Impact
────────────────────────────────────────────────────────────
No push notification for       Users are not informed that
updates                        an update is available. They
                               must close and reopen to get
                               it.

Update waits for ALL tabs      A single persistent tab blocks
to close                       the update for all other tabs
                               on the same origin.

No update progress indicator   There is no UI showing download
                               progress or update status.
                               The transition is invisible.

Install phase can fail         If precache manifest URLs are
silently                       unreachable, the new SW enters
                               "waiting" but never activates.
                               Browser retries on next load.

iOS Safari can evict the       On iOS, the service worker may
service worker                 be removed by the OS under
                               memory pressure, resetting
                               the update cycle.`}
            </code>
          </pre>
        </div>
      </section>

      <section id="related">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Related
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/docs/features/offline"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Offline Experience</p>
            <p className="text-[13px] text-white/30">How caching strategies interact with the update lifecycle.</p>
          </Link>
          <Link
            href="/docs/architecture/service-worker"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Service Worker Architecture</p>
            <p className="text-[13px] text-white/30">Registration, lifecycle events, and fetch interception.</p>
          </Link>
          <Link
            href="/docs/reference/changelog"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Changelog</p>
            <p className="text-[13px] text-white/30">Version history and what changed in each release.</p>
          </Link>
          <Link
            href="/docs/reference/platform-support"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Platform Support</p>
            <p className="text-[13px] text-white/30">Browser and device support for service worker features.</p>
          </Link>
        </div>
      </section>
    </DocPage>
  );
}
