// Calorie recommendation from a user profile using the Mifflin-St Jeor
// equation (clinical standard) → TDEE → weight-loss-aware target. Pure
// functions, no side effects.

export type Sex = "male" | "female";
export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "extra";

export interface Profile {
  heightFt: number; // feet
  heightIn: number; // inches
  weightKg: number;
  age: number;
  sex: Sex;
  activity: ActivityLevel;
  location: string;
}

export interface CalorieRange {
  recommended: number;
  min: number;
  max: number;
}

// BMR × factor = TDEE (total daily energy expenditure)
const ACTIVITY_FACTORS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  extra: 1.9,
};

export const DEFAULT_PROFILE: Profile = {
  heightFt: 5,
  heightIn: 9,
  weightKg: 75,
  age: 30,
  sex: "male",
  activity: "moderate",
  location: "Ottawa, Canada",
};

const round50 = (n: number): number => Math.round(n / 50) * 50;

export function heightToCm(ft: number, inch: number): number {
  return (ft * 12 + inch) * 2.54;
}

export function computeBmr(p: Profile): number {
  const cm = heightToCm(p.heightFt, p.heightIn);
  const base = 10 * p.weightKg + 6.25 * cm - 5 * p.age;
  return base + (p.sex === "male" ? 5 : -161);
}

export function computeBmi(p: Profile): number {
  const m = heightToCm(p.heightFt, p.heightIn) / 100;
  return m > 0 ? p.weightKg / (m * m) : 0;
}

/**
 * Weight-loss-aware target:
 * - recommended = TDEE − 500 when overweight (BMI > 25), else maintenance TDEE
 * - min = safe floor (1500 male / 1200 female)
 * - max = maintenance TDEE
 * All rounded to the nearest 50 and clamped so min ≤ recommended ≤ max.
 */
export function computeCalories(p: Profile): CalorieRange {
  const tdee = computeBmr(p) * ACTIVITY_FACTORS[p.activity];
  const bmi = computeBmi(p);
  const floor = p.sex === "male" ? 1500 : 1200;

  const maintenance = round50(tdee);
  const min = floor;
  const max = Math.max(maintenance, min);
  const recommended = round50(bmi > 25 ? tdee - 500 : tdee);

  return {
    recommended: Math.max(min, Math.min(max, recommended)),
    min,
    max,
  };
}
