"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, RefreshCw, ChevronDown, AlertTriangle, Copy, Check,
  Info, Lightbulb, Shield, Code,
} from "lucide-react";

type ErrorCategory =
  | "module-loading"
  | "chunk-loading"
  | "hydration"
  | "network"
  | "runtime"
  | "server"
  | "permission"
  | "unknown";

interface ErrorClassification {
  category: ErrorCategory;
  label: string;
  summary: string;
  likelyCauses: string[];
  suggestedResolution: string[];
  severity: "recoverable" | "transient" | "critical";
}

function generateErrorId(): string {
  const chars = "0123456789ABCDEF";
  let id = "";
  for (let i = 0; i < 8; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return `SPNET-${id}`;
}

function getBrowserInfo(): string {
  if (typeof navigator === "undefined") return "Unknown";
  const ua = navigator.userAgent;
  if (ua.includes("Firefox/")) return `Firefox ${ua.split("Firefox/")[1]?.split(" ")[0] || ""}`;
  if (ua.includes("Edg/")) return `Edge ${ua.split("Edg/")[1]?.split(" ")[0] || ""}`;
  if (ua.includes("Chrome/")) return `Chrome ${ua.split("Chrome/")[1]?.split(" ")[0] || ""}`;
  if (ua.includes("Safari/") && !ua.includes("Chrome")) return `Safari ${ua.split("Version/")[1]?.split(" ")[0] || ""}`;
  return "Unknown Browser";
}

function getOSInfo(): string {
  if (typeof navigator === "undefined") return "Unknown";
  const ua = navigator.userAgent;
  if (ua.includes("Win")) return "Windows";
  if (ua.includes("Mac")) return "macOS";
  if (ua.includes("Linux")) return "Linux";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
  return "Unknown OS";
}

function classifyError(message: string, stack?: string): ErrorClassification {
  const msg = message.toLowerCase();
  const stackStr = (stack || "").toLowerCase();

  if (msg.includes("module") && (msg.includes("factory") || msg.includes("not available") || msg.includes("is not defined") || msg.includes("cannot be imported"))) {
    return {
      category: "module-loading",
      label: "Module Loading Error",
      summary: "A required JavaScript module could not be loaded. This typically happens when the browser is using an outdated cached version of the application after a deployment.",
      likelyCauses: [
        "Browser cache holding stale JavaScript bundles",
        "Recent deployment changed module paths",
        "Service Worker serving outdated assets",
        "Hot Module Replacement conflict during development",
      ],
      suggestedResolution: [
        "Refresh the page to load the latest version",
        "Clear browser cache and hard reload (Ctrl+Shift+R)",
        "If the problem persists, wait a moment and try again",
      ],
      severity: "recoverable",
    };
  }

  if (msg.includes("chunk") && (msg.includes("load") || msg.includes("failed") || msg.includes("error"))) {
    return {
      category: "chunk-loading",
      label: "Chunk Loading Error",
      summary: "The browser tried to load a JavaScript file that is no longer available. This usually happens after a new deployment while the old page is still open.",
      likelyCauses: [
        "New deployment invalidated old JavaScript chunks",
        "Cached JavaScript bundle is outdated",
        "Network interruption during resource loading",
      ],
      suggestedResolution: [
        "Refresh the page to load the updated assets",
        "Close other tabs and try again",
      ],
      severity: "recoverable",
    };
  }

  if (msg.includes("hydrat")) {
    return {
      category: "hydration",
      label: "Hydration Error",
      summary: "The server-rendered HTML does not match what React expected to render in the browser. This is usually a non-critical rendering mismatch.",
      likelyCauses: [
        "Server and client rendered different HTML",
        "Browser extensions modifying the DOM",
        "Dynamic values that differ between server and client",
      ],
      suggestedResolution: [
        "Refresh the page — this often resolves automatically",
        "Disable browser extensions that modify page content",
      ],
      severity: "recoverable",
    };
  }

  if (msg.includes("network") || msg.includes("fetch") || msg.includes("econnrefused") || msg.includes("Failed to fetch")) {
    return {
      category: "network",
      label: "Network Error",
      summary: "The application could not communicate with a required service. Check your internet connection and try again.",
      likelyCauses: [
        "Internet connection is unavailable or unstable",
        "Backend service is temporarily unavailable",
        "Firewall or security software blocking the request",
      ],
      suggestedResolution: [
        "Check your internet connection",
        "Try again in a few moments",
        "If the problem persists, the service may be temporarily down",
      ],
      severity: "transient",
    };
  }

  if (msg.includes("typeerror") || msg.includes("referenceerror") || msg.includes("syntaxerror") || stackStr.includes("typeerror") || stackStr.includes("referenceerror")) {
    return {
      category: "runtime",
      label: "Runtime Exception",
      summary: "The application encountered an unexpected state during execution. This is an internal error that has been logged for investigation.",
      likelyCauses: [
        "Unexpected application state",
        "Race condition between components",
        "Third-party script interference",
      ],
      suggestedResolution: [
        "Refresh the page — this often resolves the issue",
        "If the problem continues, report the Error ID below",
      ],
      severity: "recoverable",
    };
  }

  if (msg.includes("500") || msg.includes("502") || msg.includes("503") || msg.includes("internal server") || msg.includes("server")) {
    return {
      category: "server",
      label: "Server Error",
      summary: "The server encountered an error while processing the request. This is a temporary issue on our end.",
      likelyCauses: [
        "Server is temporarily overloaded",
        "Backend service encountered an error",
        "Configuration issue on the server",
      ],
      suggestedResolution: [
        "Try again in a few moments",
        "If the problem persists, the issue is being investigated",
      ],
      severity: "transient",
    };
  }

  if (msg.includes("permission") || msg.includes("403") || msg.includes("unauthorized") || msg.includes("forbidden")) {
    return {
      category: "permission",
      label: "Permission Error",
      summary: "You do not have permission to access this resource. This may require authentication or specific access rights.",
      likelyCauses: [
        "Session has expired",
        "Insufficient permissions for this resource",
        "Access requires authentication",
      ],
      suggestedResolution: [
        "Try refreshing the page",
        "Return to the homepage and navigate from there",
      ],
      severity: "recoverable",
    };
  }

  return {
    category: "unknown",
    label: "Unknown Error",
    summary: "An unexpected error occurred. The technical details below can help identify the cause.",
    likelyCauses: [
      "An internal application error",
      "Unexpected system state",
    ],
    suggestedResolution: [
      "Refresh the page to try again",
      "If the problem continues, report the Error ID below",
    ],
    severity: "recoverable",
  };
}

function ErrorIllustration() {
  return (
    <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto" aria-hidden="true">
      <div className="absolute inset-0 bg-red-500/[0.04] rounded-full blur-[80px]" />

      <motion.div
        className="absolute top-4 left-8 w-16 h-12 rounded-xl border border-white/[0.06] bg-white/[0.02]"
        animate={{ y: [0, -6, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-12 right-6 w-14 h-10 rounded-xl border border-white/[0.06] bg-white/[0.02]"
        animate={{ y: [0, -8, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div
        className="absolute bottom-12 left-12 w-12 h-12 rounded-xl border border-white/[0.06] bg-white/[0.02]"
        animate={{ y: [0, -5, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute bottom-8 right-10 w-18 h-10 rounded-xl border border-white/[0.06] bg-white/[0.02]"
        animate={{ y: [0, -7, 0], rotate: [0, -2, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-red-500/10 rounded-2xl blur-xl" />
          <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-2xl border border-red-500/15 bg-gradient-to-br from-red-500/[0.06] to-red-500/[0.02] flex items-center justify-center backdrop-blur-sm">
            <AlertTriangle className="h-10 w-10 sm:h-12 sm:w-12 text-red-400/40" />
          </div>
        </div>
      </motion.div>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
        <motion.path d="M40 50 L100 100" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4 4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeOut" }} />
        <motion.path d="M160 50 L100 100" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4 4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeOut", delay: 0.3 }} />
        <motion.path d="M40 150 L100 100" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4 4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeOut", delay: 0.6 }} />
        <motion.path d="M160 150 L100 100" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4 4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeOut", delay: 0.9 }} />
      </svg>
    </div>
  );
}

function TechnicalDetails({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDevOpen, setIsDevOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const details = useMemo(() => {
    const errorId = error.digest || generateErrorId();
    const timestamp = new Date().toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    const timestampFull = new Date().toISOString();
    const route = typeof window !== "undefined" ? window.location.pathname : "/";
    const classification = classifyError(error.message, error.stack);
    const browser = getBrowserInfo();
    const os = getOSInfo();

    return { errorId, timestamp, timestampFull, route, classification, browser, os };
  }, [error.digest, error.message, error.stack]);

  const handleCopy = useCallback(() => {
    const { errorId, timestampFull, route, classification, browser, os } = details;
    const report = `SP NET Error Report

Error ID:
${errorId}

Detected:
${timestampFull}

Route:
${route}

Error Type:
${classification.label}

Severity:
${classification.severity}

Summary:
${classification.summary}

Likely Cause:
${classification.likelyCauses.map((c) => `• ${c}`).join("\n")}

Suggested Resolution:
${classification.suggestedResolution.map((r) => `• ${r}`).join("\n")}

Original Error Message:
${error.message}

Browser: ${browser}
OS: ${os}
Framework: Next.js

Technical Details:
${error.stack || "No stack trace available"}`;

    navigator.clipboard.writeText(report).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [details, error.message, error.stack]);

  const { classification } = details;
  const severityColors: Record<string, string> = {
    recoverable: "text-emerald-400/60 bg-emerald-500/[0.05] border-emerald-500/10",
    transient: "text-amber-400/60 bg-amber-500/[0.05] border-amber-500/10",
    critical: "text-red-400/60 bg-red-500/[0.05] border-red-500/10",
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-8">
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-xs text-white/25 hover:text-white/40 transition-colors mx-auto"
        aria-expanded={isExpanded}
      >
        <span>Technical Details</span>
        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-3 w-3" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] text-left">

              {/* Error Summary — Always Visible */}
              <div className="p-5 border-b border-white/[0.04]">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/25 block mb-1">Error ID</span>
                    <span className="text-xs font-mono text-white/50">{details.errorId}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/25 block mb-1">Detected</span>
                    <span className="text-xs font-mono text-white/50">{details.timestamp}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/25 block mb-1">Route</span>
                    <span className="text-xs font-mono text-white/50 truncate block">{details.route}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/25 block mb-1">Error Type</span>
                    <span className="text-xs font-medium text-white/60">{classification.label}</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-white/[0.04]">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/25">Severity</span>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${severityColors[classification.severity]}`}>
                      {classification.severity.charAt(0).toUpperCase() + classification.severity.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* What Happened */}
              <div className="p-5 border-b border-white/[0.04]">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="h-3.5 w-3.5 text-blue-400/40" />
                  <span className="text-xs font-medium text-white/50">What Happened</span>
                </div>
                <p className="text-sm text-white/35 leading-relaxed">{classification.summary}</p>
              </div>

              {/* Likely Cause */}
              <div className="p-5 border-b border-white/[0.04]">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-3.5 w-3.5 text-amber-400/40" />
                  <span className="text-xs font-medium text-white/50">Likely Cause</span>
                </div>
                <ul className="space-y-2">
                  {classification.likelyCauses.map((cause, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/35">
                      <span className="text-white/15 mt-1.5">•</span>
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Suggested Resolution */}
              <div className="p-5 border-b border-white/[0.04]">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-3.5 w-3.5 text-emerald-400/40" />
                  <span className="text-xs font-medium text-white/50">Suggested Resolution</span>
                </div>
                <ul className="space-y-2">
                  {classification.suggestedResolution.map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/35">
                      <span className="text-white/15 mt-1.5">•</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Developer Details — Collapsed by Default */}
              <div className="border-b border-white/[0.04]">
                <button
                  onClick={() => setIsDevOpen(!isDevOpen)}
                  className="w-full flex items-center justify-between p-5 text-left"
                  aria-expanded={isDevOpen}
                >
                  <div className="flex items-center gap-2">
                    <Code className="h-3.5 w-3.5 text-white/25" />
                    <span className="text-xs font-medium text-white/40">Developer Details</span>
                  </div>
                  <motion.div animate={{ rotate: isDevOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="h-3 w-3 text-white/25" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isDevOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-white/25">Error Message</span>
                        </div>
                        <pre className="text-[11px] font-mono text-white/30 bg-white/[0.02] rounded-lg p-3 overflow-x-auto whitespace-pre-wrap break-all border border-white/[0.04]">
                          {error.message}
                        </pre>

                        {error.stack && (
                          <>
                            <div className="flex items-center justify-between pt-2">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-white/25">Stack Trace</span>
                            </div>
                            <pre className="text-[10px] font-mono text-white/25 bg-white/[0.02] rounded-lg p-3 overflow-x-auto whitespace-pre-wrap break-all max-h-48 border border-white/[0.04]">
                              {error.stack}
                            </pre>
                          </>
                        )}

                        <div className="pt-2 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-white/25">Browser</span>
                            <span className="text-[10px] font-mono text-white/30 truncate ml-4 max-w-[200px]">
                              {details.browser}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-white/25">OS</span>
                            <span className="text-[10px] font-mono text-white/30 truncate ml-4 max-w-[200px]">
                              {details.os}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-white/25">Framework</span>
                            <span className="text-[10px] font-mono text-white/30">Next.js</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Copy Report Button */}
              <div className="p-4">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-[10px] text-white/25 hover:text-white/40 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400/60" />
                      <span className="text-emerald-400/60">Report Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy Error Report</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      console.error(error.digest || "Unknown error");
    } else {
      console.error(error);
    }
  }, [error]);

  const handleRetry = useCallback(() => {
    if (isRetrying) return;
    setIsRetrying(true);
    setTimeout(() => {
      reset();
      setIsRetrying(false);
    }, 600);
  }, [isRetrying, reset]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-black overflow-hidden">
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 60%)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 60%)",
          }}
        />
      </div>

      {/* Center glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-red-500/[0.03] blur-[120px]" aria-hidden="true" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-lg mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <ErrorIllustration />
        </motion.div>

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/15 bg-red-500/[0.05] px-4 py-1.5 mb-6">
            <div className="h-1.5 w-1.5 rounded-full bg-red-400/60 animate-pulse" />
            <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-red-400/60">Error</span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          tabIndex={-1}
        >
          Something went wrong
        </motion.h1>

        {/* Description */}
        <motion.p
          className="mt-4 text-sm sm:text-base text-white/35 leading-relaxed max-w-sm mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Something unexpected interrupted this page. You can safely try again or return to the homepage.
        </motion.p>

        {/* Action buttons */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <button
            onClick={handleRetry}
            disabled={isRetrying}
            className="group relative inline-flex items-center gap-2.5 rounded-xl bg-white/[0.08] border border-white/[0.1] px-7 py-3.5 text-sm font-medium text-white/80 hover:bg-white/[0.12] hover:text-white hover:border-white/[0.15] hover:shadow-[0_0_20px_rgba(59,130,246,0.06)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 min-h-[48px]"
            aria-label="Try again"
          >
            <motion.div
              animate={isRetrying ? { rotate: 360 } : { rotate: 0 }}
              transition={isRetrying ? { duration: 0.8, repeat: Infinity, ease: "linear" } : {}}
            >
              <RefreshCw className="h-4 w-4" />
            </motion.div>
            <span>{isRetrying ? "Retrying..." : "Try Again"}</span>
          </button>

          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 rounded-xl border border-white/[0.08] px-7 py-3.5 text-sm font-medium text-white/50 hover:text-white/80 hover:border-white/[0.15] hover:bg-white/[0.04] hover:shadow-[0_0_20px_rgba(59,130,246,0.04)] transition-all duration-300 min-h-[48px]"
          >
            <Home className="h-4 w-4" />
            <span>Return Home</span>
          </Link>
        </motion.div>

        {/* Technical Details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <TechnicalDetails error={error} />
        </motion.div>
      </motion.div>
    </div>
  );
}
