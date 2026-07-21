"use client";

import { DocPage, Callout, InlineCode } from "@/components/docs/DocLayout";
import Link from "next/link";

const features = [
  {
    title: "Progressive Web App",
    description:
      "Built on open web standards (Web App Manifest, Service Workers, HTTPS), the app works in any modern browser and progressively enhances to deliver a standalone app experience on supported devices. No app store required.",
    detail: "The service worker intercepts network requests, caches assets and pages, and serves them from local storage when the network is unavailable or slow. The Web App Manifest provides metadata that lets the browser present an installation prompt.",
  },
  {
    title: "Installable",
    description:
      "Add the app to your home screen or desktop in seconds. It launches in its own window, appears in your taskbar or app drawer, and behaves like a native application — no browser chrome, no tab bar.",
    detail: "Installation is triggered by the browser's built-in PWA install prompt or the in-app Install button on the Downloads page. On Android, Chrome shows an install banner. On iOS, Safari uses the Share menu. On desktop, Chrome and Edge show an install icon in the address bar.",
  },
  {
    title: "Offline-Capable",
    description:
      "Once visited, the service worker caches pages and assets. Browse previously viewed content, read documentation, and explore projects even without an internet connection.",
    detail: "The caching strategy is network-first for API data and cache-first for static assets. Pages you have already visited are served from the cache instantly. New pages are fetched from the network when available and cached for future offline use.",
  },
  {
    title: "Cross-Platform",
    description:
      "A single codebase runs on Windows, macOS, Linux, Android, and iOS. The layout adapts to each screen size and input method — touch on mobile, mouse and keyboard on desktop.",
    detail: "Responsive design uses CSS Grid and Flexbox with Tailwind breakpoints. Touch targets meet WCAG 2.1 minimum sizes (44x44px). The sidebar collapses to a hamburger menu on screens below 1024px.",
  },
  {
    title: "Privacy-First",
    description:
      "No analytics, no tracking scripts, no cookies, no third-party data collection. The app makes zero network requests to external services. Your browsing behavior stays on your device.",
    detail: "The only external request is to the app's own server for content and assets. There are no Google Analytics, Facebook Pixel, or similar tracking scripts. The Settings page shows exactly what data the app stores locally.",
  },
  {
    title: "Always Updated",
    description:
      "The service worker checks for updates on every app launch. When a new version is available, it is cached in the background and activated on the next reload — no manual action required.",
    detail: "The update flow: the service worker fetches the new manifest and assets in the background, compares file hashes, and swaps the cache. The user sees the updated version after closing and reopening the app, or after a manual refresh.",
  },
];

const comparison = [
  { aspect: "Installation", app: "One tap via browser prompt", website: "None required", bookmark: "Manual bookmark creation" },
  { aspect: "Offline Access", app: "Cached pages and assets available", website: "Not available", bookmark: "URL only, no content" },
  { aspect: "Updates", app: "Automatic via service worker", website: "Requires manual refresh", bookmark: "Requires manual refresh" },
  { aspect: "Home Screen", app: "Dedicated icon, standalone window", website: "Browser tab only", bookmark: "Bookmark in browser toolbar" },
  { aspect: "Local Storage", app: "Cached content, preferences, themes", website: "Browser cache only", bookmark: "None" },
  { aspect: "Performance", app: "Cached assets load instantly", website: "Depends on network speed", bookmark: "Depends on network speed" },
  { aspect: "Data Privacy", app: "No tracking, no cookies, no external requests", website: "Varies by site", bookmark: "No different from site" },
  { aspect: "Background Updates", app: "Checked on every launch", website: "Not available", bookmark: "Not available" },
];

export default function ClientPage() {
  return (
    <DocPage
      title="Introduction"
      description="What the Portfolio App is, why it was built as a PWA, and what you can expect from the experience."
      toc={[
        { id: "what-is-the-portfolio-app", label: "What Is the Portfolio App" },
        { id: "why-it-exists", label: "Why It Exists" },
        { id: "core-philosophy", label: "Core Philosophy" },
        { id: "key-features", label: "Key Features" },
        { id: "system-requirements", label: "System Requirements" },
        { id: "app-vs-website-vs-bookmark", label: "App vs Website vs Bookmark" },
        { id: "limitations", label: "Limitations" },
        { id: "common-mistakes", label: "Common Mistakes" },
        { id: "next-steps", label: "Next Steps" },
      ]}
      section="Getting Started"
    >
      <section id="what-is-the-portfolio-app">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">What Is the Portfolio App</h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The Portfolio App is a <strong className="text-white/50">Progressive Web App (PWA)</strong> that
          showcases engineering projects, software products, and technical documentation in a
          fast, installable, and offline-capable package. It is built with{" "}
          <InlineCode>Next.js 16</InlineCode>, <InlineCode>React 19</InlineCode>, and{" "}
          <InlineCode>TypeScript</InlineCode>.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Unlike a traditional website, the Portfolio App can be installed directly from your
          browser — no app store, no approval process, no installation wizard. Once installed,
          it launches in its own window, appears in your taskbar or app drawer, and continues
          to work when your connection drops.
        </p>
        <Callout type="tip" title="Try It Now">
          Open the app in your browser and look for the install icon in the address bar — or
          visit the <InlineCode>/downloads</InlineCode> page and click the{" "}
          <InlineCode>Install App</InlineCode> button. The entire process takes under 10 seconds.
        </Callout>
      </section>

      <section id="why-it-exists">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">Why It Exists</h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Traditional portfolios are static websites — you visit, you leave, and unless you
          bookmark the URL and remember to return, the connection ends there. The Portfolio App
          reimagines what a portfolio can be: a living application that stays on your device,
          loads instantly, and keeps itself updated.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The goal is to deliver a native-quality experience without the friction of app stores.
          No sign-ups, no permissions prompts, no installation barriers. A fast, polished
          application that works on your phone, tablet, laptop, or desktop — and continues
          working without internet.
        </p>
        <Callout type="info" title="Design Philosophy">
          A portfolio should be as well-engineered as the work it showcases. The app is not
          just a collection of pages — it is a demonstration of what modern web standards
          can achieve when built with intention.
        </Callout>
      </section>

      <section id="core-philosophy">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">Core Philosophy</h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-6">
          Every technical decision in the Portfolio App is guided by four principles:
        </p>
        <ul className="space-y-4 mb-6">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <div>
              <strong className="text-white/50 text-[14px]">Privacy by Default</strong>
              <p className="text-[14px] text-white/40 leading-relaxed mt-0.5">
                No analytics, no tracking, no cookies. The app does not collect or transmit any
                personal data. Everything runs locally in your browser. The only network requests
                are to the app&apos;s own server for content delivery.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500/50 shrink-0" />
            <div>
              <strong className="text-white/50 text-[14px]">Performance Without Compromise</strong>
              <p className="text-[14px] text-white/40 leading-relaxed mt-0.5">
                Core Web Vitals are optimized across all routes. Lazy-loaded pages, pre-cached
                assets, and efficient bundle splitting ensure the app loads in under 2 seconds
                on 3G and under 500ms on broadband.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-500/50 shrink-0" />
            <div>
              <strong className="text-white/50 text-[14px]">Offline-First Architecture</strong>
              <p className="text-[14px] text-white/40 leading-relaxed mt-0.5">
                The service worker caches pages and assets intelligently using a network-first
                strategy for dynamic content and cache-first for static resources. Browse your
                portfolio on a plane, in a tunnel, or in airplane mode.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <div>
              <strong className="text-white/50 text-[14px]">Platform Agnostic</strong>
              <p className="text-[14px] text-white/40 leading-relaxed mt-0.5">
                One codebase, every platform. The app looks and behaves identically on Windows,
                macOS, Linux, Android, and iOS. Input methods, screen sizes, and browser
                capabilities are all handled through progressive enhancement.
              </p>
            </div>
          </li>
        </ul>
      </section>

      <section id="key-features">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">Key Features</h2>
        <div className="space-y-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-5"
            >
              <h3 className="text-base font-medium text-white/60 mb-2">{feature.title}</h3>
              <p className="text-[14px] text-white/40 leading-relaxed mb-3">{feature.description}</p>
              <p className="text-[13px] text-white/25 leading-relaxed">{feature.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="system-requirements">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">System Requirements</h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The Portfolio App works as a standard website in any modern browser. For the full
          installable PWA experience — standalone window, offline access, home screen icon —
          the following browser versions are required:
        </p>
        <ul className="space-y-2 mb-4">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <div>
              <strong className="text-white/50">Chrome 76+</strong>
              <span className="text-[14px] text-white/40"> — Full PWA support including install prompts, service workers, and push notifications</span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <div>
              <strong className="text-white/50">Edge 76+</strong>
              <span className="text-[14px] text-white/40"> — Full PWA support on Windows, identical to Chrome</span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <div>
              <strong className="text-white/50">Safari 16.4+</strong>
              <span className="text-[14px] text-white/40"> — PWA support on macOS Ventura+ and iOS 16.4+. Add to Home Screen via Share menu</span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <div>
              <strong className="text-white/50">Firefox 108+</strong>
              <span className="text-[14px] text-white/40"> — Service worker support on desktop. PWA install not yet supported</span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <div>
              <strong className="text-white/50">Samsung Internet 20+</strong>
              <span className="text-[14px] text-white/40"> — Full PWA support on Samsung Android devices</span>
            </div>
          </li>
        </ul>
        <Callout type="note" title="Graceful Degradation">
          If your browser does not support a specific PWA feature, the app degrades to a
          standard website without losing core functionality. Content, navigation, and search
          all work regardless of PWA support level.
        </Callout>
      </section>

      <section id="app-vs-website-vs-bookmark">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">App vs Website vs Bookmark</h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-6">
          The table below compares the installed PWA against the same site accessed as a
          standard website or browser bookmark:
        </p>
        <div className="overflow-x-auto rounded-xl border border-white/[0.06] mb-6">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                <th className="text-left px-4 py-3 text-white/50 font-medium">Aspect</th>
                <th className="text-left px-4 py-3 text-white/50 font-medium">Installed PWA</th>
                <th className="text-left px-4 py-3 text-white/30 font-medium">Website</th>
                <th className="text-left px-4 py-3 text-white/30 font-medium">Bookmark</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, i) => (
                <tr
                  key={row.aspect}
                  className={cn(
                    "border-b border-white/[0.03]",
                    i % 2 === 0 ? "bg-white/[0.005]" : ""
                  )}
                >
                  <td className="px-4 py-3 text-white/50">{row.aspect}</td>
                  <td className="px-4 py-3 text-white/60">{row.app}</td>
                  <td className="px-4 py-3 text-white/25">{row.website}</td>
                  <td className="px-4 py-3 text-white/25">{row.bookmark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Callout type="warning" title="Not a Native App Store App">
          The Portfolio App is a PWA, not a native app distributed through the Apple App
          Store or Google Play Store. It is installed directly from the browser. This means
          no approval delays, no store fees, and instant updates — but it also means certain
          native capabilities (background services, system-level integrations) are not available.
        </Callout>
      </section>

      <section id="limitations">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">Limitations</h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          PWAs operate within browser sandbox constraints. Understanding these limitations
          helps set correct expectations:
        </p>
        <ul className="space-y-3 mb-4">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <div>
              <strong className="text-white/50 text-[14px]">No Background Services</strong>
              <p className="text-[14px] text-white/40 leading-relaxed mt-0.5">
                The service worker cannot run continuously. It activates on page load, handles
                fetch events, and goes dormant. Long-running background tasks are not possible.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <div>
              <strong className="text-white/50 text-[14px]">Limited iOS Support</strong>
              <p className="text-[14px] text-white/40 leading-relaxed mt-0.5">
                Safari on iOS has restrictions: no push notifications, no background sync, and
                the service worker is limited to a 50MB cache. The app works but with reduced
                PWA capabilities compared to Android and desktop.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <div>
              <strong className="text-white/50 text-[14px]">No App Store Distribution</strong>
              <p className="text-[14px] text-white/40 leading-relaxed mt-0.5">
                The app cannot be listed on the App Store or Play Store. Installation requires
                visiting the website directly. Users unfamiliar with PWAs may not discover the
                install option.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <div>
              <strong className="text-white/50 text-[14px]">Storage Limits</strong>
              <p className="text-[14px] text-white/40 leading-relaxed mt-0.5">
                Browsers impose storage quotas on service worker caches (typically 50MB–800MB
                depending on the browser and device). The app stays well within these limits
                but cannot cache unlimited content.
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
              <strong className="text-white/50 text-[14px]">Assuming offline access works on first visit</strong>
              <p className="text-[14px] text-white/40 leading-relaxed mt-0.5">
                The service worker must be registered and assets cached before offline access
                works. The first visit must complete fully with an internet connection. If you
                visit for the first time while offline, the app will not load.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <div>
              <strong className="text-white/50 text-[14px]">Expecting native app performance on old devices</strong>
              <p className="text-[14px] text-white/40 leading-relaxed mt-0.5">
                While optimized, the app runs in a browser engine. On devices older than 5
                years or with limited RAM, animations may stutter and page transitions may
                feel slower than on modern hardware.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <div>
              <strong className="text-white/50 text-[14px]">Confusing the PWA with a native app</strong>
              <p className="text-[14px] text-white/40 leading-relaxed mt-0.5">
                PWAs cannot access hardware features like Bluetooth, NFC, or advanced camera
                APIs. If you need these capabilities, a native app (distributed via app stores)
                is the appropriate choice.
              </p>
            </div>
          </li>
        </ul>
      </section>

      <section id="next-steps">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">Next Steps</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/docs/getting-started/quick-start"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Quick Start</p>
            <p className="text-[13px] text-white/30">Get the app installed and running in under a minute.</p>
          </Link>
          <Link
            href="/docs/installation/overview"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Installation Guide</p>
            <p className="text-[13px] text-white/30">Platform-specific instructions for every device.</p>
          </Link>
          <Link
            href="/docs/features/offline"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Offline Experience</p>
            <p className="text-[13px] text-white/30">How caching works and what is available offline.</p>
          </Link>
          <Link
            href="/docs/reference/faq"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">FAQ</p>
            <p className="text-[13px] text-white/30">Answers to common questions and edge cases.</p>
          </Link>
        </div>
      </section>
    </DocPage>
  );
}

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}
