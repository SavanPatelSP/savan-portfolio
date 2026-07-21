"use client";

import Link from "next/link";
import { DocPage, Callout, CodeBlock, InlineCode } from "@/components/docs/DocLayout";
import { APP_VERSION, LAST_UPDATED } from "@/data/docs";

const toc = [
  { id: "app-router", label: "App Router" },
  { id: "file-based-routing", label: "File-Based Routing" },
  { id: "dynamic-routes", label: "Dynamic Routes" },
  { id: "layouts", label: "Nested Layouts" },
  { id: "loading-error", label: "Loading & Error States" },
  { id: "client-navigation", label: "Client-Side Navigation" },
  { id: "metadata-api", label: "Metadata API" },
  { id: "route-table", label: "Route Table" },
  { id: "best-practices", label: "Best Practices" },
  { id: "common-mistakes", label: "Common Mistakes" },
];

export default function RoutingClientPage() {
  return (
    <DocPage
      title="Routing"
      description="The Portfolio App uses Next.js App Router for file-based routing. Every URL is defined by a file on disk — no route configuration files, no central router object. This page covers how routes map to URLs, how layouts nest, and how client-side navigation works."
      toc={toc}
      section="Architecture"
    >
      <section id="app-router">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          App Router
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The App Router (introduced in Next.js 13, refined through 16) replaces the Pages Router
          with a model based on React Server Components. Every component in the{" "}
          <InlineCode>app/</InlineCode> directory is a Server Component by default — it runs on the
          server, sends HTML to the client, and ships zero JavaScript for that component.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The App Router is enabled automatically when the <InlineCode>app/</InlineCode> directory
          exists at the project root. No configuration in <InlineCode>next.config.ts</InlineCode> is
          needed. The absence of a <InlineCode>pages/</InlineCode> directory means the old Pages
          Router is not active.
        </p>

        <CodeBlock
          code={`// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // App Router is enabled by the presence of src/app/
  // No router configuration needed
};

export default nextConfig;`}
          language="typescript"
          filename="next.config.ts"
        />
      </section>

      <section id="file-based-routing">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          File-Based Routing
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          In file-based routing, each folder in <InlineCode>src/app/</InlineCode> corresponds to a
          URL segment. A folder only becomes an accessible route when it contains a{" "}
          <InlineCode>page.tsx</InlineCode> file. Folders without <InlineCode>page.tsx</InlineCode>{" "}
          are used for shared layouts, components, or metadata — they do not create routes.
        </p>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          File-to-URL Mapping
        </h3>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">File → URL</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`File Path                                  URL
──────────────────────────────────────────────────────────
app/page.tsx                               /
app/docs/page.tsx                          /docs
app/contact/page.tsx                       /contact
app/founder/page.tsx                       /founder
app/founder/about/page.tsx                 /founder/about
app/products/sp-net-ai/page.tsx            /products/sp-net-ai
app/docs/architecture/routing/page.tsx     /docs/architecture/routing
app/app-preview/[screen]/page.tsx          /app-preview/:screen (dynamic)`}
            </code>
          </pre>
        </div>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Folder Without page.tsx
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Folders that contain only <InlineCode>layout.tsx</InlineCode>,{" "}
          <InlineCode>loading.tsx</InlineCode>, or <InlineCode>error.tsx</InlineCode> are not
          routes. For example, the <InlineCode>docs/</InlineCode> folder contains a{" "}
          <InlineCode>layout.tsx</InlineCode> that wraps all documentation pages with a shared
          sidebar, but <InlineCode>docs/</InlineCode> itself is a route because it also has a{" "}
          <InlineCode>page.tsx</InlineCode> (the documentation index).
        </p>
      </section>

      <section id="dynamic-routes">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Dynamic Routes
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Dynamic route segments use bracket syntax in folder names. The parameter is passed to the
          page component as a prop.
        </p>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Dynamic Route Patterns</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Pattern              Example URLs                  Use Case
──────────────────────────────────────────────────────────────
[slug]              /docs/introduction             Single segment
                    /docs/routing

[...slug]           /docs/a/b/c                   Catch-all
                    /docs/anything/goes/here

[[...slug]]         /docs                         Optional catch-all
                    /docs/a/b                     (matches root too)`}
            </code>
          </pre>
        </div>

        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          This project uses single-segment dynamic routes for the documentation section. The{" "}
          <InlineCode>docs/[slug]/page.tsx</InlineCode> pattern does not exist — instead, each
          documentation page has its own static <InlineCode>page.tsx</InlineCode> file. This means
          all documentation routes are statically generated at build time with no runtime parameter
          resolution.
        </p>

        <CodeBlock
          code={`// app/app-preview/[screen]/page.tsx
// This is the only dynamic route in the application
export default async function AppPreviewPage({
  params,
}: {
  params: Promise<{ screen: string }>;
}) {
  const { screen } = await params;
  // Render screenshot for the given screen name
}`}
          language="typescript"
          filename="app/app-preview/[screen]/page.tsx"
        />

        <Callout type="warning" title="Async Params in Next.js 16">
          In Next.js 16, <InlineCode>params</InlineCode> is a Promise and must be{" "}
          <InlineCode>await</InlineCode>ed. Accessing <InlineCode>params.slug</InlineCode>{" "}
          directly without <InlineCode>await</InlineCode> returns a Promise object, not the
          string value. This is a breaking change from Next.js 14 where params were synchronous.
        </Callout>
      </section>

      <section id="layouts">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Nested Layouts
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Layouts are defined by <InlineCode>layout.tsx</InlineCode> files. They wrap child routes
          and persist across navigations — the layout does not re-render when moving between
          sibling routes.
        </p>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Layout Hierarchy
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          This application uses two layout levels:
        </p>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Root layout</strong> (<InlineCode>app/layout.tsx</InlineCode>)
              — Wraps the entire application. Provides the HTML shell, font loading, global
              providers, the <InlineCode>Header</InlineCode>, <InlineCode>Footer</InlineCode>,{" "}
              <InlineCode>CookieConsent</InlineCode>, <InlineCode>SplashScreen</InlineCode>, and{" "}
              <InlineCode>ScrollProgress</InlineCode>.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Docs layout</strong> (<InlineCode>app/docs/layout.tsx</InlineCode>)
              — Wraps all <InlineCode>/docs/*</InlineCode> routes. Adds the documentation sidebar
              with table of contents navigation. This layout persists when navigating between
              documentation pages — only the content area re-renders.
            </span>
          </li>
        </ul>

        <CodeBlock
          code={`// app/docs/layout.tsx (simplified structure)
export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <DocsSidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}`}
          language="typescript"
          filename="app/docs/layout.tsx (structure)"
        />

        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          When a user navigates from <InlineCode>/docs/features/offline</InlineCode> to{" "}
          <InlineCode>/docs/architecture/routing</InlineCode>, only the{" "}
          <InlineCode>children</InlineCode> prop of the docs layout changes. The sidebar,
          header, and footer remain mounted. This avoids re-fetching sidebar data and preserves
          scroll position in the navigation tree.
        </p>
      </section>

      <section id="loading-error">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Loading &amp; Error States
        </h2>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Loading UI
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          A <InlineCode>loading.tsx</InlineCode> file in any directory renders immediately when
          that route segment is loading. The loading UI is shown while server components stream
          their response. This provides instant visual feedback — the user sees a skeleton
          placeholder instead of a blank page.
        </p>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Error Boundaries
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Error boundaries catch rendering errors and display a fallback UI. This application has
          three levels:
        </p>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Root error boundary</strong> —{" "}
              <InlineCode>app/error.tsx</InlineCode> catches errors in any route that does not
              have its own error boundary. This file is a Client Component (required by Next.js)
              and receives the <InlineCode>error</InlineCode> object and a{" "}
              <InlineCode>reset</InlineCode> function.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">404 page</strong> —{" "}
              <InlineCode>app/not-found.tsx</InlineCode> renders when Next.js cannot match the
              URL to any route. It includes <InlineCode>robots: &#123; index: false &#125;</InlineCode>{" "}
              to prevent search engines from indexing the 404 page.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Route-specific errors</strong> — Any folder can
              add an <InlineCode>error.tsx</InlineCode> to catch errors only within that route
              segment. This application uses the root error boundary for all routes.
            </span>
          </li>
        </ul>
      </section>

      <section id="client-navigation">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Client-Side Navigation
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Client-side navigation uses the <InlineCode>next/link</InlineCode> component and the{" "}
          <InlineCode>next/navigation</InlineCode> hooks. Unlike traditional MPA navigation, client
          navigation does not cause a full page reload — Next.js prefetches the target route and
          swaps the component tree in place.
        </p>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Link Component
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The <InlineCode>Link</InlineCode> component automatically prefetches the linked page when
          the link enters the viewport (on desktop with hover capability). This makes navigation
          feel instant — the page data is already cached before the user clicks.
        </p>

        <CodeBlock
          code={`// Prefetching behavior
<Link href="/docs/architecture/routing">
  {/* This page is prefetched when the link scrolls into view */}
  Routing
</Link>

// Force external navigation (no prefetch)
<Link href="https://github.com/savanpatel" target="_blank">
  GitHub
</Link>`}
          language="tsx"
          filename="Link usage patterns"
        />

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Programmatic Navigation
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The <InlineCode>useRouter</InlineCode> hook from{" "}
          <InlineCode>next/navigation</InlineCode> provides programmatic navigation for cases
          where the destination is determined at runtime — form submissions, search results, or
          conditional redirects.
        </p>

        <CodeBlock
          code={`"use client";
import { useRouter } from "next/navigation";

function SearchForm() {
  const router = useRouter();

  function handleSubmit(query: string) {
    router.push(\`/explore?search=\${encodeURIComponent(query)}\`);
  }
  // ...
}`}
          language="typescript"
          filename="programmatic navigation"
        />

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Back/Forward Navigation
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <InlineCode>router.back()</InlineCode> and <InlineCode>router.forward()</InlineCode> wrap
          the browser&apos;s history API. The docs sidebar uses these to support back-button
          navigation while preserving the user&apos;s position in the navigation tree.
        </p>
      </section>

      <section id="metadata-api">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Metadata API
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The App Router provides a co-located metadata API. Each <InlineCode>page.tsx</InlineCode>{" "}
          can export a <InlineCode>metadata</InlineCode> object or a{" "}
          <InlineCode>generateMetadata</InlineCode> function. Next.js merges metadata from the root
          layout down through nested layouts to the page.
        </p>

        <CodeBlock
          code={`// Static metadata export
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore engineering projects and open-source contributions.",
  openGraph: {
    title: "Projects — Portfolio App",
    description: "Explore engineering projects and open-source contributions.",
  },
  alternates: { canonical: "/explore/projects" },
};

// Dynamic metadata (for routes with parameters)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: slug.replace(/-/g, " "),
    alternates: { canonical: \`/docs/\${slug}\` },
  };
}`}
          language="typescript"
          filename="metadata patterns"
        />

        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The root layout defines a title template:{" "}
          <InlineCode>title.template = &quot;%s — Portfolio App&quot;</InlineCode>. Each page only
          needs to specify its unique title, and the template appends the site name automatically.
          The <InlineCode>metadataBase</InlineCode> resolves relative canonical and Open Graph URLs
          to absolute URLs.
        </p>
      </section>

      <section id="route-table">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Route Table
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Complete list of public routes in the application. API routes (<InlineCode>/api/*</InlineCode>)
          are excluded as they are not user-facing pages.
        </p>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Application Routes</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Route                               Type        Section
──────────────────────────────────────────────────────────────
/                                   Static      Home
/explore                            Static      Explore
/explore/products                   Static      Explore
/explore/projects                   Static      Explore
/explore/innovation                 Static      Explore
/explore/technology                 Static      Explore
/explore/vision                     Static      Explore
/explore/learning                   Static      Explore
/downloads                          Static      Downloads
/downloads/portfolio-app            Static      Downloads
/company                            Static      Company
/company/about                      Static      Company
/company/mission                    Static      Company
/company/leadership                 Static      Company
/company/partners                   Static      Company
/company/careers                    Static      Company
/company/newsroom                   Static      Company
/company/brand                      Static      Company
/company/contact                    Static      Company
/company/socials                    Static      Company
/company/support                    Static      Company
/company/updates                    Static      Company
/company/newsletter                 Static      Company
/products                           Static      Products
/products/sp-net-ai                 Static      Products
/products/sp-net-gram               Static      Products
/products/sp-net-admin-os           Static      Products
/products/sp-net-workplace          Static      Products
/products/sp-net-game               Static      Products
/products/sp-net-cloud              Static      Products
/products/sp-net-security           Static      Products
/products/sp-net-robotics           Static      Products
/products/sp-net-ecosystem          Static      Products
/products/sp-net-api                Static      Products
/portfolio-app                      Static      Portfolio App
/portfolio-app/install              Static      Portfolio App
/portfolio-app/platform-support     Static      Portfolio App
/portfolio-app/offline              Static      Portfolio App
/portfolio-app/release-notes        Static      Portfolio App
/portfolio-app/privacy              Static      Portfolio App
/portfolio-app/faq                  Static      Portfolio App
/founder                            Static      Founder
/founder/about                      Static      Founder
/founder/journey                    Static      Founder
/founder/philosophy                 Static      Founder
/founder/roadmap                    Static      Founder
/research                           Static      Research
/research/ai                        Static      Research
/research/cloud                     Static      Research
/research/cybersecurity             Static      Research
/research/innovation-lab            Static      Research
/research/future-tech               Static      Research
/trust                              Static      Trust
/trust/privacy                      Static      Trust
/trust/security                     Static      Trust
/trust/transparency                 Static      Trust
/trust/responsible-ai               Static      Trust
/trust/cookies                      Static      Trust
/trust/status                       Static      Trust
/resources                          Static      Resources
/resources/documentation            Static      Resources
/resources/faqs                     Static      Resources
/resources/blog                     Static      Resources
/resources/open-source              Static      Resources
/resources/media-kit                Static      Resources
/resources/press-releases           Static      Resources
/resources/press-contact            Static      Resources
/contact                            Static      Contact
/get-in-touch                       Static      Contact
/install                            Static      Install
/app-preview/[screen]               Dynamic     Preview
/docs                               Static      Documentation
/docs/getting-started/introduction  Static      Docs
/docs/getting-started/quick-start   Static      Docs
/docs/getting-started/navigation    Static      Docs
/docs/architecture/*                Static      Docs (6 pages)
/docs/developer/*                   Static      Docs (3 pages)
/docs/features/*                    Static      Docs (6 pages)
/docs/application/*                 Static      Docs (6 pages)
/docs/installation/*                Static      Docs (5 pages)
/docs/reference/*                   Static      Docs (4 pages)
/api/contact                        API         Backend`}
            </code>
          </pre>
        </div>

        <Callout type="info" title="Version Note">
          Route definitions are current as of version <InlineCode>{APP_VERSION}</InlineCode> (
          <InlineCode>{LAST_UPDATED}</InlineCode>). New routes are added as features are developed.
        </Callout>
      </section>

      <section id="best-practices">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Best Practices
        </h2>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Use <InlineCode>Link</InlineCode> for all internal navigation. Never use{" "}
              <InlineCode>&lt;a href=&quot;/path&quot;&gt;</InlineCode> for internal links — it
              causes a full page reload and loses the SPA experience.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Add every new public route to <InlineCode>src/app/sitemap.ts</InlineCode> with
              appropriate priority and change frequency values.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Export <InlineCode>metadata</InlineCode> from every <InlineCode>page.tsx</InlineCode>{" "}
              file. Missing metadata means Next.js uses the parent layout&apos;s metadata, which
              may not be accurate for the specific page.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Keep <InlineCode>loading.tsx</InlineCode> skeletons visually similar to the actual
              page content. A mismatched skeleton causes layout shift when the real content loads.
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
              <strong className="text-white/60">Using pages/ alongside app/:</strong> If both{" "}
              <InlineCode>pages/</InlineCode> and <InlineCode>app/</InlineCode> directories exist,
              Next.js may behave unpredictably. This project uses only{" "}
              <InlineCode>app/</InlineCode>.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Accessing params without await:</strong> In
              Next.js 16, <InlineCode>params</InlineCode> is a Promise. Writing{" "}
              <InlineCode>params.slug</InlineCode> instead of{" "}
              <InlineCode>(await params).slug</InlineCode> silently produces incorrect behavior
              rather than a clear error.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Missing metadata on new pages:</strong> When
              adding a new page, forgetting to export <InlineCode>metadata</InlineCode> means the
              page inherits the parent layout&apos;s title and description, which may be generic
              or incorrect.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Using router.push() for external URLs:</strong>{" "}
              <InlineCode>next/navigation</InlineCode>&apos;s{" "}
              <InlineCode>router.push()</InlineCode> only works for internal paths. For external
              URLs, use <InlineCode>window.location.href</InlineCode> or an{" "}
              <InlineCode>&lt;a&gt;</InlineCode> tag.
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
            <p className="text-[13px] text-white/30">Directory layout and file organization.</p>
          </Link>
          <Link
            href="/docs/architecture/seo"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">SEO</p>
            <p className="text-[13px] text-white/30">Metadata, sitemap, and per-route SEO configuration.</p>
          </Link>
          <Link
            href="/docs/architecture/technology-stack"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Technology Stack</p>
            <p className="text-[13px] text-white/30">Next.js App Router and framework details.</p>
          </Link>
          <Link
            href="/docs/getting-started/navigation"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Navigation</p>
            <p className="text-[13px] text-white/30">User-facing navigation patterns and shortcuts.</p>
          </Link>
        </div>
      </section>
    </DocPage>
  );
}
