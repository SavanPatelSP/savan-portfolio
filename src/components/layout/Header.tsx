"use client";

import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { personal } from "@/data/personal";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
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
] as const;

const externalLinks = [
  { label: "Install", href: "/downloads" },
  { label: "Docs", href: "/docs" },
] as const;

function getSectionHref(id: string, pathname: string) {
  return pathname === "/" ? `#${id}` : `/#${id}`;
}

function lockScroll() {
  const scrollY = window.scrollY;
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.overflow = "hidden";
  document.body.style.position = "fixed";
  document.body.style.inset = "0";
  document.body.style.top = `-${scrollY}px`;
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }
  return scrollY;
}

function unlockScroll(savedScrollY: number) {
  document.documentElement.style.overflow = "";
  document.body.style.position = "";
  document.body.style.inset = "";
  document.body.style.top = "";
  document.body.style.paddingRight = "";
  window.scrollTo(0, savedScrollY);
}

const NavLink = memo(function NavLink({
  s,
  isActive,
  href,
}: {
  s: (typeof sections)[number];
  isActive: boolean;
  href: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "relative text-sm py-2 transition-colors duration-200",
        isActive ? "text-white/80" : "text-white/35 hover:text-white/80"
      )}
      aria-current={isActive ? "location" : undefined}
    >
      {s.label}
      {isActive && (
        <motion.span
          className="absolute -bottom-0.5 left-0 right-0 h-px bg-white/30"
          layoutId="nav-underline"
          transition={spring.snappy}
        />
      )}
    </a>
  );
});

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const savedScrollYRef = useRef(0);
  const wasOpenRef = useRef(false);
  const pathnameRef = useRef("/");

  useEffect(() => {
    pathnameRef.current = window.location.pathname;
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleNavItemClick = useCallback(() => {
    setOpen(false);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }

      if (e.key !== "Tab") return;

      const container = mobileNavRef.current;
      if (!container) return;

      const focusable = container.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
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
    },
    []
  );

  useEffect(() => {
    if (open) {
      savedScrollYRef.current = lockScroll();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const container = mobileNavRef.current;
          if (!container) return;
          const first = container.querySelector<HTMLElement>(
            'a[href], button:not([disabled])'
          );
          first?.focus();
        });
      });
    } else if (wasOpenRef.current) {
      unlockScroll(savedScrollYRef.current);
      savedScrollYRef.current = 0;
      hamburgerRef.current?.focus();
    }
    wasOpenRef.current = open;
  }, [open]);

  const isHome = active === null;
  const pathname = pathnameRef.current;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-black/70 backdrop-blur-2xl border-b border-white/[0.03]"
          : "bg-transparent"
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <a
          href="#home"
          className={cn(
            "group flex items-center gap-2 text-sm font-medium transition-colors duration-200",
            isHome ? "text-white/80" : "text-white/80 hover:text-white"
          )}
          aria-current={isHome ? "location" : undefined}
        >
          <span
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/30 to-blue-600/20 ring-1 ring-blue-500/25 overflow-hidden transition-shadow duration-200",
              isHome
                ? "shadow-[0_0_12px_rgba(59,130,246,0.2)]"
                : "group-hover:shadow-[0_0_12px_rgba(59,130,246,0.2)]"
            )}
          >
            <Image
              src="/logo.jpg"
              alt={personal.company}
              width={28}
              height={28}
              className="object-cover w-full h-full"
              priority
            />
          </span>
          {personal.name}
          <VerifiedBadge size="1.3em" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {sections.map((s) => (
            <NavLink
              key={s.id}
              s={s}
              isActive={active === s.id}
              href={getSectionHref(s.id, pathname)}
            />
          ))}
          {externalLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm py-2 text-white/35 hover:text-white/80 transition-colors duration-200 inline-flex items-center gap-1.5"
            >
              {link.label}
              <span className="h-1 w-1 rounded-full bg-blue-400/50" />
            </a>
          ))}
          <motion.a
            href={getSectionHref("contact", pathname)}
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
          className={cn(
            "relative z-[60] flex md:hidden items-center justify-center w-12 h-12 rounded-xl bg-transparent border border-transparent text-white/60 hover:text-white hover:border-white/[0.08] transition-all duration-200 [-webkit-appearance:none] active:scale-95",
            open && "pointer-events-none opacity-0"
          )}
          style={{ outline: "none" }}
          onClick={handleToggle}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <div className="flex flex-col gap-[5px]">
            <motion.span
              className="block h-px w-5 bg-current rounded-full"
              animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
              transition={spring.snappy}
            />
            <motion.span
              className="block h-px w-5 bg-current rounded-full"
              animate={
                open
                  ? { opacity: 0, scaleX: 0 }
                  : { opacity: 1, scaleX: 1 }
              }
              transition={{ duration: FAST }}
            />
            <motion.span
              className="block h-px w-5 bg-current rounded-full"
              animate={
                open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }
              }
              transition={spring.snappy}
            />
          </div>
        </button>
      </nav>

      {/* Mobile nav — permanently mounted, toggled via visibility */}
      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-0 z-50 bg-black transition-all duration-300",
          open
            ? "opacity-100 visible pointer-events-auto"
            : "opacity-0 invisible pointer-events-none"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        onKeyDown={open ? handleKeyDown : undefined}
      >
        <button
          className="absolute top-4 right-4 z-[60] flex items-center justify-center w-12 h-12 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white/50 hover:text-white hover:border-white/[0.15] hover:bg-white/[0.08] transition-all duration-200 active:scale-95"
          onClick={handleClose}
          aria-label="Close navigation menu"
          tabIndex={open ? 0 : -1}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-current"
          >
            <path
              d="M12 4L4 12M4 4l8 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div
          ref={mobileNavRef}
          className="flex h-full flex-col items-center justify-center overflow-y-auto overscroll-contain"
        >
          <nav
            className="flex flex-col items-center gap-1 py-20"
            aria-label="Mobile navigation"
          >
            {sections.map((s, i) => {
              const isActive = active === s.id;
              return (
                <a
                  key={s.id}
                  href={getSectionHref(s.id, pathname)}
                  className={cn(
                    "relative text-2xl sm:text-3xl font-medium min-h-[52px] flex items-center px-8 rounded-2xl w-full max-w-xs justify-center transition-all duration-300",
                    isActive
                      ? "text-white/90 bg-white/[0.06]"
                      : "text-white/35 hover:text-white/70 hover:bg-white/[0.03]"
                  )}
                  style={{
                    transitionDelay: open ? `${50 + i * 25}ms` : "0ms",
                  }}
                  tabIndex={open ? 0 : -1}
                  onClick={handleNavItemClick}
                >
                  {isActive && (
                    <span className="absolute left-1/2 -translate-x-1/2 -top-0.5 h-0.5 w-8 rounded-full bg-white/30" />
                  )}
                  {s.label}
                </a>
              );
            })}

            {externalLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                className="text-2xl sm:text-3xl font-medium min-h-[52px] flex items-center px-8 rounded-2xl w-full max-w-xs justify-center text-white/35 hover:text-white/70 hover:bg-white/[0.03] transition-all duration-300"
                style={{
                  transitionDelay: open ? `${50 + (sections.length + i) * 25}ms` : "0ms",
                }}
                tabIndex={open ? 0 : -1}
                onClick={handleNavItemClick}
              >
                {link.label}
                <span className="ml-2 h-1.5 w-1.5 rounded-full bg-blue-400/50" />
              </a>
            ))}

            <div
              className={cn(
                "w-12 h-px bg-white/[0.06] my-3 transition-all duration-300",
                open ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              )}
              style={{
                transitionDelay: open ? "200ms" : "0ms",
              }}
            />

            <a
              href={getSectionHref("contact", pathname)}
              className="rounded-2xl bg-white px-8 py-3.5 text-base font-medium text-black min-h-[48px] flex items-center hover:bg-white/90 transition-all duration-300 active:scale-[0.98]"
              style={{
                transitionDelay: open ? "225ms" : "0ms",
              }}
              tabIndex={open ? 0 : -1}
              onClick={handleNavItemClick}
            >
              Get in touch
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
