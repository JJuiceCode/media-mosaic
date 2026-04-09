import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { LoginForm } from "@/components/auth/login-form";
import { authOptions } from "@/lib/auth/options";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-100 via-white to-cyan-50 px-6 py-16 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-zinc-900 dark:text-white">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-2xl border border-slate-300/70 bg-white/80 p-6 dark:border-white/10 dark:bg-slate-950/40">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Custom Login</p>
          <h1 className="text-3xl font-semibold">이메일 로그인</h1>
          <p className="text-sm text-slate-600 dark:text-white/70">회원가입한 이메일과 비밀번호로 로그인하세요.</p>
        </div>
        <LoginForm />
        <Link href="/" className="block text-center text-sm text-slate-600 hover:text-slate-900 dark:text-white/70 dark:hover:text-white">
          홈으로 돌아가기
        </Link>
      </div>
    </main>
  );
}
