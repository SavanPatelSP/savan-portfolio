"use client";

import Link from "next/link";
import { DocPage, Callout, CodeBlock, InlineCode } from "@/components/docs/DocLayout";
import { APP_VERSION, LAST_UPDATED } from "@/data/docs";

const toc = [
  { id: "doc-layout-components", label: "DocLayout Components" },
  { id: "page-pattern", label: "Page Pattern" },
  { id: "client-server-boundary", label: "Client vs Server Boundary" },
  { id: "composition-patterns", label: "Composition Patterns" },
  { id: "motion-system", label: "Motion System" },
  { id: "common-mistakes", label: "Common Mistakes" },
  { id: "limitations", label: "Limitations" },
  { id: "best-practices", label: "Best Practices" },
];

export default function ComponentArchitectureClientPage() {
  return (
    <DocPage
      title="Component Architecture"
      description="How documentation pages are built using the DocLayout component system, the Client/Server Component boundary, composition patterns, and the motion configuration."
      toc={toc}
      section="Developer Guide"
    >
      <section id="doc-layout-components">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          DocLayout Components
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Every documentation page in this application is composed from four components exported
          by <InlineCode>@/components/docs/DocLayout</InlineCode>. These components handle page
          structure, metadata rendering, and content formatting so that individual pages only
          need to provide content.
        </p>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">DocLayout Exports</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Component     Props                              Purpose
──────────────────────────────────────────────────────────────
DocPage       title, description, toc,            Wraps the full page with title,
              section, children                   description, and table of contents

Callout       type, title, children               Info/warning/tip/note callout boxes
              type: "info"|"tip"|"warning"|"note"

CodeBlock     code, language, filename            Syntax-highlighted code blocks with
                                                  optional filename header

InlineCode    children                            Inline code styling for props, file
                                                  names, and terminal commands`}
            </code>
          </pre>
        </div>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">DocPage</strong> is the root wrapper. It renders
          the page title, description, a table of contents sidebar from the{" "}
          <InlineCode>toc</InlineCode> array, and a section badge. The{" "}
          <InlineCode>toc</InlineCode> array must have entries with{" "}
          <InlineCode>id</InlineCode> values matching the <InlineCode>id</InlineCode> attributes
          on your section elements — the sidebar links scroll to these anchors.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">Callout</strong> boxes draw attention to important
          information. The <InlineCode>type</InlineCode> prop controls the visual style:{" "}
          <InlineCode>&quot;info&quot;</InlineCode> for context, <InlineCode>&quot;tip&quot;</InlineCode>{" "}
          for recommendations, <InlineCode>&quot;warning&quot;</InlineCode> for things that can
          break, and <InlineCode>&quot;note&quot;</InlineCode> for metadata.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">CodeBlock</strong> renders code with a filename
          header and monospace styling. The <InlineCode>language</InlineCode> prop is informational
          — syntax highlighting is handled at the component level.{" "}
          <strong className="text-white/60">InlineCode</strong> wraps inline code tokens in
          styled <InlineCode>&lt;code&gt;</InlineCode> elements.
        </p>
        <Callout type="tip" title="Always Use DocPage">
          Every documentation page must use <InlineCode>DocPage</InlineCode> as its root
          component. Do not create custom page wrappers. If you need additional layout around
          content, compose it inside the <InlineCode>DocPage</InlineCode> children.
        </Callout>
      </section>

      <section id="page-pattern">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Page Pattern
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Every documentation route follows the same file structure: a Server Component{" "}
          <InlineCode>page.tsx</InlineCode> that exports metadata, and a Client Component{" "}
          <InlineCode>ClientPage.tsx</InlineCode> that contains the interactive content.
        </p>
        <CodeBlock
          code={`src/app/docs/developer/project-setup/\n├── page.tsx          Server Component — exports Metadata\n└── ClientPage.tsx    Client Component — renders content`}
          language="text"
          filename="Route structure"
        />
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">page.tsx</strong> is always a Server Component. It
          exports the <InlineCode>Metadata</InlineCode> object for SEO (title, description,
          Open Graph tags) and renders the Client Component. This split is required because
          metadata exports only work in Server Components.
        </p>
        <CodeBlock
          code={`import type { Metadata } from "next";\nimport ClientPage from "./ClientPage";\n\nexport const metadata: Metadata = {\n  title: "Project Setup",\n  description: "Local development environment...",\n};\n\nexport default function Page() {\n  return <ClientPage />;\n}`}
          language="tsx"
          filename="page.tsx"
        />
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">ClientPage.tsx</strong> starts with{" "}
          <InlineCode>&quot;use client&quot;</InlineCode> and contains all interactive UI:
          state, effects, animations, event handlers. The default export name must be{" "}
          <InlineCode>ClientPage</InlineCode> (or the page name) — the file name matches the
          component name.
        </p>
        <Callout type="warning" title="Do Not Add use client to page.tsx">
          Adding <InlineCode>&quot;use client&quot;</InlineCode> to{" "}
          <InlineCode>page.tsx</InlineCode> breaks the metadata export. Next.js requires page
          files to be Server Components so that <InlineCode>export const metadata</InlineCode>{" "}
          can run on the server. Always put interactive content in{" "}
          <InlineCode>ClientPage.tsx</InlineCode>.
        </Callout>
      </section>

      <section id="client-server-boundary">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Client vs Server Boundary
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Next.js App Router uses React Server Components by default. Every component is a Server
          Component unless it declares <InlineCode>&quot;use client&quot;</InlineCode> at the
          top of the file. Understanding this boundary determines what code runs where and
          affects performance.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">Server Components</strong> execute on the server
          during request time. They can access the file system, databases, and environment
          variables directly. They cannot use hooks (<InlineCode>useState</InlineCode>,{" "}
          <InlineCode>useEffect</InlineCode>), event handlers, or browser APIs. Their output is
          serialized HTML streamed to the client. Zero JavaScript is sent for these components.
        </p>
        <CodeBlock
          code={`// Server Component — no "use client" directive\nimport { findDocItem } from "@/data/docs";\n\nexport default async function DocPage({ slug }: { slug: string }) {\n  const doc = findDocItem(slug);\n  return <article>{doc?.item.title}</article>;\n}`}
          language="tsx"
          filename="Server Component"
        />
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">Client Components</strong> execute in the browser.
          They can use hooks, event handlers, and browser APIs. They are marked with{" "}
          <InlineCode>&quot;use client&quot;</InlineCode> at the top of the file. Every Client
          Component and all its dependencies are included in the client JavaScript bundle.
        </p>
        <CodeBlock
          code={`"use client";\n\nimport { useState } from "react";\nimport { motion } from "framer-motion";\n\nexport function Sidebar({ children }: { children: React.ReactNode }) {\n  const [open, setOpen] = useState(false);\n  return (\n    <motion.aside animate={{ x: open ? 0 : -288 }}>\n      {children}\n    </motion.aside>\n  );\n}`}
          language="tsx"
          filename="Client Component"
        />
        <Callout type="warning" title="Push use client Down the Tree">
          Keep the <InlineCode>&quot;use client&quot;</InlineCode> directive as low in the
          component tree as possible. If a parent needs interactivity but most children do not,
          extract the interactive parts into a separate Client Component and import it from a
          Server Component parent. This reduces the JavaScript bundle sent to the browser.
        </Callout>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">The practical rule:</strong> If your component uses{" "}
          <InlineCode>useState</InlineCode>, <InlineCode>useEffect</InlineCode>,{" "}
          <InlineCode>useRef</InlineCode>, event handlers (<InlineCode>onClick</InlineCode>,{" "}
          <InlineCode>onChange</InlineCode>), or browser APIs (<InlineCode>window</InlineCode>,{" "}
          <InlineCode>navigator</InlineCode>), it must be a Client Component. If it only renders
          JSX with data passed as props, it can remain a Server Component.
        </p>
      </section>

      <section id="composition-patterns">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Composition Patterns
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Two utility patterns appear consistently across the codebase and form the foundation
          for building new components.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">cn() utility:</strong> Located at{" "}
          <InlineCode>src/lib/utils.ts</InlineCode>, this function combines{" "}
          <InlineCode>clsx</InlineCode> and <InlineCode>tailwind-merge</InlineCode> into a
          single call. It handles conditional class names and resolves conflicting Tailwind
          utilities automatically (e.g., <InlineCode>px-4</InlineCode> and{" "}
          <InlineCode>px-6</InlineCode>).
        </p>
        <CodeBlock
          code={`import { cn } from "@/lib/utils";\n\n<div className={cn(\n  "px-4 py-2 rounded-lg text-sm",\n  isActive && "bg-white/10 text-white/80",\n  className\n)} />`}
          language="tsx"
          filename="cn() usage"
        />
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">Animation primitives:</strong> Components that need
          animated entry, exit, or transition effects use Framer Motion&apos;s{" "}
          <InlineCode>motion</InlineCode> wrapper. The shared motion configuration from{" "}
          <InlineCode>src/lib/motion.ts</InlineCode> provides consistent easing curves, spring
          presets, and duration constants.
        </p>
        <CodeBlock
          code={`import { motion } from "framer-motion";\nimport { ease, spring, FAST, NORMAL } from "@/lib/motion";\n\n// Fade + slide entrance\n<motion.div\n  initial={{ opacity: 0, y: 12 }}\n  animate={{ opacity: 1, y: 0 }}\n  transition={{ duration: NORMAL, ease: ease.out }}\n>\n  {children}\n</motion.div>\n\n// Spring-based hover\n<motion.button whileHover={{ scale: 1.02 }} transition={spring.gentle}>\n  Click\n</motion.button>`}
          language="tsx"
          filename="Motion usage"
        />
        <Callout type="tip" title="Use cn() for All Conditional Classes">
          Always use <InlineCode>cn()</InlineCode> when combining conditional classes. String
          concatenation or template literals do not resolve Tailwind conflicts and will produce
          unpredictable output.
        </Callout>
      </section>

      <section id="motion-system">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Motion System
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          All animations use a centralized motion configuration defined in{" "}
          <InlineCode>src/lib/motion.ts</InlineCode>. This ensures visual consistency and makes
          it possible to adjust timing globally without hunting through individual components.
        </p>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06]">
            <span className="text-[11px] font-mono text-white/25">src/lib/motion.ts exports</span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
{`Export        Type     Values / Usage
──────────────────────────────────────────────────────
FAST          number   0.18s — micro-interactions
NORMAL        number   0.28s — general transitions
SLOW          number   0.45s — page-level reveals
PAGE          number   0.60s — full page transitions

ease.out      array    [0.16, 1, 0.3, 1] — deceleration
ease.standard array    [0.25, 0.1, 0.25, 1] — linear feel
ease.playful  array    [0.34, 1.56, 0.64, 1] — overshoot

spring.gentle object   stiffness:300, damping:20 — hover
spring.snappy object   stiffness:400, damping:25 — toggles
spring.bouncy object   stiffness:200, damping:12 — accents
spring.smooth object   stiffness:120, damping:20 — pages
spring.heavy  object   stiffness:180, damping:18 — cards

stagger.fast  number   0.04s — small lists
stagger.normal number  0.06s — card grids
stagger.slow  number   0.10s — large sections`}
            </code>
          </pre>
        </div>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">Duration selection:</strong> Use{" "}
          <InlineCode>FAST</InlineCode> for button hovers, tooltip appears, and toggles. Use{" "}
          <InlineCode>NORMAL</InlineCode> for sidebar slides, dropdown menus, and modal
          transitions. Use <InlineCode>SLOW</InlineCode> for staggered content reveals. Use{" "}
          <InlineCode>PAGE</InlineCode> for full route transitions.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">Easing selection:</strong> Use{" "}
          <InlineCode>ease.out</InlineCode> for elements entering the viewport (deceleration
          feels natural for arrivals). Use <InlineCode>ease.standard</InlineCode> for elements
          that move and return (like accordion content). Use{" "}
          <InlineCode>ease.playful</InlineCode> sparingly for accent animations that benefit
          from a slight overshoot.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">Spring selection:</strong> Use{" "}
          <InlineCode>spring.gentle</InlineCode> for hover effects,{" "}
          <InlineCode>spring.snappy</InlineCode> for tabs and toggles, and{" "}
          <InlineCode>spring.smooth</InlineCode> for page transitions. The library
          automatically respects <InlineCode>prefers-reduced-motion</InlineCode>.
        </p>
        <Callout type="tip" title="Always Import from @/lib/motion">
          Never define custom durations or easing curves inline. If the default presets do not
          fit a specific use case, add a named export to the motion module rather than
          duplicating values across files.
        </Callout>
      </section>

      <section id="common-mistakes">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Common Mistakes
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          These errors appear frequently when working with the component architecture.
        </p>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Putting &quot;use client&quot; in page.tsx.</strong>{" "}
                This breaks <InlineCode>export const metadata</InlineCode>. The metadata API
                requires a Server Component. Always separate concerns: page.tsx for metadata,
                ClientPage.tsx for interactive content.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Hardcoding animation values instead of importing from @/lib/motion.</strong>{" "}
                Using <InlineCode>duration: 0.3</InlineCode> instead of{" "}
                <InlineCode>duration: NORMAL</InlineCode> creates inconsistencies. When the
                motion config is updated, hardcoded values are missed.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Mismatched toc IDs and section IDs.</strong> The{" "}
                <InlineCode>toc</InlineCode> array in DocPage must reference IDs that exist on
                the rendered sections. A typo in either place breaks the sidebar navigation.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Using string concatenation for conditional classes.</strong>{" "}
                <InlineCode>`px-4 ${`isActive ? "bg-white/10" : ""}`}`</InlineCode> does not
                resolve Tailwind conflicts. Use <InlineCode>cn()</InlineCode> instead.
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
          These constraints affect how components can be composed and what features are available.
        </p>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Client Components cannot be async.</strong> If you need
                to fetch data and use hooks in the same component, you must fetch in a parent
                Server Component and pass the data as props to the Client Component.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Framer Motion adds to bundle size.</strong> Every component
                that imports from <InlineCode>framer-motion</InlineCode> adds ~30KB gzipped to
                the client bundle. Use it for meaningful animations, not decorative flourishes.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Server Components cannot pass functions as props.</strong>{" "}
                Functions, classes, and objects with methods cannot be serialized across the
                server/client boundary. Pass data as plain objects and define handlers in the
                Client Component.
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
          Follow these conventions to maintain a consistent and performant component
          architecture.
        </p>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">One component per file.</strong> Each file should export
                a single component. Internal sub-components that are not reused outside the file
                should be defined as unexported functions within the same file.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Extract interactive leaves.</strong> When a Server Component
                tree has a single interactive element (a button with state, a toggle), extract
                just that element into a Client Component rather than making the entire tree
                a Client Component.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <div>
              <p className="text-[14px] text-white/60 leading-relaxed">
                <strong className="text-white/70">Keep DocPage props consistent.</strong> Every DocPage
                should have a title, description, toc, and section. The toc array must include
                an entry for every section element on the page, in the order they appear.
              </p>
            </div>
          </li>
        </ul>
        <Callout type="note" title="Version Note">
          Component patterns are current as of version{" "}
          <InlineCode>{APP_VERSION}</InlineCode> (<InlineCode>{LAST_UPDATED}</InlineCode>).
          New patterns may be introduced as the codebase evolves.
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
            href="/docs/architecture/project-structure"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Project Structure</p>
            <p className="text-[13px] text-white/30">Directory layout and file organization.</p>
          </Link>
          <Link
            href="/docs/architecture/technology-stack"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Technology Stack</p>
            <p className="text-[13px] text-white/30">React 19, Next.js 16, and framework details.</p>
          </Link>
          <Link
            href="/docs/developer/contributing"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Contributing</p>
            <p className="text-[13px] text-white/30">How to add new components following these patterns.</p>
          </Link>
        </div>
      </section>
    </DocPage>
  );
}
