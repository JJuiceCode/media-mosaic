"use client";

import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, systemTheme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="테마 변경"
      // ❗ 하이드레이션 경고를 무시하도록 설정 (속성값 차이 허용)
      suppressHydrationWarning
      className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground transition hover:border-accent/40 hover:text-accent"
    >
      {/* 아이콘 부분만 클라이언트에서 결정되도록 하고, 
        초기 렌더링 시에는 서버에서 그린 것과 달라도 에러를 내지 않습니다. 
      */}
      {currentTheme ? isDark ? <SunIcon /> : <MoonIcon /> : <span className="h-5 w-5 animate-pulse rounded-full bg-accent-soft" />}
    </button>
  );
}

// SunIcon, MoonIcon 코드는 그대로 유지...

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 850" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M732 392q3-2 7-1t3 5q-4 76-36 142t-84 114t-122 74t-147 23q-71-4-133-33t-109-77t-77-109T1 397q-4-78 23-147t74-122t114-84T354 8q4 0 6 3t-2 7q-31 40-46 90t-8 106q5 45 25 85t51 71t71 51t85 25q56 7 106-8t90-46" />
    </svg>
  );
}
