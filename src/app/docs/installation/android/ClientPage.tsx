"use client";

import Link from "next/link";
import {
  DocPage,
  Callout,
  InlineCode,
} from "@/components/docs/DocLayout";

const toc = [
  { id: "chrome-installation", label: "Chrome Installation" },
  { id: "samsung-internet", label: "Samsung Internet" },
  { id: "verifying-installation", label: "Verifying Installation" },
  { id: "first-launch-behavior", label: "First Launch Behavior" },
  { id: "android-pwa-behavior", label: "Android-Specific PWA Behavior" },
  { id: "updating-the-app", label: "Updating the App" },
  { id: "uninstalling", label: "Uninstalling" },
  { id: "troubleshooting", label: "Troubleshooting" },
  { id: "best-practices", label: "Best Practices" },
  { id: "related", label: "Related" },
];

export default function ClientPage() {
  return (
    <DocPage
      title="Android"
      description="Step-by-step guide to installing and managing the Portfolio App on Android devices."
      toc={toc}
      section="Installation"
    >
      {/* ── Chrome Installation ─────────────────────────── */}
      <section id="chrome-installation">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          Chrome Installation
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Google Chrome on Android supports PWA installation natively. Follow
          these steps to install the Portfolio App:
        </p>
        <ol className="space-y-3 text-[14px] text-white/40 list-decimal list-inside">
          <li>
            Open <strong className="text-white/60">Google Chrome</strong> on
            your Android device.
          </li>
          <li>
            Navigate to{" "}
            <InlineCode>savan.sp-net.in</InlineCode> in the
            address bar.
          </li>
          <li>
            Wait for the page to fully load. Chrome will verify PWA
            requirements in the background.
          </li>
          <li>
            An install banner will appear at the bottom of the screen with the
            message &quot;Add Portfolio to Home screen&quot;. Tap{" "}
            <strong className="text-white/60">Install</strong>.
          </li>
          <li>
            If the banner does not appear, tap the{" "}
            <strong className="text-white/60">three-dot menu</strong> (top
            right) and select <InlineCode>Install app</InlineCode> or{" "}
            <InlineCode>Add to Home screen</InlineCode>.
          </li>
          <li>
            Confirm the installation by tapping{" "}
            <strong className="text-white/60">Install</strong> on the system
            dialog.
          </li>
          <li>
            The app icon will appear on your home screen. You may also find it
            in your app drawer.
          </li>
        </ol>

        <Callout type="tip" title="Chrome Tip">
          If you do not see the install option, ensure Chrome is updated to
          version 90 or later. Go to Chrome menu → Settings → About Chrome to
          check your version.
        </Callout>
      </section>

      {/* ── Samsung Internet ────────────────────────────── */}
      <section id="samsung-internet">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Samsung Internet
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Samsung Internet is the default browser on most Samsung Galaxy devices
          and also supports PWA installation.
        </p>
        <ol className="space-y-3 text-[14px] text-white/40 list-decimal list-inside">
          <li>
            Open <strong className="text-white/60">Samsung Internet</strong> on
            your device.
          </li>
          <li>
            Navigate to{" "}
            <InlineCode>savan.sp-net.in</InlineCode>.
          </li>
          <li>
            Tap the <strong className="text-white/60">hamburger menu</strong>{" "}
            (three horizontal lines) at the bottom of the screen.
          </li>
          <li>
            Select <InlineCode>Add page to</InlineCode>.
          </li>
          <li>
            Choose <InlineCode>Home screen</InlineCode>.
          </li>
          <li>
            Confirm the name and tap <strong className="text-white/60">Add</strong>.
          </li>
        </ol>

        <Callout type="info" title="Samsung Internet Version">
          Ensure Samsung Internet is version 15 or later for full PWA support.
          Update via the Galaxy Store if needed.
        </Callout>
      </section>

      {/* ── Verifying Installation ──────────────────────── */}
      <section id="verifying-installation">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Verifying the App Is Installed
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          After installation, verify it was successful:
        </p>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Check your <strong className="text-white/60">home screen</strong>{" "}
              or <strong className="text-white/60">app drawer</strong> for the
              Portfolio App icon.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Open the app — it should launch in a{" "}
              <strong className="text-white/60">standalone window</strong> without
              the Chrome address bar or navigation controls.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              The app title bar should display the app name, and the status bar
              color should match the app theme.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              You can also go to{" "}
              <InlineCode>Settings → Apps</InlineCode> and look for
              &quot;Portfolio&quot; in the list.
            </span>
          </li>
        </ul>
      </section>

      {/* ── First Launch Behavior ───────────────────────── */}
      <section id="first-launch-behavior">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          First Launch Behavior
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The first time you open the installed app, several things happen:
        </p>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Service worker activates</strong> —
              The service worker registers and begins caching static assets
              (JavaScript, CSS, images) in the background. This is a one-time
              process that takes a few seconds.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Standalone window opens</strong> — The
              app loads in its own window without the Chrome UI. The status bar
              color matches the app&apos;s <InlineCode>theme_color</InlineCode> from the
              manifest.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">App appears in Recent Apps</strong> — The
              app shows up in the Android task switcher (Recent Apps) as its
              own entry, separate from Chrome.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Notifications bar shows app name</strong> —
              The Android notification bar displays &quot;Portfolio&quot; instead
              of &quot;Chrome&quot;, confirming the app is running independently.
            </span>
          </li>
        </ul>

        <Callout type="note" title="Initial Load May Be Slower">
          The first launch takes slightly longer than subsequent launches
          because the service worker is downloading and caching assets. After
          the initial load, the app will load from cache on future launches.
        </Callout>
      </section>

      {/* ── Android-Specific PWA Behavior ───────────────── */}
      <section id="android-pwa-behavior">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Android-Specific PWA Behavior
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The installed PWA behaves differently from a regular Chrome tab in
          several ways on Android:
        </p>

        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Splash screen</strong> — A branded
              splash screen appears while the app loads, displaying the app icon
              and background color from the manifest.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Separate Recent Apps entry</strong> — The
              PWA appears as its own card in the task switcher, not as a Chrome
              tab. This lets you switch between the PWA and other apps
              independently.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Notification bar integration</strong> — The
              Android status bar shows the app name and uses the theme color.
              When the app is in the foreground, the notification bar is
              styled to match.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Standalone display mode</strong> — The
              browser address bar, navigation buttons, and tab strip are
              completely hidden. The app fills the entire screen.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">App shortcuts</strong> — On Android 7.1+
              and above, long-pressing the app icon may show app shortcuts
              defined in the manifest, providing quick access to specific
              sections.
            </span>
          </li>
        </ul>
      </section>

      {/* ── Updating the App ────────────────────────────── */}
      <section id="updating-the-app">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Updating the App
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          PWA updates on Android are handled automatically by the service
          worker:
        </p>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              The service worker checks for new versions every time you open the
              app.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              If an update is available, it is downloaded in the background.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              The next time you open the app (or after a brief prompt), the new
              version is served.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              No action is required — updates apply automatically.
            </span>
          </li>
        </ul>

        <Callout type="tip" title="Force Update">
          To force an immediate update, close the app completely (swipe it away
          from recent apps), then reopen it. The service worker will check for
          updates on launch.
        </Callout>
      </section>

      {/* ── Uninstalling ────────────────────────────────── */}
      <section id="uninstalling">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Uninstalling
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          To remove the app from your device:
        </p>
        <ol className="space-y-3 text-[14px] text-white/40 list-decimal list-inside">
          <li>
            Locate the Portfolio App icon on your home screen or app drawer.
          </li>
          <li>
            <strong className="text-white/60">Long-press</strong> the icon.
          </li>
          <li>
            Tap <InlineCode>Uninstall</InlineCode> or drag the icon to the{" "}
            <strong className="text-white/60">Uninstall</strong> area at the top
            of the screen.
          </li>
          <li>
            Confirm the uninstallation when prompted.
          </li>
        </ol>
        <p className="text-[14px] text-white/40 leading-relaxed mt-4">
          Uninstalling removes the app icon and clears cached data. It does not
          affect any data stored on the server.
        </p>
      </section>

      {/* ── Troubleshooting ─────────────────────────────── */}
      <section id="troubleshooting">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Troubleshooting
        </h2>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Install banner does not appear
        </h3>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>Ensure you are using Chrome 90+ or Samsung Internet 15+.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>Check that you are on HTTPS — the app requires a secure connection.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>Clear the browser cache and reload the page: Chrome menu → Settings → Privacy → Clear browsing data.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>Visit <InlineCode>chrome://flags</InlineCode> and ensure &quot;Progressive Web App&quot; features are enabled (they are enabled by default).</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>If you previously dismissed the install banner, use the three-dot menu → &quot;Install app&quot; instead.</span>
          </li>
        </ul>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          App shows a blank screen
        </h3>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>Clear the app data: <InlineCode>Settings → Apps → Portfolio → Storage → Clear Data</InlineCode>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>Ensure you have a stable internet connection for the initial load.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>Try uninstalling and reinstalling the app.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>Check if Chrome is up to date: Chrome menu → Settings → About Chrome.</span>
          </li>
        </ul>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          App icon is missing
        </h3>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>Some Android launchers hide newly installed icons. Check your app drawer instead of just the home screen.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>Long-press the home screen and select &quot;Widgets&quot; to add the app shortcut manually.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>If using a third-party launcher, the PWA may appear in a separate &quot;Web apps&quot; category.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>Some launchers (e.g., Nova Launcher) may place PWAs in a different section. Check the launcher settings.</span>
          </li>
        </ul>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Updates are not applying
        </h3>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>Close the app completely (swipe it away from Recent Apps), then reopen it.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>Check <InlineCode>Settings → Apps → Portfolio → Battery</InlineCode> and set it to &quot;Unrestricted&quot; to prevent the system from restricting the service worker.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>Disable battery optimization for the app if your device has aggressive power management.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>As a last resort, uninstall and reinstall the app to get a fresh service worker.</span>
          </li>
        </ul>

        <Callout type="note" title="Battery Optimization">
          On some Android devices, battery optimization may restrict the
          service worker. If updates are not appearing, go to{" "}
          <InlineCode>Settings → Apps → Portfolio → Battery</InlineCode> and
          set it to &quot;Unrestricted&quot;.
        </Callout>
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
              <strong className="text-white/60">Keep Chrome updated</strong> — PWA
              features depend on the browser engine. Update Chrome via the Play
              Store to ensure compatibility with the latest service worker APIs.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Disable battery optimization</strong> — Go
              to <InlineCode>Settings → Apps → Portfolio → Battery</InlineCode>{" "}
              and select &quot;Unrestricted&quot;. This prevents Android from
              killing the service worker in the background.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Close and reopen to force updates</strong> —
              If you suspect the app is outdated, swipe it away from Recent
              Apps and reopen. This triggers the service worker update cycle
              immediately.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Use Chrome over Samsung Internet</strong> —
              While both support PWA installation, Chrome generally receives
              service worker updates faster and has better DevTools for
              debugging.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Check Settings → Apps for details</strong> —
              The installed PWA appears in Android Settings → Apps, where you
              can manage storage, permissions, and battery settings just like
              any native app.
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
            <p className="text-[13px] text-white/30">How progressive web apps work across platforms.</p>
          </Link>
          <Link
            href="/docs/features/offline"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Offline Experience</p>
            <p className="text-[13px] text-white/30">How caching and offline access work.</p>
          </Link>
          <Link
            href="/docs/reference/platform-support"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Platform Support</p>
            <p className="text-[13px] text-white/30">Browser and device compatibility matrix.</p>
          </Link>
        </div>
      </section>
    </DocPage>
  );
}
