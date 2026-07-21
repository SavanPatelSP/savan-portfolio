"use client";

import Link from "next/link";
import { DocPage, Callout, CodeBlock, InlineCode } from "@/components/docs/DocLayout";
import { APP_VERSION, LAST_UPDATED } from "@/data/docs";

const toc = [
  { id: "overview", label: "How to Contribute" },
  { id: "workflow", label: "Development Workflow" },
  { id: "branching", label: "Branch Strategy" },
  { id: "code-review", label: "Code Review Process" },
  { id: "pr-guidelines", label: "PR Guidelines" },
  { id: "commits", label: "Commit Conventions" },
  { id: "common-mistakes", label: "Common Mistakes" },
  { id: "limitations", label: "Limitations" },
  { id: "best-practices", label: "Best Practices" },
];

export default function ContributingClientPage() {
  return (
    <DocPage
      title="Contributing"
      description="Development workflow, branch strategy, code review process, pull request guidelines, and commit message conventions for contributing to the Portfolio App."
      toc={toc}
      section="Developer Guide"
    >
      <section id="overview">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          How to Contribute
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Contributions to the Portfolio App are welcome. Every improvement — from fixing a
          typo in documentation to adding a new feature — helps the project. Before starting
          work, check the existing issues and pull requests to avoid duplicate effort.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The types of contributions accepted:
        </p>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Bug fixes:</strong> Broken functionality,
                visual glitches, or incorrect behavior. Include steps to reproduce the bug
                in your PR description.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Feature additions:</strong> New functionality
                that aligns with the project goals. Open an issue first to discuss the feature
                before implementing it.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Documentation:</strong> Improving existing
                docs, adding missing guides, or fixing typos. Documentation PRs are typically
                reviewed within 24 hours.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Performance:</strong> Optimizing rendering,
                reducing bundle size, or improving Core Web Vitals. Include before/after
                metrics in the PR description.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Accessibility:</strong> Improving keyboard
                navigation, screen reader support, or color contrast. Reference the specific
                WCAG guideline addressed.
              </p>
            </div>
          </li>
        </ul>
        <Callout type="tip" title="Start with an Issue">
          For non-trivial changes, open an issue first describing what you want to change
          and why. This avoids wasted effort if the change is not aligned with the project
          direction. Trivial fixes (typo corrections, minor styling) can go directly to a PR.
        </Callout>
      </section>

      <section id="workflow">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Development Workflow
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The development workflow follows a standard fork-and-pull model. All changes go
          through feature branches and pull requests. Direct commits to{" "}
          <InlineCode>main</InlineCode> are not allowed.
        </p>
        <CodeBlock
          code={`# 1. Fork the repository on GitHub\n\n# 2. Clone your fork\ngit clone git@github.com:your-username/savan-portfolio.git\ncd savan-portfolio\n\n# 3. Create a feature branch\ngit checkout -b feature/your-feature-name\n\n# 4. Install dependencies\nnpm install\n\n# 5. Start the development server\nnpm run dev\n\n# 6. Make your changes, then verify\nnpm run lint\nnpm run build\n\n# 7. Commit and push\ngit add .\ngit commit -m "feat: add new feature description"\ngit push origin feature/your-feature-name\n\n# 8. Open a Pull Request on GitHub`}
          language="bash"
          filename="Development workflow"
        />
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">Step-by-step walkthrough:</strong> After forking
          and cloning, run <InlineCode>npm install</InlineCode> to get dependencies. Start the
          dev server with <InlineCode>npm run dev</InlineCode>. Make your changes in small,
          focused commits. Before pushing, run <InlineCode>npm run lint</InlineCode> and{" "}
          <InlineCode>npm run build</InlineCode> to catch issues locally. Push your branch
          and open a PR against the <InlineCode>main</InlineCode> branch.
        </p>
        <Callout type="warning" title="Always Verify Before Pushing">
          Run <InlineCode>npm run lint</InlineCode> and{" "}
          <InlineCode>npm run build</InlineCode> before pushing. CI will reject commits
          that fail lint checks or type checking. Fix issues locally to avoid failed CI
          runs.
        </Callout>
      </section>

      <section id="branching">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Branch Strategy
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Use descriptive prefixes that categorize the type of change. The branch name
          after the prefix should be a short, hyphenated description of the change.
        </p>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Branch prefixes</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Prefix        Usage                  Example
──────────────────────────────────────────────────────
feature/      New functionality      feature/offline-indicator
fix/          Bug fixes              fix/mobile-sidebar-z-index
docs/         Documentation          docs/add-contributing-guide
refactor/     Code restructuring     refactor/component-exports
perf/         Performance work       perf/image-optimization
style/        Visual changes         style/card-hover-effects`}
            </code>
          </pre>
        </div>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">Why prefixes matter:</strong> Prefixes make it
          possible to filter branches by type when viewing the branch list. They also
          communicate the nature of the change to reviewers before they open the PR.
        </p>
        <Callout type="warning" title="Keep Branches Focused">
          Each branch should address a single concern. If you find unrelated issues while
          working, create separate branches and PRs for each. This makes reviews easier
          and rollbacks safer when a specific change introduces a regression.
        </Callout>
      </section>

      <section id="code-review">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Code Review Process
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Every pull request goes through at least one code review before merging. Reviews
          focus on correctness, performance, accessibility, and adherence to the project&apos;s
          coding standards.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">What reviewers check:</strong>
        </p>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">TypeScript:</strong> No{" "}
                <InlineCode>any</InlineCode> types, no{" "}
                <InlineCode>@ts-ignore</InlineCode>, proper prop typing. All function
                parameters and return types are explicit.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Component boundary:</strong>{" "}
                <InlineCode>&quot;use client&quot;</InlineCode> only where needed. Server
                Components used as the default. Client boundaries pushed as low as possible.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Tailwind:</strong> Consistent opacity patterns,
                no arbitrary values without justification, <InlineCode>cn()</InlineCode> for
                conditional classes.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Motion:</strong> Import from{" "}
                <InlineCode>@/lib/motion</InlineCode>. No inline duration or easing values.
                Animations respect <InlineCode>prefers-reduced-motion</InlineCode>.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Accessibility:</strong> Keyboard navigation
                works. Focus management is correct. ARIA labels are present on icon-only
                buttons and custom widgets.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Performance:</strong> No unnecessary re-renders.
                Large lists are virtualized. Images are optimized. No new client-side
                dependencies without justification.
              </p>
            </div>
          </li>
        </ul>
        <Callout type="note" title="Review Turnaround">
          Reviews are typically completed within 48 hours. If a review is delayed, ping
          the reviewer on the PR. Constructive feedback is expected — both the author and
          reviewer should focus on improving the code, not on personal preferences.
        </Callout>
      </section>

      <section id="pr-guidelines">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          PR Guidelines
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Pull requests should be focused, well-described, and ready for review. A good PR
          makes the reviewer&apos;s job efficient.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">PR title:</strong> Follow Conventional Commits
          format. The title is a concise summary of the change.
        </p>
        <CodeBlock
          code={`# Good PR titles\nfeat: add offline indicator in sidebar\nfix: resolve mobile sidebar z-index conflict\ndocs: add contributing guide for developers\nrefactor: extract animation primitives into shared module\n\n# Bad PR titles\nUpdate\nFixed stuff\nWIP`}
          language="text"
          filename="PR titles"
        />
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">PR description:</strong> Include a summary of what
          changed, why it changed, and how to test it. Reference related issues using{" "}
          <InlineCode>Fixes #123</InlineCode> or <InlineCode>Closes #123</InlineCode> syntax.
        </p>
        <CodeBlock
          code={"## Summary\nAdds a visual offline indicator to the sidebar that shows\nconnection status in real-time.\n\n## Changes\n- New `useConnectionStatus` hook wrapping navigator.onLine\n- `ConnectionBadge` component in `ui/` directory\n- Sidebar integration with animated status dot\n\n## Testing\n1. Open dev tools → Network → toggle offline\n2. Verify badge appears/disappears with animation\n3. Verify badge is accessible via screen reader\n\nFixes #42"}
          language="markdown"
          filename="PR description template"
        />
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">Size limits:</strong> Keep PRs under 400 lines of
          changed code (excluding generated files). Large PRs should be broken into smaller,
          stackable PRs that each deliver a complete but incremental change.
        </p>
        <Callout type="tip" title="Keep PRs Small">
          Small PRs get reviewed faster and more thoroughly. If a feature requires 800 lines
          of changes, split it into 2-3 PRs that each work independently. The first sets up
          the foundation, the second adds the core logic, and the third adds polish.
        </Callout>
      </section>

      <section id="commits">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Commit Conventions
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The project uses Conventional Commits for commit messages. Every commit message
          follows a structured format that makes the git history scannable and enables
          automated changelog generation.
        </p>
        <CodeBlock
          code={`<type>(<scope>): <description>\n\n[optional body]\n\n[optional footer(s)]`}
          language="text"
          filename="Commit message format"
        />
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">Commit types:</strong>
        </p>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Commit types</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Type        When to Use                          Example
──────────────────────────────────────────────────────
feat        New feature or capability            feat(search): add keyboard shortcuts
fix         Bug fix or correction                fix(sidebar): resolve z-index on mobile
docs        Documentation only changes           docs: add project setup guide
style       Formatting, no code change           style: fix import ordering
refactor    Code restructure, no behavior change refactor: extract animation utils
perf        Performance improvement              perf: lazy load download cards
test        Adding or updating tests             test: add E2E tests for search
chore       Build, CI, dependencies              chore: update Next.js to 16.1`}
            </code>
          </pre>
        </div>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">Rules for commit messages:</strong>
        </p>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                Use the imperative mood:{" "}
                <InlineCode>&quot;add feature&quot;</InlineCode> not{" "}
                <InlineCode>&quot;added feature&quot;</InlineCode> or{" "}
                <InlineCode>&quot;adds feature&quot;</InlineCode>.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                Keep the description under 72 characters. Use the body for additional
                context when needed.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                Use the scope to indicate which area of the codebase is affected. The scope
                is optional but recommended.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                Reference issues in the footer using{" "}
                <InlineCode>Fixes #123</InlineCode> or{" "}
                <InlineCode>Closes #123</InlineCode>.
              </p>
            </div>
          </li>
        </ul>
        <CodeBlock
          code={`# Good commit messages\nfeat(search): add keyboard shortcut for command palette\nfix(download): prevent duplicate version downloads\ndocs: clarify environment variable setup steps\nrefactor(sidebar): extract mobile drawer into component\n\n# Bad commit messages\nfix stuff\nWIP\nupdate code\nPR feedback`}
          language="text"
          filename="Commit messages"
        />

        <Callout type="info" title="Version Note">
          Contributing guidelines are current as of version{" "}
          <InlineCode>{APP_VERSION}</InlineCode> (<InlineCode>{LAST_UPDATED}</InlineCode>).
          Process changes will be documented in the changelog.
        </Callout>
      </section>

      <section id="common-mistakes">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Common Mistakes
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          These are the most frequent issues encountered by contributors.
        </p>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Pushing without running build.</strong>{" "}
                The dev server tolerates many issues that the production build catches.
                Always run <InlineCode>npm run build</InlineCode> before pushing to avoid
                failed CI.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Bundling unrelated changes in one PR.</strong>{" "}
                A PR that fixes a bug, refactors a component, and adds a feature is difficult
                to review and risky to revert. Split these into separate PRs.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Vague commit messages.</strong>{" "}
                <InlineCode>&quot;fix stuff&quot;</InlineCode> or{" "}
                <InlineCode>&quot;update code&quot;</InlineCode> tells the reviewer nothing.
                Every commit message should describe the specific change.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Not linking related issues.</strong> If an
                issue exists for the problem you are fixing, reference it in the PR description
                using <InlineCode>Fixes #123</InlineCode>. This auto-closes the issue on merge.
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
          These constraints apply to the contribution process.
        </p>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">No automated tests yet.</strong> The project
                uses Playwright for E2E testing but does not have unit tests for individual
                components. Contributions that add test coverage are especially valuable.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">CI only runs on PRs.</strong> There is no
                pre-commit hook to enforce linting or formatting locally. Contributors must
                run checks manually before pushing.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Deploy preview requires Vercel access.</strong>{" "}
                PR previews are generated by Vercel. If you fork the repository, you will not
                get automatic deploy previews unless you configure Vercel on your fork.
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
          Follow these practices to make your contributions reviewed and merged faster.
        </p>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Match the existing code style exactly.</strong>{" "}
                Read a few files in the area you are modifying and copy their patterns.
                Inconsistencies are the most common source of review feedback.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Write descriptive PR descriptions.</strong>{" "}
                Explain what changed, why it changed, and how to test it. Include screenshots
                for visual changes. Reference the issue being addressed.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Respond to review feedback promptly.</strong>{" "}
                Address comments with follow-up commits. Do not force-push during review — it
                makes it harder for reviewers to see what changed since their last review.
              </p>
            </div>
          </li>
        </ul>

        <Callout type="warning" title="Before You Commit">
          Run <InlineCode>npm run lint</InlineCode> and{" "}
          <InlineCode>npm run build</InlineCode> before committing. CI will reject commits
          that fail lint checks or type checking. Fix issues locally before pushing.
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
            href="/docs/developer/project-setup"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Project Setup</p>
            <p className="text-[13px] text-white/30">Prerequisites, clone, install, and dev server.</p>
          </Link>
          <Link
            href="/docs/developer/component-architecture"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Component Architecture</p>
            <p className="text-[13px] text-white/30">Patterns to follow when adding new components.</p>
          </Link>
          <Link
            href="/docs/reference/changelog"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Changelog</p>
            <p className="text-[13px] text-white/30">Version history and recent changes.</p>
          </Link>
        </div>
      </section>
    </DocPage>
  );
}
