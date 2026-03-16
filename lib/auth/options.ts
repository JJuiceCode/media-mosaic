import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Kakao from "next-auth/providers/kakao";
import Naver from "next-auth/providers/naver";

import { verifyPassword } from "@/lib/auth/password";
import { prisma } from "@/lib/prisma";

const googleClientId = process.env.AUTH_GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.AUTH_GOOGLE_CLIENT_SECRET;
const naverClientId = process.env.AUTH_NAVER_CLIENT_ID;
const naverClientSecret = process.env.AUTH_NAVER_CLIENT_SECRET;
const kakaoClientId = process.env.AUTH_KAKAO_CLIENT_ID;
const kakaoClientSecret = process.env.AUTH_KAKAO_CLIENT_SECRET;

const authSecret = process.env.AUTH_SECRET;

const missingEnv = [["AUTH_SECRET", authSecret]].filter(([, value]) => !value);

if (missingEnv.length) {
  const missingKeys = missingEnv.map(([key]) => key).join(", ");
  throw new Error(`Missing environment variables: ${missingKeys}. Update your env file to continue.`);
}

const providers: NextAuthOptions["providers"] = [
  Credentials({
    name: "Email & Password",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const email = credentials?.email?.trim().toLowerCase();
      const password = credentials?.password;

      if (!email || !password) {
        return null;
      }

      const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true, email: true, name: true, image: true, passwordHash: true },
      });

      if (!user?.passwordHash) {
        return null;
      }

      const isValid = verifyPassword(password, user.passwordHash);

      if (!isValid) {
        return null;
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
      };
    },
  }),
];

if (googleClientId && googleClientSecret) {
  providers.push(
    Google({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  );
}

if (naverClientId && naverClientSecret) {
  providers.push(
    Naver({
      clientId: naverClientId,
      clientSecret: naverClientSecret,
    }),
  );
}

if (kakaoClientId && kakaoClientSecret) {
  providers.push(
    Kakao({
      clientId: kakaoClientId,
      clientSecret: kakaoClientSecret,
    }),
  );
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: authSecret,
  providers,
  session: {
    // Credentials Provider를 사용하므로 세션 전략을 JWT로 통일
    // 소셜 로그인 사용자도 세션은 DB가 아니라 JWT 쿠키로 관리됨
    strategy: "jwt",
  },
  callbacks: {
    // JWT 토큰을 생성할 때(로그인 시) 유저 정보를 토큰에 담아줍니다.
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.picture = user.image; // 커스텀 로그인 유저의 이미지 처리
      }
      return token;
    },
    // 클라이언트(브라우저)에서 세션을 읽을 때 토큰의 정보를 세션 객체로 넘겨줍니다.
    async session({ session, token }) {
      if (session.user) {
        // 토큰에 있는 id를 세션 객체에 넣어줍니다 (선택사항이지만 유용함)
        session.user.id = token.id ?? "";

        // 이미지 HTTP -> HTTPS 변환 로직
        const candidate = (typeof token?.picture === "string" ? token.picture : session.user.image) ?? "";
        session.user.image = candidate ? candidate.replace(/^http:\/\//, "https://") : undefined;
      }
      return session;
    },
  },
};
