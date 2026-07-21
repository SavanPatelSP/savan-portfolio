"use client"

import { useState } from "react"
import { DocPage, Callout } from "@/components/docs/DocLayout"
import { APP_VERSION, LAST_UPDATED } from "@/data/docs"

interface ChangelogEntry {
  version: string
  date: string
  status: "Stable" | "Beta" | "RC"
  added: string[]
  improved: string[]
  fixed: string[]
  knownIssues: string[]
  upgradeNotes: string[]
}

const changelog: ChangelogEntry[] = [
  {
    version: "1.0.0",
    date: "2025-01-15",
    status: "Stable",
    added: [
      "Initial release of the Savan Patel Portfolio PWA",
      "Progressive Web App with full offline support via service worker",
      "Home page with professional introduction and animated hero section",
      "Projects gallery with filterable project cards and detail views",
      "Skills section with interactive proficiency visualizations",
      "Experience timeline with detailed role descriptions",
      "Contact form with client-side validation and Resend email integration",
      "Dark mode theme with system preference detection",
      "Responsive layout optimized for mobile, tablet, and desktop",
      "Complete documentation site with 8+ reference pages",
      "Frequently Asked Questions with categorized questions and search",
      "Troubleshooting guide with step-by-step solutions",
      "Platform support matrix covering all major browsers and OS",
      "Changelog page with structured version history",
      "SEO meta tags, Open Graph data, and structured JSON-LD",
      "Performance monitoring with Web Vitals tracking",
    ],
    improved: [
      "Optimized image loading with blur-up placeholders and lazy loading",
      "Streamlined bundle size with code splitting and dynamic imports",
      "Enhanced accessibility with ARIA labels and keyboard navigation support",
    ],
    fixed: [
      "Resolved initial service worker caching race condition on first load",
      "Fixed scroll-to-section anchor links on mobile Safari",
    ],
    knownIssues: [
      "Push notifications not supported on iOS below 16.4",
      "Firefox desktop does not support PWA installation",
      "Some animation effects may cause jank on low-end Android devices",
    ],
    upgradeNotes: [
      "This is the initial release — no previous version to upgrade from",
      "After deployment, clear browser cache if upgrading from a beta build",
      "Ensure HTTPS is configured before deploying to production",
    ],
  },
]

const statusColors: Record<string, string> = {
  Stable: "bg-green-500/20 text-green-400 border-green-500/30",
  Beta: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  RC: "bg-blue-500/20 text-blue-400 border-blue-500/30",
}

const categoryDots: Record<string, string> = {
  added: "bg-green-400",
  improved: "bg-blue-400",
  fixed: "bg-orange-400",
  known: "bg-red-400",
}

export default function ClientPage() {
  const [expandedVersion, setExpandedVersion] = useState<string | null>("1.0.0")

  return (
    <DocPage
      title="Changelog"
      description="Version history and release notes for the Savan Patel Portfolio PWA. Each entry documents additions, improvements, fixes, and known issues."
      toc={changelog.map((entry) => ({
        id: `v${entry.version}`,
        label: `v${entry.version}`,
      }))}
      section="Reference"
    >
      <div className="flex items-center gap-3 mb-8">
        <span className="text-[14px] text-white/40">Current version:</span>
        <span className="px-2.5 py-1 bg-white/10 border border-white/10 rounded-md text-sm text-white font-mono">
          v{APP_VERSION}
        </span>
        <span className="text-xs text-white/30">Last updated: {LAST_UPDATED}</span>
      </div>

      <p className="text-[14px] text-white/40 leading-relaxed mb-6">
        This changelog follows the{" "}
        <a
          href="https://keepachangelog.com/en/1.1.0/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-white underline underline-offset-2"
        >
          Keep a Changelog
        </a>{" "}
        format. Each version entry is categorized into Added, Improved, Fixed, Known Issues,
        and Upgrade Notes. Expand any version to see its details.
      </p>

      <div className="space-y-6">
        {changelog.map((entry) => {
          const isExpanded = expandedVersion === entry.version
          return (
            <div
              key={entry.version}
              id={`v${entry.version}`}
              className="border border-white/10 rounded-lg overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedVersion(isExpanded ? null : entry.version)
                }
                className="w-full text-left px-5 py-4 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-white font-mono font-bold text-lg">
                    v{entry.version}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium border ${
                      statusColors[entry.status]
                    }`}
                  >
                    {entry.status}
                  </span>
                  <span className="text-xs text-white/40 ml-auto">
                    {new Date(entry.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isExpanded ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-5 py-5 space-y-6 border-t border-white/5">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`w-2 h-2 rounded-full ${categoryDots.added}`} />
                      <h4 className="text-sm font-semibold text-white">Added</h4>
                      <span className="text-xs text-white/30">({entry.added.length})</span>
                    </div>
                    <ul className="space-y-1.5 ml-4">
                      {entry.added.map((item, i) => (
                        <li key={i} className="text-sm text-white/60 flex items-start gap-2">
                          <span className="text-green-400 mt-1 text-xs">+</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`w-2 h-2 rounded-full ${categoryDots.improved}`} />
                      <h4 className="text-sm font-semibold text-white">Improved</h4>
                      <span className="text-xs text-white/30">({entry.improved.length})</span>
                    </div>
                    <ul className="space-y-1.5 ml-4">
                      {entry.improved.map((item, i) => (
                        <li key={i} className="text-sm text-white/60 flex items-start gap-2">
                          <span className="text-blue-400 mt-1 text-xs">↑</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`w-2 h-2 rounded-full ${categoryDots.fixed}`} />
                      <h4 className="text-sm font-semibold text-white">Fixed</h4>
                      <span className="text-xs text-white/30">({entry.fixed.length})</span>
                    </div>
                    <ul className="space-y-1.5 ml-4">
                      {entry.fixed.map((item, i) => (
                        <li key={i} className="text-sm text-white/60 flex items-start gap-2">
                          <span className="text-orange-400 mt-1 text-xs">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {entry.knownIssues.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`w-2 h-2 rounded-full ${categoryDots.known}`} />
                        <h4 className="text-sm font-semibold text-white">Known Issues</h4>
                      </div>
                      <ul className="space-y-1.5 ml-4">
                        {entry.knownIssues.map((item, i) => (
                          <li key={i} className="text-sm text-white/60 flex items-start gap-2">
                            <span className="text-red-400 mt-1 text-xs">!</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h4 className="text-sm font-semibold text-white mb-3">Upgrade Notes</h4>
                    <ul className="space-y-1.5 ml-4">
                      {entry.upgradeNotes.map((note, i) => (
                        <li key={i} className="text-sm text-white/50 flex items-start gap-2">
                          <span className="text-white/30 mt-1">→</span>
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <Callout type="tip">
        For the latest updates, check the{" "}
        <a
          href="https://github.com/savanpatel/savan-portfolio/releases"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-white"
        >
          GitHub Releases
        </a>{" "}
        page. Major version bumps will be announced on this page with detailed upgrade notes.
      </Callout>

      <Callout type="note" title="Version Format">
        This project uses semantic versioning (MAJOR.MINOR.PATCH). Major versions may include
        breaking changes. Minor versions add functionality in a backward-compatible manner.
        Patch versions contain backward-compatible bug fixes. The current version is{" "}
        <span className="font-mono">v{APP_VERSION}</span>.
      </Callout>
    </DocPage>
  )
}
