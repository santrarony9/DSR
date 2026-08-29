<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# DSR Event Planner - AI Context Memory

This file serves as the permanent memory and instruction manual for any AI agent working on the DSR Event Planner project. Always read this file before making modifications.

## 1. Project Overview & Design Language
- **Client:** DSR Event Planner (Kolkata-based luxury event planner).
- **Target Audience:** Premium/Luxury clients. The site must look "foolproof" and highly professional.
- **Base Colors:** Deep Black/Charcoal background (`bg-[#111111]` or `bg-[var(--color-primary)]`).
- **Accent Colors:** Luxury Gold (`#C8A96E`).
- **Typography:** Serif fonts for headings (`Bricolage Grotesque`), clean sans-serif for body (`Karla`).
- **Animations:** Extensive use of `framer-motion` for smooth, cinematic scroll reveals.

## 2. Infrastructure & Deployment
- **Hosting:** VPS Server (DigitalOcean/Hostinger).
- **VPS IP:** 117.252.16.132
- **Process Manager:** PM2 (App runs as `dsr-event-planner` on port `3000`).
- **Deployment Script:** Run `node scripts/deploy.js` locally to SSH into the VPS and automatically deploy the latest GitHub code.
- **Database:** MongoDB Atlas (`dsrevent_db`).

## 3. The "Donkey-Proof" Admin Dashboard
The client is non-technical. The `/admin` dashboard must be extremely simple and intuitive.
- **Admin Layout:** The public header/footer are hidden in the admin panel using the `PublicWrapper` interleaving pattern in `app/layout.tsx`.
- **Admin Login:** Credentials check against MongoDB. Mobile number is the password.
- **Image Uploads:** Uploads save directly to the VPS local disk (`/public/uploads`) via `fs/promises`.
- **Vercel Blob:** There is a fallback for Vercel Blob cloud storage if `BLOB_READ_WRITE_TOKEN` is present, but on the VPS, it safely defaults to local disk.

## 4. Key Pages & Features
- **Settings Page:** `app/admin/settings/SettingsForm.tsx` controls dynamic contact info (footer/header) and Founder Details (About page). Includes direct 5MB file uploads for founder photos.
- **Portfolio (Projects):** `app/projects/ProjectsClient.tsx`. Features a Framer Motion masonry grid with a custom lightbox. It supports both standard images and YouTube videos (which play directly in the lightbox).
- **WhatsApp Widget:** Floating widget in the bottom right corner for instant lead generation.

## 5. Critical Instructions for Future Agents
- **NEVER** use generic terms like "Categories" or "Media" in the UI. Use layman terms like "Project Albums" and "Upload Photos".
- **NEVER** overwrite `ecosystem.config.js` or the deployment scripts.
- **ALWAYS** check file sizes on uploads to prevent crashing the server (5MB limit is strictly enforced).
- **ALWAYS** maintain the dark luxury aesthetic.


## Hosting Architecture (CRITICAL)
- **Split Architecture:** The project uses a split deployment model.
- **Frontend (Public Site):** Hosted on **Vercel** (dsreventplanner.com).
- **Backend (Admin Panel):** Hosted on **VPS** (117.252.16.132:3000).
- **Image Storage:** Images are uploaded ONLY via the VPS Admin panel and saved to the VPS local file system (using \s/promises\).
- **Vercel Proxy Rewrite:** \
ext.config.ts\ contains a rewrite that proxies \/uploads/*\ requests from Vercel to the VPS (\http://117.252.16.132:3000/uploads/*\).
- **Rule:** NEVER attempt to build image upload functionality meant to be executed on Vercel. Vercel blocks local file saving. All admin operations must be performed on the VPS IP.
