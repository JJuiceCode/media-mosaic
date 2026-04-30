"use client";

import { useTransition } from "react";
import { signIn } from "next-auth/react";

export function GoogleSignInButton() {
  const [pending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await signIn("google", { callbackUrl: "/dashboard" });
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className="group inline-flex items-center justify-center gap-3 rounded-2xl border border-border bg-surface px-6 py-3 text-base font-semibold text-foreground transition hover:-translate-y-0.5 hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Connecting…" : "Continue with Google"}
    </button>
  );
}
