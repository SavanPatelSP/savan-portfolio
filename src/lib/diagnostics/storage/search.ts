import type {
  SearchQuery,
  SearchResult,
  StoredReport,
} from "./storage";

export function searchReports(
  reports: readonly StoredReport[],
  query: SearchQuery
): SearchResult {
  let filtered = [...reports];

  if (query.errorId) {
    filtered = filtered.filter((r) => r.report.errorId === query.errorId);
  }

  if (query.sessionId) {
    filtered = filtered.filter(
      (r) => r.report.session.sessionId === query.sessionId
    );
  }

  if (query.category) {
    filtered = filtered.filter(
      (r) => r.report.classification.category === query.category
    );
  }

  if (query.severity) {
    filtered = filtered.filter(
      (r) => r.report.classification.severity === query.severity
    );
  }

  if (query.route) {
    filtered = filtered.filter((r) => r.report.route === query.route);
  }

  if (query.fingerprint) {
    filtered = filtered.filter(
      (r) => r.correlation.fingerprint === query.fingerprint
    );
  }

  if (query.from) {
    const fromDate = new Date(query.from).getTime();
    filtered = filtered.filter(
      (r) => new Date(r.report.timestamp).getTime() >= fromDate
    );
  }

  if (query.to) {
    const toDate = new Date(query.to).getTime();
    filtered = filtered.filter(
      (r) => new Date(r.report.timestamp).getTime() <= toDate
    );
  }

  const total = filtered.length;

  const sortBy = query.sortBy || "timestamp";
  const sortOrder = query.sortOrder || "desc";

  filtered.sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "timestamp": {
        const timeA = new Date(a.report.timestamp).getTime();
        const timeB = new Date(b.report.timestamp).getTime();
        comparison = timeA - timeB;
        break;
      }
      case "severity": {
        const severityOrder = { critical: 3, transient: 2, recoverable: 1 };
        const orderA = severityOrder[a.report.classification.severity] || 0;
        const orderB = severityOrder[b.report.classification.severity] || 0;
        comparison = orderA - orderB;
        break;
      }
      case "occurrenceCount": {
        comparison = a.correlation.occurrenceCount - b.correlation.occurrenceCount;
        break;
      }
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });

  const limit = query.limit || 50;
  const offset = query.offset || 0;
  const paginated = filtered.slice(offset, offset + limit);

  return {
    reports: Object.freeze(paginated),
    total,
    hasMore: offset + limit < total,
  };
}

export function findByErrorId(
  reports: readonly StoredReport[],
  errorId: string
): StoredReport | null {
  return reports.find((r) => r.report.errorId === errorId) || null;
}

export function findBySession(
  reports: readonly StoredReport[],
  sessionId: string
): readonly StoredReport[] {
  return Object.freeze(
    reports.filter((r) => r.report.session.sessionId === sessionId)
  );
}

export function findByCategory(
  reports: readonly StoredReport[],
  category: string
): readonly StoredReport[] {
  return Object.freeze(
    reports.filter((r) => r.report.classification.category === category)
  );
}

export function findBySeverity(
  reports: readonly StoredReport[],
  severity: string
): readonly StoredReport[] {
  return Object.freeze(
    reports.filter((r) => r.report.classification.severity === severity)
  );
}

export function findByRoute(
  reports: readonly StoredReport[],
  route: string
): readonly StoredReport[] {
  return Object.freeze(reports.filter((r) => r.report.route === route));
}

export function findByFingerprint(
  reports: readonly StoredReport[],
  fingerprint: string
): readonly StoredReport[] {
  return Object.freeze(
    reports.filter((r) => r.correlation.fingerprint === fingerprint)
  );
}

export function findRecent(
  reports: readonly StoredReport[],
  withinMs: number,
  fromTime?: string
): readonly StoredReport[] {
  const currentTime = fromTime
    ? new Date(fromTime).getTime()
    : Date.now();
  const cutoff = currentTime - withinMs;

  return Object.freeze(
    reports.filter(
      (r) => new Date(r.report.timestamp).getTime() >= cutoff
    )
  );
}

export function findDuplicates(
  reports: readonly StoredReport[]
): readonly StoredReport[] {
  return Object.freeze(
    reports.filter(
      (r) => r.correlation.duplicateCount > 0 || r.correlation.occurrenceCount > 1
    )
  );
}

export function getUniqueSessions(
  reports: readonly StoredReport[]
): readonly string[] {
  const sessions = new Set<string>();
  for (const report of reports) {
    sessions.add(report.report.session.sessionId);
  }
  return Object.freeze(Array.from(sessions));
}

export function getUniqueRoutes(
  reports: readonly StoredReport[]
): readonly string[] {
  const routes = new Set<string>();
  for (const report of reports) {
    routes.add(report.report.route);
  }
  return Object.freeze(Array.from(routes));
}

export function getCategoryCounts(
  reports: readonly StoredReport[]
): Readonly<Record<string, number>> {
  const counts: Record<string, number> = {};
  for (const report of reports) {
    const category = report.report.classification.category;
    counts[category] = (counts[category] || 0) + 1;
  }
  return Object.freeze(counts);
}

export function getSeverityCounts(
  reports: readonly StoredReport[]
): Readonly<Record<string, number>> {
  const counts: Record<string, number> = {};
  for (const report of reports) {
    const severity = report.report.classification.severity;
    counts[severity] = (counts[severity] || 0) + 1;
  }
  return Object.freeze(counts);
}
