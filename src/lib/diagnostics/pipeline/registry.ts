import type { LifecycleEvent, HookCategory } from "./events";
import {
  registerHook,
  removeHook,
  clearHooks,
  clearHooksByEvent,
  clearHooksByCategory,
  getHooksForEvent,
  getHookCount,
  getHooksByCategory,
  executeHooks,
} from "./hooks";
import type { HookContext, HookPriority, HookRegistration, HookResult } from "./events";

export type {
  HookContext,
  HookPriority,
  HookCategory,
  HookRegistration,
  HookResult,
  LifecycleEvent,
};

export {
  registerHook,
  removeHook,
  clearHooks,
  clearHooksByEvent,
  clearHooksByCategory,
  getHooksForEvent,
  getHookCount,
  getHooksByCategory,
  executeHooks,
};
