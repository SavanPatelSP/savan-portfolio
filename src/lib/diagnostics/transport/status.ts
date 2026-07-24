export type TransportStatus = "idle" | "sending" | "sent" | "failed";

interface ProviderStatus {
  status: TransportStatus;
  lastSentAt: string | null;
  lastError: string | null;
  totalSent: number;
  totalFailed: number;
}

const statusMap = new Map<string, ProviderStatus>();

function getOrCreateStatus(providerId: string): ProviderStatus {
  let status = statusMap.get(providerId);
  if (!status) {
    status = {
      status: "idle",
      lastSentAt: null,
      lastError: null,
      totalSent: 0,
      totalFailed: 0,
    };
    statusMap.set(providerId, status);
  }
  return status;
}

export function updateStatus(
  providerId: string,
  status: TransportStatus
): void {
  const providerStatus = getOrCreateStatus(providerId);
  providerStatus.status = status;
}

export function recordSuccess(providerId: string): void {
  const providerStatus = getOrCreateStatus(providerId);
  providerStatus.status = "sent";
  providerStatus.lastSentAt = new Date().toISOString();
  providerStatus.totalSent += 1;
  providerStatus.lastError = null;
}

export function recordFailure(
  providerId: string,
  error?: string
): void {
  const providerStatus = getOrCreateStatus(providerId);
  providerStatus.status = "failed";
  providerStatus.lastError = error || "Unknown error";
  providerStatus.totalFailed += 1;
}

export function getStatus(
  providerId: string
): ProviderStatus {
  return { ...getOrCreateStatus(providerId) };
}

export function getAllStatuses(): Record<string, ProviderStatus> {
  const result: Record<string, ProviderStatus> = {};
  for (const [id, status] of statusMap) {
    result[id] = { ...status };
  }
  return result;
}

export function resetStatus(providerId: string): void {
  statusMap.delete(providerId);
}
