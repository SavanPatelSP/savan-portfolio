import type {
  StoredReport,
  SearchQuery,
  SearchResult,
  ListOptions,
} from "./storage";
import { searchReports as searchInArray } from "./search";

const reports = new Map<string, StoredReport>();

export function saveReport(stored: StoredReport): void {
  reports.set(stored.report.errorId, stored);
}

export function updateReport(stored: StoredReport): void {
  reports.set(stored.report.errorId, stored);
}

export function getReport(errorId: string): StoredReport | null {
  return reports.get(errorId) || null;
}

export function deleteReport(errorId: string): boolean {
  return reports.delete(errorId);
}

export function listReports(options?: ListOptions): readonly StoredReport[] {
  const all = Array.from(reports.values());
  const sortBy = options?.sortBy || "timestamp";
  const sortOrder = options?.sortOrder || "desc";
  const limit = options?.limit || 50;
  const offset = options?.offset || 0;

  all.sort((a, b) => {
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

  return Object.freeze(all.slice(offset, offset + limit));
}

export function searchReports(query: SearchQuery): SearchResult {
  const all = Array.from(reports.values());
  return searchInArray(all, query);
}

export function clearStorage(): void {
  reports.clear();
}

export function getReportCount(): number {
  return reports.size;
}

export function getAllReports(): readonly StoredReport[] {
  return Object.freeze(Array.from(reports.values()));
}
