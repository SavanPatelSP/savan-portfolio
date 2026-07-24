"use client";

import Link from "next/link";
import { DocPage, Callout, InlineCode } from "@/components/docs/DocLayout";
import { APP_VERSION, LAST_UPDATED } from "@/data/documentation";

const toc = [
  { id: "zero-collection", label: "Zero Data Collection Architecture" },
  { id: "no-analytics", label: "No Analytics — What That Means" },
  { id: "no-tracking", label: "No Tracking Mechanisms" },
  { id: "no-third-party", label: "No Third-Party Requests" },
  { id: "data-storage", label: "What Data Is Stored Locally" },
  { id: "data-not-stored", label: "What Is Never Stored" },
  { id: "https-tls", label: "HTTPS and TLS Encryption" },
  { id: "security-headers", label: "Security Headers" },
  { id: "csp", label: "Content Security Policy" },
  { id: "best-practices", label: "Best Practices" },
  { id: "common-mistakes", label: "Common Mistakes" },
  { id: "limitations", label: "Limitations" },
];

export default function PrivacyClientPage() {
  return (
    <DocPage
      title="Privacy & Security"
      description="The complete data handling approach — zero collection architecture, no analytics, no tracking, no third-party requests, local-only storage, HTTPS encryption, security headers, and Content Security Policy."
      toc={toc}
      section="Features"
    >
      <section id="zero-collection">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          Zero Data Collection Architecture
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The application does not collect, store, transmit, or process any user data. This is not a privacy policy document — it is a technical fact verified by the absence of data collection infrastructure. There are no analytics endpoints, no tracking servers, no databases that receive user interactions, and no third-party services that process behavioral data.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Every piece of data in the application — theme preferences, sidebar state, UI configuration — exists solely on the user&apos;s device in browser storage. If the user clears their browser data, all application state is reset. There is no backup, no sync, and no recovery mechanism because no server-side storage is involved.
        </p>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Why This Matters
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Most web applications send data to third-party services — analytics providers, advertising networks, social media widgets, error tracking services. Each of these is a data collection vector. Even &quot;anonymous&quot; analytics can be fingerprinted to identify individual users across sessions. By not including any of these services, the application eliminates an entire category of privacy risk.
        </p>

        <Callout type="info" title="Technical Verification">
          You can verify the zero-collection claim by opening browser DevTools, navigating to the Network tab, and observing that every request goes to the same origin. There are no cross-origin requests to analytics endpoints, tracking servers, or third-party domains.
        </Callout>
      </section>

      <section id="no-analytics">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          No Analytics — What That Means
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The application includes zero analytics code. No Google Analytics, no Plausible, no Fathom, no Mixpanel, no PostHog, no custom analytics implementation. This means:
        </p>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">No page views are counted.</strong> The server does not know which pages are visited, how often, or by whom.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">No session durations are measured.</strong> There is no tracking of how long a user stays on a page or within the app.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">No user journeys are mapped.</strong> The sequence of pages a user visits is not recorded or analyzed.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">No conversion funnels are tracked.</strong> There is no measurement of whether users complete specific actions.</span>
          </li>
        </ul>

        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          This means the site owner has no visibility into usage patterns. There is no dashboard showing visitor counts, no geographic breakdown, no device statistics. This is a deliberate trade-off: privacy in exchange for analytics insight.
        </p>
      </section>

      <section id="no-tracking">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          No Tracking Mechanisms
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Beyond the absence of analytics, the application does not use any tracking mechanism:
        </p>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span><strong className="text-white/60">No third-party cookies.</strong> No cookies are set by any domain other than the application&apos;s own origin.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span><strong className="text-white/60">No first-party tracking cookies.</strong> The application does not set cookies at all. Authentication state (if any) is managed through in-memory session variables, not cookies.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span><strong className="text-white/60">No browser fingerprinting.</strong> The application does not collect screen resolution, installed fonts, WebGL vendor, canvas fingerprint, AudioContext fingerprint, or any other browser characteristic that could be used to identify a user.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span><strong className="text-white/60">No UTM parameter collection.</strong> URL parameters like <InlineCode>?utm_source=...</InlineCode> are not captured, stored, or transmitted to any server.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span><strong className="text-white/60">No referral tracking.</strong> The <InlineCode>Referer</InlineCode> header is controlled by the <InlineCode>Referrer-Policy</InlineCode> security header, which limits it to same-origin requests only.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span><strong className="text-white/60">No advertising pixels.</strong> No Facebook Pixel, Google Ads tag, Twitter tag, or any other advertising tracking code.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span><strong className="text-white/60">No social media widgets.</strong> No embedded tweets, Facebook like buttons, or LinkedIn share widgets that report user activity back to social media platforms.</span>
          </li>
        </ul>
      </section>

      <section id="no-third-party">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          No Third-Party Requests
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The application makes zero requests to third-party domains. Every resource — JavaScript, CSS, images, fonts, icons — is served from the same origin. This is verifiable in the Network tab of browser DevTools: every request in the list shows the same domain.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          This has several implications:
        </p>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">No cross-origin tracking.</strong> Third-party domains can track users across sites via cookies, cache partitioning, or DNS fingerprinting. Since no third-party requests are made, this tracking vector is eliminated.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">No supply-chain risk from third-party scripts.</strong> A compromised analytics library (like the 2018 SolarWinds-style attack on npm packages) cannot inject malicious code because no third-party scripts are loaded.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">No content blocking.</strong> Ad blockers and privacy extensions cannot break the application because there is nothing to block. The app works identically regardless of what extensions the user has installed.</span>
          </li>
        </ul>

        <Callout type="note" title="Verifying No Third-Party Requests">
          Open DevTools &gt; Network tab &gt; filter by &quot;Third-party&quot; (Chrome) or check the &quot;Domain&quot; column. Every request should show the same domain. If any cross-origin request appears, it indicates a third-party resource that should be investigated.
        </Callout>
      </section>

      <section id="data-storage">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          What Data Is Stored Locally
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          All persistent data is stored locally using browser storage APIs. None of this data is ever sent to a server or shared with other applications. The storage mechanisms used:
        </p>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Local Storage Map</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Storage API         What Is Stored            Size Limit
─────────────────────────────────────────────────────────────
localStorage        Theme preference          ~5-10 MB
                    UI layout settings        (varies by
                    Sidebar state             browser)
                    Active tab states

Cache API           HTML pages                ~50-100 MB
(service worker)    JavaScript bundles        (depends on
                    CSS stylesheets           available
                    Images                    disk space)
                    Fonts
                    Documentation data

IndexedDB           Not currently used,       ~unlimited
                    but available for         (disk
                    future structured data    dependent)`}
            </code>
          </pre>
        </div>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Storage Lifecycle
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          All stored data persists until the user explicitly clears browser data. The application does not implement automatic expiration or cleanup for localStorage. Cache API entries may be evicted by the browser under disk pressure (Least Recently Used policy). The application handles this gracefully — missing cache entries fall back to network requests.
        </p>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          What Happens When Data Is Cleared
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          If the user clears site data (via browser settings or a privacy extension), the following occurs:
        </p>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span><strong className="text-white/60">All localStorage is deleted.</strong> Theme preference, sidebar state, and UI settings reset to defaults.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span><strong className="text-white/60">All Cache API entries are deleted.</strong> Offline support is lost. The service worker must re-cache assets on the next visit.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span><strong className="text-white/60">The service worker is unregistered.</strong> The next visit requires a fresh registration and precache cycle.</span>
          </li>
        </ul>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Since no server-side data exists, there is nothing to restore. The app is fully functional after clearing data — it just needs to be visited again to rebuild the cache.
        </p>
      </section>

      <section id="data-not-stored">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          What Is Never Stored
        </h2>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Complete Data Inventory</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Category                 Stored              Not Stored
                         (Locally Only)      (Anywhere)
───────────────────────────────────────────────────────────
Theme preference          ✓ localStorage      ✗ Server
UI layout settings        ✓ localStorage      ✗ Server
Sidebar open/closed       ✓ localStorage      ✗ Server
Active route position     ✓ localStorage      ✗ Server
Cached static assets      ✓ Cache API         ✗ Server
Cached page content       ✓ Cache API         ✗ Server

User identity             ✗                   ✗ Nowhere
Browsing history          ✗                   ✗ Nowhere
IP address                ✗                   ✗ Not logged
Cookies                   ✗                   ✗ None set
Analytics events          ✗                   ✗ Not collected
Form submissions          ✗                   ✗ Not stored
Search queries            ✗                   ✗ Not logged
Device fingerprint        ✗                   ✗ Not collected
Location data             ✗                   ✗ Not accessed
Camera/microphone         ✗                   ✗ Not requested
Contacts list             ✗                   ✗ Not requested`}
            </code>
          </pre>
        </div>
      </section>

      <section id="https-tls">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          HTTPS and TLS Encryption
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The application is served exclusively over HTTPS. All communication between the browser and the server is encrypted using TLS 1.3 (the latest version of the Transport Layer Security protocol). HTTP requests are automatically redirected to HTTPS at the CDN level — before they reach the application.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          HTTPS provides three security guarantees:
        </p>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Encryption.</strong> Data in transit cannot be read by intermediaries (ISPs, public Wi-Fi operators, government surveillance).</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Integrity.</strong> Data cannot be modified in transit without detection. A man-in-the-middle cannot alter the response without breaking the TLS connection.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Authentication.</strong> The browser verifies the server&apos;s identity via a certificate issued by a trusted Certificate Authority. This prevents DNS hijacking and server impersonation.</span>
          </li>
        </ul>

        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          HTTPS is also a technical prerequisite for service workers. Browsers require a secure context (HTTPS or localhost) to register service workers. This means offline capabilities and PWA features only function over a secure connection.
        </p>
      </section>

      <section id="security-headers">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Security Headers
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The following security headers are configured on all responses. These headers instruct the browser to enforce specific security policies:
        </p>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Security Headers</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Header                       Value / Effect
─────────────────────────────────────────────────────────────
Strict-Transport-Security    Forces HTTPS for 2 years,
                             includes subdomains,
                             submitted to preload list

X-Content-Type-Options       Prevents MIME-type sniffing.
                             Browser must respect the
                             declared Content-Type.

X-Frame-Options              DENY — page cannot be
                             embedded in an iframe on
                             any other site.

X-XSS-Protection             Set to 0 — disables the
                             legacy XSS auditor (which
                             had its own vulnerabilities)

Referrer-Policy               strict-origin-when-cross-
                             origin — sends full referrer
                             for same-origin, only origin
                             for cross-origin, nothing
                             for downgrade (HTTP)

Permissions-Policy            camera=(), microphone=(),
                             geolocation=(),
                             interest-cohort=()
                             Disables all optional
                             browser APIs.`}
            </code>
          </pre>
        </div>
      </section>

      <section id="csp">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Content Security Policy
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The Content Security Policy (CSP) is the most restrictive security header. It defines which resources the browser is allowed to load. Since the application makes no third-party requests, the CSP is straightforward:
        </p>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Content Security Policy</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Directive        Value              Effect
─────────────────────────────────────────────────────────
default-src      'self'             Only load resources
                                    from same origin

script-src       'self'             No inline scripts,
                                    no eval(), no
                                    external scripts

style-src        'self'             Same-origin styles
                 'unsafe-inline'    Inline styles allowed
                                    (required for Tailwind)

img-src          'self'             Same-origin images
                 data:              Allow data: URLs for
                                    small inlines (LQIP)
                 blob:              Allow blob: URLs for
                                    dynamically created
                                    images

font-src         'self'             Only same-origin fonts

connect-src      'self'             Only same-origin
                                    fetch/XHR/WebSocket`}
            </code>
          </pre>
        </div>

        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The <InlineCode>&apos;unsafe-inline&apos;</InlineCode> directive for styles is required because Tailwind CSS generates inline styles at build time. This is a common and accepted exception — it does not weaken the CSP meaningfully because inline styles cannot execute JavaScript.
        </p>

        <Callout type="warning" title="CSP and Future Changes">
          If a third-party script is ever added (e.g., an embedded video player), the CSP will block it until the relevant directive is updated. This is intentional — the CSP acts as a safety net that prevents unauthorized resource loading.
        </Callout>
      </section>

      <section id="best-practices">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Best Practices
        </h2>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Audit third-party additions carefully.</strong> If a new dependency, font service, or API is considered, verify that it does not introduce tracking, analytics, or data collection. Every new external resource is a potential privacy and security risk.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Verify the CSP with an online scanner.</strong> Use tools like <InlineCode>securityheaders.com</InlineCode> to scan the deployed app and confirm that all security headers are present and correctly configured.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Check the Network tab regularly.</strong> Periodically open DevTools and verify that no cross-origin requests have been introduced accidentally. This catches privacy regressions before they ship.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span><strong className="text-white/60">Do not store sensitive data in localStorage.</strong> localStorage is accessible to any JavaScript running on the same origin. If an XSS vulnerability were exploited, localStorage data would be exposed. This app stores only non-sensitive UI preferences.</span>
          </li>
        </ul>
      </section>

      <section id="common-mistakes">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Common Mistakes
        </h2>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span><strong className="text-white/60">Adding a font CDN without updating CSP.</strong> Google Fonts, Font Awesome CDN, and similar services load from a third-party domain. The current CSP blocks them. If a font CDN is needed, the <InlineCode>font-src</InlineCode> directive must be updated.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span><strong className="text-white/60">Using analytics &quot;just for a week.&quot;</strong> A temporary analytics script that is never removed becomes a permanent data collection vector. If analytics are needed, they should be added deliberately with a clear privacy policy, not as a quick debugging tool.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span><strong className="text-white/60">Assuming &quot;anonymous&quot; analytics are safe.</strong> Even &quot;anonymous&quot; analytics can be fingerprinted. IP addresses, user agents, screen sizes, and timezone information can be combined to identify individual users. The only truly anonymous analytics approach is no analytics at all.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span><strong className="text-white/60">Forgetting to verify CSP after changes.</strong> If the CSP is relaxed to allow a new resource, verify that the relaxation is as narrow as possible. Instead of <InlineCode>script-src * </InlineCode>, use <InlineCode>script-src &apos;self&apos; https://specific-cdn.com</InlineCode>.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span><strong className="text-white/60">Storing sensitive data in localStorage.</strong> API tokens, personal information, or any data that should not be exposed to other scripts on the same origin should not be stored in localStorage. Use HttpOnly cookies or session storage for sensitive data.</span>
          </li>
        </ul>
      </section>

      <section id="limitations">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Limitations
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The privacy and security approach has these constraints:
        </p>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Known Limitations</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Limitation                     Impact
────────────────────────────────────────────────────────────
No usage analytics             Site owner has no visibility
                               into which pages are popular,
                               what devices are used, or
                               how many people visit.

No error reporting             Client-side JavaScript errors
                               are not reported to a server.
                               Errors can only be debugged
                               by reproducing them locally.

No user feedback mechanism     There is no built-in way for
                               users to report issues or
                               request features (beyond
                               external contact methods).

localStorage is not            If a user clears site data,
encrypted                      all preferences are lost.
                               There is no recovery.

localStorage is                XSS vulnerabilities (if any)
same-origin accessible         could access stored data.
                               Only non-sensitive data is
                               stored.

No subresource integrity       While scripts are same-origin,
(SRI) for own scripts          a compromised build pipeline
                               could inject malicious code.
                               SRI would require hash
                               management at build time.`}
            </code>
          </pre>
        </div>

        <Callout type="tip" title="Version Note">
          Privacy and security configurations described here are for version{" "}
          <InlineCode>{APP_VERSION}</InlineCode> as of <InlineCode>{LAST_UPDATED}</InlineCode>.
          Security headers and CSP are re-verified with each deployment.
        </Callout>
      </section>

      <section id="related">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Related
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/docs/features/offline"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Offline Experience</p>
            <p className="text-[13px] text-white/30">How cached data is stored locally on your device.</p>
          </Link>
          <Link
            href="/docs/architecture/service-worker"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Service Worker</p>
            <p className="text-[13px] text-white/30">How the service worker handles caching and scope.</p>
          </Link>
          <Link
            href="/docs/architecture/technology-stack"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Technology Stack</p>
            <p className="text-[13px] text-white/30">The technologies that enable a zero-collection architecture.</p>
          </Link>
          <Link
            href="/docs/architecture/build-deploy"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Build &amp; Deploy</p>
            <p className="text-[13px] text-white/30">Security headers and deployment configuration.</p>
          </Link>
        </div>
      </section>
    </DocPage>
  );
}
