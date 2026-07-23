"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ease, NORMAL } from "@/lib/motion";
import { SidebarItem } from "./SidebarItem";
import type { NavigationSection } from "@/data/navigation/types";

export function SidebarSection({
  section,
  basePath,
  onClose,
}: {
  section: NavigationSection;
  basePath: string;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const hasActiveChild = section.items.some(
    (item) => pathname === (item.href ?? `${basePath}/${item.slug}`)
  );
  const [expanded, setExpanded] = useState(hasActiveChild);

  useEffect(() => {
    if (hasActiveChild) {
      const id = requestAnimationFrame(() => {
        setExpanded(true);
      });
      return () => cancelAnimationFrame(id);
    }
  }, [hasActiveChild]);

  return (
    <div className="mb-1">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 w-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/30 hover:text-white/50 transition-colors duration-200 rounded-lg"
        aria-expanded={expanded}
      >
        <ChevronRight
          className={cn(
            "h-3 w-3 transition-transform duration-200",
            expanded && "rotate-90"
          )}
        />
        {section.title}
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: NORMAL, ease: ease.out }}
            className="overflow-hidden"
          >
            <div className="ml-3 border-l border-white/[0.06] pl-3 space-y-0.5">
              {section.items.map((item) => {
                const href = item.href ?? `${basePath}/${item.slug}`;
                return (
                  <SidebarItem
                    key={item.slug}
                    item={item}
                    href={href}
                    isActive={pathname === href}
                    onClose={onClose}
                  />
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
