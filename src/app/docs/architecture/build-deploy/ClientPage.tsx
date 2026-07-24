"use client";

import Link from "next/link";
import { DocPage, Callout, CodeBlock, InlineCode } from "@/components/docs/DocLayout";
import { APP_VERSION, LAST_UPDATED } from "@/data/documentation";

const toc = [
  { id: "vercel", label: "Vercel Platform" },
  { id: "build-process", label: "Build Process" },
  { id: "ci-pipeline", label: "CI/CD Pipeline" },
  { id: "env-vars", label: "Environment Variables" },
  { id: "preview-deployments", label: "Preview Deployments" },
  { id: "production-deployment", label: "Production Deployment" },
  { id: "performance-budgets", label: "Performance Budgets" },
  { id: "security-headers", label: "Security Headers" },
  { id: "best-practices", label: "Best Practices" },
  { id: "limitations", label: "Limitations" },
  { id: "common-mistakes", label: "Common Mistakes" },
];

export default function BuildDeployClientPage() {
  return (
    <DocPage
      title="Build & Deployment"
      description="The application is deployed on Vercel with a fully automated pipeline from git push to production. This page covers the build process, CI/CD stages, environment variable management, preview deployments, and production deployment mechanics."
      toc={toc}
      section="Architecture"
    >
      <section id="vercel">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          Vercel Platform
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The application is deployed on Vercel, which provides first-class support for Next.js
          features: static site generation, server-side rendering, edge functions, image
          optimization, and ISR. Vercel&apos;s edge network distributes the application across
          70+ data centers globally.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Static pages are served from the edge with zero cold start. Server-rendered pages (like
          the API routes) are cached at the edge based on their cache headers. The result is that
          most page loads hit the nearest edge node rather than a central server.
        </p>

        <Callout type="info" title="Free Tier">
          This application runs on Vercel&apos;s free tier. The free tier includes 100 GB of
          bandwidth, 1000 build minutes per month, and serverless function execution. The static
          nature of this application (most pages are pre-rendered) keeps resource usage well
          within these limits.
        </Callout>
      </section>

      <section id="build-process">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Build Process
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The build process compiles, optimizes, and packages the application for production. It
          is triggered by <InlineCode>npm run build</InlineCode> (or{" "}
          <InlineCode>next build</InlineCode>), which Vercel runs automatically on every push.
        </p>

        <CodeBlock
          code={`# Local development
npm run dev          # Start development server on localhost:3000
npm run build        # Production build (same as Vercel CI)
npm run start        # Start production server locally
npm run lint         # Run ESLint across the codebase

# Testing
npx playwright test  # Run E2E tests against local server
npx playwright codegen  # Open browser to record test interactions

# Analysis
ANALYZE=true npm run build  # Generate bundle analysis report`}
          language="bash"
          filename="build and dev commands"
        />

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          What Happens During Build
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The <InlineCode>next build</InlineCode> command performs these steps in order:
        </p>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Build Steps</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Step              What Happens                              Output
────────────────────────────────────────────────────────────────────
TypeScript        Checks all .ts/.tsx files for type        Type errors
checking          errors. Fails the build on any error.     block deploy

Linting           Runs ESLint with eslint-config-next.      Lint errors
                  Catches unused imports, unreachable        block deploy
                  code, and style violations.

Static            Pre-renders every page that can be        HTML files
generation        built without request-time data.          in .next/server

Code              Splits JavaScript into route-level        JS chunks in
splitting         chunks. Each page loads only the JS       .next/static
                  it needs.

Tree shaking      Removes unused exports from               Smaller JS
                  dependencies. Reduces client bundle.       bundles

CSS               Tailwind scans all files for used         Single CSS
optimization      utility classes and strips the rest.      file (~15 KB)

Image             Generates optimized AVIF/WebP variants     Optimized
optimization      of images referenced via next/image.      variants

Service worker    The manual sw.js is copied from            Static file
                  public/ to the build output as-is.`}
            </code>
          </pre>
        </div>
      </section>

      <section id="ci-pipeline">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          CI/CD Pipeline
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The deployment pipeline is fully automated. There are no manual deployment steps,
          no staging servers, and no separate CI services (GitHub Actions, etc.). Vercel handles
          everything.
        </p>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Deployment Pipeline</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Git Push
  │
  ├─── Push to feature branch ──► Preview Deployment
  │                                ├── Build
  │                                ├── Unique preview URL
  │                                ├── PR comment with URL
  │                                └── Cleanup on PR close
  │
  └─── Merge to main ──────────► Production Deployment
                                  ├── Build (next build)
                                  ├── Lint checks
                                  ├── Edge network deploy
                                  ├── Health check
                                  └── Traffic switch (zero-downtime)`}
            </code>
          </pre>
        </div>

        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The entire production pipeline typically completes in under 2 minutes. Vercel uses
          zero-downtime deployments — the new version is deployed alongside the old one, and
          traffic is switched atomically when the health check passes. If the health check fails,
          the deployment is automatically rolled back to the previous version.
        </p>
      </section>

      <section id="env-vars">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Environment Variables
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Environment variables are managed through Vercel&apos;s dashboard. Each variable can be
          scoped to Production, Preview, or Development environments independently.
        </p>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Environment Variables</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Variable              Env        Client?   Purpose
────────────────────────────────────────────────────────────
RESEND_API_KEY        Prod       No        Email delivery API key
CONTACT_FROM          Prod       No        Sender email address
CONTACT_EMAIL         Prod       No        Recipient email address
NEXT_PUBLIC_SITE_URL  All        Yes       Site base URL (safe)
NODE_ENV              All        No        Runtime environment`}
            </code>
          </pre>
        </div>

        <Callout type="warning" title="Security">
          Variables with the <InlineCode>NEXT_PUBLIC_</InlineCode> prefix are embedded in the
          client-side JavaScript bundle and are visible to anyone who inspects the page source.
          Never use this prefix for API keys, tokens, or any sensitive value. The{" "}
          <InlineCode>RESEND_API_KEY</InlineCode> is only in the server environment, accessible
          only through the <InlineCode>/api/contact</InlineCode> route handler.
        </Callout>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Adding New Variables
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          To add a new environment variable: (1) Add it to Vercel&apos;s dashboard under Settings
          → Environment Variables for the appropriate environments. (2) Access it in code via{" "}
          <InlineCode>process.env.VARIABLE_NAME</InlineCode>. (3) If it&apos;s a server-only
          variable, never prefix it with <InlineCode>NEXT_PUBLIC_</InlineCode>. (4) Never commit
          <InlineCode>.env.local</InlineCode> files to the repository.
        </p>
      </section>

      <section id="preview-deployments">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Preview Deployments
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Every push to a feature branch (not <InlineCode>main</InlineCode>) generates a preview
          deployment with a unique URL. Preview deployments are complete copies of the application
          with their own build, their own edge distribution, and their own environment variables.
        </p>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Unique URLs:</strong> Each preview has a URL like{" "}
              <InlineCode>portfolio-git-branch-name.vercel.app</InlineCode>.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">PR comments:</strong> Vercel posts a comment on
              the GitHub PR with the preview URL, build status, and a link to the deployment
              logs.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Environment:</strong> Preview deployments use the
              Preview environment variables from Vercel&apos;s dashboard, separate from
              Production.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Automatic cleanup:</strong> Preview deployments
              are deleted when the PR is merged or closed. They do not persist indefinitely.
            </span>
          </li>
        </ul>

        <h3 className="text-base font-medium text-white/60 mb-3 mt-8">
          Workflow
        </h3>
        <ol className="list-decimal list-inside space-y-3 mb-6">
          <li className="text-[14px] text-white/40 leading-relaxed">
            Push a feature branch. Vercel detects the push and starts building.
          </li>
          <li className="text-[14px] text-white/40 leading-relaxed">
            The build completes and a unique preview URL is generated.
          </li>
          <li className="text-[14px] text-white/40 leading-relaxed">
            Open the preview URL to test the changes in a production-like environment.
          </li>
          <li className="text-[14px] text-white/40 leading-relaxed">
            Open a PR. Vercel posts a comment with the preview URL for code reviewers.
          </li>
          <li className="text-[14px] text-white/40 leading-relaxed">
            Merge the PR. The preview is deleted and a production deployment starts.
          </li>
        </ol>
      </section>

      <section id="production-deployment">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Production Deployment
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Production deployments happen automatically when code is merged to{" "}
          <InlineCode>main</InlineCode>. The deployment uses Vercel&apos;s zero-downtime strategy:
        </p>

        <ol className="list-decimal list-inside space-y-3 mb-6">
          <li className="text-[14px] text-white/40 leading-relaxed">
            <strong className="text-white/60">Build:</strong> The new version is built with{" "}
            <InlineCode>next build</InlineCode>. TypeScript checking, linting, static generation,
            and code splitting all run during this step.
          </li>
          <li className="text-[14px] text-white/40 leading-relaxed">
            <strong className="text-white/60">Deploy:</strong> The build output is deployed to
            Vercel&apos;s edge network alongside the current production version. Both versions
            are live simultaneously.
          </li>
          <li className="text-[14px] text-white/40 leading-relaxed">
            <strong className="text-white/60">Health Check:</strong> Vercel sends a request to
            the new version to verify it responds correctly.
          </li>
          <li className="text-[14px] text-white/40 leading-relaxed">
            <strong className="text-white/60">Traffic Switch:</strong> If the health check
            passes, all incoming traffic is atomically switched from the old version to the new
            version. There is no downtime during this switch.
          </li>
          <li className="text-[14px] text-white/40 leading-relaxed">
            <strong className="text-white/60">Rollback:</strong> If the health check fails,
            Vercel automatically keeps traffic on the old version. The failed deployment can be
            inspected in the Vercel dashboard.
          </li>
        </ol>
      </section>

      <section id="performance-budgets">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Performance Budgets
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The following performance budgets are tracked. These are not enforced by build-time
          checks but are monitored through Vercel Analytics and Lighthouse:
        </p>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Performance Budgets</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Metric                      Target        Current     Source
──────────────────────────────────────────────────────────────────
Total page weight           < 500 KB      ~350 KB     Bundle analysis
Initial JavaScript          < 80 KB       ~65 KB      next build output
CSS                          < 20 KB       ~15 KB      Tailwind purge
First Contentful Paint      < 1.0s        ~0.6s       Lighthouse
Largest Contentful Paint    < 2.0s        ~1.2s       Lighthouse
Cumulative Layout Shift     < 0.05        ~0.02       Lighthouse
Time to Interactive         < 2.5s        ~1.8s       Lighthouse
Lighthouse Performance      > 95          100         Lighthouse
Total doc pages             N/A           ~100        Static generation`}
            </code>
          </pre>
        </div>

        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The performance targets are intentionally conservative. This application is a portfolio
          site with mostly static content — there is no reason for it to be slow. The current
          metrics exceed the targets because the content is statically generated and the bundle is
          small.
        </p>
      </section>

      <section id="security-headers">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Security Headers
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Security headers are configured in <InlineCode>next.config.ts</InlineCode> and applied
          to all routes except <InlineCode>sitemap.xml</InlineCode> and{" "}
          <InlineCode>robots.txt</InlineCode> (which must not have restrictive headers).
        </p>

        <CodeBlock
          code={`const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self' https://vercel.live",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "worker-src 'self'",
    ].join("; "),
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];`}
          language="typescript"
          filename="next.config.ts — security headers"
        />

        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">CSP:</strong> Restricts which resources the page
              can load. The <InlineCode>frame-ancestors &apos;none&apos;</InlineCode> directive
              prevents the site from being embedded in iframes on other domains.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">X-Frame-Options: DENY:</strong> Prevents the page
              from being rendered in a frame or iframe, preventing clickjacking attacks.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Permissions-Policy:</strong> Disables camera,
              microphone, geolocation, and FLoC (interest-cohort) APIs. The application does not
              use any of these.
            </span>
          </li>
        </ul>
      </section>

      <section id="best-practices">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Best Practices
        </h2>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Always test with <InlineCode>npm run build && npm run start</InlineCode> locally
              before pushing. The dev server (<InlineCode>npm run dev</InlineCode>) does not
              catch build-time errors, missing types, or static generation failures.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Use preview deployments for all changes. Even small changes can have unexpected
              visual or functional effects. The preview URL provides a production-like
              environment for testing.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Keep the <InlineCode>public/sw.js</InlineCode> cache version in sync with
              deployments. Bump <InlineCode>CACHE_NAME</InlineCode> when deploying changes that
              affect cached assets.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Monitor Vercel&apos;s deployment logs for warnings about missing environment
              variables, build size, or function execution time.
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
              <strong className="text-white/60">Free tier build minutes:</strong> The free tier
              provides 1000 build minutes per month. At ~2 minutes per build, this allows ~500
              builds per month. Heavy feature development could approach this limit.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">No custom domains on free tier:</strong> The free
              tier uses the <InlineCode>*.vercel.app</InlineCode> domain. Custom domains require a
              paid plan.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Serverless function limits:</strong> The{" "}
              <InlineCode>/api/contact</InlineCode> route runs as a serverless function with a
              10-second execution limit on the free tier. Long-running operations would timeout.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">No rollback API:</strong> Vercel supports instant
              rollback through the dashboard (previous deployments), but there is no CLI command
              for automated rollback in the CI pipeline.
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
              <strong className="text-white/60">Pushing without testing the build locally:</strong>{" "}
              The dev server does not run TypeScript checking, linting, or static generation.
              A build can fail due to missing types, import errors, or metadata issues that the
              dev server silently ignores.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Committing .env.local:</strong> Environment
              variables with secrets should never be in the repository. Use Vercel&apos;s
              dashboard to set them for each environment.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Forgetting to update sitemap.ts:</strong> New
              routes are not automatically included in the sitemap. If a page is not in the
              sitemap, search engines may take longer to discover it.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Not testing preview deployments:</strong>{" "}
              Skipping preview deployment testing means issues are only discovered in
              production. Always open the preview URL and verify the changes before merging.
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
            <p className="text-[13px] text-white/30">Frameworks and build tools used in the project.</p>
          </Link>
          <Link
            href="/docs/features/performance"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Performance</p>
            <p className="text-[13px] text-white/30">Optimization strategies and Core Web Vitals targets.</p>
          </Link>
          <Link
            href="/docs/developer/project-setup"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Project Setup</p>
            <p className="text-[13px] text-white/30">Local development environment and scripts.</p>
          </Link>
          <Link
            href="/docs/architecture/seo"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">SEO</p>
            <p className="text-[13px] text-white/30">Static generation and metadata for search engines.</p>
          </Link>
        </div>
      </section>

      <Callout type="info" title="Version Note">
        Build and deployment configurations are current as of version{" "}
        <InlineCode>{APP_VERSION}</InlineCode> (<InlineCode>{LAST_UPDATED}</InlineCode>).
        Performance budgets are reviewed and tightened with each release.
      </Callout>
    </DocPage>
  );
}
