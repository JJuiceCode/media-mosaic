import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { SignOutButton } from "@/components/auth/sign-out-button";
import { ProfileEditForm } from "@/components/dashboard/profile-edit-form";
import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const dashboardUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      createdAt: true,
      accounts: {
        select: {
          provider: true,
        },
      },
      sessions: {
        select: {
          expires: true,
        },
        orderBy: {
          expires: "desc",
        },
        take: 1,
      },
    },
  });

  if (!dashboardUser) {
    redirect("/login");
  }

  const userInitial = dashboardUser.name?.[0]?.toUpperCase() ?? "U";
  const providers = Array.from(new Set(dashboardUser.accounts.map((account) => account.provider)));
  const latestSession = dashboardUser.sessions[0];
  const activityItems = [
    {
      title: "계정 생성",
      detail: `${formatDate(dashboardUser.createdAt)}에 가입`,
    },
    latestSession
      ? {
          title: "현재 세션",
          detail: `세션 만료 예정: ${formatDate(latestSession.expires)}`,
        }
      : {
          title: "현재 세션",
          detail: "활성 세션 정보가 없습니다.",
        },
    {
      title: "연결된 로그인 채널",
      detail: providers.length ? providers.join(", ") : "이메일 로그인만 사용 중",
    },
  ];

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-100 via-white to-cyan-50 px-6 py-10 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-zinc-900 dark:text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="h-fit rounded-2xl border border-slate-300/70 bg-white/80 p-5 lg:sticky lg:top-6 dark:border-white/10 dark:bg-slate-950/45">
          <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">Dashboard</p>
          <h1 className="mt-3 text-xl font-semibold">{dashboardUser.name ?? "회원"}님 공간</h1>
          <nav className="mt-5 space-y-2 text-sm">
            <a href="#my-library" className="block rounded-lg px-3 py-2 text-slate-700 transition hover:bg-slate-200 dark:text-white/85 dark:hover:bg-white/10">
              내 프로젝트/콘텐츠
            </a>
            <a href="#edit-profile" className="block rounded-lg px-3 py-2 text-slate-700 transition hover:bg-slate-200 dark:text-white/85 dark:hover:bg-white/10">
              프로필 수정
            </a>
            <a href="#recent-activity" className="block rounded-lg px-3 py-2 text-slate-700 transition hover:bg-slate-200 dark:text-white/85 dark:hover:bg-white/10">
              최근 활동
            </a>
          </nav>
          <div className="mt-6 grid gap-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-cyan-500/60 px-4 py-2 text-sm font-semibold text-cyan-700 transition hover:border-cyan-600 dark:border-cyan-300/60 dark:text-cyan-100 dark:hover:border-cyan-200"
            >
              홈으로 이동
            </Link>
            <SignOutButton />
          </div>
        </aside>

        <section className="space-y-6">
          <section id="my-library" className="rounded-2xl border border-slate-300/70 bg-white/80 p-6 dark:border-white/10 dark:bg-slate-950/35">
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">My Projects & Contents</p>
            <h2 className="mt-2 text-2xl font-semibold">내 프로젝트/콘텐츠 목록</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-white/70">회원 기준으로 개인 작업 공간을 보여주는 영역입니다.</p>

            <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-100 p-5 dark:border-white/15 dark:bg-white/2">
              <p className="text-sm text-slate-700 dark:text-white/80">아직 등록된 프로젝트/콘텐츠가 없습니다.</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-white/60">
                다음 단계에서 프로젝트/콘텐츠 모델이 추가되면 이 영역에 사용자별 목록이 자동 연결됩니다.
              </p>
              <div className="mt-4 inline-flex rounded-lg border border-slate-300 px-3 py-1 text-xs text-slate-600 dark:border-white/15 dark:text-white/70">
                현재 상태: 0 items
              </div>
            </div>
          </section>

          <section id="edit-profile" className="rounded-2xl border border-slate-300/70 bg-white/80 p-6 dark:border-white/10 dark:bg-slate-950/35">
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">Profile</p>
            <h2 className="mt-2 text-2xl font-semibold">프로필 수정</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-white/70">이름/프로필 이미지를 저장하면 계정 정보에 즉시 반영됩니다.</p>

            <div className="mt-5 flex items-center gap-4 rounded-2xl border border-slate-300/70 bg-slate-100 p-4 dark:border-white/10 dark:bg-white/2">
              <div className="relative h-16 w-16 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                {dashboardUser.image ? (
                  <Image src={dashboardUser.image} alt={dashboardUser.name ?? "User profile image"} fill sizes="64px" className="object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-slate-800 dark:text-white">{userInitial}</div>
                )}
              </div>
              <div>
                <p className="font-medium">{dashboardUser.name ?? "이름 없음"}</p>
                <p className="text-sm text-slate-600 dark:text-white/70">{dashboardUser.email ?? "이메일 정보 없음"}</p>
              </div>
            </div>

            <div className="mt-5">
              <ProfileEditForm
                initialName={dashboardUser.name ?? ""}
                initialImage={dashboardUser.image}
                email={dashboardUser.email}
              />
            </div>
          </section>

          <section id="recent-activity" className="rounded-2xl border border-slate-300/70 bg-white/80 p-6 dark:border-white/10 dark:bg-slate-950/35">
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">Activity</p>
            <h2 className="mt-2 text-2xl font-semibold">최근 활동</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-white/70">현재 회원 데이터에서 확인 가능한 최근 정보를 표시합니다.</p>

            <ul className="mt-5 space-y-3">
              {activityItems.map((item) => (
                <li key={item.title} className="rounded-xl border border-slate-300/70 bg-slate-100 p-4 dark:border-white/10 dark:bg-white/2">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-white/70">{item.detail}</p>
                </li>
              ))}
            </ul>
          </section>
        </section>
      </div>
    </main>
  );
}
