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
      <span className="h-5 w-5 rounded-full bg-slate-900/5 p-1 text-slate-900">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M12 11v2.7h3.8c-.2 1.1-1.3 3.1-3.8 3.1A4.4 4.4 0 0112 6a4.1 4.1 0 012.6 1l1.8-1.8A7 7 0 005 12 7 7 0 0012 19 6.8 6.8 0 0019 12V11z" />
        </svg>
      </span>
      {pending ? "Connecting…" : "Continue with Google"}
    </button>
  );
}
