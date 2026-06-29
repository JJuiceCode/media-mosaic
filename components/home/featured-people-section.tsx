"use client";

import { useState } from "react";
import Image from "next/image";

import { PersonHistoryModal } from "@/components/home/person-history-modal";
import { SectionHeading } from "@/components/home/section-heading";
import { featuredControversialPeople, featuredPositivePeople, PersonRecord } from "@/lib/memo-home-data";

type FeaturedColumnProps = {
  title: string;
  description: string;
  metricLabel: string;
  secondaryMetricLabel: string;
  people: PersonRecord[];
  tone: "positive" | "controversy";
  onOpen: (person: PersonRecord) => void;
};

export function FeaturedPeopleSection() {
  const [selectedPerson, setSelectedPerson] = useState<PersonRecord | null>(null);

  return (
    <section id="featured-people" className="border-b border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
        <SectionHeading
          title="이번 주 주목받은 인물 기록"
          description="조회 수, 검증 요청, 최근 업데이트를 기준으로 공적 기록이 많이 확인된 인물입니다."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <FeaturedColumn
            title="긍정 기록 누적"
            description="공익 활동, 정책 이행, 정정 대응, 투명성 있는 해명 등 공개 기록을 기준으로 정리했습니다."
            metricLabel="긍정 기록"
            secondaryMetricLabel="출처"
            people={featuredPositivePeople}
            tone="positive"
            onOpen={setSelectedPerson}
          />
          <FeaturedColumn
            title="논란 기록 누적"
            description="의혹 보도, 정정 보도, 반론 존재, 검증 필요 발언 등 공개적으로 확인 가능한 기록을 기준으로 정리했습니다."
            metricLabel="논란 기록"
            secondaryMetricLabel="반론/정정"
            people={featuredControversialPeople}
            tone="controversy"
            onOpen={setSelectedPerson}
          />
        </div>
      </div>
      <PersonHistoryModal person={selectedPerson} onClose={() => setSelectedPerson(null)} />
    </section>
  );
}

function FeaturedColumn({ title, description, metricLabel, secondaryMetricLabel, people, tone, onOpen }: FeaturedColumnProps) {
  const [leader, ...rest] = people;
  const accentClass = tone === "positive" ? "text-emerald-700 dark:text-emerald-200" : "text-amber-700 dark:text-amber-200";

  return (
    <div className="rounded-lg border border-border bg-surface p-5 shadow-sm">
      <div>
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
      </div>

      <button
        type="button"
        onClick={() => onOpen(leader)}
        className="mt-5 w-full rounded-lg border border-border bg-background p-4 text-left transition hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-accent-soft"
      >
        <div className="flex flex-col gap-4 sm:flex-row">
          <Image src={leader.imageUrl} alt={`${leader.name} 프로필 이미지`} width={144} height={144} unoptimized className="h-28 w-full rounded-lg object-cover sm:h-36 sm:w-36" />
          <div className="min-w-0 flex-1">
            <p className={`text-xs font-semibold ${accentClass}`}>#{leader.rank} 최근 업데이트 {leader.lastUpdated}</p>
            <h4 className="mt-1 text-2xl font-semibold text-foreground">{leader.name}</h4>
            <p className="text-sm text-muted">
              {leader.role} · {leader.organization}
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <MiniStat label={metricLabel} value={tone === "positive" ? leader.positiveCount : leader.controversyCount} />
              <MiniStat label={secondaryMetricLabel} value={tone === "positive" ? leader.sourceCount : leader.correctionCount} />
              <MiniStat label="출처" value={leader.sourceCount} />
            </div>
          </div>
        </div>
        <ul className="mt-4 space-y-2">
          {leader.highlights.slice(0, 3).map(highlight => (
            <li key={highlight} className="flex gap-2 text-sm leading-6 text-muted">
              <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
        <span className="mt-4 inline-flex min-h-10 items-center rounded-lg bg-accent px-4 text-sm font-semibold text-white">히스토리 보기</span>
      </button>

      <div className="mt-4 space-y-3">
        {rest.map(person => (
          <button
            key={person.id}
            type="button"
            onClick={() => onOpen(person)}
            className="flex w-full items-center gap-3 rounded-lg border border-border bg-background p-3 text-left transition hover:border-accent/30 hover:shadow-sm focus:outline-none focus:ring-4 focus:ring-accent-soft"
          >
            <span className="w-7 text-sm font-semibold text-muted">#{person.rank}</span>
            <Image src={person.imageUrl} alt={`${person.name} 프로필 이미지`} width={48} height={48} unoptimized className="h-12 w-12 rounded-lg object-cover" />
            <span className="min-w-0 flex-1">
              <span className="block font-semibold text-foreground">{person.name}</span>
              <span className="block truncate text-sm text-muted">{person.summary}</span>
            </span>
            <span className="rounded-full border border-border px-2.5 py-1 text-xs font-semibold text-muted">
              {tone === "positive" ? person.positiveCount : person.controversyCount}건
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <span className="rounded-lg border border-border bg-surface p-2">
      <span className="block text-xs text-muted">{label}</span>
      <span className="mt-1 block text-lg font-semibold text-foreground">{value}</span>
    </span>
  );
}
