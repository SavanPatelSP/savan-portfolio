"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FAST, ease, spring } from "@/lib/motion";
import { FadeIn } from "@/components/ui/AnimationPrimitives";

interface RelatedPage {
  title: string;
  description: string;
  href: string;
  gradient?: string;
}

export function RelatedPages({
  title = "Explore More",
  pages,
  className,
}: {
  title?: string;
  pages: RelatedPage[];
  className?: string;
}) {
  return (
    <FadeIn className={cn("py-20 sm:py-28", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white/80 tracking-tight text-center mb-12">
          {title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pages.map((page, i) => (
            <motion.div
              key={page.href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: FAST, delay: i * 0.06, ease: ease.out }}
            >
              <Link
                href={page.href}
                className="group block rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-white/[0.10] hover:bg-white/[0.03] transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors duration-200">
                    {page.title}
                  </h3>
                  <ArrowUpRight className="h-4 w-4 text-white/20 group-hover:text-white/40 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
                </div>
                <p className="text-xs text-white/35 leading-relaxed">
                  {page.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}
