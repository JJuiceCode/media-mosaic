import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import Google from "next-auth/providers/google";
import Kakao from "next-auth/providers/kakao";
import Naver from "next-auth/providers/naver";

import { prisma } from "@/lib/prisma";

const googleClientId = process.env.AUTH_GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.AUTH_GOOGLE_CLIENT_SECRET;
const naverClientId = process.env.AUTH_NAVER_CLIENT_ID;
const naverClientSecret = process.env.AUTH_NAVER_CLIENT_SECRET;
const kakaoClientId = process.env.AUTH_KAKAO_CLIENT_ID;
const kakaoClientSecret = process.env.AUTH_KAKAO_CLIENT_SECRET;

const authSecret = process.env.AUTH_SECRET;

const missingEnv = [
  ["AUTH_GOOGLE_CLIENT_ID", googleClientId],
  ["AUTH_GOOGLE_CLIENT_SECRET", googleClientSecret],
  ["AUTH_NAVER_CLIENT_ID", naverClientId],
  ["AUTH_NAVER_CLIENT_SECRET", naverClientSecret],
  ["AUTH_KAKAO_CLIENT_ID", kakaoClientId],
  ["AUTH_KAKAO_CLIENT_SECRET", kakaoClientSecret],
  ["AUTH_SECRET", authSecret],
].filter(([, value]) => !value);

if (missingEnv.length) {
  const missingKeys = missingEnv.map(([key]) => key).join(", ");
  throw new Error(`Missing environment variables: ${missingKeys}. Update your env file to continue.`);
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: authSecret,
  providers: [
    Google({
      clientId: googleClientId!,
      clientSecret: googleClientSecret!,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Naver({
      clientId: naverClientId!,
      clientSecret: naverClientSecret!,
    }),
    Kakao({
      clientId: kakaoClientId!,
      clientSecret: kakaoClientSecret!,
    }),
  ],
  session: {
    strategy: "database",
  },
  callbacks: {
    async session({ session, token, user }) {
      if (session.user) {
        const candidate =
          (typeof token?.picture === "string" ? token.picture : user?.image ?? session.user.image) ?? "";

        session.user.image = candidate ? candidate.replace(/^http:\/\//, "https://") : undefined;
      }
      return session;
    },
  },
};
