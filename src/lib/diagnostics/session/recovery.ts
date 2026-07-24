import type { RecoveryAttempt } from "../types/session";
import { markRecovered, incrementRecoveryAttempts } from "./session";

const recoveryHistory: RecoveryAttempt[] = [];

export function attemptRecovery(
  errorId: string,
  method: RecoveryAttempt["method"] = "retry"
): RecoveryAttempt {
  const attempt: RecoveryAttempt = {
    timestamp: new Date().toISOString(),
    errorId,
    success: false,
    method,
  };

  recoveryHistory.push(attempt);
  incrementRecoveryAttempts();

  return attempt;
}

export function recordRecoverySuccess(errorId: string): void {
  const attempt = recoveryHistory.findLast(
    (a) => a.errorId === errorId && !a.success
  );
  if (attempt) {
    attempt.success = true;
  }
  markRecovered();
}

export function getRecoveryHistory(): readonly RecoveryAttempt[] {
  return [...recoveryHistory];
}

export function clearRecoveryHistory(): void {
  recoveryHistory.length = 0;
}
