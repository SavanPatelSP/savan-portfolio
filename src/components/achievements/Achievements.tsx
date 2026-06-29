"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionContainer, SectionTitle, ScaleIn } from "@/components/ui/AnimationPrimitives";
import { achievements } from "@/data/achievements";

export function AchievementsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <SectionContainer id="achievements" className="bg-black relative">
      <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" aria-hidden="true" />

      <SectionTitle
        label="Milestones"
        title="The journey so far"
        subtitle="Authentic milestones from building SP NET INC."
      />

      <div ref={ref} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {achievements.map((item, i) => (
          <ScaleIn key={item.label} delay={i * 0.1}>
            <div className="group rounded-2xl border border-white/[0.04] bg-white/[0.02] p-6 sm:p-8 hover:border-white/10 hover:bg-white/[0.03] transition-all duration-300">
              <div className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">{item.metric}</div>
              <div className="mt-2 text-sm font-medium text-white/50">{item.label}</div>
              <p className="mt-2 text-xs text-white/20 leading-relaxed">{item.description}</p>
            </div>
          </ScaleIn>
        ))}
      </div>
    </SectionContainer>
  );
}
