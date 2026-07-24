import type { SessionData, SessionConfig } from "../types/session";
import { generateSessionId } from "../fingerprint/session-id";
import { SESSION_STORAGE_KEY } from "../constants";

const DEFAULT_CONFIG: SessionConfig = {
  maxDuration: 30 * 60 * 1000,
  maxErrors: 50,
  persistAcrossNavigation: true,
};

let currentSession: SessionData | null = null;

function getPageLoadTime(): number {
  if (typeof performance !== "undefined" && performance.timing) {
    return performance.timing.loadEventEnd - performance.timing.navigationStart;
  }
  return 0;
}

function createSession(): SessionData {
  const now = new Date();
  const session: SessionData = {
    sessionId: generateSessionId(),
    startedAt: now.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
    startedAtISO: now.toISOString(),
    pageLoadTime: getPageLoadTime(),
    errorsThisSession: 0,
    recovered: false,
    recoveryAttempts: 0,
    duration: 0,
  };

  currentSession = session;
  persistSession(session);
  return session;
}

function persistSession(session: SessionData): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(
      SESSION_STORAGE_KEY,
      JSON.stringify(session)
    );
  } catch {
    // Storage unavailable or full — silently ignore
  }
}

function loadPersistedSession(): SessionData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SessionData;
  } catch {
    return null;
  }
}

function isSessionExpired(session: SessionData, config: SessionConfig): boolean {
  const start = new Date(session.startedAtISO).getTime();
  const now = Date.now();
  return now - start > config.maxDuration;
}

export function getSession(config?: Partial<SessionConfig>): SessionData {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };

  if (currentSession) {
    if (!isSessionExpired(currentSession, mergedConfig)) {
      return currentSession;
    }
  }

  const persisted = loadPersistedSession();
  if (persisted && !isSessionExpired(persisted, mergedConfig)) {
    currentSession = persisted;
    return persisted;
  }

  return createSession();
}

export function incrementErrorCount(config?: Partial<SessionConfig>): SessionData {
  const session = getSession(config);
  session.errorsThisSession += 1;
  session.duration = Date.now() - new Date(session.startedAtISO).getTime();
  persistSession(session);
  return session;
}

export function markRecovered(): void {
  if (currentSession) {
    currentSession.recovered = true;
    persistSession(currentSession);
  }
}

export function incrementRecoveryAttempts(): void {
  if (currentSession) {
    currentSession.recoveryAttempts += 1;
    persistSession(currentSession);
  }
}

export function resetSession(): SessionData {
  return createSession();
}

export function clearSession(): void {
  currentSession = null;
  if (typeof window !== "undefined") {
    try {
      window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {
      // Silently ignore
    }
  }
}
