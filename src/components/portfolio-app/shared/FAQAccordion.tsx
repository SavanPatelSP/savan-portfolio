"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ease, NORMAL, FAST } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface FAQItem {
  q: string;
  a: string;
}

function FAQEntry({
  faq,
  index,
}: {
  faq: FAQItem;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="border-b border-white/[0.04] last:border-b-0"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03, duration: FAST, ease: ease.out }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left min-h-[48px] group"
        aria-expanded={open}
      >
        <span className="text-sm text-white/50 font-medium pr-4 group-hover:text-white/70 transition-colors">
          {faq.q}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-white/20 shrink-0 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: NORMAL, ease: ease.out }}
            className="overflow-hidden"
          >
            <p className="text-[13px] text-white/30 leading-relaxed pb-4">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQAccordion({
  faqs,
  className,
}: {
  faqs: FAQItem[];
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-white/[0.04] bg-white/[0.01] px-6 ${
        className ?? ""
      }`}
    >
      {faqs.map((faq, i) => (
        <FAQEntry key={faq.q} faq={faq} index={i} />
      ))}
    </div>
  );
}
