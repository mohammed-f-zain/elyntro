# Architecture

## Overview

Elyntro is a Next.js App Router application with:

1. A public marketing site (Home, About, Services, Contact)
2. An admin CMS for static content, services, SEO, and contact messages
3. Prisma + SQLite as the persistence layer

```
Visitor → (site) pages → Prisma (content, SEO, services)
Visitor → POST /api/contact → ContactMessage
Admin → /admin/* → session cookie → admin APIs → Prisma
```

## Layers

| Layer | Location | Role |
|-------|----------|------|
| UI (public) | `src/app/(site)/`, `src/components/` | Marketing pages, 3D hero, motion |
| UI (admin) | `src/app/admin/` | Dashboard editors + inbox |
| API | `src/app/api/` | Contact + authenticated admin CRUD |
| Domain helpers | `src/lib/` | Prisma client, auth/session, SEO helpers |
| Data | `prisma/schema.prisma` | Models + SQLite |

## CMS model

- **SiteSetting** — global key/value JSON (site name, tagline, CTAs, contact info)
- **PageContent** — `slug` + JSON `sections` for editable page blocks
- **Service** — published service cards with sort order
- **SeoMeta** — per-route metadata used by `generateMetadata`
- **ContactMessage** — submissions from the contact form
- **AdminUser** — hashed credentials for dashboard login

Public pages read seeded CMS data so the site works immediately after `prisma db seed`.

## Auth

Admin auth is cookie-based:

1. `POST /api/admin/login` verifies email/password (bcrypt)
2. Signed session cookie (`SESSION_SECRET`) marks the request authenticated
3. Admin layouts/APIs reject unauthenticated access

## 3D and motion

- Hero uses React Three Fiber + Drei (idle network / logo scene)
- Framer Motion handles section reveals
- `prefers-reduced-motion` disables heavy animation and uses a static fallback

## Brand

Design tokens live as CSS variables (navy + cyan/violet). Source brand files are under `Assets/`; runtime copies live in `public/brand/`.
