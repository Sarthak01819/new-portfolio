"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      onClick={toggleTheme}
      suppressHydrationWarning
      className="grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors"
      style={{ borderColor: "var(--line)", background: "var(--surface)" }}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -24, opacity: 0, scale: 0.86 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.22 }}
      >
        {isLight ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
      </motion.span>
    </button>
  );
}
