import { useState, useCallback } from "react";
import { useGeminiPlan } from "./hooks/useGeminiPlan";
import type { SupportedLanguage } from "./types/plan";
import Header from "./components/Header";
import ProfileBar from "./components/ProfileBar";
import TabNav from "./components/TabNav";
import DailyPlan from "./components/DailyPlan";
import RulesList from "./components/RulesList";
import TipsGrid from "./components/TipsGrid";
import "./index.css";

export default function App() {
  const [lang, setLang] = useState<SupportedLanguage>("en");
  const [activeTab, setActiveTab] = useState("daily");
  const [activeDay, setActiveDay] = useState(new Date().getDay());

  const {
    profile,
    setProfile,
    calories,
    setCalories,
    range,
    generate,
    dirty,
    plan,
    loading,
    error,
    usingFallback,
  } = useGeminiPlan();

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "en" ? "bn" : "en"));
  }, []);

  const day = plan.days[activeDay] ?? plan.days[0];

  return (
    <div className="g-root">
      <Header
        lang={lang}
        onToggleLang={toggleLang}
        calories={calories}
        onCaloriesChange={setCalories}
        onGenerate={generate}
        min={range.min}
        max={range.max}
        dirty={dirty}
        loading={loading}
      />

      <ProfileBar lang={lang} profile={profile} onLockIn={setProfile} />

      <main className="container">
        <TabNav lang={lang} activeTab={activeTab} onTabChange={setActiveTab} />

        {usingFallback && error && (
          <div className="api-banner">
            <span>⚠️</span> {error}
          </div>
        )}

        {activeTab === "daily" && day && (
          <DailyPlan
            lang={lang}
            activeDay={activeDay}
            onDayChange={setActiveDay}
            day={day}
          />
        )}

        {activeTab === "rules" && (
          <div id="view-rules" className="tab-view fade-in">
            <RulesList lang={lang} />
          </div>
        )}

        {activeTab === "tips" && (
          <div id="view-tips" className="tab-view fade-in">
            <TipsGrid lang={lang} />
          </div>
        )}
      </main>

      <footer>
        <div className="container">
          <p>
            {lang === "en"
              ? "Personal health companion. Honoring healthy lifestyle guidelines daily."
              : "ব্যক্তিগত স্বাস্থ্য সহচর। প্রতিদিন স্বাস্থ্যকর জীবনধারা নির্দেশিকা সম্মানিত করা।"}
          </p>
        </div>
      </footer>
    </div>
  );
}
