"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SLOW, NORMAL, ease, spring } from "@/lib/motion";
import { FadeIn } from "@/components/ui/AnimationPrimitives";

function CTALink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const isInternal = href.startsWith("/") && !href.startsWith("//");
  if (isInternal) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

export function CTASection({
  title,
  titleAccent,
  description,
  primaryAction,
  secondaryAction,
  className,
}: {
  title: string;
  titleAccent?: string;
  description: string;
  primaryAction: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative py-20 sm:py-28 overflow-hidden",
        className
      )}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(59,130,246,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-[0.92]">
            {title}
            {titleAccent && (
              <>
                <br />
                <span className="text-white/40">{titleAccent}</span>
              </>
            )}
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mt-5 mx-auto max-w-lg text-base text-white/30 leading-relaxed">
            {description}
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <CTALink
              href={primaryAction.href}
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90 transition-all duration-200 hover:shadow-[0_4px_20px_-4px_rgba(255,255,255,0.15)] hover:-translate-y-0.5 active:scale-[0.98]"
            >
              {primaryAction.label}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </CTALink>
            {secondaryAction && (
              <CTALink
                href={secondaryAction.href}
                className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.10] px-6 py-3 text-sm font-medium text-white/50 hover:text-white/70 hover:border-white/[0.18] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
              >
                {secondaryAction.label}
              </CTALink>
            )}
          </div>
        </FadeIn>
      </div>

      <div
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
