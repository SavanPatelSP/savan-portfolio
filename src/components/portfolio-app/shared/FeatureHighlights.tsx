"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ease, NORMAL } from "@/lib/motion";

interface Feature {
  label: string;
  icon: LucideIcon;
}

export function FeatureHighlights({
  features,
  className,
}: {
  features: Feature[];
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-4 gap-4 ${className ?? ""}`}
    >
      {features.map((feature, i) => (
        <motion.div
          key={feature.label}
          className="flex items-center gap-2.5 text-[12px] text-white/30"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.1 + i * 0.05,
            duration: NORMAL,
            ease: ease.out,
          }}
        >
          <feature.icon className="h-3.5 w-3.5 text-white/15 shrink-0" />
          {feature.label}
        </motion.div>
      ))}
    </div>
  );
}
