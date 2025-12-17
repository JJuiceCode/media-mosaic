import Image from "next/image";
import { getServerSession } from "next-auth";

import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { authOptions } from "@/lib/auth/options";
import { NaverSignInButton } from "@/components/auth/naver-sign-in-button";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const userInitial = session?.user?.name?.[0]?.toUpperCase() ?? "M";
  if (process.env.NODE_ENV === "development") {
    console.log("Current session:", session);
  } else {
    console.log("App accessed in production mode.");
  }
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-zinc-900 text-white">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-16 lg:flex-row lg:items-center lg:justify-between">
        {/* Main Section */}
        <section className="max-w-2xl space-y-6">
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
            Step 1 · Social Login (Google + Naver)
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Google · Naver 인증으로 온보딩 속도를 끌어올려.</h1>
          <p className="text-lg text-white/80">
            사용자에게 익숙한 두 개의 소셜 채널을 모두 제공하여 진입 장벽을 낮추고, 수집한 프로필로 곧바로 맞춤형 피드를 만들 수 있어.
          </p>

          {/* Login Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            {session ? (
              <SignOutButton />
            ) : (
              <>
                <GoogleSignInButton />
                <NaverSignInButton />
              </>
            )}
          </div>

          <p className="text-sm text-white/70">
            {session
              ? "Access Token이 발급되어 사용자 프로필을 안전하게 공유할 준비가 되었어."
              : "아직 토큰이 없어 사용자 맞춤 데이터를 만들 수 없어."}
          </p>
        </section>

        {/* Session Information or Login Steps */}
        <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-6">
          {session?.user ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-full bg-white/10">
                  {session.user.image ? (
                    <Image src={session.user.image} alt={session.user.name ?? "Signed in user"} layout="fill" className="object-cover" priority />
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
                <p className="mt-2">소셜 OAuth 토큰이 발급되어 API 호출 시 Authorization 헤더를 붙일 수 있어.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-white/70">
              {/* Login Steps */}
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">01</span>
                <div>
                  <p className="text-white">Google · Naver consent</p>
                  <p className="text-sm text-white/60">사용자가 익숙한 채널을 선택해 OAuth 동의 화면에서 접근 권한을 허용해.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">02</span>
                <div>
                  <p className="text-white">Secure callback</p>
                  <p className="text-sm text-white/60">`/api/auth/callback/google` 또는 `/api/auth/callback/naver`에서 안전하게 토큰을 교환해.</p>
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
      </main>
    </div>
  );
}
