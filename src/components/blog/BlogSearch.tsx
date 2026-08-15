"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, X, Feather, Clock } from "lucide-react";
import type { BlogPost } from "@/data/blog";
import { slugifyCategory } from "@/data/blog";
import { cn } from "@/lib/utils";
import { formatDateShort, formatReadingTime, readingTimeMinutes } from "@/lib/content";

interface Match {
  post: BlogPost;
  score: number;
}

function searchableText(post: BlogPost): string {
  const body = post.content
    .map((block) => {
      if ("text" in block) return block.text;
      if ("items" in block) return block.items.join(" ");
      if ("code" in block) return block.code;
      if ("headers" in block) return [...block.headers, ...block.rows.flat()].join(" ");
      return "";
    })
    .join(" ");
  return [post.title, post.excerpt, post.subtitle || "", post.category, post.tags.join(" "), body]
    .join(" ")
    .toLowerCase();
}

function scoreMatches(posts: BlogPost[], query: string): Match[] {
  const q = query.toLowerCase().trim();
  if (q.length < 2) return [];
  const terms = q.split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  const scored: Match[] = [];
  for (const post of posts) {
    const haystack = searchableText(post);
    let score = 0;
    for (const term of terms) {
      if (!haystack.includes(term)) continue;
      score += 1;
      const titleLower = post.title.toLowerCase();
      if (titleLower.startsWith(term)) score += 3;
      else if (titleLower.includes(term)) score += 2;
      else if (post.category.toLowerCase().includes(term)) score += 1.5;
      else if (post.tags.some((t) => t.toLowerCase().includes(term))) score += 1;
    }
    if (score > 0) scored.push({ post, score });
  }
  return scored.sort((a, b) => b.score - a.score);
}

export function BlogSearch({ posts, className }: { posts: BlogPost[]; className?: string }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => scoreMatches(posts, query), [posts, query]);
  const filteredResults = useMemo(
    () => (categoryFilter ? results.filter((r) => r.post.category === categoryFilter) : results),
    [results, categoryFilter]
  );
  const recent = useMemo(() => posts.slice(0, 3), [posts]);
  const categories = useMemo(() => {
    const seen = new Set<string>();
    const counts = new Map<string, number>();
    const list: { label: string; slug: string; count: number }[] = [];
    for (const post of posts) {
      const slug = slugifyCategory(post.category);
      counts.set(slug, (counts.get(slug) ?? 0) + 1);
      if (!seen.has(slug)) {
        seen.add(slug);
        list.push({ label: post.category, slug, count: 0 });
      }
    }
    return list.map((c) => ({ ...c, count: counts.get(c.slug) ?? 0 }));
  }, [posts]);

  const showResults = open && query.trim().length >= 2;
  const showSuggestions = open && query.trim().length === 0;

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  /* Global "/" shortcut — focus search from anywhere on the page. */
  useEffect(() => {
    function onGlobalKeyDown(event: KeyboardEvent) {
      if (event.key !== "/") return;
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target?.isContentEditable) {
        return;
      }
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      event.preventDefault();
      inputRef.current?.focus();
    }
    document.addEventListener("keydown", onGlobalKeyDown);
    return () => document.removeEventListener("keydown", onGlobalKeyDown);
  }, []);

  const clear = () => {
    setQuery("");
    setActiveIndex(0);
    setCategoryFilter(null);
    setOpen(false);
    inputRef.current?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      if (query) {
        setQuery("");
        setCategoryFilter(null);
        setOpen(true);
      } else {
        setOpen(false);
      }
      return;
    }
    if (showResults && filteredResults.length > 0) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((i) => (i + 1) % filteredResults.length);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((i) => (i - 1 + filteredResults.length) % filteredResults.length);
      } else if (event.key === "Enter") {
        event.preventDefault();
        const target = filteredResults[activeIndex];
        if (target) window.location.assign(`/blog/${target.post.slug}`);
      }
    }
  };

  return (
    <div ref={rootRef} className={cn("relative w-full", className)}>
      <div
        className={cn(
          "flex items-center gap-3 rounded-2xl border bg-white/[0.02] px-4 transition-colors duration-200",
          open ? "border-white/[0.16] bg-white/[0.03]" : "border-white/[0.08] hover:border-white/[0.14]"
        )}
      >
        <Search className="h-4 w-4 shrink-0 text-white/30" aria-hidden="true" />
        <label htmlFor="blog-search" className="sr-only">
          Search the blog
        </label>
        <input
          id="blog-search"
          ref={inputRef}
          type="search"
          role="combobox"
          aria-expanded={showResults || showSuggestions}
          aria-controls="blog-search-results"
          aria-activedescendant={showResults && filteredResults[activeIndex] ? `blog-result-${filteredResults[activeIndex].post.slug}` : undefined}
          aria-autocomplete="list"
          autoComplete="off"
          spellCheck={false}
          placeholder="Search stories, topics, tags…"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
            setCategoryFilter(null);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className="h-[52px] w-full bg-transparent text-sm text-white/80 placeholder:text-white/25 outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={clear}
            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white/40 hover:text-white/80 hover:bg-white/[0.06] transition-colors duration-200"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
        <kbd className="hidden sm:inline-flex shrink-0 items-center gap-0.5 rounded-md border border-white/[0.08] bg-white/[0.02] px-1.5 py-0.5 font-mono text-[10px] text-white/25">
          <span className="text-white/40">esc</span>
        </kbd>
      </div>

      <p className="mt-2 hidden sm:block font-mono text-[10px] uppercase tracking-[0.2em] text-white/20">
        Press <kbd className="rounded border border-white/[0.08] bg-white/[0.02] px-1 font-sans text-[9px] text-white/35">/</kbd> to search from anywhere
      </p>

      {(showResults || showSuggestions) && (
        <div
          id="blog-search-results"
          className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-white/[0.10] bg-[#0c0e14]/95 backdrop-blur-xl shadow-2xl shadow-black/60"
          role="listbox"
          aria-label="Search results"
        >
          {showSuggestions && (
            <div className="p-3">
              <div className="flex items-center justify-between px-2 pt-1 pb-2">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25">
                  Recent stories
                </p>
              </div>
              <ul className="space-y-0.5">
                {recent.map((post) => (
                  <li key={post.slug} role="option" aria-selected={false}>
                    <Link
                      href={`/blog/${post.slug}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-white/[0.04] transition-colors duration-150"
                    >
                      <span className="flex-1 min-w-0">
                        <span className="block text-sm text-white/70 line-clamp-1">{post.title}</span>
                        <span className="mt-0.5 block text-[11px] font-mono text-white/25">
                          {post.category} · {formatDateShort(post.date)}
                        </span>
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-white/20" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
              {categories.length > 0 && (
                <div className="mt-2 border-t border-white/[0.06] px-2 pt-3 pb-1">
                  <p className="pb-2 text-[10px] font-mono uppercase tracking-[0.2em] text-white/25">
                    Explore topics
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {categories.map((category) => (
                      <Link
                        key={category.slug}
                        href={`/blog/category/${category.slug}`}
                        onClick={() => setOpen(false)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] px-2.5 py-1 text-[11px] text-white/40 hover:text-white/70 hover:border-white/[0.18] transition-colors duration-200"
                      >
                        {category.label}
                        <span className="font-mono text-[10px] text-white/25">{category.count}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {showResults && (
            <div>
              <div className="flex items-center justify-between px-4 pt-3 pb-2">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">
                  {filteredResults.length === 1
                    ? "1 story found"
                    : `${filteredResults.length} stories found`}
                  {categoryFilter && (
                    <span className="text-white/20">
                      {" "}· in {categoryFilter}
                    </span>
                  )}
                </p>
                {categoryFilter && (
                  <button
                    type="button"
                    onClick={() => setCategoryFilter(null)}
                    className="inline-flex items-center gap-1 rounded-full border border-white/[0.08] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/40 hover:text-white/75 hover:border-white/[0.18] transition-colors duration-200"
                  >
                    <X className="h-3 w-3" aria-hidden="true" />
                    Clear filter
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5 px-4 pb-3">
                <button
                  type="button"
                  onClick={() => {
                    setCategoryFilter(null);
                    setActiveIndex(0);
                  }}
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-[11px] transition-colors duration-200",
                    !categoryFilter
                      ? "border-blue-400/30 bg-blue-400/[0.08] text-blue-300/90"
                      : "border-white/[0.08] text-white/40 hover:text-white/70 hover:border-white/[0.18]"
                  )}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category.slug}
                    type="button"
                    onClick={() => {
                      setCategoryFilter(category.label);
                      setActiveIndex(0);
                    }}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] transition-colors duration-200",
                      categoryFilter === category.label
                        ? "border-blue-400/30 bg-blue-400/[0.08] text-blue-300/90"
                        : "border-white/[0.08] text-white/40 hover:text-white/70 hover:border-white/[0.18]"
                    )}
                  >
                    {category.label}
                    <span className="font-mono text-[10px] text-white/25">{category.count}</span>
                  </button>
                ))}
              </div>

              {filteredResults.length === 0 ? (
                <div className="flex flex-col items-center px-6 py-10 text-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02]">
                    <Feather className="h-4 w-4 text-white/30" aria-hidden="true" />
                  </span>
                  <p className="mt-4 text-base font-semibold text-white/80">
                    {categoryFilter ? `No ${categoryFilter} stories found` : "No stories found"}
                  </p>
                  <p className="mt-1.5 text-sm text-white/35">
                    Try another search, clear the filter, or explore a topic below.
                  </p>
                  <button
                    type="button"
                    onClick={clear}
                    className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/[0.10] px-4 py-2 text-xs font-medium text-white/45 hover:text-white/75 hover:border-white/[0.18] transition-all duration-200"
                  >
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                    Clear search
                  </button>
                  {!categoryFilter && categories.length > 0 && (
                    <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                      {categories.slice(0, 5).map((category) => (
                        <Link
                          key={category.slug}
                          href={`/blog/category/${category.slug}`}
                          onClick={() => setOpen(false)}
                          className="rounded-full border border-white/[0.08] px-2.5 py-1 text-[11px] text-white/40 hover:text-white/70 hover:border-white/[0.18] transition-colors duration-200"
                        >
                          {category.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <ul className="max-h-[60vh] overflow-y-auto p-1.5">
                  {filteredResults.map((result, i) => (
                    <li
                      key={result.post.slug}
                      role="option"
                      aria-selected={i === activeIndex}
                      id={`blog-result-${result.post.slug}`}
                    >
                      <Link
                        href={`/blog/${result.post.slug}`}
                        onClick={() => setOpen(false)}
                        onMouseEnter={() => setActiveIndex(i)}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150",
                          i === activeIndex ? "bg-white/[0.05]" : "hover:bg-white/[0.03]"
                        )}
                      >
                        <span className="flex-1 min-w-0">
                          <span className="block text-sm font-medium text-white/80 line-clamp-1">
                            {result.post.title}
                          </span>
                          <span className="mt-0.5 flex flex-wrap items-center gap-x-2 text-[11px] font-mono text-white/25">
                            <span className="uppercase tracking-wider">{result.post.category}</span>
                            <span className="h-0.5 w-0.5 rounded-full bg-white/20" aria-hidden="true" />
                            <time dateTime={result.post.date}>{formatDateShort(result.post.date)}</time>
                            <span className="inline-flex items-center gap-1">
                              <Clock className="h-3 w-3" aria-hidden="true" />
                              {formatReadingTime(result.post.readingTime ?? readingTimeMinutes(result.post.content))}
                            </span>
                          </span>
                        </span>
                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-white/20" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
