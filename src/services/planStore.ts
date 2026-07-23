// Minimal IndexedDB persistence for generated weekly plans, keyed by a
// composite string (calories + location) since both affect plan content.
// Survives reloads so previously generated plans are reused instead of
// re-calling Gemini. Degrades gracefully (no-op) when IndexedDB is unavailable.
import type { WeeklyPlan } from "../types/plan";

const DB_NAME = "diet-workout-plan";
const STORE = "plans";
const VERSION = 2;

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (db.objectStoreNames.contains(STORE)) {
        db.deleteObjectStore(STORE);
      }
      db.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function loadPlan(key: string): Promise<WeeklyPlan | null> {
  try {
    const db = await openDb();
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, "readonly");
      const req = tx.objectStore(STORE).get(key);
      req.onsuccess = () => resolve((req.result as WeeklyPlan) ?? null);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return null;
  }
}

export async function savePlan(key: string, plan: WeeklyPlan): Promise<void> {
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).put(plan, key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    // Ignore persistence failures — the plan is still usable in-memory.
  }
}
