import type { SupportedLanguage } from '../types/plan';
import { DAY_NAMES } from '../types/plan';

interface DaySelectorProps {
  lang: SupportedLanguage;
  activeDay: number;
  onDayChange: (day: number) => void;
}

export default function DaySelector({ lang, activeDay, onDayChange }: DaySelectorProps) {
  return (
    <div className="day-selector">
      {DAY_NAMES.map((day, i) => (
        <button
          key={i}
          className={`day-btn ${activeDay === i ? 'active' : ''}`}
          onClick={() => onDayChange(i)}
        >
          <span className="day-short">{lang === 'en' ? day.en : day.bn}</span>
          <span className="day-full">{lang === 'en' ? day.fullEn : day.fullBn}</span>
        </button>
      ))}
    </div>
  );
}
