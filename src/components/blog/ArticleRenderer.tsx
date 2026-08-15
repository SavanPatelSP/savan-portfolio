"use client";

import { useCallback, useState, type ReactNode } from "react";
import Image from "next/image";
import { Check, Copy } from "lucide-react";
import { buildHeadingIds, type CalloutVariant, type ContentBlock } from "@/lib/content";
import { cn } from "@/lib/utils";

/* ─── Inline formatting ────────────────────────────────────────── */
/* Supports `[label](url)` links, `**bold**`, and `` `code` ``.     */

const INLINE_RE = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|`([^`]+)`/g;

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = INLINE_RE.exec(text))) {
    if (match.index > lastIndex) {
      nodes.push(<span key={key++}>{text.slice(lastIndex, match.index)}</span>);
    }

    if (match[1] !== undefined) {
      const label = match[1];
      const href = match[2];
      nodes.push(
        <a
          key={key++}
          href={href}
          className="text-blue-400/90 underline underline-offset-4 decoration-blue-400/30 hover:text-blue-300 hover:decoration-blue-400/60 transition-colors duration-200"
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {label}
        </a>
      );
    } else if (match[3] !== undefined) {
      nodes.push(
        <strong key={key++} className="font-semibold text-white/80">
          {match[3]}
        </strong>
      );
    } else if (match[4] !== undefined) {
      nodes.push(
        <code key={key++} className="article-code">
          {match[4]}
        </code>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(<span key={key++}>{text.slice(lastIndex)}</span>);
  }

  return nodes;
}

/* ─── Block renderer ───────────────────────────────────────────── */

const CALLOUT_VARIANTS: Record<CalloutVariant, { label: string; className: string }> = {
  note: { label: "Note", className: "article-callout--note" },
  insight: { label: "Insight", className: "article-callout--insight" },
  important: { label: "Important", className: "article-callout--important" },
  experiment: { label: "Experiment", className: "article-callout--experiment" },
  buildlog: { label: "Build Log", className: "article-callout--buildlog" },
};

function CopyQuoteButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — ignore */
    }
  }, [text]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Quote copied" : "Copy quote"}
      className="absolute -top-3 right-0 rounded-md border border-white/[0.08] bg-black/60 p-1.5 text-white/25 hover:text-white/70 hover:border-white/[0.16] transition-colors duration-200"
    >
      {copied ? (
        <Check className="h-3 w-3 text-emerald-400/80" aria-hidden="true" />
      ) : (
        <Copy className="h-3 w-3" aria-hidden="true" />
      )}
    </button>
  );
}

export function ArticleRenderer({ blocks, className }: { blocks: ContentBlock[]; className?: string }) {
  const headingTexts = blocks
    .filter((block) => block.type === "h2" || block.type === "h3")
    .map((block) => block.text);
  const headingIds = buildHeadingIds(headingTexts);
  let headingIndex = 0;

  return (
    <div className={className}>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p key={i} className="article-p">
                {renderInline(block.text)}
              </p>
            );
          case "h2":
            return (
              <h2 key={i} id={headingIds[headingIndex++]} className="article-h2">
                {renderInline(block.text)}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} id={headingIds[headingIndex++]} className="article-h3">
                {renderInline(block.text)}
              </h3>
            );
          case "quote":
            return (
              <blockquote key={i} className="article-quote">
                <CopyQuoteButton text={block.text} />
                <p>{renderInline(block.text)}</p>
                {block.attribution && (
                  <footer className="mt-3 text-sm text-white/30 not-italic">
                    — {block.attribution}
                  </footer>
                )}
              </blockquote>
            );
          case "list":
            return block.ordered ? (
              <ol key={i} className="article-list article-list-ordered">
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ol>
            ) : (
              <ul key={i} className="article-list">
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ul>
            );
          case "image":
            return (
              <figure key={i} className="article-figure">
                <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02]">
                  <Image
                    src={block.src}
                    alt={block.decorative ? "" : block.alt}
                    aria-hidden={block.decorative ? true : undefined}
                    width={1200}
                    height={800}
                    sizes="(min-width: 768px) 672px, 100vw"
                    className="w-full h-auto"
                  />
                </div>
                {block.caption && !block.decorative && (
                  <figcaption>{block.caption}</figcaption>
                )}
              </figure>
            );
          case "code":
            return (
              <pre key={i} className="article-code-block">
                <code>{block.code}</code>
              </pre>
            );
          case "table":
            return (
              <div key={i} className="article-table-wrap">
                <table className="article-table">
                  <thead>
                    <tr>
                      {block.headers.map((header, j) => (
                        <th key={j} scope="col">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j}>
                        {row.map((cell, k) => (
                          <td key={k}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "callout":
            return (
              <div
                key={i}
                className={cn(
                  "article-callout",
                  block.variant && CALLOUT_VARIANTS[block.variant]?.className
                )}
              >
                {block.variant && (
                  <p className="article-callout-label">
                    {CALLOUT_VARIANTS[block.variant].label}
                  </p>
                )}
                {block.title && (
                  <p className="article-callout-title">{block.title}</p>
                )}
                <p>{renderInline(block.text)}</p>
              </div>
            );
          case "link":
            return (
              <p key={i} className="my-8">
                <a
                  href={block.href}
                  className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.02] px-5 py-3 text-sm font-medium text-white/60 hover:text-white/80 hover:border-white/[0.18] hover:bg-white/[0.04] transition-all duration-200"
                  target={block.href.startsWith("http") ? "_blank" : undefined}
                  rel={block.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {block.label}
                  <svg
                    className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </a>
                {block.note && (
                  <span className="mt-2 block text-xs text-white/25">{block.note}</span>
                )}
              </p>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
