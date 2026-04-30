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
      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border px-6 py-3 text-base font-semibold text-foreground transition hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Signing out…" : "Sign out"}
    </button>
  );
}
