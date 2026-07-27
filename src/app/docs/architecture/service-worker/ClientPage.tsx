"use client";

import Link from "next/link";
import { DocPage, Callout } from "@/components/docs/DocLayout";

const toc = [
  { id: "overview", label: "Offline Experience" },
  { id: "caching", label: "Smart Caching" },
  { id: "updates", label: "Automatic Updates" },
  { id: "related", label: "Related" },
];

export default function ServiceWorkerClientPage() {
  return (
    <DocPage
      title="Service Worker"
      description="How the application enables offline access, smart caching, and automatic updates."
      toc={toc}
      section="Architecture"
    >
      <section id="overview">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          Offline Experience
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          A background worker intercepts network requests and manages a local cache,
          enabling the application to work offline. When the network is unavailable,
          cached pages load instantly from the device — no connection required.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The worker is transparent to users. It activates automatically on first visit
          and updates itself when new versions are available. The result is a native-app-like
          experience in the browser.
        </p>
      </section>

      <section id="caching">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Smart Caching
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Different types of content use different caching strategies, balancing freshness
          against speed:
        </p>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Build assets</strong> — Static resources
              (scripts, styles, fonts) are served from cache instantly and refreshed in the
              background. Since these are versioned, cached copies are always correct.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Page navigations</strong> — HTML pages are
              fetched from the network first to ensure freshness. If offline, the cached
              version loads with an offline indicator.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Static assets</strong> — Images and icons are
              cached on first fetch and served from cache thereafter. These change
              infrequently, so stale content is rare.
            </span>
          </li>
        </ul>
      </section>

      <section id="updates">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Automatic Updates
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The worker checks for updates on every page load and periodically while the
          site is open. When a new version is detected, it installs in the background
          and takes over immediately — no manual refresh required.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Old cached assets are cleaned up automatically during the update process,
          ensuring the device doesn&apos;t accumulate stale data.
        </p>

        <Callout type="info" title="PWA Installation">
          On supported browsers (Chrome, Edge, Firefox), users can install the application
          to their home screen or desktop. On iOS, installation is available through the
          browser&apos;s Share menu.
        </Callout>
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
            <p className="text-[13px] text-white/30">How new versions are delivered.</p>
          </Link>
          <Link
            href="/docs/features/performance"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Performance</p>
            <p className="text-[13px] text-white/30">How caching speeds up the experience.</p>
          </Link>
          <Link
            href="/docs/features/privacy"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Privacy</p>
            <p className="text-[13px] text-white/30">Where cached data lives.</p>
          </Link>
        </div>
      </section>
    </DocPage>
  );
}
