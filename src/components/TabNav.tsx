import type { SupportedLanguage } from "../types/plan";

interface TabNavProps {
  lang: SupportedLanguage;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = [
  { id: "daily", en: "Daily Plan", bn: "দৈনিক প্ল্যান" },
  { id: "rules", en: "Weekly Rules", bn: "সাপ্তাহিক নিয়ম" },
  { id: "tips", en: "Health Tips", bn: "স্বাস্থ্য টিপস" },
];

export default function TabNav({ lang, activeTab, onTabChange }: TabNavProps) {
  return (
    <div className="nav-tabs">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`nav-tab ${activeTab === tab.id ? "active" : ""}`}
          onClick={() => onTabChange(tab.id)}
        >
          {lang === "en" ? tab.en : tab.bn}
        </button>
      ))}
    </div>
  );
}
