"use client";

import Link from "next/link";
import {
  DocPage,
  Callout,
  InlineCode,
} from "@/components/docs/DocLayout";

const toc = [
  { id: "overview", label: "Overview" },
  { id: "how-search-works", label: "How Search Works" },
  { id: "opening-search", label: "Opening Search" },
  { id: "search-scope", label: "Search Scope" },
  { id: "results-ranking", label: "Results Ranking" },
  { id: "best-practices", label: "Best Practices" },
  { id: "limitations", label: "Limitations" },
  { id: "common-mistakes", label: "Common Mistakes" },
  { id: "related", label: "Related" },
];

export default function ClientPage() {
  return (
    <DocPage
      title="Search"
      description="The global search modal — a client-side discovery tool that indexes all content areas of the Portfolio App."
      toc={toc}
      section="Application"
    >
      <section id="overview">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-0">
          Overview
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The Search feature is a global search modal that indexes content
          across the entire Portfolio App. It is powered by client-side
          indexing, meaning the search index is built in the browser and
          queries execute locally — there is no server round-trip for search
          results.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          When you open the search modal, the app queries a pre-built index of
          all searchable content. Results appear instantly as you type, with
          the search term highlighted in each result excerpt.
        </p>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          <strong className="text-white/60">Typical workflow:</strong> You press
          Cmd/Ctrl + K, type a partial keyword (e.g., &quot;pwa&quot;), scan
          the results list, and click the relevant entry to navigate directly
          to that page.
        </p>
      </section>

      <section id="how-search-works">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          How Search Works
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The search system operates in three stages:
        </p>
        <ol className="space-y-3 text-[14px] text-white/40 list-decimal list-inside">
          <li>
            <strong className="text-white/60">Index build</strong> — At build
            time, the app generates a search index containing all searchable
            content. This index includes page titles, descriptions, body text,
            project names, release notes, and settings labels.
          </li>
          <li>
            <strong className="text-white/60">Query execution</strong> — When
            you type in the search input, the app queries the pre-built index
            using substring matching. The query is case-insensitive and
            supports partial word matches.
          </li>
          <li>
            <strong className="text-white/60">Result display</strong> — Matching
            results are ranked by relevance and displayed in a scrollable list
            within the modal. Each result shows a content type label, the
            matching title, and a text excerpt with the search term highlighted.
          </li>
        </ol>

        <Callout type="note" title="No Network Dependency">
          Because search runs entirely in the browser, it works offline after
          the initial page load. The search index is cached alongside other
          static assets by the service worker.
        </Callout>
      </section>

      <section id="opening-search">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Opening Search
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          There are three ways to open the search modal:
        </p>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-[13px] text-white/40 border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left py-3 pr-4 text-white/50 font-medium">
                  Method
                </th>
                <th className="text-left py-3 pr-4 text-white/50 font-medium">
                  Shortcut / Action
                </th>
                <th className="text-left py-3 text-white/50 font-medium">
                  Availability
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              <tr>
                <td className="py-3 pr-4 text-white/50">Keyboard shortcut</td>
                <td className="py-3 pr-4">
                  <InlineCode>Cmd + K</InlineCode> (macOS) /{" "}
                  <InlineCode>Ctrl + K</InlineCode> (Windows/Linux)
                </td>
                <td className="py-3">Global — works on any page</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-white/50">Search icon</td>
                <td className="py-3 pr-4">
                  Click the magnifying glass icon in the top navigation bar
                </td>
                <td className="py-3">Global — visible on all pages</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-white/50">Shortcut menu</td>
                <td className="py-3 pr-4">
                  Press <InlineCode>Cmd/Ctrl + /</InlineCode> and select
                  &quot;Search&quot; from the list
                </td>
                <td className="py-3">Global — works on any page</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          When the modal opens, the input field is automatically focused so you
          can start typing immediately. Press <InlineCode>Esc</InlineCode> to
          close the modal at any time. The modal also closes when you click
          outside of it or select a result.
        </p>

        <Callout type="tip" title="Focus on Mobile">
          On mobile devices, the search icon in the navigation bar is the most
          reliable way to open search. Keyboard shortcuts are not available
          without a physical keyboard.
        </Callout>
      </section>

      <section id="search-scope">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Search Scope
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          The global search indexes all content areas of the application:
        </p>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-[13px] text-white/40 border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left py-3 pr-4 text-white/50 font-medium">
                  Content Type
                </th>
                <th className="text-left py-3 pr-4 text-white/50 font-medium">
                  Searchable Fields
                </th>
                <th className="text-left py-3 text-white/50 font-medium">
                  Result Links To
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              <tr>
                <td className="py-3 pr-4 text-white/50">Documentation</td>
                <td className="py-3 pr-4">Title, description, body text</td>
                <td className="py-3">Specific documentation page</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-white/50">Projects</td>
                <td className="py-3 pr-4">Name, description, tech stack tags</td>
                <td className="py-3">Project detail page</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-white/50">Downloads</td>
                <td className="py-3 pr-4">
                  Version number, release notes, platform tags
                </td>
                <td className="py-3">Download page with version context</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-white/50">Settings</td>
                <td className="py-3 pr-4">Section name, option labels</td>
                <td className="py-3">Settings page with section anchor</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-[14px] text-white/40 leading-relaxed">
          Each search result includes a content type label (e.g.,
          &quot;Documentation&quot;, &quot;Project&quot;) and a brief excerpt
          of the matching text with the search term highlighted. This helps
          you identify the result type before clicking.
        </p>
      </section>

      <section id="results-ranking">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Results Ranking
        </h2>
        <p className="text-[14px] text-white/40 leading-relaxed mb-4">
          Search results are ordered by relevance using a weighted scoring
          system. The ranking factors, from highest to lowest weight:
        </p>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Title match</strong> — Highest
              weight. An exact title match appears first.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Description match</strong> —
              Medium weight. Matches in the page description appear next.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Body content match</strong> —
              Lower weight. Matches within the page body appear after title and
              description matches.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Exact phrase bonus</strong> — An
              exact phrase match scores higher than individual word matches.
              Searching &quot;PWA Install&quot; ranks a page with that exact
              phrase above one containing the words separately.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              <strong className="text-white/60">Recency boost</strong> — More
              recently updated content receives a slight ranking boost for
              ties. This ensures newer documentation appears first when
              multiple pages match equally.
            </span>
          </li>
        </ul>

        <p className="text-[14px] text-white/40 leading-relaxed mt-4">
          Search is case-insensitive and supports partial matching. Typing{" "}
          <InlineCode>dash</InlineCode> matches &quot;Dashboard&quot;, and{" "}
          <InlineCode>pwa</InlineCode> matches &quot;PWA
          Installation&quot;.
        </p>

        <Callout type="info" title="Result Limit">
          The search modal displays a maximum of 10 results at a time. If
          there are more matches, a scroll indicator shows additional results
          are available. Refining your query with more specific terms narrows
          the results.
        </Callout>
      </section>

      <section id="best-practices">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Best Practices
        </h2>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Use specific terms rather than single generic words. Searching
              &quot;PWA installation Android&quot; is more precise than just
              &quot;install&quot;.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
            <span>
              Use the keyboard shortcut (Cmd/Ctrl + K) instead of reaching for
              the mouse. It is faster and works from any page.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/10 shrink-0" />
            <span>
              Check the content type label before clicking a result. If you are
              looking for a project, results labeled &quot;Documentation&quot;
              may not be what you want.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              If no results appear, try a shorter or different query. The
              search uses substring matching, so overly specific terms may
              miss relevant content.
            </span>
          </li>
        </ul>
      </section>

      <section id="limitations">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Limitations
        </h2>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              The search index is built at compile time. New content added to
              the app (e.g., a new project or documentation page) will not
              appear in search results until the next deployment.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
            <span>
              There is no fuzzy matching or typo correction. Searching for
              &quot;dashbord&quot; will not match &quot;Dashboard&quot;.
              You must type the correct characters.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              The 10-result limit means deep content may not appear for broad
              queries. More specific terms are required to surface results
              lower in the ranking.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              Search does not index image alt text, code block contents, or
              PDF-embedded text. Only plain-text content fields are included
              in the index.
            </span>
          </li>
        </ul>
      </section>

      <section id="common-mistakes">
        <h2 className="text-xl font-semibold text-white/70 mb-4 mt-12">
          Common Mistakes
        </h2>
        <ul className="space-y-2 text-[14px] text-white/40">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Assuming search covers
              everything</strong> — Search indexes documentation, projects,
              downloads, and settings labels. It does not index code block
              contents, image metadata, or external links.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Typing too many words</strong> —
              Long queries may produce zero results because every word must
              appear somewhere in the indexed content. Use two or three
              keywords instead.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Expecting typo tolerance</strong> —
              The search does not correct spelling. If you mistype a term, no
              results will appear. Double-check your query before assuming the
              content does not exist.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/50 shrink-0" />
            <span>
              <strong className="text-white/60">Closing the modal too
              quickly</strong> — The modal closes on blur (clicking outside).
              If you accidentally click outside the modal while reviewing
              results, you lose your search context and must re-type the
              query.
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
            href="/docs/application/documentation"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">
              Documentation
            </p>
            <p className="text-[13px] text-white/30">
              Browse the full documentation library.
            </p>
          </Link>
          <Link
            href="/docs/getting-started/navigation"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">
              Navigation
            </p>
            <p className="text-[13px] text-white/30">
              Keyboard shortcuts and navigation patterns.
            </p>
          </Link>
          <Link
            href="/docs/application/dashboard"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">
              Dashboard
            </p>
            <p className="text-[13px] text-white/30">
              Main dashboard overview and quick actions.
            </p>
          </Link>
          <Link
            href="/docs/reference/faq"
            className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
          >
            <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors mb-1">
              FAQ
            </p>
            <p className="text-[13px] text-white/30">
              Searchable list of common questions.
            </p>
          </Link>
        </div>
      </section>
    </DocPage>
  );
}
