# 🥗 Diet & Workout Plan

AI-powered personalized diet and workout planner. Set your target daily calories, and Google Gemini generates a detailed 7-day meal plan and workout routine.

**[🔗 diet-workout-plan.vercel.app](https://diet-workout-plan.vercel.app/)**

---

## Features

- **AI-generated plans** — Google Gemini creates weekly diet + workout plans tailored to your calorie target, cuisine preferences (Bangladeshi + Western), and home gym setup
- **Calorie input** — Type any target (1200–4000 cal) and the entire 7-day plan regenerates
- **Caching** — Plans are cached by calorie value; revisiting a previous target is instant
- **Smart fallback** — Without an API key, shows a detailed static 7-day plan (beef curry, salmon, dumbbell presses, trail runs…)
- **Model fallback chain** — On quota/rate-limit errors, automatically retries with delay, then falls through `gemini-2.5-flash-lite` → `gemini-3.0-flash` → `gemini-3.1-flash-lite`
- **Responsive** — Two-column layout on desktop, single-column on mobile with horizontal day scroller
- **Weekly rules** — 6 health rules with checkable progress tracker
- **Health tips** — 7 curated cards covering desk-work posture, Bangladeshi plate hacks, progressive overload, Ottawa winter training, and sleep

---

## Quick Start

```bash
npm install

# Get a free Gemini API key: https://aistudio.google.com/apikey
echo "VITE_GEMINI_API_KEY=your_key_here" > .env

npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Type a calorie target in the header, watch the plan regenerate.

Without an API key, the app runs with the built-in static plan — no setup needed.

---

## Architecture

```
src/
├── main.tsx                    # Entry point
├── App.tsx                     # Root: layout, tab routing
├── types/plan.ts               # TypeScript types
├── services/gemini.ts          # Gemini API + retry chain + JSON parsing
├── hooks/useGeminiPlan.ts      # Calorie → plan state machine
├── data/fallbackPlan.ts        # Static 7-day plan (used when API unavailable)
└── components/
    ├── Header.tsx              # Calorie input + generate button
    ├── TabNav.tsx              # Daily / Rules / Tips tabs
    ├── DailyPlan.tsx           # Diet + workout two-column layout
    ├── DaySelector.tsx         # 7-day pill selector
    ├── DaySummary.tsx          # Calories + protein badges
    ├── MealCard.tsx            # Color-coded meal card
    ├── ExerciseCard.tsx        # Exercise row with emoji + sets badge
    ├── RulesList.tsx           # Checkable weekly rules
    └── TipsGrid.tsx            # Health tip cards
```

---

## How the AI prompt works

Gemini receives a structured prompt specifying:
- **Persona:** Professional nutritionist + fitness coach
- **Location:** Ottawa, Bayshore, Trans Canada Trail, Andrew Haydon Park
- **Cuisine:** Bangladeshi (bhuna, dal, roti, fish curry…) + Western (salmon, steak, oatmeal…)
- **Equipment:** Dumbbells, barbell, bench, bike, trail access
- **Week structure:** Sun=Rest, Mon=Push, Tue=Trail cardio, Wed=Pull, Thu=Bike, Fri=Legs, Sat=Endurance
- **Detail rules:** 3-4 items per meal with exact portions, 3-4 exercises with technique cues, location-specific coach tips

The response is parsed into typed `WeeklyPlan` objects and cached by calorie value.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Styling | CSS custom properties (design tokens) |
| AI | Google Gemini (`gemini-2.5-flash-lite`) |
| Fonts | DM Sans, JetBrains Mono |
| Deploy | Vercel |
