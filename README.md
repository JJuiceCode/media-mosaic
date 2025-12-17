## Overview

Media Mosaic is transitioning into an authenticated experience. Step 1 is live with Google social login powered by [NextAuth.js](https://next-auth.js.org/). The landing page now shows the current session state and gives you a quick way to connect or disconnect a Google account.

## Prerequisites

- Node.js 18+
- `pnpm` 8+
- A Google Cloud project with OAuth credentials (Web application)

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the secrets:

```bash
cp .env.example .env.local
```

| Name                      | Description                                             |
| ------------------------- | ------------------------------------------------------- |
| `AUTH_GOOGLE_ID`          | OAuth Client ID from Google Cloud Console               |
| `AUTH_GOOGLE_SECRET`      | OAuth Client Secret                                     |
| `AUTH_SECRET`             | Any long random string used to encrypt NextAuth cookies |
| `NEXTAUTH_URL` (optional) | Set to your site URL when deploying                     |

## Google OAuth quick setup

1. Go to **APIs & Services → Credentials → Create Credentials → OAuth client ID**.
2. Choose **Web application**.
3. Add `http://localhost:3000` to **Authorized JavaScript origins**.
4. Add `http://localhost:3000/api/auth/callback/google` to **Authorized redirect URIs**.
5. Copy the generated Client ID/Secret into `.env.local`.

## Run locally

```bash
pnpm install
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) and click **Continue with Google**. Once you authenticate you will see the live session preview along with the option to sign out.

## Troubleshooting

- **Callback mismatch**: ensure the redirect URI list in Google Cloud matches `http(s)://<host>/api/auth/callback/google`.
- **Invalid secret**: regenerate `AUTH_SECRET` with `openssl rand -hex 32` if you see encryption errors.
- **Avatar blocked**: remote Google avatar URLs are allowed via `next.config.ts`; restart the dev server after editing the file.

## Deployment

When deploying, set the same environment variables in your hosting platform and update `NEXTAUTH_URL` to the public origin. The app is compatible with Vercel, Netlify, and any Node.js host that supports the Next.js App Router.
