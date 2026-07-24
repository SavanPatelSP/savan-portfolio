import type { ErrorCategory, ErrorSeverity, ErrorClassification } from "../types/diagnostics";

interface ClassificationRule {
  category: ErrorCategory;
  label: string;
  summary: string;
  likelyCauses: string[];
  suggestedResolution: string[];
  severity: ErrorSeverity;
  match: (message: string, stack: string) => boolean;
}

const CLASSIFICATION_RULES: ClassificationRule[] = [
  {
    category: "module-loading",
    label: "Module Loading Error",
    summary:
      "A required JavaScript module could not be loaded. This typically happens when the browser is using an outdated cached version of the application after a deployment.",
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
    match: (msg) =>
      msg.includes("module") &&
      (msg.includes("factory") ||
        msg.includes("not available") ||
        msg.includes("is not defined") ||
        msg.includes("cannot be imported")),
  },
  {
    category: "chunk-loading",
    label: "Chunk Loading Error",
    summary:
      "The browser tried to load a JavaScript file that is no longer available. This usually happens after a new deployment while the old page is still open.",
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
    match: (msg) =>
      msg.includes("chunk") &&
      (msg.includes("load") || msg.includes("failed") || msg.includes("error")),
  },
  {
    category: "hydration",
    label: "Hydration Error",
    summary:
      "The server-rendered HTML does not match what React expected to render in the browser. This is usually a non-critical rendering mismatch.",
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
    match: (msg) => msg.includes("hydrat"),
  },
  {
    category: "network",
    label: "Network Error",
    summary:
      "The application could not communicate with a required service. Check your internet connection and try again.",
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
    match: (msg) =>
      msg.includes("network") ||
      msg.includes("fetch") ||
      msg.includes("econnrefused") ||
      msg.includes("failed to fetch"),
  },
  {
    category: "runtime",
    label: "Runtime Exception",
    summary:
      "The application encountered an unexpected state during execution. This is an internal error that has been logged for investigation.",
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
    match: (msg, stack) =>
      msg.includes("typeerror") ||
      msg.includes("referenceerror") ||
      msg.includes("syntaxerror") ||
      stack.includes("typeerror") ||
      stack.includes("referenceerror"),
  },
  {
    category: "server",
    label: "Server Error",
    summary:
      "The server encountered an error while processing the request. This is a temporary issue on our end.",
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
    match: (msg) =>
      msg.includes("500") ||
      msg.includes("502") ||
      msg.includes("503") ||
      msg.includes("internal server") ||
      msg.includes("server"),
  },
  {
    category: "permission",
    label: "Permission Error",
    summary:
      "You do not have permission to access this resource. This may require authentication or specific access rights.",
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
    match: (msg) =>
      msg.includes("permission") ||
      msg.includes("403") ||
      msg.includes("unauthorized") ||
      msg.includes("forbidden"),
  },
];

const DEFAULT_CLASSIFICATION: ErrorClassification = {
  category: "unknown",
  label: "Unknown Error",
  summary:
    "An unexpected error occurred. The technical details below can help identify the cause.",
  likelyCauses: ["An internal application error", "Unexpected system state"],
  suggestedResolution: [
    "Refresh the page to try again",
    "If the problem continues, report the Error ID below",
  ],
  severity: "recoverable",
};

export function classifyError(
  message: string,
  stack?: string
): ErrorClassification {
  const msg = message.toLowerCase();
  const stackStr = (stack || "").toLowerCase();

  for (const rule of CLASSIFICATION_RULES) {
    if (rule.match(msg, stackStr)) {
      const { match: _, ...classification } = rule;
      return classification;
    }
  }

  return DEFAULT_CLASSIFICATION;
}
