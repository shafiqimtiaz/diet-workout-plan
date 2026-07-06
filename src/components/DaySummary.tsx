import type { SupportedLanguage, DayPlan } from "../types/plan";
import { DAY_NAMES } from "../types/plan";

interface DaySummaryProps {
  lang: SupportedLanguage;
  dayIndex: number;
  day: DayPlan;
}

export default function DaySummary({ lang, dayIndex, day }: DaySummaryProps) {
  const d = DAY_NAMES[dayIndex];
  const name = lang === "en" ? d.fullEn : d.fullBn;

  return (
    <div className="g-card day-summary-card">
      <div className="day-title-area">
        <h2>{name}</h2>
        <p style={{ color: "var(--text2)", marginTop: "0.25rem" }}>
          {lang === "en" ? day.workout.type.en : day.workout.type.bn}
          {" · "}
          {lang === "en" ? day.workout.duration.en : day.workout.duration.bn}
        </p>
      </div>
      <div className="day-stats-area">
        <div className="stat-badge">
          <span className="label">
            {lang === "en" ? "Calories" : "ক্যালোরি"}
          </span>
          <span className="val">{day.diet.calories}</span>
        </div>
        <div className="stat-badge">
          <span className="label">{lang === "en" ? "Protein" : "প্রোটিন"}</span>
          <span className="val">{day.diet.protein}g</span>
        </div>
      </div>
    </div>
  );
}
