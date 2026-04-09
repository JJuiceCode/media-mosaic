import Image from "next/image";
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

  const userInitial = session.user.name?.[0]?.toUpperCase() ?? "U";

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-zinc-900 px-6 py-16 text-white">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <section className="rounded-2xl border border-white/10 bg-slate-950/40 p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Member Dashboard</p>
          <h1 className="mt-2 text-3xl font-semibold">환영합니다, {session.user.name ?? "회원"}님</h1>
          <p className="mt-2 text-sm text-white/70">로그인한 사용자만 접근 가능한 대시보드입니다.</p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_auto]">
          <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-6">
            <h2 className="text-lg font-semibold">내 계정 정보</h2>
            <div className="mt-4 flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full bg-white/10">
                {session.user.image ? (
                  <Image src={session.user.image} alt={session.user.name ?? "User profile image"} fill sizes="64px" className="object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-white">{userInitial}</div>
                )}
              </div>
              <div>
                <p className="font-medium">{session.user.name ?? "이름 없음"}</p>
                <p className="text-sm text-white/70">{session.user.email ?? "이메일 정보 없음"}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-2xl border border-cyan-300/60 px-6 py-3 text-base font-semibold text-cyan-200 transition hover:-translate-y-0.5 hover:border-cyan-200"
            >
              홈으로 이동
            </Link>
            <SignOutButton />
          </div>
        </section>
      </div>
    </main>
  );
}
