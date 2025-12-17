"use client";

import { useTransition } from "react";
import { signIn } from "next-auth/react";

export function NaverSignInButton() {
  const [pending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await signIn("naver");
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#03c75a] px-6 py-3 text-base font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-[#02b451] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "네이버 연결중…" : "Naver로 계속하기"}
    </button>
  );
}
