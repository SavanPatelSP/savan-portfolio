"use client";

import Link from "next/link";
import { GithubIcon, InstagramIcon, TelegramIcon } from "@/components/ui/Icons";
import { personal } from "@/data/personal";
import { cn } from "@/lib/utils";

/**
 * Author card for blog articles. Uses only public, direct social links
 * (X/LinkedIn are intentionally modal-only in this project and omitted).
 */
const authorSocials = [
  { label: "GitHub", href: personal.social.github, Icon: GithubIcon },
  { label: "Telegram", href: personal.social.telegram, Icon: TelegramIcon },
  { label: "Instagram", href: personal.social.instagram, Icon: InstagramIcon },
];

export function BlogAuthorCard({
  author,
  role,
  className,
}: {
  author: string;
  role: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4 min-w-0", className)}>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/10 ring-1 ring-blue-500/25">
        <span className="text-sm font-semibold text-white/85">
          {personal.initials}
        </span>
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium text-white/85">{author}</p>
        <p className="mt-0.5 text-xs text-white/35">{role}</p>
        <p className="mt-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-blue-400/60">
          {personal.tagline}
        </p>
        <div className="mt-2 flex items-center gap-2.5">
          {authorSocials.map(
            ({ label, href, Icon }) =>
              href && (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${author} on ${label}`}
                  className="text-white/30 transition-colors duration-200 hover:text-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 rounded-md"
                >
                  <Icon className="h-3.5 w-3.5" />
                </Link>
              )
          )}
        </div>
      </div>
    </div>
  );
}
