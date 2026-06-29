import { SectionHeading } from "@/components/home/section-heading";
import { methodologySteps } from "@/lib/memo-home-data";

export function MethodologySection() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
        <SectionHeading align="center" title="MeMo는 이렇게 기록합니다" description="기록의 출처, 맥락, 상태 변경 이력을 남겨 사용자가 자료를 직접 확인할 수 있도록 돕습니다." />
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {methodologySteps.map((step, index) => (
            <article key={step.id} className="relative rounded-lg border border-border bg-surface p-5 shadow-sm">
              <span className="text-sm font-semibold text-accent">STEP {index + 1}</span>
              <h3 className="mt-3 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{step.description}</p>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl rounded-lg border border-blue-200 bg-blue-50 p-5 text-center text-sm leading-6 text-blue-800 dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-blue-100">
          MeMo는 인물을 평가하지 않습니다. 공개된 발언과 기록의 출처, 맥락, 검증 상태를 구조화합니다.
        </p>
      </div>
    </section>
  );
}
