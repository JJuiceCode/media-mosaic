const stats = [
  { label: "등록 인물 수", value: "1,248" },
  { label: "기록된 발언 수", value: "18,920" },
  { label: "출처 링크 수", value: "64,381" },
  { label: "정정/반론 업데이트", value: "2,406" },
];

export function HeroSection() {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-20">
        <div className="space-y-7">
          <p className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-blue-700 dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-blue-200">
            Public Record Archive
          </p>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              공적 인물의 말과 기록을 한눈에 확인하세요
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted">
              MeMo는 정치인, 언론인, 유튜버 등 공적 인물의 발언·기사·논란·반론·정정 이력을 출처 기반으로 정리하는 기록 아카이브입니다.
            </p>
          </div>

          <form className="flex max-w-2xl flex-col gap-3 sm:flex-row" role="search">
            <label htmlFor="memo-search" className="sr-only">
              인물, 발언, 이슈 검색
            </label>
            <input
              id="memo-search"
              type="search"
              placeholder="인물, 발언, 이슈를 검색해보세요"
              className="min-h-12 flex-1 rounded-lg border border-border bg-background px-4 text-base outline-none transition placeholder:text-muted focus:border-accent focus:ring-4 focus:ring-accent-soft"
            />
            <button type="submit" className="min-h-12 rounded-lg bg-accent px-5 text-sm font-semibold text-white transition hover:bg-accent-dark focus:outline-none focus:ring-4 focus:ring-accent-soft">
              인물 검색하기
            </button>
          </form>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="#featured-people" className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border bg-background px-5 text-sm font-semibold text-foreground transition hover:border-accent/40 hover:text-accent">
              주목 기록 보기
            </a>
            <a href="#participation" className="inline-flex min-h-11 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 px-5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-blue-200">
              검증 요청하기
            </a>
          </div>
        </div>

        <aside aria-label="MeMo 데이터 요약" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {stats.map(stat => (
            <div key={stat.label} className="rounded-lg border border-border bg-background p-5 shadow-sm">
              <p className="text-sm text-muted">{stat.label}</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">{stat.value}</p>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}
