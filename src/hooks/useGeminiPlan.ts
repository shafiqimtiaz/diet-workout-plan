import { useState, useEffect, useRef, useCallback } from "react";
import { generatePlan } from "../services/gemini";
import { STATIC_PLAN } from "../data/fallbackPlan";
import type { WeeklyPlan } from "../types/plan";

interface PlanCache {
  [calories: number]: WeeklyPlan;
}

export function useGeminiPlan() {
  const [calories, setCaloriesState] = useState(1600);
  const [plan, setPlan] = useState<WeeklyPlan>(STATIC_PLAN);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(true);

  const cacheRef = useRef<PlanCache>({});
  const abortRef = useRef<AbortController | null>(null);

  const fetchPlan = useCallback(async (target: number) => {
    // Check cache first
    if (cacheRef.current[target]) {
      setPlan(cacheRef.current[target]);
      return;
    }

    // Cancel any in-flight request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const newPlan = await generatePlan(target, controller.signal);
      cacheRef.current[target] = newPlan;
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
      const clamped = Math.max(1200, Math.min(4000, newCalories));
      setCaloriesState(clamped);
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
