"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView, useScroll, useTransform, HTMLMotionProps } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import { NORMAL, SLOW, ease } from "@/lib/motion";

type MotionDivProps = Omit<HTMLMotionProps<"div">, "children"> & { children?: ReactNode };

/* ─── FadeIn ──────────────────────────────────────────────────── */

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = SLOW,
  y = 24,
  blur = 6,
  once = true,
  ...props
}: MotionDivProps & { delay?: number; duration?: number; y?: number; blur?: number; once?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.15 });
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y, filter: `blur(${blur}px)` }}
      transition={{ duration, delay, ease: ease.out }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* ─── ScaleIn ─────────────────────────────────────────────────── */

export function ScaleIn({
  children,
  className,
  delay = 0,
  ...props
}: MotionDivProps & { delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: NORMAL, delay, ease: ease.out }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* ─── Reveal ──────────────────────────────────────────────────── */

export function Reveal({
  children,
  className,
  delay = 0,
  blur = true,
  ...props
}: MotionDivProps & { delay?: number; blur?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        initial={{ y: "100%", filter: blur ? "blur(6px)" : undefined }}
        animate={isInView ? { y: 0, filter: "blur(0px)" } : { y: "100%", filter: blur ? "blur(6px)" : undefined }}
        transition={{ duration: SLOW, delay, ease: ease.out }}
        {...props}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─── BlurReveal ──────────────────────────────────────────────── */

export function BlurReveal({
  children,
  className,
  delay = 0,
  y = 16,
  ...props
}: MotionDivProps & { delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, filter: "blur(10px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y, filter: "blur(10px)" }}
      transition={{ duration: NORMAL, delay, ease: ease.out }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* ─── ParallaxContainer ───────────────────────────────────────── */

export function ParallaxContainer({
  children,
  className,
  speed = 0.5,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);

  if (reducedMotion) {
    return <div ref={ref} className={cn("relative overflow-hidden", className)}>{children}</div>;
  }

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}

/* ─── StaggerFade ─────────────────────────────────────────────── */

export function StaggerFade({
  children,
  className,
  staggerDelay = 0.06,
  ...props
}: MotionDivProps & { staggerDelay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: staggerDelay } },
        hidden: {},
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* ─── StaggerItem ─────────────────────────────────────────────── */

export function StaggerItem({
  children,
  className,
  ...props
}: MotionDivProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: NORMAL, ease: ease.out } },
        hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* ─── SectionContainer ────────────────────────────────────────── */

export function SectionContainer({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("relative scroll-mt-16 py-20 sm:py-28 lg:py-36", className)}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

/* ─── SectionTitle ────────────────────────────────────────────── */

export function SectionTitle({
  label,
  title,
  subtitle,
  className,
}: {
  label?: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-12 sm:mb-16 lg:mb-20 text-center lg:text-left", className)}>
      {label && (
        <FadeIn delay={0} blur={4} y={8}>
          <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-white/20 mb-4">
            {label}
          </span>
        </FadeIn>
      )}
      <Reveal delay={0.1}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.0] sm:leading-[0.92] md:leading-[0.88]">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <FadeIn delay={0.2} y={10} blur={4}>
          <p className="mt-4 sm:mt-5 mx-auto lg:mx-0 max-w-xl text-sm sm:text-base lg:text-lg text-white/35 leading-relaxed">
            {subtitle}
          </p>
        </FadeIn>
      )}
    </div>
  );
}
