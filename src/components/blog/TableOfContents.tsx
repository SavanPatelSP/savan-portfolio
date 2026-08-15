"use client";

import { useEffect, useState } from "react";
import { ChevronDown, List } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export function TableOfContents({ headings }: { headings: TocHeading[] }) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let frame: number | null = null;
    const onScroll = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(() => {
        frame = null;
        const y = window.scrollY + 120;
        let current = headings[0]?.id ?? "";
        for (const heading of headings) {
          const el = document.getElementById(heading.id);
          if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY;
            if (top <= y) current = heading.id;
          }
        }
        setActiveId(current);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [headings]);

  const navList = (
    <ol className="relative space-y-1 pl-4">
      <span className="absolute left-0 top-2 bottom-2 w-px bg-white/[0.08]" aria-hidden="true" />
      {headings.map((heading) => (
        <li key={heading.id} className={cn("relative", heading.level === 3 ? "pl-4" : "pl-0")}>
          <span
            className={cn(
              "absolute left-0 top-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300",
              activeId === heading.id
                ? "border-blue-400 bg-blue-400/40 shadow-[0_0_10px_rgba(96,165,250,0.55)]"
                : "border-white/20 bg-transparent"
            )}
            aria-hidden="true"
          />
          <a
            href={`#${heading.id}`}
            className={cn(
              "block py-1.5 pr-3 text-[13px] leading-snug transition-colors duration-200",
              activeId === heading.id
                ? "font-medium text-blue-300"
                : "text-white/35 hover:text-white/70"
            )}
            aria-current={activeId === heading.id ? "true" : undefined}
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      {/* Desktop — sticky aside */}
      <nav className="hidden lg:block" aria-label="Table of contents">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">
          On this page
        </p>
        <div className="mt-4">{navList}</div>
      </nav>

      {/* Mobile — collapsible */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="article-toc-panel"
          className="flex w-full items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-sm font-medium text-white/60 hover:border-white/[0.16] hover:text-white/85 transition-all duration-200 min-h-[44px]"
        >
          <span className="inline-flex items-center gap-2">
            <List className="h-4 w-4 text-blue-400/70" aria-hidden="true" />
            Contents
          </span>
          <ChevronDown
            className={cn("h-4 w-4 text-white/35 transition-transform duration-200", open && "rotate-180")}
            aria-hidden="true"
          />
        </button>
        {open && (
          <div id="article-toc-panel" className="mt-2 rounded-xl border border-white/[0.06] bg-white/[0.01] p-3">
            {navList}
          </div>
        )}
      </div>
    </>
  );
}
