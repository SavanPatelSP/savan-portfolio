"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Download, Check, ArrowRight, Sparkles } from "lucide-react";
import { ease, SLOW } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function PortfolioAppCTA({
  onInstall,
  canInstall,
  isInstalled,
  isInstalling,
  variant = "default",
  className,
}: {
  onInstall?: () => void;
  canInstall: boolean;
  isInstalled: boolean;
  isInstalling: boolean;
  variant?: "default" | "compact";
  className?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: SLOW, ease: ease.out }}
      className={className}
    >
      <div className="relative rounded-2xl border border-white/[0.05] bg-white/[0.015] p-8 sm:p-12 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.03] via-transparent to-transparent pointer-events-none" />

        <div className="relative">
          {variant === "default" && (
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/[0.08] border border-blue-500/15 mx-auto mb-6">
              <Sparkles className="h-5 w-5 text-blue-400/60" />
            </div>
          )}

          <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 tracking-tight mb-4">
            {isInstalled ? "You're all set" : "Get Started"}
          </h2>
          <p className="text-sm text-white/30 mb-8 max-w-md mx-auto">
            {isInstalled
              ? "The Portfolio App is installed and ready to use."
              : "Install the Portfolio App today for the best experience. Works offline, updates automatically, and runs in its own window."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {onInstall && (
              <button
                onClick={onInstall}
                disabled={!canInstall || isInstalled || isInstalling}
                className={cn(
                  "group inline-flex min-h-[48px] items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-all duration-200",
                  canInstall && !isInstalled && !isInstalling
                    ? "bg-white text-black hover:bg-white/90 hover:shadow-[0_4px_20px_-4px_rgba(255,255,255,0.15)] hover:-translate-y-0.5 active:scale-[0.98]"
                    : "bg-white/[0.04] text-white/30 cursor-not-allowed border border-white/[0.06]"
                )}
              >
                {isInstalled ? (
                  <>
                    <Check className="h-4 w-4" />
                    Installed
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Install App
                  </>
                )}
              </button>
            )}
            {!onInstall && (
              <Link
                href="/downloads/portfolio-app"
                className="group relative inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-medium text-black hover:bg-white/90 transition-all duration-200 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/[0.08] to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Download className="h-4 w-4 relative z-[1]" />
                <span className="relative z-[1]">Download Now</span>
              </Link>
            )}
            <Link
              href="/portfolio-app"
              className="group inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-white/[0.10] px-6 py-3 text-sm font-medium text-white/50 transition-all duration-200 hover:text-white/70 hover:border-white/[0.18] hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Documentation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
