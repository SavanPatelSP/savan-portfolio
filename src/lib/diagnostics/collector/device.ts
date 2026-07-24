import { safeExecute } from "../utils";

export function collectOS(): string {
  return safeExecute(() => {
    if (typeof navigator === "undefined") return "Unknown";
    const ua = navigator.userAgent;
    if (ua.includes("Win")) return "Windows";
    if (ua.includes("Mac")) return "macOS";
    if (ua.includes("Linux")) return "Linux";
    if (ua.includes("Android")) return "Android";
    if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
    return "Unknown OS";
  }, "Unknown OS");
}

export function collectDevice(): string {
  return safeExecute(() => {
    if (typeof navigator === "undefined") return "Unknown";
    const ua = navigator.userAgent;
    if (/iPad/.test(ua)) return "iPad";
    if (/iPhone/.test(ua)) return "iPhone";
    if (/Android/.test(ua)) return "Android Device";
    if (/Mac/.test(ua)) return "Mac";
    if (/Windows/.test(ua)) return "Windows PC";
    if (/Linux/.test(ua)) return "Linux Device";
    return "Unknown Device";
  }, "Unknown Device");
}
