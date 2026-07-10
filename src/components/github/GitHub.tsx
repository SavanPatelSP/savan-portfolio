"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionContainer, FadeIn, SectionTitle } from "@/components/ui/AnimationPrimitives";
import { GithubIcon } from "@/components/ui/Icons";
import { personal } from "@/data/personal";

const journeyItems = [
  {
    title: "Private Development",
    description: "Core SP NET products are being built in private repositories. This ensures quality, security, and coherence before public release.",
    status: "Current",
  },
  {
    title: "Public Contributions",
    description: "Contributing to open source ecosystems including Next.js, React, TypeScript, and the broader JavaScript community.",
    status: "Ongoing",
  },
  {
    title: "Future Open Source",
    description: "Planning to open-source core infrastructure components from the SP NET ecosystem to give back to the developer community.",
    status: "Coming Soon",
  },
];

export function GitHubSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <SectionContainer id="github" className="bg-black relative">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.01] to-transparent" aria-hidden="true" />

      <SectionTitle
        label="Open Source"
        title="Open source journey"
        subtitle="Building in public when it matters. Sharing what we can, when we can."
      />

      <div ref={ref} className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {journeyItems.map((item, i) => (
          <motion.div
            key={item.title}
            className="group rounded-xl border border-white/[0.04] bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.03]"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex items-center gap-3 mb-3">
              <GithubIcon className="h-4 w-4 text-white/30" />
              <span className="text-[11px] font-medium uppercase tracking-wider text-white/15">{item.status}</span>
            </div>
            <h3 className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-white/25 leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>

      <FadeIn delay={0.3}>
        <div className="mt-8 text-center">
          <a
            href={personal.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-white/50 hover:text-white hover:border-white/20 transition-all duration-300"
          >
            <GithubIcon className="h-4 w-4" />
            Follow on GitHub
          </a>
        </div>
      </FadeIn>
    </SectionContainer>
  );
}
