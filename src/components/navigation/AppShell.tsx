"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ease } from "@/lib/motion";
import { Sidebar } from "./Sidebar";
import type { NavigationConfig, NavigationItem, NavigationSection } from "@/data/navigation/types";

function findCurrentItem(
  sections: NavigationSection[],
  pathname: string,
  basePath: string
): { item: NavigationItem; section: NavigationSection } | null {
  for (const section of sections) {
    for (const item of section.items) {
      const itemPath = item.href ?? `${basePath}/${item.slug}`;
      if (pathname === itemPath) {
        return { item, section };
      }
    }
  }
  return null;
}

function flattenItems(sections: NavigationSection[]): NavigationItem[] {
  return sections.flatMap((s) => s.items);
}

function getAdjacentItems(
  sections: NavigationSection[],
  pathname: string,
  basePath: string
): { prev: NavigationItem | null; next: NavigationItem | null } {
  const allItems = flattenItems(sections);
  const idx = allItems.findIndex(
    (i) => pathname === (i.href ?? `${basePath}/${i.slug}`)
  );
  return {
    prev: idx > 0 ? allItems[idx - 1] : null,
    next: idx < allItems.length - 1 ? allItems[idx + 1] : null,
  };
}

export function AppShell({
  navigation,
  basePath,
  breadcrumbs,
  title,
  description,
  rightSidebar,
  children,
}: {
  navigation: NavigationConfig;
  basePath: string;
  breadcrumbs?: { label: string; href?: string }[];
  title?: string;
  description?: string;
  rightSidebar?: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  // Focus trap for mobile drawer
  useEffect(() => {
    if (!sidebarOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement;

    const drawer = drawerRef.current;
    if (!drawer) return;

    const focusableElements = drawer.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    firstFocusable?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeSidebar();
        return;
      }
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      previousFocusRef.current?.focus();
    };
  }, [sidebarOpen, closeSidebar]);

  // Close drawer on route change
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setSidebarOpen(false);
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  // Auto-compute breadcrumbs from navigation data if not provided
  const computedBreadcrumbs = (() => {
    if (breadcrumbs) return breadcrumbs;

    const current = findCurrentItem(navigation.sections, pathname, basePath);
    const crumbs: { label: string; href?: string }[] = [
      { label: "Home", href: "/" },
    ];

    if (current) {
      crumbs.push({ label: navigation.title, href: basePath });
      if (current.section.title !== navigation.title) {
        crumbs.push({ label: current.section.title });
      }
      crumbs.push({ label: current.item.title });
    } else {
      crumbs.push({ label: navigation.title });
    }

    return crumbs;
  })();

  const { prev, next } = getAdjacentItems(navigation.sections, pathname, basePath);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-20 sm:top-24 max-h-[calc(100vh-7rem)] overflow-y-auto scrollbar-none pb-8">
              <Sidebar navigation={navigation} basePath={basePath} />
            </div>
          </aside>

          {/* Main content */}
          <main className={cn("flex-1 min-w-0 pt-20 sm:pt-24 pb-8 sm:pb-12", rightSidebar ? "max-w-2xl" : "max-w-3xl")}>
            {/* Mobile sidebar toggle */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden flex items-center gap-2 text-[13px] text-white/30 hover:text-white/50 mb-4 transition-colors duration-200"
              aria-label="Open navigation"
            >
              <Menu className="h-4 w-4" />
              Navigation
            </button>

            {/* Breadcrumbs */}
            <nav
              className="flex items-center gap-1.5 text-[12px] text-white/20 mb-5"
              aria-label="Breadcrumb"
            >
              {computedBreadcrumbs.map((crumb, i) => {
                const isLast = i === computedBreadcrumbs.length - 1;
                return (
                  <span key={i} className="flex items-center gap-1.5">
                    {i > 0 && (
                      <ChevronRight className="h-3 w-3 text-white/15" />
                    )}
                    {isLast || !crumb.href ? (
                      <span className={isLast ? "text-white/50" : ""}>
                        {crumb.label}
                      </span>
                    ) : (
                      <Link
                        href={crumb.href}
                        className="hover:text-white/40 transition-colors"
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </span>
                );
              })}
            </nav>

            {/* Title */}
            {title && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: ease.out }}
              >
                <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-tight mb-3">
                  {title}
                </h1>
                {description && (
                  <p className="text-base text-white/30 leading-relaxed mb-10 max-w-2xl">
                    {description}
                  </p>
                )}
              </motion.div>
            )}

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05, ease: ease.out }}
            >
              {children}
            </motion.div>

            {/* Prev/Next navigation */}
            {(prev || next) && (
              <div className="flex items-stretch gap-3 mt-16 pt-8 border-t border-white/[0.06]">
                {prev ? (
                  <Link
                    href={prev.href ?? `${basePath}/${prev.slug}`}
                    className="group flex-1 flex items-center justify-between rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
                  >
                    <div>
                      <span className="block text-[10px] font-mono text-white/15 uppercase tracking-[0.15em] mb-1">
                        Previous
                      </span>
                      <span className="text-sm font-medium text-white/50 group-hover:text-white/70 transition-colors duration-200">
                        {prev.title}
                      </span>
                    </div>
                    <svg
                      className="h-4 w-4 text-white/15 rotate-180 group-hover:-translate-x-0.5 transition-transform duration-200"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </Link>
                ) : (
                  <div className="flex-1" />
                )}
                {next ? (
                  <Link
                    href={next.href ?? `${basePath}/${next.slug}`}
                    className="group flex-1 flex items-center justify-between rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
                  >
                    <div>
                      <span className="block text-[10px] font-mono text-white/15 uppercase tracking-[0.15em] mb-1">
                        Next
                      </span>
                      <span className="text-sm font-medium text-white/50 group-hover:text-white/70 transition-colors duration-200">
                        {next.title}
                      </span>
                    </div>
                    <svg
                      className="h-4 w-4 text-white/15 group-hover:translate-x-0.5 transition-transform duration-200"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </Link>
                ) : (
                  <div className="flex-1" />
                )}
              </div>
            )}
          </main>

          {rightSidebar}
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSidebar}
              aria-hidden="true"
            />
            <motion.div
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label={`${navigation.title} navigation`}
              className="fixed inset-y-0 left-0 z-[130] w-72 bg-[#0a0a0a] border-r border-white/[0.06] p-6 overflow-y-auto lg:hidden"
              initial={{ x: -288 }}
              animate={{ x: 0 }}
              exit={{ x: -288 }}
              transition={{ duration: 0.3, ease: ease.out }}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-medium text-white/60">
                  {navigation.title}
                </span>
                <button
                  onClick={closeSidebar}
                  className="p-1 text-white/30 hover:text-white/60 transition-colors"
                  aria-label="Close navigation"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <Sidebar
                navigation={navigation}
                basePath={basePath}
                onClose={closeSidebar}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
