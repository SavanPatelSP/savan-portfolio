"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code, Building2, MessageCircle, Shield, Bot, Rocket, Sparkles } from "lucide-react";
import { SectionContainer, FadeIn, SectionTitle, ParallaxContainer } from "@/components/ui/AnimationPrimitives";
import { cn } from "@/lib/utils";
import { journey } from "@/data/personal";
import { ease, spring, SLOW, NORMAL } from "@/lib/motion";

const journeyIcons: Record<string, React.ElementType> = {
  "2018": Code,
  "2022": Building2,
  "2023": MessageCircle,
  "2024": Shield,
  "2025": Bot,
  "2026": Rocket,
};

function TimelineMilestone({ item, index, isInView, total }: { item: typeof journey[number]; index: number; isInView: boolean; total: number }) {
  const Icon = journeyIcons[item.year] || Sparkles;
  const isEven = index % 2 === 0;
  const progress = ((index + 1) / total) * 100;

  return (
    <div className="relative">
      {/* Desktop: alternating layout */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8 items-center">
        <div className={cn(isEven ? "text-right" : "order-2")}>
          <motion.div
            initial={{ opacity: 0, x: isEven ? -20 : 20, filter: "blur(4px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ delay: index * 0.12, duration: NORMAL, ease: ease.out }}
          >
            <span className="text-[10px] font-mono tracking-wider text-blue-400/40 font-medium">
              {item.year}
            </span>
            <h3 className="mt-1.5 text-base font-medium text-white">{item.title}</h3>
            <p className="mt-1.5 text-sm text-white/30 leading-relaxed max-w-sm ml-auto">
              {item.description}
            </p>
          </motion.div>
        </div>

        {/* Center dot + progress fill */}
        <div className={cn("flex justify-center", isEven ? "order-1" : "order-1")}>
          <motion.div
            className="flex flex-col items-center"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: index * 0.12, type: "spring", stiffness: 200, damping: 15 }}
          >
            <div className="h-8 w-8 rounded-full border-2 border-blue-500/30 bg-black flex items-center justify-center relative z-10">
              <Icon className="h-3.5 w-3.5 text-blue-400/60" />
            </div>
          </motion.div>
        </div>

        <div className={cn(isEven ? "order-3" : "")} />
      </div>

      {/* Mobile: left-aligned */}
      <div className="lg:hidden">
        <motion.div
          className="relative pl-10 pb-10"
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: index * 0.1, duration: NORMAL, ease: ease.out }}
        >
          {/* Progressive timeline line fill */}
          {index < total - 1 && (
            <div className="absolute left-[15px] top-3 bottom-0 w-px">
              <div className="absolute inset-0 bg-white/[0.04]" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-blue-500/30 to-blue-500/10 origin-top"
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.8, ease: ease.out }}
              />
            </div>
          )}

          <div className="absolute left-0 top-1">
            <motion.div
              className="h-7 w-7 rounded-full border-2 border-blue-500/30 bg-black flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 200, damping: 15 }}
            >
              <Icon className="h-3 w-3 text-blue-400/60" />
            </motion.div>
          </div>

          <span className="text-[10px] font-mono tracking-wider text-blue-400/40 font-medium">
            {item.year}
          </span>
          <h3 className="mt-1 text-sm font-medium text-white">{item.title}</h3>
          <p className="mt-1 text-xs text-white/30 leading-relaxed">{item.description}</p>
        </motion.div>
      </div>
    </div>
  );
}

export function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <ParallaxContainer speed={0.03}>
      <SectionContainer id="journey" className="bg-black relative">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.01] to-transparent" aria-hidden="true" />

        <SectionTitle
          label="Journey"
          title="The path so far"
          subtitle="From first line of code to building a technology company. Every milestone shaped the founder I am today."
        />

        {/* Desktop timeline line with progressive fill */}
        <div className="hidden lg:block absolute left-1/2 top-32 bottom-0 w-px -translate-x-1/2" aria-hidden="true">
          <div className="absolute inset-0 bg-white/[0.04]" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-blue-500/25 via-blue-500/15 to-blue-500/5 origin-top"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 2, delay: 0.3, ease: ease.out }}
          />
        </div>

        <div ref={ref} className="relative max-w-4xl mx-auto px-2 sm:px-0">
          {journey.map((item, i) => (
            <TimelineMilestone key={item.year} item={item} index={i} isInView={isInView} total={journey.length} />
          ))}
        </div>

        {/* Future coda */}
        <FadeIn delay={0.4}>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 text-xs text-white/15">
              <Sparkles className="h-3 w-3" />
              <span>The journey continues. Building tomorrow, today.</span>
            </div>
          </div>
        </FadeIn>
      </SectionContainer>
    </ParallaxContainer>
  );
}
