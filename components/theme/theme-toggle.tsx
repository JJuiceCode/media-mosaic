"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "media-mosaic-theme";

type Theme = "dark" | "light";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const initialTheme: Theme = stored === "light" ? "light" : "dark";
    applyTheme(initialTheme);
    setTheme(initialTheme);
    setMounted(true);
  }, []);

  const handleToggle = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    localStorage.setItem(STORAGE_KEY, nextTheme);
    setTheme(nextTheme);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="fixed right-4 top-4 z-50 inline-flex items-center justify-center rounded-xl border border-slate-300/70 bg-white/80 px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur transition hover:bg-white dark:border-white/20 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:bg-slate-900"
      aria-label="테마 전환 버튼"
    >
      {mounted ? (theme === "dark" ? "Light mode" : "Dark mode") : "Theme"}
    </button>
  );
}
