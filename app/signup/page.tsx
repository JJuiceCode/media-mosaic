import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { SignupForm } from "@/components/auth/signup-form";
import { authOptions } from "@/lib/auth/options";

export default async function SignupPage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-zinc-900 px-6 py-16 text-white">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-2xl border border-white/10 bg-slate-950/40 p-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Custom Signup</p>
          <h1 className="text-3xl font-semibold">회원가입</h1>
          <p className="text-sm text-white/70">가입 후 이메일/비밀번호로 로그인할 수 있습니다.</p>
        </div>
        <SignupForm />
        <Link href="/" className="block text-center text-sm text-white/70 hover:text-white">
          홈으로 돌아가기
        </Link>
      </div>
    </main>
  );
}
