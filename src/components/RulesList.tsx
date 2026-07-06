import { useState } from 'react';
import type { SupportedLanguage } from '../types/plan';

interface RulesListProps {
  lang: SupportedLanguage;
}

const RULES = {
  en: [
    'Drink 8–10 glasses of water daily',
    'Kitchen closes at 9 PM — brush your teeth after dinner',
    'No sugary drinks — soda, juice, or sweetened cha',
    'Avoid deep-fried and ultra-processed food',
    'Hit your protein number first, every day',
    'Eat slowly — you\'re full before you feel it',
  ],
  bn: [
    'প্রতিদিন ৮–১০ গ্লাস পানি পান করুন',
    'রাত ৯টায় রান্নাঘর বন্ধ — রাতের খাবারের পরে দাঁত ব্রাশ করুন',
    'চিনিযুক্ত পানীয় নয় — কোলা, জুস বা মিষ্টি চা নয়',
    'ডুবো তেলে ভাজা ও প্রক্রিয়াজাত খাবার এড়িয়ে চলুন',
    'প্রতিদিন আগে প্রোটিন লক্ষ্য পূরণ করুন',
    'ধীরে ধীরে খান — পেট ভরার অনুভূতি দেরিতে আসে',
  ],
};

export default function RulesList({ lang }: RulesListProps) {
  const [checked, setChecked] = useState<boolean[]>(new Array(6).fill(false));
  const rules = lang === 'en' ? RULES.en : RULES.bn;

  const toggle = (i: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  return (
    <div className="g-card">
      <div className="rules-list">
        {rules.map((rule, i) => (
          <div
            key={i}
            className={`rule-item ${checked[i] ? 'checked' : ''}`}
            onClick={() => toggle(i)}
          >
            <div className={`rule-checkbox ${checked[i] ? 'checked' : ''}`}>
              {checked[i] ? '✓' : ''}
            </div>
            <div className="rule-text">{rule}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
