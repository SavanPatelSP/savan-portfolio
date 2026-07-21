"use client"

import { useState, useMemo } from "react"
import { ChevronDown, Search } from "lucide-react"
import { DocPage } from "@/components/docs/DocLayout"
import Link from "next/link"
import { APP_VERSION, LAST_UPDATED } from "@/data/docs"

interface FAQItem {
  question: string
  answer: string
}

interface FAQCategory {
  id: string
  label: string
  icon: string
  items: FAQItem[]
}

const faqData: FAQCategory[] = [
  {
    id: "installation",
    label: "Installation",
    icon: "📦",
    items: [
      {
        question: "How do I install this app on my device?",
        answer:
          "On Android and desktop browsers (Chrome, Edge, Opera), look for the install icon in the address bar or wait for the automatic install prompt. Click 'Install' when prompted. On iOS/iPadOS, tap the Share button in Safari, then select 'Add to Home Screen'. On macOS, use Chrome or Edge and click the install icon in the address bar. The app appears as a standalone window without browser chrome.",
      },
      {
        question: "Which browsers support PWA installation?",
        answer:
          "Chrome (desktop and Android), Microsoft Edge (desktop and Android), Opera (desktop and Android), and Samsung Internet support the full PWA install flow with automatic prompts. Safari on iOS supports adding to Home Screen via the Share menu but does not show an install prompt. Firefox on desktop does not support PWA installation at all. Firefox on Android supports Add to Home Screen.",
      },
      {
        question: "Why can't I install the app on iOS?",
        answer:
          "Apple's Safari browser does not support the automatic install prompt for PWAs. This is a platform limitation, not a bug. Instead, you must manually add the app: open the site in Safari, tap the Share button (square with an upward arrow), and select 'Add to Home Screen'. The app will then appear on your Home Screen with a standalone icon. Note that some features like push notifications have limited support on iOS below version 16.4.",
      },
      {
        question: "Can I install the app on multiple devices?",
        answer:
          "Yes. You can install the PWA on as many devices as you like. Each installation is independent — there is no account system or cloud sync. Your browsing preferences (like dark mode) are stored locally on each device. Clearing the app data on one device does not affect other installations.",
      },
      {
        question: "How do I uninstall the app?",
        answer:
          "On Windows, right-click the app in the Start Menu and select 'Uninstall', or go to Settings > Apps > Installed apps. On macOS, open the Applications folder and drag the app to the Trash. On Android, long-press the app icon and select 'Uninstall'. On iOS, long-press the Home Screen icon and tap 'Remove App'. Uninstalling removes all cached data from that device.",
      },
      {
        question: "Does installing affect my existing bookmarks?",
        answer:
          "No. Installing the PWA creates a new standalone application icon on your device. Your existing browser bookmarks remain unchanged and unaffected. The PWA has its own separate data store from the browser profile.",
      },
      {
        question: "Why is there no install button on iOS Safari?",
        answer:
          "iOS Safari does not display an install button, banner, or prompt for PWAs. Apple requires users to manually add PWAs through the Share menu. This is consistent across all PWAs on iOS — it is not specific to this application. Tap the Share icon and choose 'Add to Home Screen' to install.",
      },
    ],
  },
  {
    id: "features",
    label: "Features",
    icon: "✨",
    items: [
      {
        question: "Does the app work offline?",
        answer:
          "Yes. After the initial visit, the service worker caches essential assets and previously visited pages. You can browse that cached content without an internet connection. Pages you have not visited while online will not be available offline — the service worker caches on first visit, not proactively. Dynamic content that requires server-side rendering may also be unavailable offline.",
      },
      {
        question: "How does the app update?",
        answer:
          "Updates are delivered automatically through the service worker. When a new version is deployed, the service worker detects it on the next visit and prompts you to reload. The update downloads in the background and activates when you confirm. The process typically takes less than a second. If you dismiss the prompt, the update applies on the next page navigation.",
      },
      {
        question: "Is my data synced across devices?",
        answer:
          "No. All preferences and cached data are stored locally on each device using the Cache API and localStorage. There is no cloud sync, account system, or server-side data storage for user preferences. Each installation operates independently with its own local data store.",
      },
      {
        question: "Does the app support dark mode?",
        answer:
          "Yes. The application uses a dark theme by default with a background color of #0a0a0a and white text at varying opacity levels. The theme respects your system-level appearance settings via the prefers-color-scheme media query. There is no manual toggle — the app follows your operating system setting.",
      },
      {
        question: "Is there a search feature?",
        answer:
          "Yes. The documentation section includes a full-text search that indexes all documentation pages. The FAQ section has a dedicated search and category filter. The search runs entirely client-side — no data is sent to a server. Results appear as you type.",
      },
      {
        question: "Does the app work on tablets?",
        answer:
          "Yes. The application is fully responsive and adapts to tablet screen sizes including iPad, Android tablets, and iPadOS. The layout adjusts spacing, navigation patterns, and touch targets for the larger viewport. The documentation sidebar collapses into an overlay on smaller tablet widths.",
      },
      {
        question: "Can I share pages from the app?",
        answer:
          "Yes. On mobile devices with the Web Share API (Android Chrome, iOS Safari), you can share specific pages via the native share sheet. On desktop, copy the URL from the address bar. The PWA does not intercept share targets from other apps — it only sends shares, not receives them.",
      },
    ],
  },
  {
    id: "technical",
    label: "Technical",
    icon: "⚙️",
    items: [
      {
        question: "What technology stack does the app use?",
        answer:
          "The application is built with Next.js 16.2 (App Router), React 19.2, TypeScript 5, and Tailwind CSS 4. Animations use Framer Motion 12.42. The contact form uses the Resend API for email delivery. The app is deployed on Vercel. Testing uses Playwright for E2E coverage.",
      },
      {
        question: "Is the source code available?",
        answer:
          "The source code is available on GitHub at github.com/savanpatel/savan-portfolio. You can view the repository, inspect the code, and contribute improvements through pull requests. See the Contributing guide for the workflow.",
      },
      {
        question: "How much storage does the app use?",
        answer:
          "The application typically uses between 10-30 MB of storage for cached assets. This includes HTML, CSS, JavaScript bundles, fonts, and images needed for offline operation. The exact amount depends on which pages you have visited — each visited page adds its cached content to the service worker cache.",
      },
      {
        question: "Does the app require JavaScript?",
        answer:
          "Yes. JavaScript is required for core functionality including navigation, theming, service worker registration, the install prompt, and animations. Without JavaScript enabled, the application will not render or function. The server-rendered HTML provides the initial structure, but interactivity requires JavaScript.",
      },
      {
        question: "Does the app drain battery?",
        answer:
          "No. The application runs only when you actively use it. The service worker remains dormant when the app is not open. No background processes, continuous network requests, or animations run when the app is in the background or minimized.",
      },
      {
        question: "Can I use the app on a slow internet connection?",
        answer:
          "Yes. After the initial visit, most content is served from the local cache. The initial load may take longer on a poor connection, but subsequent visits are fast regardless of network speed. The app is designed to be functional on 2G connections after the initial caching is complete.",
      },
    ],
  },
  {
    id: "privacy",
    label: "Privacy",
    icon: "🔒",
    items: [
      {
        question: "What data does the app collect?",
        answer:
          "The application does not collect personal data, analytics, or tracking information. There are no third-party analytics scripts, advertising trackers, or data collection mechanisms. The only external call is to the Resend API when you submit the contact form, which sends the form data you entered. Usage is entirely private.",
      },
      {
        question: "Does the app use cookies?",
        answer:
          "No cookies are used for tracking or analytics. The only storage mechanism is the Cache API managed by the service worker for offline functionality and localStorage for UI preferences. No third-party cookies, advertising scripts, or tracking pixels are present in the application.",
      },
      {
        question: "Is the app secure?",
        answer:
          "Yes. The application uses HTTPS for all communications, implements a strict Content Security Policy, and follows modern security best practices. No sensitive data is stored locally. The service worker only caches static assets. The contact form transmits data directly to the Resend API over HTTPS.",
      },
      {
        question: "Does the app share data with third parties?",
        answer:
          "No. The application does not share, sell, or transmit any user data to third parties. There are no third-party analytics providers, advertising networks, or social media trackers integrated into the application. The only third-party service interaction is the Resend API for contact form emails.",
      },
    ],
  },
  {
    id: "troubleshooting",
    label: "Troubleshooting",
    icon: "🔧",
    items: [
      {
        question: "The install option doesn't appear. What should I do?",
        answer:
          "First, verify you are using a supported browser (Chrome, Edge, Opera, or Samsung Internet on mobile). The install prompt only appears after the browser verifies the app meets PWA criteria over HTTPS. Try clearing the browser cache, visiting the site again, and waiting a few seconds. On iOS, there is no install prompt — use the Share menu instead. If the issue persists, check that no browser extensions are blocking service worker registration.",
      },
      {
        question: "The app shows a browser frame after installation.",
        answer:
          "This occurs if the service worker did not register correctly or the start_url in the manifest failed to resolve. Uninstall the app, clear browser data for this site (cache and storage), visit the site fresh, and reinstall. Ensure JavaScript is enabled and no browser policies are blocking service workers.",
      },
      {
        question: "Pages show errors when offline.",
        answer:
          "Only pages you have previously visited while online are cached for offline use. If you see an error, that specific page has not been cached yet. Visit the page while online first, then it will be available on subsequent offline visits. Dynamic content that requires server-side rendering may never be available offline.",
      },
      {
        question: "The app shows outdated content after an update.",
        answer:
          "The service worker may be serving cached assets from a previous version. Hard reload with Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (macOS). If that does not work, open DevTools > Application > Storage and clear the cached data for this site. Alternatively, go to the browser's site settings and clear stored data. Reload the page to fetch the latest version.",
      },
      {
        question: "The app is running slowly. How can I fix it?",
        answer:
          "Clear the application cache via DevTools > Application > Storage to remove outdated or corrupted files. Close unnecessary tabs and background applications. Update your browser to the latest version. On mobile, uninstalling and reinstalling the app resets the cache completely. Check available storage space on your device — low storage can degrade performance.",
      },
    ],
  },
]

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border border-white/10 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white/5 hover:bg-white/10 transition-colors"
      >
        <span className="text-white font-medium text-sm pr-4">
          {item.question}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-white/50 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 py-4 text-sm text-white/60 leading-relaxed border-t border-white/5">
          {item.answer}
        </div>
      </div>
    </div>
  )
}

export default function ClientPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase().trim()

    return faqData
      .filter((cat) => activeCategory === "all" || cat.id === activeCategory)
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            !query ||
            item.question.toLowerCase().includes(query) ||
            item.answer.toLowerCase().includes(query)
        ),
      }))
      .filter((cat) => cat.items.length > 0)
  }, [searchQuery, activeCategory])

  const totalResults = useMemo(
    () => filteredData.reduce((sum, cat) => sum + cat.items.length, 0),
    [filteredData]
  )

  const toggleItem = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  return (
    <DocPage
      title="Frequently Asked Questions"
      description={`Search ${faqData.reduce((s, c) => s + c.items.length, 0)} questions across ${faqData.length} categories to find answers about installation, features, technical details, and privacy.`}
      toc={faqData.map((cat) => ({
        id: cat.id,
        label: `${cat.icon} ${cat.label}`,
      }))}
      section="Reference"
    >
      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Search questions and answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeCategory === "all"
                ? "bg-white/20 text-white"
                : "bg-white/5 text-white/50 hover:text-white/70 hover:bg-white/10"
            }`}
          >
            All ({faqData.reduce((s, c) => s + c.items.length, 0)})
          </button>
          {faqData.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeCategory === cat.id
                  ? "bg-white/20 text-white"
                  : "bg-white/5 text-white/50 hover:text-white/70 hover:bg-white/10"
              }`}
            >
              {cat.icon} {cat.label} ({cat.items.length})
            </button>
          ))}
        </div>

        {searchQuery && (
          <p className="text-xs text-white/40">
            Showing {totalResults} result{totalResults !== 1 ? "s" : ""} for
            &ldquo;{searchQuery}&rdquo;
          </p>
        )}

        <div className="space-y-8">
          {filteredData.map((cat) => (
            <div key={cat.id} id={cat.id}>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className="text-xs text-white/40 font-normal">
                  ({cat.items.length})
                </span>
              </h3>
              <div className="space-y-2">
                {cat.items.map((item) => {
                  const key = `${cat.id}-${item.question}`
                  return (
                    <AccordionItem
                      key={key}
                      item={item}
                      isOpen={openItems.has(key)}
                      onToggle={() => toggleItem(key)}
                    />
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/40 text-sm">
              No questions found matching &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              onClick={() => {
                setSearchQuery("")
                setActiveCategory("all")
              }}
              className="mt-3 text-xs text-white/60 hover:text-white transition-colors underline"
            >
              Clear search
            </button>
          </div>
        )}

        <div className="mt-8 p-5 bg-white/5 border border-white/10 rounded-lg">
          <p className="text-sm text-white/60">
            <span className="text-white font-medium">Can&apos;t find your answer? </span>
            Check the{" "}
            <Link
              href="/docs/reference/troubleshooting"
              className="text-white/80 hover:text-white underline underline-offset-2"
            >
              Troubleshooting
            </Link>{" "}
            guide or open an issue on the{" "}
            <a
              href="https://github.com/savanpatel/savan-portfolio/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white underline underline-offset-2"
            >
              GitHub repository
            </a>
            .
          </p>
        </div>

        <div className="mt-4 p-4 bg-white/[0.02] border border-white/[0.06] rounded-lg">
          <p className="text-xs text-white/30">
            FAQ content is current as of version <span className="font-mono">{APP_VERSION}</span> (<span className="font-mono">{LAST_UPDATED}</span>).
            New questions are added as they are reported by users.
          </p>
        </div>
      </div>
    </DocPage>
  )
}
