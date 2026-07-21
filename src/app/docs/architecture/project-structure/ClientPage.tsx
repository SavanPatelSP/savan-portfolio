"use client";

import Link from "next/link";
import { DocPage, Callout, CodeBlock, InlineCode } from "@/components/docs/DocLayout";
import { APP_VERSION, LAST_UPDATED } from "@/data/docs";

const toc = [
  { id: "directory-tree", label: "Directory Tree" },
  { id: "app-directory", label: "app/ Directory" },
  { id: "components-directory", label: "components/ Directory" },
  { id: "data-directory", label: "data/ Directory" },
  { id: "lib-and-hooks", label: "lib/ and hooks/" },
  { id: "public-directory", label: "public/ Directory" },
  { id: "naming-conventions", label: "Naming Conventions" },
  { id: "best-practices", label: "Best Practices" },
  { id: "common-mistakes", label: "Common Mistakes" },
];

export default function ProjectStructureClientPage() {
  return (
    <DocPage
      title="Project Structure"
      description="The project follows Next.js App Router conventions with strict separation of concerns. Each directory has a single responsibility, and file naming follows patterns that make the codebase navigable without opening files."
      toc={toc}
      section="Architecture"
    >
      <section id="directory-tree">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          Directory Tree
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The full project structure. Folders without a <InlineCode>page.tsx</InlineCode> are not
          accessible as routes — they exist for organization, layouts, or shared state.
        </p>

        <CodeBlock
          code={`savan-portfolio/
├── public/
│   ├── sw.js                         # Service worker (manual, not built)
│   ├── manifest.json                 # PWA manifest
│   ├── favicon.svg                   # SVG favicon
│   ├── icon-192.svg                  # PWA icon (192×192)
│   ├── icon-512.svg                  # PWA icon (512×512)
│   ├── logo.jpg                      # Brand logo
│   └── screenshots/                  # App screenshots for docs
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout (fonts, providers)
│   │   ├── page.tsx                  # Home page (/)
│   │   ├── not-found.tsx             # 404 page
│   │   ├── error.tsx                 # Root error boundary
│   │   ├── globals.css               # Tailwind v4 theme + base styles
│   │   ├── sitemap.ts                # Dynamic sitemap generation
│   │   ├── robots.ts                 # Robots.txt generation
│   │   ├── api/
│   │   │   └── contact/route.ts      # Contact form POST endpoint
│   │   ├── docs/                     # Documentation section
│   │   │   ├── layout.tsx            # Docs layout (sidebar + content)
│   │   │   ├── page.tsx              # /docs index
│   │   │   ├── getting-started/      # Introduction, Quick Start, Navigation
│   │   │   ├── installation/         # Web, PWA, iOS, Android, Overview
│   │   │   ├── application/          # Dashboard, Projects, Downloads, etc.
│   │   │   ├── features/             # Offline, Updates, Responsive, etc.
│   │   │   ├── architecture/         # This section
│   │   │   ├── developer/            # Coding Standards, Setup, Components
│   │   │   └── reference/            # FAQ, Changelog, Troubleshooting
│   │   ├── company/                  # About, Mission, Careers, Newsroom
│   │   ├── products/                 # SP NET product pages
│   │   ├── portfolio-app/            # Portfolio App details + FAQ
│   │   ├── founder/                  # Founder bio, Journey, Roadmap
│   │   ├── research/                 # AI, Cloud, Cybersecurity, Innovation
│   │   ├── trust/                    # Privacy, Security, Transparency
│   │   ├── explore/                  # Products, Projects, Technology
│   │   ├── resources/                # Blog, FAQs, Media Kit, Open Source
│   │   ├── contact/                  # Contact form page
│   │   ├── get-in-touch/             # Alternative contact page
│   │   ├── downloads/                # Download links
│   │   ├── install/                  # Installation guide
│   │   └── app-preview/[screen]/     # Dynamic app preview
│   ├── components/
│   │   ├── ui/                       # Reusable primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   ├── Icons.tsx
│   │   │   ├── PageHero.tsx
│   │   │   ├── CookieConsent.tsx
│   │   │   ├── InstallPrompt.tsx
│   │   │   ├── SplashScreen.tsx
│   │   │   └── ...
│   │   ├── docs/                     # Documentation components
│   │   │   └── DocLayout.tsx         # DocPage, Callout, CodeBlock, etc.
│   │   ├── layout/                   # Structural components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── ScrollProgress.tsx
│   │   │   └── BackToTop.tsx
│   │   ├── hero/                     # Home page hero
│   │   ├── projects/                 # Project cards
│   │   ├── downloads/                # Download cards and platform tabs
│   │   ├── contact/                  # Contact form
│   │   ├── products/                 # Product listing
│   │   ├── timeline/                 # Timeline component
│   │   ├── portfolio-app/            # App preview and install modal
│   │   ├── faq/                      # FAQ accordion
│   │   ├── github/                   # GitHub integration
│   │   ├── tech/                     # Technology grid
│   │   ├── about/                    # About section
│   │   ├── experience/               # Experience section
│   │   ├── achievements/             # Achievements section
│   │   └── organization/             # Organization section
│   ├── data/                         # Typed data exports
│   │   ├── docs.ts                   # Navigation structure + version
│   │   ├── projects.ts               # Project listings
│   │   ├── downloads.ts              # Download configurations
│   │   ├── products.ts               # Product data
│   │   ├── technologies.ts           # Technology stack data
│   │   ├── screenshots.ts            # Screenshot paths
│   │   ├── portfolio-app.ts          # App metadata
│   │   ├── organization.ts           # Company data
│   │   ├── experience.ts             # Work experience
│   │   ├── achievements.ts           # Achievement badges
│   │   ├── personal.ts               # Personal info
│   │   └── faqs.tsx                  # FAQ data (contains JSX)
│   ├── lib/                          # Shared utilities
│   │   ├── utils.ts                  # cn() class merger
│   │   ├── motion.ts                 # Framer Motion configs
│   │   └── pwa.ts                    # PWA capability detection
│   └── hooks/
│       └── useActiveSection.ts       # Scroll spy hook
├── next.config.ts                    # Next.js configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Dependencies and scripts
└── eslint.config.mjs                 # ESLint flat config`}
          language="text"
          filename="project directory tree"
        />
      </section>

      <section id="app-directory">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          app/ Directory
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The <InlineCode>app/</InlineCode> directory is the routing layer. Each folder maps to a
          URL segment, and the special files within it define behavior for that segment.
        </p>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Special Files
        </h3>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Next.js Special Files</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`File              Purpose                        Runs on
────────────────────────────────────────────────────────────
page.tsx          Route UI                       Server or Client
layout.tsx        Shared wrapper for nested      Server
                  routes (persists on nav)
loading.tsx       Loading skeleton while          Server
                  page streams in
error.tsx         Error boundary for route       Client
                  (must be Client Component)
not-found.tsx     404 fallback                   Server
template.tsx      Re-mounts on navigation        Server
                  (like page.tsx but no caching)`}
            </code>
          </pre>
        </div>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Route Groups
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Folders wrapped in parentheses (e.g., <InlineCode>(marketing)/</InlineCode>) organize
          routes without affecting the URL. This project does not use route groups — all sections
          map directly to their folder names. The docs section uses a nested{" "}
          <InlineCode>layout.tsx</InlineCode> to provide the shared sidebar across all documentation
          pages.
        </p>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Dynamic Routes
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Two dynamic routes exist: <InlineCode>docs/[slug]/page.tsx</InlineCode> for documentation
          pages and <InlineCode>app-preview/[screen]/page.tsx</InlineCode> for app screenshots.
          Both use single-segment dynamic parameters. There are no catch-all routes in this
          project.
        </p>
      </section>

      <section id="components-directory">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          components/ Directory
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Components are organized by feature domain, not by type. Each subdirectory groups
          components that serve the same section of the application.
        </p>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Component Categories</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Directory         Usage                          Shared?
──────────────────────────────────────────────────────────
ui/               Button, Badge, Skeleton,       Yes
                  Icons, PageHero, etc.
docs/             DocLayout (DocPage, Callout,    Docs only
                  CodeBlock, InlineCode)
layout/           Header, Footer, ScrollProgress  Yes
                  BackToTop
hero/             Home page hero section          Home only
projects/         Project card grid               Home only
downloads/        Download cards, platform tabs   Downloads only
contact/          Contact form                    Contact only
products/         Product listing                 Products only
timeline/         Timeline items                  Founder only
portfolio-app/    App preview, install modal      App pages only
github/           GitHub integration              Home only
tech/             Technology grid                 Home only`}
            </code>
          </pre>
        </div>

        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The <InlineCode>docs/DocLayout.tsx</InlineCode> component is the most reused component in
          the documentation section. It exports <InlineCode>DocPage</InlineCode>,{" "}
          <InlineCode>Callout</InlineCode>, <InlineCode>CodeBlock</InlineCode>,{" "}
          <InlineCode>InlineCode</InlineCode>, and other documentation primitives. Every
          documentation page imports from this single file.
        </p>
      </section>

      <section id="data-directory">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          data/ Directory
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The <InlineCode>data/</InlineCode> directory contains typed data exports — no logic, no
          side effects, just structured data. Each file exports TypeScript interfaces and
          corresponding data arrays.
        </p>

        <CodeBlock
          code={`// src/data/docs.ts — typed navigation structure
export interface DocSection {
  title: string;
  slug: string;
  items: DocItem[];
}

export interface DocItem {
  title: string;
  slug: string;
  description?: string;
}

export const docsNavigation: DocSection[] = [
  {
    title: "Getting Started",
    slug: "getting-started",
    items: [
      { title: "Introduction", slug: "introduction", description: "..." },
      { title: "Quick Start", slug: "quick-start", description: "..." },
    ],
  },
  // ... more sections
];`}
          language="typescript"
          filename="src/data/docs.ts (excerpt)"
        />

        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Notable data files: <InlineCode>docs.ts</InlineCode> also exports{" "}
          <InlineCode>APP_VERSION</InlineCode> and <InlineCode>LAST_UPDATED</InlineCode> constants
          used across documentation pages. <InlineCode>faqs.tsx</InlineCode> is the only data file
          that contains JSX (for rich FAQ answers). All other data files export plain objects and
          arrays.
        </p>
      </section>

      <section id="lib-and-hooks">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          lib/ and hooks/
        </h2>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          lib/
        </h3>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">utils.ts</strong> — Exports{" "}
              <InlineCode>cn()</InlineCode>, which merges <InlineCode>clsx</InlineCode> conditional
              classes with <InlineCode>tailwind-merge</InlineCode> conflict resolution. Used in
              every component that applies conditional Tailwind classes.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">motion.ts</strong> — Exports shared Framer Motion
              configurations: spring presets, easing curves, transition durations, and viewport
              animation triggers. Keeps animation values consistent across components.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">pwa.ts</strong> — Exports{" "}
              <InlineCode>detectBrowserCapability()</InlineCode> and{" "}
              <InlineCode>isStandalone()</InlineCode> for PWA behavior branching. Handles the
              difference between Chromium browsers (full PWA support), Safari (manual install
              only), and standalone mode (already installed).
            </span>
          </li>
        </ul>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          hooks/
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The <InlineCode>hooks/</InlineCode> directory contains a single custom hook:{" "}
          <InlineCode>useActiveSection</InlineCode>. It implements a scroll spy that tracks which
          documentation section is currently in the viewport and updates the table of contents
          highlighting accordingly. It uses <InlineCode>IntersectionObserver</InlineCode> with a{" "}
          <InlineCode>rootMargin</InlineCode> offset to trigger highlighting before the heading
          reaches the top of the viewport.
        </p>
      </section>

      <section id="public-directory">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          public/ Directory
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Files in <InlineCode>public/</InlineCode> are served at the root URL path and are not
          processed by Next.js&apos;s build pipeline. This is intentional for the service worker
          (<InlineCode>sw.js</InlineCode>), which must be served from the root to control the
          entire origin scope.
        </p>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">sw.js</strong> — Manual service worker file (not
              generated by workbox or any bundler). Located at the root for maximum scope.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">manifest.json</strong> — PWA manifest defining the
              app name, icons, theme color, and standalone display mode.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">icon-192.svg, icon-512.svg</strong> — PWA icons
              referenced by the manifest. Both are SVG, which is unusual (most PWAs use PNG). SVG
              icons scale to any resolution without quality loss.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">screenshots/</strong> — App screenshots organized
              by device type (desktop, laptop) used in documentation and download pages.
            </span>
          </li>
        </ul>

        <Callout type="warning" title="Service Worker Scope">
          Moving <InlineCode>sw.js</InlineCode> to a subdirectory (e.g.,{" "}
          <InlineCode>public/sw/sw.js</InlineCode>) would restrict its scope to{" "}
          <InlineCode>/sw/</InlineCode>, leaving the rest of the application without offline
          support. Always keep the service worker at the public root.
        </Callout>
      </section>

      <section id="naming-conventions">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Naming Conventions
        </h2>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Naming Patterns</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Pattern               Example                  Purpose
──────────────────────────────────────────────────────────────
page.tsx              page.tsx                 Route UI (public)
layout.tsx            layout.tsx               Shared route wrapper
loading.tsx           loading.tsx              Loading skeleton
error.tsx             error.tsx                Error boundary
ClientPage.tsx        ClientPage.tsx           Client component
*.test.ts             utils.test.ts            Unit tests
index.ts              components/ui/index.ts   Barrel export
data/*.ts             projects.ts              Typed data files
lib/*.ts              utils.ts                 Shared utilities
hooks/*.ts            useActiveSection.ts      Custom React hooks`}
            </code>
          </pre>
        </div>

        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The <InlineCode>ClientPage.tsx</InlineCode> convention is specific to this project. Since
          most page routes use a Server Component <InlineCode>page.tsx</InlineCode> that delegates
          to a Client Component, the client portion is extracted into{" "}
          <InlineCode>ClientPage.tsx</InlineCode> in the same directory. This keeps the server/client
          boundary explicit and visible in the file tree.
        </p>
      </section>

      <section id="best-practices">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Best Practices
        </h2>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Keep one component per file. If a component has sub-components that are only used
              internally, define them in the same file rather than creating separate files.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Co-locate component-specific types with the component. Export shared types from{" "}
              <InlineCode>data/</InlineCode> or define them in <InlineCode>lib/</InlineCode>.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              When adding a new route, create the folder in <InlineCode>app/</InlineCode>, add{" "}
              <InlineCode>page.tsx</InlineCode>, and add the route to{" "}
              <InlineCode>sitemap.ts</InlineCode> for search engine discovery.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Use <InlineCode>default</InlineCode> exports for components and{" "}
              <InlineCode>named</InlineCode> exports for types, interfaces, and utility functions.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Do not create <InlineCode>index.ts</InlineCode> barrel files in{" "}
              <InlineCode>app/</InlineCode> subdirectories. Next.js resolves imports by file path,
              not by barrel exports.
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
              <strong className="text-white/60">Placing components in app/:</strong> Route
              components (<InlineCode>page.tsx</InlineCode>,{" "}
              <InlineCode>layout.tsx</InlineCode>) belong in <InlineCode>app/</InlineCode>.
              Reusable components belong in <InlineCode>components/</InlineCode>. Mixing them
              makes the route tree hard to read.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Moving sw.js:</strong> The service worker must
              remain at <InlineCode>public/sw.js</InlineCode>. Moving it to a subdirectory
              restricts its scope and breaks offline support for pages outside that scope.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Creating too many small files:</strong> A{" "}
              <InlineCode>CardHeader</InlineCode>, <InlineCode>CardBody</InlineCode>, and{" "}
              <InlineCode>CardFooter</InlineCode> that are only used together should be in one{" "}
              <InlineCode>Card.tsx</InlineCode> file, not three separate files.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Forgetting sitemap.ts:</strong> New routes added to{" "}
              <InlineCode>app/</InlineCode> are not automatically included in the sitemap. You
              must manually add them to the <InlineCode>pages</InlineCode> array in{" "}
              <InlineCode>src/app/sitemap.ts</InlineCode>.
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
            href="/docs/architecture/technology-stack"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Technology Stack</p>
            <p className="text-[13px] text-white/30">The frameworks and libraries used in the project.</p>
          </Link>
          <Link
            href="/docs/architecture/routing"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Routing</p>
            <p className="text-[13px] text-white/30">File-based routing and route conventions.</p>
          </Link>
          <Link
            href="/docs/developer/coding-standards"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Coding Standards</p>
            <p className="text-[13px] text-white/30">File naming conventions and code organization rules.</p>
          </Link>
          <Link
            href="/docs/developer/component-architecture"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Component Architecture</p>
            <p className="text-[13px] text-white/30">How components are structured and composed.</p>
          </Link>
        </div>
      </section>

      <Callout type="info" title="Version Note">
        Project structure conventions are maintained across version{" "}
        <InlineCode>{APP_VERSION}</InlineCode> and are documented as of{" "}
        <InlineCode>{LAST_UPDATED}</InlineCode>.
      </Callout>
    </DocPage>
  );
}
