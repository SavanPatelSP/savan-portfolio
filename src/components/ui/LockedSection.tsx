"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Lock, ArrowRight } from "lucide-react";
import { ease, NORMAL, SLOW } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { SectionContainer } from "@/components/ui/AnimationPrimitives";

interface LockedSectionProps {
  id?: string;
  label?: string;
}

export function LockedSection({ id = "organization", label }: LockedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <SectionContainer id={id} className="border-t border-white/[0.04] bg-black">
      <div ref={ref} className="mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: SLOW, ease: ease.out }}
          className="flex flex-col items-center gap-8"
        >
          {/* Lock icon */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: ease.standard }}
          >
            <Lock className="h-8 w-8 text-white/20" strokeWidth={1.5} />
          </motion.div>

          {/* Label */}
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/15">
            {label || "Organization"}
          </p>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-white/70 sm:text-3xl">
            Reserved for Future Expansion
          </h2>

          {/* Description */}
          <p className="max-w-lg text-sm leading-relaxed text-white/30">
            This section will showcase the organizational structure, engineering
            divisions, public teams, and ecosystem architecture of SP NET INC as
            the company continues to grow.
          </p>

          {/* Status badge */}
          <div className="flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400/40 animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-white/25">
              LOCKED
            </span>
          </div>

          <p className="text-xs text-white/20">Available in a future release.</p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: NORMAL, delay: 0.3, ease: ease.out }}
          >
            <Link
              href="/company/about"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-white/10 px-6 text-sm text-white/50 transition-colors hover:border-white/20 hover:text-white/70"
            >
              Learn About The Vision
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </SectionContainer>
  );
}
