"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { VersionBadge } from "@/components/downloads/VersionBadge";
import { PlatformBadge } from "@/components/downloads/PlatformBadge";
import { DOWNLOAD_PLATFORMS, type DownloadProduct } from "@/data/downloads";
import { ease, NORMAL, spring } from "@/lib/motion";

export function ProductCard({
  product,
  index = 0,
}: {
  product: DownloadProduct;
  index?: number;
}) {
  const supportedPlatforms = DOWNLOAD_PLATFORMS.filter((p) =>
    product.platforms.includes(p.id)
  ).slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.06,
        duration: NORMAL,
        ease: ease.out,
      }}
    >
      <Link
        href={product.downloadUrl}
        className="group block rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 sm:p-6 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300 h-full"
      >
        <div className="flex items-start justify-between mb-4">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br border border-white/[0.06]",
              product.gradient
            )}
          >
            <Download className="h-4 w-4 text-white/80" />
          </div>
          <VersionBadge
            version={product.version}
            channel={product.releaseChannel}
            size="xs"
          />
        </div>

        <h3 className="text-base font-medium text-white/70 mb-1.5 group-hover:text-white/90 transition-colors duration-200">
          {product.name}
        </h3>
        <p className="text-xs text-white/25 leading-relaxed mb-4 line-clamp-2">
          {product.tagline}
        </p>

        <div className="flex items-center gap-1.5 mb-4 flex-wrap">
          {supportedPlatforms.map((p) => (
            <PlatformBadge
              key={p.id}
              platformId={p.id}
              name={p.name}
              icon={p.icon}
              support={p.support}
            />
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
          <div className="flex items-center gap-3 text-[10px] font-mono text-white/15">
            <span>{product.releaseDate}</span>
            <span className="text-white/8">·</span>
            <span>{product.fileSize}</span>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-white/25 group-hover:text-white/50 transition-colors duration-200">
            View
            <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform duration-200" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
