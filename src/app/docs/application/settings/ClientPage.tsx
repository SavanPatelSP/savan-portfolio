"use client";

import {
  DocPage,
  Callout,
  InlineCode,
} from "@/components/docs/DocLayout";
import Link from "next/link";

const toc = [
  { id: "overview", label: "Overview" },
  { id: "appearance", label: "Appearance Settings" },
  { id: "notifications", label: "Notification Preferences" },
  { id: "security", label: "Security Settings" },
  { id: "keyboard-shortcuts", label: "Keyboard Shortcuts" },
  { id: "about", label: "About Section" },
  { id: "best-practices", label: "Best Practices" },
  { id: "limitations", label: "Limitations" },
  { id: "common-mistakes", label: "Common Mistakes" },
  { id: "related", label: "Related" },
];

export default function ClientPage() {
  return (
    <DocPage
      title="Settings"
      description="The configuration page — customize appearance, manage notifications, review security status, and learn keyboard shortcuts."
      toc={toc}
      section="Application"
    >
      <section id="overview">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          Overview
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The Settings page is the control panel for the Portfolio App. It is
          divided into five sections: Appearance, Notifications, Security,
          Keyboard Shortcuts, and About. Each section manages a distinct
          category of configuration.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Most settings are persisted in the browser&apos;s local storage.
          Changes take effect immediately — there is no &quot;Save&quot; button.
          Clearing local storage (via the Security section or manually) resets
          all preferences to their defaults.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">Typical workflow:</strong> You open
          Settings when you want to change the theme, adjust notification
          behavior, clear cached data, or look up a keyboard shortcut. The page
          is not something you visit regularly — it is a reference surface for
          one-time or infrequent adjustments.
        </p>
      </section>

      <section id="appearance">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Appearance Settings
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Customize the visual appearance of the Portfolio App. Two controls
          are available: Theme and Accent Color.
        </p>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Theme
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The app uses a dark-first design with the background color{" "}
          <InlineCode>#0a0a0a</InlineCode>. Two theme modes are available:
        </p>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Dark</strong> — The default. Full
              dark background with light text. No light mode is available.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">System</strong> — Automatically
              matches your operating system&apos;s preference using the{" "}
              <InlineCode>prefers-color-scheme</InlineCode> media query. When
              the OS is in light mode, the app still uses dark mode (since
              there is no light theme), but this setting is preserved for
              future theme support.
            </span>
          </li>
        </ul>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Accent Color
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The accent color is applied to interactive elements: links, buttons,
          active states, and focus rings. Available options:
        </p>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>Default (white/gray)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500/50 shrink-0" />
            <span>Blue</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>Green</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-500/50 shrink-0" />
            <span>Purple</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-500/50 shrink-0" />
            <span>Orange</span>
          </li>
        </ul>
        <p className="text-[14px] text-white/40 leading-relaxed mt-4">
          The accent color preference is saved to local storage and persists
          across sessions. Changing the accent color updates the UI
          immediately.
        </p>
      </section>

      <section id="notifications">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Notification Preferences
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Control how and when the app notifies you of updates and events.
          Three notification categories are available:
        </p>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">New releases</strong> — Notified
              when a new version is available for download. This includes
              stable releases and pre-releases (if enabled).
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Project updates</strong> — Notified
              when project statuses change or new milestones are reached.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Documentation changes</strong> —
              Notified when new documentation pages are published or existing
              ones are updated.
            </span>
          </li>
        </ul>

        <Callout type="info" title="Notification Delivery">
          Notifications are delivered as in-app toasts by default. On supported
          platforms (Android and desktop browsers with push support), you can
          also enable browser push notifications. Push notifications require
          explicit permission from the browser — the app will prompt you
          before requesting it.
        </Callout>

        <Callout type="warning" title="iOS Limitation">
          Safari on iOS does not support the Push API. Browser push
          notifications are not available on iOS or iPadOS. The app will
          continue to show in-app toasts on these platforms.
        </Callout>
      </section>

      <section id="security">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Security Settings
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The Security section provides transparency into local data management
          and service worker status:
        </p>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Clear local data</strong> — Removes
              all cached data, preferences, and service worker caches from your
              device. The app re-downloads assets on the next visit. This action
              cannot be undone.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">View storage usage</strong> — Shows
              how much local storage and cache the app is using, broken down by
              category (preferences, cached assets, project data).
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Service worker status</strong> —
              Displays the current service worker version and whether it is
              registered and active.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Permissions</strong> — Lists
              which browser permissions the app has requested (e.g.,
              notifications, clipboard) and their current state.
            </span>
          </li>
        </ul>

        <Callout type="note" title="Data Privacy">
          The Portfolio App does not collect personal data, analytics, or
          tracking information. All preferences are stored locally on your
          device and are never transmitted to external servers.
        </Callout>
      </section>

      <section id="keyboard-shortcuts">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Keyboard Shortcuts
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The app supports keyboard shortcuts for navigation and productivity.
          The full shortcut reference is displayed in the Settings page and can
          also be opened from anywhere by pressing{" "}
          <InlineCode>Cmd/Ctrl + /</InlineCode>.
        </p>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-[13px] text-white/40 border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left py-3 pr-4 text-white/50 font-medium">
                  Shortcut
                </th>
                <th className="text-left py-3 pr-4 text-white/50 font-medium">
                  Action
                </th>
                <th className="text-left py-3 text-white/50 font-medium">
                  Context
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              <tr>
                <td className="py-3 pr-4">
                  <InlineCode>Cmd/Ctrl + K</InlineCode>
                </td>
                <td className="py-3 pr-4">Open search modal</td>
                <td className="py-3">Global</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">
                  <InlineCode>Cmd/Ctrl + /</InlineCode>
                </td>
                <td className="py-3 pr-4">Toggle keyboard shortcuts panel</td>
                <td className="py-3">Global</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">
                  <InlineCode>Esc</InlineCode>
                </td>
                <td className="py-3 pr-4">Close modal or overlay</td>
                <td className="py-3">Global</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">
                  <InlineCode>G then D</InlineCode>
                </td>
                <td className="py-3 pr-4">Navigate to Dashboard</td>
                <td className="py-3">Global</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">
                  <InlineCode>G then P</InlineCode>
                </td>
                <td className="py-3 pr-4">Navigate to Projects</td>
                <td className="py-3">Global</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">
                  <InlineCode>G then L</InlineCode>
                </td>
                <td className="py-3 pr-4">Navigate to Downloads</td>
                <td className="py-3">Global</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">
                  <InlineCode>G then S</InlineCode>
                </td>
                <td className="py-3 pr-4">Navigate to Settings</td>
                <td className="py-3">Global</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="tip" title="Vim-style Navigation">
          The <InlineCode>G</InlineCode> prefix shortcuts follow a vim-inspired
          navigation pattern. Press <InlineCode>G</InlineCode> followed by the
          section letter within 500ms to navigate. If you pause longer than
          500ms, the G key is ignored and you must press it again.
        </Callout>
      </section>

      <section id="about">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          About Section
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The About section at the bottom of the Settings page provides
          application metadata:
        </p>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">App name</strong> — Savan Patel
              — Portfolio.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Version</strong> — Current
              application version (e.g., <InlineCode>1.0.0</InlineCode>).
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Last updated</strong> — Date of
              the most recent release.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Technology stack</strong> — Overview
              of the frameworks and tools used to build the app.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Source code</strong> — Link to
              the GitHub repository.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Contact</strong> — Links to
              email, social profiles, and other contact methods.
            </span>
          </li>
        </ul>
      </section>

      <section id="best-practices">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Best Practices
        </h2>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Review the Keyboard Shortcuts section once to learn the navigation
              shortcuts. They significantly speed up movement between sections.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              Use &quot;Clear local data&quot; only when troubleshooting. It
              resets all preferences and removes cached assets, requiring a
              full re-download on the next visit.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              Enable push notifications only for categories you care about.
              Unnecessary notifications can be distracting.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              Check the service worker status if the app is not loading the
              latest version. A stale service worker may be serving cached
              assets.
            </span>
          </li>
        </ul>
      </section>

      <section id="limitations">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Limitations
        </h2>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              There is no light theme. The app is dark-only. The System theme
              setting currently has no visible effect, though it is preserved
              for future theme support.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              Settings are stored in local storage, which is per-origin. If
              you access the app from different domains (e.g., staging vs
              production), settings do not sync between them.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              Push notifications are not available on iOS/iPadOS due to Safari
              limitations. In-app toasts are the only notification method on
              those platforms.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              The keyboard shortcut panel does not list every possible
              shortcut — only the most frequently used ones are displayed.
            </span>
          </li>
        </ul>
      </section>

      <section id="common-mistakes">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Common Mistakes
        </h2>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Clearing local data to fix a
              rendering issue</strong> — Clearing local data resets preferences
              and removes cached assets. It does not fix server-side issues or
              bugs in the application code. Try a hard refresh (
              <InlineCode>Cmd/Ctrl + Shift + R</InlineCode>) first.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Expecting settings to sync across
              devices</strong> — Settings are stored locally. Changing the
              accent color on your laptop does not affect your phone. There is
              no cross-device sync.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Ignoring the service worker
              status</strong> — If the app loads outdated content after an
              update, check the service worker version. A stale service worker
              may be serving old cached files.
            </span>
          </li>
        </ul>
      </section>

      <Callout type="info" title="Need Help?">
        If you encounter issues with settings or the app behaves unexpectedly,
        check the{" "}
        <Link
          href="/docs/reference/troubleshooting"
          className="underline hover:text-white/60 transition-colors"
        >
          Troubleshooting
        </Link>{" "}
        guide for solutions to common problems.
      </Callout>

      <section id="related">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Related
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/docs/application/dashboard"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">
              Dashboard
            </p>
            <p className="text-[13px] text-white/30">
              Overview of stats, activity, and quick actions.
            </p>
          </Link>
          <Link
            href="/docs/features/security"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">
              Security
            </p>
            <p className="text-[13px] text-white/30">
              Integrity verification, HTTPS, and data privacy.
            </p>
          </Link>
          <Link
            href="/docs/reference/troubleshooting"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">
              Troubleshooting
            </p>
            <p className="text-[13px] text-white/30">
              Solutions to common problems and error conditions.
            </p>
          </Link>
          <Link
            href="/docs/getting-started/navigation"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">
              Navigation
            </p>
            <p className="text-[13px] text-white/30">
              Keyboard shortcuts and navigation patterns.
            </p>
          </Link>
        </div>
      </section>
    </DocPage>
  );
}
