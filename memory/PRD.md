# Amber Cove — Product Requirements (Living Doc)

## Original Problem Statement
Premium, visually striking single-page website for **Amber Cove**, a South Florida luxury outdoor living design-build studio. Editorial, high-end, Awwwards-caliber. Warm amber-gold (#C8963E) on dark charcoal; Cormorant Garamond serif headlines + DM Sans body; scroll-triggered reveals; everything hover-interactive. Add photos + testimonials; placeholder Instagram.

## Architecture
- **Frontend**: React 19, Tailwind, framer-motion (reveals, parallax, carousel), Lenis (smooth momentum scroll), sonner toasts, lucide-react icons. Single page composed of section components in `/app/frontend/src/components/`. Content in `src/data.js`.
- **Backend**: FastAPI + Motor/MongoDB. `POST /api/contact` saves inquiry + emails owner via Emergent-managed Resend proxy (best-effort, non-blocking). `GET /api/contact` lists submissions.
- **Env**: `EMERGENT_EMAIL_KEY`, `EMAIL_FROM_NAME=Amber Cove`, `OWNER_EMAIL` (currently `delivered@resend.dev` placeholder).

## User Personas
- Affluent South Florida homeowners planning outdoor renovations.
- Architects / builders seeking a design-build execution partner.
- Luxury real-estate agents staging premium listings.

## Core Requirements (static)
- Fixed nav w/ scroll-aware blur + active-section tracking.
- Cinematic parallax hero w/ masked line-by-line headline reveal + dual CTAs.
- About/philosophy w/ floating accent card + inline stats.
- 6 service cards (kitchens, pergolas, hardscape, BBQs, lighting, fire/water).
- Animated stats counters, portfolio grid (Boca/Delray/Wellington/Aventura), 4-step process, testimonials carousel (homeowner/architect/agent), service-areas marquee, contact form w/ service selector, footer w/ IG.

## Implemented (2026-08-05)
- Full single-page site with all sections above, curated stock photography, framer-motion + Lenis motion system.
- Contact pipeline: save to MongoDB + owner email via Resend. Verified end-to-end (testing agent: 100% backend + frontend).

## Backlog / Remaining
- **P0**: Client to provide real receiving email (replace `delivered@resend.dev`) and real Instagram handle.
- **P1**: Real project photography; admin view for submissions; auto-reply email to inquirer.
- **P2**: Blog/journal, financing info, multi-page project case studies, SEO/OG metadata.

## Next Tasks
- Swap placeholders (email, phone, IG) once client provides them.
