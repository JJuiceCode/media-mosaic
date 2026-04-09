"use client";

import { useTransition } from "react";
import { signOut } from "next-auth/react";

export function SignOutButton() {
  const [pending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await signOut({ callbackUrl: "/" });
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 px-6 py-3 text-base font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70 dark:border-white/30 dark:text-white dark:hover:border-white dark:hover:bg-white/10"
    >
      {pending ? "Signing out…" : "Sign out"}
    </button>
  );
}
