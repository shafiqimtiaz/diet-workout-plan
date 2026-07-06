import type { SupportedLanguage, DayPlan } from '../types/plan';
import DaySelector from './DaySelector';
import DaySummary from './DaySummary';
import MealCard from './MealCard';
import ExerciseCard from './ExerciseCard';

interface DailyPlanProps {
  lang: SupportedLanguage;
  activeDay: number;
  onDayChange: (day: number) => void;
  day: DayPlan;
}

export default function DailyPlan({ lang, activeDay, onDayChange, day }: DailyPlanProps) {
  return (
    <div id="view-daily" className="tab-view fade-in">
      <DaySelector lang={lang} activeDay={activeDay} onDayChange={onDayChange} />
      <DaySummary lang={lang} dayIndex={activeDay} day={day} />

      <div className="plan-grid">
        {/* Diet Column */}
        <div className="diet-column">
          <h3 className="column-title">
            <span>🥗</span>
            <span>{lang === 'en' ? 'Diet Plan' : 'ডায়েট প্ল্যান'}</span>
          </h3>
          {day.diet.meals.map((meal, i) => (
            <MealCard key={i} lang={lang} meal={meal} index={i} />
          ))}
        </div>

        {/* Workout Column */}
        <div className="workout-column">
          <h3 className="column-title">
            <span>💪</span>
            <span>{lang === 'en' ? 'Workout Routine' : 'ওয়ার্কআউট রুটিন'}</span>
          </h3>

          <div className="workout-meta">
            <div className="workout-badge" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
              🕐 {lang === 'en' ? day.workout.duration.en : day.workout.duration.bn}
            </div>
            <div className="workout-badge" style={{ backgroundColor: '#EFF6FF', color: '#1D4ED8' }}>
              🎯 {lang === 'en' ? day.workout.focus.en : day.workout.focus.bn}
            </div>
          </div>

          <div className="tip-box">
            <div className="tip-box-title">
              {lang === 'en' ? '🧠 Coach Tip' : '🧠 কোচের পরামর্শ'}
            </div>
            {lang === 'en' ? day.workout.tip.en : day.workout.tip.bn}
          </div>

          {day.workout.exercises.map((ex, i) => (
            <ExerciseCard key={i} lang={lang} exercise={ex} />
          ))}
        </div>
      </div>
    </div>
  );
}
