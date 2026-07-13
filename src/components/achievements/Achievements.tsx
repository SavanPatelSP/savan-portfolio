"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionContainer, SectionTitle, ScaleIn } from "@/components/ui/AnimationPrimitives";
import { achievements } from "@/data/achievements";
import { ease, spring, NORMAL } from "@/lib/motion";

export function AchievementsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <SectionContainer id="achievements" className="bg-black relative overflow-hidden">
      <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" aria-hidden="true" />

      <SectionTitle
        label="Milestones"
        title="The journey so far"
        subtitle="Authentic milestones from building SP NET INC."
      />

      <div ref={ref} className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {achievements.map((item, i) => (
          <ScaleIn key={item.label} delay={i * 0.1}>
            <motion.div
              className="group relative rounded-2xl border border-white/[0.04] bg-white/[0.02] p-6 sm:p-8 overflow-hidden"
              whileHover={{ y: -4, scale: 1.015 }}
              transition={spring.heavy}
            >
              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                initial={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)" }}
                whileHover={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.10), 0 16px 50px -12px rgba(0,0,0,0.4), 0 0 30px -15px rgba(59,130,246,0.08)" }}
                transition={{ duration: 0.4 }}
              />
              <div className="relative z-[1]">
                <div className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">{item.metric}</div>
                <div className="mt-2 text-sm font-medium text-white/50">{item.label}</div>
                <p className="mt-2 text-xs text-white/20 leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          </ScaleIn>
        ))}
      </div>
    </SectionContainer>
  );
}
