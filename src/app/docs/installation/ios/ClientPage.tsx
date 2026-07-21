"use client";

import Link from "next/link";
import {
  DocPage,
  Callout,
  InlineCode,
} from "@/components/docs/DocLayout";

const toc = [
  { id: "safari-installation", label: "Safari Installation" },
  { id: "why-no-automatic-prompt", label: "Why No Automatic Prompt" },
  { id: "iphone-vs-ipad", label: "iPhone vs iPad" },
  { id: "verifying-installation", label: "Verifying Installation" },
  { id: "ios-limitations", label: "Limitations on iOS" },
  { id: "updating-and-uninstalling", label: "Updating and Uninstalling" },
  { id: "troubleshooting", label: "Troubleshooting" },
  { id: "common-mistakes", label: "Common Mistakes" },
  { id: "best-practices", label: "Best Practices" },
  { id: "related", label: "Related" },
];

export default function ClientPage() {
  return (
    <DocPage
      title="iOS"
      description="Install the Portfolio App on iPhone and iPad for an app-like experience using Safari."
      toc={toc}
      section="Installation"
    >
      {/* ── Safari Installation ─────────────────────────── */}
      <section id="safari-installation">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          Safari Installation
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          On iOS and iPadOS, the Portfolio App is installed through Safari using
          the &quot;Add to Home Screen&quot; feature. Follow these steps:
        </p>
        <ol className="space-y-3 text-[14px] text-white/40 list-decimal list-inside">
          <li>
            Open <strong className="text-white/60">Safari</strong> on your iPhone
            or iPad.
          </li>
          <li>
            Navigate to{" "}
            <InlineCode>savan.sp-net.in</InlineCode> in the
            address bar.
          </li>
          <li>
            Wait for the page to fully load.
          </li>
          <li>
            Tap the <strong className="text-white/60">Share</strong> button —
            the square icon with an arrow pointing upward, located in the
            center of the bottom toolbar (iPhone) or the left side of the
            address bar (iPad).
          </li>
          <li>
            Scroll down in the share sheet and tap{" "}
            <InlineCode>Add to Home Screen</InlineCode>. It has a plus icon in
            a rounded square.
          </li>
          <li>
            You will see a preview of the app icon and name. Edit the name if
            desired (the default is &quot;Portfolio&quot;).
          </li>
          <li>
            Tap <strong className="text-white/60">Add</strong> in the top-right
            corner.
          </li>
          <li>
            Safari will close and the app icon will appear on your home screen.
          </li>
        </ol>

        <Callout type="tip" title="Safari Only">
          You must use Safari — not Chrome, Firefox, or any other browser on
          iOS. Only Safari supports the Add to Home Screen functionality for
          PWAs on iOS and iPadOS. Other browsers on iOS use the WebKit engine
          but do not expose the A2HS API.
        </Callout>
      </section>

      {/* ── Why No Automatic Prompt ─────────────────────── */}
      <section id="why-no-automatic-prompt">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Why No Automatic Prompt on iOS
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Unlike Android and desktop Chrome, Safari on iOS does not show an
          automatic install banner for PWAs. This is a platform limitation
          imposed by Apple. There is no browser API available on iOS that
          triggers a native install dialog.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The only way to install a PWA on iOS is through the manual{" "}
          <InlineCode>Add to Home Screen</InlineCode> flow described above.
          This is consistent across all PWAs on the platform, not specific to
          this app.
        </p>

        <Callout type="warning" title="iOS Platform Limitation">
          Apple restricts PWA capabilities on iOS. While the app icon and
          standalone display work, features like push notifications, background
          sync, and periodic updates are not available. This is an Apple policy,
          not a limitation of the app itself.
        </Callout>
      </section>

      {/* ── iPhone vs iPad ──────────────────────────────── */}
      <section id="iphone-vs-ipad">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          iPhone vs iPad Differences
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The installation process is identical on both iPhone and iPad, but
          there are minor UI differences:
        </p>

        <div className="overflow-x-auto my-6 rounded-xl border border-white/[0.06]">
          <table className="w-full text-[13px] text-white/40 border-collapse">
            <thead>
              <tr className="bg-white/[0.02]">
                <th className="text-left py-3 px-4 text-white/50 font-medium">
                  Aspect
                </th>
                <th className="text-left py-3 px-4 text-white/50 font-medium">
                  iPhone
                </th>
                <th className="text-left py-3 px-4 text-white/50 font-medium">
                  iPad
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              <tr>
                <td className="py-3 px-4 text-white/50">Share button</td>
                <td className="py-3 px-4">Bottom toolbar center</td>
                <td className="py-3 px-4">Left of address bar</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-white/50">Layout</td>
                <td className="py-3 px-4">Mobile-optimized</td>
                <td className="py-3 px-4">Adapts to wider viewport</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-white/50">Standalone mode</td>
                <td className="py-3 px-4">Full screen</td>
                <td className="py-3 px-4">Full screen with floating window support</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-white/50">Split View</td>
                <td className="py-3 px-4">N/A</td>
                <td className="py-3 px-4">Supported in iPadOS 16+</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Verifying Installation ──────────────────────── */}
      <section id="verifying-installation">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Verifying Installation
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          After adding to your home screen, confirm the installation:
        </p>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              The Portfolio icon should appear on your home screen alongside your
              other apps.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Tap the icon — the app should open with a splash screen and run in{" "}
              <strong className="text-white/60">standalone mode</strong> (no
              Safari address bar or bottom toolbar).
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              The top status bar should blend with the app background, confirming
              standalone display.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              If the app opens inside Safari instead of its own window, the Add
              to Home Screen step may not have completed correctly. Try removing
              the shortcut and repeating the process.
            </span>
          </li>
        </ul>
      </section>

      {/* ── Limitations on iOS ──────────────────────────── */}
      <section id="ios-limitations">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Limitations on iOS
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Due to Apple&apos;s restrictions on PWA capabilities, several features
          are not available on iOS. These limitations apply to every PWA on the
          platform, not just this app:
        </p>

        <div className="overflow-x-auto my-6 rounded-xl border border-white/[0.06]">
          <table className="w-full text-[13px] text-white/40 border-collapse">
            <thead>
              <tr className="bg-white/[0.02]">
                <th className="text-left py-3 px-4 text-white/50 font-medium">
                  Feature
                </th>
                <th className="text-left py-3 px-4 text-white/50 font-medium">
                  iOS Status
                </th>
                <th className="text-left py-3 px-4 text-white/50 font-medium">
                  Alternative
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              <tr>
                <td className="py-3 px-4 text-white/50">Push notifications</td>
                <td className="py-3 px-4 text-red-400/70">Not available</td>
                <td className="py-3 px-4">Use web version for real-time updates</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-white/50">Background sync</td>
                <td className="py-3 px-4 text-red-400/70">Not available</td>
                <td className="py-3 px-4">Data syncs when app is open</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-white/50">Periodic background fetch</td>
                <td className="py-3 px-4 text-red-400/70">Not available</td>
                <td className="py-3 px-4">Open the app to check for updates</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-white/50">Badge notifications</td>
                <td className="py-3 px-4 text-red-400/70">Not available</td>
                <td className="py-3 px-4">N/A</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-white/50">Standalone display</td>
                <td className="py-3 px-4 text-emerald-400/70">Available</td>
                <td className="py-3 px-4">—</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-white/50">Offline caching</td>
                <td className="py-3 px-4 text-amber-400/70">Limited</td>
                <td className="py-3 px-4">Cache cleared after ~7 days of inactivity</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-[14px] text-white/40 leading-relaxed mt-4 mb-4">
          The most significant limitation is the cache eviction policy. iOS
          Safari maintains an expiration timer for PWA caches. If the app is
          not opened for approximately 7 days, the system clears the cached
          assets. When the app is opened again, it re-downloads everything from
          the server, which results in a slower first launch.
        </p>

        <Callout type="warning" title="Important">
          iOS aggressively manages PWA memory and may clear cached data if the
          device is low on storage or if the app has not been opened in
          over a week. If the app feels slow or data appears missing after a
          period of inactivity, reopen it while connected to the
          internet to re-cache assets.
        </Callout>
      </section>

      {/* ── Updating and Uninstalling ────────────────────── */}
      <section id="updating-and-uninstalling">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Updating and Uninstalling
        </h2>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Updating
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          PWA updates on iOS happen automatically when you open the app. The
          service worker fetches the latest version in the background. However,
          because of iOS caching behavior, you may need to:
        </p>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>Close the app completely (swipe up from the app switcher).</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>Wait a few seconds, then reopen the app.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              If changes still do not appear, clear Safari cache:{" "}
              <InlineCode>Settings -&gt; Safari -&gt; Clear History and Website Data</InlineCode>.
            </span>
          </li>
        </ul>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Uninstalling
        </h3>
        <ol className="space-y-3 text-[14px] text-white/40 list-decimal list-inside">
          <li>
            Locate the Portfolio icon on your home screen.
          </li>
          <li>
            <strong className="text-white/60">Long-press</strong> the icon until
            a context menu appears.
          </li>
          <li>
            Tap <InlineCode>Remove App</InlineCode>.
          </li>
          <li>
            Select <InlineCode>Delete App</InlineCode> and confirm.
          </li>
        </ol>
        <p className="text-[14px] text-white/40 leading-relaxed mt-4">
          This removes the home screen shortcut and clears cached data. No
          server-side data is affected.
        </p>
      </section>

      {/* ── Troubleshooting ─────────────────────────────── */}
      <section id="troubleshooting">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Troubleshooting
        </h2>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          App opens in Safari instead of its own window
        </h3>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              This usually means the &quot;Add to Home Screen&quot; step was not
              completed correctly. The shortcut may have been created as a
              regular Safari bookmark instead.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              Delete the shortcut from your home screen and repeat the
              installation process from the beginning.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              Ensure you waited for the page to fully load before tapping the
              Share button. The manifest needs to load before the A2HS option
              works correctly.
            </span>
          </li>
        </ul>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          App feels slow or loads blank content
        </h3>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              The cached assets may have been evicted by iOS. Open the app while
              connected to the internet to re-download everything.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              Clear Safari data:{" "}
              <InlineCode>Settings -&gt; Safari -&gt; Clear History and Website Data</InlineCode>,
              then reopen the app.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              Check your device storage. If storage is critically low, iOS may
              aggressively evict PWA caches.
            </span>
          </li>
        </ul>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          &quot;Add to Home Screen&quot; option does not appear
        </h3>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              Verify you are using Safari, not Chrome or another browser.
              Third-party browsers on iOS do not support PWA installation.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              Scroll down in the Share sheet — the option is near the bottom and
              may be hidden if you have many Share extensions.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              Ensure you are on iOS 17.2 or later. Older versions may not
              recognize the PWA manifest.
            </span>
          </li>
        </ul>
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
              <strong className="text-white/60">Using Chrome on iOS</strong> —
              Chrome, Firefox, Brave, and other iOS browsers cannot install
              PWAs. Only Safari supports the Add to Home Screen flow. All iOS
              browsers use WebKit under the hood, but the A2HS API is
              restricted to Safari.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Incomplete Add to Home Screen</strong> —
              If you tap Add before the page fully loads, the shortcut may
              be created as a regular bookmark instead of a PWA. Always wait
              for the page to finish loading before tapping the Share button.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Expecting push notifications</strong> —
              iOS does not support push notifications for PWAs. Do not expect
              alert-style notifications from the installed app.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Not reopening the app for over a week</strong> —
              iOS clears PWA cache after ~7 days of inactivity. If you do not
              open the app regularly, it will lose its cached data and require
              a full re-download.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Confusing &quot;Add to Reading List&quot; with &quot;Add to Home Screen&quot;</strong> —
              The Share sheet contains many options. Make sure you tap the one
              with the plus icon in a rounded square, not the reading list or
              bookmark options.
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
              <strong className="text-white/60">Keep Safari updated</strong> — PWA
              support on iOS depends on the WebKit engine version. Update to
              iOS 17.2 or later via Settings -&gt; General -&gt; Software Update.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Reopen the app weekly</strong> —
              Open the app at least once every 7 days while connected to the
              internet. This prevents iOS from evicting the cached assets and
              keeps the app running at full speed.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Wait for full page load</strong> — Before
              tapping the Share button, wait until all content is visible on
              screen. This ensures the PWA manifest is fully loaded and the
              Add to Home Screen option works correctly.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Use the web version for full features</strong> —
              If you need push notifications or background sync, use the app
              directly in Safari rather than the installed version. The web
              version in Safari has access to more browser APIs than the
              standalone PWA.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Check device storage</strong> —
              iOS may clear PWA data more aggressively when storage is low.
              Keep at least 1 GB of free space for optimal cache retention.
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
            <p className="text-[13px] text-white/30">Progressive web app details and cross-platform behavior.</p>
          </Link>
          <Link
            href="/docs/features/offline"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Offline Experience</p>
            <p className="text-[13px] text-white/30">How cached content works on iOS.</p>
          </Link>
          <Link
            href="/docs/reference/platform-support"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Platform Support</p>
            <p className="text-[13px] text-white/30">iOS-specific limitations and feature support.</p>
          </Link>
        </div>
      </section>
    </DocPage>
  );
}
