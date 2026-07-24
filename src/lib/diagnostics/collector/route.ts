import { safeExecute, getCurrentRoute } from "../utils";

export function collectRoute(): string {
  return safeExecute(getCurrentRoute, "/");
}
