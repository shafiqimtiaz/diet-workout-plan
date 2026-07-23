import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: { value: "#2563eb" },
        primaryHover: { value: "#1d4ed8" },
        neutral: { value: "#94a3b8" },
        bg: { value: "#f8fafc" },
        surface: { value: "#ffffff" },
        text: { value: "#0f172a" },
        text2: { value: "#64748b" },
        border: { value: "#e2e8f0" },
        success: { value: "#10b981" },
      },
      fonts: {
        body: { value: '"DM Sans", "Noto Sans Bengali", sans-serif' },
        heading: { value: '"General Sans", "Noto Sans Bengali", sans-serif' },
        mono: { value: '"JetBrains Mono", monospace' },
      },
    },
    keyframes: {
      "dirty-pulse": {
        "0%, 100%": { boxShadow: "0 0 0 0 rgba(245, 158, 11, 0.4)" },
        "50%": { boxShadow: "0 0 0 4px rgba(245, 158, 11, 0)" },
      },
      "fade-in": {
        from: { opacity: 0, transform: "translateY(5px)" },
        to: { opacity: 1, transform: "translateY(0)" },
      },
    },
  },
  globalCss: {
    html: {
      fontSize: "15px",
    },
    body: {
      bg: "bg",
      color: "text",
      fontFamily: "body",
      lineHeight: 1.5,
    },
  },
});

export const system = createSystem(defaultConfig, config);
