import Link from "next/link";

import { ThemeToggle } from "@/components/theme/theme-toggle";

const menuItems = [
  { href: "/", label: "홈" },
  { href: "/#featured-people", label: "인물 기록" },
  { href: "/#participation", label: "검증 요청" },
  { href: "/login", label: "로그인" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 text-foreground backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="group inline-flex w-fit flex-col">
          <span className="text-lg font-semibold tracking-tight transition group-hover:text-accent">MeMo</span>
          <span className="text-xs text-muted">Public Record Archive</span>
        </Link>

        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <nav aria-label="기본 메뉴" className="flex flex-wrap items-center gap-1 text-sm">
            {menuItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-muted transition hover:bg-accent-soft hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
