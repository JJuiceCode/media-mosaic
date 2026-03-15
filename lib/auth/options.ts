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
