import type { CollectorData } from "../types/diagnostics";
import { collectBrowserInfo, collectBrowserVersion } from "./browser";
import { collectOS, collectDevice } from "./device";
import { collectRoute } from "./route";
import { collectViewport } from "./viewport";
import { collectEnvironment } from "./environment";
import { collectRuntime } from "./runtime";

export function collectAll(): CollectorData {
  return {
    browser: collectBrowserInfo(),
    browserVersion: collectBrowserVersion(),
    os: collectOS(),
    device: collectDevice(),
    route: collectRoute(),
    viewport: collectViewport(),
    environment: collectEnvironment(),
    runtime: collectRuntime(),
  };
}

export { collectBrowserInfo, collectBrowserVersion } from "./browser";
export { collectOS, collectDevice } from "./device";
export { collectRoute } from "./route";
export { collectViewport } from "./viewport";
export { collectEnvironment } from "./environment";
export { collectRuntime } from "./runtime";
