"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FAST, ease } from "@/lib/motion";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

function Separator() {
  return (
    <span className="mx-1 text-white/15 select-none" aria-hidden="true">
      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5">
        <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function Breadcrumbs({
  items,
  className,
}: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLAnchorElement | HTMLSpanElement>(null);

  // Deduplicate: if first item is already Home, don't prepend
  const isHomeFirst =
    items.length > 0 && items[0].label === "Home" && items[0].href === "/";
  const crumbs = isHomeFirst ? items : [{ label: "Home", href: "/" as const }, ...items];

  // Scroll active crumb into view on mobile
  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const el = activeRef.current;
      const container = scrollRef.current;
      // Scroll so the active item is near the right edge (visible past the fade)
      const scrollLeft = el.offsetLeft - container.offsetWidth + el.offsetWidth + 24;
      container.scrollTo({ left: Math.max(0, scrollLeft), behavior: "instant" });
    }
  }, []);

  return (
    <motion.nav
      aria-label="Breadcrumb"
      className={cn("relative", className)}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: FAST, ease: ease.out }}
    >
      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="flex items-center overflow-x-auto scrollbar-none -mx-1 px-1"
        style={{
          maskImage: "linear-gradient(to right, transparent 0px, black 8px, black calc(100% - 28px), transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0px, black 8px, black calc(100% - 28px), transparent 100%)",
        }}
      >
        <ol className="flex items-center text-xs whitespace-nowrap" role="list">
          {crumbs.map((item, i) => {
            const isLast = i === crumbs.length - 1;

            return (
              <motion.li
                key={`${item.label}-${i}`}
                className="flex items-center"
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: FAST,
                  delay: i * 0.04,
                  ease: ease.out,
                }}
              >
                {i > 0 && <Separator />}

                {isLast ? (
                  <span
                    ref={activeRef}
                    className="text-blue-400/80 font-semibold py-2.5 px-1"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : item.href ? (
                  <Link
                    href={item.href}
                    className="group relative text-white/25 hover:text-white/60 py-2.5 px-1 transition-colors duration-200"
                  >
                    <span className="relative z-[1]">{item.label}</span>
                    <span className="absolute bottom-1.5 left-1 right-1 h-px bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                  </Link>
                ) : (
                  <span className="text-white/25 py-2.5 px-1">{item.label}</span>
                )}
              </motion.li>
            );
          })}
        </ol>
      </div>
    </motion.nav>
  );
}
