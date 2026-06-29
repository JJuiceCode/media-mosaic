import { SectionHeading } from "@/components/home/section-heading";
import { issueTrends } from "@/lib/memo-home-data";

export function IssueTrendsSection() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
        <SectionHeading title="지금 많이 확인되는 이슈" description="최근 검색과 검증 요청이 늘어난 주제를 모아 보여줍니다." />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {issueTrends.map(issue => (
            <article key={issue.id} className="rounded-lg border border-border bg-surface p-5 shadow-sm transition hover:-translate-y-1 hover:border-accent/30 hover:shadow-md">
              <h3 className="text-lg font-semibold text-foreground">#{issue.name}</h3>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-xs text-muted">관련 인물</dt>
                  <dd className="mt-1 font-semibold text-foreground">{issue.peopleCount}명</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">기록</dt>
                  <dd className="mt-1 font-semibold text-foreground">{issue.recordCount}건</dd>
                </div>
              </dl>
              <p className="mt-4 text-xs text-muted">최근 업데이트 {issue.lastUpdated}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
