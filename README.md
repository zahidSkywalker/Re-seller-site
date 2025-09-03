# Adsy-like Fullstack App (Next.js 14 + Prisma + NextAuth)

Modern, production-ready fullstack web app inspired by `adsy.com`, built with Next.js (App Router), Tailwind CSS, Prisma, and NextAuth. Includes polished landing UI and foundations for auth and database.

## Tech Stack
- Next.js 14 (App Router) + React 18
- Tailwind CSS + tailwindcss-animate + Lucide Icons
- Prisma ORM (SQLite for dev, Postgres for prod)
- NextAuth (Credentials)
- Zod + @t3-oss/env-nextjs for env validation

## Local Development
1. Install deps: `npm install`
2. Copy env: `cp .env.example .env`
3. Run Prisma:
   - `npx prisma generate`
   - `npx prisma migrate dev`
   - `npm run seed`
4. Start dev server: `npm run dev`

## Production Environment Variables
- `DATABASE_URL`: Postgres connection string in production; `file:./dev.db` for local
- `NEXTAUTH_SECRET`: Strong random string (e.g. `openssl rand -base64 32`)
- `NEXTAUTH_URL`: Public site URL (only in prod)

## Deploy on Vercel
1. Push code to GitHub/GitLab/Bitbucket
2. Import the repo in Vercel
3. Framework preset: Next.js
4. Set Environment Variables:
   - `DATABASE_URL` (use Vercel Postgres or Neon/Supabase)
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (e.g. https://your-domain.vercel.app)
5. Prisma on Vercel:
   - Add a Postgres DB and set `DATABASE_URL`
   - In Vercel Project Settings → Deploy Hooks, add a Post-Deployment script or run once locally:
     - `npx prisma migrate deploy`
6. Click Deploy. Vercel builds and serves automatically.

Notes:
- Avoid Prisma binary size issues by using the default Prisma client (already configured)
- Incremental static regeneration and edge not required here

## Deploy on Render (Web Service)
1. Create a new Web Service → Connect your repo
2. Environment: `Node` (use Node 20+)
3. Build Command:
   - `npm ci && npx prisma generate && npm run build`
4. Start Command:
   - `npx prisma migrate deploy && npm start`
5. Add Environment Variables:
   - `DATABASE_URL` (Render PostgreSQL add-on recommended)
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (Render service URL)
6. Create a Render PostgreSQL instance and copy its `Internal Database URL` to `DATABASE_URL`

Optional: use `render.yaml` for IaC provisioning.

## Payments (Stripe)
- Set env vars:
  - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  - STRIPE_SECRET_KEY
  - STRIPE_WEBHOOK_SECRET
- Create a webhook endpoint on Stripe pointing to `/api/stripe/webhook`
- Local webhook forwarding: `stripe listen --forward-to localhost:3000/api/stripe/webhook`
- Create a session via Buy button on listings; success/cancel pages are included.

## Vercel (Stripe)
- Add the above Stripe env vars in Project Settings → Environment Variables
- Add a Production webhook in Stripe to your Vercel domain `/api/stripe/webhook`
- Ensure `NEXTAUTH_URL` is set to the Vercel domain

## Render (Stripe)
- Add the above Stripe env vars in the web service
- Add a webhook in Stripe to your Render domain `/api/stripe/webhook`
- Ensure `NEXTAUTH_URL` is set to the Render domain