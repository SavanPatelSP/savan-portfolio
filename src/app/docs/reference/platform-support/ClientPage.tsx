"use client"

import { useState } from "react"
import { DocPage, Callout, InlineCode } from "@/components/docs/DocLayout"
import { APP_VERSION, LAST_UPDATED } from "@/data/documentation"

interface BrowserRow {
  name: string
  desktop: boolean
  mobile: boolean
  install: "Full" | "Manual" | "None"
  offline: boolean
  notes: string
}

interface OSRow {
  name: string
  supported: boolean
  installMethod: string
  notes: string
}

interface FeatureRow {
  feature: string
  chrome: boolean
  edge: boolean
  safari: boolean
  firefox: boolean
  opera: boolean
  samsung: boolean
}

const browsers: BrowserRow[] = [
  {
    name: "Chrome",
    desktop: true,
    mobile: true,
    install: "Full",
    offline: true,
    notes: "Best support. Auto-install prompt, push notifications, background sync. Tested on latest stable.",
  },
  {
    name: "Edge",
    desktop: true,
    mobile: true,
    install: "Full",
    offline: true,
    notes: "Full PWA support. Uses Chromium engine — identical behavior to Chrome.",
  },
  {
    name: "Safari",
    desktop: true,
    mobile: true,
    install: "Manual",
    offline: true,
    notes: "iOS: Add to Home Screen via Share menu only. No auto-install prompt. Push notifications require iOS 16.4+.",
  },
  {
    name: "Firefox",
    desktop: true,
    mobile: true,
    install: "None",
    offline: true,
    notes: "Desktop: No PWA install support (Mozilla removed it). Android: Supports Add to Home Screen.",
  },
  {
    name: "Opera",
    desktop: true,
    mobile: true,
    install: "Full",
    offline: true,
    notes: "Full PWA support on both desktop and mobile. Uses Chromium engine.",
  },
  {
    name: "Samsung Internet",
    desktop: false,
    mobile: true,
    install: "Full",
    offline: true,
    notes: "Full PWA support on Android. Install prompt available. Default browser on Samsung devices.",
  },
]

const operatingSystems: OSRow[] = [
  {
    name: "Windows",
    supported: true,
    installMethod: "Chrome / Edge install prompt",
    notes: "Taskbar pinning, windowed standalone mode. Tested on Windows 10 and 11.",
  },
  {
    name: "macOS",
    supported: true,
    installMethod: "Chrome / Edge install prompt",
    notes: "Standalone window. Safari supports Add to Dock on macOS Sonoma and later.",
  },
  {
    name: "Linux",
    supported: true,
    installMethod: "Chrome / Edge install prompt",
    notes: "Standalone window. App shortcut appears in the application menu.",
  },
  {
    name: "Android",
    supported: true,
    installMethod: "Auto-install prompt or menu",
    notes: "Full support. Home screen icon, splash screen, task switching. Tested on Android 12+.",
  },
  {
    name: "iOS",
    supported: true,
    installMethod: "Safari Share > Add to Home Screen",
    notes: "Manual install only. Push notifications on iOS 16.4+. Some Web APIs have limited support.",
  },
  {
    name: "iPadOS",
    supported: true,
    installMethod: "Safari Share > Add to Home Screen",
    notes: "Same as iOS. Adaptive layout for larger screens. Tested on iPadOS 17+.",
  },
  {
    name: "ChromeOS",
    supported: true,
    installMethod: "Chrome install prompt",
    notes: "Full PWA support. Integrates with the ChromeOS app shelf. Functions identically to desktop Chrome.",
  },
]

const features: FeatureRow[] = [
  { feature: "Installation", chrome: true, edge: true, safari: true, firefox: false, opera: true, samsung: true },
  { feature: "Offline Support", chrome: true, edge: true, safari: true, firefox: true, opera: true, samsung: true },
  { feature: "Standalone Mode", chrome: true, edge: true, safari: true, firefox: false, opera: true, samsung: true },
  { feature: "Taskbar / Shelf", chrome: true, edge: true, safari: false, firefox: false, opera: true, samsung: false },
  { feature: "Push Notifications", chrome: true, edge: true, safari: true, firefox: false, opera: true, samsung: true },
  { feature: "Auto-updates", chrome: true, edge: true, safari: true, firefox: true, opera: true, samsung: true },
  { feature: "Background Sync", chrome: true, edge: true, safari: false, firefox: false, opera: true, samsung: true },
  { feature: "Share Target", chrome: true, edge: true, safari: false, firefox: false, opera: true, samsung: true },
]

function Check() {
  return <span className="text-green-400 text-sm font-bold">✓</span>
}

function Cross() {
  return <span className="text-red-400/60 text-sm font-bold">✗</span>
}

function ManualBadge() {
  return (
    <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded text-xs font-medium">
      Manual
    </span>
  )
}

function FullBadge() {
  return (
    <span className="px-2 py-0.5 bg-green-500/20 text-green-400 border border-green-500/30 rounded text-xs font-medium">
      Full
    </span>
  )
}

function NoneBadge() {
  return (
    <span className="px-2 py-0.5 bg-red-500/20 text-red-400 border border-red-500/30 rounded text-xs font-medium">
      None
    </span>
  )
}

export default function ClientPage() {
  const [activeTab, setActiveTab] = useState<"browsers" | "os" | "features">(
    "browsers"
  )

  return (
    <DocPage
      title="Platform Support"
      description="Browser compatibility, operating system support, and feature availability matrix for the Savan Patel Portfolio PWA. Definitive reference for what works where."
      toc={[
        { id: "browsers", label: "Browser Support" },
        { id: "operating-systems", label: "Operating Systems" },
        { id: "features", label: "Feature Matrix" },
        { id: "testing", label: "Testing Methodology" },
        { id: "known-gaps", label: "Known Gaps" },
      ]}
      section="Reference"
    >
      <p className="text-[14px] text-white/40 leading-relaxed mb-4">
        Platform support is tested on the latest stable versions of each browser and
        operating system. Support status is verified using Lighthouse PWA audits, manual
        testing on physical devices, and compatibility checks against web platform
        specifications.
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveTab("browsers")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "browsers"
              ? "bg-white/20 text-white"
              : "bg-white/5 text-white/50 hover:text-white/70"
          }`}
        >
          Browser Support
        </button>
        <button
          onClick={() => setActiveTab("os")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "os"
              ? "bg-white/20 text-white"
              : "bg-white/5 text-white/50 hover:text-white/70"
          }`}
        >
          Operating Systems
        </button>
        <button
          onClick={() => setActiveTab("features")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "features"
              ? "bg-white/20 text-white"
              : "bg-white/5 text-white/50 hover:text-white/70"
          }`}
        >
          Feature Matrix
        </button>
      </div>

      {activeTab === "browsers" && (
        <section id="browsers">
          <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
            Browser Compatibility
          </h2>
          <p className="text-[14px] text-white/40 leading-relaxed mb-4">
            The table below shows PWA-specific support for each browser. &quot;Full&quot; means the
            browser supports automatic PWA installation via the beforeinstallprompt event.
            &quot;Manual&quot; means the user must install through browser menus. &quot;None&quot; means PWA
            installation is not supported at all.
          </p>
          <div className="overflow-x-auto rounded-xl border border-white/[0.06]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Browser</th>
                  <th className="text-center py-3 px-4 text-white/60 font-medium">Desktop</th>
                  <th className="text-center py-3 px-4 text-white/60 font-medium">Mobile</th>
                  <th className="text-center py-3 px-4 text-white/60 font-medium">Install</th>
                  <th className="text-center py-3 px-4 text-white/60 font-medium">Offline</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                {browsers.map((browser) => (
                  <tr
                    key={browser.name}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3 px-4 text-white font-medium">{browser.name}</td>
                    <td className="py-3 px-4 text-center">{browser.desktop ? <Check /> : <Cross />}</td>
                    <td className="py-3 px-4 text-center">{browser.mobile ? <Check /> : <Cross />}</td>
                    <td className="py-3 px-4 text-center">
                      {browser.install === "Full" && <FullBadge />}
                      {browser.install === "Manual" && <ManualBadge />}
                      {browser.install === "None" && <NoneBadge />}
                    </td>
                    <td className="py-3 px-4 text-center">{browser.offline ? <Check /> : <Cross />}</td>
                    <td className="py-3 px-4 text-white/50 text-xs leading-relaxed">{browser.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeTab === "os" && (
        <section id="operating-systems">
          <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
            Operating System Support
          </h2>
          <p className="text-[14px] text-white/40 leading-relaxed mb-4">
            The application is tested on each operating system using the default browser
            that provides the best PWA support. Platform-specific behaviors are noted in
            the table below.
          </p>
          <div className="overflow-x-auto rounded-xl border border-white/[0.06]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Operating System</th>
                  <th className="text-center py-3 px-4 text-white/60 font-medium">Supported</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Install Method</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                {operatingSystems.map((os) => (
                  <tr
                    key={os.name}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3 px-4 text-white font-medium">{os.name}</td>
                    <td className="py-3 px-4 text-center">{os.supported ? <Check /> : <Cross />}</td>
                    <td className="py-3 px-4 text-white/60 text-xs">{os.installMethod}</td>
                    <td className="py-3 px-4 text-white/50 text-xs leading-relaxed">{os.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeTab === "features" && (
        <section id="features">
          <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
            Feature Support Matrix
          </h2>
          <p className="text-[14px] text-white/40 leading-relaxed mb-4">
            This matrix shows which PWA features are supported by each browser. Support
            is verified against the latest stable version of each browser at the time of
            testing. Older versions may not support all features.
          </p>
          <div className="overflow-x-auto rounded-xl border border-white/[0.06]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Feature</th>
                  <th className="text-center py-3 px-4 text-white/60 font-medium">Chrome</th>
                  <th className="text-center py-3 px-4 text-white/60 font-medium">Edge</th>
                  <th className="text-center py-3 px-4 text-white/60 font-medium">Safari</th>
                  <th className="text-center py-3 px-4 text-white/60 font-medium">Firefox</th>
                  <th className="text-center py-3 px-4 text-white/60 font-medium">Opera</th>
                  <th className="text-center py-3 px-4 text-white/60 font-medium">Samsung</th>
                </tr>
              </thead>
              <tbody>
                {features.map((row) => (
                  <tr
                    key={row.feature}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3 px-4 text-white font-medium">{row.feature}</td>
                    <td className="py-3 px-4 text-center">{row.chrome ? <Check /> : <Cross />}</td>
                    <td className="py-3 px-4 text-center">{row.edge ? <Check /> : <Cross />}</td>
                    <td className="py-3 px-4 text-center">{row.safari ? <Check /> : <Cross />}</td>
                    <td className="py-3 px-4 text-center">{row.firefox ? <Check /> : <Cross />}</td>
                    <td className="py-3 px-4 text-center">{row.opera ? <Check /> : <Cross />}</td>
                    <td className="py-3 px-4 text-center">{row.samsung ? <Check /> : <Cross />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section id="testing">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Testing Methodology
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Platform support is verified using a combination of automated and manual testing:
        </p>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Lighthouse PWA audits:</strong> Automated
                checks for manifest validity, service worker registration, HTTPS, and
                installability criteria. Run via Chrome DevTools or the Lighthouse CLI.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Physical device testing:</strong> Manual
                testing on real devices (iPhone, Android phones, iPad, desktop machines) to
                verify install flow, offline behavior, and rendering accuracy.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Feature detection:</strong> The application
                checks for API availability at runtime using feature detection (e.g.,{" "}
                <InlineCode>&apos;serviceWorker&apos; in navigator</InlineCode>) rather than
                browser detection. This ensures the app works correctly even on untested
                browsers that support the required APIs.
              </p>
            </div>
          </li>
        </ul>
      </section>

      <section id="known-gaps">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Known Gaps
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          These platform limitations are outside the application&apos;s control and cannot be
          addressed with code changes. They are tracked as known issues.
        </p>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Firefox desktop: No PWA install.</strong>{" "}
                Mozilla removed PWA install support from Firefox desktop in version 121.
                Firefox Android still supports Add to Home Screen. There is no timeline for
                desktop support to return.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">iOS: No push notifications below 16.4.</strong>{" "}
                Apple added web push notification support for PWAs in iOS 16.4. Devices
                running earlier versions cannot receive push notifications from the installed
                PWA.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Safari: No background sync or share target.</strong>{" "}
                Safari does not implement the Background Sync API or the Share Target API.
                These features are Chromium-only. The application degrades gracefully when
                these APIs are unavailable.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Low-end Android devices.</strong> Framer
                Motion animations may cause jank on devices with limited GPU capabilities.
                The application respects <InlineCode>prefers-reduced-motion</InlineCode> to
                minimize animation on devices that request it.
              </p>
            </div>
          </li>
        </ul>

        <Callout type="tip">
          For the best experience across all features, use Chrome or Edge on any platform.
          These browsers provide full PWA support including automatic installation,
          push notifications, and background sync.
        </Callout>

        <div className="mt-8 p-5 bg-white/5 border border-white/10 rounded-lg">
          <p className="text-xs text-white/40">
            Platform support data is current as of version{" "}
            <span className="font-mono">{APP_VERSION}</span> (<span className="font-mono">{LAST_UPDATED}</span>).
            Results are re-verified quarterly against the latest stable browser releases.
            If you encounter an issue on a supported platform, report it on{" "}
            <a
              href="https://github.com/savanpatel/savan-portfolio/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white underline underline-offset-2"
            >
              GitHub Issues
            </a>
            .
          </p>
        </div>
      </section>
    </DocPage>
  )
}
