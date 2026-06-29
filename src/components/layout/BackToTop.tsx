"use client";

import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-5 right-5 z-40 flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 bg-black/40 backdrop-blur-sm text-white/30 hover:text-white/70 hover:border-white/15 transition-all duration-200"
      aria-label="Back to top"
    >
      <ArrowUp className="h-3.5 w-3.5" />
    </button>
  );
}
