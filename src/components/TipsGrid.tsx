import type { SupportedLanguage, Bilingual } from "../types/plan";

interface TipsGridProps {
  lang: SupportedLanguage;
}

const b = (en: string, bn: string): Bilingual => ({ en, bn });

const TIPS = [
  {
    emoji: "💻",
    title: b("Beat the desk", "ডেস্কের বিরুদ্ধে লড়ুন"),
    body: b(
      "Remote desk work is the real enemy. Stand and walk 5 minutes every hour (set a timer), take calls while pacing, and aim for 8,000 steps a day — the trail at Bayshore makes this easy.",
      "রিমোট ডেস্ক কাজই আসল শত্রু। প্রতি ঘণ্টায় ৫ মিনিট উঠে হাঁটুন (টাইমার দিন), কল হাঁটতে হাঁটতে নিন, দিনে ৮,০০০ স্টেপের লক্ষ্য রাখুন — বেশোরের ট্রেইল এটা সহজ করে দেয়।",
    ),
  },
  {
    emoji: "🍚",
    title: b("The Bangladeshi plate hack", "বাংলাদেশি প্লেটের কৌশল"),
    body: b(
      "Keep the food you love, change the ratios: half the rice, double the vegetables and dal. Cook bhuna with 1 tsp oil instead of ½ cup. At dawats, eat protein and salad first, then take one small plate of the rest — no seconds.",
      "প্রিয় খাবার রাখুন, অনুপাত বদলান: ভাত অর্ধেক, সবজি ও ডাল দ্বিগুণ। ভুনায় আধা কাপ তেলের বদলে ১ চামচ ব্যবহার করুন। দাওয়াতে আগে প্রোটিন ও সালাদ খান, তারপর বাকি সব এক ছোট প্লেট — দ্বিতীয়বার নয়।",
    ),
  },
  {
    emoji: "🏋️",
    title: b("Progressive overload", "প্রগ্রেসিভ ওভারলোড"),
    body: b(
      "Muscle only grows if the weight grows. Log every lift in a note. When you finish all sets at the top of the rep range, add 2.5 kg. Your 50 kg set will last months this way.",
      "ওজন না বাড়লে পেশি বাড়ে না। প্রতিটি লিফট নোটে লিখে রাখুন। সব সেটে সর্বোচ্চ রেপ পূরণ হলে ২.৫ কেজি বাড়ান। এভাবে আপনার ৫০ কেজির সেট মাসের পর মাস কাজে লাগবে।",
    ),
  },
  {
    emoji: "🥚",
    title: b("Protein protects muscle", "প্রোটিন পেশি রক্ষা করে"),
    body: b(
      "In a calorie deficit, protein is what decides whether you lose fat or muscle. Eggs, chicken, fish, dal, and Greek yogurt should appear in every meal.",
      "ক্যালোরি ঘাটতিতে প্রোটিনই ঠিক করে আপনি চর্বি হারাবেন নাকি পেশি। প্রতি বেলায় ডিম, মুরগি, মাছ, ডাল বা গ্রিক দই রাখুন।",
    ),
  },
  {
    emoji: "❄️",
    title: b("Ottawa winter plan", "অটোয়ার শীতকালীন পরিকল্পনা"),
    body: b(
      "Cycling season is roughly April–October. From November to March, swap bike days for indoor dumbbell circuits, stair climbs, or a layered-up winter walk on the trail.",
      "সাইক্লিং মৌসুম মোটামুটি এপ্রিল–অক্টোবর। নভেম্বর–মার্চে সাইকেলের দিনে ইনডোর ডাম্বেল সার্কিট, সিঁড়ি ভাঙা, বা গরম কাপড়ে ট্রেইলে হাঁটুন।",
    ),
  },
  {
    emoji: "⚖️",
    title: b(
      "Weigh in weekly, not daily",
      "প্রতিদিন নয়, সপ্তাহে একবার ওজন মাপুন",
    ),
    body: b(
      "Weigh yourself once a week, same day, in the morning — daily numbers bounce around and only stress you out. 76 → 65 kg by December means roughly 0.5 kg per week: steady, achievable, and no crash dieting needed.",
      "সপ্তাহে একবার, একই দিনে, সকালে ওজন মাপুন — প্রতিদিনের সংখ্যা ওঠানামা করে শুধু চাপ বাড়ায়। ডিসেম্বরের মধ্যে ৭৬ → ৬৫ কেজি মানে সপ্তাহে প্রায় ০.৫ কেজি: স্থির, অর্জনযোগ্য, ক্র্যাশ ডায়েটের দরকার নেই।",
    ),
  },
  {
    emoji: "😴",
    title: b("Sleep is a training day", "ঘুমও ট্রেনিংয়ের অংশ"),
    body: b(
      "7–8 hours of sleep. Late-night coding sessions are where hidden snack calories live, and poor sleep spikes hunger the next day. Muscle is built in bed, not just under the barbell.",
      "৭–৮ ঘণ্টা ঘুমান। গভীর রাতের কোডিং সেশনেই লুকানো স্ন্যাকের ক্যালোরি ঢোকে, আর কম ঘুম পরদিন ক্ষুধা বাড়ায়। পেশি বারবেলের নিচে নয়, ঘুমের মধ্যে তৈরি হয়।",
    ),
  },
];

export default function TipsGrid({ lang }: TipsGridProps) {
  return (
    <div className="tips-grid">
      {TIPS.map((tip, i) => (
        <div key={i} className="tip-card fade-in">
          <div className="tip-header">
            <div className="tip-icon">{tip.emoji}</div>
            <div className="tip-title">
              {lang === "en" ? tip.title.en : tip.title.bn}
            </div>
          </div>
          <div className="tip-body">
            {lang === "en" ? tip.body.en : tip.body.bn}
          </div>
        </div>
      ))}
    </div>
  );
}
