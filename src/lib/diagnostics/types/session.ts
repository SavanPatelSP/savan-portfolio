export interface SessionData {
  sessionId: string;
  startedAt: string;
  startedAtISO: string;
  pageLoadTime: number;
  errorsThisSession: number;
  recovered: boolean;
  recoveryAttempts: number;
  duration: number;
}

export interface SessionConfig {
  maxDuration: number;
  maxErrors: number;
  persistAcrossNavigation: boolean;
}

export interface RecoveryAttempt {
  timestamp: string;
  errorId: string;
  success: boolean;
  method: "retry" | "navigation" | "reload";
}
