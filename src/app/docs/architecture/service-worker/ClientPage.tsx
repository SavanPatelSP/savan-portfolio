"use client";

import Link from "next/link";
import { DocPage, Callout, CodeBlock, InlineCode } from "@/components/docs/DocLayout";

const toc = [
  { id: "what-is-a-service-worker", label: "What Is a Service Worker" },
  { id: "registration", label: "Registration" },
  { id: "lifecycle", label: "Lifecycle" },
  { id: "caching-strategies", label: "Caching Strategies" },
  { id: "fetch-handler", label: "Fetch Handler" },
  { id: "update-flow", label: "Update Flow" },
  { id: "scope", label: "Scope" },
  { id: "debugging", label: "Debugging" },
  { id: "best-practices", label: "Best Practices" },
  { id: "limitations", label: "Limitations" },
  { id: "common-mistakes", label: "Common Mistakes" },
];

export default function ServiceWorkerClientPage() {
  return (
    <DocPage
      title="Service Worker"
      description="The service worker is a standalone JavaScript file that runs in a background thread, separate from the main page. It intercepts every network request the application makes, decides whether to serve from cache or network, and manages the lifecycle of cached assets. This page covers the exact caching strategies, update mechanics, and debugging workflows used in this application."
      toc={toc}
      section="Architecture"
    >
      <section id="what-is-a-service-worker">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          What Is a Service Worker
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          A service worker is a JavaScript file that the browser downloads, installs, and runs in a
          dedicated background thread. It has no access to the DOM, no access to{" "}
          <InlineCode>window</InlineCode>, and cannot modify page content. Its sole purpose is to
          intercept network requests and manage a cache.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          In this application, the service worker at <InlineCode>public/sw.js</InlineCode> is a
          hand-written file — it does not use Workbox or any build-time generation tool. This keeps
          the caching logic transparent and avoids adding a build dependency. The tradeoff is that
          all caching strategies must be implemented manually.
        </p>

        <Callout type="info" title="Why Not Workbox?">
          Workbox generates service workers from configuration, which adds abstraction over the
          caching logic. For this application&apos;s relatively simple caching needs (three
          strategies across four asset categories), a hand-written service worker is easier to
          debug and has zero build-time overhead.
        </Callout>
      </section>

      <section id="registration">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Registration
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Registration happens in a Client Component because the Service Worker API is a
          browser-only API. The service worker is registered when the page loads, with a scope
          covering the entire origin.
        </p>

        <CodeBlock
          code={`// Registration pattern (simplified)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((registration) => {
        // Check for updates every hour
        setInterval(() => {
          registration.update();
        }, 60 * 60 * 1000);
      })
      .catch((error) => {
        console.error("SW registration failed:", error);
      });
  });
}`}
          language="typescript"
          filename="service worker registration"
        />

        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The browser automatically checks for service worker updates on each page load (by
          fetching <InlineCode>sw.js</InlineCode> from the network, not from cache). The additional
          hourly <InlineCode>registration.update()</InlineCode> call handles cases where the user
          keeps a tab open for hours without reloading.
        </p>
      </section>

      <section id="lifecycle">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Lifecycle
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The service worker goes through three lifecycle phases, each with a specific purpose:
        </p>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Install Phase
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          When the browser detects a new or updated service worker file, it downloads it and fires
          the <InlineCode>install</InlineCode> event. During this phase, the service worker
          pre-caches the critical assets defined in <InlineCode>PRECACHE_URLS</InlineCode>. The
          install handler calls <InlineCode>self.skipWaiting()</InlineCode> to bypass the waiting
          phase and activate immediately.
        </p>

        <CodeBlock
          code={`const CACHE_NAME = "portfolio-v3";
const PRECACHE_URLS = [
  "/portfolio-app/offline",
  "/icon-192.svg",
  "/icon-512.svg",
  "/favicon.svg",
  "/logo.jpg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});`}
          language="javascript"
          filename="public/sw.js — install handler"
        />

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Activate Phase
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          After installation, the activate handler fires. It iterates through all cache names and
          deletes any cache that does not match <InlineCode>CACHE_NAME</InlineCode>. This cleans
          up old versions. It then calls <InlineCode>self.clients.claim()</InlineCode> to take
          control of all open tabs immediately, without waiting for them to reload.
        </p>

        <CodeBlock
          code={`self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k !== CACHE_NAME)
            .map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});`}
          language="javascript"
          filename="public/sw.js — activate handler"
        />

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Fetch Phase
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Once active, the service worker intercepts every <InlineCode>fetch</InlineCode> event for
          same-origin GET requests. The fetch handler routes each request through a strategy based
          on the request&apos;s URL path and mode. Non-GET requests and cross-origin requests are
          passed through to the network without interception.
        </p>
      </section>

      <section id="caching-strategies">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Caching Strategies
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The service worker applies three distinct caching strategies depending on the asset type.
          Each strategy balances freshness against speed differently.
        </p>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Strategy 1: Stale-While-Revalidate (Build Assets)
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Used for <InlineCode>/_next/</InlineCode> paths (JS, CSS, fonts). These are
          content-hashed — a URL like <InlineCode>/_next/static/chunks/abc123.js</InlineCode>{" "}
          will never change. If it&apos;s in the cache, it&apos;s the correct version. The service
          worker returns the cached version immediately and fetches from the network in the
          background to update the cache for future requests.
        </p>

        <CodeBlock
          code={`// _next/ assets — Stale-While-Revalidate
if (url.pathname.startsWith("/_next/")) {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetched = fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached);
      return cached || fetched;
    })
  );
  return;
}`}
          language="javascript"
          filename="public/sw.js — _next/ strategy"
        />

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Strategy 2: Network-First (Navigation)
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Used for page navigations (<InlineCode>request.mode === &quot;navigate&quot;</InlineCode>). HTML
          content must be fresh — serving stale HTML means the user sees outdated content. The
          service worker fetches from the network first. If the network fails (offline), it falls
          back to the cached offline page at <InlineCode>/portfolio-app/offline</InlineCode>.
        </p>

        <CodeBlock
          code={`// Navigation requests — Network-First with offline fallback
if (event.request.mode === "navigate") {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => {
        return caches.match("/portfolio-app/offline").then((cached) => {
          if (cached) return cached;
          return new Response(
            "<!DOCTYPE html><html><body><h1>You are offline</h1></body></html>",
            { headers: { "Content-Type": "text/html" }, status: 503 }
          );
        });
      })
  );
  return;
}`}
          language="javascript"
          filename="public/sw.js — navigation strategy"
        />

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Strategy 3: Cache-First (Static Assets)
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Used for all other same-origin GET requests (images, icons, manifest). The service worker
          checks the cache first. If the asset is cached, it&apos;s returned immediately. If not,
          it&apos;s fetched from the network, cached for next time, and returned. Assets served
          from paths starting with <InlineCode>/</InlineCode> are cached on first fetch.
        </p>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Strategy Summary</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Asset Type          Path Pattern        Strategy             Why
────────────────────────────────────────────────────────────────────
Build assets (JS,   /_next/*            Stale-While-         Content-hashed URLs
CSS, fonts)                             Revalidate           are immutable

Page navigation    mode=navigate       Network-First        HTML must be fresh;
                                                          offline fallback to
                                                          /portfolio-app/offline

Static assets       / (non-_next)       Cache-First          Images and icons
(images, icons)                                                change infrequently

API responses       N/A                 Passed through       No caching; requests
                                                          to network           that aren't GET or
                                                          cross-origin are
                                                          not intercepted`}
            </code>
          </pre>
        </div>
      </section>

      <section id="fetch-handler">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Fetch Handler
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The fetch handler is the entry point for all intercepted requests. It applies filters
          before routing to a strategy:
        </p>

        <CodeBlock
          code={`self.addEventListener("fetch", (event) => {
  // Filter 1: Only handle GET requests
  if (event.request.method !== "GET") return;

  // Filter 2: Only handle same-origin requests
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;

  // Route to strategy based on path/mode
  // ... (see caching strategies above)
});`}
          language="javascript"
          filename="public/sw.js — fetch filters"
        />

        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          These two filters are critical. Without the <InlineCode>method !== &quot;GET&quot;</InlineCode>{" "}
          filter, POST requests to the contact form API would be intercepted and potentially
          served from cache. Without the origin check, requests to external analytics or CDN
          resources would be handled by the service worker.
        </p>
      </section>

      <section id="update-flow">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Update Flow
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Service worker updates follow a specific sequence:
        </p>
        <ol className="list-decimal list-inside space-y-3 mb-6">
          <li className="text-[14px] text-white/40 leading-relaxed">
            The browser fetches <InlineCode>sw.js</InlineCode> from the network (never from
            cache). If the file byte-differs from the installed version, a new worker is
            installed.
          </li>
          <li className="text-[14px] text-white/40 leading-relaxed">
            The new worker&apos;s <InlineCode>install</InlineCode> event fires, pre-caching assets
            into a new cache (<InlineCode>portfolio-v4</InlineCode>, etc.).
          </li>
          <li className="text-[14px] text-white/40 leading-relaxed">
            Because this service worker calls{" "}
            <InlineCode>self.skipWaiting()</InlineCode> in the install handler, it bypasses the
            waiting phase. The <InlineCode>activate</InlineCode> event fires immediately.
          </li>
          <li className="text-[14px] text-white/40 leading-relaxed">
            The activate handler deletes old caches (<InlineCode>portfolio-v3</InlineCode>) and
            calls <InlineCode>self.clients.claim()</InlineCode> to take control of all tabs.
          </li>
          <li className="text-[14px] text-white/40 leading-relaxed">
            From this point, all new requests go through the new service worker. Tabs that were
            already open continue using the old worker until <InlineCode>claim()</InlineCode> runs.
          </li>
        </ol>

        <Callout type="warning" title="skipWaiting() Tradeoff">
          Calling <InlineCode>self.skipWaiting()</InlineCode> means the new service worker takes
          over immediately. This is appropriate here because the cache version changes with each
          deployment (the old cache is deleted anyway). If the new worker expected the old
          cache&apos;s data to persist, <InlineCode>skipWaiting()</InlineCode> would cause issues.
        </Callout>
      </section>

      <section id="scope">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Scope
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The service worker&apos;s scope determines which URLs it can intercept. The scope is
          constrained to the directory where the service worker file is located.
        </p>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <InlineCode>public/sw.js</InlineCode> → scope is <InlineCode>/</InlineCode> →
              intercepts all requests on the site
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              The scope can be narrowed (e.g., <InlineCode>scope: &quot;/docs/&quot;</InlineCode>)
              but never expanded beyond the file&apos;s directory
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              Cross-origin requests (CDN assets, analytics) are never intercepted regardless of
              scope
            </span>
          </li>
        </ul>
      </section>

      <section id="debugging">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Debugging
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Service workers can be difficult to debug because they run in a separate thread and cache
          aggressively. Browser developer tools provide several panels for inspection.
        </p>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Chrome DevTools
        </h3>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Application → Service Workers:</strong> Shows the
              registered service worker, its scope, status, and current cache version. You can
              manually trigger updates, skip waiting, or unregister the worker.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Application → Cache Storage:</strong> Lists all
              caches and their entries. You can inspect, delete individual entries, or clear the
              entire cache to test fresh install behavior.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Network → Offline checkbox:</strong> Simulates
              offline mode to test whether the service worker correctly serves cached content
              when the network is unavailable.
            </span>
          </li>
        </ul>

        <Callout type="tip" title="Development Workflow">
          Enable <strong>Update on reload</strong> in Chrome DevTools → Application → Service
          Workers during development. This forces the service worker to update every time you
          reload, preventing stale cached content from masking your changes.
        </Callout>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Firefox DevTools
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Firefox provides similar tools under Tools → Web Developer → Service Workers. The
          Storage Inspector shows cached entries, and the Console filters service worker logs by
          the worker&apos;s registration URL.
        </p>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Safari
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Safari&apos;s Web Inspector has limited service worker support. Enable the Develop menu
          in Safari preferences, then access the service worker through the Develop menu. Safari
          does not support the Cache Storage panel in the same way as Chrome — you may need to use{" "}
          <InlineCode>navigator.caches.keys()</InlineCode> in the console to inspect cache
          contents.
        </p>
      </section>

      <section id="best-practices">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Best Practices
        </h2>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Bump the cache version (<InlineCode>CACHE_NAME</InlineCode>) whenever{" "}
              <InlineCode>sw.js</InlineCode> changes. The activate handler uses this to delete
              old caches.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Always clone responses before caching. The response body can only be consumed once.
              Calling <InlineCode>response.clone()</InlineCode> creates a copy for the cache
              while the original goes to the page.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Test offline behavior regularly. Open DevTools, check &quot;Offline&quot;, and
              navigate the application. Every cached page should load correctly from the service
              worker&apos;s cache.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Keep <InlineCode>PRECACHE_URLS</InlineCode> minimal. Only pre-cache the offline
              fallback page and essential icons. All other assets are cached on first access.
            </span>
          </li>
        </ul>
      </section>

      <section id="limitations">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Limitations
        </h2>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">No WebSocket interception:</strong> Service workers
              cannot intercept WebSocket connections. Real-time features would need a separate
              mechanism.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Cache size limits:</strong> Browsers impose
              per-origin cache limits (typically 50-100% of available disk space). The service
              worker does not monitor cache size, so heavy usage over time could approach these
              limits.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Safari limitations:</strong> Safari on iOS does
              not support background sync or push notifications through service workers. The
              <InlineCode>beforeinstallprompt</InlineCode> event is also not fired on iOS,
              requiring manual installation instructions.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">No cache invalidation by content:</strong> The
              stale-while-revalidate strategy for <InlineCode>/_next/</InlineCode> assets works
              because URLs are content-hashed. If a URL changes, it&apos;s a different cache key.
              There is no mechanism to invalidate by content hash.
            </span>
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
            <span>
              <strong className="text-white/60">Forgetting to clone responses:</strong> The
              response body can only be consumed once. If you pass a response to both{" "}
              <InlineCode>cache.put()</InlineCode> and return it to the page without cloning,
              the page receives an empty response.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Not bumping the cache version:</strong> If you
              update <InlineCode>sw.js</InlineCode> but forget to change{" "}
              <InlineCode>CACHE_NAME</InlineCode>, the activate handler won&apos;t delete old
              caches because the name matches.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Caching POST requests:</strong> The service worker
              correctly filters out non-GET requests, but if this filter were removed, POST
              requests to the contact form API would be served from cache, causing duplicate
              submissions.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Testing only in the browser you developed
              on:</strong> Service worker behavior varies between Chrome, Firefox, and Safari.
              Test offline behavior in all three before deploying.
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
            href="/docs/features/offline"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Offline Experience</p>
            <p className="text-[13px] text-white/30">How caching enables offline access.</p>
          </Link>
          <Link
            href="/docs/features/updates"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Updates</p>
            <p className="text-[13px] text-white/30">Automatic update detection and version lifecycle.</p>
          </Link>
          <Link
            href="/docs/features/privacy"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Privacy</p>
            <p className="text-[13px] text-white/30">Service worker scope and local-only data storage.</p>
          </Link>
          <Link
            href="/docs/features/performance"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Performance</p>
            <p className="text-[13px] text-white/30">Caching strategies and Core Web Vitals impact.</p>
          </Link>
        </div>
      </section>
    </DocPage>
  );
}
