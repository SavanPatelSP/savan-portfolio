/* ─── Premium Motion Design System ───────────────────────────── */

// Duration presets (seconds)
export const FAST = 0.18;
export const NORMAL = 0.28;
export const SLOW = 0.45;
export const PAGE = 0.6;

// Easing curves
export const ease = {
  /** Premium deceleration — feels like settling */
  out: [0.16, 1, 0.3, 1] as const,
  /** Smooth standard — general purpose */
  standard: [0.25, 0.1, 0.25, 1] as const,
  /** Slightly springy — for playful elements */
  playful: [0.34, 1.56, 0.64, 1] as const,
};

// Spring presets
export const spring = {
  /** Gentle spring — hover effects */
  gentle: { type: "spring" as const, stiffness: 300, damping: 20, mass: 0.8 },
  /** Snappy spring — tabs, toggles */
  snappy: { type: "spring" as const, stiffness: 400, damping: 25, mass: 0.6 },
  /** Bouncy spring — playful accents */
  bouncy: { type: "spring" as const, stiffness: 200, damping: 12, mass: 0.8 },
  /** Smooth spring — page transitions */
  smooth: { type: "spring" as const, stiffness: 120, damping: 20, mass: 1 },
  /** Heavy spring — card returns */
  heavy: { type: "spring" as const, stiffness: 180, damping: 18, mass: 1.2 },
};

// Stagger timing
export const stagger = {
  /** Quick stagger — small item lists */
  fast: 0.04,
  /** Standard stagger — card grids, nav items */
  normal: 0.06,
  /** Slow stagger — large section reveals */
  slow: 0.1,
};

// Section reveal config
export const reveal = {
  initial: { opacity: 0, y: 24, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: SLOW, ease: ease.out },
};

// Card hover config
export const cardHover = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
    borderColor: "rgba(255,255,255,0.04)",
  },
  hover: {
    y: -4,
    scale: 1.005,
    boxShadow: "0 16px 48px -12px rgba(0,0,0,0.35), 0 0 32px -16px rgba(59,130,246,0.06)",
    borderColor: "rgba(255,255,255,0.08)",
  },
  transition: {
    ...spring.heavy,
    borderColor: { duration: NORMAL },
  },
};

// Button interaction config
export const buttonPress = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.015, y: -1 },
  press: { scale: 0.98 },
};

// Interaction states (for CSS-based buttons)
export const interaction = {
  hover: {
    y: -1,
    transition: { duration: FAST, ease: ease.out },
  },
  press: {
    scale: 0.98,
    transition: { duration: FAST, ease: ease.out },
  },
  disabled: {
    opacity: 0.4,
    pointerEvents: "none" as const,
  },
};

// Focus ring config
export const focusRing = {
  style: {
    outline: "2px solid rgba(59,130,246,0.4)",
    outlineOffset: "2px",
  },
};
