"use client";

import { useTransition } from "react";
import { signIn } from "next-auth/react";

export function GoogleSignInButton() {
  const [pending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await signIn("google");
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-6 py-3 text-base font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Connecting…" : "Continue with Google"}
    </button>
  );
}
