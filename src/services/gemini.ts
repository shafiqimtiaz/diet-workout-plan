import { GoogleGenerativeAI } from "@google/generative-ai";
import type {
  WeeklyPlan,
  DayPlan,
  DayWorkout,
  Meal,
  Exercise,
  Bilingual,
} from "../types/plan";

// Model fallback chain — tries primary first (most quota headroom), then falls back on 429/rate errors
const MODEL_CHAIN = [
  "gemini-2.5-flash-lite",
  "gemini-3.0-flash",
  "gemini-3.1-flash-lite",
];
const MAX_RETRIES = 2;

const getApiKey = (): string => {
  return import.meta.env.VITE_GEMINI_API_KEY || "";
};

function extractRetryDelay(error: unknown): number {
  const msg = String(error instanceof Error ? error.message : error);
  const match =
    msg.match(/retry in (\d+)\.?\d*s/i) ?? msg.match(/RetryInfo.*?"(\d+)s"/i);
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
    type: b(
      String(obj.type_en ?? obj.type ?? ""),
      String(obj.type_bn ?? obj.type ?? ""),
    ),
    duration: b(
      String(obj.duration_en ?? obj.duration ?? ""),
      String(obj.duration_bn ?? obj.duration ?? ""),
    ),
    focus: b(
      String(obj.focus_en ?? obj.focus ?? ""),
      String(obj.focus_bn ?? obj.focus ?? ""),
    ),
    tip: b(
      String(obj.tip_en ?? obj.tip ?? ""),
      String(obj.tip_bn ?? obj.tip ?? ""),
    ),
    exercises: (Array.isArray(obj.exercises) ? obj.exercises : []).map(
      (ex: Record<string, unknown>) =>
        ({
          name: b(
            String(ex.name_en ?? ex.name ?? ""),
            String(ex.name_bn ?? ex.name ?? ""),
          ),
          detail: b(
            String(ex.detail_en ?? ex.detail ?? ""),
            String(ex.detail_bn ?? ex.detail ?? ""),
          ),
          sets: ex.sets ? String(ex.sets) : null,
          emoji: String(ex.emoji ?? "🏋️"),
        }) as Exercise,
    ),
  };
}

function parseDay(obj: Record<string, unknown>): DayPlan {
  const dietObj = (obj.diet ?? obj) as Record<string, unknown>;
  const meals = (Array.isArray(dietObj.meals) ? dietObj.meals : []) as Record<
    string,
    unknown
  >[];

  return {
    diet: {
      calories: Number(dietObj.calories ?? 1600),
      protein: Number(dietObj.protein ?? 100),
      meals: meals.map((m): Meal => ({
        time: b(
          String(m.time_en ?? m.time ?? ""),
          String(m.time_bn ?? m.time ?? ""),
        ),
        detail: b(
          String(m.detail_en ?? m.detail ?? ""),
          String(m.detail_bn ?? m.detail ?? ""),
        ),
        icon: String(m.icon ?? "🍽️"),
        cal: Number(m.cal ?? 400),
        items: (Array.isArray(m.items) ? m.items : []).map((item: unknown) => {
          if (typeof item === "object" && item !== null) {
            const i = item as Record<string, unknown>;
            return b(
              String(i.en ?? i.item ?? ""),
              String(i.bn ?? i.item ?? ""),
            );
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
  signal?: AbortSignal,
): Promise<WeeklyPlan> {
  const apiKey = getApiKey();

  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    throw new Error("NO_API_KEY");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  let lastError: unknown = null;

  for (const modelName of MODEL_CHAIN) {
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        // Abort check before each attempt
        if (signal?.aborted) throw new DOMException("Aborted", "AbortError");

        const model = genAI.getGenerativeModel({
          model: modelName,
          generationConfig: {
            maxOutputTokens: 4096,
            temperature: 0.7,
          },
        });

        const prompt = `You are a professional nutritionist and fitness coach. Generate a HIGHLY DETAILED 7-day diet and workout plan for someone targeting ${targetCalories} calories per day. This person lives in Ottawa, Canada (near the Trans Canada Trail in Bayshore, close to Andrew Haydon Park) and enjoys Bangladeshi cuisine with a home gym (dumbbells, barbell, bench, bike, trail access).

IMPORTANT: ALL text MUST be in BOTH English (field_en) AND Bengali/Bangla (field_bn). Every string needs both translations with natural, native-level Bengali.

Return ONLY valid JSON — NO markdown, NO backticks, NO explanation.

{
  "days": [
    {
      "diet": {
        "calories": number (must be ${targetCalories} ±50),
        "protein": number (approximately ${Math.round(targetCalories * 0.075)}g),
        "meals": [
          {
            "time_en": "Breakfast",
            "time_bn": "সকাল",
            "detail_en": "7-8 AM",
            "detail_bn": "সকাল ৭-৮টা",
            "icon": "🌅",
            "cal": number,
            "items": [
              {"en": "2 scrambled eggs with a pinch of black pepper", "bn": "২টি স্ক্র্যাম্বলড ডিম গোল মরিচ দিয়ে"}
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
        "tip_en": "detailed coaching tip — 2 sentences, specific, motivational",
        "tip_bn": "detailed Bengali coaching tip",
        "exercises": [
          {
            "name_en": "Dumbbell Floor Press",
            "name_bn": "ডাম্বেল ফ্লোর প্রেস",
            "detail_en": "4 sets × 8-10 reps, controlled tempo",
            "detail_bn": "৪ সেট × ৮-১০ বার, নিয়ন্ত্রিত গতিতে",
            "sets": "4×8-10",
            "emoji": "🏋️"
          }
        ]
      }
    }
  ]
}

—— DETAIL REQUIREMENTS (MUST FOLLOW EXACTLY) ——

MEALS:
- EXACTLY 3-4 meals per day: Breakfast, Lunch, Dinner. Add a Snack between Lunch and Dinner for 2 days only.
- Each meal MUST have EXACTLY 3-4 food items — never fewer. Every item must include specific portion size (grams, cups, slices, tbsp, tsp, pieces).
- Items must sound like real food, not generic labels. Format: "2 scrambled eggs with black pepper" NOT "eggs". Include preparation method where relevant.
- Calories per meal must add up to within ±30 of the day's total calories.
- Vary the meals across days — no two days should have the same breakfast or dinner.
- Bangladeshi foods to use across the week: bhuna (beef/chicken), masoor dal, mung dal, rui/ilish fish curry, korola bhaji, lau bhaji, begun bhaji, cucumber raita, basmati rice, whole wheat roti, paratha (occasional).
- Western foods to use: grilled chicken breast, salmon fillet, lean beef steak, eggs (scrambled/poached/boiled), oatmeal, Greek yogurt, avocado, mixed berries, almonds, walnuts, sweet potato, broccoli, spinach, smoothies.
- Drinks: black coffee, green tea, herbal tea, water — no sugary drinks.

WORKOUTS:
- EXACTLY 3-4 exercises per day, each with specific sets×reps, emoji, and a short technique detail.
- Alternate: Sun=ActiveRest, Mon=Strength(Push), Tue=Cardio(Trail), Wed=Strength(Pull), Thu=Cardio(Bike), Fri=Strength(Legs), Sat=Endurance(LongRide/Hike).
- Cardio days (Tue, Thu, Sat) MUST reference the Trans Canada Trail, Bayshore, or Andrew Haydon Park.
- Strength days MUST reference home gym equipment: dumbbells, barbell, bench.
- Coach tips MUST be 2 sentences, specific and motivational — not generic. Reference Ottawa weather (winter vs summer), trail conditions, Bangladeshi food habits, or desk-worker posture.
- Exercise detail format: "X sets × Y-Z reps, [technique cue]". Example: "4 sets × 8-10 reps, controlled tempo, squeeze at top".
- Sets field: compact notation like "4×8-10", "3×12-15", "3×max", "3×45s", "10 rounds". Use null only for warmup/cool-down/stretch.

OUTPUT: Only the JSON object, nothing else.`;

        const result = await model.generateContent(prompt, {
          signal: signal as AbortSignal | undefined,
        });
        const text = result.response.text();

        // Clean any markdown wrapping
        const clean = text
          .replace(/```json\s*/gi, "")
          .replace(/```\s*/g, "")
          .trim();

        let parsed: Record<string, unknown>;
        try {
          parsed = JSON.parse(clean);
        } catch {
          // Try to extract JSON from the text
          const match = clean.match(/(\{[\s\S]*\})/);
          if (!match) throw new Error("Failed to parse Gemini response");
          parsed = JSON.parse(match[1]);
        }

        const daysArr = (
          Array.isArray(parsed.days) ? parsed.days : []
        ) as Record<string, unknown>[];

        if (daysArr.length === 0) {
          throw new Error("Gemini returned empty plan");
        }

        return {
          days: daysArr.map(parseDay),
        };
      } catch (err: unknown) {
        // Don't retry if aborted
        if (err instanceof DOMException && err.name === "AbortError") throw err;

        lastError = err;
        const isLastAttempt =
          attempt === MAX_RETRIES &&
          modelName === MODEL_CHAIN[MODEL_CHAIN.length - 1];

        if (isRateLimitError(err) && !isLastAttempt) {
          const delay = extractRetryDelay(err);
          console.warn(
            `[Gemini] Rate limited on ${modelName}, retrying in ${delay}ms (attempt ${attempt + 1})...`,
          );
          await new Promise((r) => setTimeout(r, delay));
          continue; // retry same model
        }

        if (
          isRateLimitError(err) &&
          modelName !== MODEL_CHAIN[MODEL_CHAIN.length - 1]
        ) {
          console.warn(
            `[Gemini] ${modelName} quota exhausted, falling back to next model...`,
          );
          break; // break inner retry loop, try next model
        }

        // Non-rate-limit error or last model exhausted → throw
        throw err;
      }
    }
  }

  throw lastError ?? new Error("All Gemini models exhausted");
}
