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
      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/30 px-6 py-3 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:border-white hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Signing out…" : "Sign out"}
    </button>
  );
}
