"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, ChevronsUpDown, X, ArrowUpRight, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { FAST, NORMAL, ease, spring } from "@/lib/motion";
import { FadeIn } from "@/components/ui/AnimationPrimitives";
import type { FAQCategory, FAQItem } from "@/data/faqs";

function FAQAccordionItem({
  item,
  index,
  open,
  onToggle,
  onRelatedClick,
  allItems,
}: {
  item: FAQItem;
  index: number;
  open: boolean;
  onToggle: () => void;
  onRelatedClick: (question: string) => void;
  allItems: FAQItem[];
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  const relatedItems = useMemo(() => {
    if (!item.related || item.related.length === 0) return [];
    return item.related
      .map((q) => allItems.find((i) => i.question === q))
      .filter(Boolean)
      .slice(0, 3);
  }, [item.related, allItems]);

  return (
    <motion.div
      className="border-b border-white/[0.04]"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: FAST, delay: index * 0.03, ease: ease.out }}
    >
      <button
        onClick={onToggle}
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
            <div ref={contentRef} className="pb-5 sm:pb-6 space-y-4">
              <p className="text-sm text-white/30 leading-relaxed">
                {item.answer}
              </p>

              {/* Page links */}
              {item.links && item.links.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {item.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-1.5 text-[11px] text-white/35 hover:text-white/55 hover:bg-white/[0.04] hover:border-white/[0.10] transition-all duration-200"
                    >
                      <Link2 className="h-3 w-3" />
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-50" />
                    </a>
                  ))}
                </div>
              )}

              {/* Related questions */}
              {relatedItems.length > 0 && (
                <div className="pt-2 border-t border-white/[0.03]">
                  <p className="text-[11px] text-white/20 uppercase tracking-wider mb-2">
                    Related questions
                  </p>
                  <div className="space-y-1">
                    {relatedItems.map((related) => (
                      <button
                        key={related!.question}
                        onClick={() => onRelatedClick(related!.question)}
                        className="block w-full text-left text-xs text-blue-400/40 hover:text-blue-400/60 transition-colors duration-200 py-0.5"
                      >
                        {related!.question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQPage({
  categories,
  items,
  className,
}: {
  categories: FAQCategory[];
  items: FAQItem[];
  className?: string;
}) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [allOpen, setAllOpen] = useState(false);
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredItems = useMemo(() => {
    let result = items;

    if (activeCategory !== "all") {
      result = result.filter((item) => item.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.question.toLowerCase().includes(query) ||
          item.answer.toLowerCase().includes(query)
      );
    }

    return result;
  }, [items, activeCategory, searchQuery]);

  const effectiveOpenItems = useMemo(() => {
    if (allOpen) {
      return new Set(filteredItems.map((_, i) => i));
    }
    return openItems;
  }, [allOpen, filteredItems, openItems]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: items.length };
    for (const item of items) {
      counts[item.category] = (counts[item.category] || 0) + 1;
    }
    return counts;
  }, [items]);

  const toggleItem = useCallback(
    (index: number) => {
      setOpenItems((prev) => {
        const next = new Set(prev);
        if (next.has(index)) {
          next.delete(index);
        } else {
          next.add(index);
        }
        return next;
      });
    },
    []
  );

  const toggleAll = useCallback(() => {
    if (allOpen) {
      setOpenItems(new Set());
      setAllOpen(false);
    } else {
      const allIndices = new Set(filteredItems.map((_, i) => i));
      setOpenItems(allIndices);
      setAllOpen(true);
    }
  }, [allOpen, filteredItems]);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    inputRef.current?.focus();
  }, []);

  const handleRelatedClick = useCallback(
    (question: string) => {
      // Find the question in the full items list
      const globalIndex = items.findIndex((i) => i.question === question);
      if (globalIndex === -1) return;

      // Reset filters to show all
      setActiveCategory("all");
      setSearchQuery("");
      setAllOpen(false);

      // Open the related item
      setOpenItems(new Set([globalIndex]));

      // Scroll to top of FAQ list after a short delay
      setTimeout(() => {
        inputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    },
    [items]
  );

  return (
    <div className={cn("w-full", className)}>
      {/* Category Navigation */}
      <FadeIn delay={0.1}>
        <div className="mb-8">
          <div className="flex overflow-x-auto gap-2 justify-start lg:justify-start pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-none">
            <button
              onClick={() => {
                setActiveCategory("all");
                setAllOpen(false);
                setOpenItems(new Set());
              }}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-medium transition-all duration-200 shrink-0",
                activeCategory === "all"
                  ? "bg-white/[0.08] text-white/80 border border-white/[0.12]"
                  : "bg-white/[0.02] text-white/35 border border-white/[0.04] hover:bg-white/[0.04] hover:text-white/50 hover:border-white/[0.08]"
              )}
            >
              All
              <span className="text-[10px] font-mono text-white/20">
                {categoryCounts.all}
              </span>
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setAllOpen(false);
                  setOpenItems(new Set());
                }}
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-medium transition-all duration-200 shrink-0",
                  activeCategory === cat.id
                    ? "bg-white/[0.08] text-white/80 border border-white/[0.12]"
                    : "bg-white/[0.02] text-white/35 border border-white/[0.04] hover:bg-white/[0.04] hover:text-white/50 hover:border-white/[0.08]"
                )}
              >
                {cat.icon}
                {cat.label}
                {categoryCounts[cat.id] && (
                  <span className="text-[10px] font-mono text-white/20">
                    {categoryCounts[cat.id]}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Search + Controls */}
      <FadeIn delay={0.15}>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search questions..."
              aria-label="Search frequently asked questions"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-white/[0.06] bg-white/[0.02] pl-10 pr-10 py-3 text-sm text-white/60 placeholder:text-white/20 focus:outline-none focus:border-white/[0.12] focus:bg-white/[0.03] transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/40 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            onClick={toggleAll}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-xs font-medium text-white/35 hover:text-white/50 hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-200 shrink-0"
          >
            <ChevronsUpDown className="h-3.5 w-3.5" />
            {allOpen ? "Collapse All" : "Expand All"}
          </button>
        </div>
      </FadeIn>

      {/* Results count */}
      <FadeIn delay={0.2}>
        <div className="mb-6">
          <p className="text-xs text-white/20">
            {filteredItems.length}{" "}
            {filteredItems.length === 1 ? "question" : "questions"}
            {activeCategory !== "all" && (
              <>
                {" "}
                in{" "}
                <span className="text-white/30">
                  {categories.find((c) => c.id === activeCategory)?.label}
                </span>
              </>
            )}
            {searchQuery && (
              <>
                {" "}
                matching{" "}
                <span className="text-white/30">&ldquo;{searchQuery}&rdquo;</span>
              </>
            )}
          </p>
        </div>
      </FadeIn>

      {/* FAQ Items */}
      <div className="min-h-[200px]">
        <AnimatePresence mode="wait">
          {filteredItems.length > 0 ? (
            <motion.div
              key={`${activeCategory}-${searchQuery}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: NORMAL, ease: ease.out }}
            >
              {filteredItems.map((item, i) => (
                <FAQAccordionItem
                  key={`${item.question}-${i}`}
                  item={item}
                  index={i}
                  open={effectiveOpenItems.has(i)}
                  onToggle={() => toggleItem(i)}
                  onRelatedClick={handleRelatedClick}
                  allItems={items}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: NORMAL, ease: ease.out }}
              className="text-center py-16"
            >
              <Search className="h-8 w-8 text-white/10 mx-auto mb-4" />
              <p className="text-sm text-white/30 mb-2">
                No questions found matching your search.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="text-xs text-white/40 hover:text-white/60 transition-colors underline underline-offset-2"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
