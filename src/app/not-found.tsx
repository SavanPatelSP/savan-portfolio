"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Home, ArrowLeft, User, Briefcase, Route,
  MessageCircle, Package, BookOpen, FileText,
} from "lucide-react";

const navChips = [
  { label: "Home", href: "/", icon: Home },
  { label: "Products", href: "/products", icon: Package },
  { label: "Founder", href: "/founder/about", icon: User },
  { label: "Expertise", href: "/founder/about#expertise", icon: Briefcase },
  { label: "Roadmap", href: "/roadmap", icon: Route },
  { label: "Contact", href: "/contact", icon: MessageCircle },
  { label: "Resources", href: "/resources", icon: FileText },
  { label: "Docs", href: "/docs", icon: BookOpen },
];

function NotFoundIllustration() {
  return (
    <div className="relative w-52 h-52 sm:w-60 sm:h-60 mx-auto" aria-hidden="true">
      {/* Soft background glow */}
      <div className="absolute inset-0 bg-blue-500/[0.04] rounded-full blur-[80px]" />

      {/* Floating UI panels — disconnected feel */}
      <motion.div
        className="absolute top-6 left-4 w-20 h-14 rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm"
        animate={{ y: [0, -6, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="p-2.5">
          <div className="h-1.5 w-8 rounded-full bg-white/[0.06]" />
          <div className="h-1 w-12 rounded-full bg-white/[0.04] mt-2" />
          <div className="h-1 w-6 rounded-full bg-white/[0.04] mt-1.5" />
        </div>
      </motion.div>

      <motion.div
        className="absolute top-10 right-2 w-18 h-12 rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm"
        animate={{ y: [0, -8, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <div className="p-2.5">
          <div className="flex gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-white/[0.08]" />
            <div className="h-1.5 w-1.5 rounded-full bg-white/[0.05]" />
            <div className="h-1.5 w-1.5 rounded-full bg-white/[0.05]" />
          </div>
          <div className="h-1 w-10 rounded-full bg-white/[0.04] mt-2" />
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-14 left-8 w-16 h-16 rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm"
        animate={{ y: [0, -5, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <div className="p-2.5 flex items-center justify-center h-full">
          <div className="h-4 w-4 rounded border border-white/[0.08] rotate-12" />
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 right-6 w-14 h-10 rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm"
        animate={{ y: [0, -7, 0], rotate: [0, -2, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      >
        <div className="p-2">
          <div className="h-1 w-full rounded-full bg-white/[0.06]" />
          <div className="h-1 w-3/4 rounded-full bg-white/[0.04] mt-1.5" />
        </div>
      </motion.div>

      {/* Center: missing page indicator */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/10 rounded-2xl blur-xl" />
          <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-2xl border border-blue-500/15 bg-gradient-to-br from-blue-500/[0.06] to-blue-500/[0.02] flex items-center justify-center backdrop-blur-sm">
            <span className="text-2xl sm:text-3xl font-bold text-white/20 tracking-tight">?</span>
          </div>
          {/* Disconnected path line */}
          <motion.div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-px h-4 bg-gradient-to-b from-blue-500/20 to-transparent"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Disconnected navigation lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
        <motion.path
          d="M40 50 L80 80"
          stroke="rgba(255,255,255,0.03)"
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <motion.path
          d="M160 50 L120 80"
          stroke="rgba(255,255,255,0.03)"
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
        />
        <motion.path
          d="M40 150 L80 120"
          stroke="rgba(255,255,255,0.03)"
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.6 }}
        />
        <motion.path
          d="M160 150 L120 120"
          stroke="rgba(255,255,255,0.03)"
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.9 }}
        />
        {/* Broken center path */}
        <motion.path
          d="M100 80 L100 95"
          stroke="rgba(59,130,246,0.15)"
          strokeWidth="1"
          strokeDasharray="2 2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 1.2 }}
        />
        <motion.path
          d="M100 105 L100 120"
          stroke="rgba(59,130,246,0.15)"
          strokeWidth="1"
          strokeDasharray="2 2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 1.5 }}
        />
      </svg>
    </div>
  );
}

export default function NotFound() {
  const [canGoBack] = useState(() => {
    if (typeof window !== "undefined") {
      return window.history.length > 1;
    }
    return false;
  });

  const handleGoBack = useCallback(() => {
    if (canGoBack) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  }, [canGoBack]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-black overflow-hidden">
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 60%)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 60%)",
          }}
        />
      </div>

      {/* Center glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-blue-500/[0.03] blur-[120px]" aria-hidden="true" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-lg mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <NotFoundIllustration />
        </motion.div>

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 mb-6 backdrop-blur-sm">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-white/40">404</span>
            <div className="h-3 w-px bg-white/[0.1]" />
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/30">Not Found</span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          tabIndex={-1}
        >
          Page Not Found
        </motion.h1>

        {/* Description */}
        <motion.p
          className="mt-4 text-sm sm:text-base text-white/35 leading-relaxed max-w-sm mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          The page you&apos;re looking for doesn&apos;t exist, may have been moved, or is no longer available.
          You can return to the homepage or continue exploring the site.
        </motion.p>

        {/* Action buttons */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {/* Primary: Go Home */}
          <Link
            href="/"
            className="group relative inline-flex items-center gap-2.5 rounded-xl bg-white/[0.08] border border-white/[0.1] px-7 py-3.5 text-sm font-medium text-white/80 hover:bg-white/[0.12] hover:text-white hover:border-white/[0.15] hover:shadow-[0_0_20px_rgba(59,130,246,0.06)] transition-all duration-300 min-h-[48px]"
          >
            <Home className="h-4 w-4" />
            <span>Go Home</span>
          </Link>

          {/* Secondary: Go Back */}
          <button
            onClick={handleGoBack}
            className="group inline-flex items-center gap-2.5 rounded-xl border border-white/[0.08] px-7 py-3.5 text-sm font-medium text-white/50 hover:text-white/80 hover:border-white/[0.15] hover:bg-white/[0.04] hover:shadow-[0_0_20px_rgba(59,130,246,0.04)] transition-all duration-300 min-h-[48px]"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Go Back</span>
          </button>
        </motion.div>

        {/* Continue Exploring — Navigation Chips */}
        <motion.div
          className="mt-14 sm:mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/20 mb-5">
            Continue Exploring
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {navChips.map((chip, i) => {
              const Icon = chip.icon;
              return (
                <motion.div
                  key={chip.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={chip.href}
                    className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-2.5 text-xs font-medium text-white/40 hover:text-white/70 hover:border-white/[0.12] hover:bg-white/[0.04] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Icon className="h-3.5 w-3.5 text-white/25 group-hover:text-blue-400/50 transition-colors" />
                    <span>{chip.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
