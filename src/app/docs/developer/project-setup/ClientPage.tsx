"use client";

import Link from "next/link";
import { DocPage, Callout, CodeBlock, InlineCode } from "@/components/docs/DocLayout";
import { APP_VERSION, LAST_UPDATED } from "@/data/documentation";

const toc = [
  { id: "prerequisites", label: "Prerequisites" },
  { id: "clone", label: "Clone the Repository" },
  { id: "install", label: "Install Dependencies" },
  { id: "env", label: "Environment Variables" },
  { id: "dev-server", label: "Development Server" },
  { id: "scripts", label: "Available Scripts" },
  { id: "ide-setup", label: "IDE Configuration" },
  { id: "common-mistakes", label: "Common Mistakes" },
  { id: "limitations", label: "Limitations" },
  { id: "best-practices", label: "Best Practices" },
];

export default function ProjectSetupClientPage() {
  return (
    <DocPage
      title="Project Setup"
      description="Local development environment configuration for the Portfolio App. Covers prerequisites, cloning, dependency installation, environment variables, and available scripts."
      toc={toc}
      section="Developer Guide"
    >
      <section id="prerequisites">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          Prerequisites
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The Portfolio App is built on Next.js 16.2 with React 19.2. These frameworks require
          a modern Node.js runtime. The following software must be installed before proceeding.
        </p>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Required Software</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Software          Minimum Version    Recommended
──────────────────────────────────────────────────────
Node.js           18.17              20.x LTS
npm               9.0                Latest
Git               2.30               Latest
TypeScript        5.0                Latest (installed via npm)`}
            </code>
          </pre>
        </div>
        <Callout type="info" title="Node.js Version Requirement">
          Node.js 18.17 is the absolute minimum because the Next.js App Router and Server
          Components depend on the <InlineCode>fetch</InlineCode> API, structuredClone, and
          other globals not available in earlier releases. Node.js 20 LTS is recommended for
          long-term stability and better performance.
        </Callout>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Verify your Node.js and npm versions before proceeding:
        </p>
        <CodeBlock
          code={`node --version   # Should output v18.17.0 or higher\nnpm --version    # Should output 9.0.0 or higher`}
          language="bash"
          filename="Terminal"
        />
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          If you manage multiple Node.js versions, use <InlineCode>nvm</InlineCode> or{" "}
          <InlineCode>fnm</InlineCode> to switch between them. The project does not include
          an <InlineCode>.nvmrc</InlineCode> file, so you must manually select the correct
          version.
        </p>
      </section>

      <section id="clone">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Clone the Repository
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Clone the repository using HTTPS if you do not have SSH keys configured with GitHub.
          This is the most common approach for first-time contributors.
        </p>
        <CodeBlock
          code={`git clone https://github.com/savanpatel/savan-portfolio.git\ncd savan-portfolio`}
          language="bash"
          filename="Terminal (HTTPS)"
        />
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          If you have SSH keys set up with your GitHub account, use the SSH URL instead. SSH
          avoids repeated credential prompts and is faster for repeated operations.
        </p>
        <CodeBlock
          code={`git clone git@github.com:savanpatel/savan-portfolio.git\ncd savan-portfolio`}
          language="bash"
          filename="Terminal (SSH)"
        />
        <Callout type="tip" title="Forking for Contributions">
          If you plan to submit pull requests, fork the repository on GitHub first, then clone
          your fork. This gives you push access to your own copy without needing write
          permissions on the upstream repository.
        </Callout>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          After cloning, verify the repository state:
        </p>
        <CodeBlock
          code={`git log --oneline -3     # Check recent commits\ngit branch               # Should show "main"`}
          language="bash"
          filename="Terminal"
        />
      </section>

      <section id="install">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Install Dependencies
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The project uses npm with a locked <InlineCode>package-lock.json</InlineCode>. This
          file pins exact dependency versions to prevent drift across environments. Running{" "}
          <InlineCode>npm install</InlineCode> installs both production and dev dependencies:
        </p>
        <ul className="list-disc list-inside text-[14px] text-white/40 leading-relaxed mb-4 space-y-1">
          <li>
            <strong className="text-white/50">Production:</strong> Next.js 16.2, React 19.2,
            Framer Motion 12.42, Lucide React, Resend, clsx, tailwind-merge
          </li>
          <li>
            <strong className="text-white/50">Development:</strong> TypeScript 5, Tailwind CSS 4,
            ESLint 9, Playwright, @tailwindcss/postcss
          </li>
        </ul>
        <CodeBlock
          code={`npm install`}
          language="bash"
          filename="Terminal"
        />
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The initial install downloads approximately 200 MB of packages. Subsequent installs are
          faster due to the npm cache. If the install fails with network errors, check your
          connection and retry.
        </p>
        <Callout type="warning" title="Do Not Use --legacy-peer-deps">
          If npm reports peer dependency conflicts, do not use{" "}
          <InlineCode>--legacy-peer-deps</InlineCode> to bypass them. The conflict indicates a
          version mismatch that may cause runtime errors. Instead, verify your Node.js
          version meets the minimum requirement and delete <InlineCode>node_modules</InlineCode>{" "}
          before reinstalling.
        </Callout>
      </section>

      <section id="env">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Environment Variables
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The Portfolio App uses two environment variables for the contact form email integration
          via the Resend API. These are optional for local development — all other features
          work without them.
        </p>
        <CodeBlock
          code={`# Resend API key for sending contact form emails\nRESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx\n\n# Email address that receives contact form submissions\nCONTACT_EMAIL=savan@example.com`}
          language="bash"
          filename=".env.local"
        />
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Create the <InlineCode>.env.local</InlineCode> file in the project root (same directory
          as <InlineCode>package.json</InlineCode>). Next.js automatically loads this file during
          development. Do not confuse it with <InlineCode>.env</InlineCode> — Next.js treats
          these differently.
        </p>
        <Callout type="warning" title="Never Commit Environment Files">
          <InlineCode>.env.local</InlineCode> is already in <InlineCode>.gitignore</InlineCode>.
          Do not rename it to <InlineCode>.env</InlineCode> or any other name that might
          accidentally get committed. For production, configure these variables in the Vercel
          dashboard under Settings &gt; Environment Variables.
        </Callout>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Behavior When Variables Are Missing</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Variable            Without It
──────────────────────────────────────────────────────
RESEND_API_KEY      Contact form returns a 500 error
CONTACT_EMAIL       Contact form returns a 500 error
(All other features work normally)`}
            </code>
          </pre>
        </div>
      </section>

      <section id="dev-server">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Development Server
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Start the Next.js development server with hot module replacement (HMR). The server
          compiles on-demand, so the first page load after starting takes a few seconds while the
          build cache is populated.
        </p>
        <CodeBlock
          code={`npm run dev`}
          language="bash"
          filename="Terminal"
        />
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The server starts at <InlineCode>http://localhost:3000</InlineCode> by default. Subsequent
          page loads are near-instant because compiled modules are cached in memory.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">HMR behavior:</strong> Client Component edits appear
          in the browser within 100-300ms without a full page reload. Component state (open modals,
          form inputs, scroll position) is preserved. Server Component changes trigger a
          server-side re-render and a streaming HTML update.
        </p>
        <Callout type="tip" title="Port Conflicts">
          If port 3000 is occupied, Next.js prompts you to use a different port. You can specify
          one explicitly: <InlineCode>npm run dev -- -p 3001</InlineCode>. Check what is using a
          port with <InlineCode>lsof -i :3000</InlineCode>.
        </Callout>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">When the dev server is not enough:</strong> The
          development server skips certain production optimizations (bundle minification,
          image optimization, ISR caching). To test production behavior, run{" "}
          <InlineCode>npm run build</InlineCode> followed by <InlineCode>npm run start</InlineCode>.
        </p>
      </section>

      <section id="scripts">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Available Scripts
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Four npm scripts are defined in <InlineCode>package.json</InlineCode>. Each serves a
          distinct purpose in the development and deployment workflow.
        </p>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">package.json scripts</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Script        Command              What It Does
──────────────────────────────────────────────────────
dev           npm run dev          Starts dev server with HMR
build         npm run build        Creates optimized production build
start         npm run start        Serves the production build locally
lint          npm run lint         Runs ESLint across the codebase`}
            </code>
          </pre>
        </div>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">npm run build</strong> performs TypeScript type
          checking, ESLint linting, and produces an optimized production bundle. It catches errors
          that the dev server may not surface because the dev server compiles lazily.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">npm run start</strong> serves the build output on
          port 3000. Use this to verify production behavior locally before deploying.
        </p>
        <Callout type="note" title="Before Every Push">
          Run <InlineCode>npm run build</InlineCode> before pushing changes. The build process
          is the same one that runs in CI, so catching failures locally saves a round trip.
        </Callout>
      </section>

      <section id="ide-setup">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          IDE Configuration
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Visual Studio Code is the recommended editor. The project relies on the following
          extensions for the intended development experience.
        </p>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Recommended Extensions</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Extension                    Purpose
──────────────────────────────────────────────────────
ESLint                       Linting integration
Tailwind CSS IntelliSense    Autocomplete and linting for Tailwind
TypeScript (built-in)        Type checking and go-to-definition
Prettier (optional)          Code formatting if preferred`}
            </code>
          </pre>
        </div>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The <InlineCode>@/</InlineCode> path alias maps to <InlineCode>src/</InlineCode>. VS
          Code resolves this automatically via the project&apos;s{" "}
          <InlineCode>tsconfig.json</InlineCode>. If your editor does not resolve{" "}
          <InlineCode>@/</InlineCode> imports, check that the TypeScript language server is
          active and that you opened the project root (not a subdirectory).
        </p>
        <Callout type="tip" title="Format on Save">
          Enable &quot;Format On Save&quot; in your editor settings to maintain consistent
          formatting automatically. If using Prettier, ensure it is set as the default formatter
          for TypeScript and TSX files.
        </Callout>
      </section>

      <section id="common-mistakes">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Common Mistakes
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          These are the most frequent issues encountered during local setup and how to avoid them.
        </p>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Using the wrong Node.js version.</strong> Node
                16 or earlier will cause cryptic errors during <InlineCode>npm run dev</InlineCode>{" "}
                because Next.js 16 relies on APIs that do not exist in older runtimes. Always
                verify with <InlineCode>node --version</InlineCode>.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Deleting package-lock.json before installing.</strong> This file
                exists to guarantee deterministic installs. Deleting it may pull different
                dependency versions that introduce subtle bugs or breaking changes.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Running npm run start without npm run build first.</strong>{" "}
                The <InlineCode>start</InlineCode> script serves the production build, but it
                does not create one. Running <InlineCode>start</InlineCode> without building first
                results in a &quot;No route was found&quot; error.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Placing .env.local inside src/.</strong> Next.js only loads
                environment files from the project root. If you place it inside{" "}
                <InlineCode>src/</InlineCode>, the variables will not be available at runtime.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Using sudo npm install.</strong> This changes file ownership
                of <InlineCode>node_modules</InlineCode> to root, which causes permission errors
                on subsequent installs. Fix npm permissions instead if you encounter EACCES errors.
              </p>
            </div>
          </li>
        </ul>
      </section>

      <section id="limitations">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Limitations
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Be aware of these constraints when working with the local development environment.
        </p>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">No Windows native testing.</strong> The project is developed
                and tested on macOS and Linux. Windows users may encounter path separator
                issues or line ending differences. Use WSL2 on Windows for a consistent Unix
                environment.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Dev server does not match production.</strong> The development
                server skips image optimization, bundle splitting, and caching behavior. Some
                issues only appear in production builds.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Contact form requires a Resend account.</strong> The email
                integration cannot be tested without a valid Resend API key. You must create an
                account at resend.com and configure the environment variables.
              </p>
            </div>
          </li>
        </ul>
      </section>

      <section id="best-practices">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Best Practices
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Follow these recommendations to keep your local environment reliable and consistent.
        </p>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Run npm run build before pushing.</strong> The build catches
                TypeScript errors, lint violations, and broken routes that the dev server may
                tolerate. Always build locally before opening a pull request.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Delete node_modules when switching branches.</strong> Different
                branches may have different dependencies. Running{" "}
                <InlineCode>rm -rf node_modules &amp;&amp; npm install</InlineCode> after switching
                ensures a clean state.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Use the same npm version as the lockfile engine.</strong> The
                <InlineCode>package-lock.json</InlineCode> specifies an npm version. Running a
                different version may produce a modified lockfile on install.
              </p>
            </div>
          </li>
        </ul>

        <Callout type="info" title="Version Note">
          Setup instructions are current as of version{" "}
          <InlineCode>{APP_VERSION}</InlineCode> (<InlineCode>{LAST_UPDATED}</InlineCode>).
          Scripts and configuration may change in future releases.
        </Callout>
      </section>

      <section id="related">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Related
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/docs/developer/coding-standards"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Coding Standards</p>
            <p className="text-[13px] text-white/30">TypeScript, Tailwind, and naming conventions.</p>
          </Link>
          <Link
            href="/docs/developer/contributing"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Contributing</p>
            <p className="text-[13px] text-white/30">Workflow, PR process, and commit conventions.</p>
          </Link>
          <Link
            href="/docs/architecture/project-structure"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Project Structure</p>
            <p className="text-[13px] text-white/30">Directory layout and file organization.</p>
          </Link>
          <Link
            href="/docs/architecture/build-deploy"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Build &amp; Deploy</p>
            <p className="text-[13px] text-white/30">Build pipeline and deployment configuration.</p>
          </Link>
        </div>
      </section>
    </DocPage>
  );
}
