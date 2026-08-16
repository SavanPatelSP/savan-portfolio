"use client";

import { Heart } from "lucide-react";
import { useIsSaved, useToggleSaved } from "@/lib/saved";
import { cn } from "@/lib/utils";

export function SaveForLaterButton({
  slug,
  className,
  variant = "ghost",
}: {
  slug: string;
  className?: string;
  variant?: "ghost" | "card";
}) {
  const isSaved = useIsSaved(slug);
  const toggle = useToggleSaved();

  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-pressed={isSaved}
      aria-label={isSaved ? "Remove from reading list" : "Save for later"}
      title={isSaved ? "Saved — click to remove" : "Save for later"}
      className={cn(
        "inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider transition-colors duration-200 min-h-[40px] lg:min-h-[36px] rounded-lg",
        variant === "card"
          ? "bg-black/40 px-2.5 border border-white/[0.08] hover:border-white/[0.18] text-white/40 hover:text-white/75"
          : "px-2.5 text-white/35 hover:text-white/75",
        isSaved && "text-rose-300/90",
        className
      )}
    >
      <Heart
        className={cn("h-3.5 w-3.5", isSaved && "fill-rose-400/80 text-rose-300")}
        aria-hidden="true"
      />
      {isSaved ? "Saved" : "Save"}
    </button>
  );
}
