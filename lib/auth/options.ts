import type { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";

const googleClientId = process.env.AUTH_GOOGLE_ID;
const googleClientSecret = process.env.AUTH_GOOGLE_SECRET;
const authSecret = process.env.AUTH_SECRET;

if (!googleClientId || !googleClientSecret) {
  throw new Error("Missing AUTH_GOOGLE_ID or AUTH_GOOGLE_SECRET. Update your environment variables.");
}

if (!authSecret) {
  throw new Error("Missing AUTH_SECRET. Generate one and add it to your env file.");
}

export const authOptions: NextAuthOptions = {
  secret: authSecret,
  providers: [
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
  ],
  session: {
    strategy: "jwt",
  },
};
