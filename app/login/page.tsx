import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { KakaoSignInButton } from "@/components/auth/kakao-sign-in-button";
import { LoginForm } from "@/components/auth/login-form";
import { NaverSignInButton } from "@/components/auth/naver-sign-in-button";
import { authOptions } from "@/lib/auth/options";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-background px-6 py-16 text-foreground">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-2xl border border-border bg-surface p-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Login</p>
          <h1 className="text-3xl font-semibold">로그인</h1>
          <p className="text-sm text-muted">소셜 계정 또는 이메일과 비밀번호로 로그인하세요.</p>
        </div>
        <div className="grid gap-3">
          <GoogleSignInButton />
          <NaverSignInButton />
          <KakaoSignInButton />
        </div>
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted">
          <span className="h-px flex-1 bg-border" />
          or
          <span className="h-px flex-1 bg-border" />
        </div>
        <LoginForm />
        <Link href="/" className="block text-center text-sm text-muted hover:text-foreground">
          홈으로 돌아가기
        </Link>
      </div>
    </main>
  );
}
