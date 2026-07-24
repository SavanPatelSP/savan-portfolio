import { generateHex } from "../utils";

const SESSION_ID_LENGTH = 16;

export function generateSessionId(): string {
  return generateHex(SESSION_ID_LENGTH);
}

export function isSessionValid(sessionId: string): boolean {
  return typeof sessionId === "string" && sessionId.length === SESSION_ID_LENGTH;
}
