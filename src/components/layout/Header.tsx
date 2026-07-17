"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { personal } from "@/data/personal";
import { useActiveSection } from "@/hooks/useActiveSection";
import { ease, spring, FAST, NORMAL } from "@/lib/motion";

const sections = [
  { label: "Products", id: "products" },
  { label: "Founder", id: "founder" },
  { label: "Expertise", id: "technologies" },
  { label: "Organization", id: "organization" },
  { label: "Journey", id: "journey" },
  { label: "Roadmap", id: "roadmap" },
  { label: "Contact", id: "contact" },
];

function sectionHref(id: string) {
  if (typeof window !== "undefined" && window.location.pathname === "/") return `#${id}`;
  return `/#${id}`;
}

function NavLink({ s, isActive }: { s: typeof sections[number]; isActive: boolean }) {
  return (
    <a
      href={sectionHref(s.id)}
      className={cn(
        "relative text-sm transition-colors duration-300 py-1",
        isActive ? "text-white/80" : "text-white/35 hover:text-white/80"
      )}
      aria-current={isActive ? "location" : undefined}
    >
      {s.label}
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
      const scrollY = window.scrollY;
      document.documentElement.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.inset = "0";
      document.body.style.top = `-${scrollY}px`;
      requestAnimationFrame(() => {
        const container = mobileNavRef.current;
        if (!container) return;
        const first = container.querySelector<HTMLElement>("a, button");
        first?.focus();
      });
    } else {
      const scrollY = Math.abs(parseInt(document.body.style.top || "0", 10));
      document.documentElement.style.overflow = "";
      document.body.style.position = "";
      document.body.style.inset = "";
      document.body.style.top = "";
      window.scrollTo(0, scrollY);
      hamburgerRef.current?.focus();
    }
  }, [open]);

  const contactHref = sectionHref("contact");

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
        <a href="#home" className="group flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors duration-200">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/30 to-blue-600/20 ring-1 ring-blue-500/25 overflow-hidden transition-shadow duration-200 group-hover:shadow-[0_0_12px_rgba(59,130,246,0.2)]">
            <Image src="/logo.jpg" alt={personal.company} width={28} height={28} className="object-cover w-full h-full" priority />
          </span>
          {personal.name}
        </a>

        <div className="hidden md:flex items-center gap-8">
          {sections.map((s) => (
            <NavLink key={s.id} s={s} isActive={active === s.id} />
          ))}
          <motion.a
            href={contactHref}
            className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90 transition-all duration-200 hover:shadow-[0_4px_16px_-4px_rgba(255,255,255,0.15)]"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={spring.gentle}
          >
            Get in touch
          </motion.a>
        </div>

        <button
          ref={hamburgerRef}
          className="relative z-50 flex md:hidden items-center justify-center w-11 h-11 rounded-none bg-transparent border-none text-white/60 hover:text-white appearance-none [-webkit-appearance:none]"
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
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur-2xl"
            initial={{ opacity: 0, filter: "blur(12px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(12px)" }}
            transition={{ duration: NORMAL, ease: ease.out }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div
              ref={mobileNavRef}
              className="flex h-full flex-col items-center justify-center overflow-y-auto"
              onKeyDown={handleKeyDown}
            >
              <nav className="flex flex-col items-center gap-8 py-20" aria-label="Mobile navigation">
                {sections.map((s, i) => (
                  <motion.a
                    key={s.id}
                    href={sectionHref(s.id)}
                    className="text-3xl font-medium text-white/40 hover:text-white transition-colors"
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: i * 0.05, duration: NORMAL, ease: ease.out }}
                    onClick={() => setOpen(false)}
                  >
                    {s.label}
                  </motion.a>
                ))}
                <motion.a
                  href={contactHref}
                  className="mt-4 rounded-xl bg-white px-6 py-3 text-base font-medium text-black"
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.3, duration: NORMAL, ease: ease.out }}
                  onClick={() => setOpen(false)}
                >
                  Get in touch
                </motion.a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
