"use client";

import Link from "next/link";
import { DocPage, Callout, CodeBlock, InlineCode } from "@/components/docs/DocLayout";
import { APP_VERSION, LAST_UPDATED } from "@/data/docs";

const toc = [
  { id: "typescript", label: "TypeScript Strict Mode" },
  { id: "tailwind", label: "Tailwind CSS Conventions" },
  { id: "naming", label: "Naming Conventions" },
  { id: "imports", label: "Import Order" },
  { id: "file-structure", label: "File Structure Patterns" },
  { id: "accessibility", label: "Accessibility Requirements" },
  { id: "common-mistakes", label: "Common Mistakes" },
  { id: "limitations", label: "Limitations" },
  { id: "best-practices", label: "Best Practices" },
];

export default function CodingStandardsClientPage() {
  return (
    <DocPage
      title="Coding Standards"
      description="TypeScript configuration, Tailwind CSS patterns, naming rules, import ordering, file structure guidelines, and accessibility requirements for the Portfolio App."
      toc={toc}
      section="Developer Guide"
    >
      <section id="typescript">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          TypeScript Strict Mode
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The project runs TypeScript in strict mode with additional compiler options for
          maximum type safety. Every source file is a <InlineCode>.ts</InlineCode> or{" "}
          <InlineCode>.tsx</InlineCode> file — no plain JavaScript files exist in{" "}
          <InlineCode>src/</InlineCode>.
        </p>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">tsconfig.json key options</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Option                      Value     Purpose
──────────────────────────────────────────────────────
strict                      true      Enables all strict checks
noUncheckedIndexedAccess    true      Arrays return T | undefined
noUnusedLocals              true      Error on unused variables
noUnusedParameters          true      Error on unused params
exactOptionalPropertyTypes  true      Distinguishes missing from undefined
jsx                         preserve  Next.js handles JSX transform
moduleResolution            bundler   Modern resolution algorithm`}
            </code>
          </pre>
        </div>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          All props, function parameters, state values, and return types must be explicitly
          typed. Do not use <InlineCode>any</InlineCode>. Use <InlineCode>unknown</InlineCode>{" "}
          when the type is genuinely uncertain, and narrow it with type guards. Use{" "}
          <InlineCode>Record&lt;string, unknown&gt;</InlineCode> instead of{" "}
          <InlineCode>object</InlineCode> for generic object types.
        </p>
        <CodeBlock
          code={`// Avoid: implicit any\nfunction process(data) { return data.name; }\n\n// Correct: explicit types\nfunction process(data: UserProfile): string {\n  return data.name;\n}\n\n// Avoid: any\nconst config: any = getConfig();\n\n// Correct: unknown with type guard\nconst config: unknown = getConfig();\nif (isConfig(config)) {\n  // config is narrowed here\n}`}
          language="tsx"
          filename="TypeScript conventions"
        />
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">noUncheckedIndexedAccess in practice:</strong> This
          flag means array and record indexing returns <InlineCode>T | undefined</InlineCode>,
          not just <InlineCode>T</InlineCode>. If you access{" "}
          <InlineCode>items[0]</InlineCode>, TypeScript requires you to handle the{" "}
          <InlineCode>undefined</InlineCode> case before using the value.
        </p>
        <CodeBlock
          code={`const items: string[] = [];\nconst first = items[0];     // type is string | undefined\nconst safe = items[0]!;    // avoid: non-null assertion hides the risk\n\n// Correct: narrow before use\nif (items.length > 0) {\n  const first = items[0];  // type is string\n}`}
          language="tsx"
          filename="Unchecked index access"
        />
        <Callout type="warning" title="No Escape Hatches">
          Avoid <InlineCode>@ts-ignore</InlineCode> and <InlineCode>@ts-expect-error</InlineCode>{" "}
          unless there is a documented reason. If a type error reveals a real issue, fix the
          code. If the issue is in a third-party type definition, add a focused type
          augmentation in <InlineCode>src/types/</InlineCode> instead.
        </Callout>
      </section>

      <section id="tailwind">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Tailwind CSS Conventions
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          All styling uses Tailwind CSS utility classes directly in JSX. No CSS files, CSS
          modules, or CSS-in-JS libraries are used. The <InlineCode>cn()</InlineCode> utility
          function handles conditional class composition and conflict resolution.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">Opacity convention:</strong> Use Tailwind&apos;s
          slash opacity syntax for color transparency. This produces readable, maintainable
          opacity values and works correctly with Tailwind&apos;s Just-In-Time compiler.
        </p>
        <CodeBlock
          code={`// Correct: slash opacity\n<div className="bg-white/10 text-white/40 border-white/[0.06]" />\n\n// Incorrect: hex opacity or arbitrary values\n<div className="bg-[rgba(255,255,255,0.1)] text-[#ffffff66]" />`}
          language="tsx"
          filename="Opacity pattern"
        />
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">Dark theme hierarchy:</strong> The application uses
          a dark-first design with <InlineCode>bg-[#0a0a0a]</InlineCode> as the base background.
          Text uses white with varying opacity levels to create visual hierarchy:
        </p>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Text opacity hierarchy</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Class              Usage              Example
──────────────────────────────────────────────────────
text-white         Primary text       Headings, active items
text-white/70      Secondary text     Labels, descriptions
text-white/60      Tertiary text      Body content, answers
text-white/40      Muted text         Captions, metadata
text-white/20      Disabled text      Inactive states`}
            </code>
          </pre>
        </div>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">Spacing:</strong> Use Tailwind&apos;s default
          spacing scale (<InlineCode>p-4</InlineCode>, <InlineCode>gap-3</InlineCode>,{" "}
          <InlineCode>mb-6</InlineCode>). Avoid arbitrary values like{" "}
          <InlineCode>px-[13px]</InlineCode> unless absolutely necessary for pixel-perfect
          alignment that the default scale cannot achieve.
        </p>
        <Callout type="tip" title="cn() for Conditional Classes">
          Always use <InlineCode>cn()</InlineCode> when combining conditional classes. It
          handles merging conflicting Tailwind utilities (e.g.,{" "}
          <InlineCode>px-4</InlineCode> and <InlineCode>px-6</InlineCode>) and removes
          duplicates automatically.
        </Callout>
      </section>

      <section id="naming">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Naming Conventions
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Consistent naming makes the codebase scannable. When you see a name, you should
          immediately know what kind of thing it is.
        </p>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">Naming Rules</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Kind                    Convention            Example
──────────────────────────────────────────────────────
React component         PascalCase            CommandPalette
Component file          PascalCase.tsx        CommandPalette.tsx
Hook                    camelCase (use)       useMediaQuery
Hook file               useCamelCase.ts       useMediaQuery.ts
Utility function        camelCase             cn, formatDate
Utility file            camelCase.ts          cn.ts, formatDate.ts
Type / Interface        PascalCase            DocPageProps
Type file               PascalCase.types.ts   DocPage.types.ts
Constant                camelCase / UPPER     FAST, NORMAL`}
            </code>
          </pre>
        </div>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Component names must match their file names. A file named{" "}
          <InlineCode>CommandPalette.tsx</InlineCode> exports a component named{" "}
          <InlineCode>CommandPalette</InlineCode>. Boolean props use the{" "}
          <InlineCode>is</InlineCode>, <InlineCode>has</InlineCode>, or{" "}
          <InlineCode>should</InlineCode> prefix. Event handler props use the{" "}
          <InlineCode>on</InlineCode> prefix.
        </p>
        <Callout type="info" title="Constants vs Variables">
          Use UPPER_SNAKE_CASE only for values exported from{" "}
          <InlineCode>src/lib/motion.ts</InlineCode> (like <InlineCode>FAST</InlineCode>,{" "}
          <InlineCode>NORMAL</InlineCode>) that represent fixed configuration. All other
          constants use camelCase.
        </Callout>
      </section>

      <section id="imports">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Import Order
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Imports are organized in a consistent order to improve readability. Each group is
          separated by a blank line.
        </p>
        <CodeBlock
          code={`// 1. React and Next.js\nimport { useState, useEffect } from "react";\nimport Link from "next/link";\nimport { useRouter } from "next/navigation";\n\n// 2. Third-party libraries\nimport { motion } from "framer-motion";\nimport { ChevronRight } from "lucide-react";\n\n// 3. Internal utilities and lib\nimport { cn } from "@/lib/utils";\nimport { ease, spring, NORMAL } from "@/lib/motion";\n\n// 4. Internal components\nimport { DocPage, Callout } from "@/components/docs/DocLayout";\n\n// 5. Internal data and types\nimport { APP_VERSION } from "@/data/docs";\nimport type { DocItem } from "@/data/docs";`}
          language="tsx"
          filename="Import order"
        />
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Use the <InlineCode>@/</InlineCode> path alias for all internal imports that cross
          directory boundaries. The alias maps to <InlineCode>src/</InlineCode> and makes
          imports resilient to file relocation. Relative imports (
          <InlineCode>../utils</InlineCode>) are acceptable only for components within the
          same directory.
        </p>
        <Callout type="info" title="Absolute vs Relative Imports">
          The <InlineCode>@/</InlineCode> alias is configured in{" "}
          <InlineCode>tsconfig.json</InlineCode> and <InlineCode>next.config.ts</InlineCode>.
          Use it for imports that cross directory boundaries. Use relative imports only when
          importing a file in the same directory.
        </Callout>
      </section>

      <section id="file-structure">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          File Structure Patterns
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The contents of a component file follow a fixed order. This makes files predictable
          to navigate — you always know where to find types, helpers, and the component
          definition.
        </p>
        <CodeBlock
          code={`// 1. Imports\nimport { useState } from "react";\nimport { cn } from "@/lib/utils";\n\n// 2. Types\ninterface CardProps {\n  title: string;\n  active?: boolean;\n  onClick?: () => void;\n}\n\n// 3. Helper functions (unexported)\nfunction getVariant(active: boolean) {\n  return active ? "bg-white/10" : "bg-white/[0.02]";\n}\n\n// 4. Component\nexport function Card({ title, active = false, onClick }: CardProps) {\n  return (\n    <div className={cn("rounded-lg p-4", getVariant(active))} onClick={onClick}>\n      <h3 className="text-sm font-medium text-white/70">{title}</h3>\n    </div>\n  );\n}`}
          language="tsx"
          filename="File structure pattern"
        />
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">Route files:</strong> Documentation routes follow
          the Next.js App Router convention. Each route is a directory containing a{" "}
          <InlineCode>page.tsx</InlineCode> (Server Component with{" "}
          <InlineCode>Metadata</InlineCode> export) and a{" "}
          <InlineCode>ClientPage.tsx</InlineCode> (interactive content with{" "}
          <InlineCode>&quot;use client&quot;</InlineCode>).
        </p>
        <Callout type="warning" title="No Barrel Files">
          Do not create <InlineCode>index.ts</InlineCode> barrel files that re-export from
          multiple modules. Barrel files obscure the actual import path and can cause
          unexpected bundling behavior with tree-shaking. Import directly from the specific
          file instead.
        </Callout>
      </section>

      <section id="accessibility">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Accessibility Requirements
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The Portfolio App targets WCAG 2.1 AA compliance. Every interactive component must
          meet the following baseline requirements.
        </p>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Keyboard navigation:</strong> All interactive
                elements (buttons, links, form inputs, toggles) must be reachable and operable
                with Tab, Enter, Space, and Escape keys. No interactive element should require a
                mouse to operate.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Focus management:</strong> Focus must be visible
                on all interactive elements. Custom focus styles must meet the 3:1 contrast ratio
                against the background. Focus order must follow the visual reading order.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">ARIA labels:</strong> Icon-only buttons, images
                without visible text, and custom widgets must have{" "}
                <InlineCode>aria-label</InlineCode> or <InlineCode>aria-labelledby</InlineCode>{" "}
                attributes. Decorative elements use <InlineCode>aria-hidden=&quot;true&quot;</InlineCode>.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Reduced motion:</strong> All animations must
                respect <InlineCode>prefers-reduced-motion</InlineCode>. The Framer Motion
                configuration in this project handles this automatically when using{" "}
                <InlineCode>@/lib/motion</InlineCode>.
              </p>
            </div>
          </li>
        </ul>
        <Callout type="tip" title="Test Without a Mouse">
          After implementing any interactive component, navigate through it using only the
          keyboard. If you cannot reach or operate every control, the component fails the
          accessibility baseline.
        </Callout>
      </section>

      <section id="common-mistakes">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Common Mistakes
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          These violations appear most frequently in code reviews.
        </p>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Using any as a type.</strong> The tsconfig
                enforces strict mode, but developers sometimes cast through{" "}
                <InlineCode>as any</InlineCode> to bypass errors. This defeats type safety.
                Fix the underlying type issue instead.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Using arbitrary Tailwind values for opacity.</strong>{" "}
                Writing <InlineCode>bg-[rgba(255,255,255,0.1)]</InlineCode> instead of{" "}
                <InlineCode>bg-white/10</InlineCode> creates inconsistent styling and makes
                the opacity hard to update.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Importing from the wrong path.</strong> Using{" "}
                <InlineCode>../../lib/utils</InlineCode> instead of{" "}
                <InlineCode>@/lib/utils</InlineCode> creates fragile imports that break when
                files are moved. Always use the <InlineCode>@/</InlineCode> alias.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Adding comments that restate the code.</strong>{" "}
                Writing <InlineCode>{"// Set state to false"}</InlineCode> above{" "}
                <InlineCode>setOpen(false)</InlineCode> adds noise. Comments should explain
                why, not what.
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
          These constraints apply to the coding standards themselves.
        </p>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Tailwind v4 has no config file.</strong> Unlike
                Tailwind v3, there is no <InlineCode>tailwind.config.js</InlineCode>. Custom
                values must use arbitrary values in classes or be added via the CSS-based
                configuration in <InlineCode>src/app/globals.css</InlineCode>.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">ESLint rules may not catch everything.</strong>{" "}
                TypeScript strict mode catches type errors, but not all logic errors. Manual
                review is still required for business logic, edge cases, and accessibility.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Third-party type definitions are not under our control.</strong>{" "}
                Some packages export imprecise types. Work around these with focused type
                augmentations in <InlineCode>src/types/</InlineCode> rather than disabling
                type checking globally.
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
          These practices keep the codebase consistent and maintainable as it grows.
        </p>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Run the linter before committing.</strong>{" "}
                <InlineCode>npm run lint</InlineCode> catches unused imports, naming violations,
                and other issues that do not always surface as TypeScript errors. Run it as part
                of your pre-commit workflow.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Prefer type inference where the return type is obvious.</strong>{" "}
                Do not annotate every variable. Annotate function parameters and public API
                return types. Let TypeScript infer local variables and internal functions.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Use semantic HTML before ARIA.</strong> Use{" "}
                <InlineCode>&lt;button&gt;</InlineCode> instead of{" "}
                <InlineCode>&lt;div onClick&gt;</InlineCode>. Use{" "}
                <InlineCode>&lt;nav&gt;</InlineCode> instead of{" "}
                <InlineCode>&lt;div role=&quot;navigation&quot;&gt;</InlineCode>. Native elements
                provide keyboard behavior and semantics for free.
              </p>
            </div>
          </li>
        </ul>
        <Callout type="note" title="Version Note">
          Coding standards are current as of version{" "}
          <InlineCode>{APP_VERSION}</InlineCode> (<InlineCode>{LAST_UPDATED}</InlineCode>).
          Standards may evolve as the project matures.
        </Callout>
      </section>

      <section id="related">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Related
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/docs/developer/component-architecture"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Component Architecture</p>
            <p className="text-[13px] text-white/30">Component patterns, client/server split, and composition.</p>
          </Link>
          <Link
            href="/docs/developer/project-setup"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Project Setup</p>
            <p className="text-[13px] text-white/30">Development environment and available scripts.</p>
          </Link>
          <Link
            href="/docs/architecture/project-structure"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Project Structure</p>
            <p className="text-[13px] text-white/30">Directory layout and naming conventions.</p>
          </Link>
          <Link
            href="/docs/developer/contributing"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Contributing</p>
            <p className="text-[13px] text-white/30">How to follow these standards in your contributions.</p>
          </Link>
        </div>
      </section>
    </DocPage>
  );
}
