"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { spring, FAST } from "@/lib/motion";

interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  href,
  external,
  disabled,
  children,
  type = "button",
  onClick,
}: ButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  const base =
    "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/20 select-none";

  const variants = {
    primary:
      "bg-white text-black hover:bg-white/90 shadow-lg shadow-white/10 disabled:opacity-50 disabled:cursor-not-allowed",
    secondary:
      "bg-white/[0.04] text-white hover:bg-white/[0.08] border border-white/10 hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed",
    ghost:
      "text-white/40 hover:text-white hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed",
    outline:
      "border border-white/10 text-white hover:bg-white/5 hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm min-h-[44px]",
    md: "px-6 py-3 text-sm min-h-[44px]",
    lg: "px-8 py-3.5 text-base min-h-[48px]",
  };

  const cls = cn(base, "group", variants[variant], sizes[size], className);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const content = (
    <>
      <span className="relative z-[1]">{children}</span>
      {/* Radial hover glow */}
      <span
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          left: position.x,
          top: position.y,
          width: Math.max(ref.current?.offsetWidth || 100) * 1.5,
          paddingBottom: Math.max(ref.current?.offsetWidth || 100) * 1.5,
        }}
      />
    </>
  );

  const motionProps = {
    whileHover: { scale: 1.02, y: -1 },
    whileTap: { scale: 0.97 },
    transition: spring.gentle,
  };

  if (href) {
    return (
      <motion.a
        ref={ref}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={cls}
        onMouseMove={handleMouseMove}
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      className={cls}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}
