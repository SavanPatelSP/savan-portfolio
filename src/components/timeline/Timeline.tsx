"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TimelineProps {
  children: ReactNode;
  className?: string;
  layout?: "left" | "centered";
}

export function Timeline({ children, className, layout = "left" }: TimelineProps) {
  return (
    <div
      className={cn(
        "relative",
        layout === "centered" && "max-w-3xl mx-auto",
        className
      )}
      role="list"
    >
      {children}
    </div>
  );
}
