import { safeExecute } from "../utils";

export function collectBrowserInfo(): string {
  return safeExecute(() => {
    if (typeof navigator === "undefined") return "Unknown";
    const ua = navigator.userAgent;
    if (ua.includes("Firefox/"))
      return `Firefox ${ua.split("Firefox/")[1]?.split(" ")[0] || ""}`;
    if (ua.includes("Edg/"))
      return `Edge ${ua.split("Edg/")[1]?.split(" ")[0] || ""}`;
    if (ua.includes("Chrome/"))
      return `Chrome ${ua.split("Chrome/")[1]?.split(" ")[0] || ""}`;
    if (ua.includes("Safari/") && !ua.includes("Chrome"))
      return `Safari ${ua.split("Version/")[1]?.split(" ")[0] || ""}`;
    return "Unknown Browser";
  }, "Unknown Browser");
}

export function collectBrowserVersion(): string {
  return safeExecute(() => {
    if (typeof navigator === "undefined") return "Unknown";
    const ua = navigator.userAgent;
    if (ua.includes("Firefox/"))
      return ua.split("Firefox/")[1]?.split(" ")[0] || "Unknown";
    if (ua.includes("Edg/"))
      return ua.split("Edg/")[1]?.split(" ")[0] || "Unknown";
    if (ua.includes("Chrome/"))
      return ua.split("Chrome/")[1]?.split(" ")[0] || "Unknown";
    if (ua.includes("Safari/") && !ua.includes("Chrome"))
      return ua.split("Version/")[1]?.split(" ")[0] || "Unknown";
    return "Unknown";
  }, "Unknown");
}
