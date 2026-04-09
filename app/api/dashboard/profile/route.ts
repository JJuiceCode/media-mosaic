import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";

const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 40;
const IMAGE_MAX_LENGTH = 1_000;

function sanitizeImageUrl(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  if (trimmed.length > IMAGE_MAX_LENGTH) {
    return { error: "프로필 이미지 URL 길이가 너무 깁니다." } as const;
  }

  try {
    // Accept only absolute HTTP(S) URLs to avoid invalid values.
    const parsed = new URL(trimmed);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return { error: "프로필 이미지 URL은 http 또는 https만 지원합니다." } as const;
    }
  } catch {
    return { error: "유효한 프로필 이미지 URL을 입력해주세요." } as const;
  }

  return { value: trimmed.replace(/^http:\/\//, "https://") } as const;
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const imageResult = sanitizeImageUrl(body?.image);

  if (!name || name.length < NAME_MIN_LENGTH || name.length > NAME_MAX_LENGTH) {
    return NextResponse.json({ error: "이름은 2자 이상 40자 이하로 입력해주세요." }, { status: 400 });
  }

  if (imageResult && "error" in imageResult) {
    return NextResponse.json({ error: imageResult.error }, { status: 400 });
  }

  const updated = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name,
      image: imageResult ? imageResult.value : null,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  });

  return NextResponse.json({ ok: true, user: updated });
}
