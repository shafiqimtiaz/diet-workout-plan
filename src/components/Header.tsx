import type { SupportedLanguage } from '../types/plan';

interface HeaderProps {
  lang: SupportedLanguage;
  onToggleLang: () => void;
  calories: number;
  onCaloriesChange: (c: number) => void;
  loading: boolean;
}

export default function Header({ lang, onToggleLang, calories, onCaloriesChange, loading }: HeaderProps) {
  return (
    <header>
      <div className="header-content">
        <div className="brand">
          <h1>{lang === 'en' ? 'Diet & Workout Plan' : 'ডায়েট ও ওয়ার্কআউট প্ল্যান'}</h1>
        </div>
        <div className="controls">
          <div className="calorie-input">
            <label htmlFor="calorie-target">
              {lang === 'en' ? 'Target cal:' : 'লক্ষ্য ক্যালোরি:'}
            </label>
            <input
              id="calorie-target"
              type="number"
              min={1200}
              max={4000}
              step={50}
              value={calories}
              onChange={(e) => onCaloriesChange(Number(e.target.value))}
              disabled={loading}
            />
            {loading && <span className="spinner" />}
          </div>
          <button className="btn btn-lang" onClick={onToggleLang}>
            {lang === 'en' ? 'বাংলা' : 'English'}
          </button>
        </div>
      </div>
    </header>
  );
}
