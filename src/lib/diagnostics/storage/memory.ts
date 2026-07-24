import type {
  StorageProvider,
  StoredReport,
  SearchQuery,
  SearchResult,
  ListOptions,
  StorageHealth,
} from "./storage";

const TAG = "[diagnostics:storage:memory]";

function log(level: "info" | "warn" | "error", msg: string): void {
  const entry = `${TAG} ${msg}`;
  if (level === "error") console.error(entry);
  else if (level === "warn") console.warn(entry);
  else console.log(entry);
}

export const MemoryStorageProvider: StorageProvider = {
  name: "In-Memory",
  id: "memory",

  async initialize(): Promise<void> {
    log("info", "Initialized in-memory storage");
  },

  async saveReport(stored: StoredReport): Promise<void> {
    const { saveReport: save } = await import("./memory-internal");
    save(stored);
    log("info", `Saved: ${stored.report.errorId}`);
  },

  async updateReport(stored: StoredReport): Promise<void> {
    const { updateReport: update } = await import("./memory-internal");
    update(stored);
    log("info", `Updated: ${stored.report.errorId}`);
  },

  async getReport(errorId: string): Promise<StoredReport | null> {
    const { getReport: get } = await import("./memory-internal");
    return get(errorId);
  },

  async deleteReport(errorId: string): Promise<boolean> {
    const { deleteReport: del } = await import("./memory-internal");
    const result = del(errorId);
    if (result) {
      log("info", `Deleted: ${errorId}`);
    }
    return result;
  },

  async listReports(options?: ListOptions): Promise<readonly StoredReport[]> {
    const { listReports: list } = await import("./memory-internal");
    return list(options);
  },

  async searchReports(query: SearchQuery): Promise<SearchResult> {
    const { searchReports: search } = await import("./memory-internal");
    return search(query);
  },

  async clear(): Promise<void> {
    const { clearStorage } = await import("./memory-internal");
    clearStorage();
    log("info", "Storage cleared");
  },

  async health(): Promise<StorageHealth> {
    const { getReportCount } = await import("./memory-internal");
    return {
      healthy: true,
      ready: true,
      reportCount: getReportCount(),
    };
  },
};
