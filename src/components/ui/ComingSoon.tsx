"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowLeft, Check, Rocket } from "lucide-react";
import Link from "next/link";
import { SLOW, NORMAL, ease, spring } from "@/lib/motion";

interface ComingSoonProps {
  title: string;
  titleAccent?: string;
  description: string;
  badge?: string;
  features?: string[];
}

export function ComingSoon({
  title,
  titleAccent,
  description,
  badge = "Coming Soon",
  features,
}: ComingSoonProps) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-32 sm:pt-40 pb-20">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center top, rgba(59,130,246,0.06) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: NORMAL, ease: ease.out }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2 text-xs font-mono text-white/40">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400/60 animate-pulse" />
            {badge}
          </span>
        </motion.div>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: SLOW, delay: 0.1, ease: ease.out }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-white/[0.06]" />
            <Sparkles className="h-5 w-5 text-white/20" />
            <div className="h-px w-12 bg-white/[0.06]" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[0.92]">
            {title}
            {titleAccent && (
              <>
                <br />
                <span className="text-white/40">{titleAccent}</span>
              </>
            )}
          </h1>
        </motion.div>

        <motion.p
          className="mx-auto max-w-lg text-base sm:text-lg text-white/30 leading-relaxed mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: NORMAL, delay: 0.2, ease: ease.out }}
        >
          {description}
        </motion.p>

        {features && features.length > 0 && (
          <motion.div
            className="mx-auto max-w-2xl mb-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: NORMAL, delay: 0.3, ease: ease.out }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feature, i) => (
                <motion.div
                  key={feature}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.04] bg-white/[0.01] p-4 text-left"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: NORMAL, delay: 0.35 + i * 0.05, ease: ease.out }}
                >
                  <Check className="h-4 w-4 text-white/20 shrink-0" />
                  <span className="text-sm text-white/35">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          className="flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: NORMAL, delay: 0.4, ease: ease.out }}
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90 transition-colors duration-200"
          >
            <Rocket className="h-4 w-4" />
            Get Notified
          </Link>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.08] px-6 py-3 text-sm font-medium text-white/40 hover:text-white/60 hover:border-white/15 transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
            Back to Home
          </Link>
        </motion.div>
      </div>

      <div
        className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
