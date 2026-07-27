"use client";

import Link from "next/link";
import { DocPage, Callout, InlineCode } from "@/components/docs/DocLayout";
import { APP_VERSION, LAST_UPDATED } from "@/data/documentation";

const toc = [
  { id: "overview", label: "Navigation Overview" },
  { id: "urls", label: "Clean URLs" },
  { id: "transitions", label: "Smooth Transitions" },
  { id: "related", label: "Related" },
];

export default function RoutingClientPage() {
  return (
    <DocPage
      title="Routing"
      description="How pages map to URLs, how navigation works, and how users move through the site."
      toc={toc}
      section="Architecture"
    >
      <section id="overview">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          Navigation Overview
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The site uses file-based routing — every URL corresponds to a page in the codebase.
          There are no route configuration files or central router objects. This makes the
          relationship between URLs and code straightforward and easy to reason about.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          All internal navigation is handled client-side. Clicking a link swaps the page content
          without a full page reload, making transitions feel instant.
        </p>
      </section>

      <section id="urls">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Clean URLs
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Every page has a clean, readable URL that reflects its content. Section pages use
          short, descriptive paths. Sub-pages nest naturally. Dynamic routes handle content
          that varies by segment.
        </p>
        <ul className="list-none space-y-3 mb-6">
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Homepage</strong> — The root URL displays the
              main portfolio experience.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Section pages</strong> — Products, Company,
              Founder, Trust, and Resources each have a top-level path.
            </span>
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white/40 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Sub-pages</strong> — Each section has detail
              pages (e.g., individual products, company info, founder journey).
            </span>
          </li>
        </ul>
      </section>

      <section id="transitions">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Smooth Transitions
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Page transitions are animated to give users a sense of continuity. When navigating
          between related pages, content fades and slides into place. Shared layout elements
          (header, footer) remain mounted and stable during navigation.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Loading states provide instant visual feedback. Skeleton placeholders appear
          immediately while content streams in, preventing blank screens during navigation.
        </p>

        <Callout type="info" title="Accessibility">
          All animations respect the user&apos;s reduced-motion preference. Users who have
          requested reduced motion in their operating system settings see instant transitions
          without animations.
        </Callout>
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
            <p className="text-[13px] text-white/30">How pages and components are organized.</p>
          </Link>
          <Link
            href="/docs/features/accessibility"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Accessibility</p>
            <p className="text-[13px] text-white/30">How the site works for everyone.</p>
          </Link>
          <Link
            href="/docs/getting-started/navigation"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">Navigation Guide</p>
            <p className="text-[13px] text-white/30">User-facing navigation patterns and shortcuts.</p>
          </Link>
          <Link
            href="/docs/architecture/seo"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">SEO</p>
            <p className="text-[13px] text-white/30">How search engines discover pages.</p>
          </Link>
        </div>
      </section>

      <Callout type="info" title="Version Note">
        Routing conventions are current as of version <InlineCode>{APP_VERSION}</InlineCode> (
        <InlineCode>{LAST_UPDATED}</InlineCode>).
      </Callout>
    </DocPage>
  );
}
