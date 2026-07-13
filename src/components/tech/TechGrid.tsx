"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionContainer, FadeIn, SectionTitle } from "@/components/ui/AnimationPrimitives";
import { expertiseCategories } from "@/data/technologies";
import { ease, spring, FAST, NORMAL } from "@/lib/motion";

export function TechGridSection() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const category = expertiseCategories[active];

  const handleTab = (i: number) => {
    setActive(i);
  };

  return (
    <SectionContainer id="technologies" className="bg-black relative overflow-hidden">
      <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.01] to-transparent" aria-hidden="true" />

      <SectionTitle
        label="Expertise"
        title="What I work with"
        subtitle="A comprehensive view of the skills and disciplines I bring to every product."
      />

      {/* Tab buttons with spring indicator */}
      <div className="relative flex flex-wrap gap-2 mb-8 sm:mb-10 justify-center lg:justify-start">
        {expertiseCategories.map((cat, i) => (
          <button
            key={cat.name}
            onClick={() => handleTab(i)}
            className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
              active === i
                ? "text-black"
                : "text-white/30 hover:text-white/60"
            }`}
          >
            {active === i && (
              <motion.div
                className="absolute inset-0 rounded-lg bg-white"
                layoutId="tech-tab"
                transition={spring.snappy}
              />
            )}
            <span className="relative z-[1]">{cat.name}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={category.name}
          ref={ref}
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
          transition={{ duration: NORMAL, ease: ease.out }}
        >
          <FadeIn delay={0.05}>
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
                transition={{ delay: i * 0.03, duration: FAST, ease: ease.out }}
                style={{ perspective: 600 }}
                whileHover={{ y: -2, scale: 1.01 }}
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
                {/* Hover border glow */}
                <motion.div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  initial={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)" }}
                  whileHover={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.10), 0 4px 20px -8px rgba(59,130,246,0.1)" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </SectionContainer>
  );
}
