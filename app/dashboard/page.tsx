import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { SignOutButton } from "@/components/auth/sign-out-button";
import { authOptions } from "@/lib/auth/options";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-zinc-900 px-6 py-16 text-white">
      <div className="mx-auto w-full max-w-3xl space-y-6 rounded-2xl border border-white/10 bg-slate-950/40 p-8">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Member Dashboard</p>
          <h1 className="text-3xl font-semibold">대시보드</h1>
          <p className="text-sm text-white/70">로그인한 회원만 볼 수 있는 페이지입니다.</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm text-white/60">이름</p>
          <p className="mt-1 text-lg font-medium text-white">{session.user.name ?? "이름 없음"}</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm text-white/60">이메일</p>
          <p className="mt-1 text-lg font-medium text-white">{session.user.email ?? "이메일 없음"}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:border-white"
          >
            홈으로 이동
          </Link>
          <SignOutButton />
        </div>
      </div>
    </main>
  );
}
