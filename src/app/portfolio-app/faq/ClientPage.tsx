"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, ArrowRight } from "lucide-react";
import { ease, NORMAL, SLOW, FAST } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { faqs, type FAQ } from "@/data/portfolio-app";
import { AppShell } from "@/components/navigation";
import { portfolioNavigation } from "@/data/navigation/portfolio-navigation";

const categories = ["All", "General", "Installation", "Features", "Privacy", "Troubleshooting"] as const;

function getCategoryCount(cat: string) {
  if (cat === "All") return faqs.length;
  return faqs.filter((f) => f.category === cat).length;
}

function groupByCategory(items: FAQ[]) {
  const order = ["General", "Installation", "Features", "Privacy", "Troubleshooting"] as const;
  const groups: Record<string, FAQ[]> = {};
  for (const item of items) {
    if (!groups[item.category]) groups[item.category] = [];
    groups[item.category].push(item);
  }
  return order.filter((c) => groups[c]?.length).map((c) => ({ category: c, items: groups[c] }));
}

function FAQItem({ faq, isOpen, onToggle }: { faq: FAQ; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-white/[0.04]">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-4 min-h-[48px] text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors duration-200">
          {faq.question}
        </span>
        <motion.span
          className="shrink-0 text-white/25"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: FAST, ease: ease.out }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: NORMAL, ease: ease.out }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-[13px] text-white/30 leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ClientPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim();
    let items = faqs;
    if (term) {
      items = items.filter((f) => f.question.toLowerCase().includes(term));
    }
    if (activeCategory !== "All") {
      items = items.filter((f) => f.category === activeCategory);
    }
    return items;
  }, [search, activeCategory]);

  const groups = useMemo(() => groupByCategory(filtered), [filtered]);

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <AppShell
      navigation={portfolioNavigation}
      basePath="/portfolio-app"
    >
    <div className="min-h-screen bg-[#0a0a0a] pt-24 sm:pt-32 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* Hero */}
        <motion.div
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: SLOW, ease: ease.out }}
        >
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white leading-[0.92] mb-5">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto max-w-lg text-base text-white/30 leading-relaxed">
            Everything you need to know about the Portfolio App.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          className="relative mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: NORMAL, delay: 0.1, ease: ease.out }}
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions..."
            className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] pl-11 pr-10 py-3 text-sm text-white/60 placeholder:text-white/20 focus:outline-none focus:border-white/[0.15] transition-colors duration-200"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/40 transition-colors duration-200"
            >
              <span className="text-xs font-mono">ESC</span>
            </button>
          )}
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="flex items-center gap-1 overflow-x-auto scrollbar-none mb-8 border-b border-white/[0.04] -mx-1 px-1"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: NORMAL, delay: 0.15, ease: ease.out }}
        >
          {categories.map((cat) => {
            const count = getCategoryCount(cat);
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "relative shrink-0 px-4 py-3 text-xs font-medium whitespace-nowrap transition-colors duration-200",
                  isActive ? "text-white/60" : "text-white/25 hover:text-white/40"
                )}
              >
                <span className="flex items-center gap-1.5">
                  {cat}
                  <span className="text-[10px] font-mono text-white/15">{count}</span>
                </span>
                {isActive && (
                  <motion.span
                    layoutId="category-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20"
                    transition={{ duration: FAST, ease: ease.out }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Result Count */}
        <motion.div
          className="mb-6 text-[11px] font-mono text-white/15"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: FAST, delay: 0.2 }}
        >
          Showing {filtered.length} of {faqs.length} questions
        </motion.div>

        {/* FAQ Groups */}
        {filtered.length === 0 ? (
          <motion.div
            className="py-20 text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: NORMAL, ease: ease.out }}
          >
            <p className="text-sm text-white/25 mb-2">No questions match your search.</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("All"); }}
              className="text-xs text-white/40 hover:text-white/60 transition-colors duration-200"
            >
              Clear filters
            </button>
          </motion.div>
        ) : (
          <div>
            {groups.map((group, gi) => (
              <div key={group.category} className={cn("mb-8", gi < groups.length - 1 && "border-b border-white/[0.03] pb-2")}>
                <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-white/15 mb-3">
                  {group.category}
                </span>
                {group.items.map((faq) => (
                  <FAQItem
                    key={faq.id}
                    faq={faq}
                    isOpen={openIds.has(faq.id)}
                    onToggle={() => toggle(faq.id)}
                  />
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Still have questions? */}
        <motion.div
          className="mt-20 sm:mt-24 rounded-xl border border-white/[0.04] bg-white/[0.01] p-8 sm:p-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: SLOW, ease: ease.out }}
        >
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/15 mb-3">
            Still have questions?
          </p>
          <h2 className="text-xl sm:text-2xl font-semibold text-white/70 tracking-tight mb-3">
            Can&apos;t find what you&apos;re looking for?
          </h2>
          <p className="text-sm text-white/30 leading-relaxed max-w-md mx-auto mb-8">
            Reach out through our contact page or get in touch with our support team for personalized help.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90 transition-all duration-200 min-h-[48px]"
            >
              Contact
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/company/support"
              className="inline-flex items-center gap-2 rounded-xl border border-white/[0.06] px-6 py-3 text-sm text-white/40 hover:text-white/60 hover:border-white/[0.1] transition-all duration-200 min-h-[48px]"
            >
              Support
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          className="mt-16 sm:mt-20 flex items-center justify-between"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: NORMAL, ease: ease.out }}
        >
          <Link
            href="/portfolio-app/privacy"
            className="group flex items-center gap-2 text-sm text-white/25 hover:text-white/50 transition-colors duration-200"
          >
            <ArrowRight className="h-3.5 w-3.5 rotate-180 group-hover:-translate-x-0.5 transition-transform duration-200" />
            Privacy
          </Link>
          <Link
            href="/portfolio-app"
            className="group flex items-center gap-2 text-sm text-white/25 hover:text-white/50 transition-colors duration-200"
          >
            Portfolio App
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </div>
    </AppShell>
  );
}
