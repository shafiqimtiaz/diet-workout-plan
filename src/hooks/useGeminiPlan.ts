import { useState, useEffect, useRef, useCallback } from 'react';
import { generatePlan } from '../services/gemini';
import { DAY_NAMES } from '../types/plan';
import type { WeeklyPlan, DayPlan, DayDiet, DayWorkout, Meal, Exercise, Bilingual } from '../types/plan';

// Fallback static data (abbreviated version for when API is unavailable)
const b = (en: string, bn: string): Bilingual => ({ en, bn });

const FALLBACK_MEAL: Meal = {
  time: b('Meal', 'খাবার'),
  detail: b('', ''),
  icon: '🍽️',
  cal: 400,
  items: [b('Protein + Vegetables + Carbs', 'প্রোটিন + সবজি + কার্বস')],
};

const FALLBACK_EXERCISE: Exercise = {
  name: b('Home Workout', 'হোম ওয়ার্কআউট'),
  detail: b('3 sets × 10 reps', '৩ সেট × ১০ বার'),
  sets: '3×10',
  emoji: '🏋️',
};

function fallbackDay(dayIndex: number, calories: number): DayPlan {
  return {
    diet: {
      calories: Math.round(calories),
      protein: Math.round(calories * 0.075),
      meals: [
        { ...FALLBACK_MEAL, time: b('Breakfast', 'সকাল'), icon: '🌅', cal: Math.round(calories * 0.25) },
        { ...FALLBACK_MEAL, time: b('Lunch', 'দুপুর'), icon: '☀️', cal: Math.round(calories * 0.35) },
        { ...FALLBACK_MEAL, time: b('Snack', 'বিকেল'), icon: '🍎', cal: Math.round(calories * 0.1) },
        { ...FALLBACK_MEAL, time: b('Dinner', 'রাত'), icon: '🌙', cal: Math.round(calories * 0.3) },
      ],
    },
    workout: {
      type: b(dayIndex % 2 === 0 ? 'Active Rest' : 'Strength Training', dayIndex % 2 === 0 ? 'সক্রিয় বিশ্রাম' : 'শক্তি প্রশিক্ষণ'),
      duration: b('40 min', '৪০ মিনিট'),
      focus: b('Full Body', 'ফুল বডি'),
      tip: b('Set your Gemini API key in .env to unlock AI-generated personalized plans.', 'পার্সোনালাইজড প্ল্যানের জন্য .env-এ Gemini API কী সেট করুন।'),
      exercises: [FALLBACK_EXERCISE, FALLBACK_EXERCISE],
    },
  };
}

function fallbackPlan(calories: number): WeeklyPlan {
  return {
    days: DAY_NAMES.map((_, i) => fallbackDay(i, calories)),
  };
}

interface PlanCache {
  [calories: number]: WeeklyPlan;
}

export function useGeminiPlan() {
  const [calories, setCaloriesState] = useState(1600);
  const [plan, setPlan] = useState<WeeklyPlan>(() => fallbackPlan(1600));
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
      if (err instanceof Error && err.name === 'AbortError') return;
      if (err instanceof Error && err.message === 'NO_API_KEY') {
        const fb = fallbackPlan(target);
        setPlan(fb);
        setUsingFallback(true);
        setError('Set VITE_GEMINI_API_KEY in .env for AI-generated plans');
      } else {
        const fb = fallbackPlan(target);
        setPlan(fb);
        setUsingFallback(true);
        setError(`Gemini error: ${err instanceof Error ? err.message : 'Unknown'}. Using fallback.`);
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  const setCalories = useCallback((newCalories: number) => {
    const clamped = Math.max(1200, Math.min(4000, newCalories));
    setCaloriesState(clamped);
    fetchPlan(clamped);
  }, [fetchPlan]);

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
