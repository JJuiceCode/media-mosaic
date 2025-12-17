import type { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import Kakao from "next-auth/providers/kakao";
import Naver from "next-auth/providers/naver";

const googleClientId = process.env.AUTH_GOOGLE_ID;
const googleClientSecret = process.env.AUTH_GOOGLE_SECRET;
const naverClientId = process.env.AUTH_NAVER_ID;
const naverClientSecret = process.env.AUTH_NAVER_SECRET;
const kakaoClientId = process.env.AUTH_KAKAO_ID;
const kakaoClientSecret = process.env.AUTH_KAKAO_SECRET;
const authSecret = process.env.AUTH_SECRET;

const missingEnv = [
  ["AUTH_GOOGLE_ID", googleClientId],
  ["AUTH_GOOGLE_SECRET", googleClientSecret],
  ["AUTH_NAVER_ID", naverClientId],
  ["AUTH_NAVER_SECRET", naverClientSecret],
  ["AUTH_KAKAO_ID", kakaoClientId],
  ["AUTH_KAKAO_SECRET", kakaoClientSecret],
  ["AUTH_SECRET", authSecret],
].filter(([, value]) => !value);

if (missingEnv.length) {
  const missingKeys = missingEnv.map(([key]) => key).join(", ");
  throw new Error(`Missing environment variables: ${missingKeys}. Update your env file to continue.`);
}

export const authOptions: NextAuthOptions = {
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
    strategy: "jwt",
  },
};
