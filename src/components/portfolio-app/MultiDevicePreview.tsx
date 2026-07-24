"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView, LayoutGroup } from "framer-motion";
import Image from "next/image";
import { Monitor, Laptop, Tablet, Smartphone, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { ease, spring, NORMAL, FAST } from "@/lib/motion";
import { screenshots, type ScreenshotEntry } from "@/data/screenshots";

/* ─── SCREENSHOT IMAGE ───────────────────────────────────────── */

function ScreenshotImage({
  src,
  alt,
  className,
  sizes,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("relative bg-[#0a0a0a] overflow-hidden aspect-[16/10]", className)}>
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-white/[0.05] to-white/[0.02]">
          <div className="absolute inset-0 animate-shimmer" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        priority={priority}
        quality={85}
        onLoad={() => setLoaded(true)}
        className={cn(
          "object-cover object-top transition-opacity duration-700 ease-out",
          loaded ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
}

/* ─── DESKTOP CARD (no device frame) ─────────────────────────── */

function DesktopCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-xl overflow-hidden border border-white/[0.06] bg-[#0a0a0a] shadow-[0_8px_60px_-16px_rgba(0,0,0,0.6),0_0_1px_rgba(255,255,255,0.05)]",
        className
      )}
    >
      {children}
    </div>
  );
}

/* ─── LAPTOP FRAME ───────────────────────────────────────────── */

function LaptopFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative group", className)}>
      <div className="absolute -inset-3 bg-gradient-to-b from-blue-500/[0.02] via-transparent to-transparent rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      {/* Lid */}
      <div className="relative rounded-t-lg border border-white/[0.08] border-b-0 bg-[#111] overflow-hidden shadow-[0_4px_60px_-12px_rgba(0,0,0,0.7)]">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
        {/* Camera notch */}
        <div className="h-3.5 bg-gradient-to-b from-white/[0.04] to-white/[0.02] border-b border-white/[0.05] flex items-center justify-center px-3">
          <div className="h-[3px] w-[3px] rounded-full bg-white/[0.06] shadow-[0_0_3px_rgba(255,255,255,0.04)]" />
        </div>
        {children}
      </div>
      {/* Base/keyboard */}
      <div className="relative h-3.5 bg-gradient-to-b from-white/[0.06] to-white/[0.03] rounded-b-lg border border-white/[0.08] border-t-0 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)]">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[18%] h-[2px] bg-white/[0.06] rounded-full" />
      </div>
      {/* Screen reflection */}
      <div className="absolute top-[14px] left-0 right-0 h-[45%] bg-gradient-to-b from-white/[0.015] via-transparent to-transparent pointer-events-none rounded-t-lg" />
    </div>
  );
}

/* ─── TABLET FRAME ───────────────────────────────────────────── */

function TabletFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative group", className)}>
      <div className="absolute -inset-3 bg-gradient-to-b from-blue-500/[0.02] via-transparent to-transparent rounded-[1.8rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      <div className="relative rounded-[1.4rem] border border-white/[0.08] bg-[#111] overflow-hidden shadow-[0_4px_60px_-12px_rgba(0,0,0,0.7)] p-1.5">
        {/* Camera */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 h-[2px] w-[2px] rounded-full bg-white/[0.06]" />
        <div className="rounded-[1.1rem] overflow-hidden bg-black">{children}</div>
      </div>
      {/* Reflection */}
      <div className="absolute top-[10px] left-0 right-0 h-[40%] bg-gradient-to-b from-white/[0.01] via-transparent to-transparent pointer-events-none rounded-[1.4rem]" />
    </div>
  );
}

/* ─── PHONE FRAME ────────────────────────────────────────────── */

function PhoneFrame({
  children,
  className,
  landscape = false,
}: {
  children: React.ReactNode;
  className?: string;
  landscape?: boolean;
}) {
  return (
    <div className={cn("relative group", className)}>
      <div
        className={cn(
          "absolute -inset-[1px] pointer-events-none opacity-30",
          landscape ? "rounded-[1.5rem]" : "rounded-[1.9rem]",
          "bg-gradient-to-b from-white/[0.1] via-white/[0.04] to-white/[0.01]"
        )}
      />
      <div
        className={cn(
          "relative border border-white/[0.08] bg-[#111] overflow-hidden shadow-[0_4px_60px_-12px_rgba(0,0,0,0.7)]",
          landscape ? "rounded-[1.3rem] p-1" : "rounded-[1.7rem] p-1.5"
        )}
      >
        {/* Dynamic Island */}
        {!landscape && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[28%] h-[18px] bg-black rounded-full z-10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]" />
        )}
        {landscape && (
          <div className="absolute left-2 top-1/2 -translate-y-1/2 w-[18px] h-[28%] bg-black rounded-full z-10 shadow-[inset_1px_0_2px_rgba(0,0,0,0.5)]" />
        )}
        <div className={cn("rounded-[1.3rem] overflow-hidden bg-black")}>
          {children}
        </div>
      </div>
      {/* Reflection */}
      <div
        className={cn(
          "absolute pointer-events-none bg-gradient-to-b from-white/[0.01] via-transparent to-transparent",
          landscape
            ? "top-[6px] left-0 right-0 h-[35%] rounded-[1.3rem]"
            : "top-[8px] left-0 right-0 h-[35%] rounded-[1.3rem]"
        )}
      />
    </div>
  );
}

/* ─── DEVICE FRAME WRAPPER ──────────────────────────────────── */

function DeviceFrame({
  device,
  children,
  className,
}: {
  device: ScreenshotEntry["device"];
  children: React.ReactNode;
  className?: string;
}) {
  switch (device) {
    case "desktop":
      return (
        <DesktopCard className={className}>{children}</DesktopCard>
      );
    case "laptop":
      return (
        <LaptopFrame className={className}>{children}</LaptopFrame>
      );
    case "tablet":
      return (
        <TabletFrame className={className}>{children}</TabletFrame>
      );
    case "phone":
      return (
        <PhoneFrame className={className}>{children}</PhoneFrame>
      );
    case "landscape":
      return (
        <PhoneFrame className={className} landscape>
          {children}
        </PhoneFrame>
      );
    default:
      return (
        <DesktopCard className={className}>{children}</DesktopCard>
      );
  }
}

/* ─── DEVICE ICONS ──────────────────────────────────────────── */

const deviceIcons: Record<
  ScreenshotEntry["device"],
  React.ElementType
> = {
  desktop: Monitor,
  laptop: Laptop,
  tablet: Tablet,
  phone: Smartphone,
  landscape: RotateCcw,
};

/* ─── SEGMENTED CONTROL (Apple-style) ───────────────────────── */

function SegmentedControl({
  items,
  activeIndex,
  onSelect,
}: {
  items: ScreenshotEntry[];
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
          layoutId="device-segmented-indicator"
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

/* ─── KEYBOARD NAVIGATION ───────────────────────────────────── */

function useKeyboardNav(
  total: number,
  setActive: (fn: (i: number) => number) => void
) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        setActive((prev) => (prev + 1) % total);
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setActive((prev) => (prev - 1 + total) % total);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [total, setActive]);
}

/* ─── MAIN COMPONENT ────────────────────────────────────────── */

export function MultiDevicePreview({ className }: { className?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const activeScreenshot = screenshots[activeIndex];

  useKeyboardNav(screenshots.length, setActiveIndex);

  return (
    <div
      ref={ref}
      className={cn("relative", className)}
      role="region"
      aria-label="Multi-device preview"
    >
      <LayoutGroup>
        {/* Segmented control navigation */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: NORMAL, delay: 0.1, ease: ease.out }}
        >
          <SegmentedControl
            items={screenshots}
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
          />
        </motion.div>

        {/* Device Preview */}
        <div
          className="relative min-h-[400px] flex items-center justify-center"
          role="tabpanel"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScreenshot.id}
              className="flex justify-center w-full"
              initial={{ opacity: 0, y: 24, scale: 0.95, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -24, scale: 0.95, filter: "blur(6px)" }}
              transition={{ duration: 0.4, ease: ease.out }}
            >
              {activeScreenshot.device === "desktop" ? (
                <DesktopCard className="w-full max-w-5xl">
                  <ScreenshotImage
                    src={activeScreenshot.src}
                    alt={activeScreenshot.title}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </DesktopCard>
              ) : (
                <DeviceFrame
                  device={activeScreenshot.device}
                  className={cn(
                    "transition-all duration-500",
                    activeScreenshot.device === "laptop" &&
                      "w-full max-w-4xl",
                    activeScreenshot.device === "tablet" && "w-[min(380px,90vw)]",
                    activeScreenshot.device === "phone" && "w-[280px]",
                    activeScreenshot.device === "landscape" &&
                      "w-full max-w-3xl"
                  )}
                >
                  <ScreenshotImage
                    src={activeScreenshot.src}
                    alt={activeScreenshot.title}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </DeviceFrame>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Screenshot Info */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScreenshot.id}
            className="mt-6 text-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: FAST, ease: ease.out }}
          >
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/15 bg-blue-500/[0.06] px-2.5 py-1 mb-2">
              <span className="text-[9px] font-mono text-blue-400/50">
                {activeScreenshot.feature}
              </span>
            </div>
            <h3 className="text-sm font-medium text-white/60 mb-1">
              {activeScreenshot.title}
            </h3>
            <p className="text-xs text-white/25 max-w-sm mx-auto">
              {activeScreenshot.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
}

export {
  DeviceFrame,
  DesktopCard,
  LaptopFrame,
  TabletFrame,
  PhoneFrame,
  ScreenshotImage,
};
