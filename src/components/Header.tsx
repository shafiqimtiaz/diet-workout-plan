import { useState, useEffect } from "react";
import type { SupportedLanguage } from "../types/plan";

interface HeaderProps {
  lang: SupportedLanguage;
  onToggleLang: () => void;
  calories: number;
  onGenerate: (c: number) => void;
  loading: boolean;
}

export default function Header({
  lang,
  onToggleLang,
  calories,
  onGenerate,
  loading,
}: HeaderProps) {
  // Local draft so typing doesn't trigger generation on every keystroke.
  const [draft, setDraft] = useState(calories);

  // Sync when the committed value changes externally (e.g. clamping).
  useEffect(() => setDraft(calories), [calories]);

  const generate = () => onGenerate(draft);

  return (
    <header>
      <div className="header-content">
        <div className="brand">
          <h1>
            {lang === "en"
              ? "Diet & Workout Plan"
              : "ডায়েট ও ওয়ার্কআউট প্ল্যান"}
          </h1>
        </div>
        <div className="controls">
          <div className="calorie-input">
            <label htmlFor="calorie-target">
              {lang === "en" ? "Target cal:" : "লক্ষ্য ক্যালোরি:"}
            </label>
            <input
              id="calorie-target"
              type="number"
              min={1200}
              max={4000}
              step={50}
              value={draft}
              onChange={(e) => setDraft(Number(e.target.value))}
              onKeyDown={(e) => {
                if (e.key === "Enter") generate();
              }}
              disabled={loading}
            />
            {loading && <span className="spinner" />}
          </div>
          <button
            className="btn btn-generate"
            onClick={generate}
            disabled={loading}
            title={lang === "en" ? "Generate plan" : "প্ল্যান তৈরি করুন"}
            aria-label={lang === "en" ? "Generate plan" : "প্ল্যান তৈরি করুন"}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 12a9 9 0 1 1-2.64-6.36" />
              <polyline points="21 3 21 9 15 9" />
            </svg>
          </button>
          <button className="btn btn-lang" onClick={onToggleLang}>
            {lang === "en" ? "বাংলা" : "English"}
          </button>
        </div>
      </div>
    </header>
  );
}
