"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Download,
  Package,
  Clock,
  Shield,
  ArrowRight,
} from "lucide-react";
import { ease, spring, NORMAL, SLOW, FAST } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductCard } from "@/components/downloads/ProductCard";
import {
  downloadProducts,
  futureDownloadProducts,
  downloadCategories,
} from "@/data/downloads";

export default function ClientPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts = useMemo(() => {
    let items = downloadProducts;
    if (search) {
      const term = search.toLowerCase();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.tagline.toLowerCase().includes(term)
      );
    }
    if (activeCategory === "available") {
      items = items.filter((p) => p.status === "available");
    }
    return items;
  }, [search, activeCategory]);

  const filteredFuture = useMemo(() => {
    if (activeCategory === "available") return [];
    if (search) {
      const term = search.toLowerCase();
      return futureDownloadProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.tagline.toLowerCase().includes(term)
      );
    }
    return futureDownloadProducts;
  }, [search, activeCategory]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 sm:pt-32 pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Install" }]}
          className="mb-8 sm:mb-12"
        />

        {/* Hero */}
        <motion.div
          className="text-center mb-16 sm:mb-24"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: SLOW, ease: ease.out }}
        >
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-1.5 text-[11px] font-mono text-white/30 mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: NORMAL, delay: 0.1, ease: ease.out }}
          >
            <Download className="h-3 w-3 text-blue-400/60" />
            SP NET Install
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white leading-[0.92] mb-6">
            Software
            <br />
            <span className="text-white/40">Installation</span>
          </h1>

          <p className="mx-auto max-w-lg text-base text-white/30 leading-relaxed">
            Install SP NET INC software products directly from your browser.
            Fast, verified, and free.
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: NORMAL, ease: ease.out }}
        >
          {[
            { icon: Package, label: "Products", value: "1" },
            { icon: Download, label: "Available", value: "1" },
            { icon: Clock, label: "Updated", value: "2026" },
            { icon: Shield, label: "Verified", value: "100%" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 rounded-xl border border-white/[0.04] bg-white/[0.01] px-4 py-3"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.04]">
                <stat.icon className="h-3.5 w-3.5 text-white/25" />
              </div>
              <div>
                <p className="text-sm font-medium text-white/60 font-mono">{stat.value}</p>
                <p className="text-[10px] text-white/15">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: NORMAL, ease: ease.out }}
        >
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
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
          </div>

          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            {downloadCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "relative shrink-0 px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200",
                  activeCategory === cat.id
                    ? "text-white/60 bg-white/[0.06]"
                    : "text-white/25 hover:text-white/40 hover:bg-white/[0.02]"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Latest Products */}
        <section className="mb-16 sm:mb-24">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15">
                Latest
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 mt-2 tracking-tight">
                Available Products
              </h2>
            </div>
            <span className="text-[11px] font-mono text-white/15">
              {filteredProducts.length} product{filteredProducts.length !== 1 && "s"}
            </span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-sm text-white/25">No products match your search.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("all");
                }}
                className="mt-2 text-xs text-white/40 hover:text-white/60 transition-colors duration-200"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        {/* Coming Soon */}
        {filteredFuture.length > 0 && (
          <section className="mb-16 sm:mb-24">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15">
                  Roadmap
                </span>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 mt-2 tracking-tight">
                  Coming Soon
                </h2>
              </div>
              <span className="text-[11px] font-mono text-white/15">
                {filteredFuture.length} upcoming
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFuture.map((product, i) => (
                <motion.div
                  key={product.id}
                  className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 sm:p-6 opacity-60"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 0.6, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.06,
                    duration: NORMAL,
                    ease: ease.out,
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br border border-white/[0.06] opacity-50",
                        product.gradient
                      )}
                    >
                      <Package className="h-4 w-4 text-white/60" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-2 py-0.5 text-[9px] font-mono text-white/20 uppercase tracking-wider">
                      <span className="h-1 w-1 rounded-full bg-white/15" />
                      {product.status}
                    </span>
                  </div>

                  <h3 className="text-base font-medium text-white/50 mb-1.5">
                    {product.name}
                  </h3>
                  <p className="text-xs text-white/20 leading-relaxed mb-4">
                    {product.tagline}
                  </p>

                  <div className="pt-3 border-t border-white/[0.04]">
                    <span className="text-[10px] font-mono text-white/15">{product.eta}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: SLOW, ease: ease.out }}
        >
          <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 tracking-tight mb-4">
              All SP NET Software
            </h2>
            <p className="text-sm text-white/30 mb-8 max-w-md mx-auto">
              One platform. Every product. The official distribution center
              for all SP NET INC software.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="/downloads/portfolio-app"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-medium text-black hover:bg-white/90 transition-all duration-200 min-h-[48px]"
              >
                Portfolio App
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/portfolio-app"
                className="inline-flex items-center gap-2 rounded-xl border border-white/[0.06] px-6 py-3.5 text-sm text-white/40 hover:text-white/60 hover:border-white/[0.1] transition-all duration-200 min-h-[48px]"
              >
                Documentation
              </a>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
