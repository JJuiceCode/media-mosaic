import { SectionHeading } from "@/components/home/section-heading";

export function NewsletterSupportSection() {
  return (
    <section className="bg-surface">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-16 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:py-20">
        <div>
          <SectionHeading
            title="출처 기반 기록 아카이브를 함께 만들어주세요"
            description="MeMo는 광고나 정치적 이해관계에 의존하지 않는 독립적인 기록 아카이브를 지향합니다."
          />
          <form className="mt-7 flex max-w-xl flex-col gap-3 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              뉴스레터 이메일
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="이메일 주소"
              className="min-h-12 flex-1 rounded-lg border border-border bg-background px-4 outline-none transition placeholder:text-muted focus:border-accent focus:ring-4 focus:ring-accent-soft"
            />
            <button type="submit" className="min-h-12 rounded-lg bg-accent px-5 text-sm font-semibold text-white transition hover:bg-accent-dark">
              뉴스레터 구독
            </button>
          </form>
        </div>

        <aside className="rounded-lg border border-border bg-background p-6 shadow-sm">
          <p className="text-sm font-semibold text-accent">Independent Archive</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">운영 후원</h3>
          <p className="mt-3 text-sm leading-6 text-muted">
            후원은 출처 검토, 정정 이력 관리, 시민 제보 검토 프로세스를 안정적으로 유지하는 데 사용됩니다.
          </p>
          <button type="button" className="mt-6 min-h-11 w-full rounded-lg border border-border bg-surface px-4 text-sm font-semibold text-foreground transition hover:border-accent/40 hover:text-accent">
            운영 후원하기
          </button>
        </aside>
      </div>
    </section>
  );
}
