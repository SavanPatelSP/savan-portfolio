"use client";

import Link from "next/link";
import { DocPage, Callout, CodeBlock, InlineCode } from "@/components/docs/DocLayout";
import { APP_VERSION, LAST_UPDATED } from "@/data/documentation";

const toc = [
  { id: "nextjs", label: "Next.js 16" },
  { id: "react", label: "React 19" },
  { id: "typescript", label: "TypeScript 5" },
  { id: "tailwind", label: "Tailwind CSS v4" },
  { id: "framer-motion", label: "Framer Motion" },
  { id: "pwa-apis", label: "PWA APIs" },
  { id: "resend", label: "Resend" },
  { id: "devtools", label: "Developer Tooling" },
  { id: "best-practices", label: "Best Practices" },
  { id: "limitations", label: "Limitations" },
  { id: "common-mistakes", label: "Common Mistakes" },
];

export default function TechnologyStackClientPage() {
  return (
    <DocPage
      title="Technology Stack"
      description="Every dependency in this application is chosen for a specific reason. This page documents what each technology does, why it was selected over alternatives, and how it is used throughout the codebase."
      toc={toc}
      section="Architecture"
    >
      <section id="nextjs">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          Next.js 16
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">What:</strong> Next.js is the React framework that
          handles routing, rendering, build optimization, and server-side logic. Version 16
          (16.2.9) is the current release used in this project.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">Why:</strong> Next.js was chosen over Vite, Remix, and
          plain CRA for three reasons: (1) The App Router provides nested layouts without wrapper
          components, which keeps the docs section&apos;s shared sidebar clean. (2) Static generation
          means every documentation page is pre-rendered at build time — no server is needed to
          serve them, which keeps hosting costs at zero on Vercel&apos;s free tier. (3) The{" "}
          <InlineCode>next/image</InlineCode> component handles AVIF/WebP conversion and responsive
          sizing without external services.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">When to update:</strong> Next.js releases minor versions
          frequently. Update when the changelog includes security patches or features you need.
          Major version upgrades (e.g., 16 → 17) should wait at least one patch cycle.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">How it is used:</strong> The{" "}
          <InlineCode>next.config.ts</InlineCode> configures image formats (AVIF, WebP), security
          headers (CSP, X-Frame-Options), and package import optimization for{" "}
          <InlineCode>lucide-react</InlineCode> and <InlineCode>framer-motion</InlineCode>. The App
          Router directory at <InlineCode>src/app/</InlineCode> defines all routes. Server
          Components handle layouts and data fetching; Client Components handle interactivity.
        </p>

        <CodeBlock
          code={`// next.config.ts — key configuration
const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1280, 1440, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 640, 750, 828],
    qualities: [60, 75, 85, 90],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async headers() {
    return [{
      source: "/((?!sitemap\\\\.xml|robots\\\\.txt).*)",
      headers: securityHeaders,
    }];
  },
};`}
          language="typescript"
          filename="next.config.ts"
        />

        <Callout type="info" title="Server Components by Default">
          In the App Router, every component is a Server Component unless marked with{" "}
          <InlineCode>&quot;use client&quot;</InlineCode>. This means layouts, data fetchers, and
          static content run on the server. Only components that use{" "}
          <InlineCode>useState</InlineCode>, <InlineCode>useEffect</InlineCode>, or browser APIs
          need the client directive.
        </Callout>
      </section>

      <section id="react">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          React 19
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">What:</strong> React 19 (19.2.4) is the UI library. It
          provides the component model, hooks system, and reconciliation engine that drives every
          visible part of the application.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">Why:</strong> React 19 was chosen over Preact or Solid
          because of the ecosystem breadth. Libraries like Framer Motion, Lucide React, and
          React Email all have first-class React support. React 19 specifically adds the{" "}
          <InlineCode>use()</InlineCode> hook for promise unwrapping in components, improved Server
          Component support, and the React Compiler that automatically memoizes — eliminating the
          need for manual <InlineCode>useMemo</InlineCode> and <InlineCode>useCallback</InlineCode>{" "}
          calls in most cases.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">How it is used:</strong> The component tree is split
          into two layers. Server Components (no <InlineCode>&quot;use client&quot;</InlineCode>)
          handle the docs layout sidebar, page metadata, and static content rendering. Client
          Components handle the contact form, sidebar toggle, cookie consent, install prompt, and
          all animated UI. The boundary between server and client is drawn at the point where
          interactivity begins.
        </p>

        <Callout type="warning" title="Client/Server Boundary">
          When you import a Client Component into a Server Component, the Client Component&apos;s
          JavaScript is included in the client bundle. Importing a Server Component into a Client
          Component is not allowed — pass the Server Component as{" "}
          <InlineCode>children</InlineCode> or use <InlineCode>next/dynamic</InlineCode> with{" "}
          <InlineCode>ssr: false</InlineCode> instead.
        </Callout>
      </section>

      <section id="typescript">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          TypeScript 5
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">What:</strong> TypeScript 5 is the language. Every
          source file is <InlineCode>.ts</InlineCode> or <InlineCode>.tsx</InlineCode> — there are
          zero <InlineCode>.js</InlineCode> files in the codebase.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">Why:</strong> TypeScript catches errors at compile time
          that would otherwise become runtime bugs. In this codebase, the data layer exports typed
          arrays (projects, docs navigation, downloads), and the component props are explicitly
          typed. A typo in a field name or a missing required prop fails the build, not in the
          browser. TypeScript 5&apos;s faster incremental compilation also keeps the dev server
          responsive.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">How it is used:</strong> Strict mode is enabled. Props
          interfaces are defined in the same file as the component. Data files in{" "}
          <InlineCode>src/data/</InlineCode> export typed interfaces alongside their data. The{" "}
          <InlineCode>tsconfig.json</InlineCode> extends <InlineCode>next/tsconfig.json</InlineCode>{" "}
          with additional strictness options.
        </p>
      </section>

      <section id="tailwind">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Tailwind CSS v4
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">What:</strong> Tailwind CSS v4 is the styling system.
          It uses a utility-first approach where all styling is applied through class names in JSX —
          there are no CSS files, CSS modules, or styled-components in the project.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">Why:</strong> Tailwind eliminates context switching
          between component files and stylesheet files. Design tokens (colors, spacing, fonts) are
          defined once in <InlineCode>globals.css</InlineCode> using v4&apos;s CSS-first
          configuration with <InlineCode>@theme inline</InlineCode>, then referenced as utility
          classes everywhere. v4&apos;s new Oxide engine compiles styles at build time with zero
          runtime overhead, producing ~15 KB of CSS for the entire application.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">How it is used:</strong> The{" "}
          <InlineCode>cn()</InlineCode> utility in <InlineCode>src/lib/utils.ts</InlineCode> merges{" "}
          <InlineCode>clsx</InlineCode> (conditional classes) with{" "}
          <InlineCode>tailwind-merge</InlineCode> (conflict resolution). This is used throughout
          components for conditional styling without class name collisions.
        </p>

        <CodeBlock
          code={`// globals.css — Tailwind v4 CSS-first config
@import "tailwindcss";

@theme inline {
  --color-geist: #0a0a0a;
  --color-elevated: #111111;
  --color-surface: #1a1a1a;
  --color-border: rgba(255, 255, 255, 0.06);
  --color-border-hover: rgba(255, 255, 255, 0.10);
  --color-foreground: #ffffff;
  --color-muted: rgba(255, 255, 255, 0.65);
  --color-subtle: rgba(255, 255, 255, 0.35);
  --color-accent: #3b82f6;
  --color-accent-secondary: #8b5cf6;
  --color-glow: rgba(59, 130, 246, 0.15);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}`}
          language="css"
          filename="globals.css (excerpt)"
        />
      </section>

      <section id="framer-motion">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Framer Motion
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">What:</strong> Framer Motion (12.42.0) is the
          animation library. It handles page transitions, hover effects, layout animations, and
          scroll-triggered reveals.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">Why:</strong> Framer Motion was chosen over CSS
          transitions and React Spring for three reasons: (1) Its{" "}
          <InlineCode>motion</InlineCode> component integrates directly into JSX without wrapper
          components. (2) Shared layout animations automatically animate position and size changes
          between route transitions. (3) It respects{" "}
          <InlineCode>prefers-reduced-motion</InlineCode> automatically — users who have requested
          reduced motion in their OS settings get no animations without any code changes.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">How it is used:</strong> Animation constants (easing
          curves, duration values, spring configs) are defined in <InlineCode>src/lib/motion.ts</InlineCode>{" "}
          to keep animation values consistent across components. The sidebar, modal overlays, page
          hero sections, and card hover effects all use Framer Motion.{" "}
          <InlineCode>optimizePackageImports</InlineCode> in{" "}
          <InlineCode>next.config.ts</InlineCode> reduces its bundle impact by tree-shaking unused
          exports.
        </p>
      </section>

      <section id="pwa-apis">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          PWA APIs
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">What:</strong> Progressive Web App APIs are
          browser-native capabilities that let this web application function like a native app.
          The relevant APIs are the Service Worker API, Cache API, Web App Manifest, and the{" "}
          <InlineCode>beforeinstallprompt</InlineCode> event.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">Why:</strong> PWAs provide offline access, home screen
          installation, and splash screens without maintaining separate iOS and Android codebases.
          This application ships as a PWA so visitors can install it from the browser and use it
          offline. The manifest at <InlineCode>public/manifest.json</InlineCode> defines the app
          name, icons (192px and 512px), theme color, and standalone display mode.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">How it is used:</strong> The service worker at{" "}
          <InlineCode>public/sw.js</InlineCode> intercepts all same-origin fetch requests and routes
          them through a multi-layered cache. The <InlineCode>src/lib/pwa.ts</InlineCode> module
          provides browser capability detection — distinguishing between Chromium (full PWA
          support), Safari (limited install support), and standalone mode (already installed).
        </p>

        <CodeBlock
          code={`// src/lib/pwa.ts — browser capability detection
export type BrowserCapability = "chromium" | "safari" | "standalone" | "unsupported";

export function detectBrowserCapability(): BrowserCapability {
  if (typeof window === "undefined") return "unsupported";

  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
  if (isStandalone) return "standalone";

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isSafari =
    navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome");

  if (isIOS || isSafari) return "safari";
  return "chromium";
}`}
          language="typescript"
          filename="src/lib/pwa.ts"
        />
      </section>

      <section id="resend">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Resend
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">What:</strong> Resend (6.17.2) is the email delivery
          service. It provides the API for sending transactional emails from the contact form.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">Why:</strong> Resend was chosen over SendGrid, Mailgun,
          and AWS SES for its simplicity. The API accepts a JSON payload with from, to, subject, and
          body — no SDK required. It supports React Email for template rendering, which means email
          templates are written as React components with the same styling tools used in the rest of
          the application. Deliverability is handled by Resend&apos;s infrastructure.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">How it is used:</strong> The{" "}
          <InlineCode>/api/contact</InlineCode> route handler receives form submissions, validates
          the input, rate-limits by IP (2 requests per minute), renders the email using{" "}
          <InlineCode>@react-email/render</InlineCode>, and sends it through Resend&apos;s REST API.
          The API key (<InlineCode>RESEND_API_KEY</InlineCode>) is stored as a Vercel environment
          variable and never exposed to the client.
        </p>
      </section>

      <section id="devtools">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Developer Tooling
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Additional tools that support the development workflow:
        </p>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Tooling Summary</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Tool              Version   Purpose
──────────────────────────────────────────────────────
Playwright        ^1.61.1   E2E testing across browsers
ESLint            ^9        Linting with eslint-config-next
Lucide React      ^1.22.0   Icon library (optimized imports)
clsx              ^2.1.1    Conditional class construction
tailwind-merge    ^3.6.0    Tailwind class deduplication
@react-email/*    ^1.0.12   Contact form email templates
@vercel/og        ^0.11.1   Dynamic OG image generation
Tailwind PostCSS  ^4.0.0    CSS processing pipeline`}
            </code>
          </pre>
        </div>
      </section>

      <section id="best-practices">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Best Practices
        </h2>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Pin dependency versions in <InlineCode>package.json</InlineCode> using caret ranges
              (<InlineCode>^</InlineCode>) for minor/patch updates, and test the build after
              updating.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Run <InlineCode>npm run build</InlineCode> after any dependency update to catch
              breaking changes before committing.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Keep the <InlineCode>optimizePackageImports</InlineCode> list in{" "}
              <InlineCode>next.config.ts</InlineCode> updated when adding large libraries. This
              reduces the client bundle by tree-shaking unused exports.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Use <InlineCode>next/dynamic</InlineCode> with <InlineCode>ssr: false</InlineCode>{" "}
              for components that depend on browser APIs, rather than adding{" "}
              <InlineCode>&quot;use client&quot;</InlineCode> to an entire tree.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Store all secrets (API keys, tokens) as Vercel environment variables — never in{" "}
              <InlineCode>.env.local</InlineCode> files committed to the repository.
            </span>
          </li>
        </ul>
      </section>

      <section id="limitations">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Limitations
        </h2>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">PWA on iOS:</strong> Safari on iOS does not fire
              the <InlineCode>beforeinstallprompt</InlineCode> event. Users must use the
              &quot;Add to Home Screen&quot; option in the Share menu. There is no programmatic way
              to trigger installation on iOS.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Framer Motion bundle size:</strong> Framer Motion
              adds ~30 KB (gzipped) to the client bundle. Despite tree-shaking via{" "}
              <InlineCode>optimizePackageImports</InlineCode>, this is the largest single
              dependency.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Static generation limits:</strong> Pages are
              pre-rendered at build time. Dynamic data that changes between builds (like the
              contact form response) requires client-side fetching or ISR.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Resend rate limits:</strong> The Resend free tier
              allows 100 emails/day and 1 email/second. The contact form&apos;s built-in rate
              limiting (2 requests/minute per IP) prevents abuse, but sustained traffic would hit
              Resend&apos;s caps.
            </span>
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
            <span>
              <strong className="text-white/60">Adding &quot;use client&quot; too early:</strong>{" "}
              Marking a component as a Client Component pulls its entire subtree into the client
              bundle. Only add the directive to components that actually use hooks or browser APIs.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Using inline styles alongside Tailwind:</strong>{" "}
              Inline <InlineCode>style=&#123;&#123;...&#125;&#123;</InlineCode> bypasses Tailwind&apos;s
              purge process and increases CSS specificity. Use Tailwind utilities or the{" "}
              <InlineCode>cn()</InlineCode> utility instead.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Importing Framer Motion in Server Components:</strong>{" "}
              Framer Motion uses browser APIs and must only be imported in Client Components. Import
              it in a Server Component causes a build error.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Exposing secrets with NEXT_PUBLIC_:</strong> Any
              environment variable prefixed with <InlineCode>NEXT_PUBLIC_</InlineCode> is embedded
              in the client JavaScript bundle. Never use this prefix for API keys or tokens.
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
            href="/docs/architecture/project-structure"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Project Structure</p>
            <p className="text-[13px] text-white/30">Directory layout and file organization conventions.</p>
          </Link>
          <Link
            href="/docs/architecture/build-deploy"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Build &amp; Deploy</p>
            <p className="text-[13px] text-white/30">Build process, deployment pipeline, and performance budgets.</p>
          </Link>
          <Link
            href="/docs/developer/coding-standards"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Coding Standards</p>
            <p className="text-[13px] text-white/30">TypeScript conventions and code style rules.</p>
          </Link>
          <Link
            href="/docs/developer/project-setup"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Project Setup</p>
            <p className="text-[13px] text-white/30">Prerequisites, installation, and development environment.</p>
          </Link>
        </div>
      </section>

      <Callout type="info" title="Version Note">
        All technology versions and integration details are current as of version{" "}
        <InlineCode>{APP_VERSION}</InlineCode> (<InlineCode>{LAST_UPDATED}</InlineCode>).
        Dependencies are updated regularly to stay current.
      </Callout>
    </DocPage>
  );
}
