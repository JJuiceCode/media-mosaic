## Overview

Media Mosaic is transitioning into an authenticated experience. Step 1 is live with Google and Naver social login powered by [NextAuth.js](https://next-auth.js.org/). The landing page now shows the current session state and gives you a quick way to connect or disconnect either account.

## Prerequisites

- Node.js 18+
- `pnpm` 8+
- A Google Cloud project with OAuth credentials (Web application)
- A Naver Cloud Platform application with OAuth credentials (네이버 Developers 콘솔)

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the secrets:

```bash
cp .env.example .env.local
```

| Name                      | Description                                             |
| ------------------------- | ------------------------------------------------------- |
| `AUTH_GOOGLE_ID`          | OAuth Client ID from Google Cloud Console               |
| `AUTH_GOOGLE_SECRET`      | OAuth Client Secret                                     |
| `AUTH_NAVER_ID`           | Client ID from Naver Developers                         |
| `AUTH_NAVER_SECRET`       | Client Secret from Naver Developers                     |
| `AUTH_SECRET`             | Any long random string used to encrypt NextAuth cookies |
| `NEXTAUTH_URL` (optional) | Set to your site URL when deploying                     |

## Google OAuth quick setup

1. Go to **APIs & Services → Credentials → Create Credentials → OAuth client ID**.
2. Choose **Web application**.
3. Add `http://localhost:3000` to **Authorized JavaScript origins**.
4. Add `http://localhost:3000/api/auth/callback/google` to **Authorized redirect URIs**.
5. Copy the generated Client ID/Secret into `.env.local`.

## Naver OAuth quick setup

1. 방문: [https://developers.naver.com/apps/#/register](https://developers.naver.com/apps/#/register) → **애플리케이션 등록**.
2. **사용 API**에서 "네이버 아이디로 로그인"을 선택하고 서비스 URL을 `http://localhost:3000` 으로 입력.
3. **Callback URL**에 `http://localhost:3000/api/auth/callback/naver` 추가.
4. 앱이 생성되면 Client ID/Secret을 복사해 `.env.local`의 `AUTH_NAVER_ID`, `AUTH_NAVER_SECRET`에 채워 넣음.

## Run locally

```bash
pnpm install
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) and click **Continue with Google** or **Naver로 계속하기**. Once you authenticate you will see the live session preview along with the option to sign out.

## Troubleshooting

- **Callback mismatch**: ensure the redirect URI list matches `http(s)://<host>/api/auth/callback/google` or `.../naver` depending on the provider.
- **Invalid secret**: regenerate `AUTH_SECRET` with `openssl rand -hex 32` if you see encryption errors.
- **Avatar blocked**: Google 및 Naver 프로필 이미지는 `next.config.ts`의 `remotePatterns`에 등록되어 있어야 하므로 수정 후 dev 서버를 재시작하세요.

## Deployment

When deploying, set the same environment variables in your hosting platform and update `NEXTAUTH_URL` to the public origin. The app is compatible with Vercel, Netlify, and any Node.js host that supports the Next.js App Router.
