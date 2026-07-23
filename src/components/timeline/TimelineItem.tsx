"use client";

import { useRef, ReactNode, ElementType } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { ease, NORMAL } from "@/lib/motion";

export type TimelineNodeStatus = "default" | "done" | "active" | "inactive";

export interface TimelineItemProps {
  children: ReactNode;
  icon?: ElementType;
  status?: TimelineNodeStatus;
  index?: number;
  total?: number;
  isLast?: boolean;
  isLeft?: boolean;
  layout?: "left" | "centered";
  accentColor?: string;
  delay?: number;
  className?: string;
  contentClassName?: string;
}

function NodeIcon({
  icon: Icon,
  status,
  accentColor,
}: {
  icon?: ElementType;
  status: TimelineNodeStatus;
  accentColor?: string;
}) {
  const color = accentColor || "#3b82f6";

  if (status === "done" && Icon) {
    return <Icon className="h-3.5 w-3.5" style={{ color: `${color}cc` }} />;
  }

  if (status === "active") {
    return (
      <div className="relative flex items-center justify-center">
        <div
          className="absolute h-4 w-4 rounded-full animate-ping opacity-30"
          style={{ backgroundColor: color }}
        />
        <div
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: `${color}cc` }}
        />
      </div>
    );
  }

  if (status === "inactive") {
    return <div className="h-1.5 w-1.5 rounded-full bg-white/15" />;
  }

  if (Icon) {
    return <Icon className="h-3.5 w-3.5 text-white/30" />;
  }

  return <div className="h-1.5 w-1.5 rounded-full bg-white/15" />;
}

function NodeContainer({
  icon,
  status,
  accentColor,
  size = "default",
}: {
  icon?: ElementType;
  status: TimelineNodeStatus;
  accentColor?: string;
  size?: "default" | "compact";
}) {
  const dim = size === "compact" ? "h-8 w-8" : "h-10 w-10 sm:h-12 sm:w-12";

  if (status === "done") {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-2xl shrink-0 transition-all duration-300",
          dim
        )}
        style={{
          border: `1px solid ${accentColor || "#3b82f6"}30`,
          backgroundColor: `${accentColor || "#3b82f6"}08`,
        }}
      >
        <NodeIcon icon={icon} status={status} accentColor={accentColor} />
      </div>
    );
  }

  if (status === "active") {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-2xl shrink-0 transition-all duration-300",
          dim
        )}
        style={{
          border: `2px solid ${accentColor || "#3b82f6"}50`,
          backgroundColor: "transparent",
        }}
      >
        <NodeIcon icon={icon} status={status} accentColor={accentColor} />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02] shrink-0 transition-all duration-300 hover:border-white/[0.10] hover:bg-white/[0.03]",
        dim
      )}
    >
      <NodeIcon icon={icon} status={status} accentColor={accentColor} />
    </div>
  );
}

export function TimelineItem({
  children,
  icon,
  status = "default",
  index = 0,
  total: _total = 1,
  isLast = false,
  isLeft: _isLeft = true,
  layout = "left",
  accentColor,
  delay = 0,
  className,
  contentClassName,
}: TimelineItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const isCentered = layout === "centered";

  const itemDelay = delay + index * 0.08;
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={cn("relative group", className)}
      role="listitem"
    >
      {/* ── Centered layout (desktop alternating) ── */}
      {isCentered ? (
        <>
          {/* Desktop: grid with 3 columns */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_60px_1fr] items-start gap-0">
            {/* Left content or empty */}
            <div className={cn("flex", isEven ? "justify-end pr-6" : "")}>
              {isEven && (
                <motion.div
                  className="text-right max-w-md"
                  initial={{ opacity: 0, x: -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: NORMAL, delay: itemDelay, ease: ease.out }}
                >
                  {children}
                </motion.div>
              )}
            </div>

            {/* Center node + connector */}
            <div className="flex flex-col items-center relative">
              <motion.div
                className="relative z-10"
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{
                  delay: itemDelay,
                  type: "spring",
                  stiffness: 200,
                  damping: 16,
                }}
              >
                <NodeContainer
                  icon={icon}
                  status={status}
                  accentColor={accentColor}
                />
              </motion.div>

              {/* Connector line */}
              {!isLast && (
                <div className="w-px flex-1 min-h-[40px] bg-white/[0.04] relative">
                  <motion.div
                    className="absolute inset-0 origin-top"
                    style={{
                      background: `linear-gradient(to bottom, ${accentColor || "#3b82f6"}25, ${accentColor || "#3b82f6"}08, transparent)`,
                    }}
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : {}}
                    transition={{ duration: 0.8, delay: itemDelay + 0.2, ease: ease.out }}
                  />
                </div>
              )}
            </div>

            {/* Right content or empty */}
            <div className={cn("flex", !isEven ? "pl-6" : "")}>
              {!isEven && (
                <motion.div
                  className="max-w-md"
                  initial={{ opacity: 0, x: 16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: NORMAL, delay: itemDelay, ease: ease.out }}
                >
                  {children}
                </motion.div>
              )}
            </div>
          </div>

          {/* Mobile/Tablet: left-aligned fallback */}
          <div className="lg:hidden flex gap-4 sm:gap-5">
            <div className="flex flex-col items-center shrink-0">
              <motion.div
                className="relative z-10"
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{
                  delay: itemDelay,
                  type: "spring",
                  stiffness: 200,
                  damping: 16,
                }}
              >
                <NodeContainer
                  icon={icon}
                  status={status}
                  accentColor={accentColor}
                  size="compact"
                />
              </motion.div>

              {!isLast && (
                <div className="w-px flex-1 min-h-[32px] bg-white/[0.04] relative">
                  <motion.div
                    className="absolute inset-0 origin-top"
                    style={{
                      background: `linear-gradient(to bottom, ${accentColor || "#3b82f6"}25, ${accentColor || "#3b82f6"}08, transparent)`,
                    }}
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : {}}
                    transition={{ duration: 0.8, delay: itemDelay + 0.2, ease: ease.out }}
                  />
                </div>
              )}
            </div>

            <motion.div
              className="flex-1 min-w-0 pt-1"
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: NORMAL, delay: itemDelay, ease: ease.out }}
            >
              {children}
            </motion.div>
          </div>
        </>
      ) : (
        /* ── Left-aligned layout ── */
        <div className="flex gap-4 sm:gap-5">
          {/* Node + Connector column */}
          <div className="flex flex-col items-center shrink-0">
            <motion.div
              className="relative z-10"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{
                delay: itemDelay,
                type: "spring",
                stiffness: 200,
                damping: 16,
              }}
            >
              <NodeContainer
                icon={icon}
                status={status}
                accentColor={accentColor}
              />
            </motion.div>

            {/* Connector line - only if not last */}
            {!isLast && (
              <div className="w-px flex-1 min-h-[40px] bg-white/[0.04] relative">
                <motion.div
                  className="absolute inset-0 origin-top"
                  style={{
                    background: `linear-gradient(to bottom, ${accentColor || "#3b82f6"}25, ${accentColor || "#3b82f6"}08, transparent)`,
                  }}
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.8, delay: itemDelay + 0.2, ease: ease.out }}
                />
              </div>
            )}
          </div>

          {/* Content */}
          <motion.div
            className={cn("flex-1 min-w-0 pt-1", contentClassName)}
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: NORMAL, delay: itemDelay, ease: ease.out }}
          >
            {children}
          </motion.div>
        </div>
      )}
    </div>
  );
}
