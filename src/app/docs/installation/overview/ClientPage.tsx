"use client";

import {
  DocPage,
  Callout,
  InlineCode,
} from "@/components/docs/DocLayout";
import Link from "next/link";
import { APP_VERSION, LAST_UPDATED } from "@/data/docs";

const toc = [
  { id: "installation-methods", label: "Installation Methods" },
  { id: "choosing-a-method", label: "Choosing a Method" },
  { id: "platform-support", label: "Platform Support" },
  { id: "requirements", label: "Requirements" },
  { id: "browser-support", label: "Browser Support" },
  { id: "after-installation", label: "After Installation" },
  { id: "limitations", label: "Limitations" },
  { id: "common-mistakes", label: "Common Mistakes" },
  { id: "best-practices", label: "Best Practices" },
  { id: "platform-guides", label: "Platform-Specific Guides" },
];

export default function ClientPage() {
  return (
    <DocPage
      title="Installation Overview"
      description="Everything you need to know about installing the Portfolio App across platforms and browsers."
      toc={toc}
      section="Installation"
    >
      {/* ── Installation Methods ────────────────────────── */}
      <section id="installation-methods">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          Installation Methods
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The Portfolio App is built as a Progressive Web App (PWA), which means
          it can be accessed in two primary ways:
        </p>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Direct Web Access</strong> — Open{" "}
              <InlineCode>savan.sp-net.in</InlineCode> in any supported browser.
              No download or installation is required.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">PWA Installation</strong> — Install
              the app to your home screen or desktop for a standalone window,
              offline support, and background updates via the service worker.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Add to Home Screen</strong> — On
              mobile devices, use the browser&apos;s &quot;Add to Home Screen&quot;
              option to create a standalone shortcut with the app icon.
            </span>
          </li>
        </ul>
      </section>

      <Callout type="info" title="PWA vs Native">
        The Portfolio App is not distributed through the Apple App Store or
        Google Play Store. All installation happens through the browser using
        standard PWA capabilities.
      </Callout>

      {/* ── Choosing a Method ───────────────────────────── */}
      <section id="choosing-a-method">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Choosing a Method
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The right method depends on how you use the app, what device you have,
          and whether you need offline access.
        </p>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Use Direct Web Access When:
        </h3>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>You are on a shared or public computer</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>You want to evaluate the app before committing to an install</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>You do not need offline access or a dedicated window</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>You are on iOS and prefer using the browser directly</span>
          </li>
        </ul>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Use PWA Installation When:
        </h3>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>You visit the app frequently and want one-tap launch from your home screen or desktop</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>You work in low-connectivity environments and need offline access</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>You want the app to run in its own window without browser chrome</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>You want the fastest load times from locally cached assets</span>
          </li>
        </ul>

        <Callout type="tip" title="Decision Guide">
          If you are unsure, start with direct web access. You can always install
          as a PWA later — the app detects installation eligibility and shows the
          install prompt automatically on supported browsers.
        </Callout>
      </section>

      {/* ── Platform Support ────────────────────────────── */}
      <section id="platform-support">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Platform Support
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-6">
          The app works across all modern platforms. The following table
          summarizes installation support by operating system, including
          minimum versions and known constraints.
        </p>

        <div className="overflow-x-auto my-6 rounded-xl border border-white/[0.06]">
          <table className="w-full text-[13px] text-white/40 border-collapse">
            <thead>
              <tr className="bg-white/[0.02]">
                <th className="text-left py-3 px-4 text-white/50 font-medium">
                  Platform
                </th>
                <th className="text-left py-3 px-4 text-white/50 font-medium">
                  Web Access
                </th>
                <th className="text-left py-3 px-4 text-white/50 font-medium">
                  PWA Install
                </th>
                <th className="text-left py-3 px-4 text-white/50 font-medium">
                  Offline
                </th>
                <th className="text-left py-3 px-4 text-white/50 font-medium">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              <tr>
                <td className="py-3 px-4 text-white/50">Windows 10+</td>
                <td className="py-3 px-4">
                  <span className="text-emerald-400/70">Full</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-emerald-400/70">Full</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-emerald-400/70">Yes</span>
                </td>
                <td className="py-3 px-4">Chrome 90+ and Edge 90+ show install prompts automatically</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-white/50">macOS 14.2+</td>
                <td className="py-3 px-4">
                  <span className="text-emerald-400/70">Full</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-emerald-400/70">Full</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-emerald-400/70">Yes</span>
                </td>
                <td className="py-3 px-4">Safari 17.2+ via File &gt; Add to Dock; Chrome 90+ via address bar icon</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-white/50">Linux</td>
                <td className="py-3 px-4">
                  <span className="text-emerald-400/70">Full</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-emerald-400/70">Full</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-emerald-400/70">Yes</span>
                </td>
                <td className="py-3 px-4">Chrome and Chromium-based browsers only; Firefox does not support PWA install on Linux</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-white/50">Android 8.0+</td>
                <td className="py-3 px-4">
                  <span className="text-emerald-400/70">Full</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-emerald-400/70">Full</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-emerald-400/70">Yes</span>
                </td>
                <td className="py-3 px-4">Chrome 90+, Samsung Internet 15+, Edge 90+</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-white/50">iOS 17.2+ / iPadOS 17.2+</td>
                <td className="py-3 px-4">
                  <span className="text-emerald-400/70">Full</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-amber-400/70">Partial</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-amber-400/70">Limited</span>
                </td>
                <td className="py-3 px-4">Manual Add to Home Screen via Safari only; cache cleared after ~7 days of inactivity</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Requirements ────────────────────────────────── */}
      <section id="requirements">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Requirements
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Requirements vary by platform. The core application is lightweight and
          runs on most modern hardware.
        </p>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Desktop
        </h3>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>A modern web browser (Chrome 90+, Edge 90+, Safari 17.2+, Firefox 110+)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>Stable internet connection for initial load</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>Minimum 50 MB free disk space for PWA installation</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>Display resolution of 1024×768 or higher recommended</span>
          </li>
        </ul>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Mobile
        </h3>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>Android 8.0+ or iOS 17.2+</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>Chrome 90+, Samsung Internet 15+, or Safari 17.2+</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>Minimum 20 MB free storage for cached assets</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>Screen width of 320px or larger</span>
          </li>
        </ul>
      </section>

      {/* ── Browser Support ─────────────────────────────── */}
      <section id="browser-support">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Browser Support
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-6">
          The app is tested on the following browsers. Older versions may render
          but lack PWA features such as service worker registration and
          offline caching.
        </p>

        <div className="overflow-x-auto my-6 rounded-xl border border-white/[0.06]">
          <table className="w-full text-[13px] text-white/40 border-collapse">
            <thead>
              <tr className="bg-white/[0.02]">
                <th className="text-left py-3 px-4 text-white/50 font-medium">
                  Browser
                </th>
                <th className="text-left py-3 px-4 text-white/50 font-medium">
                  Min Version
                </th>
                <th className="text-left py-3 px-4 text-white/50 font-medium">
                  Web Access
                </th>
                <th className="text-left py-3 px-4 text-white/50 font-medium">
                  PWA Install
                </th>
                <th className="text-left py-3 px-4 text-white/50 font-medium">
                  Service Worker
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              <tr>
                <td className="py-3 px-4 text-white/50">Chrome</td>
                <td className="py-3 px-4">90+</td>
                <td className="py-3 px-4">
                  <span className="text-emerald-400/70">Yes</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-emerald-400/70">Yes</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-emerald-400/70">Full</span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-white/50">Edge</td>
                <td className="py-3 px-4">90+</td>
                <td className="py-3 px-4">
                  <span className="text-emerald-400/70">Yes</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-emerald-400/70">Yes</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-emerald-400/70">Full</span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-white/50">Safari</td>
                <td className="py-3 px-4">17.2+</td>
                <td className="py-3 px-4">
                  <span className="text-emerald-400/70">Yes</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-amber-400/70">Partial</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-amber-400/70">Partial</span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-white/50">Firefox</td>
                <td className="py-3 px-4">110+</td>
                <td className="py-3 px-4">
                  <span className="text-emerald-400/70">Yes</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-red-400/70">No</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-emerald-400/70">Full</span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-white/50">Samsung Internet</td>
                <td className="py-3 px-4">15+</td>
                <td className="py-3 px-4">
                  <span className="text-emerald-400/70">Yes</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-emerald-400/70">Yes</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-emerald-400/70">Full</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <Callout type="warning" title="Firefox Limitation">
        Firefox does not support installing PWAs on desktop. You can still use
        the app in Firefox, but it runs in a standard browser tab without
        offline capabilities or app-like window behavior.
      </Callout>

      {/* ── After Installation ──────────────────────────── */}
      <section id="after-installation">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          What Happens After Installation
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Once installed via PWA or Add to Home Screen, the app operates
          differently from a standard browser tab:
        </p>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Dedicated Window</strong> — The app
              launches in its own window without browser chrome (address bar,
              tabs, bookmarks bar).
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Home Screen Icon</strong> — A
              shortcut appears on your home screen or desktop with the app icon.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Offline Access</strong> — Core
              pages and assets are cached locally. The app loads from cache and
              works without an internet connection after the first visit.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Automatic Updates</strong> — The
              service worker checks for updates in the background. New versions
              are applied on the next launch.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">App-like Navigation</strong> —
              Transitions are smoother, and the experience is closer to a
              native desktop or mobile application.
            </span>
          </li>
        </ul>

        <Callout type="tip" title="Version Info">
          The current version is{" "}
          <InlineCode>{APP_VERSION}</InlineCode>, last updated{" "}
          <InlineCode>{LAST_UPDATED}</InlineCode>.
        </Callout>
      </section>

      {/* ── Limitations ─────────────────────────────────── */}
      <section id="limitations">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Limitations
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The Portfolio App is a PWA, not a native application. This trade-off
          provides cross-platform reach but comes with specific constraints:
        </p>

        <div className="overflow-x-auto my-6 rounded-xl border border-white/[0.06]">
          <table className="w-full text-[13px] text-white/40 border-collapse">
            <thead>
              <tr className="bg-white/[0.02]">
                <th className="text-left py-3 px-4 text-white/50 font-medium">
                  Limitation
                </th>
                <th className="text-left py-3 px-4 text-white/50 font-medium">
                  Impact
                </th>
                <th className="text-left py-3 px-4 text-white/50 font-medium">
                  Mitigation
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              <tr>
                <td className="py-3 px-4 text-white/50">No app store distribution</td>
                <td className="py-3 px-4">Users must visit the URL directly or use the install prompt</td>
                <td className="py-3 px-4">Bookmark the URL or share the link with others</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-white/50">No push notifications on iOS</td>
                <td className="py-3 px-4">Cannot send alert-style notifications on iPhone or iPad</td>
                <td className="py-3 px-4">Open the app periodically to check for updates</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-white/50">Limited iOS caching</td>
                <td className="py-3 px-4">iOS may clear cached data after ~7 days of inactivity</td>
                <td className="py-3 px-4">Reopen the app at least once per week while online</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-white/50">No background sync on iOS</td>
                <td className="py-3 px-4">Data does not sync when the app is closed</td>
                <td className="py-3 px-4">Sync happens when the app is reopened and online</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-white/50">Firefox desktop cannot install</td>
                <td className="py-3 px-4">No standalone window or offline mode in Firefox on desktop</td>
                <td className="py-3 px-4">Use Chrome or Edge for the full PWA experience</td>
              </tr>
            </tbody>
          </table>
        </div>
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
              <strong className="text-white/60">Using HTTP instead of HTTPS</strong> — PWA installation requires a
              secure connection. The install prompt will not appear on
              <InlineCode>http://</InlineCode> URLs.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Expecting app store presence</strong> — The app is installed via the
              browser, not from the App Store or Play Store. Do not search for it
              there.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Using an outdated browser</strong> — Browsers older than Chrome 90, Edge 90,
              or Safari 17.2 may not support the service worker or manifest
              correctly.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Assuming iOS PWA equals native app</strong> — iOS restricts several PWA
              features including push notifications, background sync, and badge
              counts. The web version may be more reliable on iOS.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Not waiting for page load before installing</strong> — The browser
              verifies PWA eligibility after the page loads. Tapping install
              before the page finishes may fail silently.
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
              <InlineCode>savan.sp-net.in</InlineCode> to your bookmarks or
              favorites for quick access regardless of installation status.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Start with web, install later</strong> — Use the web version first.
              Install as a PWA once you know you will use the app regularly.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Keep your browser updated</strong> — PWA features depend on browser
              support. Update Chrome, Edge, or Safari to the latest version for
              the best experience.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Check DevTools for installability</strong> — In Chrome, open{" "}
              <InlineCode>Application → Manifest</InlineCode> in DevTools to
              confirm the PWA manifest is loaded and all install criteria are met.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Choose the right platform guide</strong> — Follow the
              platform-specific guide (Android, iOS, Web) for detailed
              installation steps rather than guessing.
            </span>
          </li>
        </ul>
      </section>

      <section id="platform-guides">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Platform-Specific Guides
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Choose the guide that matches your device for step-by-step installation
          instructions.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/docs/installation/web"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Web Browser</p>
            <p className="text-[13px] text-white/30">Use the app directly in your browser.</p>
          </Link>
          <Link
            href="/docs/installation/pwa"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">PWA Install</p>
            <p className="text-[13px] text-white/30">Install as a Progressive Web App.</p>
          </Link>
          <Link
            href="/docs/installation/android"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Android</p>
            <p className="text-[13px] text-white/30">Install on Android devices.</p>
          </Link>
          <Link
            href="/docs/installation/ios"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">iOS / iPadOS</p>
            <p className="text-[13px] text-white/30">Install on iPhone and iPad.</p>
          </Link>
        </div>
      </section>
    </DocPage>
  );
}
