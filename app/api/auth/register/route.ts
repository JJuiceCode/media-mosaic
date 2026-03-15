import { NextResponse } from "next/server";

import { hashPassword } from "@/lib/auth/password";
import { prisma } from "@/lib/prisma";
import { isRateLimited } from "@/lib/auth/rate-limit";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 10;

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return "unknown";
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rateLimitKey = `register:${ip}`;
  const limited = isRateLimited(rateLimitKey, 10, 60_000);

  if (limited) {
    return NextResponse.json({ error: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!name || name.length < 2 || name.length > 40) {
    return NextResponse.json({ error: "이름은 2자 이상 40자 이하로 입력해주세요." }, { status: 400 });
  }

  if (!email || !EMAIL_REGEX.test(email) || email.length > 320) {
    return NextResponse.json({ error: "유효한 이메일을 입력해주세요." }, { status: 400 });
  }

  if (!password || password.length < MIN_PASSWORD_LENGTH || password.length > 128) {
    return NextResponse.json({ error: "비밀번호는 10자 이상 128자 이하로 입력해주세요." }, { status: 400 });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (existingUser) {
    return NextResponse.json({ error: "이미 사용 중인 이메일입니다." }, { status: 409 });
  }

  const passwordHash = hashPassword(password);

  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
