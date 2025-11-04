# Agent Instructions

## What this project is
A Next.js + Supabase web app that collects customer info for ArborAI (a tree-service scheduling demo) and sends SMS messages via Twilio through Make webhooks.

## Goals
- Build a working demo for SMS-based scheduling and follow-up automation.
- Enable users to opt in through a compliant web form.
- Store leads in Supabase and trigger a Make webhook on form submission.
- Provide a realistic, production-ready frontend for Twilio verification.
- “Done” means: the app successfully collects leads, pushes data to Make and Supabase, and can be hosted publicly on Vercel with a compliant opt-in page.

## Constraints / Rules
- Use **TypeScript** (no plain JS).
- Framework: **Next.js 14+** (App Router, not Pages Router).
- Styling: **TailwindCSS** for consistency and simplicity.
- No inline CSS except for small tweaks.
- All environment variables managed via `.env.local` and Vercel Environment Variables.
- Keep dependencies minimal — avoid large UI libraries.
- Prioritize clear code comments over excessive abstraction.
- Performance: must build and deploy in <10s on Vercel, with sub-1s load time for the signup form.

## Architecture Notes
- **Main entry file:** `app/page.tsx` (renders the ArborAI signup form and handles submission).
- **Database code:** lives in `/lib/supabase.ts` (handles Supabase client creation).
- **API routes:** live in `app/api/lead/route.ts` — handles POST requests from the signup form, writes to Supabase, and sends payload to Make webhook.
- **UI components:** all live within `/app` (simple component tree, no global layout beyond `app/layout.tsx`).
- **Environment Variables:**
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `MAKE_LEAD_WEBHOOK_URL`
  - `MAKE_REPLY_WEBHOOK_URL`

## Development
- **Run locally:**
  1. Clone the repo.
  2. Run `npm install` or `pnpm install`.
  3. Create `.env.local` with Supabase + Make + Twilio vars.
  4. Start dev server:  
     ```bash
     npm run dev
     ```
     The app runs on [http://localhost:3000](http://localhost:3000).

- **Build / Deploy:**
  1. Push to GitHub or deploy directly via Vercel CLI:
     ```bash
     vercel
     ```
  2. Vercel auto-detects Next.js.
  3. Add environment variables in Vercel dashboard under *Settings → Environment Variables*.
  4. Once deployed, verify the public URL (e.g., `https://arborai-demo.vercel.app`) is reachable.
  5. Use this URL as the **Proof of Consent (opt-in)** link in your Twilio Toll-Free Verification.

