"use client";

import Link from "next/link";
import { FormEvent, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export function SignupForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "");
    const passwordConfirm = String(formData.get("passwordConfirm") ?? "");

    if (!name || !email || !password || !passwordConfirm) {
      setError("모든 항목을 입력해주세요.");
      return;
    }

    if (password.length < 10) {
      setError("비밀번호는 10자 이상이어야 합니다.");
      return;
    }

    if (password !== passwordConfirm) {
      setError("비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    startTransition(async () => {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        setError(data?.error ?? "회원가입 중 문제가 발생했습니다.");
        return;
      }

      setSuccess("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
      setTimeout(() => {
        router.push("/login");
      }, 700);
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm text-slate-700 dark:text-white/80">
          이름
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          minLength={2}
          maxLength={40}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none ring-cyan-400 transition focus:ring-2 dark:border-white/20 dark:bg-white/5 dark:text-white"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm text-slate-700 dark:text-white/80">
          이메일
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none ring-cyan-400 transition focus:ring-2 dark:border-white/20 dark:bg-white/5 dark:text-white"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm text-slate-700 dark:text-white/80">
          비밀번호
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={10}
          maxLength={128}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none ring-cyan-400 transition focus:ring-2 dark:border-white/20 dark:bg-white/5 dark:text-white"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="passwordConfirm" className="text-sm text-slate-700 dark:text-white/80">
          비밀번호 확인
        </label>
        <input
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          autoComplete="new-password"
          required
          minLength={10}
          maxLength={128}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none ring-cyan-400 transition focus:ring-2 dark:border-white/20 dark:bg-white/5 dark:text-white"
        />
      </div>

      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      {success ? <p className="text-sm text-green-300">{success}</p> : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-slate-900 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "가입 중..." : "회원가입"}
      </button>

      <p className="text-sm text-slate-600 dark:text-white/70">
        이미 계정이 있나요?{" "}
        <Link href="/login" className="font-semibold text-cyan-300 hover:text-cyan-200">
          로그인
        </Link>
      </p>
    </form>
  );
}
