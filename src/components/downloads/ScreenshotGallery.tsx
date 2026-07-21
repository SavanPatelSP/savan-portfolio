"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, LayoutGroup } from "framer-motion";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Monitor,
  Laptop,
  Tablet,
  Smartphone,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ease, spring, FAST } from "@/lib/motion";
import { screenshots, type ScreenshotEntry } from "@/data/screenshots";

/* ─── DEVICE ICONS ──────────────────────────────────────────── */

const deviceIcons: Record<ScreenshotEntry["device"], React.ElementType> = {
  desktop: Monitor,
  laptop: Laptop,
  tablet: Tablet,
  phone: Smartphone,
  landscape: RotateCcw,
};

/* ─── SEGMENTED CONTROL (Apple-style) ───────────────────────── */

function SegmentedControl({
  screenshots: items,
  activeIndex,
  onSelect,
}: {
  screenshots: ScreenshotEntry[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="relative flex items-center w-full max-w-3xl mx-auto">
      {/* Background track */}
      <div className="absolute inset-0 rounded-xl bg-white/[0.03] border border-white/[0.06] p-1">
        {/* Animated indicator */}
        <motion.div
          className="absolute top-1 bottom-1 rounded-lg bg-white/[0.06] border border-white/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.04)]"
          layoutId="segmented-indicator"
          transition={spring.snappy}
          style={{
            left: `calc(${(activeIndex / items.length) * 100}% + 4px)`,
            width: `calc(${100 / items.length}% - 8px)`,
          }}
        />
      </div>
      {/* Segments */}
      <div className="relative flex w-full">
        {items.map((s, i) => {
          const Icon = deviceIcons[s.device];
          const isActive = i === activeIndex;
          return (
            <button
              key={s.id}
              onClick={() => onSelect(i)}
              className={cn(
                "relative flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 text-[11px] font-medium transition-colors duration-200 rounded-lg z-10 min-h-[40px]",
                isActive
                  ? "text-white/80"
                  : "text-white/30 hover:text-white/50"
              )}
              aria-label={`View ${s.title}`}
              role="tab"
              aria-selected={isActive}
            >
              <Icon className="h-3 w-3 shrink-0" />
              <span className="hidden sm:inline truncate">{s.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── SCREENSHOT SECTION ──────────────────────────────────────── */

function ScreenshotSection({
  screenshot,
  index,
  onExpand,
}: {
  screenshot: ScreenshotEntry;
  index: number;
  onExpand: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const isDesktop = screenshot.device === "desktop";

  return (
    <motion.div
      ref={ref}
      className="relative w-full"
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.05, ease: ease.out }}
    >
      {/* Label row */}
      <div className="mb-3 flex items-center gap-3">
        <span className="text-[10px] font-mono text-white/20 bg-white/[0.03] border border-white/[0.06] rounded-full px-2.5 py-1 tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0">
          <h3 className="text-sm font-medium text-white/60">{screenshot.title}</h3>
          <p className="text-[11px] text-white/25 mt-0.5 truncate">{screenshot.description}</p>
        </div>
      </div>

      {/* Screenshot */}
      <button
        onClick={onExpand}
        className="group relative w-full text-left"
        aria-label={`View ${screenshot.title} full size`}
      >
        {isDesktop ? (
          /* Desktop: large edge-to-edge card */
          <div className="relative rounded-xl overflow-hidden border border-white/[0.06] bg-[#0a0a0a] shadow-[0_8px_60px_-16px_rgba(0,0,0,0.6),0_0_1px_rgba(255,255,255,0.05)] hover:shadow-[0_12px_80px_-16px_rgba(0,0,0,0.7),0_0_1px_rgba(255,255,255,0.08)] transition-shadow duration-500">
            <Image
              src={screenshot.src}
              alt={screenshot.title}
              width={1440}
              height={900}
              quality={85}
              priority={index === 0}
              className="w-full h-auto"
            />
          </div>
        ) : screenshot.device === "phone" ? (
          /* Phone: centered phone frame */
          <div className="flex justify-center">
            <div className="relative w-[280px] sm:w-[320px]">
              <div className="relative rounded-[2rem] border border-white/[0.08] bg-[#111] overflow-hidden shadow-[0_8px_60px_-16px_rgba(0,0,0,0.6)] p-1.5">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[28%] h-[18px] bg-black rounded-full z-10" />
                <div className="rounded-[1.5rem] overflow-hidden bg-black">
                  <Image
                    src={screenshot.src}
                    alt={screenshot.title}
                    width={768}
                    height={1600}
                    quality={85}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : screenshot.device === "tablet" ? (
          /* Tablet: centered tablet frame */
          <div className="flex justify-center">
            <div className="relative w-[400px] sm:w-[480px]">
              <div className="relative rounded-[1.4rem] border border-white/[0.08] bg-[#111] overflow-hidden shadow-[0_8px_60px_-16px_rgba(0,0,0,0.6)] p-1.5">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 h-[2px] w-[2px] rounded-full bg-white/[0.06]" />
                <div className="rounded-[1.1rem] overflow-hidden bg-black">
                  <Image
                    src={screenshot.src}
                    alt={screenshot.title}
                    width={768}
                    height={1024}
                    quality={85}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Laptop: centered laptop frame */
          <div className="flex justify-center">
            <div className="relative w-full max-w-4xl">
              <div className="relative rounded-t-lg border border-white/[0.08] border-b-0 bg-[#111] overflow-hidden shadow-[0_8px_60px_-16px_rgba(0,0,0,0.6)]">
                <div className="h-3.5 bg-gradient-to-b from-white/[0.04] to-white/[0.02] border-b border-white/[0.05] flex items-center justify-center px-3">
                  <div className="h-[3px] w-[3px] rounded-full bg-white/[0.06]" />
                </div>
                <Image
                  src={screenshot.src}
                  alt={screenshot.title}
                  width={1280}
                  height={800}
                  quality={85}
                  className="w-full h-auto"
                />
              </div>
              <div className="relative h-3 bg-gradient-to-b from-white/[0.06] to-white/[0.03] rounded-b-lg border border-white/[0.08] border-t-0">
                <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-[18%] h-[2px] bg-white/[0.06] rounded-full" />
              </div>
            </div>
          </div>
        )}

        {/* Expand indicator */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-black/60 backdrop-blur-sm border border-white/10">
            <ZoomIn className="h-3 w-3 text-white/50" />
          </div>
        </div>
      </button>
    </motion.div>
  );
}

/* ─── FULLSCREEN VIEWER ─────────────────────────────────────── */

function FullscreenViewer({
  allScreenshots,
  initialIndex,
  onClose,
}: {
  allScreenshots: ScreenshotEntry[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const touchStartX = useRef(0);

  const active = allScreenshots[currentIndex];

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % allScreenshots.length);
    setZoom(1);
  }, [allScreenshots.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + allScreenshots.length) % allScreenshots.length);
    setZoom(1);
  }, [allScreenshots.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goNext();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
      if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        setZoom((z) => Math.min(z + 0.25, 3));
      }
      if (e.key === "-") {
        e.preventDefault();
        setZoom((z) => Math.max(z - 0.25, 0.5));
      }
      if (e.key === "0") {
        e.preventDefault();
        setZoom(1);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, goNext, goPrev]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) goNext();
      else goPrev();
    }
  };

  if (!active) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col bg-black/95 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-label="Screenshot viewer"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-xs font-medium text-white/50 truncate">
            {active.title}
          </span>
          <span className="text-[10px] text-white/20 font-mono shrink-0">
            {currentIndex + 1} / {allScreenshots.length}
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => setZoom((z) => Math.max(z - 0.25, 0.5))}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/30 hover:text-white/60 hover:bg-white/[0.06] transition-all"
            aria-label="Zoom out"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <span className="text-[10px] font-mono text-white/20 w-12 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom((z) => Math.min(z + 0.25, 3))}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/30 hover:text-white/60 hover:bg-white/[0.06] transition-all"
            aria-label="Zoom in"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <div className="w-px h-4 bg-white/[0.08] mx-1" />
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/30 hover:text-white/60 hover:bg-white/[0.06] transition-all"
            aria-label="Close viewer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center overflow-hidden relative px-4">
        <button
          onClick={goPrev}
          className="absolute left-2 sm:left-4 z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] border border-white/[0.08] text-white/40 hover:text-white hover:bg-white/[0.1] transition-all backdrop-blur-sm"
          aria-label="Previous screenshot"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            className="flex justify-center max-h-full overflow-auto"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25, ease: ease.out }}
          >
            <div
              className="transition-transform duration-300"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: "center center",
              }}
            >
              {active.device === "desktop" ? (
                <div className="rounded-xl overflow-hidden border border-white/[0.06] bg-[#0a0a0a]">
                  <Image
                    src={active.src}
                    alt={active.title}
                    width={1440}
                    height={900}
                    quality={90}
                    priority
                    className="w-full h-auto"
                  />
                </div>
              ) : active.device === "phone" ? (
                <div className="w-[280px] sm:w-[320px] mx-auto">
                  <div className="relative rounded-[2rem] border border-white/[0.08] bg-[#111] p-1.5 shadow-2xl">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[28%] h-[18px] bg-black rounded-full z-10" />
                    <div className="rounded-[1.5rem] overflow-hidden bg-black">
                      <Image
                        src={active.src}
                        alt={active.title}
                        width={768}
                        height={1600}
                        quality={90}
                        priority
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
              ) : active.device === "tablet" ? (
                <div className="w-[400px] sm:w-[480px] mx-auto">
                  <div className="relative rounded-[1.4rem] border border-white/[0.08] bg-[#111] p-1.5 shadow-2xl">
                    <div className="rounded-[1.1rem] overflow-hidden bg-black">
                      <Image
                        src={active.src}
                        alt={active.title}
                        width={768}
                        height={1024}
                        quality={90}
                        priority
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full max-w-4xl mx-auto">
                  <div className="relative rounded-t-lg border border-white/[0.08] border-b-0 bg-[#111] shadow-2xl">
                    <div className="h-3.5 bg-gradient-to-b from-white/[0.04] to-white/[0.02] border-b border-white/[0.05] flex items-center justify-center px-3">
                      <div className="h-[3px] w-[3px] rounded-full bg-white/[0.06]" />
                    </div>
                    <Image
                      src={active.src}
                      alt={active.title}
                      width={1280}
                      height={800}
                      quality={90}
                      priority
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="relative h-3 bg-gradient-to-b from-white/[0.06] to-white/[0.03] rounded-b-lg border border-white/[0.08] border-t-0">
                    <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-[18%] h-[2px] bg-white/[0.06] rounded-full" />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={goNext}
          className="absolute right-2 sm:right-4 z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] border border-white/[0.08] text-white/40 hover:text-white hover:bg-white/[0.1] transition-all backdrop-blur-sm"
          aria-label="Next screenshot"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Bottom segmented control */}
      <div className="px-4 sm:px-6 py-3 border-t border-white/[0.06]">
        <SegmentedControl
          screenshots={allScreenshots}
          activeIndex={currentIndex}
          onSelect={(i) => {
            setCurrentIndex(i);
            setZoom(1);
          }}
        />
      </div>
    </motion.div>
  );
}

/* ─── MAIN GALLERY ──────────────────────────────────────────── */

export function ScreenshotGallery({ className }: { className?: string }) {
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  const activeScreenshot = screenshots[activeTab];

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setActiveTab((prev) => (prev + 1) % screenshots.length);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActiveTab((prev) => (prev - 1 + screenshots.length) % screenshots.length);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div
      ref={ref}
      className={cn("relative", className)}
      role="region"
      aria-label="Screenshot gallery"
    >
      <LayoutGroup>
        {/* Segmented control navigation */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1, ease: ease.out }}
        >
          <SegmentedControl
            screenshots={screenshots}
            activeIndex={activeTab}
            onSelect={setActiveTab}
          />
        </motion.div>

        {/* Active screenshot display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScreenshot.id}
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: ease.out }}
          >
            <ScreenshotSection
              screenshot={activeScreenshot}
              index={activeTab}
              onExpand={() => setFullscreenIndex(activeTab)}
            />
          </motion.div>
        </AnimatePresence>
      </LayoutGroup>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {fullscreenIndex !== null && (
          <FullscreenViewer
            allScreenshots={screenshots}
            initialIndex={fullscreenIndex}
            onClose={() => setFullscreenIndex(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
