"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MessageSquare, RefreshCw } from "lucide-react";
import { HyvorComments } from "./HyvorComments";
import { cn } from "@/lib/utils";

/**
 * Comment section backed by Hyvor Talk.
 *
 * The website ID defaults to the site's public Hyvor Talk website and can
 * be overridden with the `NEXT_PUBLIC_HYVOR_TALK_WEBSITE_ID` env var.
 *
 * Loading is lazy: the provider only mounts when the section approaches
 * the viewport, or when the visitor explicitly clicks "Load comments".
 * A reserved min-height prevents layout shift while it loads, and any
 * failure to load the embed script degrades to an inline retry instead
 * of breaking the article.
 */

const DEFAULT_WEBSITE_ID = "15822";

function getWebsiteId(): string {
  return (
    process.env.NEXT_PUBLIC_HYVOR_TALK_WEBSITE_ID?.trim() || DEFAULT_WEBSITE_ID
  );
}

type Status = "idle" | "loading" | "active" | "error";

export function Comments({
  pageId,
  pageUrl,
  pageTitle,
  className,
}: {
  pageId: string;
  pageUrl: string;
  pageTitle: string;
  className?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const rootRef = useRef<HTMLDivElement>(null);

  const start = useCallback(() => {
    setStatus((current) => (current === "active" ? current : "loading"));
  }, []);

  const handleReady = useCallback(() => setStatus("active"), []);
  const handleError = useCallback(() => setStatus("error"), []);

  /* Pre-load when the section approaches the viewport. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          start();
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px 0px 0px" }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, [start]);

  const showEmbed = status === "loading" || status === "active";

  return (
    <div
      ref={rootRef}
      id={`comments-${pageId}`}
      className={cn("scroll-mt-24", className)}
    >
      <div className="min-h-[260px]">
        {status === "idle" && (
          <LoadPrompt onLoad={start} label="Load comments" />
        )}
        {showEmbed && status === "loading" && <Loading />}
        {showEmbed && (
          <HyvorComments
            websiteId={getWebsiteId()}
            pageId={pageId}
            pageUrl={pageUrl}
            pageTitle={pageTitle}
            onReady={handleReady}
            onError={handleError}
          />
        )}
        {status === "error" && <ErrorFallback onRetry={start} />}
      </div>
    </div>
  );
}

function LoadPrompt({ onLoad, label }: { onLoad: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onLoad}
      className="group flex min-h-[180px] w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/[0.10] bg-white/[0.01] px-6 py-10 transition-all duration-300 hover:border-white/[0.18] hover:bg-white/[0.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] transition-colors duration-200 group-hover:border-blue-400/25 group-hover:text-blue-300">
        <MessageSquare className="h-4 w-4 text-white/35 group-hover:text-blue-300/80" aria-hidden="true" />
      </span>
      <span className="text-sm font-medium text-white/55 group-hover:text-white/80 transition-colors duration-200">
        {label}
      </span>
      <span className="text-xs text-white/25">
        Comments load only when you want them — no scripts on page load.
      </span>
    </button>
  );
}

function Loading() {
  return (
    <div className="flex min-h-[180px] items-center justify-center">
      <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/25">
        Loading comments…
      </p>
    </div>
  );
}

function ErrorFallback({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex min-h-[180px] flex-col items-center justify-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.01] px-6 py-10 text-center">
      <p className="text-sm text-white/50">
        Comments are temporarily unavailable.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 rounded-lg border border-white/[0.10] px-4 py-2 text-xs font-medium text-white/50 hover:text-white/80 hover:border-white/[0.2] transition-all duration-200 min-h-[44px]"
      >
        <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
        Try again
      </button>
    </div>
  );
}
