import { SectionHeading } from "@/components/home/section-heading";
import { participationCards } from "@/lib/memo-home-data";

export function ParticipationSection() {
  return (
    <section id="participation" className="border-b border-border bg-surface">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
        <SectionHeading
          title="기록은 시민의 제보에서 시작됩니다"
          description="검증이 필요한 발언, 누락된 출처, 정정이 필요한 기록을 제보할 수 있습니다. 모든 제보는 검토 후 공개됩니다."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {participationCards.map((card, index) => (
            <article key={card.id} className="rounded-lg border border-border bg-background p-6 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 text-xl font-semibold text-foreground">{card.title}</h3>
              <p className="mt-3 min-h-20 text-sm leading-6 text-muted">{card.description}</p>
              <button type="button" className="mt-5 min-h-11 w-full rounded-lg bg-accent px-4 text-sm font-semibold text-white transition hover:bg-accent-dark">
                {card.actionLabel}
              </button>
            </article>
          ))}
        </div>
        <p className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-100">
          사용자 제보는 즉시 공개되지 않으며, 운영 기준에 따라 출처 확인과 검토를 거친 뒤 반영됩니다.
        </p>
      </div>
    </section>
  );
}
