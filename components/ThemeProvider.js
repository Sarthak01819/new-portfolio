"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";

const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
});

function resolveInitialTheme() {
  if (typeof window === "undefined") {
    return "dark";
  }

  const savedTheme = window.localStorage.getItem("portfolio-theme");

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

const themeListeners = new Set();

function readThemeSnapshot() {
  if (typeof window === "undefined") {
    return "dark";
  }

  return document.documentElement.dataset.theme || resolveInitialTheme();
}

function subscribeToTheme(listener) {
  themeListeners.add(listener);

  return () => {
    themeListeners.delete(listener);
  };
}

function setThemeValue(nextTheme) {
  document.documentElement.dataset.theme = nextTheme;
  window.localStorage.setItem("portfolio-theme", nextTheme);
  themeListeners.forEach((listener) => listener());
}

export function ThemeProvider({ children }) {
  const theme = useSyncExternalStore(subscribeToTheme, readThemeSnapshot, () => "dark");

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => setThemeValue(readThemeSnapshot() === "dark" ? "light" : "dark"),
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
