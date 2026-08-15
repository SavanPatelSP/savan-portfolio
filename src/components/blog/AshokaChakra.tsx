import { cn } from "@/lib/utils";

/**
 * Decorative, Ashoka Chakra-inspired wheel with 24 spokes.
 * Purely ornamental — rendered with `aria-hidden` and, when `animated`,
 * a slow rotation that respects the global reduced-motion preference.
 */
export function AshokaChakra({
  className,
  animated = false,
  strokeWidth = 1,
}: {
  className?: string;
  animated?: boolean;
  strokeWidth?: number;
}) {
  const spokes = Array.from({ length: 24 }, (_, i) => {
    const angle = (i * 360) / 24;
    const rad = (angle * Math.PI) / 180;
    const x1 = 50 - 27 * Math.sin(rad);
    const y1 = 50 - 27 * Math.cos(rad);
    const x2 = 50 - 44 * Math.sin(rad);
    const y2 = 50 - 44 * Math.cos(rad);
    return { x1, y1, x2, y2 };
  });

  return (
    <svg
      viewBox="0 0 100 100"
      className={cn(animated && "animate-[spin-slow_120s_linear_infinite]", className)}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="50" cy="50" r="27" fill="none" stroke="currentColor" strokeWidth={strokeWidth} />
      {spokes.map((s, i) => (
        <line
          key={i}
          x1={s.x1}
          y1={s.y1}
          x2={s.x2}
          y2={s.y2}
          stroke="currentColor"
          strokeWidth={strokeWidth}
        />
      ))}
    </svg>
  );
}
