import type { SupportedLanguage, Meal } from "../types/plan";

interface MealCardProps {
  lang: SupportedLanguage;
  meal: Meal;
  index: number;
}

const ACCENT_STYLES = [
  { bg: "#FFF7ED", fg: "#C2410C" },
  { bg: "#EFF6FF", fg: "#1D4ED8" },
  { bg: "#F0FDFA", fg: "#0F766E" },
  { bg: "#F5F3FF", fg: "#6D28D9" },
];

export default function MealCard({ lang, meal, index }: MealCardProps) {
  const accent = ACCENT_STYLES[index % ACCENT_STYLES.length];

  return (
    <div className="meal-card fade-in" style={{ borderLeftColor: accent.fg }}>
      <div className="meal-header">
        <div className="meal-time-title">
          <span>{meal.icon}</span>
          <span>{lang === "en" ? meal.time.en : meal.time.bn}</span>
        </div>
        <div
          className="meal-cal"
          style={{ backgroundColor: accent.bg, color: accent.fg }}
        >
          {meal.cal} cal
        </div>
      </div>
      <div className="meal-detail">
        {lang === "en" ? meal.detail.en : meal.detail.bn}
      </div>
      <ul className="meal-items-list">
        {meal.items.map((item, i) => (
          <li key={i} className="meal-item">
            {lang === "en" ? item.en : item.bn}
          </li>
        ))}
      </ul>
    </div>
  );
}
