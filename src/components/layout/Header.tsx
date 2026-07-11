"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { personal } from "@/data/personal";
import { useActiveSection } from "@/hooks/useActiveSection";
import { ease, spring, FAST, NORMAL } from "@/lib/motion";

const links = [
  { label: "Products", href: "#products" },
  { label: "Founder", href: "#founder" },
  { label: "Expertise", href: "#technologies" },
  { label: "Organization", href: "#organization" },
  { label: "Journey", href: "#journey" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Contact", href: "#contact" },
];

function NavLink({ l, isActive }: { l: typeof links[number]; isActive: boolean }) {
  return (
    <a
      href={l.href}
      className={cn(
        "relative text-sm transition-colors duration-300 py-1",
        isActive ? "text-white/80" : "text-white/35 hover:text-white/80"
      )}
      aria-current={isActive ? "location" : undefined}
    >
      {l.label}
      {/* Animated underline */}
      {isActive && (
        <motion.span
          className="absolute -bottom-1 left-0 right-0 h-px bg-white/30"
          layoutId="nav-underline"
          transition={spring.snappy}
        />
      )}
    </a>
  );
}

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
        <a href="#home" className="group flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/30 to-blue-600/20 ring-1 ring-blue-500/25 overflow-hidden transition-shadow duration-300 group-hover:shadow-[0_0_12px_rgba(59,130,246,0.2)]">
            <Image src="/logo.jpg" alt={personal.company} width={28} height={28} className="object-cover w-full h-full" priority />
          </span>
          {personal.name}
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavLink key={l.href} l={l} isActive={active === l.href.slice(1)} />
          ))}
          <motion.a
            href="#contact"
            className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90 transition-colors duration-300"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={spring.gentle}
          >
            Get in touch
          </motion.a>
        </div>

        <button
          ref={hamburgerRef}
          className="relative z-50 flex md:hidden items-center justify-center w-10 h-10 rounded-none bg-transparent border-none text-white/60 hover:text-white appearance-none [-webkit-appearance:none]"
          style={{ outline: "none" }}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
        >
          <div className="flex flex-col gap-1.5">
            <motion.span
              className="block h-px w-5 bg-current"
              animate={open ? { rotate: 45, y: 2.5 } : { rotate: 0, y: 0 }}
              transition={spring.snappy}
            />
            <motion.span
              className="block h-px w-5 bg-current"
              animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: FAST }}
            />
            <motion.span
              className="block h-px w-5 bg-current"
              animate={open ? { rotate: -45, y: -2.5 } : { rotate: 0, y: 0 }}
              transition={spring.snappy}
            />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={mobileNavRef}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/90 backdrop-blur-2xl"
            initial={{ opacity: 0, filter: "blur(12px)", scale: 1.05 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, filter: "blur(12px)", scale: 1.05 }}
            transition={{ duration: NORMAL, ease: ease.out }}
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
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.05, duration: NORMAL, ease: ease.out }}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                className="mt-4 rounded-xl bg-white px-6 py-3 text-base font-medium text-black"
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.3, duration: NORMAL, ease: ease.out }}
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
