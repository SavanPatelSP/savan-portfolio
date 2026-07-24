import { ERROR_ID_PREFIX, ERROR_ID_LENGTH } from "../constants";
import { generateHex, formatDateCompact } from "../utils";

export function generateErrorId(): string {
  const date = formatDateCompact(new Date());
  const random = generateHex(ERROR_ID_LENGTH);
  return `${ERROR_ID_PREFIX}-${date}-${random}`;
}

export function generateShortErrorId(): string {
  const random = generateHex(ERROR_ID_LENGTH);
  return `${ERROR_ID_PREFIX}-${random}`;
}
