// lib/memoryStore.ts or .js
declare global {
  var store: Map<string, { secureWord: string; issuedAt: number; attempts?: number; mfaCode?: string }>;
}
globalThis.store = globalThis.store || new Map();
export const store = globalThis.store;


