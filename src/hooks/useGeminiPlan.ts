import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { generatePlan } from "../services/gemini";
import { STATIC_PLAN } from "../data/fallbackPlan";
import {
  computeCalories,
  DEFAULT_PROFILE,
  type Profile,
  type CalorieRange,
} from "../services/calories";
import type { WeeklyPlan } from "../types/plan";

interface PlanCache {
  [key: string]: WeeklyPlan;
}

const PROFILE_KEY = "profile";
const CALORIES_KEY = "target-calories";

const cacheKey = (calories: number, location: string): string =>
  `${calories}|${location}`;

function initialProfile(): Profile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (raw) return { ...DEFAULT_PROFILE, ...(JSON.parse(raw) as Profile) };
  } catch {
    // ignore — fall back to default
  }
  return DEFAULT_PROFILE;
}

function initialCalories(profile: Profile): number {
  try {
    const stored = Number(localStorage.getItem(CALORIES_KEY));
    if (Number.isFinite(stored) && stored > 0) return stored;
  } catch {
    // ignore
  }
  return computeCalories(profile).recommended;
}

export function useGeminiPlan() {
  const [profile, setProfileState] = useState<Profile>(initialProfile);
  const [calories, setCaloriesState] = useState<number>(() =>
    initialCalories(initialProfile()),
  );
  const [plan, setPlan] = useState<WeeklyPlan>(STATIC_PLAN);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(true);
  // What the currently shown plan was generated for — drives the "dirty" flag.
  const [generatedFor, setGeneratedFor] = useState<{
    calories: number;
    location: string;
  } | null>(null);

  const cacheRef = useRef<PlanCache>({});
  const abortRef = useRef<AbortController | null>(null);

  const range: CalorieRange = useMemo(
    () => computeCalories(profile),
    [profile],
  );

  const fetchPlan = useCallback(async (target: number, location: string) => {
    const key = cacheKey(target, location);

    // 1 — in-memory cache (this session)
    if (cacheRef.current[key]) {
      setPlan(cacheRef.current[key]);
      setUsingFallback(false);
      setGeneratedFor({ calories: target, location });
      return;
    }

    // 2 — persisted plan (localStorage) — reuse across reloads, no API call
    try {
      const raw = localStorage.getItem("plan:" + key);
      if (raw) {
        const stored = JSON.parse(raw) as WeeklyPlan;
        cacheRef.current[key] = stored;
        setPlan(stored);
        setUsingFallback(false);
        setGeneratedFor({ calories: target, location });
        return;
      }
    } catch {}

    // 3 — generate fresh; cancel any in-flight request first
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const newPlan = await generatePlan(target, location, controller.signal);
      cacheRef.current[key] = newPlan;
      try { localStorage.setItem("plan:" + key, JSON.stringify(newPlan)); } catch {}
      setPlan(newPlan);
      setUsingFallback(false);
      setGeneratedFor({ calories: target, location });
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

  // Manual calorie edit — updates + persists, but does NOT generate.
  const setCalories = useCallback((newCalories: number) => {
    if (!Number.isFinite(newCalories)) return;
    setCaloriesState(newCalories);
    try {
      localStorage.setItem(CALORIES_KEY, String(newCalories));
    } catch {
      // ignore
    }
  }, []);

  // Lock in a new profile — persists, recomputes the recommended calorie,
  // and sets the calorie target to it. Does NOT generate (user clicks the
  // now-highlighted generate button).
  const setProfile = useCallback((next: Profile) => {
    setProfileState(next);
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
    const recommended = computeCalories(next).recommended;
    setCaloriesState(recommended);
    try {
      localStorage.setItem(CALORIES_KEY, String(recommended));
    } catch {
      // ignore
    }
  }, []);

  // Generate for the current calorie target + location (clamped to range).
  const generate = useCallback(() => {
    const target = Math.max(range.min, Math.min(range.max, calories));
    if (target !== calories) setCalories(target); // keep state in sync so dirty clears
    fetchPlan(target, profile.location);
  }, [calories, profile.location, range.min, range.max, fetchPlan, setCalories]);

  // Initial load — reuse persisted plan for the current calorie + location.
  useEffect(() => {
    fetchPlan(calories, profile.location);
    return () => abortRef.current?.abort();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // The shown plan is stale when the target calorie or location has changed.
  const dirty =
    generatedFor !== null &&
    (generatedFor.calories !== calories ||
      generatedFor.location !== profile.location);

  return {
    profile,
    setProfile,
    calories,
    setCalories,
    range,
    generate,
    dirty,
    plan,
    loading,
    error,
    usingFallback,
  };
}
