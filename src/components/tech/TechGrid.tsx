"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { SectionContainer, FadeIn, SectionTitle } from "@/components/ui/AnimationPrimitives";
import { expertiseCategories } from "@/data/technologies";

export function TechGridSection() {
  const [active, setActive] = useState(0);
  const [prevActive, setPrevActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const category = expertiseCategories[active];

  const handleTab = (i: number) => {
    setPrevActive(active);
    setActive(i);
  };

  return (
    <SectionContainer id="technologies" className="bg-black relative">
      <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.01] to-transparent" aria-hidden="true" />

      <SectionTitle
        label="Expertise"
        title="What I work with"
        subtitle="A comprehensive view of the skills and disciplines I bring to every product."
      />

      <div className="flex flex-wrap gap-2 mb-8 sm:mb-10 justify-center lg:justify-start">
        {expertiseCategories.map((cat, i) => (
          <button
            key={cat.name}
            onClick={() => handleTab(i)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              active === i
                ? "bg-white text-black"
                : "bg-white/[0.03] text-white/30 hover:text-white/60 hover:bg-white/[0.06]"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div ref={ref} key={category.name}>
        <FadeIn delay={0.1}>
          <p className="text-sm text-white/25 mb-6 sm:mb-8 max-w-xl text-center lg:text-left">
            {category.description}
          </p>
        </FadeIn>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {category.skills.map((skill, i) => (
            <motion.div
              key={skill}
              className="group relative rounded-xl border border-white/[0.04] bg-white/[0.02] p-5 overflow-hidden"
              initial={{ opacity: 0, y: 12, rotateX: 3 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: i * 0.04, duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ perspective: 600 }}
              layout
            >
              <div className="relative z-[1]">
                <div className="text-sm font-medium text-white/70 group-hover:text-white/90 transition-colors">
                  {skill}
                </div>
              </div>
              <div
                className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
