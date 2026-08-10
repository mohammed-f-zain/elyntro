# Elyntro Project Memory

> Agents: read this file first. Prefer it over scanning the whole repo. Update Snapshot / Structure / Routes / Data model after meaningful changes, and append a Changelog entry.

## Snapshot

- **Product:** Elyntro marketing site + admin CMS
- **Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Prisma 6 · SQLite · R3F/Drei · Framer Motion · jose · bcryptjs · zod
- **Locale:** English only
- **Dev:** `npm run dev` → http://localhost:3000
- **Admin:** http://localhost:3000/admin (login `/admin/login`)
- **Env:** `.env` from `.env.example` — `DATABASE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `SESSION_SECRET`, optional `NEXT_PUBLIC_SITE_URL`
- **DB:** SQLite `prisma/dev.db` (gitignored)
- **Seed:** `npm run db:seed` (default admin `admin@elyntro.com` / `elyntro-admin-change-me`)
- **Brand assets source:** `Assets/` → served from `public/brand/`

## Structure

| Path | Purpose |
|------|---------|
| `Assets/` | Source brand files (palette, logos, sample mockup) |
| `public/brand/` | Public logos (`elyntro-logo-white.png`, `logoWhiteNoBG.png`, `LogoNoBG.png`, `Logo.jpeg`) |
| `src/app/(site)/` | Public pages: Home, About, Services, Contact |
| `src/app/admin/login/` | Admin login UI |
| `src/app/admin/(dashboard)/` | Overview, Messages, Pages, Services, Testimonials, SEO, Settings |
| `src/app/api/contact/` | Public contact form submit |
| `src/app/api/admin/` | Authenticated CMS APIs (incl. upload + testimonials) |
| `src/components/site/` | Navbar, Footer, BrandLogo, Hero, GlassStack, TechnologiesSection, AmbientOrbits, ServiceCard, SmoothScroll |
| `public/uploads/testimonials/` | Admin-uploaded testimonial images |
| `public/testimonials/` | Seed avatar placeholders |
| `src/components/admin/` | AdminShell |
| `src/lib/` | prisma, auth, cms, seo, api helpers, utils |
| `prisma/` | schema, migrations, seed |
| `docs/` | ARCHITECTURE, ADMIN, DEVELOPMENT |
| `.cursor/rules/project-memory.mdc` | Always-apply agent memory protocol |
| `PROJECT_MEMORY.md` | This file |

## Data model

| Model | Powers |
|-------|--------|
| `AdminUser` | Admin login (bcrypt hash) |
| `SiteSetting` | Global JSON (`key=site`) — name, tagline, CTAs, contact |
| `PageContent` | Per-slug JSON sections (`home`, `about`, `services`, `contact`) |
| `Service` | Service cards (icon, sortOrder, published) |
| `Testimonial` | Home quote stage (image, name, position, content, sortOrder, published) |
| `SeoMeta` | Per-path SEO for `generateMetadata` |
| `ContactMessage` | Contact form → admin Messages inbox |

## Routes

### Public
- `/` Home — hero · trust · services · technologies mesh · delivery
- `/services` Services (Software Development, AI & Automation, Enterprise Solutions)
- `/solutions` Solutions hub
- `/about` About
- `/contact` Contact form → `POST /api/contact`

### Planned later (not built yet)
- How we work · Previous projects · richer contact block on home

### Admin
- `/admin/login`
- `/admin` Overview
- `/admin/messages` Inbox
- `/admin/pages` Page JSON editor
- `/admin/services` Services CRUD
- `/admin/testimonials` Testimonials CRUD (image upload)
- `/admin/seo` SEO editor
- `/admin/settings` Site settings

### API
- `POST /api/contact`
- `POST /api/admin/login` · `POST /api/admin/logout`
- `GET /api/admin/overview`
- `GET\|PATCH /api/admin/messages`
- `GET\|PATCH /api/admin/pages`
- `GET\|POST\|PATCH /api/admin/services`
- `GET\|POST\|PATCH /api/admin/testimonials`
- `POST /api/admin/upload`
- `GET\|PATCH /api/admin/seo`
- `GET\|PATCH /api/admin/settings`

## Brand

- **Tagline:** THINK FORWARD. BUILD SMARTER.
- **Colors:** Midnight Navy `#071426` · Deep Navy `#0B1E3A` · Electric Cyan `#00B8F5` · Royal Blue `#246BFD` · Electric Violet `#725CFF` · Off White `#F5F8FF` · Cool Gray `#94A3B8`
- **Fonts:** Syne (display) · Outfit (body) via `next/font`
- **Accent gradient:** Cyan → Violet
- **Logos:** Primary `public/brand/elyntro-logo-white.png` (from `Assets/logoWhiteNoBG.png`, transparent); also `LogoNoBG.png`, `Logo.jpeg`
- **Look:** Dark navy tech UI, full-bleed hero, R3F network scene, glass cards

## Changelog

### 2026-08-10 — Fix search scroll jump on mobile
- **Changed:** Services carousel autoplay no longer uses `scrollIntoView` (was yanking the page up while typing in Technologies); scrolls the horizontal scroller only and pauses when off-screen
- **Files:** `ServicesCarousel.tsx`
- **Why:** Mobile tech search appeared to scroll to top on each keystroke

### 2026-08-10 — Mobile UX: drawer, hero, stats, services, tech
- **Changed:** Side drawer mobile nav (portaled to `body` so Framer transform doesn’t clip it); hide hero Scroll on mobile; TrustStats 2×2 cards; home services auto-swipe carousel (`md:hidden`); tech search above mesh on mobile + node reposition
- **Files:** `Navbar.tsx`, `HeroSection.tsx`, `TrustStats.tsx`, `ServicesCarousel.tsx`, `page.tsx`, `TechnologiesSection.tsx`, `company.ts`
- **Why:** Mobile menu opened from top; Scroll overlapped CTAs; stats cramped; services stacked; tech nodes hidden under search

### 2026-08-10 — Remove testimonials section + responsive pass
- **Changed:** Removed home testimonials UI/component; fixed mobile nav CTA (`btn-ghost` vs `hidden`), logo sizing, hero/tech/page heroes/contact/about type scale, overflow-x-clip
- **Files:** `page.tsx`, deleted `TestimonialsSection.tsx`, `Navbar.tsx`, `layout.tsx`, `HeroSection.tsx`, `TechnologiesSection.tsx`, `PageHero.tsx`, `about/page.tsx`, `contact/page.tsx`, `Footer.tsx`, `services/page.tsx`, `solutions/page.tsx`
- **Why:** User asked to drop testimonials and harden responsiveness page by page

### 2026-08-10 — Testimonials dual-lane marquee
- **Changed:** Replaced quote-stage with two opposite horizontal marquees of glass quote cards; pause on card hover; edge fades; overflow-x-clip
- **Files:** `TestimonialsSection.tsx`, `globals.css`
- **Why:** User disliked previous design; wanted another modern creative approach

### 2026-08-10 — Testimonials quote-stage redesign
- **Changed:** Replaced tilted marquee with featured quote stage + voice list (auto-advance, hover pause); `overflow-x-clip` removes page horizontal scroll
- **Files:** `TestimonialsSection.tsx`, `globals.css`
- **Why:** Horizontal scroll from 3D tilt; user wanted a creative design without orbits/circles

### 2026-08-10 — Testimonials 3D perspective tilt
- **Changed:** Matched Keyframe-style `perspective:1400px` + `rotateX(14) rotateY(-16) rotateZ(8) translateZ(-60)`; softer card drop shadows
- **Files:** `TestimonialsSection.tsx`
- **Why:** Flat 2D rotate did not match the reference 3D tilt

### 2026-08-10 — Testimonials tilt, card glow, tighter spacing
- **Changed:** Stronger strip tilt; per-card under-glow (no column streaks); softer top fade; less gap under heading
- **Files:** `TestimonialsSection.tsx`
- **Why:** Glow looked like 3 vertical lines; heading and strips felt like separate sections

### 2026-08-10 — Testimonials spacing + edge fades
- **Changed:** More gap under heading; cyan/violet glow under cards; full-bleed top/bottom fades so strips emerge from darkness
- **Files:** `TestimonialsSection.tsx`
- **Why:** User requested spacing, card glow, and page-edge shadow portals

### 2026-08-10 — Testimonials CMS + home marquee
- **Changed:** Testimonial model/admin CRUD with image upload; home section with 3 tilted strips (up/down/up) that pause on hover
- **Files:** `schema.prisma`, `seed.ts`, `api/admin/testimonials`, `api/admin/upload`, `admin/testimonials`, `TestimonialsSection.tsx`, `page.tsx`, `cms.ts`, `AdminShell.tsx`, `globals.css`
- **Why:** User requested dashboard-managed testimonials with animated strips on home

### 2026-08-10 — Fix admin sidebar visibility
- **Changed:** AdminShell uses a solid fixed/static sidebar with mobile drawer; always visible on desktop
- **Files:** `AdminShell.tsx`
- **Why:** Sidebar was not appearing in the admin panel layout

### 2026-08-10 — Tech logos + idle light walk
- **Changed:** Technologies set to TS/Docker/Python/Next/React/Node/Nest/Mongo/3D JS with logos; idle spotlight walks node-to-node when search is empty
- **Files:** `TechnologiesSection.tsx`, `company.ts`, `public/tech/*.svg`
- **Why:** User requested specific stack, logos, and sequential light animation

### 2026-08-10 — Technologies constellation section
- **Changed:** Home Technologies section with organic fluid mesh, scattered tech nodes that animate in on scroll, and search that lights matching lines + frames
- **Files:** `TechnologiesSection.tsx`, `company.ts` (`techNodes`), `page.tsx`
- **Why:** Break rigid layout with a creative interactive stack showcase (not orbits)

### 2026-08-10 — Smooth scrolling (Lenis)
- **Changed:** Added Lenis smooth wheel scroll on the public site; respects prefers-reduced-motion
- **Files:** `SmoothScroll.tsx`, `SiteEffects.tsx`, `globals.css`, `package.json`
- **Why:** User wanted smooth scroll across the site

### 2026-08-10 — Glass stack half-circle handoff
- **Changed:** Top card arcs along a downward half-circle (picked up → set at bottom); remaining cards step up
- **Files:** `GlassStack.tsx`
- **Why:** User wanted a take-and-place motion, not a linear slide

### 2026-08-10 — Glass stack deck cycle + remove from home
- **Changed:** Home services section no longer shows GlassStack; stack animation cycles top card to the bottom like a deck
- **Files:** `page.tsx`, `GlassStack.tsx`
- **Why:** User wanted deck-style shuffle and no glass stack on home

### 2026-08-10 — Fix reduced-motion hydration mismatches
- **Changed:** Added `useHydrationSafeReducedMotion` and switched site motion components to it so SSR and first client render match
- **Files:** `src/lib/motion.ts`, site components using reduced motion
- **Why:** `useReducedMotion()` could change the DOM tree between server and client; Cursor `data-cursor-ref` noise is unrelated

### 2026-08-10 — Glass layer stack (no orbits)
- **Changed:** Replaced orbit orb with isometric glass engineering layers (CODE/BUILD/SHIP/AI/SYS); active layer lifts; fluid responsive sizing
- **Files:** `GlassStack.tsx`, `PrismCrystal.tsx`, `SpinCube.tsx`, `PageHero.tsx`, `page.tsx`
- **Why:** User wanted a modern professional 3D idea related to brand, not more orbits

### 2026-08-10 — Orbiting labels visit center
- **Changed:** Tech orb enlarged; labels travel elliptical orbits, one flies to center, holds, then returns to its track
- **Files:** `PrismCrystal.tsx`, `PageHero.tsx`, `page.tsx`
- **Why:** User wanted text moving on orbits with a center stop, then back onto the path

### 2026-08-10 — Use white logo lockup
- **Changed:** Site/admin BrandLogo, BrandScene, and About now use transparent white lockup from `logoWhiteNoBG.png` (served as `elyntro-logo-white.png`)
- **Files:** `public/brand/elyntro-logo-white.png`, `Assets/logoWhiteNoBG.png`, `BrandLogo.tsx`, `Navbar.tsx`, `Footer.tsx`, `BrandScene.tsx`, `about/page.tsx`, `admin/login/page.tsx`
- **Why:** Official white lockup is readable on dark navy; black BG removed so mark blends with header

### 2026-08-10 — Tech orb + header brand mark
- **Changed:** Replaced cube with glass tech orb (orbital rings + core); header/footer/login use thick SVG BrandLogo + readable ELYNTRO wordmark
- **Files:** `PrismCrystal.tsx`, `BrandLogo.tsx`, `SpinCube.tsx`, `Navbar.tsx`, `Footer.tsx`, `PageHero.tsx`, `page.tsx`, `admin/login/page.tsx`
- **Why:** Cube fought the design; PNG logo mark was tiny and navy wordmark vanished on dark UI

### 2026-08-10 — True upright flip-card label
- **Changed:** Label uses front + pre-rotated back faces with a full 180° flip (classic flip-card) so text never settles upside-down
- **Files:** `SpinCube.tsx`
- **Why:** Previous mid-swap left SHIP mirrored/upside-down on screen

### 2026-08-10 — Readable flip text synced to cube
- **Changed:** Label flips on the same axis/timing as the cube, but swaps at 90° mid-flip so text never lands upside-down; hover still pauses
- **Files:** `SpinCube.tsx`
- **Why:** User wants text to flip with the cube while staying readable

### 2026-08-10 — Cube face text moves with flip again
- **Changed:** Restored labels on each 3D face so text rotates with the cube during flips (no overlay swap)
- **Files:** `SpinCube.tsx`
- **Why:** User wanted text to move with the flip, not just change after each flip

### 2026-08-10 — Cube label fixed flat in center
- **Changed:** Removed text from 3D faces; centered upright label overlays the cube (not in flip transform) so it never fades/rotates away
- **Files:** `SpinCube.tsx`
- **Why:** Billboard face text was disappearing during flips

### 2026-08-10 — Cube text inside + slower flips
- **Changed:** Labels back inside each face with billboard counter-rotation (stay readable); slower flip (~0.9s) and longer hold (~2s); hover still pauses
- **Files:** `SpinCube.tsx`
- **Why:** Text was outside the cube and flips felt too fast

### 2026-08-10 — Cube readable labels + pause on hover
- **Changed:** Removed flipping face text; upright caption under cube; hover pauses flips (tilt only while paused)
- **Files:** `SpinCube.tsx`
- **Why:** Face text was unreadable during flips; user wanted hover to stop flipping

### 2026-08-10 — Cube alternate flip up then side
- **Changed:** Cube flips up on X, then sideways on Y, repeating (tumble), with labeled top/bottom faces
- **Files:** `SpinCube.tsx`
- **Why:** User wanted flip to the top, then to the side, and so on

### 2026-08-10 — Cube flips sides instead of spinning
- **Changed:** SpinCube now snaps 90° face-to-face (~0.5s flip, ~0.9s hold) instead of continuous spin
- **Files:** `SpinCube.tsx`
- **Why:** User wanted shorter motion and a flip, not a spin

### 2026-08-10 — Cube spin forced via rAF
- **Changed:** SpinCube now rotates with `useAnimationFrame` every 7s (always on); mouse tilt optional; avoids CSS/Framer/`prefers-reduced-motion` freezes
- **Files:** `SpinCube.tsx`
- **Why:** Cube still appeared frozen for the user

### 2026-08-10 — Fix SpinCube animation clarity
- **Changed:** Rebuilt cube spin with Framer-only continuous `rotateY` (no CSS/Framer transform fight); clearer pitch + face labels (`CODE`/`AI`/`SYS`/`AUTO`)
- **Files:** `SpinCube.tsx`, `PROJECT_MEMORY.md`
- **Why:** Soft/box animation looked stuck or unclear

### 2026-08-10 — Real content + motion on all public pages
- **Changed:** Richer Services/Solutions/About/Contact with software-company data; `PageHero`, `ProcessTimeline`, expanded `ServiceCard`; shared `company.ts`; seed updates
- **Files:** `src/lib/company.ts`, `PageHero.tsx`, `ProcessTimeline.tsx`, `ServiceCard.tsx`, `(site)/{services,solutions,about,contact,page}.tsx`, `prisma/seed.ts`
- **Why:** User wanted real data and great animation across pages

### 2026-08-10 — Real delivery section; remove empty squares
- **Changed:** Removed empty decorative squares from `BrandScene`; replaced home “Experience” block with software-company delivery content + `CapabilityPanel` (metrics, capabilities, stack)
- **Files:** `BrandScene.tsx`, `CapabilityPanel.tsx`, `(site)/page.tsx`, `PROJECT_MEMORY.md`
- **Why:** User disliked empty squares and placeholder Experience copy

### 2026-08-10 — Bigger logo + interactive accents outside hero
- **Changed:** Larger nav/footer/admin logos; added `SpinCube` + `BrandScene` to home services/experience, About, Services, Solutions — hero Core animation untouched
- **Files:** `Navbar.tsx`, `Footer.tsx`, `SpinCube.tsx`, `BrandScene.tsx`, `(site)/page.tsx`, `about/page.tsx`, `services/page.tsx`, `solutions/page.tsx`, `admin/login/page.tsx`
- **Why:** User wanted bigger logo and simple 3D/image interactivity in other sections only

### 2026-08-10 — Remove hero tilt frame/bg box
- **Changed:** Removed full-bleed glare + hero-grid from tilting layer; tilt only Core/nodes/rings; glows stay flat/transparent so no rectangular borders on hover
- **Files:** `Hero3D.tsx`, `PROJECT_MEMORY.md`
- **Why:** Hover tilt revealed a visible background box/borders around the hero visual

### 2026-08-10 — Fewer BG orbits; keep hero Core rings clean
- **Changed:** Cut ambient BG orbits to 3 (mid/lower page only) so hero Elyntro Core keeps only its own 2 rings; fewer glow dots
- **Files:** `AmbientOrbits.tsx`, `PROJECT_MEMORY.md`
- **Why:** User asked not to add orbits beside Core in hero, and to reduce overall orbit count

### 2026-08-10 — Fix BG visibility + larger open hero visual
- **Changed:** Ambient orbits now `z-[1]` above body wash (was `-z-10`, invisible); stronger orbit opacity; hero visual taller/open with no outer framed rounded box
- **Files:** `AmbientOrbits.tsx`, `SiteEffects.tsx`, `Hero3D.tsx`, `HeroSection.tsx`, `globals.css`, `PROJECT_MEMORY.md`
- **Why:** User could not see BG; hero looked small with frame/radius

### 2026-08-10 — Calm hero nodes + ambient orbits BG
- **Changed:** Removed up/down jumping on hero boxes; soft opacity pulse only; added site-wide scattered animated orbits/circles background (`AmbientOrbits`)
- **Files:** `src/components/site/Hero3D.tsx`, `AmbientOrbits.tsx`, `SiteEffects.tsx`, `src/app/globals.css`, `PROJECT_MEMORY.md`
- **Why:** User liked nexus but boxes jumped; requested animated orbits/circles across the site BG

### 2026-08-10 — Hero nexus + scroll motion
- **Changed:** Replaced weak R3F blob with interactive Elyntro Core nexus (energy paths, floating nodes, mouse tilt, orbit rings); added top scroll progress, hero parallax fade, richer SectionReveal directions, parallax trust strip
- **Files:** `src/components/site/Hero3D.tsx`, `HeroSection.tsx`, `SectionReveal.tsx`, `ScrollProgress.tsx`, `SiteEffects.tsx`, `src/app/(site)/layout.tsx`, `page.tsx`, `about/page.tsx`, `contact/page.tsx`
- **Why:** Hero felt poor; user asked for a special visual and scroll animations

### 2026-08-10 — Home redesign to section criteria + motion
- **Changed:** Nav = Home/Services/Solutions/About/Contact; hero stagger + shimmer + 3D network nodes; animated trust counters; spotlight service cards; new `/solutions`; core 3 services only; reserved later sections
- **Files:** `src/components/site/*`, `src/app/(site)/page.tsx`, `src/app/(site)/solutions/page.tsx`, `src/app/globals.css`, `prisma/seed.ts`, `PROJECT_MEMORY.md`
- **Why:** Match agreed page structure with responsive creative animation

### 2026-08-10 — Full site + admin CMS implemented
- **Changed:** Scaffolded Next.js app; brand tokens; Prisma CMS; public pages with 3D hero; admin dashboard (content/SEO/services/messages/settings); contact → inbox; docs + agent memory rule
- **Files:** `src/app/**`, `src/components/**`, `src/lib/**`, `prisma/**`, `public/brand/**`, `docs/**`, `PROJECT_MEMORY.md`, `.cursor/rules/project-memory.mdc`, `README.md`, `.env.example`
- **Why:** Deliver Elyntro marketing site and CMS per plan

### 2026-08-10 — Bootstrap memory + docs
- **Changed:** Added agent memory, Cursor rule, and docs stubs
- **Files:** `PROJECT_MEMORY.md`, `.cursor/rules/project-memory.mdc`, `docs/*`, `README.md`
- **Why:** Agents should track structure via memory instead of full-repo scans
