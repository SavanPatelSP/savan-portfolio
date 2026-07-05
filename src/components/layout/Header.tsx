"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { personal } from "@/data/personal";
import { useActiveSection } from "@/hooks/useActiveSection";

const links = [
  { label: "Products", href: "#products" },
  { label: "Founder", href: "#founder" },
  { label: "Expertise", href: "#technologies" },
  { label: "Organization", href: "#organization" },
  { label: "Journey", href: "#journey" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!open || e.key !== "Tab") return;
    const container = mobileNavRef.current;
    if (!container) return;
    const focusable = container.querySelectorAll<HTMLElement>("a, button");
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        const container = mobileNavRef.current;
        if (!container) return;
        const first = container.querySelector<HTMLElement>("a, button");
        first?.focus();
      });
    } else {
      hamburgerRef.current?.focus();
    }
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-black/70 backdrop-blur-2xl border-b border-white/[0.03]"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <a href="#" className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/30 to-blue-600/20 ring-1 ring-blue-500/25 overflow-hidden">
            <img src="/logo.jpg" alt={personal.company} className="object-cover w-full h-full" />
          </span>
          {personal.name}
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm transition-colors duration-300",
                active === l.href.slice(1)
                  ? "text-white/80"
                  : "text-white/35 hover:text-white/80"
              )}
              aria-current={active === l.href.slice(1) ? "location" : undefined}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90 transition-all duration-300"
          >
            Get in touch
          </a>
        </div>

        <button
          ref={hamburgerRef}
          className="relative z-50 flex md:hidden items-center justify-center w-10 h-10 text-white/60 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
        >
          <div className="flex flex-col gap-1.5">
            <motion.span
              className="block h-px w-5 bg-current"
              animate={open ? { rotate: 45, y: 2.5 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="block h-px w-5 bg-current"
              animate={open ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="block h-px w-5 bg-current"
              animate={open ? { rotate: -45, y: -2.5 } : { rotate: 0, y: 0 }}
            />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={mobileNavRef}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/90 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onKeyDown={handleKeyDown}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <nav className="flex flex-col items-center gap-8" aria-label="Mobile navigation">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  className="text-3xl font-medium text-white/40 hover:text-white transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                className="mt-4 rounded-xl bg-white px-6 py-3 text-base font-medium text-black"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                onClick={() => setOpen(false)}
              >
                Get in touch
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
