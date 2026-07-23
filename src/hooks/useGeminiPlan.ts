import { useState, useEffect, useRef, useCallback } from "react";
import { generatePlan } from "../services/gemini";
import { loadPlan, savePlan } from "../services/planStore";
import { STATIC_PLAN } from "../data/fallbackPlan";
import type { WeeklyPlan } from "../types/plan";

interface PlanCache {
  [calories: number]: WeeklyPlan;
}

const CALORIES_KEY = "target-calories";
const DEFAULT_CALORIES = 1600;

function clampCalories(n: number): number {
  return Math.max(1200, Math.min(4000, n));
}

function initialCalories(): number {
  try {
    const stored = Number(localStorage.getItem(CALORIES_KEY));
    return Number.isFinite(stored) && stored > 0
      ? clampCalories(stored)
      : DEFAULT_CALORIES;
  } catch {
    return DEFAULT_CALORIES;
  }
}

export function useGeminiPlan() {
  const [calories, setCaloriesState] = useState(initialCalories);
  const [plan, setPlan] = useState<WeeklyPlan>(STATIC_PLAN);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(true);

  const cacheRef = useRef<PlanCache>({});
  const abortRef = useRef<AbortController | null>(null);

  const fetchPlan = useCallback(async (target: number) => {
    // 1 — in-memory cache (this session)
    if (cacheRef.current[target]) {
      setPlan(cacheRef.current[target]);
      setUsingFallback(false);
      return;
    }

    // 2 — persisted plan (IndexedDB) — reuse across reloads, no API call
    const stored = await loadPlan(target);
    if (stored) {
      cacheRef.current[target] = stored;
      setPlan(stored);
      setUsingFallback(false);
      return;
    }

    // 3 — generate fresh; cancel any in-flight request first
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const newPlan = await generatePlan(target, controller.signal);
      cacheRef.current[target] = newPlan;
      void savePlan(target, newPlan);
      setPlan(newPlan);
      setUsingFallback(false);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;

      setPlan(STATIC_PLAN);
      setUsingFallback(true);

      if (err instanceof Error && err.message === "NO_API_KEY") {
        setError("Set VITE_GEMINI_API_KEY in .env for AI-generated plans");
      } else {
        setError(
          `Gemini error: ${err instanceof Error ? err.message : "Unknown"}. Using static plan.`,
        );
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  const setCalories = useCallback(
    (newCalories: number) => {
      const clamped = clampCalories(newCalories);
      setCaloriesState(clamped);
      try {
        localStorage.setItem(CALORIES_KEY, String(clamped));
      } catch {
        // ignore — localStorage unavailable (private mode etc.)
      }
      fetchPlan(clamped);
    },
    [fetchPlan],
  );

  // Initial fetch
  useEffect(() => {
    fetchPlan(calories);
    return () => abortRef.current?.abort();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    calories,
    setCalories,
    plan,
    loading,
    error,
    usingFallback,
  };
}
