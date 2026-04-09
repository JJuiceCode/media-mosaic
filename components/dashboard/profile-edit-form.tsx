"use client";

import { FormEvent, useMemo, useState, useTransition } from "react";

type ProfileEditFormProps = {
  initialName: string;
  initialImage: string | null;
  email: string | null;
};

export function ProfileEditForm({ initialName, initialImage, email }: ProfileEditFormProps) {
  const [name, setName] = useState(initialName);
  const [image, setImage] = useState(initialImage ?? "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const isDirty = useMemo(() => {
    return name.trim() !== initialName || image.trim() !== (initialImage ?? "");
  }, [image, initialImage, initialName, name]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    startTransition(async () => {
      const response = await fetch("/api/dashboard/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          image: image.trim(),
        }),
      });

      const data = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        setError(data?.error ?? "프로필 저장 중 문제가 발생했습니다.");
        return;
      }

      setSuccess("프로필이 저장되었습니다. 페이지를 새로고침하면 상단 환영 메시지에도 반영됩니다.");
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-slate-300/70 bg-slate-100 p-5 dark:border-white/10 dark:bg-white/3">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">프로필 수정</h3>
        <p className="mt-1 text-sm text-slate-600 dark:text-white/65">회원 정보를 업데이트합니다.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm text-slate-700 dark:text-white/80">이름</span>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={40}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-cyan-300 dark:border-white/15 dark:bg-slate-950/50"
            placeholder="이름을 입력하세요"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm text-slate-700 dark:text-white/80">프로필 이미지 URL (선택)</span>
          <input
            type="url"
            value={image}
            onChange={(event) => setImage(event.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-cyan-300 dark:border-white/15 dark:bg-slate-950/50"
            placeholder="https://..."
          />
        </label>
      </div>

      <div className="text-sm text-slate-600 dark:text-white/70">이메일: {email ?? "이메일 정보 없음"}</div>

      {error ? <p className="rounded-lg border border-red-300/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p> : null}
      {success ? <p className="rounded-lg border border-emerald-300/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">{success}</p> : null}

      <button
        type="submit"
        disabled={isPending || !isDirty}
        className="inline-flex items-center justify-center rounded-xl border border-cyan-500/60 px-4 py-2 text-sm font-semibold text-cyan-700 transition hover:border-cyan-600 hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-cyan-300/60 dark:text-cyan-100 dark:hover:border-cyan-200 dark:hover:bg-cyan-400/10"
      >
        {isPending ? "저장 중..." : "프로필 저장"}
      </button>
    </form>
  );
}
