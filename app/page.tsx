import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";

import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { KakaoSignInButton } from "@/components/auth/kakao-sign-in-button";
import { NaverSignInButton } from "@/components/auth/naver-sign-in-button";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { authOptions } from "@/lib/auth/options";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const userInitial = session?.user?.name?.[0]?.toUpperCase() ?? "M";
  if (process.env.NODE_ENV === "development") {
    console.log("Current session:", session);
  } else {
    console.log("App accessed in production mode.");
  }
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-white to-cyan-50 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-zinc-900 dark:text-white">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-16 lg:flex-row lg:items-center lg:justify-between">
        {/* Main Section */}
        <section className="max-w-2xl space-y-6">
          <span className="inline-flex items-center rounded-full border border-slate-300/70 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-slate-600 dark:border-white/20 dark:bg-white/10 dark:text-white/70">
            Step 1 · Social + Custom Login
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">Google · Naver · Kakao 인증으로 온보딩 속도를 끌어올려.</h1>
          <p className="text-lg text-slate-700 dark:text-white/80">
            세 가지 소셜 채널을 동시에 제공해 진입 장벽을 낮추고, 수집한 프로필 데이터로 바로 맞춤형 경험을 설계할 수 있어.
          </p>

          {/* Login Buttons */}
          <div className="space-y-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {session ? (
                <SignOutButton />
              ) : (
                <>
                  <GoogleSignInButton />
                  <NaverSignInButton />
                  <KakaoSignInButton />
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center rounded-2xl border border-cyan-500/60 px-6 py-3 text-base font-semibold text-cyan-700 transition hover:-translate-y-0.5 hover:border-cyan-600 dark:border-cyan-300/60 dark:text-cyan-200 dark:hover:border-cyan-200"
                  >
                    이메일 로그인
                  </Link>
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center rounded-2xl border border-slate-300 px-6 py-3 text-base font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400 dark:border-white/30 dark:text-white dark:hover:border-white"
                  >
                    회원가입
                  </Link>
                </>
              )}
            </div>
            <a
              href="https://next-auth.js.org/getting-started/example"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-300 px-6 py-3 text-base font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400 dark:border-white/30 dark:text-white dark:hover:border-white"
            >
              Integration guide
            </a>
          </div>

          <p className="text-sm text-slate-600 dark:text-white/70">
            {session
              ? "Google, Naver, Kakao 중 어떤 채널이든 Access Token이 발급되어 사용자 프로필을 안전하게 공유할 준비가 되었어."
              : "아직 토큰이 없어 사용자 맞춤 데이터를 만들 수 없어."}
          </p>
        </section>

        {/* Session Information or Login Steps */}
        <div className="rounded-2xl border border-slate-300/70 bg-white/70 p-6 dark:border-white/10 dark:bg-slate-950/30">
          {session?.user ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                  {session.user.image ? (
                    <Image src={session.user.image} alt={session.user.name ?? "Signed in user"} fill sizes="64px" className="object-cover" priority />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-slate-800 dark:text-white">{userInitial}</div>
                  )}
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">{session.user.name ?? "익명 사용자"}</p>
                  <p className="text-sm text-slate-500 dark:text-white/60">{session.user.email ?? "이메일 정보 없음"}</p>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-300/70 bg-slate-100 p-4 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                <p className="font-mono text-xs uppercase tracking-[0.35em] text-green-300">Active session</p>
                <p className="mt-2">소셜 OAuth 토큰이 발급되어 API 호출 시 Authorization 헤더를 붙일 수 있어.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-slate-700 dark:text-white/70">
              {/* Login Steps */}
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-800 dark:bg-white/10 dark:text-white">01</span>
                <div>
                  <p className="text-slate-900 dark:text-white">Google · Naver · Kakao consent</p>
                  <p className="text-sm text-slate-500 dark:text-white/60">사용자가 익숙한 채널을 선택해 OAuth 동의 화면에서 접근 권한을 허용해.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-800 dark:bg-white/10 dark:text-white">02</span>
                <div>
                  <p className="text-slate-900 dark:text-white">Secure callback</p>
                  <p className="text-sm text-slate-500 dark:text-white/60">
                    `/api/auth/callback/google`, `/api/auth/callback/naver`, `/api/auth/callback/kakao` 중 연결된 경로에서 안전하게 토큰을 교환해.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-800 dark:bg-white/10 dark:text-white">03</span>
                <div>
                  <p className="text-slate-900 dark:text-white">Session ready</p>
                  <p className="text-sm text-slate-500 dark:text-white/60">`getServerSession`으로 언제든 사용자 상태를 확인할 수 있어.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
