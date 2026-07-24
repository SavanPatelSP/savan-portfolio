import type {
  RetentionConfig,
  RetentionPolicyType,
  StoredReport,
} from "./storage";

const TAG = "[diagnostics:retention]";

const DEFAULT_RETENTION_CONFIG: RetentionConfig = {
  defaultPolicy: "last-24h",
  cleanupInterval: 60 * 60 * 1000,
  policies: {
    "session-only": {
      type: "session-only",
      maxAge: 30 * 60 * 1000,
      enabled: true,
    },
    "last-100": {
      type: "last-100",
      maxCount: 100,
      enabled: true,
    },
    "last-24h": {
      type: "last-24h",
      maxAge: 24 * 60 * 60 * 1000,
      enabled: true,
    },
    "last-7d": {
      type: "last-7d",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      enabled: true,
    },
    "last-30d": {
      type: "last-30d",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      enabled: true,
    },
    forever: {
      type: "forever",
      enabled: true,
    },
  },
};

let currentConfig: RetentionConfig = { ...DEFAULT_RETENTION_CONFIG };

export function getRetentionConfig(): RetentionConfig {
  return currentConfig;
}

export function updateRetentionConfig(
  partial: Partial<RetentionConfig>
): RetentionConfig {
  currentConfig = { ...currentConfig, ...partial };
  return currentConfig;
}

export function getDefaultRetentionPolicy(): RetentionPolicyType {
  return currentConfig.defaultPolicy;
}

export function shouldRetain(
  stored: StoredReport,
  now?: number
): boolean {
  const policy = currentConfig.policies[stored.retentionPolicy];
  if (!policy || !policy.enabled) return false;
  if (policy.type === "forever") return true;

  const currentTime = now || Date.now();
  const storedTime = new Date(stored.storage.storedAt).getTime();

  if (policy.maxAge !== undefined) {
    const age = currentTime - storedTime;
    if (age > policy.maxAge) return false;
  }

  return true;
}

export function shouldRetainByCount(
  stored: StoredReport,
  rankInCategory: number
): boolean {
  const policy = currentConfig.policies[stored.retentionPolicy];
  if (!policy || !policy.enabled) return false;
  if (policy.type === "forever") return true;
  if (policy.maxCount !== undefined) {
    return rankInCategory < policy.maxCount;
  }
  return true;
}

export function applyRetention(
  reports: readonly StoredReport[],
  now?: number
): StoredReport[] {
  const currentTime = now || Date.now();

  const sorted = [...reports].sort((a, b) => {
    const timeA = new Date(a.storage.storedAt).getTime();
    const timeB = new Date(b.storage.storedAt).getTime();
    return timeB - timeA;
  });

  const retained: StoredReport[] = [];
  const categoryCount = new Map<string, number>();

  for (const report of sorted) {
    const category = report.report.classification.category;
    const currentCount = categoryCount.get(category) || 0;
    categoryCount.set(category, currentCount + 1);

    const agePolicy = currentConfig.policies[report.retentionPolicy];
    if (agePolicy?.maxAge !== undefined) {
      const age = currentTime - new Date(report.storage.storedAt).getTime();
      if (age > agePolicy.maxAge) continue;
    }

    const countPolicy = currentConfig.policies[report.retentionPolicy];
    if (countPolicy?.maxCount !== undefined) {
      if (currentCount >= countPolicy.maxCount) continue;
    }

    retained.push(report);
  }

  return retained;
}

export function getReportsToDelete(
  reports: readonly StoredReport[],
  now?: number
): string[] {
  const currentTime = now || Date.now();
  const toDelete: string[] = [];

  for (const report of reports) {
    if (!shouldRetain(report, currentTime)) {
      toDelete.push(report.report.errorId);
    }
  }

  return toDelete;
}

export function getRetentionSummary(
  reports: readonly StoredReport[],
  now?: number
): {
  total: number;
  retained: number;
  deleted: number;
  byPolicy: Record<RetentionPolicyType, { total: number; retained: number; deleted: number }>;
} {
  const currentTime = now || Date.now();
  const retained = applyRetention(reports, currentTime);
  const deleted = reports.length - retained.length;

  const byPolicy: Record<
    RetentionPolicyType,
    { total: number; retained: number; deleted: number }
  > = {
    "session-only": { total: 0, retained: 0, deleted: 0 },
    "last-100": { total: 0, retained: 0, deleted: 0 },
    "last-24h": { total: 0, retained: 0, deleted: 0 },
    "last-7d": { total: 0, retained: 0, deleted: 0 },
    "last-30d": { total: 0, retained: 0, deleted: 0 },
    forever: { total: 0, retained: 0, deleted: 0 },
  };

  for (const report of reports) {
    const policy = report.retentionPolicy;
    byPolicy[policy].total += 1;
  }

  for (const report of retained) {
    const policy = report.retentionPolicy;
    byPolicy[policy].retained += 1;
  }

  for (const policy of Object.keys(byPolicy) as RetentionPolicyType[]) {
    byPolicy[policy].deleted = byPolicy[policy].total - byPolicy[policy].retained;
  }

  return { total: reports.length, retained: retained.length, deleted, byPolicy };
}

export function logRetentionSummary(
  reports: readonly StoredReport[],
  now?: number
): void {
  const summary = getRetentionSummary(reports, now);
  console.log(
    `${TAG} Retention: ${summary.retained} retained, ${summary.deleted} deleted (total: ${summary.total})`
  );
}
