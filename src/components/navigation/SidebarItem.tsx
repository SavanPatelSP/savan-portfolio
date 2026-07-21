"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { NavigationItem } from "@/data/navigation/types";

export function SidebarItem({
  item,
  href,
  isActive,
  onClose,
}: {
  item: NavigationItem;
  href: string;
  isActive: boolean;
  onClose?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 text-[13px] rounded-lg transition-all duration-200 min-h-[32px] leading-normal",
        isActive
          ? "text-white/80 bg-white/[0.06] font-medium"
          : "text-white/30 hover:text-white/50 hover:bg-white/[0.02]"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {item.icon && (
        <item.icon className="h-3.5 w-3.5 shrink-0 opacity-60" />
      )}
      <span className="flex-1 min-w-0">{item.title}</span>
      {item.badge && (
        <span className="text-[10px] font-mono text-white/20 bg-white/[0.04] border border-white/[0.06] rounded px-1.5 py-0.5 shrink-0">
          {item.badge}
        </span>
      )}
    </Link>
  );
}
