const CHARS = "0123456789ABCDEF";

export function generateHex(length: number): string {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return result;
}

export function formatDate(date: Date): string {
  return date.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatDateCompact(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}${m}${d}`;
}

export function getCurrentRoute(): string {
  if (typeof window === "undefined") return "/";
  return window.location.pathname;
}

export function safeExecute<T>(fn: () => T, fallback: T): T {
  try {
    return fn();
  } catch {
    return fallback;
  }
}

export function deepFreeze<T extends object>(obj: T): T {
  Object.freeze(obj);
  for (const key of Object.keys(obj) as Array<keyof T>) {
    const val = obj[key];
    if (
      val !== null &&
      typeof val === "object" &&
      !Object.isFrozen(val)
    ) {
      deepFreeze(val as object);
    }
  }
  return obj;
}
