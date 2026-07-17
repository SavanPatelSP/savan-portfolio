"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SLOW, NORMAL, ease, spring } from "@/lib/motion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

interface PageHeroProps {
  breadcrumbs: { label: string; href?: string }[];
  label?: string;
  title: string;
  titleAccent?: string;
  description: string;
  icon?: ReactNode;
  badge?: string;
  gradient?: string;
  actions?: ReactNode;
}

export function PageHero({
  breadcrumbs,
  label,
  title,
  titleAccent,
  description,
  icon,
  badge,
  actions,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-32 sm:pt-40 pb-16 sm:pb-24">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center top, rgba(59,130,246,0.06) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} className="mb-4" />

        <div className="max-w-3xl">
          {label && (
            <motion.span
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-white/25 mb-6"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: NORMAL, ease: ease.out }}
            >
              {icon}
              {label}
            </motion.span>
          )}

          {badge && (
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: NORMAL, delay: 0.05, ease: ease.out }}
            >
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 text-[11px] font-mono text-white/30">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400/60 animate-pulse" />
                {badge}
              </span>
            </motion.div>
          )}

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[0.92]"
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: SLOW, delay: 0.1, ease: ease.out }}
          >
            {title}
            {titleAccent && (
              <>
                <br />
                <span className="text-white/40">{titleAccent}</span>
              </>
            )}
          </motion.h1>

          <motion.p
            className="mt-6 max-w-xl text-base sm:text-lg text-white/35 leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: NORMAL, delay: 0.2, ease: ease.out }}
          >
            {description}
          </motion.p>

          {actions && (
            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: NORMAL, delay: 0.3, ease: ease.out }}
            >
              {actions}
            </motion.div>
          )}
        </div>
      </div>

      <div
        className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
