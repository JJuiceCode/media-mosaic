import { SectionHeading } from "@/components/home/section-heading";
import { StatusBadge } from "@/components/home/status-badge";
import { latestFactChecks } from "@/lib/memo-home-data";

export function LatestFactChecksSection() {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
        <SectionHeading title="최근 검증된 기록" description="발언과 기록 단위로 출처, 발생일, 검증일을 함께 확인할 수 있습니다." />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {latestFactChecks.map(record => (
            <article key={record.id} className="flex min-h-[300px] flex-col rounded-lg border border-border bg-background p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <StatusBadge status={record.status} />
                <span className="text-xs font-semibold text-muted">출처 {record.sourceCount}개</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold leading-7 text-foreground">{record.title}</h3>
              <p className="mt-2 text-sm text-muted">관련 인물: {record.personName}</p>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg border border-border bg-surface p-3">
                  <dt className="text-xs text-muted">발생일</dt>
                  <dd className="mt-1 font-semibold text-foreground">{record.occurredAt}</dd>
                </div>
                <div className="rounded-lg border border-border bg-surface p-3">
                  <dt className="text-xs text-muted">검증일</dt>
                  <dd className="mt-1 font-semibold text-foreground">{record.checkedAt}</dd>
                </div>
              </dl>
              <p className="mt-4 flex-1 text-sm leading-6 text-muted">{record.summary}</p>
              <button type="button" className="mt-5 min-h-10 rounded-lg border border-border px-4 text-sm font-semibold text-foreground transition hover:border-accent/40 hover:text-accent">
                자세히 보기
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
