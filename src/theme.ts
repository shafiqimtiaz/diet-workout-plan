import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  conditions: {
    dark: "[data-theme=dark]",
    light: "[data-theme=light]",
  },
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
        body: { value: '"DM Sans", sans-serif' },
        heading: { value: '"General Sans", sans-serif' },
        mono: { value: '"JetBrains Mono", monospace' },
      },
    },
    semanticTokens: {
      colors: {
        bg: { value: { _light: "#f8fafc", _dark: "#0b1121" } },
        surface: { value: { _light: "#ffffff", _dark: "#1e293b" } },
        text: { value: { _light: "#0f172a", _dark: "#e2e8f0" } },
        text2: { value: { _light: "#64748b", _dark: "#94a3b8" } },
        border: { value: { _light: "#e2e8f0", _dark: "#334155" } },
        primary: { value: { _light: "#2563eb", _dark: "#60a5fa" } },
        primaryHover: { value: { _light: "#1d4ed8", _dark: "#3b82f6" } },
        neutral: { value: { _light: "#94a3b8", _dark: "#64748b" } },
        success: { value: { _light: "#10b981", _dark: "#34d399" } },
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
