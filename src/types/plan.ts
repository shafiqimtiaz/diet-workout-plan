export type SupportedLanguage = "en" | "bn";

export interface Bilingual {
  en: string;
  bn: string;
}

export interface Meal {
  time: Bilingual;
  detail: Bilingual;
  icon: string;
  cal: number;
  items: Bilingual[];
}

export interface DayDiet {
  calories: number;
  protein: number;
  meals: Meal[];
}

export interface Exercise {
  name: Bilingual;
  detail: Bilingual;
  sets: string | null;
  emoji: string;
}

export interface DayWorkout {
  type: Bilingual;
  duration: Bilingual;
  focus: Bilingual;
  tip: Bilingual;
  exercises: Exercise[];
}

export interface DayPlan {
  diet: DayDiet;
  workout: DayWorkout;
}

export interface WeeklyPlan {
  days: DayPlan[];
}

export interface DayMeta {
  en: string;
  bn: string;
  fullEn: string;
  fullBn: string;
}

export const DAY_NAMES: DayMeta[] = [
  { en: "Sun", bn: "রবি", fullEn: "Sunday", fullBn: "রবিবার" },
  { en: "Mon", bn: "সোম", fullEn: "Monday", fullBn: "সোমবার" },
  { en: "Tue", bn: "মঙ্গল", fullEn: "Tuesday", fullBn: "মঙ্গলবার" },
  { en: "Wed", bn: "বুধ", fullEn: "Wednesday", fullBn: "বুধবার" },
  { en: "Thu", bn: "বৃহঃ", fullEn: "Thursday", fullBn: "বৃহস্পতিবার" },
  { en: "Fri", bn: "শুক্র", fullEn: "Friday", fullBn: "শুক্রবার" },
  { en: "Sat", bn: "শনি", fullEn: "Saturday", fullBn: "শনিবার" },
];
