import type { DiagnosticsProvider, ProviderResult } from "../provider";
import type { DiagnosticsReport } from "../../types/report";
import {
  CONSOLE_GROUP_LABEL,
  CONSOLE_TIMESTAMP_FORMAT,
  SEVERITY_LABELS,
  CATEGORY_LABELS,
} from "../../constants";

export const ConsoleProvider: DiagnosticsProvider = {
  name: "Console",
  id: "console",

  isAvailable(): boolean {
    return typeof console !== "undefined" && typeof console.group === "function";
  },

  async send(report: DiagnosticsReport): Promise<ProviderResult> {
    const timestamp = new Date().toLocaleString("en-US", CONSOLE_TIMESTAMP_FORMAT);
    const severityLabel =
      SEVERITY_LABELS[report.classification.severity] || report.classification.severity;
    const categoryLabel =
      CATEGORY_LABELS[report.classification.category] || report.classification.category;

    const hasGroup = typeof console.group === "function";
    const hasGroupEnd = typeof console.groupEnd === "function";
    const hasGroupCollapsed =
      typeof console.groupCollapsed === "function";

    if (hasGroupCollapsed) {
      console.groupCollapsed(
        `%c${CONSOLE_GROUP_LABEL}%c ${report.errorId} — ${severityLabel}`,
        "color: #f87171; font-weight: bold;",
        "color: #94a3b8; font-weight: normal;"
      );
    } else if (hasGroup) {
      console.group(
        `${CONSOLE_GROUP_LABEL} ${report.errorId} — ${severityLabel}`
      );
    }

    console.log(
      `%cError ID%c ${report.errorId}`,
      "color: #94a3b8; font-weight: bold;",
      "color: #e2e8f0;"
    );
    console.log(
      `%cTimestamp%c ${timestamp}`,
      "color: #94a3b8; font-weight: bold;",
      "color: #e2e8f0;"
    );
    console.log(
      `%cRoute%c ${report.route}`,
      "color: #94a3b8; font-weight: bold;",
      "color: #e2e8f0;"
    );
    console.log(
      `%cCategory%c ${categoryLabel}`,
      "color: #94a3b8; font-weight: bold;",
      "color: #e2e8f0;"
    );
    console.log(
      `%cSeverity%c ${severityLabel}`,
      "color: #94a3b8; font-weight: bold;",
      "color: #e2e8f0;"
    );

    console.log("");
    console.log(
      `%cSummary%c ${report.classification.summary}`,
      "color: #94a3b8; font-weight: bold;",
      "color: #e2e8f0;"
    );

    if (report.classification.likelyCauses.length > 0) {
      console.log("");
      console.log("%cLikely Causes:", "color: #fbbf24; font-weight: bold;");
      for (const cause of report.classification.likelyCauses) {
        console.log(`  • ${cause}`);
      }
    }

    if (report.classification.suggestedResolution.length > 0) {
      console.log("");
      console.log(
        "%cSuggested Resolution:",
        "color: #34d399; font-weight: bold;"
      );
      for (const resolution of report.classification.suggestedResolution) {
        console.log(`  • ${resolution}`);
      }
    }

    console.log("");
    console.log("%cEnvironment:", "color: #60a5fa; font-weight: bold;");
    console.log(`  Browser: ${report.environment.browser}`);
    console.log(`  OS: ${report.environment.os}`);
    console.log(`  Device: ${report.environment.device}`);
    console.log(
      `  Viewport: ${report.environment.viewport.width}x${report.environment.viewport.height}`
    );
    console.log(
      `  Screen: ${report.environment.viewport.screenWidth}x${report.environment.viewport.screenHeight}`
    );
    console.log(`  Language: ${report.environment.viewport.language}`);
    console.log(`  Timezone: ${report.environment.viewport.timezone}`);

    console.log("");
    console.log("%cSession:", "color: #a78bfa; font-weight: bold;");
    console.log(`  Session ID: ${report.session.sessionId}`);
    console.log(`  Started: ${report.session.startedAt}`);
    console.log(
      `  Errors This Session: ${report.session.errorsThisSession}`
    );
    console.log(`  Duration: ${Math.round(report.session.duration / 1000)}s`);

    console.log("");
    console.log(
      `%cOriginal Error%c ${report.error.message}`,
      "color: #94a3b8; font-weight: bold;",
      "color: #f87171;"
    );

    if (report.error.stack) {
      console.log("");
      console.log("%cStack Trace:", "color: #94a3b8; font-weight: bold;");
      console.log(report.error.stack);
    }

    console.log("");
    console.log(
      `%cSDK v${report.metadata.sdkVersion}%c — ${CONSOLE_GROUP_LABEL}`,
      "color: #6b7280; font-style: italic;",
      "color: #6b7280; font-style: italic;"
    );

    if (hasGroupEnd) {
      console.groupEnd();
    }

    return {
      success: true,
      providerId: "console",
      timestamp: new Date().toISOString(),
    };
  },
};
