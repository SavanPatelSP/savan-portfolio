import { cn } from "@/lib/utils";

interface IconProps {
  className?: string;
}

export function GithubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cn("h-4 w-4", className)} aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cn("h-4 w-4", className)} aria-hidden="true">
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46L20 4" />
    </svg>
  );
}

export function LinkedinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cn("h-4 w-4", className)} aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function TelegramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cn("h-4 w-4", className)} aria-hidden="true">
      <circle cx="12" cy="12" r="10.5" />
      <path d="M5.4319,11.8733 C8.9301,10.3492 11.2628,9.3444 12.4300,8.8589 C15.7625,7.4728 16.4550,7.2320 16.9064,7.2240 C17.0056,7.2223 17.2276,7.2469 17.3714,7.3636 C17.4928,7.4621 17.5262,7.5952 17.5421,7.6886 C17.5581,7.7820 17.5780,7.9947 17.5622,8.1610 C17.3816,10.0585 16.6002,14.6632 16.2027,16.7884 C16.0344,17.6876 15.7032,17.9891 15.3826,18.0186 C14.6857,18.0828 14.1565,17.5581 13.4816,17.1157 C12.4254,16.4234 11.8288,15.9924 10.8036,15.3168 C9.6188,14.5361 10.3869,14.1069 11.0621,13.4056 C11.2388,13.2221 14.3092,10.4294 14.3686,10.1760 C14.3760,10.1443 14.3829,10.0262 14.3128,9.9639 C14.2426,9.9015 14.1390,9.9228 14.0643,9.9398 C13.9584,9.9638 12.2711,11.0790 9.0026,13.2853 C8.5237,13.6142 8.0899,13.7744 7.7013,13.7660 C7.2728,13.7568 6.4486,13.5238 5.8359,13.3246 C5.0844,13.0803 4.4871,12.9512 4.5392,12.5363 C4.5662,12.3202 4.8638,12.0992 5.4319,11.8733 Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cn("h-4 w-4", className)} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
