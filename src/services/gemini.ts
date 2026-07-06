import { GoogleGenerativeAI } from '@google/generative-ai';
import type { WeeklyPlan, DayPlan, DayDiet, DayWorkout, Meal, Exercise, Bilingual } from '../types/plan';

// Model fallback chain — tries primary first (most quota headroom), then falls back on 429/rate errors
const MODEL_CHAIN = ['gemini-2.5-flash-lite', 'gemini-3.0-flash', 'gemini-3.1-flash-lite'];
const MAX_RETRIES = 2;

const getApiKey = (): string => {
  return import.meta.env.VITE_GEMINI_API_KEY || '';
};

function extractRetryDelay(error: unknown): number {
  const msg = String(error instanceof Error ? error.message : error);
  const match = msg.match(/retry in (\d+)\.?\d*s/i) ?? msg.match(/RetryInfo.*?"(\d+)s"/i);
  return match ? parseInt(match[1], 10) * 1000 + 500 : 1000;
}

function isRateLimitError(error: unknown): boolean {
  const msg = String(error instanceof Error ? error.message : error);
  return /429|quota|rate.?limit|exceeded/i.test(msg);
}

function b(en: string, bn: string): Bilingual {
  return { en, bn };
}

function parseWorkout(obj: Record<string, unknown>): DayWorkout {
  return {
    type: b(String(obj.type_en ?? obj.type ?? ''), String(obj.type_bn ?? obj.type ?? '')),
    duration: b(String(obj.duration_en ?? obj.duration ?? ''), String(obj.duration_bn ?? obj.duration ?? '')),
    focus: b(String(obj.focus_en ?? obj.focus ?? ''), String(obj.focus_bn ?? obj.focus ?? '')),
    tip: b(String(obj.tip_en ?? obj.tip ?? ''), String(obj.tip_bn ?? obj.tip ?? '')),
    exercises: (Array.isArray(obj.exercises) ? obj.exercises : []).map((ex: Record<string, unknown>) => ({
      name: b(String(ex.name_en ?? ex.name ?? ''), String(ex.name_bn ?? ex.name ?? '')),
      detail: b(String(ex.detail_en ?? ex.detail ?? ''), String(ex.detail_bn ?? ex.detail ?? '')),
      sets: ex.sets ? String(ex.sets) : null,
      emoji: String(ex.emoji ?? '🏋️'),
    } as Exercise)),
  };
}

function parseDay(obj: Record<string, unknown>): DayPlan {
  const dietObj = (obj.diet ?? obj) as Record<string, unknown>;
  const meals = (Array.isArray(dietObj.meals) ? dietObj.meals : []) as Record<string, unknown>[];

  return {
    diet: {
      calories: Number(dietObj.calories ?? 1600),
      protein: Number(dietObj.protein ?? 100),
      meals: meals.map((m): Meal => ({
        time: b(String(m.time_en ?? m.time ?? ''), String(m.time_bn ?? m.time ?? '')),
        detail: b(String(m.detail_en ?? m.detail ?? ''), String(m.detail_bn ?? m.detail ?? '')),
        icon: String(m.icon ?? '🍽️'),
        cal: Number(m.cal ?? 400),
        items: (Array.isArray(m.items) ? m.items : []).map((item: unknown) => {
          if (typeof item === 'object' && item !== null) {
            const i = item as Record<string, unknown>;
            return b(String(i.en ?? i.item ?? ''), String(i.bn ?? i.item ?? ''));
          }
          return b(String(item), String(item));
        }),
      })),
    },
    workout: parseWorkout((obj.workout ?? {}) as Record<string, unknown>),
  };
}

export async function generatePlan(
  targetCalories: number,
  signal?: AbortSignal
): Promise<WeeklyPlan> {
  const apiKey = getApiKey();

  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    throw new Error('NO_API_KEY');
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  let lastError: unknown = null;

  for (const modelName of MODEL_CHAIN) {
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        // Abort check before each attempt
        if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');

        const model = genAI.getGenerativeModel({ model: modelName });

  const prompt = `You are a professional nutritionist and fitness coach. Generate a complete 7-day diet and workout plan for someone targeting ${targetCalories} calories per day. The person lives in Ottawa, Canada (near the Trans Canada Trail in Bayshore) and enjoys Bangladeshi cuisine with a home gym setup (dumbbells, barbell, bench, bike, trail access).

IMPORTANT: ALL text MUST be provided in BOTH English (field_${"e"}n) AND Bengali/Bangla (field_bn). Every string field needs both translations.

Return ONLY valid JSON with NO markdown, NO backticks, NO explanation. The JSON must match this exact structure:

{
  "days": [
    {
      "diet": {
        "calories": number (close to ${targetCalories}),
        "protein": number (in grams),
        "meals": [
          {
            "time_en": "Breakfast",
            "time_bn": "সকাল",
            "detail_en": "7-8 AM",
            "detail_bn": "সকাল ৭-৮টা",
            "icon": "🌅",
            "cal": number,
            "items": [
              {"en": "food item in English", "bn": "food item in Bengali"}
            ]
          }
        ]
      },
      "workout": {
        "type_en": "Strength · Push",
        "type_bn": "শক্তি · পুশ",
        "duration_en": "40 min",
        "duration_bn": "৪০ মিনিট",
        "focus_en": "Chest · Shoulders · Triceps",
        "focus_bn": "বুক · কাঁধ · ট্রাইসেপ",
        "tip_en": "training tip in English",
        "tip_bn": "training tip in Bengali",
        "exercises": [
          {
            "name_en": "Dumbbell Floor Press",
            "name_bn": "ডাম্বেল ফ্লোর প্রেস",
            "detail_en": "4 sets × 8-10 reps",
            "detail_bn": "৪ সেট × ৮-১০ বার",
            "sets": "4×8-10",
            "emoji": "🏋️"
          }
        ]
      }
    }
  ]
}

RULES:
- 7 days (Sunday through Saturday)
- Each day: 3-4 meals (breakfast, lunch, optional snack, dinner)
- Include Bangladeshi foods like: rice, roti, dal, chicken bhuna, beef curry, fish curry (rui/ilish), mung dal, masoor dal, sabji, korola, lau, begun bhaji, raita
- Also include Western options like: grilled chicken, salmon, steak, oatmeal, eggs, Greek yogurt, smoothies
- Alternate strength days and cardio days: strength on Sun/Mon/Wed/Fri, cardio/active on Tue/Thu/Sat
- Workouts should reference the home gym (dumbbells, barbell, bench) and the Trans Canada Trail for outdoor cardio
- Protein target should be approximately ${Math.round(targetCalories * 0.075)}g (about 0.75g per kg)
- Each meal's calories should add up to roughly the day's total
- Keep total calories per day within ±50 of ${targetCalories}`;

        const result = await model.generateContent(prompt, { signal: signal as AbortSignal | undefined });
        const text = result.response.text();

        // Clean any markdown wrapping
        const clean = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();

        let parsed: Record<string, unknown>;
        try {
          parsed = JSON.parse(clean);
        } catch {
          // Try to extract JSON from the text
          const match = clean.match(/(\{[\s\S]*\})/);
          if (!match) throw new Error('Failed to parse Gemini response');
          parsed = JSON.parse(match[1]);
        }

        const daysArr = (Array.isArray(parsed.days) ? parsed.days : []) as Record<string, unknown>[];

        if (daysArr.length === 0) {
          throw new Error('Gemini returned empty plan');
        }

        return {
          days: daysArr.map(parseDay),
        };

      } catch (err: unknown) {
        // Don't retry if aborted
        if (err instanceof DOMException && err.name === 'AbortError') throw err;

        lastError = err;
        const isLastAttempt = attempt === MAX_RETRIES && modelName === MODEL_CHAIN[MODEL_CHAIN.length - 1];

        if (isRateLimitError(err) && !isLastAttempt) {
          const delay = extractRetryDelay(err);
          console.warn(`[Gemini] Rate limited on ${modelName}, retrying in ${delay}ms (attempt ${attempt + 1})...`);
          await new Promise(r => setTimeout(r, delay));
          continue; // retry same model
        }

        if (isRateLimitError(err) && modelName !== MODEL_CHAIN[MODEL_CHAIN.length - 1]) {
          console.warn(`[Gemini] ${modelName} quota exhausted, falling back to next model...`);
          break; // break inner retry loop, try next model
        }

        // Non-rate-limit error or last model exhausted → throw
        throw err;
      }
    }
  }

  throw lastError ?? new Error('All Gemini models exhausted');
}
