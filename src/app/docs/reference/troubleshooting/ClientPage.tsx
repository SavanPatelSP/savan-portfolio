"use client"

import { useState } from "react"
import { DocPage, Callout, CodeBlock } from "@/components/docs/DocLayout"
import Link from "next/link"
import { APP_VERSION, LAST_UPDATED } from "@/data/docs"

interface Issue {
  title: string
  symptoms: string[]
  causes: string[]
  solutions: string[]
  code?: string
}

const issues: Issue[] = [
  {
    title: "Install Option Does Not Appear",
    symptoms: [
      "No install icon in the address bar on Chrome or Edge",
      "No install banner or prompt appears after visiting the site",
      "The three-dot menu has no 'Install app' option",
    ],
    causes: [
      "Browser does not support PWA installation (Firefox desktop, older Safari)",
      "The site is not served over HTTPS — PWA criteria require a secure context",
      "Browser extensions (ad blockers, privacy tools) blocking service worker registration",
      "The manifest file is unreachable or returns a non-JSON response",
      "The user previously dismissed the install prompt (Chrome suppresses it after dismissal)",
    ],
    solutions: [
      "Use Chrome, Edge, Opera, or Samsung Internet — these support the full PWA install flow",
      "Verify HTTPS is active: check for the lock icon in the address bar",
      "Disable ad blockers and privacy extensions temporarily, then reload the page",
      "Clear the browser cache for this site and visit again",
      "On Chrome, open DevTools > Application > Manifest to verify the manifest loads correctly",
      "On mobile Chrome, tap the three-dot menu and look for 'Add to Home screen' or 'Install app'",
    ],
    code: "# Verify the manifest is accessible\n# Navigate to: https://yoursite.com/manifest.json\n# You should see valid JSON with name, icons, start_url fields",
  },
  {
    title: "App Shows Browser Frame After Install",
    symptoms: [
      "The installed app window includes the browser address bar",
      "Title bar shows browser UI instead of a native look",
      "The app does not appear as a standalone window",
    ],
    causes: [
      "Service worker failed to register correctly during installation",
      "The start_url in the manifest does not resolve to a valid page",
      "The app was force-closed before the service worker finished activating",
      "Browser extension interfered with the service worker lifecycle",
    ],
    solutions: [
      "Uninstall the app completely from your device",
      "Clear browser data for this site (cache and storage) via DevTools or browser settings",
      "Visit the site fresh in the browser and verify the service worker is active",
      "Ensure JavaScript is enabled in browser settings",
      "Check that no browser policies or enterprise extensions block service workers",
      "Reinstall the app after confirming the service worker is running",
    ],
  },
  {
    title: "iOS: No Install Prompt Appears",
    symptoms: [
      "No banner or popup appears on iPhone or iPad when visiting the site",
      "There is no 'Install' option anywhere in Safari",
      "The site loads normally but offers no way to install",
    ],
    causes: [
      "iOS Safari does not support automatic PWA installation prompts — this is by design",
      "Apple requires manual installation via the Share menu on all iOS versions",
      "The device is running an iOS version below 16.4, which has limited PWA support",
    ],
    solutions: [
      "Open the site in Safari (not Chrome or other browsers on iOS)",
      "Tap the Share button (square with an upward arrow) at the bottom of the screen",
      "Scroll down and tap 'Add to Home Screen'",
      "Customize the name if desired and tap 'Add'",
      "Ensure the device runs iOS 16.4 or later for full PWA features including push notifications",
    ],
  },
  {
    title: "Offline Pages Show Errors",
    symptoms: [
      "White screen or error page when the device has no internet connection",
      "Pages that worked online now show 'Page not found' or a connection error",
      "The app appears broken when toggling airplane mode",
    ],
    causes: [
      "The page was never visited while online — the service worker caches on first visit only",
      "The service worker cache was cleared by the browser or user action",
      "The page requires dynamic data (API calls) not available offline",
      "The service worker itself failed to register or activate",
    ],
    solutions: [
      "Visit each page you want available offline while you have an internet connection",
      "The service worker caches pages on first visit — unvisited pages are not cached",
      "Check that the service worker is active in DevTools > Application > Service Workers",
      "Verify the page does not depend on real-time API data that cannot be cached",
      "Reload the page while online to re-trigger the caching process",
    ],
  },
  {
    title: "App Shows Outdated Content After Update",
    symptoms: [
      "New features or design changes are not visible in the installed app",
      "The app shows old text, old layouts, or old functionality after a deployment",
      "Stale content persists across page reloads and app restarts",
    ],
    causes: [
      "The service worker is serving cached assets from a previous version",
      "The browser has not yet checked for service worker updates",
      "The cache was not properly invalidated during the deployment",
      "The user is on a very old cached version that predates the update mechanism",
    ],
    solutions: [
      "Hard reload: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (macOS)",
      "Open DevTools > Application > Storage and clear the cache for this site",
      "Go to the browser's site settings and clear stored data for this domain",
      "Uninstall and reinstall the PWA to get a completely fresh cache",
      "Wait for the next automatic update cycle — the service worker checks periodically",
    ],
  },
  {
    title: "Slow Performance or Jank",
    symptoms: [
      "Pages take several seconds to render or become interactive",
      "Scrolling or navigation feels laggy or unresponsive",
      "Animations stutter or drop frames on mobile devices",
      "High CPU usage visible in Task Manager or Activity Monitor",
    ],
    causes: [
      "Corrupted or oversized cache storage consuming excessive memory",
      "Too many open tabs or resource-heavy background processes",
      "Outdated browser or operating system missing performance optimizations",
      "Device hardware limitations (older phones, low RAM devices)",
      "A browser extension is injecting scripts or modifying the page",
    ],
    solutions: [
      "Clear the application cache via DevTools > Application > Storage",
      "Close unnecessary tabs and background applications to free memory",
      "Update your browser to the latest stable version",
      "On mobile, uninstall and reinstall the app to reset the cache completely",
      "Check available storage space — low storage degrades overall device performance",
      "Try disabling browser extensions one by one to identify any causing slowdowns",
    ],
  },
  {
    title: "PWA Not Recognized by Browser",
    symptoms: [
      "The install option never appears despite using a supported browser",
      "DevTools shows 'Manifest: Not available' or 'Manifest: Error'",
      "Lighthouse PWA audit fails with manifest-related errors",
    ],
    causes: [
      "The manifest.json file is not reachable at the expected URL",
      "The manifest is missing required fields (name, start_url, display, icons)",
      "The site is served over HTTP instead of HTTPS",
      "A Content Security Policy header is blocking the manifest or service worker",
    ],
    solutions: [
      "Navigate directly to /manifest.json in the browser to verify it loads",
      "Ensure the manifest includes name, short_name, start_url, display, icons, and theme_color",
      "Verify HTTPS is active — check the address bar for the lock icon",
      "Review Content Security Policy headers for restrictions on manifest or script-src",
      "Use Chrome DevTools > Application > Manifest to inspect the parsed manifest",
    ],
    code: '// Required manifest fields:\n{\n  "name": "Savan Patel Portfolio",\n  "short_name": "Portfolio",\n  "start_url": "/",\n  "display": "standalone",\n  "background_color": "#0a0a0a",\n  "theme_color": "#0a0a0a",\n  "icons": [...]\n}',
  },
  {
    title: "Service Worker Registration Errors",
    symptoms: [
      "Console shows 'Service Worker registration failed' or 'SecurityError'",
      "Offline mode does not work despite visiting pages while online",
      "The install prompt never appears",
      "DevTools shows the service worker in an error state or not registered",
    ],
    causes: [
      "JavaScript is disabled in the browser",
      "The service worker script is blocked by a Content Security Policy",
      "The service worker file returns a 404 or network error",
      "Another service worker from a different scope is interfering",
      "The page is served over HTTP instead of HTTPS (service workers require HTTPS)",
    ],
    solutions: [
      "Ensure JavaScript is enabled in browser settings",
      "Check the browser console (F12 > Console) for specific error messages",
      "Verify the service worker file is accessible at its expected URL",
      "Review Content Security Policy headers for script-src and worker-src restrictions",
      "Open DevTools > Application > Service Workers to inspect the registration state",
      "Try incognito/private mode to rule out extension interference",
    ],
  },
]

export default function ClientPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <DocPage
      title="Troubleshooting"
      description="Identify and resolve common issues with PWA installation, offline mode, performance, service worker registration, and content updates."
      toc={issues.map((issue) => ({
        id: issue.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        label: issue.title,
      }))}
      section="Reference"
    >
      <Callout type="tip">
        Most issues can be resolved by clearing the app cache and reinstalling.
        Use DevTools &gt; Application &gt; Storage to manage cached data.
      </Callout>

      <p className="text-[14px] text-white/40 leading-relaxed mb-4">
        Browse the issues below to find symptoms matching your problem. Each
        section lists the symptoms, likely causes, and step-by-step solutions.
        Issues are ordered by frequency — the most common problems appear first.
      </p>

      <div className="space-y-4">
        {issues.map((issue, index) => {
          const id = issue.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
          const isExpanded = expandedIndex === index

          return (
            <div
              key={id}
              id={id}
              className="border border-white/10 rounded-lg overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedIndex(isExpanded ? null : index)
                }
                className="w-full text-left px-5 py-4 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  <span className="text-white font-medium text-sm">
                    {issue.title}
                  </span>
                </div>
                <span className="text-white/40 text-xs">
                  {isExpanded ? "Collapse" : "Expand"}
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-5 py-5 space-y-5 border-t border-white/5">
                  <div>
                    <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                      Symptoms
                    </h4>
                    <ul className="space-y-1">
                      {issue.symptoms.map((symptom, i) => (
                        <li
                          key={i}
                          className="text-sm text-white/60 flex items-start gap-2"
                        >
                          <span className="text-red-400 mt-0.5">•</span>
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                      Possible Causes
                    </h4>
                    <ul className="space-y-1">
                      {issue.causes.map((cause, i) => (
                        <li
                          key={i}
                          className="text-sm text-white/60 flex items-start gap-2"
                        >
                          <span className="text-yellow-400 mt-0.5">•</span>
                          {cause}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                      Solutions
                    </h4>
                    <ol className="space-y-2">
                      {issue.solutions.map((solution, i) => (
                        <li
                          key={i}
                          className="text-sm text-white/60 flex items-start gap-2"
                        >
                          <span className="text-green-400 font-mono text-xs mt-0.5">
                            {i + 1}.
                          </span>
                          <span>{solution}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {issue.code && (
                    <div>
                      <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                        Reference
                      </h4>
                      <CodeBlock code={issue.code} />
                    </div>
                  )}

                  <Callout type="tip">
                    If none of these solutions resolve your issue, check the
                    browser console (F12 &gt; Console tab) for specific error
                    messages and report them on{" "}
                    <a
                      href="https://github.com/savanpatel/savan-portfolio/issues"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:text-white"
                    >
                      GitHub Issues
                    </a>
                    .
                  </Callout>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-8 p-5 bg-white/5 border border-white/10 rounded-lg">
        <p className="text-sm text-white/50">
          Troubleshooting content is current as of version{" "}
          <span className="font-mono">{APP_VERSION}</span> (<span className="font-mono">{LAST_UPDATED}</span>).
          New issues are added as they are reported. If your problem is not listed,
          check the browser console for errors and{" "}
          <a
            href="https://github.com/savanpatel/savan-portfolio/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white underline underline-offset-2"
          >
            open an issue
          </a>
          .
        </p>
      </div>

      <Callout type="info" title="Still Need Help?">
        If your issue is not listed above, check the{" "}
        <Link href="/docs/reference/faq" className="underline underline-offset-2 hover:text-white/60 transition-colors">
          FAQ
        </Link>{" "}
        for general questions, or report the problem on{" "}
        <a
          href="https://github.com/savanpatel/savan-portfolio/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-white"
        >
          GitHub Issues
        </a>
        .
      </Callout>
    </DocPage>
  )
}
