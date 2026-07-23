export interface Meal {
  time: string;
  detail: string;
  icon: string;
  cal: number;
  items: string[];
}

export interface DayDiet {
  calories: number;
  protein: number;
  meals: Meal[];
}

export interface Exercise {
  name: string;
  detail: string;
  sets: string | null;
  emoji: string;
}

export interface DayWorkout {
  type: string;
  duration: string;
  focus: string;
  tip: string;
  exercises: Exercise[];
}

export interface DayPlan {
  diet: DayDiet;
  workout: DayWorkout;
}

export interface WeeklyPlan {
  days: DayPlan[];
}

export const DAY_NAMES = [
  { short: "Sun", full: "Sunday" },
  { short: "Mon", full: "Monday" },
  { short: "Tue", full: "Tuesday" },
  { short: "Wed", full: "Wednesday" },
  { short: "Thu", full: "Thursday" },
  { short: "Fri", full: "Friday" },
  { short: "Sat", full: "Saturday" },
];
