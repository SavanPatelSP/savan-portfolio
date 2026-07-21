"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code, Building2, MessageCircle, Shield, Bot, Rocket, Sparkles } from "lucide-react";
import { SectionContainer, FadeIn, SectionTitle, ParallaxContainer } from "@/components/ui/AnimationPrimitives";
import { Timeline, TimelineItem } from "@/components/timeline";
import { cn } from "@/lib/utils";
import { journey } from "@/data/personal";
import { ease, NORMAL } from "@/lib/motion";

const journeyIcons: Record<string, React.ElementType> = {
  "2018": Code,
  "2022": Building2,
  "2023": MessageCircle,
  "2024": Shield,
  "2025": Bot,
  "2026": Rocket,
};

export function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <ParallaxContainer speed={0.03}>
      <SectionContainer id="journey" className="bg-black relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.01] to-transparent" aria-hidden="true" />

        <SectionTitle
          label="Journey"
          title="The path so far"
          subtitle="From first line of code to building a technology company. Every milestone shaped the founder I am today."
        />

        <div ref={ref} className="relative max-w-4xl mx-auto px-2 sm:px-0">
          <Timeline layout="centered">
            {journey.map((item, i) => (
              <TimelineItem
                key={item.year}
                icon={journeyIcons[item.year] || Sparkles}
                index={i}
                total={journey.length}
                isLast={i === journey.length - 1}
                layout="centered"
                accentColor="#3b82f6"
              >
                <div>
                  <span className="text-[10px] font-mono tracking-wider text-blue-400/40 font-medium">
                    {item.year}
                  </span>
                  <h3 className="mt-1.5 text-base font-medium text-white">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-white/40 leading-relaxed max-w-sm">
                    {item.description}
                  </p>
                </div>
              </TimelineItem>
            ))}
          </Timeline>
        </div>

        {/* Future coda */}
        <FadeIn delay={0.4}>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 text-xs text-white/25">
              <Sparkles className="h-3 w-3" />
              <span>The journey continues. Building tomorrow, today.</span>
            </div>
          </div>
        </FadeIn>
      </SectionContainer>
    </ParallaxContainer>
  );
}
