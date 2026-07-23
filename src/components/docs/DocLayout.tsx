"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ease } from "@/lib/motion";
import { AppShell } from "@/components/navigation";
import { documentationNavigation } from "@/data/navigation/documentation-navigation";
import { type DocItem } from "@/data/docs";

/* ─── TABLE OF CONTENTS ────────────────────────────────────── */

export function TableOfContents({ items }: { items: { id: string; label: string }[] }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px", threshold: 0 }
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="hidden xl:block w-56 shrink-0" aria-label="Table of contents">
      <div className="sticky top-20">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/20 mb-3 px-3">
          On this page
        </p>
        <ul className="space-y-0.5 border-l border-white/[0.06]">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "block pl-5 pr-3 py-1 text-[12px] transition-colors duration-200 border-l -ml-px",
                  activeId === item.id
                    ? "text-white/60 border-white/30 font-medium"
                    : "text-white/25 border-transparent hover:text-white/40 hover:border-white/10"
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

/* ─── CALLOUT ──────────────────────────────────────────────── */

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: "info" | "tip" | "warning" | "note";
  title?: string;
  children: React.ReactNode;
}) {
  const styles = {
    info: {
      border: "border-blue-500/20",
      bg: "bg-blue-500/[0.04]",
      icon: "text-blue-400/60",
      title: "text-blue-400/80",
    },
    tip: {
      border: "border-emerald-500/20",
      bg: "bg-emerald-500/[0.04]",
      icon: "text-emerald-400/60",
      title: "text-emerald-400/80",
    },
    warning: {
      border: "border-amber-500/20",
      bg: "bg-amber-500/[0.04]",
      icon: "text-amber-400/60",
      title: "text-amber-400/80",
    },
    note: {
      border: "border-white/[0.08]",
      bg: "bg-white/[0.02]",
      icon: "text-white/30",
      title: "text-white/50",
    },
  };
  const s = styles[type];

  return (
    <div
      className={cn(
        "rounded-xl border p-5 my-6",
        s.border,
        s.bg
      )}
    >
      {title && (
        <p className={cn("text-xs font-semibold mb-2 uppercase tracking-wide", s.title)}>
          {title}
        </p>
      )}
      <div className="text-[13px] text-white/35 leading-relaxed">{children}</div>
    </div>
  );
}

/* ─── CODE BLOCK ───────────────────────────────────────────── */

export function CodeBlock({
  code,
  language: _language = "bash",
  filename,
}: {
  code: string;
  language?: string;
  filename?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] my-6 overflow-hidden">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.06]">
          <span className="text-[11px] font-mono text-white/25">{filename}</span>
          <button
            onClick={handleCopy}
            className="text-[10px] font-mono text-white/20 hover:text-white/40 transition-colors duration-200"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
      <pre className="p-4 overflow-x-auto">
        <code className="text-[13px] font-mono text-white/40 leading-relaxed whitespace-pre">
          {code}
        </code>
      </pre>
    </div>
  );
}

/* ─── INLINE CODE ──────────────────────────────────────────── */

export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="font-mono text-[12px] text-white/50 bg-white/[0.04] border border-white/[0.06] rounded px-1.5 py-0.5">
      {children}
    </code>
  );
}

/* ─── PREV / NEXT (exported for external use) ─────────────── */

export function PrevNextLinks({
  prev,
  next,
}: {
  prev: DocItem | null;
  next: DocItem | null;
}) {
  return (
    <div className="flex items-stretch gap-3 mt-16 pt-8 border-t border-white/[0.06]">
      {prev ? (
        <Link
          href={`/docs/${prev.slug}`}
          className="group flex-1 flex items-center justify-between rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
        >
          <div>
            <span className="block text-[10px] font-mono text-white/15 uppercase tracking-[0.15em] mb-1">
              Previous
            </span>
            <span className="text-sm font-medium text-white/50 group-hover:text-white/70 transition-colors duration-200">
              {prev.title}
            </span>
          </div>
          <ArrowRight className="h-4 w-4 text-white/15 rotate-180 group-hover:-translate-x-0.5 transition-transform duration-200" />
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <Link
          href={`/docs/${next.slug}`}
          className="group flex-1 flex items-center justify-between rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
        >
          <div>
            <span className="block text-[10px] font-mono text-white/15 uppercase tracking-[0.15em] mb-1">
              Next
            </span>
            <span className="text-sm font-medium text-white/50 group-hover:text-white/70 transition-colors duration-200">
              {next.title}
            </span>
          </div>
          <ArrowRight className="h-4 w-4 text-white/15 group-hover:translate-x-0.5 transition-transform duration-200" />
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}

/* ─── DOC PAGE WRAPPER (uses AppShell) ─────────────────────── */

export function DocPage({
  title,
  description,
  toc = [],
  section: _section,
  children,
}: {
  title: string;
  description: string;
  toc?: { id: string; label: string }[];
  section?: string;
  children: React.ReactNode;
}) {
  return (
    <AppShell
      navigation={documentationNavigation}
      basePath="/docs"
      rightSidebar={<TableOfContents items={toc} />}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: ease.out }}
      >
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-tight mb-3">
          {title}
        </h1>
        {description && (
          <p className="text-base text-white/30 leading-relaxed mb-10 max-w-2xl">
            {description}
          </p>
        )}
      </motion.div>
      <motion.div
        className="docs-content"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05, ease: ease.out }}
      >
        {children}
      </motion.div>
    </AppShell>
  );
}
