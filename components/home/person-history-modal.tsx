"use client";

import { useEffect } from "react";
import Image from "next/image";

import { PersonRecord } from "@/lib/memo-home-data";
import { StatusBadge } from "@/components/home/status-badge";

type PersonHistoryModalProps = {
  person: PersonRecord | null;
  onClose: () => void;
};

export function PersonHistoryModal({ person, onClose }: PersonHistoryModalProps) {
  useEffect(() => {
    if (!person) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, person]);

  if (!person) {
    return null;
  }

  const stats = [
    { label: "전체 기록", value: person.positiveCount + person.controversyCount },
    { label: "긍정 기록", value: person.positiveCount },
    { label: "논란 기록", value: person.controversyCount },
    { label: "반론/정정", value: person.correctionCount },
    { label: "검증 대기", value: person.pendingCount },
  ];

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-neutral-950/55 px-4 py-6 backdrop-blur-sm sm:items-center" role="dialog" aria-modal="true" aria-labelledby="person-modal-title" onMouseDown={onClose}>
      <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-lg border border-border bg-surface p-5 shadow-2xl sm:p-6" onMouseDown={event => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <Image src={person.imageUrl} alt={`${person.name} 프로필 이미지`} width={64} height={64} unoptimized className="h-16 w-16 rounded-lg object-cover" />
            <div>
              <h2 id="person-modal-title" className="text-xl font-semibold text-foreground">
                {person.name}
              </h2>
              <p className="text-sm text-muted">
                {person.role} · {person.organization}
              </p>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="인물 기록 모달 닫기" className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-xl text-muted transition hover:border-accent/40 hover:text-accent">
            ×
          </button>
        </div>

        <p className="mt-5 rounded-lg border border-border bg-background p-4 text-sm leading-6 text-muted">{person.summary}</p>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {stats.map(stat => (
            <div key={stat.label} className="rounded-lg border border-border bg-background p-3">
              <p className="text-xs text-muted">{stat.label}</p>
              <p className="mt-1 text-xl font-semibold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-foreground">최근 타임라인</h3>
          <div className="mt-3 space-y-3">
            {person.timeline.map(item => (
              <article key={`${item.date}-${item.title}`} className="rounded-lg border border-border bg-background p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs text-muted">{item.date}</p>
                    <h4 className="mt-1 text-sm font-semibold leading-6 text-foreground">{item.title}</h4>
                  </div>
                  <StatusBadge status={item.status} />
                </div>
                <button type="button" className="mt-3 text-sm font-semibold text-accent hover:text-accent-dark">
                  {item.sourceLabel} 보기
                </button>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
          <button type="button" className="min-h-11 rounded-lg border border-border px-4 text-sm font-semibold text-foreground transition hover:border-accent/40 hover:text-accent">
            전체 프로필 보기
          </button>
          <button type="button" className="min-h-11 rounded-lg bg-accent px-4 text-sm font-semibold text-white transition hover:bg-accent-dark">
            정정/반론 요청
          </button>
        </div>
      </div>
    </div>
  );
}
