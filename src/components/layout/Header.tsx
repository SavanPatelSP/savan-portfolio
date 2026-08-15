"use client";

import { useState, useEffect, useRef, useCallback, memo, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Download, BookOpen, X, PenLine, Newspaper } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { personal } from "@/data/personal";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { useActiveSection } from "@/hooks/useActiveSection";
import { spring, FAST } from "@/lib/motion";

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
  { label: "Blog", href: "/blog", icon: PenLine },
  { label: "Newsroom", href: "/newsroom", icon: Newspaper },
  { label: "Install", href: "/downloads", icon: Download },
  { label: "Docs", href: "/docs", icon: BookOpen },
] as const;

function getSectionHref(id: string, pathname: string) {
  return pathname === "/" ? `#${id}` : `/#${id}`;
}

function lockScroll() {
  const scrollY = window.scrollY;
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }
  return scrollY;
}

function unlockScroll(savedScrollY: number) {
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
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
        "relative text-sm py-2 transition-colors duration-200 whitespace-nowrap",
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

const ExternalLink = memo(function ExternalLink({
  link,
  isActive,
}: {
  link: (typeof externalLinks)[number];
  isActive: boolean;
}) {
  const Icon = link.icon;
  return (
    <a
      href={link.href}
      className={cn(
        "group hidden lg:flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm transition-all duration-200",
        isActive
          ? "text-white/80 bg-white/[0.04]"
          : "text-white/35 hover:text-white/80 hover:bg-white/[0.03]"
      )}
      aria-label={link.label}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />
      <span className="hidden xl:inline whitespace-nowrap">{link.label}</span>
      <span
        className={cn(
          "hidden xl:block h-1 w-1 rounded-full shrink-0",
          isActive ? "bg-blue-400/80" : "bg-blue-400/50"
        )}
      />
    </a>
  );
});

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const active = useActiveSection();
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const savedScrollYRef = useRef(0);
  const wasOpenRef = useRef(false);
  const closeForNavRef = useRef(false);
  const pathname = usePathname();

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
    closeForNavRef.current = true;
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    setOpen(false);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
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
      const savedY = savedScrollYRef.current;
      savedScrollYRef.current = 0;
      const isNavClose = closeForNavRef.current;
      closeForNavRef.current = false;
      const raf = requestAnimationFrame(() => {
        if (isNavClose) {
          document.documentElement.style.overflow = "";
          document.body.style.overflow = "";
          document.body.style.paddingRight = "";
        } else {
          unlockScroll(savedY);
        }
        hamburgerRef.current?.focus();
      });
      return () => cancelAnimationFrame(raf);
    }
    wasOpenRef.current = open;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open]);

  const isHome = active === null;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[110] transition-all duration-500",
        scrolled
          ? "bg-black/70 backdrop-blur-2xl border-b border-white/[0.03]"
          : "bg-transparent"
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className={cn(
            "group flex shrink-0 items-center gap-2 text-sm font-medium whitespace-nowrap transition-colors duration-200",
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
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex flex-1 items-center justify-center min-w-0 px-6">
          <div className="flex items-center gap-4 xl:gap-6">
            {sections.map((s) => (
              <NavLink
                key={s.id}
                s={s}
                isActive={active === s.id}
                href={getSectionHref(s.id, pathname)}
              />
            ))}
          </div>
        </div>

        {/* Right actions */}
        <div className="hidden lg:flex shrink-0 items-center gap-1">
          {externalLinks.map((link) => (
            <ExternalLink key={link.href} link={link} isActive={pathname === link.href} />
          ))}
          <div className="hidden xl:block w-px h-5 bg-white/[0.08] mx-1" />
          <motion.a
            href="/contact"
            className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black whitespace-nowrap hover:bg-white/90 transition-all duration-200 hover:shadow-[0_4px_16px_-4px_rgba(255,255,255,0.15)]"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={spring.gentle}
          >
            Get in touch
          </motion.a>
        </div>

        {/* Mobile hamburger — close button is portaled inside the overlay */}
        <div className="lg:hidden w-12 h-12">
          <button
            ref={hamburgerRef}
            className={cn(
              "flex items-center justify-center w-12 h-12 rounded-xl bg-transparent border border-transparent text-white/60 hover:text-white hover:border-white/[0.08] transition-all duration-200 [-webkit-appearance:none] active:scale-95",
              open && "pointer-events-none opacity-0"
            )}
            onClick={handleToggle}
            aria-label="Open navigation menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-hidden={open ? true : undefined}
            tabIndex={open ? -1 : 0}
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
        </div>
      </nav>

      {/* Mobile nav overlay — portaled to body so it escapes the header stacking context */}
      {mounted && createPortal(
        <div
          id="mobile-nav"
          ref={mobileNavRef}
          className={cn(
            "fixed inset-0 z-[120] bg-black transition-all duration-300",
            open
              ? "opacity-100 visible pointer-events-auto"
              : "opacity-0 invisible pointer-events-none"
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          onKeyDown={open ? handleKeyDown : undefined}
          onClick={open ? handleClose : undefined}
        >
          {/* Close button — inside the overlay so it renders above it (same z-context) */}
          <button
            className={cn(
              "absolute top-3 right-3 z-10 flex items-center justify-center w-11 h-11 rounded-xl border border-white/[0.12] bg-white/[0.08] text-white/70 hover:text-white hover:border-white/[0.2] hover:bg-white/[0.12] transition-all duration-200 [-webkit-appearance:none] active:scale-95",
              !open && "pointer-events-none opacity-0"
            )}
            onClick={handleClose}
            aria-label="Close navigation menu"
            tabIndex={open ? 0 : -1}
          >
            <X className="h-5 w-5" />
          </button>

          <div
            className="flex h-dvh flex-col items-center justify-center overflow-y-auto overscroll-contain"
            onClick={(e) => e.stopPropagation()}
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

              {externalLinks.map((link, i) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-2xl sm:text-3xl font-medium min-h-[52px] flex items-center px-8 rounded-2xl w-full max-w-xs justify-center transition-all duration-300",
                      isActive
                        ? "text-white/90 bg-white/[0.06]"
                        : "text-white/35 hover:text-white/70 hover:bg-white/[0.03]"
                    )}
                    style={{
                      transitionDelay: open ? `${50 + (sections.length + i) * 25}ms` : "0ms",
                    }}
                    aria-current={isActive ? "page" : undefined}
                    tabIndex={open ? 0 : -1}
                    onClick={handleNavItemClick}
                  >
                    <Icon className="h-5 w-5 mr-2 shrink-0" />
                    {link.label}
                  </a>
                );
              })}

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
                href="/contact"
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
        </div>,
        document.body
      )}
    </header>
  );
}
