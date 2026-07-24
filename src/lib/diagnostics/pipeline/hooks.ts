import type {
  HookRegistration,
  HookContext,
  HookPriority,
  HookCategory,
  LifecycleEvent,
  HookResult,
} from "./events";

const PRIORITY_ORDER: Record<HookPriority, number> = {
  critical: 0,
  high: 1,
  normal: 2,
  low: 3,
};

let hookIdCounter = 0;

function generateHookId(): string {
  hookIdCounter += 1;
  return `hook_${hookIdCounter}`;
}

const hooks = new Map<string, HookRegistration>();

export function registerHook(
  event: LifecycleEvent,
  handler: (context: HookContext) => void | Promise<void>,
  options?: {
    priority?: HookPriority;
    category?: HookCategory;
    name?: string;
  }
): string {
  const id = generateHookId();
  const registration: HookRegistration = {
    id,
    event,
    priority: options?.priority || "normal",
    category: options?.category || "user",
    name: options?.name || id,
    handler,
  };

  hooks.set(id, registration);
  return id;
}

export function removeHook(id: string): boolean {
  return hooks.delete(id);
}

export function clearHooks(): void {
  hooks.clear();
}

export function clearHooksByEvent(event: LifecycleEvent): void {
  for (const [id, registration] of hooks) {
    if (registration.event === event) {
      hooks.delete(id);
    }
  }
}

export function clearHooksByCategory(category: HookCategory): void {
  for (const [id, registration] of hooks) {
    if (registration.category === category) {
      hooks.delete(id);
    }
  }
}

export function getHooksForEvent(
  event: LifecycleEvent
): HookRegistration[] {
  const matching = Array.from(hooks.values()).filter(
    (h) => h.event === event
  );

  matching.sort((a, b) => {
    const priorityDiff = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
    if (priorityDiff !== 0) return priorityDiff;
    return a.id.localeCompare(b.id);
  });

  return matching;
}

export function getHookCount(): number {
  return hooks.size;
}

export function getHooksByCategory(category: HookCategory): HookRegistration[] {
  return Array.from(hooks.values()).filter((h) => h.category === category);
}

export async function executeHooks(
  event: LifecycleEvent,
  context: HookContext
): Promise<HookResult[]> {
  const matching = getHooksForEvent(event);
  const results: HookResult[] = [];

  for (const registration of matching) {
    const start = performance.now();
    try {
      await registration.handler(context);
      results.push({
        hookId: registration.id,
        success: true,
        duration: performance.now() - start,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown hook error";
      results.push({
        hookId: registration.id,
        success: false,
        error: message,
        duration: performance.now() - start,
      });
    }
  }

  return results;
}
