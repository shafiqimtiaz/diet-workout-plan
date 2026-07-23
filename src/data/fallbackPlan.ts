import type {
  WeeklyPlan,
  DayPlan,
} from "../types/plan";

/* ── FULL 7-DAY STATIC PLAN ── */
const STATIC_DAYS: DayPlan[] = [
  /* ── Sunday ── */
  {
    diet: {
      calories: 1600,
      protein: 118,
      meals: [
        {
          time: "Breakfast",
          detail: "7–8 AM",
          icon: "🌅",
          cal: 360,
          items: [
            "2 scrambled eggs",
            "2 slices whole grain toast",
            "Black coffee or herbal tea",
          ],
        },
        {
          time: "Lunch",
          detail: "12:30–1:30 PM",
          icon: "☀️",
          cal: 570,
          items: [
            "Beef curry — lean chuck (150g)",
            "1 cup basmati rice",
            "Masoor dal",
            "Mixed vegetable stir fry",
          ],
        },
        {
          time: "Snack",
          detail: "3:30–4:30 PM",
          icon: "🍎",
          cal: 160,
          items: [
            "Greek yogurt plain (150g)",
            "Mixed berries — blueberry & strawberry",
          ],
        },
        {
          time: "Dinner",
          detail: "7–8 PM",
          icon: "🌙",
          cal: 510,
          items: [
            "2 whole wheat roti",
            "Grilled chicken (100g)",
            "Lentil soup (dal)",
            "Cucumber & tomato salad",
          ],
        },
      ],
    },
    workout: {
      type: "Active Rest",
      duration: "35 min",
      focus: "Recovery",
      tip: "The Trans Canada Trail is minutes from your door — an easy Sunday walk there resets your legs for Monday's lifting.",
      exercises: [
        {
          name: "Trail Walk (easy)",
          detail: "30 min on the Trans Canada Trail, relaxed pace",
          sets: null,
          emoji: "🚶",
        },
        {
          name: "Full Body Stretch",
          detail: "10 min — hips, hamstrings, chest, back",
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
          time: "Breakfast",
          detail: "7–8 AM",
          icon: "🌅",
          cal: 320,
          items: [
            "Oatmeal with banana",
            "1 tsp honey",
            "Black coffee",
          ],
        },
        {
          time: "Lunch",
          detail: "12:30–1:30 PM",
          icon: "☀️",
          cal: 480,
          items: [
            "Grilled chicken breast stir fry (150g)",
            "½ cup brown rice",
            "Broccoli & bell pepper",
            "Low-sodium soy sauce + garlic",
          ],
        },
        {
          time: "Snack",
          detail: "3:30–4:30 PM",
          icon: "🍎",
          cal: 160,
          items: [
            "1 apple",
            "10–12 almonds",
          ],
        },
        {
          time: "Dinner",
          detail: "7–8 PM",
          icon: "🌙",
          cal: 560,
          items: [
            "Mung dal (মুগ ডাল)",
            "2 wheat roti",
            "2 boiled eggs",
            "Cucumber salad with lemon",
          ],
        },
      ],
    },
    workout: {
      type: "Strength · Push",
      duration: "40 min",
      focus: "Chest · Shoulders · Triceps",
      tip: "When you complete all sets at the top of the rep range with good form, add 2.5 kg next week. That's how muscle is built.",
      exercises: [
        {
          name: "Dumbbell Floor Press",
          detail: "4 sets × 8–10 reps",
          sets: "4×8–10",
          emoji: "🏋️",
        },
        {
          name: "Dumbbell Overhead Press",
          detail: "3 sets × 8–10 reps",
          sets: "3×8–10",
          emoji: "💪",
        },
        {
          name: "Push-up",
          detail: "3 sets × max reps",
          sets: "3×max",
          emoji: "🤸",
        },
        {
          name: "Dumbbell Lateral Raise",
          detail: "3 sets × 12–15 reps, light weight",
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
          time: "Breakfast",
          detail: "7–8 AM",
          icon: "🌅",
          cal: 380,
          items: [
            "2 eggs any style",
            "2 slices whole grain toast",
            "½ avocado",
            "Green tea or coffee",
          ],
        },
        {
          time: "Lunch",
          detail: "12:30–1:30 PM",
          icon: "☀️",
          cal: 520,
          items: [
            "Grilled Atlantic salmon (170g)",
            "Baked sweet potato",
            "Spinach & cherry tomato salad",
            "Lemon dressing (no mayo)",
          ],
        },
        {
          time: "Snack",
          detail: "3:30–4:30 PM",
          icon: "🍎",
          cal: 150,
          items: ["Greek yogurt + blueberries"],
        },
        {
          time: "Dinner",
          detail: "7–8 PM",
          icon: "🌙",
          cal: 530,
          items: [
            "Masoor dal soup",
            "2 whole grain roti",
            "Chicken bhuna — light oil (100g)",
            "Stir fried korola / begun",
          ],
        },
      ],
    },
    workout: {
      type: "Cardio · Trail",
      duration: "40 min",
      focus: "Intervals · Fat Burn",
      tip: "Intervals burn more in 40 minutes than a slow hour. In winter, swap for stair climbs + jumping jacks indoors.",
      exercises: [
        {
          name: "Warm-up Walk",
          detail: "5 min easy pace",
          sets: null,
          emoji: "🌿",
        },
        {
          name: "Walk / Jog Intervals",
          detail: "10 × (1 min fast / 1 min easy) on the trail",
          sets: "10 rounds",
          emoji: "🏃",
        },
        {
          name: "Cool-down Walk",
          detail: "10 min slow + light stretch",
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
          time: "Breakfast",
          detail: "7–8 AM",
          icon: "🌅",
          cal: 340,
          items: [
            "Greek yogurt parfait + granola",
            "Seasonal fruits — mango or banana",
            "Black coffee or green tea",
          ],
        },
        {
          time: "Lunch",
          detail: "12:30–1:30 PM",
          icon: "☀️",
          cal: 520,
          items: [
            "Lamb curry — lean leg cut (150g)",
            "Cauliflower rice",
            "Bell peppers + onions + garlic",
            "Cumin + chili flakes seasoning",
          ],
        },
        {
          time: "Snack",
          detail: "3:30–4:30 PM",
          icon: "🍎",
          cal: 160,
          items: [
            "Mixed unsalted nuts — almonds & walnuts",
          ],
        },
        {
          time: "Dinner",
          detail: "7–8 PM",
          icon: "🌙",
          cal: 540,
          items: [
            "Mung dal + 2 roti",
            "1 boiled egg",
            "Sautéed mixed vegetables",
            "Cucumber raita (yogurt + cucumber)",
          ],
        },
      ],
    },
    workout: {
      type: "Strength · Pull",
      duration: "40 min",
      focus: "Back · Biceps · Core",
      tip: "A strong back fixes desk-developer posture. Squeeze your shoulder blades together at the top of every row.",
      exercises: [
        {
          name: "Barbell Bent-over Row",
          detail: "4 sets × 8–10 reps",
          sets: "4×8–10",
          emoji: "🏋️",
        },
        {
          name: "One-arm Dumbbell Row",
          detail: "3 sets × 10 reps each side",
          sets: "3×10",
          emoji: "💪",
        },
        {
          name: "Dumbbell Curl",
          detail: "3 sets × 10–12 reps",
          sets: "3×10–12",
          emoji: "🦾",
        },
        {
          name: "Plank",
          detail: "3 sets × 45 seconds",
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
          time: "Breakfast",
          detail: "7–8 AM",
          icon: "🌅",
          cal: 310,
          items: [
            "Oatmeal + mixed berries",
            "1 tsp honey",
            "Black coffee",
          ],
        },
        {
          time: "Lunch",
          detail: "12:30–1:30 PM",
          icon: "☀️",
          cal: 490,
          items: [
            "Beef & vegetable soup (lean chuck)",
            "Carrots, celery, potato (small)",
            "1 slice whole grain bread",
          ],
        },
        {
          time: "Snack",
          detail: "3:30–4:30 PM",
          icon: "🍎",
          cal: 110,
          items: ["1 banana"],
        },
        {
          time: "Dinner",
          detail: "7–8 PM",
          icon: "🌙",
          cal: 630,
          items: [
            "½ cup rice + masoor dal",
            "2 boiled eggs",
            "Stir fried spinach (পালং শাক)",
          ],
        },
      ],
    },
    workout: {
      type: "Cardio · Bike",
      duration: "50 min",
      focus: "Steady Ride",
      tip: "From Bayshore, ride the trail toward Andrew Haydon Park along the river. In winter, do a 30-min indoor circuit instead.",
      exercises: [
        {
          name: "Bike Ride",
          detail: "45–50 min steady pace — you should be able to talk, barely",
          sets: null,
          emoji: "🚴",
        },
        {
          name: "Post-ride Stretch",
          detail: "5 min — quads, hips, lower back",
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
          time: "Breakfast",
          detail: "7–8 AM",
          icon: "🌅",
          cal: 350,
          items: [
            "Smoothie: banana + spinach + Greek yogurt",
            "1 tbsp peanut butter",
          ],
        },
        {
          time: "Lunch",
          detail: "12:30–1:30 PM",
          icon: "☀️",
          cal: 470,
          items: [
            "Grilled chicken burger patty — no bun (150g)",
            "Lettuce, tomato, pickled onion",
            "Baked sweet potato fries",
            "Side salad — lemon dressing",
          ],
        },
        {
          time: "Snack",
          detail: "3:30–4:30 PM",
          icon: "🍎",
          cal: 160,
          items: [
            "Apple + 1 tbsp peanut butter",
          ],
        },
        {
          time: "Dinner",
          detail: "7–8 PM",
          icon: "🌙",
          cal: 580,
          items: [
            "1 roti + mung dal (light)",
            "Grilled tilapia or pangash (120g)",
            "Steamed broccoli & carrots",
            "Cucumber & tomato salad",
          ],
        },
      ],
    },
    workout: {
      type: "Strength · Legs",
      duration: "40 min",
      focus: "Legs · Glutes",
      tip: "Legs are your biggest muscles — training them burns the most calories all week. Never skip Friday.",
      exercises: [
        {
          name: "Barbell / Goblet Squat",
          detail: "4 sets × 8–10 reps",
          sets: "4×8–10",
          emoji: "🦵",
        },
        {
          name: "Romanian Deadlift",
          detail: "3 sets × 10 reps — barbell",
          sets: "3×10",
          emoji: "🏋️",
        },
        {
          name: "Walking Lunge (dumbbells)",
          detail: "3 sets × 10 each leg",
          sets: "3×10",
          emoji: "🚶",
        },
        {
          name: "Calf Raise",
          detail: "3 sets × 15 reps, holding dumbbells",
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
          time: "Breakfast",
          detail: "7–8 AM",
          icon: "🌅",
          cal: 360,
          items: [
            "2 eggs scrambled or poached",
            "2 whole grain toast",
            "Black coffee",
          ],
        },
        {
          time: "Lunch",
          detail: "12:30–1:30 PM",
          icon: "☀️",
          cal: 560,
          items: [
            "Lean beef steak — sirloin (150g)",
            "Roasted vegetables: zucchini, carrot, broccoli",
            "Garden salad, lemon dressing",
          ],
        },
        {
          time: "Snack",
          detail: "3:30–4:30 PM",
          icon: "🍎",
          cal: 100,
          items: [
            "Mixed berries — blueberry & raspberry",
          ],
        },
        {
          time: "Dinner",
          detail: "7–8 PM",
          icon: "🌙",
          cal: 520,
          items: [
            "½ cup rice + rohu / hilsa fish curry",
            "Masoor dal",
            "Bottle gourd (লাউ) stir fry",
          ],
        },
      ],
    },
    workout: {
      type: "Long Ride / Hike",
      duration: "60–90 min",
      focus: "Endurance",
      tip: "Make Saturday the fun one — explore a new stretch of the trail each week. This is your biggest calorie burn.",
      exercises: [
        {
          name: "Long Bike Ride or Trail Hike",
          detail: "60–90 min on the Trans Canada Trail",
          sets: null,
          emoji: "🌲",
        },
        {
          name: "Optional: Light Circuit",
          detail: "2 rounds — 15 squats, 10 push-ups, 30s plank",
          sets: "2 rounds",
          emoji: "🔁",
        },
        {
          name: "Full Body Stretch",
          detail: "10 min",
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
