import type {
  WeeklyPlan,
  DayPlan,
  Bilingual,
} from "../types/plan";

const b = (en: string, bn: string): Bilingual => ({ en, bn });

/* ── FULL 7-DAY STATIC PLAN ── */
const STATIC_DAYS: DayPlan[] = [
  /* ── Sunday ── */
  {
    diet: {
      calories: 1600,
      protein: 118,
      meals: [
        {
          time: b("Breakfast", "সকাল"),
          detail: b("7–8 AM", "সকাল ৭–৮টা"),
          icon: "🌅",
          cal: 360,
          items: [
            b("2 scrambled eggs", "২টি স্ক্র্যাম্বলড ডিম"),
            b("2 slices whole grain toast", "২ স্লাইস হোল গ্রেইন পাউরুটি"),
            b("Black coffee or herbal tea", "ব্ল্যাক কফি বা হার্বাল চা"),
          ],
        },
        {
          time: b("Lunch", "দুপুর"),
          detail: b("12:30–1:30 PM", "দুপুর ১২:৩০–১:৩০"),
          icon: "☀️",
          cal: 570,
          items: [
            b(
              "Beef curry — lean chuck (150g)",
              "গরুর মাংসের ঝোল — লিন কাট (১৫০গ্রাম)",
            ),
            b("1 cup basmati rice", "১ কাপ বাসমতি ভাত"),
            b("Masoor dal", "মসুর ডাল"),
            b("Mixed vegetable stir fry", "মিশ্র সবজি ভাজি"),
          ],
        },
        {
          time: b("Snack", "বিকেল"),
          detail: b("3:30–4:30 PM", "বিকেল ৩:৩০–৪:৩০"),
          icon: "🍎",
          cal: 160,
          items: [
            b("Greek yogurt plain (150g)", "গ্রিক দই প্লেইন (১৫০গ্রাম)"),
            b(
              "Mixed berries — blueberry & strawberry",
              "মিশ্র বেরি — ব্লুবেরি ও স্ট্রবেরি",
            ),
          ],
        },
        {
          time: b("Dinner", "রাত"),
          detail: b("7–8 PM", "রাত ৭–৮টা"),
          icon: "🌙",
          cal: 510,
          items: [
            b("2 whole wheat roti", "২টি গমের আটার রুটি"),
            b("Grilled chicken (100g)", "গ্রিলড চিকেন (১০০গ্রাম)"),
            b("Lentil soup (dal)", "ডাল স্যুপ"),
            b("Cucumber & tomato salad", "শসা ও টমেটো সালাদ"),
          ],
        },
      ],
    },
    workout: {
      type: b("Active Rest", "সক্রিয় বিশ্রাম"),
      duration: b("35 min", "৩৫ মিনিট"),
      focus: b("Recovery", "পুনরুদ্ধার"),
      tip: b(
        "The Trans Canada Trail is minutes from your door — an easy Sunday walk there resets your legs for Monday's lifting.",
        "ট্রান্স কানাডা ট্রেইল আপনার বাসার পাশেই — রবিবারের সহজ হাঁটা সোমবারের ওয়েট ট্রেনিংয়ের জন্য পা প্রস্তুত করে।",
      ),
      exercises: [
        {
          name: b("Trail Walk (easy)", "ট্রেইলে সহজ হাঁটা"),
          detail: b(
            "30 min on the Trans Canada Trail, relaxed pace",
            "ট্রান্স কানাডা ট্রেইলে ৩০ মিনিট, আরামদায়ক গতিতে",
          ),
          sets: null,
          emoji: "🚶",
        },
        {
          name: b("Full Body Stretch", "ফুল বডি স্ট্রেচ"),
          detail: b(
            "10 min — hips, hamstrings, chest, back",
            "১০ মিনিট — কোমর, হ্যামস্ট্রিং, বুক, পিঠ",
          ),
          sets: null,
          emoji: "🧘",
        },
      ],
    },
  },
  /* ── Monday ── */
  {
    diet: {
      calories: 1520,
      protein: 115,
      meals: [
        {
          time: b("Breakfast", "সকাল"),
          detail: b("7–8 AM", "সকাল ৭–৮টা"),
          icon: "🌅",
          cal: 320,
          items: [
            b("Oatmeal with banana", "ওটমিল ও কলা"),
            b("1 tsp honey", "১ চামচ মধু"),
            b("Black coffee", "ব্ল্যাক কফি"),
          ],
        },
        {
          time: b("Lunch", "দুপুর"),
          detail: b("12:30–1:30 PM", "দুপুর ১২:৩০–১:৩০"),
          icon: "☀️",
          cal: 480,
          items: [
            b(
              "Grilled chicken breast stir fry (150g)",
              "গ্রিলড চিকেন ব্রেস্ট স্টার ফ্রাই (১৫০গ্রাম)",
            ),
            b("½ cup brown rice", "আধা কাপ ব্রাউন রাইস"),
            b("Broccoli & bell pepper", "ব্রকলি ও ক্যাপসিকাম"),
            b("Low-sodium soy sauce + garlic", "কম লবণের সয় সস + রসুন"),
          ],
        },
        {
          time: b("Snack", "বিকেল"),
          detail: b("3:30–4:30 PM", "বিকেল ৩:৩০–৪:৩০"),
          icon: "🍎",
          cal: 160,
          items: [
            b("1 apple", "১টি আপেল"),
            b("10–12 almonds", "১০–১২টি আমন্ড বাদাম"),
          ],
        },
        {
          time: b("Dinner", "রাত"),
          detail: b("7–8 PM", "রাত ৭–৮টা"),
          icon: "🌙",
          cal: 560,
          items: [
            b("Mung dal (মুগ ডাল)", "মুগ ডাল"),
            b("2 wheat roti", "২টি গমের রুটি"),
            b("2 boiled eggs", "২টি সিদ্ধ ডিম"),
            b("Cucumber salad with lemon", "শসার সালাদ ও লেবু"),
          ],
        },
      ],
    },
    workout: {
      type: b("Strength · Push", "শক্তি · পুশ"),
      duration: b("40 min", "৪০ মিনিট"),
      focus: b("Chest · Shoulders · Triceps", "বুক · কাঁধ · ট্রাইসেপ"),
      tip: b(
        "When you complete all sets at the top of the rep range with good form, add 2.5 kg next week. That's how muscle is built.",
        "সব সেটে সর্বোচ্চ রেপ সঠিকভাবে করতে পারলে পরের সপ্তাহে ২.৫ কেজি বাড়ান। এভাবেই পেশি তৈরি হয়।",
      ),
      exercises: [
        {
          name: b("Dumbbell Floor Press", "ডাম্বেল ফ্লোর প্রেস"),
          detail: b("4 sets × 8–10 reps", "৪ সেট × ৮–১০ বার"),
          sets: "4×8–10",
          emoji: "🏋️",
        },
        {
          name: b("Dumbbell Overhead Press", "ডাম্বেল ওভারহেড প্রেস"),
          detail: b("3 sets × 8–10 reps", "৩ সেট × ৮–১০ বার"),
          sets: "3×8–10",
          emoji: "💪",
        },
        {
          name: b("Push-up", "পুশআপ"),
          detail: b("3 sets × max reps", "৩ সেট × সর্বোচ্চ বার"),
          sets: "3×max",
          emoji: "🤸",
        },
        {
          name: b("Dumbbell Lateral Raise", "ডাম্বেল ল্যাটারাল রেইজ"),
          detail: b(
            "3 sets × 12–15 reps, light weight",
            "৩ সেট × ১২–১৫ বার, হালকা ওজনে",
          ),
          sets: "3×12–15",
          emoji: "🕊️",
        },
      ],
    },
  },
  /* ── Tuesday ── */
  {
    diet: {
      calories: 1580,
      protein: 122,
      meals: [
        {
          time: b("Breakfast", "সকাল"),
          detail: b("7–8 AM", "সকাল ৭–৮টা"),
          icon: "🌅",
          cal: 380,
          items: [
            b("2 eggs any style", "২টি ডিম যেকোনো ভাবে"),
            b("2 slices whole grain toast", "২ স্লাইস হোল গ্রেইন পাউরুটি"),
            b("½ avocado", "আধা অ্যাভোকাডো"),
            b("Green tea or coffee", "গ্রিন টি বা কফি"),
          ],
        },
        {
          time: b("Lunch", "দুপুর"),
          detail: b("12:30–1:30 PM", "দুপুর ১২:৩০–১:৩০"),
          icon: "☀️",
          cal: 520,
          items: [
            b(
              "Grilled Atlantic salmon (170g)",
              "গ্রিলড অ্যাটলান্টিক স্যালমন (১৭০গ্রাম)",
            ),
            b("Baked sweet potato", "বেকড মিষ্টি আলু"),
            b("Spinach & cherry tomato salad", "পালং শাক ও চেরি টমেটো সালাদ"),
            b("Lemon dressing (no mayo)", "লেবুর ড্রেসিং (মেয়ো ছাড়া)"),
          ],
        },
        {
          time: b("Snack", "বিকেল"),
          detail: b("3:30–4:30 PM", "বিকেল ৩:৩০–৪:৩০"),
          icon: "🍎",
          cal: 150,
          items: [b("Greek yogurt + blueberries", "গ্রিক দই + ব্লুবেরি")],
        },
        {
          time: b("Dinner", "রাত"),
          detail: b("7–8 PM", "রাত ৭–৮টা"),
          icon: "🌙",
          cal: 530,
          items: [
            b("Masoor dal soup", "মসুর ডালের স্যুপ"),
            b("2 whole grain roti", "২টি হোল গ্রেইন রুটি"),
            b(
              "Chicken bhuna — light oil (100g)",
              "চিকেন ভুনা — অল্প তেলে (১০০গ্রাম)",
            ),
            b("Stir fried korola / begun", "করলা বা বেগুন ভাজি"),
          ],
        },
      ],
    },
    workout: {
      type: b("Cardio · Trail", "কার্ডিও · ট্রেইল"),
      duration: b("40 min", "৪০ মিনিট"),
      focus: b("Intervals · Fat Burn", "ইন্টারভাল · চর্বি পোড়ানো"),
      tip: b(
        "Intervals burn more in 40 minutes than a slow hour. In winter, swap for stair climbs + jumping jacks indoors.",
        "ইন্টারভাল ৪০ মিনিটে ধীর এক ঘণ্টার চেয়ে বেশি ক্যালোরি পোড়ায়। শীতে ঘরে সিঁড়ি ভাঙা + জাম্পিং জ্যাক করুন।",
      ),
      exercises: [
        {
          name: b("Warm-up Walk", "ওয়ার্ম-আপ হাঁটা"),
          detail: b("5 min easy pace", "৫ মিনিট সহজ গতি"),
          sets: null,
          emoji: "🌿",
        },
        {
          name: b("Walk / Jog Intervals", "হাঁটা / জগিং ইন্টারভাল"),
          detail: b(
            "10 × (1 min fast / 1 min easy) on the trail",
            "ট্রেইলে ১০ × (১ মিনিট দ্রুত / ১ মিনিট ধীরে)",
          ),
          sets: "10 rounds",
          emoji: "🏃",
        },
        {
          name: b("Cool-down Walk", "কুলডাউন হাঁটা"),
          detail: b(
            "10 min slow + light stretch",
            "১০ মিনিট ধীরে + হালকা স্ট্রেচ",
          ),
          sets: null,
          emoji: "🚶",
        },
      ],
    },
  },
  /* ── Wednesday ── */
  {
    diet: {
      calories: 1560,
      protein: 116,
      meals: [
        {
          time: b("Breakfast", "সকাল"),
          detail: b("7–8 AM", "সকাল ৭–৮টা"),
          icon: "🌅",
          cal: 340,
          items: [
            b("Greek yogurt parfait + granola", "গ্রিক দই পারফেট + গ্রানোলা"),
            b("Seasonal fruits — mango or banana", "মৌসুমী ফল — আম বা কলা"),
            b("Black coffee or green tea", "ব্ল্যাক কফি বা গ্রিন টি"),
          ],
        },
        {
          time: b("Lunch", "দুপুর"),
          detail: b("12:30–1:30 PM", "দুপুর ১২:৩০–১:৩০"),
          icon: "☀️",
          cal: 520,
          items: [
            b(
              "Lamb curry — lean leg cut (150g)",
              "ভেড়ার মাংসের ঝোল — লিন লেগ কাট (১৫০গ্রাম)",
            ),
            b("Cauliflower rice", "ফুলকপি রাইস"),
            b("Bell peppers + onions + garlic", "ক্যাপসিকাম + পেঁয়াজ + রসুন"),
            b("Cumin + chili flakes seasoning", "জিরা + লাল মরিচ মশলা"),
          ],
        },
        {
          time: b("Snack", "বিকেল"),
          detail: b("3:30–4:30 PM", "বিকেল ৩:৩০–৪:৩০"),
          icon: "🍎",
          cal: 160,
          items: [
            b(
              "Mixed unsalted nuts — almonds & walnuts",
              "মিশ্র বাদাম — আমন্ড ও ওয়ালনাট",
            ),
          ],
        },
        {
          time: b("Dinner", "রাত"),
          detail: b("7–8 PM", "রাত ৭–৮টা"),
          icon: "🌙",
          cal: 540,
          items: [
            b("Mung dal + 2 roti", "মুগ ডাল + ২টি রুটি"),
            b("1 boiled egg", "১টি সিদ্ধ ডিম"),
            b("Sautéed mixed vegetables", "সবজি ভাজি মিশ্রণ"),
            b("Cucumber raita (yogurt + cucumber)", "কুকুম্বার রাইতা"),
          ],
        },
      ],
    },
    workout: {
      type: b("Strength · Pull", "শক্তি · পুল"),
      duration: b("40 min", "৪০ মিনিট"),
      focus: b("Back · Biceps · Core", "পিঠ · বাইসেপ · কোর"),
      tip: b(
        "A strong back fixes desk-developer posture. Squeeze your shoulder blades together at the top of every row.",
        "শক্ত পিঠ ডেস্কে বসা ডেভেলপারের ভঙ্গি ঠিক করে। প্রতিটি রো-এর শেষে কাঁধের হাড় একসাথে চেপে ধরুন।",
      ),
      exercises: [
        {
          name: b("Barbell Bent-over Row", "বারবেল বেন্ট-ওভার রো"),
          detail: b("4 sets × 8–10 reps", "৪ সেট × ৮–১০ বার"),
          sets: "4×8–10",
          emoji: "🏋️",
        },
        {
          name: b("One-arm Dumbbell Row", "এক হাতে ডাম্বেল রো"),
          detail: b("3 sets × 10 reps each side", "৩ সেট × প্রতি পাশে ১০ বার"),
          sets: "3×10",
          emoji: "💪",
        },
        {
          name: b("Dumbbell Curl", "ডাম্বেল কার্ল"),
          detail: b("3 sets × 10–12 reps", "৩ সেট × ১০–১২ বার"),
          sets: "3×10–12",
          emoji: "🦾",
        },
        {
          name: b("Plank", "প্ল্যাংক"),
          detail: b("3 sets × 45 seconds", "৩ সেট × ৪৫ সেকেন্ড"),
          sets: "3×45s",
          emoji: "🤸",
        },
      ],
    },
  },
  /* ── Thursday ── */
  {
    diet: {
      calories: 1540,
      protein: 114,
      meals: [
        {
          time: b("Breakfast", "সকাল"),
          detail: b("7–8 AM", "সকাল ৭–৮টা"),
          icon: "🌅",
          cal: 310,
          items: [
            b("Oatmeal + mixed berries", "ওটমিল + মিশ্র বেরি"),
            b("1 tsp honey", "১ চামচ মধু"),
            b("Black coffee", "ব্ল্যাক কফি"),
          ],
        },
        {
          time: b("Lunch", "দুপুর"),
          detail: b("12:30–1:30 PM", "দুপুর ১২:৩০–১:৩০"),
          icon: "☀️",
          cal: 490,
          items: [
            b("Beef & vegetable soup (lean chuck)", "গরুর মাংস ও সবজির স্যুপ"),
            b("Carrots, celery, potato (small)", "গাজর, সেলেরি, আলু (ছোট)"),
            b("1 slice whole grain bread", "১ স্লাইস হোল গ্রেইন পাউরুটি"),
          ],
        },
        {
          time: b("Snack", "বিকেল"),
          detail: b("3:30–4:30 PM", "বিকেল ৩:৩০–৪:৩০"),
          icon: "🍎",
          cal: 110,
          items: [b("1 banana", "১টি কলা")],
        },
        {
          time: b("Dinner", "রাত"),
          detail: b("7–8 PM", "রাত ৭–৮টা"),
          icon: "🌙",
          cal: 630,
          items: [
            b("½ cup rice + masoor dal", "আধা কাপ ভাত + মসুর ডাল"),
            b("2 boiled eggs", "২টি সিদ্ধ ডিম"),
            b("Stir fried spinach (পালং শাক)", "পালং শাক ভাজি"),
          ],
        },
      ],
    },
    workout: {
      type: b("Cardio · Bike", "কার্ডিও · সাইকেল"),
      duration: b("50 min", "৫০ মিনিট"),
      focus: b("Steady Ride", "স্থির গতির রাইড"),
      tip: b(
        "From Bayshore, ride the trail toward Andrew Haydon Park along the river. In winter, do a 30-min indoor circuit instead.",
        "বেশোর থেকে নদীর ধারে অ্যান্ড্রু হেইডন পার্কের দিকে সাইকেল চালান। শীতে ৩০ মিনিটের ইনডোর সার্কিট করুন।",
      ),
      exercises: [
        {
          name: b("Bike Ride", "সাইকেল রাইড"),
          detail: b(
            "45–50 min steady pace — you should be able to talk, barely",
            "৪৫–৫০ মিনিট স্থির গতি — কথা বলা যায় এমন কষ্টে",
          ),
          sets: null,
          emoji: "🚴",
        },
        {
          name: b("Post-ride Stretch", "রাইডের পরে স্ট্রেচ"),
          detail: b(
            "5 min — quads, hips, lower back",
            "৫ মিনিট — উরু, কোমর, নিচের পিঠ",
          ),
          sets: null,
          emoji: "🧘",
        },
      ],
    },
  },
  /* ── Friday ── */
  {
    diet: {
      calories: 1560,
      protein: 120,
      meals: [
        {
          time: b("Breakfast", "সকাল"),
          detail: b("7–8 AM", "সকাল ৭–৮টা"),
          icon: "🌅",
          cal: 350,
          items: [
            b(
              "Smoothie: banana + spinach + Greek yogurt",
              "স্মুদি: কলা + পালং শাক + গ্রিক দই",
            ),
            b("1 tbsp peanut butter", "১ চামচ পিনাট বাটার"),
          ],
        },
        {
          time: b("Lunch", "দুপুর"),
          detail: b("12:30–1:30 PM", "দুপুর ১২:৩০–১:৩০"),
          icon: "☀️",
          cal: 470,
          items: [
            b(
              "Grilled chicken burger patty — no bun (150g)",
              "গ্রিলড চিকেন বার্গার প্যাটি — বান ছাড়া (১৫০গ্রাম)",
            ),
            b("Lettuce, tomato, pickled onion", "লেটুস, টমেটো, পিকলড পেঁয়াজ"),
            b("Baked sweet potato fries", "বেকড মিষ্টি আলু ফ্রাই"),
            b("Side salad — lemon dressing", "সাইড সালাদ — লেমন ড্রেসিং"),
          ],
        },
        {
          time: b("Snack", "বিকেল"),
          detail: b("3:30–4:30 PM", "বিকেল ৩:৩০–৪:৩০"),
          icon: "🍎",
          cal: 160,
          items: [
            b("Apple + 1 tbsp peanut butter", "আপেল + ১ চামচ পিনাট বাটার"),
          ],
        },
        {
          time: b("Dinner", "রাত"),
          detail: b("7–8 PM", "রাত ৭–৮টা"),
          icon: "🌙",
          cal: 580,
          items: [
            b("1 roti + mung dal (light)", "১টি রুটি + পাতলা মুগ ডাল"),
            b(
              "Grilled tilapia or pangash (120g)",
              "গ্রিলড তেলাপিয়া বা পাঙাশ (১২০গ্রাম)",
            ),
            b("Steamed broccoli & carrots", "স্টিমড ব্রকলি ও গাজর"),
            b("Cucumber & tomato salad", "শসা ও টমেটো সালাদ"),
          ],
        },
      ],
    },
    workout: {
      type: b("Strength · Legs", "শক্তি · পা"),
      duration: b("40 min", "৪০ মিনিট"),
      focus: b("Legs · Glutes", "পা · গ্লুট"),
      tip: b(
        "Legs are your biggest muscles — training them burns the most calories all week. Never skip Friday.",
        "পা শরীরের সবচেয়ে বড় পেশি — এদের ট্রেনিং সারা সপ্তাহে সবচেয়ে বেশি ক্যালোরি পোড়ায়। শুক্রবার কখনো বাদ দেবেন না।",
      ),
      exercises: [
        {
          name: b("Barbell / Goblet Squat", "বারবেল / গবলেট স্কোয়াট"),
          detail: b("4 sets × 8–10 reps", "৪ সেট × ৮–১০ বার"),
          sets: "4×8–10",
          emoji: "🦵",
        },
        {
          name: b("Romanian Deadlift", "রোমানিয়ান ডেডলিফট"),
          detail: b("3 sets × 10 reps — barbell", "৩ সেট × ১০ বার — বারবেল"),
          sets: "3×10",
          emoji: "🏋️",
        },
        {
          name: b("Walking Lunge (dumbbells)", "ওয়াকিং লাঞ্জ (ডাম্বেল)"),
          detail: b("3 sets × 10 each leg", "৩ সেট × প্রতি পায়ে ১০ বার"),
          sets: "3×10",
          emoji: "🚶",
        },
        {
          name: b("Calf Raise", "কাফ রেইজ"),
          detail: b(
            "3 sets × 15 reps, holding dumbbells",
            "৩ সেট × ১৫ বার, ডাম্বেল হাতে",
          ),
          sets: "3×15",
          emoji: "🦶",
        },
      ],
    },
  },
  /* ── Saturday ── */
  {
    diet: {
      calories: 1540,
      protein: 117,
      meals: [
        {
          time: b("Breakfast", "সকাল"),
          detail: b("7–8 AM", "সকাল ৭–৮টা"),
          icon: "🌅",
          cal: 360,
          items: [
            b("2 eggs scrambled or poached", "২টি ডিম স্ক্র্যাম্বলড বা পোচ"),
            b("2 whole grain toast", "২ স্লাইস হোল গ্রেইন পাউরুটি"),
            b("Black coffee", "ব্ল্যাক কফি"),
          ],
        },
        {
          time: b("Lunch", "দুপুর"),
          detail: b("12:30–1:30 PM", "দুপুর ১২:৩০–১:৩০"),
          icon: "☀️",
          cal: 560,
          items: [
            b(
              "Lean beef steak — sirloin (150g)",
              "লিন বিফ স্টেক — সার্লয়েন (১৫০গ্রাম)",
            ),
            b(
              "Roasted vegetables: zucchini, carrot, broccoli",
              "রোস্টেড সবজি: জুকিনি, গাজর, ব্রকলি",
            ),
            b("Garden salad, lemon dressing", "গার্ডেন সালাদ, লেমন ড্রেসিং"),
          ],
        },
        {
          time: b("Snack", "বিকেল"),
          detail: b("3:30–4:30 PM", "বিকেল ৩:৩০–৪:৩০"),
          icon: "🍎",
          cal: 100,
          items: [
            b(
              "Mixed berries — blueberry & raspberry",
              "মিশ্র বেরি — ব্লুবেরি ও রাসবেরি",
            ),
          ],
        },
        {
          time: b("Dinner", "রাত"),
          detail: b("7–8 PM", "রাত ৭–৮টা"),
          icon: "🌙",
          cal: 520,
          items: [
            b(
              "½ cup rice + rohu / hilsa fish curry",
              "আধা কাপ ভাত + রুই বা ইলিশ মাছের ঝোল",
            ),
            b("Masoor dal", "মসুর ডাল"),
            b("Bottle gourd (লাউ) stir fry", "লাউ সবজি ভাজি"),
          ],
        },
      ],
    },
    workout: {
      type: b("Long Ride / Hike", "লম্বা রাইড / হাইক"),
      duration: b("60–90 min", "৬০–৯০ মিনিট"),
      focus: b("Endurance", "সহনশীলতা"),
      tip: b(
        "Make Saturday the fun one — explore a new stretch of the trail each week. This is your biggest calorie burn.",
        "শনিবারকে মজার দিন বানান — প্রতি সপ্তাহে ট্রেইলের নতুন অংশ ঘুরে দেখুন। এটাই সপ্তাহের সবচেয়ে বড় ক্যালোরি বার্ন।",
      ),
      exercises: [
        {
          name: b(
            "Long Bike Ride or Trail Hike",
            "লম্বা সাইকেল রাইড বা ট্রেইল হাইক",
          ),
          detail: b(
            "60–90 min on the Trans Canada Trail",
            "ট্রান্স কানাডা ট্রেইলে ৬০–৯০ মিনিট",
          ),
          sets: null,
          emoji: "🌲",
        },
        {
          name: b("Optional: Light Circuit", "ঐচ্ছিক: হালকা সার্কিট"),
          detail: b(
            "2 rounds — 15 squats, 10 push-ups, 30s plank",
            "২ রাউন্ড — ১৫ স্কোয়াট, ১০ পুশআপ, ৩০ সেকেন্ড প্ল্যাংক",
          ),
          sets: "2 rounds",
          emoji: "🔁",
        },
        {
          name: b("Full Body Stretch", "ফুল বডি স্ট্রেচ"),
          detail: b("10 min", "১০ মিনিট"),
          sets: null,
          emoji: "🧘",
        },
      ],
    },
  },
];

export const STATIC_PLAN: WeeklyPlan = {
  days: STATIC_DAYS,
};
