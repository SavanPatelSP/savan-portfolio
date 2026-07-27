"use client";

import { motion } from "framer-motion";
import { ease, SLOW } from "@/lib/motion";

export function SectionHeader({
  label,
  title,
  description,
  className,
}: {
  label: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <motion.div
      className={`mb-8 ${className ?? ""}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: SLOW, ease: ease.out }}
    >
      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15">
        {label}
      </span>
      <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 mt-2 tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="text-sm text-white/25 mt-2 max-w-lg">{description}</p>
      )}
    </motion.div>
  );
}
