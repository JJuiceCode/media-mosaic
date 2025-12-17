import Image from "next/image";
import { getServerSession } from "next-auth";

import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { authOptions } from "@/lib/auth/options";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const userInitial = session?.user?.name?.[0]?.toUpperCase() ?? "M";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-zinc-900 text-white">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-16 lg:flex-row lg:items-center lg:justify-between">
        <section className="max-w-2xl space-y-6">
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
            Step 1 · Social Login
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Google 인증으로 미디어 계정 온보딩을 시작해봐.</h1>
          <p className="text-lg text-white/80">
            한 번의 클릭으로 신뢰할 수 있는 프로필을 받아오고, 맞춤형 피드를 곧바로 생성할 수 있어. 지금은 Google, 다음은 다른 채널까지 확장될 준비가
            되어 있어.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            {session ? <SignOutButton /> : <GoogleSignInButton />}
            <a
              href="https://next-auth.js.org/getting-started/example"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl border border-white/30 px-6 py-3 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:border-white"
            >
              Integration guide
            </a>
          </div>
        </section>

        <section className="w-full max-w-md space-y-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <div className="space-y-2">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-white/70">Session preview</p>
            <h2 className="text-2xl font-semibold text-white">{session ? "지금 연결된 Google 계정" : "연결 전 사용자 상태"}</h2>
            <p className="text-sm text-white/70">
              {session
                ? "Access Token이 발급되어 사용자 프로필을 안전하게 공유할 준비가 되었어."
                : "아직 토큰이 없어서 사용자 맞춤 데이터를 만들 수 없어."}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-6">
            {session?.user ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full bg-white/10">
                    {session.user.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name ?? "Signed in user"}
                        fill
                        sizes="64px"
                        className="object-cover"
                        priority
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-white">{userInitial}</div>
                    )}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">{session.user.name ?? "익명 사용자"}</p>
                    <p className="text-sm text-white/60">{session.user.email ?? "이메일 정보 없음"}</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                  <p className="font-mono text-xs uppercase tracking-[0.35em] text-green-300">Active session</p>
                  <p className="mt-2 text-sm text-white">Google OAuth 토큰이 발급되어 API 호출 시 Authorization 헤더를 붙일 수 있어.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-white/70">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">01</span>
                  <div>
                    <p className="text-white">Google consent</p>
                    <p className="text-sm text-white/60">OAuth 동의 화면을 열어 사용자의 허락을 받아.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">02</span>
                  <div>
                    <p className="text-white">Secure callback</p>
                    <p className="text-sm text-white/60">`/api/auth/callback/google`로 리디렉션되어 토큰을 교환해.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">03</span>
                  <div>
                    <p className="text-white">Session ready</p>
                    <p className="text-sm text-white/60">`getServerSession`으로 언제든 사용자 상태를 확인할 수 있어.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
