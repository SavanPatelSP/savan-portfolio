"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const productBuilds: Record<string, { status: "passing" | "building" | "idle"; deployedAt: Date }> = {
  "sp-net-gram": { status: "passing", deployedAt: new Date(Date.now() - 1000 * 60 * 3) },
  "sp-net-admin-os": { status: "building", deployedAt: new Date(Date.now() - 1000 * 60 * 17) },
  "sp-net-ai": { status: "idle", deployedAt: new Date(Date.now() - 1000 * 60 * 60 * 2) },
};

const statusConfig = {
  passing: { label: "Build passing", dot: "bg-emerald-400", pulse: "bg-emerald-400/40" },
  building: { label: "Building...", dot: "bg-amber-400", pulse: "bg-amber-400/40" },
  idle: { label: "No recent builds", dot: "bg-white/20", pulse: "bg-white/10" },
};

function RelativeTime({ date }: { date: Date }) {
  const [text, setText] = useState("");

  useEffect(() => {
    const update = () => {
      const diff = Date.now() - date.getTime();
      const mins = Math.floor(diff / 60000);
      const hrs = Math.floor(mins / 60);
      const days = Math.floor(hrs / 24);
      if (mins < 1) setText("just now");
      else if (mins < 60) setText(`${mins}m ago`);
      else if (hrs < 24) setText(`${hrs}h ago`);
      else setText(`${days}d ago`);
    };
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, [date]);

  return <span className="tabular-nums">{text}</span>;
}

export function LiveStatus({ productId, className }: { productId: string; className?: string }) {
  const build = productBuilds[productId];
  if (!build) return null;

  const cfg = statusConfig[build.status];

  return (
    <motion.div
      className={cn("flex items-center gap-2.5 text-[11px] text-white/20", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Build status dot */}
      <div className="relative flex items-center justify-center">
        <div className={cn("h-1.5 w-1.5 rounded-full", cfg.dot)} />
        <div
          className={cn(
            "absolute h-3 w-3 rounded-full animate-ping",
            cfg.pulse
          )}
          style={{ animationDuration: "2.5s" }}
        />
      </div>

      {/* Status text */}
      <span className="font-mono">{cfg.label}</span>

      {/* Deploy timestamp */}
      <span className="font-mono text-white/12">
        · deployed <RelativeTime date={build.deployedAt} />
      </span>
    </motion.div>
  );
}
