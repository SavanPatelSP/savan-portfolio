"use client";

import Link from "next/link";
import {
  DocPage,
  Callout,
  CodeBlock,
  InlineCode,
} from "@/components/docs/DocLayout";

const toc = [
  { id: "what-is-a-pwa", label: "What Is a PWA" },
  { id: "how-pwa-installation-works", label: "How PWA Installation Works" },
  { id: "desktop-installation", label: "Desktop Installation" },
  { id: "mobile-installation", label: "Mobile Installation" },
  { id: "verifying-installation", label: "Verifying Installation" },
  { id: "uninstalling", label: "Uninstalling" },
  { id: "limitations", label: "Limitations" },
  { id: "common-mistakes", label: "Common Mistakes" },
  { id: "best-practices", label: "Best Practices" },
  { id: "related", label: "Related" },
];

export default function ClientPage() {
  return (
    <DocPage
      title="PWA Installation"
      description="Install the Portfolio App as a Progressive Web App for a native-like experience on any device."
      toc={toc}
      section="Installation"
    >
      {/* ── What Is a PWA ───────────────────────────────── */}
      <section id="what-is-a-pwa">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          What Is a PWA
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          A Progressive Web App (PWA) is a web application that uses a service
          worker and a Web App Manifest to deliver capabilities traditionally
          associated with native apps. PWAs are:
        </p>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Installable</strong> — Add to your
              home screen or desktop without an app store.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Offline-capable</strong> — Core
              functionality works without an internet connection.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Up-to-date</strong> — The service
              worker automatically fetches new versions in the background.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Responsive</strong> — Adapts to any
              screen size or orientation.
            </span>
          </li>
        </ul>
      </section>

      {/* ── How PWA Installation Works ──────────────────── */}
      <section id="how-pwa-installation-works">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          How PWA Installation Works
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The Portfolio App includes a Web App Manifest that defines the
          app&apos;s name, icons, theme color, and display mode. When your
          browser detects a valid manifest with a registered service worker, it
          may show an install prompt or make the install option available in its
          menu.
        </p>

        <CodeBlock
          filename="manifest.json"
          language="json"
          code={`{
  "name": "Savan Patel — Portfolio",
  "short_name": "Portfolio",
  "description": "Engineering portfolio and software distribution",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0a0a0a",
  "theme_color": "#0a0a0a",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}`}
        />

        <p className="text-[14px] text-white/40 leading-relaxed mt-4">
          The <InlineCode>display: standalone</InlineCode> field tells the
          browser to open the app in its own window, removing the address bar
          and navigation controls. The browser also uses the manifest to
          determine the app name, icon, and theme color for the install dialog
          and home screen shortcut.
        </p>
      </section>

      {/* ── Desktop Installation ────────────────────────── */}
      <section id="desktop-installation">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Desktop Installation
        </h2>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Chrome / Edge
        </h3>
        <ol className="space-y-3 text-[14px] text-white/40 list-decimal list-inside">
          <li>Navigate to <InlineCode>savan.sp-net.in</InlineCode>.</li>
          <li>
            Look for the install icon in the address bar — a small monitor with
            a plus sign, or a download-style icon.
          </li>
          <li>Click the icon, then select &quot;Install&quot;.</li>
          <li>
            Alternatively, open the Chrome/Edge menu (three dots) and click
            &quot;Install Portfolio&quot;.
          </li>
          <li>
            The app opens in its own window. A shortcut is created on your
            desktop and in your Start menu or Applications folder.
          </li>
        </ol>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Safari (macOS 14.2+)
        </h3>
        <ol className="space-y-3 text-[14px] text-white/40 list-decimal list-inside">
          <li>Navigate to <InlineCode>savan.sp-net.in</InlineCode> in Safari.</li>
          <li>
            Click <InlineCode>File</InlineCode> in the menu bar, then select{" "}
            <InlineCode>Add to Dock</InlineCode>.
          </li>
          <li>
            Confirm the name and click &quot;Add&quot;. The app appears in your
            Dock and Launchpad.
          </li>
        </ol>

        <Callout type="note" title="Firefox on Desktop">
          Firefox does not support PWA installation on any desktop platform.
          The install prompt will not appear. You can still use the app as a
          regular website in Firefox.
        </Callout>
      </section>

      {/* ── Mobile Installation ─────────────────────────── */}
      <section id="mobile-installation">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Mobile Installation
        </h2>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Android — Chrome
        </h3>
        <ol className="space-y-3 text-[14px] text-white/40 list-decimal list-inside">
          <li>Open Chrome and navigate to <InlineCode>savan.sp-net.in</InlineCode>.</li>
          <li>
            A banner may appear at the bottom of the screen saying &quot;Add
            Portfolio to Home screen&quot;. Tap &quot;Install&quot;.
          </li>
          <li>
            If no banner appears, tap the three-dot menu, then
            &quot;Install app&quot; or &quot;Add to Home screen&quot;.
          </li>
          <li>
            Confirm the installation. The app icon appears on your home screen.
          </li>
        </ol>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Android — Samsung Internet
        </h3>
        <ol className="space-y-3 text-[14px] text-white/40 list-decimal list-inside">
          <li>Open Samsung Internet and navigate to the app URL.</li>
          <li>
            Tap the hamburger menu (three lines), then &quot;Add page to&quot;
            → &quot;Home screen&quot;.
          </li>
          <li>Confirm the installation prompt.</li>
        </ol>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          iOS / iPadOS — Safari
        </h3>
        <ol className="space-y-3 text-[14px] text-white/40 list-decimal list-inside">
          <li>Open Safari and navigate to <InlineCode>savan.sp-net.in</InlineCode>.</li>
          <li>
            Tap the <InlineCode>Share</InlineCode> button (the square with an
            arrow pointing up).
          </li>
          <li>
            Scroll down and tap <InlineCode>Add to Home Screen</InlineCode>.
          </li>
          <li>
            Edit the name if desired, then tap <InlineCode>Add</InlineCode> in
            the top right.
          </li>
        </ol>

        <Callout type="warning" title="iOS Limitations">
          iOS does not support the full PWA install prompt. The Add to Home
          Screen action creates a home screen shortcut but does not enable
          push notifications, background sync, or periodic background updates.
          See the iOS installation guide for full details.
        </Callout>
      </section>

      {/* ── Verifying Installation ──────────────────────── */}
      <section id="verifying-installation">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Verifying Installation
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          You can confirm the app is installed correctly by checking the
          following:
        </p>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Desktop</strong> — The app opens in
              its own window without browser tabs or address bar. A shortcut
              exists on your desktop or in your Start menu / Applications folder.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Android</strong> — The app icon
              appears on your home screen or in your app drawer. Opening it loads
              the app in a standalone window.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">iOS</strong> — The icon appears on
              your home screen. Opening it shows a splash screen before loading
              the app in standalone mode.
            </span>
          </li>
        </ul>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Using Chrome DevTools
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          For a technical verification, you can check the Chrome DevTools:
        </p>
        <ol className="space-y-3 text-[14px] text-white/40 list-decimal list-inside">
          <li>Open Chrome DevTools with <InlineCode>F12</InlineCode> or <InlineCode>Cmd/Ctrl + Option + I</InlineCode>.</li>
          <li>
            Go to the <InlineCode>Application</InlineCode> tab.
          </li>
          <li>
            Under <InlineCode>Manifest</InlineCode>, verify that the manifest
            is loaded and displays the app name, icons, and theme color.
          </li>
          <li>
            Under <InlineCode>Service Workers</InlineCode>, confirm a service
            worker is registered and active. Check the &quot;Status&quot; field
            — it should say &quot;activated and is running&quot;.
          </li>
          <li>
            Under <InlineCode>Storage</InlineCode>, check how much data the
            service worker has cached.
          </li>
        </ol>

        <Callout type="tip" title="Installability Check">
          In Chrome DevTools, the <InlineCode>Lighthouse</InlineCode> tab can
          run an audit to confirm the app meets all PWA installability
          criteria, including valid manifest, service worker, and HTTPS.
        </Callout>
      </section>

      {/* ── Uninstalling ────────────────────────────────── */}
      <section id="uninstalling">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Uninstalling
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Uninstalling the PWA removes the app shortcut and clears cached
          data. It does not affect your browser history or bookmarks.
        </p>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Chrome / Edge (Desktop)
        </h3>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>Open the installed app.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              Click the three-dot menu inside the app window and select{" "}
              <InlineCode>Uninstall Portfolio</InlineCode>.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              Alternatively, go to{" "}
              <InlineCode>chrome://apps</InlineCode>, right-click the app icon,
              and select &quot;Remove from Chrome&quot;.
            </span>
          </li>
        </ul>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Android
        </h3>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>Long-press the app icon on your home screen or app drawer.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>Drag it to the &quot;Uninstall&quot; area or tap &quot;Uninstall&quot;.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>Confirm the uninstallation when prompted.</span>
          </li>
        </ul>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          iOS
        </h3>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>Long-press the app icon on your home screen.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>Tap &quot;Remove App&quot; → &quot;Delete App&quot;.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>Confirm the deletion.</span>
          </li>
        </ul>
      </section>

      {/* ── Limitations ─────────────────────────────────── */}
      <section id="limitations">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Limitations
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          PWA technology has platform-specific constraints that affect what the
          app can do after installation:
        </p>

        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">No app store presence</strong> — The
              app is not listed in any app store. Users must visit the URL and
              install through the browser, which requires awareness that the
              option exists.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Platform-dependent features</strong> —
              Push notifications, background sync, and periodic updates are
              available on Android and desktop but not on iOS. Firefox on
              desktop does not support PWA installation at all.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Storage limits</strong> — Browsers
              may evict cached data when device storage is low. The app will
              re-cache assets on the next visit, but offline content may be
              temporarily unavailable.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">No system-level integration</strong> —
              PWAs cannot access hardware features like Bluetooth, NFC, or
              serial ports. They also cannot register as handlers for file
              types or URI schemes.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Update latency</strong> — Unlike
              native apps that update through the store, PWA updates depend on
              the service worker lifecycle. A user may run an older version
              until the service worker activates the update.
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
              <strong className="text-white/60">Dismissing the install prompt</strong> —
              On Chrome, the install banner appears once and may not reappear
              if dismissed. If you accidentally dismissed it, use the three-dot
              menu → &quot;Install Portfolio&quot; instead.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Using the wrong browser on iOS</strong> —
              Only Safari supports the Add to Home Screen flow for PWAs on
              iOS. Chrome, Firefox, and other browsers on iOS cannot install
              PWAs.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">HTTP instead of HTTPS</strong> — The
              install prompt requires a secure context. The app is only
              available over HTTPS, so this should not occur under normal
              circumstances, but self-signed certificates or corporate proxies
              may interfere.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Not waiting for page load</strong> — The
              browser verifies PWA criteria after the page fully loads. Attempting
              to install before the manifest and service worker are registered
              may result in the option not appearing.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Expecting native app behavior on iOS</strong> —
              The iOS PWA is a standalone web shortcut, not a sandboxed native
              app. It shares the Safari browser engine and its restrictions,
              including the 7-day cache eviction policy.
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
              <strong className="text-white/60">Keep your browser updated</strong> — PWA
              features are tied to browser engine versions. Updating Chrome,
              Edge, or Safari ensures the latest service worker APIs and
              security patches are available.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Check DevTools Application tab</strong> —
              Use Chrome DevTools → Application to verify the manifest is
              loaded, the service worker is active, and cached assets are
              stored correctly.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Force an update when needed</strong> —
              Close the app completely (swipe away from recent apps on mobile,
              or quit on desktop), then reopen it. This triggers the service
              worker update check immediately.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">On iOS, reopen the app weekly</strong> —
              iOS evicts cached data after approximately 7 days of inactivity.
              Opening the app at least once per week while connected to the
              internet prevents this.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Test installability with Lighthouse</strong> —
              Run a Lighthouse audit from Chrome DevTools → Lighthouse to
              confirm the app meets all PWA criteria on your specific browser
              and device.
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
            href="/docs/installation/android"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Android Installation</p>
            <p className="text-[13px] text-white/30">Chrome and Samsung browser install steps.</p>
          </Link>
          <Link
            href="/docs/installation/ios"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">iOS Installation</p>
            <p className="text-[13px] text-white/30">Safari install and iOS-specific limitations.</p>
          </Link>
          <Link
            href="/docs/features/offline"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Offline Experience</p>
            <p className="text-[13px] text-white/30">How the service worker enables offline access.</p>
          </Link>
        </div>
      </section>
    </DocPage>
  );
}
