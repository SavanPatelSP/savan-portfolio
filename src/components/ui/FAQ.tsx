"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { FAST, ease, spring } from "@/lib/motion";
import { FadeIn } from "@/components/ui/AnimationPrimitives";

interface FAQItem {
  question: string;
  answer: string;
}

function FAQAccordion({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="border-b border-white/[0.04]"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: FAST, delay: index * 0.05, ease: ease.out }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 sm:py-6 text-left group"
        aria-expanded={open}
      >
        <span className="text-sm sm:text-base text-white/60 group-hover:text-white/80 transition-colors duration-200 pr-4">
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={spring.gentle}
          className="shrink-0"
        >
          <ChevronDown className="h-4 w-4 text-white/25" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: ease.out }}
            className="overflow-hidden"
          >
            <p className="pb-5 sm:pb-6 text-sm text-white/30 leading-relaxed">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ({
  title = "Frequently Asked Questions",
  items,
  className,
}: {
  title?: string;
  items: FAQItem[];
  className?: string;
}) {
  return (
    <FadeIn className={cn("py-20 sm:py-28", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white/80 tracking-tight text-center mb-10">
            {title}
          </h2>
          <div>
            {items.map((item, i) => (
              <FAQAccordion key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
