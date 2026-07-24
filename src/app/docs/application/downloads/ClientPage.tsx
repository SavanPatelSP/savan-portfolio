"use client";

import {
  DocPage,
  Callout,
  InlineCode,
  CodeBlock,
} from "@/components/docs/DocLayout";
import Link from "next/link";

const toc = [
  { id: "overview", label: "Overview" },
  { id: "install-flow", label: "Install Flow" },
  { id: "platform-selection", label: "Platform Selection" },
  { id: "version-information", label: "Version Information" },
  { id: "file-verification", label: "File Verification" },
  { id: "release-history", label: "Release History" },
  { id: "best-practices", label: "Best Practices" },
  { id: "limitations", label: "Limitations" },
  { id: "common-mistakes", label: "Common Mistakes" },
  { id: "related", label: "Related" },
];

export default function ClientPage() {
  return (
    <DocPage
      title="Downloads"
      description="The distribution page for software releases — browse versions, select a platform, verify file integrity, and install."
      toc={toc}
      section="Application"
    >
      <section id="overview">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          Overview
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The Downloads page is the centralized hub for software installation.
          It provides a structured interface for browsing available releases,
          selecting the correct platform build, and installing with file
          integrity verification.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Every release entry includes version metadata, platform compatibility
          information, file sizes, and SHA-256 checksum data. The page is
          divided into two main sections: the current release (highlighted at
          top) and a chronological release history below.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">Typical workflow:</strong> You open
          the Downloads page, see the latest release at the top, confirm it
          matches your platform (the app auto-detects your OS), review the
          release notes to understand what changed, and click Install. The app
          runs a checksum verification before starting the download.
        </p>
      </section>

      <section id="install-flow">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Install Flow
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The installation process follows five sequential steps. Each step
          must complete before the next begins:
        </p>
        <ol className="space-y-3 text-[14px] text-white/40 list-decimal list-inside">
          <li>
            <strong className="text-white/60">Select a release</strong> — Click
            on a release card or expand an entry in the release history.
          </li>
          <li>
            <strong className="text-white/60">Choose your platform</strong> —
            Select the build matching your operating system and architecture.
            The app highlights the recommended build based on your current
            device.
          </li>
          <li>
            <strong className="text-white/60">Animated verification</strong> —
            A real-time verification animation displays while the app calculates
            a local SHA-256 hash and compares it against the server-stored
            checksum. This is not a cosmetic animation — it performs an actual
            integrity check.
          </li>
          <li>
            <strong className="text-white/60">Install begins</strong> — Once
            verification passes, the browser initiates the download with a
            progress indicator. The download speed depends on your connection.
          </li>
          <li>
            <strong className="text-white/60">Post-install verification</strong>{" "}
            — The page displays the expected checksum so you can independently
            verify the installed file using your OS terminal.
          </li>
        </ol>

        <Callout type="warning" title="Verification Failure">
          If the checksum comparison fails, the install button is disabled and
          a warning banner appears. This means the file was corrupted during
          transfer or tampered with. Do not proceed — re-download the file or
          report the issue.
        </Callout>
      </section>

      <section id="platform-selection">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Platform Selection
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          When installing a release, you are presented with platform options.
          The app auto-detects your current device and highlights the
          recommended build. You can still select a different platform if
          needed (e.g., downloading for another machine).
        </p>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-[13px] text-white/40 border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left py-3 pr-4 text-white/50 font-medium">
                  Platform
                </th>
                <th className="text-left py-3 pr-4 text-white/50 font-medium">
                  File Format
                </th>
                <th className="text-left py-3 text-white/50 font-medium">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              <tr>
                <td className="py-3 pr-4 text-white/50">Windows</td>
                <td className="py-3 pr-4">
                  <InlineCode>.exe</InlineCode> / <InlineCode>.msi</InlineCode>
                </td>
                <td className="py-3">Includes auto-updater support</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-white/50">macOS</td>
                <td className="py-3 pr-4">
                  <InlineCode>.dmg</InlineCode>
                </td>
                <td className="py-3">Universal binary (Intel + Apple Silicon)</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-white/50">Linux</td>
                <td className="py-3 pr-4">
                  <InlineCode>.AppImage</InlineCode> /{" "}
                  <InlineCode>.deb</InlineCode>
                </td>
                <td className="py-3">
                  AppImage works on all distros; .deb for Debian/Ubuntu
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-white/50">Android</td>
                <td className="py-3 pr-4">PWA install</td>
                <td className="py-3">
                  Install via Chrome or Samsung Internet browser
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-white/50">iOS / iPadOS</td>
                <td className="py-3 pr-4">PWA install</td>
                <td className="py-3">
                  Install via Safari &quot;Add to Home Screen&quot;
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="note" title="PWA vs Native">
          On mobile platforms (Android and iOS), the app installs as a PWA
          (Progressive Web App) rather than a native binary. This means the
          &quot;install&quot; action adds a home screen icon and enables
          offline support, but the app runs inside the browser engine.
        </Callout>
      </section>

      <section id="version-information">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Version Information
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Each release entry includes the following metadata fields:
        </p>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Version number</strong> — Follows
              semantic versioning (e.g., <InlineCode>1.2.0</InlineCode>). Major
              bumps indicate breaking changes; minor bumps add features; patches
              fix bugs.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Release date</strong> — The UTC
              timestamp when the version was published.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">File size</strong> — Size of each
              platform build, displayed in MB. Actual download size may vary
              slightly due to network overhead.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Checksum</strong> — SHA-256 hash
              for each downloadable file. Used for integrity verification.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Release notes</strong> — Changelog
              for the version including new features, fixes, and breaking
              changes.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Minimum requirements</strong> — OS
              version and hardware requirements for the build.
            </span>
          </li>
        </ul>
      </section>

      <section id="file-verification">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          File Verification
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          After downloading, you can verify the file&apos;s integrity using the
          provided SHA-256 checksum. This confirms the file was not corrupted
          during transfer or tampered with by a third party.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          On macOS or Linux, open Terminal and run:
        </p>
        <CodeBlock
          code="shasum -a 256 downloaded-file"
          language="bash"
          filename="Terminal"
        />
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          On Windows, open PowerShell and run:
        </p>
        <CodeBlock
          code="Get-FileHash downloaded-file -Algorithm SHA256"
          language="powershell"
          filename="PowerShell"
        />
        <p className="text-[14px] text-white/40 leading-relaxed">
          Compare the output hash with the checksum displayed on the Downloads
          page. The two values must match exactly — even a single character
          difference indicates file corruption or tampering.
        </p>

        <Callout type="tip" title="Browser Downloads Folder">
          By default, browsers save files to your Downloads folder. If you have
          changed the default download location, run the verification command
          against that path instead.
        </Callout>
      </section>

      <section id="release-history">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Release History
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Below the current release, a chronological list shows all published
          versions in reverse order (newest first). Each entry is expandable:
        </p>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Collapsed view</strong> — Shows
              version number, release date, and a one-line summary.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Expanded view</strong> — Reveals
              full release notes, platform builds, checksums, and install
              links.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Latest badge</strong> — The most
              recent release is highlighted with a{" "}
              <InlineCode>Latest</InlineCode> badge.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Pre-release tag</strong> — Beta
              or release-candidate builds are marked with a{" "}
              <InlineCode>Pre-release</InlineCode> label and a warning banner
              noting potential instability.
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
              Always verify the checksum after downloading, especially for
              desktop builds. The automated verification in the install flow
              covers most cases, but manual verification is a good second
              check.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Read the release notes before upgrading. Major version bumps may
              include breaking changes that affect your configuration or
              workflow.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              Avoid installing pre-release versions in production environments.
              They are intended for testing and may contain unresolved bugs.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              For mobile, use the PWA install flow through your browser rather
              than sideloading. The PWA version receives automatic updates.
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
              The release history does not support pagination. If the portfolio
              has many releases, all entries are rendered at once, which may
              affect initial page load time.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              There is no rollback mechanism. If a new version introduces a
              regression, you must manually download and install the previous
              version from the release history.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              Checksum verification relies on HTTPS transport. If you download
              the file over an insecure connection, the checksum may not match
              if a man-in-the-middle modified the file.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              The macOS build is a universal binary. On Apple Silicon Macs, the
              first launch may take longer as the OS selects the correct
              architecture slice.
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
              <strong className="text-white/60">Ignoring the platform
              auto-detection</strong> — The app recommends a build for your
              current device, but you can still select a different platform. If
              you are downloading for another machine, verify you selected the
              correct platform before proceeding.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Trusting the checksum without
              comparing</strong> — The checksum is displayed on the page for
              reference, but the app only compares it automatically during the
              install flow. If you download the file manually, you must run the
              verification command yourself.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Installing a pre-release in
              production</strong> — Pre-release builds are labeled with a tag
              for a reason. They may have incomplete features or known issues.
              Use them only for testing.
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
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">
              Installation Guide
            </p>
            <p className="text-[13px] text-white/30">
              Step-by-step installation instructions for every platform.
            </p>
          </Link>
          <Link
            href="/docs/reference/changelog"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">
              Changelog
            </p>
            <p className="text-[13px] text-white/30">
              Full version history and release notes.
            </p>
          </Link>
          <Link
            href="/docs/features/updates"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">
              Updates
            </p>
            <p className="text-[13px] text-white/30">
              How automatic updates and version detection work.
            </p>
          </Link>
          <Link
            href="/trust/security"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">
              Security
            </p>
            <p className="text-[13px] text-white/30">
              Integrity verification, HTTPS, and data privacy.
            </p>
          </Link>
        </div>
      </section>
    </DocPage>
  );
}
