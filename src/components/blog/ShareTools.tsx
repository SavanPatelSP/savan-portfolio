"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Check, Link2 } from "lucide-react";
import { XIcon, LinkedinIcon, TelegramIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

function subscribe(callback: () => void) {
  window.addEventListener("popstate", callback);
  window.addEventListener("hashchange", callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener("hashchange", callback);
  };
}

function getSnapshot() {
  return window.location.href;
}

function getServerSnapshot() {
  return "";
}

function useShareUrl() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function ShareTools({ title, className }: { title: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const url = useShareUrl();

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      /* clipboard unavailable — silently ignore */
    }
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      icon: XIcon,
      hover: "hover:text-white hover:border-white/[0.18]",
    },
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      icon: LinkedinIcon,
      hover: "hover:text-blue-300 hover:border-blue-400/30",
    },
    {
      label: "Share on Telegram",
      href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      icon: TelegramIcon,
      hover: "hover:text-cyan-300 hover:border-cyan-400/30",
    },
  ];

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)} role="group" aria-label="Share this article">
      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          "inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-xs font-medium transition-all duration-200",
          copied
            ? "text-emerald-300 border-emerald-400/30 bg-emerald-400/[0.06]"
            : "text-white/45 hover:text-white/75 hover:border-white/[0.16] hover:bg-white/[0.04]"
        )}
        aria-label="Copy link to this article"
        aria-live="polite"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
            Link copied
          </>
        ) : (
          <>
            <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
            Copy link
          </>
        )}
      </button>

      {shareLinks.map(({ label, href, icon: Icon, hover }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] text-white/40 transition-all duration-200",
            hover
          )}
          aria-label={label}
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}
