"use client";

import { useTransition } from "react";
import { signIn } from "next-auth/react";

export function KakaoSignInButton() {
  const [pending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await signIn("kakao");
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#fee500] px-6 py-3 text-base font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-[#f5d800] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "카카오 연결중…" : "Kakao로 계속하기"}
    </button>
  );
}
