import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { SignOutButton } from "@/components/auth/sign-out-button";
import { ProfileEditForm } from "@/components/dashboard/profile-edit-form";
import { authOptions } from "@/lib/auth/options";
import { normalizeImageUrl } from "@/lib/normalize-image-url";
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
    <main className="min-h-screen bg-background px-6 py-10 text-foreground">
      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="h-fit rounded-2xl border border-border bg-surface p-5 lg:sticky lg:top-6">
          <p className="text-xs uppercase tracking-[0.28em] text-accent">Dashboard</p>
          <h1 className="mt-3 text-xl font-semibold">{dashboardUser.name ?? "회원"}님 공간</h1>
          <nav className="mt-5 space-y-2 text-sm">
            <a href="#my-library" className="block rounded-lg px-3 py-2 text-muted transition hover:bg-accent-soft hover:text-foreground">
              내 프로젝트/콘텐츠
            </a>
            <a href="#edit-profile" className="block rounded-lg px-3 py-2 text-muted transition hover:bg-accent-soft hover:text-foreground">
              프로필 수정
            </a>
            <a href="#recent-activity" className="block rounded-lg px-3 py-2 text-muted transition hover:bg-accent-soft hover:text-foreground">
              최근 활동
            </a>
          </nav>
          <div className="mt-6 grid gap-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-accent/60 px-4 py-2 text-sm font-semibold text-accent transition hover:border-accent-dark hover:bg-accent-soft"
            >
              홈으로 이동
            </Link>
            <SignOutButton />
          </div>
        </aside>

        <section className="space-y-6">
          <section id="my-library" className="rounded-2xl border border-border bg-surface p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-accent">My Projects & Contents</p>
            <h2 className="mt-2 text-2xl font-semibold">내 프로젝트/콘텐츠 목록</h2>
            <p className="mt-2 text-sm text-muted">회원 기준으로 개인 작업 공간을 보여주는 영역입니다.</p>

            <div className="mt-4 rounded-xl border border-dashed border-border bg-accent-soft p-5">
              <p className="text-sm text-foreground">아직 등록된 프로젝트/콘텐츠가 없습니다.</p>
              <p className="mt-1 text-sm text-muted">
                다음 단계에서 프로젝트/콘텐츠 모델이 추가되면 이 영역에 사용자별 목록이 자동 연결됩니다.
              </p>
              <div className="mt-4 inline-flex rounded-lg border border-border px-3 py-1 text-xs text-muted">
                현재 상태: 0 items
              </div>
            </div>
          </section>

          <section id="edit-profile" className="rounded-2xl border border-border bg-surface p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-accent">Profile</p>
            <h2 className="mt-2 text-2xl font-semibold">프로필 수정</h2>
            <p className="mt-2 text-sm text-muted">이름/프로필 이미지를 저장하면 계정 정보에 즉시 반영됩니다.</p>

            <div className="mt-5 flex items-center gap-4 rounded-2xl border border-border bg-accent-soft p-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full bg-surface">
                {dashboardUser.image ? (
                  <Image
                    src={normalizeImageUrl(dashboardUser.image)}
                    alt={dashboardUser.name ?? "User profile image"}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-foreground">{userInitial}</div>
                )}
              </div>
              <div>
                <p className="font-medium">{dashboardUser.name ?? "이름 없음"}</p>
                <p className="text-sm text-muted">{dashboardUser.email ?? "이메일 정보 없음"}</p>
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

          <section id="recent-activity" className="rounded-2xl border border-border bg-surface p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-accent">Activity</p>
            <h2 className="mt-2 text-2xl font-semibold">최근 활동</h2>
            <p className="mt-2 text-sm text-muted">현재 회원 데이터에서 확인 가능한 최근 정보를 표시합니다.</p>

            <ul className="mt-5 space-y-3">
              {activityItems.map((item) => (
                <li key={item.title} className="rounded-xl border border-border bg-accent-soft p-4">
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="mt-1 text-sm text-muted">{item.detail}</p>
                </li>
              ))}
            </ul>
          </section>
        </section>
      </div>
    </main>
  );
}
