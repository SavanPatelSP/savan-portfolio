"use client";

import Link from "next/link";
import { DocPage, Callout, CodeBlock, InlineCode } from "@/components/docs/DocLayout";
import { APP_VERSION, LAST_UPDATED } from "@/data/docs";

const toc = [
  { id: "core-web-vitals", label: "Core Web Vitals Targets" },
  { id: "lcp", label: "Largest Contentful Paint (LCP)" },
  { id: "cls", label: "Cumulative Layout Shift (CLS)" },
  { id: "inp", label: "Interaction to Next Paint (INP)" },
  { id: "ttfb", label: "Time to First Byte (TTFB)" },
  { id: "image-optimization", label: "Image Optimization Pipeline" },
  { id: "code-splitting", label: "Code Splitting and Bundle Analysis" },
  { id: "caching-layers", label: "Caching Layer Architecture" },
  { id: "best-practices", label: "Best Practices" },
  { id: "common-mistakes", label: "Common Mistakes" },
  { id: "limitations", label: "Limitations" },
];

export default function PerformanceClientPage() {
  return (
    <DocPage
      title="Performance"
      description="How the Portfolio App achieves and maintains good Core Web Vitals — covering the optimization pipeline from image processing and code splitting through caching layers, with specific targets, measurement approach, and known constraints."
      toc={toc}
      section="Features"
    >
      <section id="core-web-vitals">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          Core Web Vitals Targets
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Core Web Vitals are a set of metrics that Google uses to measure real-world user experience. The application targets &quot;Good&quot; ratings on all five metrics. These targets are more aggressive than the &quot;Good&quot; thresholds because the app is a static site with minimal JavaScript — it has structural advantages that make aggressive targets achievable.
        </p>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Core Web Vitals Targets</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Metric        What It Measures              Target    "Good"
                                              (This App) Threshold
──────────────────────────────────────────────────────────────
LCP           Time for largest              &lt; 1.5s    &lt; 2.5s
              visible element to
              render

CLS           Layout shift score            &lt; 0.05    &lt; 0.1
              (unexpected movement
              of content)

INP           Time from input to            &lt; 100ms   &lt; 200ms
              next visual frame
              (responsiveness)

TTFB          Time from request             &lt; 200ms   &lt; 800ms
              to first byte of
              response

FCP           Time for first visible        &lt; 0.8s    &lt; 1.8s
              content to paint`}
            </code>
          </pre>
        </div>

        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          These targets are measured using both synthetic testing (Lighthouse) and real user monitoring (Vercel Analytics). The gap between the target and the &quot;Good&quot; threshold provides a buffer — if a metric regresses slightly, it still passes the &quot;Good&quot; threshold.
        </p>
      </section>

      <section id="lcp">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Largest Contentful Paint (LCP)
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          LCP measures how long it takes for the largest visible element (typically a hero image or heading) to render in the viewport. For this application, the primary LCP element is usually the page title or hero image on the dashboard.
        </p>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          What Affects LCP in This App
        </h3>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Hero images use priority loading.</strong> Above-the-fold images are rendered with <InlineCode>priority</InlineCode> in the Next.js Image component, which adds a <InlineCode>&lt;link rel=&quot;preload&quot;&gt;</InlineCode> tag to the document head. This ensures the browser starts downloading the image before JavaScript executes.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Critical CSS is inlined.</strong> The CSS needed to render above-the-fold content is inlined in the document <InlineCode>&lt;head&gt;</InlineCode>. The browser does not need to wait for an external CSS file to start painting.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Service worker accelerates repeat visits.</strong> On subsequent loads, all assets are served from the cache, which typically delivers LCP under 500ms regardless of network conditions.</span>
          </li>
        </ul>

        <Callout type="info" title="LCP Element Identification">
          The LCP element varies per page. On the dashboard, it is typically the page heading. On project pages with hero images, it is the image. You can identify the LCP element on any page using Chrome DevTools: Performance tab &gt; record a load &gt; look for the &quot;Largest Contentful Paint&quot; marker in the timeline.
        </Callout>
      </section>

      <section id="cls">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Cumulative Layout Shift (CLS)
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          CLS measures unexpected layout movement during the page lifecycle. A CLS score of 0 means no content shifted. A score above 0.1 indicates significant layout instability that degrades the user experience. The application targets below 0.05.
        </p>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Sources of Layout Shift and Their Mitigations
        </h3>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">CLS Sources and Mitigations</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Source                    Mitigation                CLS Impact
──────────────────────────────────────────────────────────────
Images without            width/height attributes    Zero
dimensions                on Next.js Image

Web fonts (FOUT)          font-display: swap with    Minimal
                          size-adjust to match
                          fallback metrics

Dynamic content           Reserved space via         Zero
(toast, banner)           fixed/absolute positioning
                          or skeleton placeholders

Embeds (iframes)          Explicit width/height      Zero
                          or aspect-ratio CSS

Late-loading CSS          Critical CSS inlined,      Zero
                          non-critical loaded
                          asynchronously`}
            </code>
          </pre>
        </div>

        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Font loading is the most common source of CLS in web applications. When a custom font loads, the browser may reflow text if the font metrics differ from the fallback font. The application mitigates this with <InlineCode>font-display: swap</InlineCode> combined with <InlineCode>size-adjust</InlineCode> in the <InlineCode>@font-face</InlineCode> declaration. This adjusts the fallback font to match the custom font&apos;s metrics, eliminating reflow.
        </p>
      </section>

      <section id="inp">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Interaction to Next Paint (INP)
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          INP measures the latency of all interactions (clicks, taps, key presses) throughout the page lifecycle. It captures the worst-case responsiveness, not just the first interaction. A good INP means the app responds quickly to every user input.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The application keeps INP low through these techniques:
        </p>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Minimal JavaScript on the main thread.</strong> The initial bundle is small (~80KB gzipped), and heavy components (charts, animations) are lazy-loaded. This keeps the main thread free to handle input events.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">No long tasks during interaction.</strong> Animations use <InlineCode>transform</InlineCode> and <InlineCode>opacity</InlineCode> (which are composited on the GPU) instead of layout-triggering properties like <InlineCode>width</InlineCode> or <InlineCode>top</InlineCode>. This prevents layout thrashing during animations.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Intersection Observer for lazy rendering.</strong> Components below the fold are not rendered until they enter the viewport. This reduces the amount of DOM that event handlers need to traverse.</span>
          </li>
        </ul>
      </section>

      <section id="ttfb">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Time to First Byte (TTFB)
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          TTFB measures the time from the initial request to the first byte of the response. This is primarily a server-side metric, influenced by the hosting platform&apos;s edge network, server response time, and DNS resolution.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The application achieves low TTFB through:
        </p>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Static generation.</strong> All pages are pre-rendered at build time. The server does not compute anything at request time — it serves a static file from the CDN edge. This eliminates server-side processing latency.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Edge caching.</strong> Vercel&apos;s Edge Network caches static files at points of presence worldwide. A user in Tokyo gets a response from the Tokyo edge, not from a US-based origin server.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Service worker on repeat visits.</strong> After the first load, the service worker serves HTML from cache, bypassing the network entirely. TTFB on repeat visits is typically under 10ms.</span>
          </li>
        </ul>
      </section>

      <section id="image-optimization">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Image Optimization Pipeline
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Images are often the largest assets on a page and the most impactful to optimize. The application uses the Next.js Image component, which provides an automated optimization pipeline:
        </p>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Image Optimization Pipeline</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Source Image
    │
    ▼
Format Conversion
    ├── WebP (preferred, ~30% smaller than JPEG)
    ├── AVIF (if browser supports, ~50% smaller)
    └── JPEG/PNG (fallback)
    │
    ▼
Responsive Sizing
    ├── Generates srcset with multiple widths
    ├── Browser picks the optimal size for viewport
    └── Prevents downloading a 2000px image on a 375px screen
    │
    ▼
Quality Optimization
    ├── JPEG: 75-85% quality (visually lossless)
    ├── WebP: 75-80% quality
    └── AVIF: 65-75% quality
    │
    ▼
Lazy Loading
    ├── Above-fold: priority loading (preload link)
    ├── Below-fold: loading="lazy" (deferred)
    └── Blur placeholder (LQIP) shown while loading
    │
    ▼
Delivery
    ├── Served from CDN edge
    ├── Cached with immutable headers (hashed filename)
    └── Service worker cached on second load`}
            </code>
          </pre>
        </div>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Format Support by Browser
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The Next.js Image component automatically serves the best format the browser supports:
        </p>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Format Support Matrix</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Format    Chrome    Firefox    Safari    Edge    iOS Safari
────────────────────────────────────────────────────────────
AVIF      85+       93+        16.4+    85+     16.4+
WebP      32+       65+        14+      18+     14+
JPEG      All       All        All      All     All
PNG       All       All        All      All     All`}
            </code>
          </pre>
        </div>
      </section>

      <section id="code-splitting">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Code Splitting and Bundle Analysis
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The application is split into granular chunks so users only download the code needed for the current page. Next.js App Router automatically splits code by route, and manual dynamic imports are used for heavy components.
        </p>

        <CodeBlock
          code={`// Dynamic import for components not needed on initial render
const ProjectChart = dynamic(
  () => import("@/components/charts/ProjectChart"),
  {
    loading: () => <ChartSkeleton />,
    ssr: false, // Skip server-side rendering for this component
  }
);

// Route-level splitting is automatic with App Router
// Each page file becomes its own chunk:
// /app/dashboard/page.js    → dashboard-[hash].js
// /app/projects/page.js     → projects-[hash].js
// /app/docs/**/page.js      → docs-[hash].js`}
          language="typescript"
          filename="code splitting patterns"
        />

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Typical Chunk Breakdown</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Chunk                    Size (gzip)    When Downloaded
──────────────────────────────────────────────────────────
React framework           ~40 KB        First visit
App shell                 ~15 KB        First visit
Dashboard page            ~8 KB         On /dashboard
Projects page             ~6 KB         On /projects
Documentation pages       ~5 KB         On /docs
Settings page             ~3 KB         On /settings
Framer Motion (vendor)   ~12 KB         On first animation
Chart library            ~10 KB         On chart render`}
            </code>
          </pre>
        </div>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Bundle Size Budgets
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The following budgets are enforced to prevent bundle size regressions:
        </p>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Initial JavaScript (first page load):</strong> Under 80KB gzipped. This includes the React framework, app shell, and first-route code.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Total CSS:</strong> Under 20KB gzipped. Tailwind CSS purges all unused classes at build time.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Per-route chunks:</strong> Under 15KB gzipped each. No single page should require more than 15KB of route-specific code.</span>
          </li>
        </ul>

        <Callout type="tip" title="Running Bundle Analysis">
          Run <InlineCode>ANALYZE=true npm run build</InlineCode> to generate a visual bundle analysis report. This produces an interactive treemap showing every dependency and its size. Use it to identify unexpectedly large dependencies or dead code that can be removed.
        </Callout>
      </section>

      <section id="caching-layers">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Caching Layer Architecture
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Performance on repeat visits is driven by a multi-layer caching strategy. Each layer operates independently and provides different guarantees:
        </p>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Caching Layers</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Layer              Where              TTL              Use Case
──────────────────────────────────────────────────────────────────
Browser HTTP       Browser disk       Immutable         Content-hashed
cache              cache              (filename)        assets (JS, CSS)

Service Worker     Browser Cache      Varies by         All assets,
cache              API                asset type        offline support

CDN edge cache     Vercel Edge        60s-300s          HTML pages,
                    Network            (revalidate)      API responses

DNS cache          OS/Browser         Varies            Domain resolution
                    DNS cache          (typically
                                       300s-3600s)

localStorage       Browser            Until cleared     User preferences,
                    storage                              UI state`}
            </code>
          </pre>
        </div>

        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The first visit uses all layers except the service worker cache (which is populated during that visit). Repeat visits benefit from the service worker cache, which provides the fastest access (under 10ms for cached assets) and works even when offline.
        </p>
      </section>

      <section id="best-practices">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Best Practices
        </h2>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Monitor bundle size on every PR.</strong> Use <InlineCode>ANALYZE=true</InlineCode> before merging to catch unexpected size increases. A 5KB increase in the initial bundle is a 6% regression on an 80KB budget.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Use Lighthouse CI to gate deployments.</strong> Automated Lighthouse audits on every build prevent performance regressions from reaching production. Set score thresholds and fail the build if they are not met.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span><strong className="text-white/60">Test on slow networks and low-end devices.</strong> Chrome DevTools network throttling (Slow 3G) and CPU throttling (6x) simulate the experience on low-end Android devices. If the app is usable under these conditions, it will be fast on any device.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span><strong className="text-white/60">Do not add analytics or tracking scripts.</strong> Every third-party script adds latency, layout shift, and JavaScript execution time. The zero-analytics policy is a deliberate performance choice as well as a privacy choice.</span>
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
            <span><strong className="text-white/60">Importing entire libraries for one function.</strong> Importing all of lodash (<InlineCode>import _ from &quot;lodash&quot;</InlineCode>) adds 70KB gzipped. Importing only the needed function (<InlineCode>import debounce from &quot;lodash/debounce&quot;</InlineCode>) adds under 1KB. Tree shaking only works with ES module imports.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span><strong className="text-white/60">Using <InlineCode>next/image</InlineCode> without width/height.</strong> Omitting dimensions forces the browser to download the image before calculating its layout, which causes CLS. Always provide explicit <InlineCode>width</InlineCode> and <InlineCode>height</InlineCode> props, or use <InlineCode>fill</InlineCode> with a sized container.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span><strong className="text-white/60">Lazy-loading above-the-fold images.</strong> Images visible in the initial viewport should use <InlineCode>priority</InlineCode>, not <InlineCode>loading=&quot;lazy&quot;</InlineCode>. Lazy-loading an above-the-fold image delays its download and hurts LCP.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span><strong className="text-white/60">Not measuring on actual devices.</strong> Lighthouse scores on a development machine with a fast CPU and fiber connection are not representative. Always test with network throttling and CPU throttling enabled, or use real user monitoring data.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span><strong className="text-white/60">Adding client-side rendering for data that could be static.</strong> If data is known at build time, it should be rendered at build time (SSG). Client-side fetching adds TTFB + parse time + render time, while SSG delivers the result in the first HTML response.</span>
          </li>
        </ul>
      </section>

      <section id="limitations">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Limitations
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Performance optimizations have these constraints:
        </p>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Known Limitations</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Limitation                     Impact
────────────────────────────────────────────────────────────
First visit performance is     No service worker cache on
dependent on network speed     first load. Slow connections
                               (3G) may see 3-5s LCP.

Image optimization happens     New images are optimized at
at build time, not on-demand   request time. Adding a new
                               image format (e.g., AVIF)
                               requires a rebuild.

No server-side rendering       Dynamic, user-specific content
(SSR) for real-time data       cannot be pre-rendered. If
                               real-time data is added in
                               the future, SSR or ISR would
                               be needed.

Font loading causes            Even with size-adjust, font
minor CLS on first load        loading causes a brief flash
                               of unstyled text. CLS is
                               minimal but not zero.

Lighthouse scores are          Real user metrics may differ
synthetic                      from Lighthouse due to device
                               variance, network conditions,
                               and browser extensions.`}
            </code>
          </pre>
        </div>

        <Callout type="tip" title="Version Note">
          Performance metrics and optimizations described here are for version{" "}
          <InlineCode>{APP_VERSION}</InlineCode> as of <InlineCode>{LAST_UPDATED}</InlineCode>.
          Continuous monitoring ensures these targets are maintained across updates.
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
            <p className="text-[13px] text-white/30">How service worker caching improves repeat-visit performance.</p>
          </Link>
          <Link
            href="/docs/architecture/build-deploy"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Build &amp; Deploy</p>
            <p className="text-[13px] text-white/30">Build output analysis, bundle budgets, and deployment pipeline.</p>
          </Link>
          <Link
            href="/docs/architecture/seo"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">SEO</p>
            <p className="text-[13px] text-white/30">How Core Web Vitals impact search engine ranking.</p>
          </Link>
          <Link
            href="/docs/architecture/technology-stack"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Technology Stack</p>
            <p className="text-[13px] text-white/30">Next.js Image component, Tailwind CSS, and optimization tools.</p>
          </Link>
        </div>
      </section>
    </DocPage>
  );
}
