import { useState } from "react";
import type { SupportedLanguage } from "../types/plan";
import {
  computeCalories,
  type Profile,
  type ActivityLevel,
  type Sex,
} from "../services/calories";

interface ProfileBarProps {
  lang: SupportedLanguage;
  profile: Profile;
  onLockIn: (p: Profile) => void;
}

const ACTIVITY_OPTIONS: { value: ActivityLevel; en: string; bn: string }[] = [
  { value: "sedentary", en: "Sedentary", bn: "নিষ্ক্রিয়" },
  { value: "light", en: "Lightly active", bn: "হালকা সক্রিয়" },
  { value: "moderate", en: "Moderately active", bn: "মাঝারি সক্রিয়" },
  { value: "active", en: "Very active", bn: "খুব সক্রিয়" },
  { value: "extra", en: "Extra active", bn: "অতি সক্রিয়" },
];

export default function ProfileBar({
  lang,
  profile,
  onLockIn,
}: ProfileBarProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Profile>(profile);

  const t = (en: string, bn: string) => (lang === "en" ? en : bn);
  const activityLabel = (a: ActivityLevel) => {
    const o = ACTIVITY_OPTIONS.find((x) => x.value === a);
    return o ? t(o.en, o.bn) : a;
  };

  const num = (v: string) => (v === "" ? 0 : Number(v));

  const startEdit = () => {
    setDraft(profile);
    setEditing(true);
  };

  const lockIn = () => {
    onLockIn(draft);
    setEditing(false);
  };

  if (!editing) {
    const summary = `${profile.heightFt}'${profile.heightIn}" · ${profile.weightKg}kg · ${profile.age} · ${profile.sex === "male" ? t("M", "পু") : t("F", "মহি")} · ${activityLabel(profile.activity)} · ${profile.location}`;
    return (
      <div className="profile-bar">
        <span className="profile-summary" title={summary}>
          👤 {summary}
        </span>
        <button className="btn btn-profile-edit" onClick={startEdit}>
          {t("Edit", "সম্পাদনা")}
        </button>
      </div>
    );
  }

  const recommended = computeCalories(draft).recommended;

  return (
    <div className="profile-bar profile-bar-editing">
      <div className="profile-fields">
        <label className="profile-field">
          <span>{t("Height", "উচ্চতা")}</span>
          <span className="profile-height">
            <input
              type="number"
              min={3}
              max={8}
              value={draft.heightFt}
              onChange={(e) =>
                setDraft({ ...draft, heightFt: num(e.target.value) })
              }
            />
            <em>ft</em>
            <input
              type="number"
              min={0}
              max={11}
              value={draft.heightIn}
              onChange={(e) =>
                setDraft({ ...draft, heightIn: num(e.target.value) })
              }
            />
            <em>in</em>
          </span>
        </label>

        <label className="profile-field">
          <span>{t("Weight", "ওজন")}</span>
          <span className="profile-unit">
            <input
              type="number"
              min={30}
              max={250}
              value={draft.weightKg}
              onChange={(e) =>
                setDraft({ ...draft, weightKg: num(e.target.value) })
              }
            />
            <em>kg</em>
          </span>
        </label>

        <label className="profile-field">
          <span>{t("Age", "বয়স")}</span>
          <input
            type="number"
            min={13}
            max={100}
            value={draft.age}
            onChange={(e) => setDraft({ ...draft, age: num(e.target.value) })}
          />
        </label>

        <label className="profile-field">
          <span>{t("Sex", "লিঙ্গ")}</span>
          <select
            value={draft.sex}
            onChange={(e) =>
              setDraft({ ...draft, sex: e.target.value as Sex })
            }
          >
            <option value="male">{t("Male", "পুরুষ")}</option>
            <option value="female">{t("Female", "মহিলা")}</option>
          </select>
        </label>

        <label className="profile-field">
          <span>{t("Activity", "কার্যকলাপ")}</span>
          <select
            value={draft.activity}
            onChange={(e) =>
              setDraft({ ...draft, activity: e.target.value as ActivityLevel })
            }
          >
            {ACTIVITY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {t(o.en, o.bn)}
              </option>
            ))}
          </select>
        </label>

        <label className="profile-field profile-field-location">
          <span>{t("Location", "অবস্থান")}</span>
          <input
            type="text"
            value={draft.location}
            onChange={(e) => setDraft({ ...draft, location: e.target.value })}
          />
        </label>
      </div>

      <div className="profile-actions">
        <span className="profile-recommended">
          {t("Recommended", "প্রস্তাবিত")}: <strong>{recommended}</strong>{" "}
          {t("cal", "ক্যালোরি")}
        </span>
        <button className="btn btn-lang" onClick={lockIn}>
          {t("Lock in", "লক করুন")}
        </button>
      </div>
    </div>
  );
}
