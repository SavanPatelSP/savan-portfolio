"use client";

import Link from "next/link";
import { DocPage, Callout, CodeBlock, InlineCode } from "@/components/docs/DocLayout";
import { APP_VERSION, LAST_UPDATED } from "@/data/docs";

const toc = [
  { id: "how-it-works", label: "How the Service Worker Caches Assets" },
  { id: "cache-strategies", label: "Caching Strategies by Asset Type" },
  { id: "install-activate", label: "Install and Activate Lifecycle" },
  { id: "what-is-cached", label: "What Is Cached" },
  { id: "what-is-not-cached", label: "What Is Not Cached" },
  { id: "offline-fallback", label: "Offline Fallback Page" },
  { id: "stale-content", label: "Handling Stale Content" },
  { id: "storage-limits", label: "Cache Storage Limits" },
  { id: "best-practices", label: "Best Practices" },
  { id: "common-mistakes", label: "Common Mistakes" },
  { id: "limitations", label: "Limitations" },
];

export default function OfflineClientPage() {
  return (
    <DocPage
      title="Offline Experience"
      description="How the Portfolio App delivers a functional offline experience through service worker caching, asset precaching, and fallback strategies — with detailed coverage of what works, what doesn't, and why."
      toc={toc}
      section="Features"
    >
      <section id="how-it-works">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          How the Service Worker Caches Assets
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The offline experience is built on a service worker that intercepts every network request the browser makes while the app is loaded. The service worker runs in a dedicated thread, completely separate from the page, and makes caching decisions based on the type of asset being requested and its current state in the Cache API.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          When the browser requests an asset — a JavaScript bundle, an image, a CSS file — the service worker intercepts that request before it reaches the network. It checks its cache stores to determine whether a usable copy exists. If it does, the cached response is returned immediately. If it doesn&apos;t, the request passes through to the network, the response is stored in the cache, and then returned to the browser.
        </p>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Request Interception Flow</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Browser requests /projects
        │
        ▼
Service Worker fetch event fires
        │
        ▼
┌───────────────────────┐
│ Is asset HTML page?   │──── Yes ──── Network-first
│                       │             (try network, fall back to cache)
└───────────┬───────────┘
            │ No
            ▼
┌───────────────────────┐
│ Is asset a static     │──── Yes ──── Cache-first
│ bundle (JS/CSS)?      │             (serve from cache, update in bg)
└───────────┬───────────┘
            │ No
            ▼
┌───────────────────────┐
│ Is asset an image     │──── Yes ──── Cache-first with
│ or font?              │             30-day expiry
└───────────┬───────────┘
            │ No
            ▼
┌───────────────────────┐
│ Is it an API/data     │──── Yes ──── Stale-while-revalidate
│ request?              │             (serve cache, fetch fresh in bg)
└───────────┬───────────┘
            │ No
            ▼
      Network request
      (pass-through)`}
            </code>
          </pre>
        </div>

        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The service worker is registered once when the app first loads. Registration is scoped to the app&apos;s origin, meaning it only intercepts requests made by this application. It does not affect other sites or tabs open in the browser. Once registered, the service worker persists across browser restarts until it is explicitly unregistered or the browser clears site data.
        </p>
      </section>

      <section id="cache-strategies">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Caching Strategies by Asset Type
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Different asset types require different caching strategies. A JavaScript bundle with a content-hashed filename (like <InlineCode>dashboard.a3f8c1.js</InlineCode>) will never change at that URL, so serving a stale copy is always safe. An HTML page, however, may reference newer assets, so it needs a freshness check. The service worker applies the correct strategy per asset category.
        </p>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Strategy Reference</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Asset Type               Strategy               Rationale
────────────────────────────────────────────────────────────
JS bundles (hashed)      Cache-first            Filename changes
                                                on content change

CSS (hashed)             Cache-first            Same as JS

HTML pages               Network-first         May reference new
                                                asset URLs

Images (static)          Cache-first            Content-addressed,
                                                30-day TTL

Fonts                    Cache-first            Never change,
                                                long TTL

Documentation pages      Stale-while-           Serve immediately,
(JSON/data)              revalidate             refresh in background

Service worker file      Network-only           Browser enforces
                                                this by spec

Manifest.json            Network-first          Check for updated
                                                PWA metadata`}
            </code>
          </pre>
        </div>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Cache-First: Serving From Cache Immediately
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          For content-hashed assets (JS, CSS), the service worker checks the cache first. If the file exists, it returns it without any network request. This results in near-instant load times — typically under 10ms for cached assets. The network is never consulted for these assets because the filename itself guarantees the content is correct. When a new build deploys with different content, the new filename naturally bypasses the old cache entry.
        </p>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Network-First: Ensuring Fresh HTML
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          HTML pages use a network-first strategy. The service worker attempts to fetch the page from the network first. If the network responds within a short timeout (typically 3-5 seconds), the fresh copy is served and the cache is updated. If the network is unavailable or times out, the cached version is served as a fallback. This ensures that HTML pages — which link to other assets — reference the most current bundle URLs.
        </p>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Stale-While-Revalidate: Balanced Freshness
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          For documentation data and project metadata, the service worker serves the cached version immediately (so the user never waits for a network round-trip) and simultaneously fetches a fresh copy in the background. If the fresh copy is newer, the cache is updated and the next request will use it. This provides sub-50ms response times while keeping content within a few minutes of the server.
        </p>

        <Callout type="info" title="Why Not Cache-First for Everything?">
          Cache-first for HTML would mean users could see outdated page structure if a new deployment changes the JavaScript bundle filenames. Network-first for HTML ensures the page always references the correct, current bundles. The trade-off is a slightly slower first load for HTML pages when offline (falling back to cache).
        </Callout>
      </section>

      <section id="install-activate">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Install and Activate Lifecycle
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The service worker goes through a strict two-phase lifecycle before it can serve cached content. Understanding this lifecycle is important because it explains why the first visit to the app doesn&apos;t provide offline support — and why updates don&apos;t interrupt the current session.
        </p>

        <CodeBlock
          code={`// Phase 1: Install — precache all static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      return cache.addAll(PRECACHE_MANIFEST);
      // ↑ Fetches and stores every URL in the manifest.
      //   If any URL fails to fetch, the entire install fails.
    })
  );
  // Calling skipWaiting() here would activate immediately,
  // but this app waits for all tabs to close first.
});

// Phase 2: Activate — clean up old caches, claim clients
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_VERSION)
          .map((name) => caches.delete(name))
          // ↑ Removes all caches that don't match the current version
      );
    }).then(() => self.clients.claim())
    // ↑ Takes control of all open tabs immediately
  );
});`}
          language="javascript"
          filename="sw.js — lifecycle"
        />

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          What Happens on First Visit
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          On the first visit, the browser registers the service worker. The install event fires and begins precaching the asset manifest. This happens in the background while the page loads normally from the network. The service worker does not serve any cached content on this first visit — it is only populating the cache for future use. Offline support becomes available on the second visit, once the caches are fully populated.
        </p>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          What Happens on Updates
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          When a new service worker is detected (the browser fetches <InlineCode>sw.js</InlineCode> from the network on every page load and compares it byte-for-byte against the installed version), the new worker begins installing in the background. The current (old) worker continues to serve all requests. Once the new worker&apos;s install phase completes and all old tabs are closed, the activate phase fires, old caches are deleted, and the new worker takes control.
        </p>
      </section>

      <section id="what-is-cached">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          What Is Cached
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The service worker precaches the following asset categories during the install phase. Each category has its own cache store, which allows independent expiration and cleanup:
        </p>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">HTML entry points:</strong> Every route the app exposes — dashboard, projects, downloads, settings, documentation sections. These are cached with the network-first strategy so they stay fresh.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">JavaScript bundles:</strong> All route-specific chunks, the main app bundle, and vendor libraries. These are content-hashed, so stale versions are never served.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">CSS stylesheets:</strong> Tailwind output and component-specific styles. Content-hashed like JavaScript.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Static images:</strong> Project thumbnails, avatars, UI icons. Cached with a 30-day TTL. These are not content-hashed, so the service worker revalidates them periodically.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Web fonts:</strong> Font files used for typography. Cached with a long TTL (1 year) since font files are immutable once deployed.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Documentation data:</strong> JSON payloads for project metadata, doc pages, and configuration. Cached with stale-while-revalidate.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Offline fallback page:</strong> A dedicated HTML page served when a requested resource is not in the cache and the network is unavailable.</span>
          </li>
        </ul>
      </section>

      <section id="what-is-not-cached">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          What Is Not Cached
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Several categories of content are intentionally excluded from the cache. Understanding these exclusions matters because they define the boundaries of offline functionality:
        </p>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span><strong className="text-white/60">The service worker file itself:</strong> The browser always fetches <InlineCode>sw.js</InlineCode> from the network, regardless of cache state. This is a security requirement from the service worker specification — it ensures the browser can always detect a new version.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span><strong className="text-white/60">API authentication tokens:</strong> Sensitive credentials are never stored in the Cache API. Session data exists only in memory and is discarded when the tab closes.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span><strong className="text-white/60">Third-party scripts:</strong> This application does not load any third-party scripts (analytics, advertising, social widgets). There are no cross-origin requests to cache.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span><strong className="text-white/60">Manifest.json updates:</strong> The PWA manifest is fetched fresh on each visit to detect updated app metadata (icons, name, theme color). It is not served from cache.</span>
          </li>
        </ul>

        <Callout type="note" title="No Data Collection Architecture">
          Because this application collects zero user data — no analytics, no tracking, no third-party services — the set of things that need caching is well-defined and small. There are no behavioral data payloads, no user-generated content stored server-side, and no dynamic API responses that vary per user.
        </Callout>
      </section>

      <section id="offline-fallback">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Offline Fallback Page
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          When a user navigates to a page that is not in the cache and the device has no network connection, the service worker intercepts the navigation request and serves the offline fallback page. This page is precached during the install phase, so it is always available.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The fallback page includes:
        </p>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>A clear indication that the device is offline</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>A list of pages that have been previously visited and are available in the cache</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>A retry button that re-attempts navigation when connectivity is restored</span>
          </li>
        </ul>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Edge Case: Partial Cache Miss
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          If the user is online but a specific asset fails to cache (e.g., a network timeout during precache), the service worker falls through to a network request. If the network also fails, the browser&apos;s default offline error is shown instead of the fallback page. This only happens for assets that were never successfully cached — not for assets that were cached and then evicted.
        </p>
      </section>

      <section id="stale-content">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Handling Stale Content
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Stale content is content that has been cached but may no longer match the server. This is a fundamental tension in offline-first applications: the user wants instant responses, but the content needs to be accurate. The app handles this differently per content type:
        </p>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span><strong className="text-white/60">Content-hashed assets (JS, CSS):</strong> Never stale. The filename changes when the content changes. If the file exists in cache at that URL, the content is correct.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span><strong className="text-white/60">HTML pages:</strong> May reference outdated bundle URLs after a deployment. The network-first strategy mitigates this, but if the user is offline, the cached HTML will try to load old bundle filenames that no longer exist on the server.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span><strong className="text-white/60">Documentation data:</strong> May be up to 5 minutes old (the stale-while-revalidate window). This is acceptable for documentation but would be problematic for real-time data.</span>
          </li>
        </ul>

        <Callout type="warning" title="Deployment Edge Case">
          If the user is offline when a new version deploys, they may see the old HTML page trying to load new bundle URLs. The old HTML references filenames like <InlineCode>dashboard.a3f8c1.js</InlineCode>, but the new deployment may have <InlineCode>dashboard.b7d2e4.js</InlineCode>. Since the old filename isn&apos;t in the cache, those specific requests will fail. This is a known limitation of the network-first HTML strategy when the user has been offline across a deployment.
        </Callout>
      </section>

      <section id="storage-limits">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Cache Storage Limits
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Browsers impose storage limits on the Cache API, and these limits vary by browser and available disk space. The application&apos;s total cache footprint is kept under 50MB to stay well within typical limits:
        </p>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Storage Limits by Browser</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Browser              Cache Limit              Eviction Policy
──────────────────────────────────────────────────────────────
Chrome               ~6% of disk space        LRU when limit
                     (min 50MB, max 2GB)      reached

Firefox              ~500MB (persistent)      Fixed quota
                     ~200MB (temporary)       with warning

Safari (macOS)       ~50MB default            User can grant
                                              more via prompt

Safari (iOS)         ~50MB hard limit         No user override
                                              (non-standalone)

Edge                 Same as Chrome           LRU when limit
                     (Chromium-based)         reached`}
            </code>
          </pre>
        </div>

        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          When the cache approaches its limit, browsers use a Least Recently Used (LRU) eviction policy. The least recently accessed cache entries are deleted first. Since this app&apos;s assets are accessed frequently during normal use, they are unlikely to be evicted under normal conditions.
        </p>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          iOS Safari Specific Behavior
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          iOS Safari has the strictest storage limits. In standalone mode (installed as a PWA via &quot;Add to Home Screen&quot;), the limit is higher than in browser-tab mode. In browser-tab mode, the limit is approximately 50MB and cannot be increased by the user. This is the most significant platform constraint for offline functionality on iOS.
        </p>
      </section>

      <section id="best-practices">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Best Practices
        </h2>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Visit all pages at least once while online.</strong> The service worker caches pages as they are navigated. Browsing through dashboard, projects, downloads, and documentation ensures those routes are available offline. Pages that were never visited will not be in the cache.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Install as a PWA for more reliable caching.</strong> Installing via &quot;Add to Home Screen&quot; (on mobile) or the install prompt (on desktop) gives the app its own browsing context. This prevents the browser from garbage-collecting the service worker during idle periods, which can happen with tabs that are rarely opened.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Allow updates when connected.</strong> When the app detects a new version, it installs in the background. Closing and reopening the app (or closing all tabs for this origin) completes the update cycle. Keeping the app open indefinitely across many days can delay update activation.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Use Chromium-based browsers for the most predictable behavior.</strong> Chrome, Edge, and Brave have the most mature service worker implementations. Firefox is close but has different storage quota behavior. Safari has the most restrictions, especially on iOS.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span><strong className="text-white/60">Do not rely on offline mode for real-time accuracy.</strong> If you need the latest version of a project or documentation page, refresh while online. Cached data may be up to 5 minutes behind the server for stale-while-revalidate resources.</span>
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
            <span><strong className="text-white/60">Assuming first visit provides offline support.</strong> The service worker needs one full page load to register and precache. The first visit always requires a network connection. Offline functionality is available starting from the second visit.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span><strong className="text-white/60">Expecting new content to appear immediately after deployment.</strong> The old service worker continues to serve cached assets until the new one activates. The update cycle requires the old service worker to be retired, which happens when all tabs for this origin are closed.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span><strong className="text-white/60">Clearing browser data and expecting offline to still work.</strong> Clearing site data removes all Cache API entries, localStorage, and the service worker registration. The app must be visited again online to rebuild the cache.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span><strong className="text-white/60">Not closing tabs after a deployment.</strong> If a tab stays open across a deployment, the old service worker continues to control it. The new service worker installs but remains in &quot;waiting&quot; state. Closing the tab allows the new worker to activate.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span><strong className="text-white/60">Using Incognito/Private mode to test offline.</strong> Service workers are generally not persisted in private browsing modes (browser-dependent). Cache entries may be discarded when the private window closes, making offline tests unreliable.</span>
          </li>
        </ul>
      </section>

      <section id="limitations">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Limitations
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The offline experience has these inherent limitations:
        </p>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Known Limitations</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Limitation                     Impact                 Workaround
──────────────────────────────────────────────────────────────────
First visit requires internet   Pages not yet          Visit all pages
                                cached                 while online

Stale HTML across a             Old page tries to      Close all tabs,
deployment when offline         load new bundle URLs   reopen online

Stale-while-revalidate          Content may be up      Pull-to-refresh
window (5 min)                  to 5 min behind        when online

No background sync for          Queued actions wait    Manual retry
queued actions                  until reconnected      when online

iOS Safari cache limit          ~50MB in browser       Install as PWA
(~50MB non-standalone)          tab mode               (standalone)

Browser eviction under          Least-recently-used    Revisit pages
disk pressure                   entries deleted        periodically`}
            </code>
          </pre>
        </div>

        <Callout type="tip" title="Version Note">
          Offline features are continuously improved. This documentation covers version{" "}
          <InlineCode>{APP_VERSION}</InlineCode> as of <InlineCode>{LAST_UPDATED}</InlineCode>.
          Check the changelog for updates.
        </Callout>
      </section>

      <section id="related">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Related
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/docs/features/updates"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Updates</p>
            <p className="text-[13px] text-white/30">How the service worker update lifecycle works and how updates propagate.</p>
          </Link>
          <Link
            href="/docs/features/performance"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Performance</p>
            <p className="text-[13px] text-white/30">How caching strategies improve Core Web Vitals and load times.</p>
          </Link>
          <Link
            href="/docs/architecture/service-worker"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Service Worker Architecture</p>
            <p className="text-[13px] text-white/30">Deep dive into registration, lifecycle, and fetch event handling.</p>
          </Link>
          <Link
            href="/docs/features/privacy"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Privacy</p>
            <p className="text-[13px] text-white/30">Why the zero-data-collection policy simplifies the offline architecture.</p>
          </Link>
        </div>
      </section>
    </DocPage>
  );
}
