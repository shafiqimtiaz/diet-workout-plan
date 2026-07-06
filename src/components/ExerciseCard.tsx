import type { SupportedLanguage, Exercise } from "../types/plan";

interface ExerciseCardProps {
  lang: SupportedLanguage;
  exercise: Exercise;
}

export default function ExerciseCard({ lang, exercise }: ExerciseCardProps) {
  return (
    <div className="exercise-card fade-in">
      <div className="exercise-info">
        <div className="exercise-emoji">{exercise.emoji}</div>
        <div>
          <div className="exercise-name">
            {lang === "en" ? exercise.name.en : exercise.name.bn}
          </div>
          <div className="exercise-detail">
            {lang === "en" ? exercise.detail.en : exercise.detail.bn}
          </div>
        </div>
      </div>
      {exercise.sets && <div className="exercise-sets">{exercise.sets}</div>}
    </div>
  );
}
