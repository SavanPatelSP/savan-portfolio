"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FAST, ease } from "@/lib/motion";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({
  items,
  className,
}: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  return (
    <motion.nav
      aria-label="Breadcrumb"
      className={cn("flex flex-wrap items-center gap-1.5 text-xs", className)}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: FAST, ease: ease.out }}
    >
      <Link
        href="/"
        className="text-white/25 hover:text-white/50 transition-colors duration-200 py-2 px-1"
      >
        Home
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight className="h-3 w-3 text-white/15" aria-hidden="true" />
          {item.href ? (
            <Link
              href={item.href}
              className="text-white/25 hover:text-white/50 transition-colors duration-200 py-2 px-1"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-white/50 py-2 px-1">{item.label}</span>
          )}
        </span>
      ))}
    </motion.nav>
  );
}
