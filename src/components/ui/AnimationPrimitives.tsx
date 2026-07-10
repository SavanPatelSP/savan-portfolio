"use client";

import { useRef, ReactNode, useState } from "react";
import { motion, useInView, useScroll, useTransform, useReducedMotion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type MotionDivProps = Omit<HTMLMotionProps<"div">, "children"> & { children?: ReactNode };

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  y = 20,
  once = true,
  ...props
}: MotionDivProps & { delay?: number; duration?: number; y?: number; once?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.2 });
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({
  children,
  className,
  delay = 0,
  ...props
}: MotionDivProps & { delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
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
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
  ...props
}: MotionDivProps & { delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
        {...props}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function BlurReveal({
  children,
  className,
  delay = 0,
  ...props
}: MotionDivProps & { delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, filter: "blur(12px)" }}
      animate={isInView ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(12px)" }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function MaskReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  ...props
}: MotionDivProps & { delay?: number; direction?: "up" | "down" | "left" | "right" }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const reducedMotion = useReducedMotion();

  const initialMask = {
    up: "inset(100% 0% 0% 0%)",
    down: "inset(0% 0% 100% 0%)",
    left: "inset(0% 100% 0% 0%)",
    right: "inset(0% 0% 0% 100%)",
  }[direction];

  const animateMask = "inset(0% 0% 0% 0%)";

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        initial={{ clipPath: initialMask }}
        animate={isInView ? { clipPath: animateMask } : { clipPath: initialMask }}
        transition={{ duration: 1, delay, ease: [0.25, 0.1, 0.25, 1] }}
        {...props}
      >
        {children}
      </motion.div>
    </div>
  );
}

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

export function MagneticButton({
  children,
  className,
  as: Component = "button",
  ...props
}: {
  children: ReactNode;
  className?: string;
  as?: "button" | "a";
} & Record<string, unknown>) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    setPosition({ x, y });
  };

  const handleLeave = () => setPosition({ x: 0, y: 0 });

  const inner = Component === "button" ? (
    <button {...(props as React.ComponentPropsWithoutRef<"button">)}>
      {children}
    </button>
  ) : (
    <a {...(props as React.ComponentPropsWithoutRef<"a">)}>
      {children}
    </a>
  );

  if (reducedMotion) {
    return (
      <div ref={ref} className={cn("inline-block", className)}>
        {inner}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn("inline-block", className)}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
    >
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.5 }}
      >
        {inner}
      </motion.div>
    </div>
  );
}

export function StaggerFade({
  children,
  className,
  staggerDelay = 0.08,
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
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
        hidden: { opacity: 0, y: 20 },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

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
    <section id={id} className={cn("relative py-28 sm:py-36", className)}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

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
        <FadeIn delay={0}>
          <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-white/20 mb-4">
            {label}
          </span>
        </FadeIn>
      )}
      <Reveal delay={0.1}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[0.92] sm:leading-[0.88]">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <FadeIn delay={0.2} y={10}>
          <p className="mt-4 sm:mt-5 mx-auto lg:mx-0 max-w-xl text-sm sm:text-base lg:text-lg text-white/35 leading-relaxed">
            {subtitle}
          </p>
        </FadeIn>
      )}
    </div>
  );
}
