import Image from "next/image";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/options";
import { normalizeImageUrl } from "@/lib/normalize-image-url";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const userInitial = session?.user?.name?.[0]?.toUpperCase() ?? "M";
  if (process.env.NODE_ENV === "development") {
    console.log("Current session:", session);
  } else {
    console.log("App accessed in production mode.");
  }
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-16 lg:flex-row lg:items-center lg:justify-between">
        {/* Main Section */}
        <section className="max-w-2xl space-y-6">
          <span className="inline-flex items-center rounded-full border border-border bg-surface px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-muted">
            Step 1 · Social + Custom Login
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Google · Naver · Kakao 인증으로 온보딩 속도를 끌어올려.
          </h1>
          <p className="text-lg text-muted">
            세 가지 소셜 채널을 동시에 제공해 진입 장벽을 낮추고, 수집한 프로필 데이터로 바로 맞춤형 경험을 설계할 수 있어.
          </p>

          <p className="text-sm text-muted">
            {session
              ? "Google, Naver, Kakao 중 어떤 채널이든 Access Token이 발급되어 사용자 프로필을 안전하게 공유할 준비가 되었어."
              : "아직 토큰이 없어 사용자 맞춤 데이터를 만들 수 없어."}
          </p>
        </section>

        {/* Session Information or Login Steps */}
        <div className="rounded-2xl border border-border bg-surface p-6">
          {session?.user ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-full bg-accent-soft">
                  {session.user.image ? (
                    <Image
                      src={normalizeImageUrl(session.user.image)}
                      alt={session.user.name ?? "Signed in user"}
                      fill
                      sizes="64px"
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-foreground">{userInitial}</div>
                  )}
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground">{session.user.name ?? "익명 사용자"}</p>
                  <p className="text-sm text-muted">{session.user.email ?? "이메일 정보 없음"}</p>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-accent-soft p-4 text-sm text-muted">
                <p className="font-mono text-xs uppercase tracking-[0.35em] text-accent">Active session</p>
                <p className="mt-2">소셜 OAuth 토큰이 발급되어 API 호출 시 Authorization 헤더를 붙일 수 있어.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-muted">
              {/* Login Steps */}
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-foreground">01</span>
                <div>
                  <p className="text-foreground">Google · Naver · Kakao consent</p>
                  <p className="text-sm text-muted">사용자가 익숙한 채널을 선택해 OAuth 동의 화면에서 접근 권한을 허용해.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-foreground">02</span>
                <div>
                  <p className="text-foreground">Secure callback</p>
                  <p className="text-sm text-muted">
                    `/api/auth/callback/google`, `/api/auth/callback/naver`, `/api/auth/callback/kakao` 중 연결된 경로에서 안전하게 토큰을 교환해.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-foreground">03</span>
                <div>
                  <p className="text-foreground">Session ready</p>
                  <p className="text-sm text-muted">`getServerSession`으로 언제든 사용자 상태를 확인할 수 있어.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
