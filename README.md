# Elyntro

Marketing website and admin CMS for **Elyntro** — *Think forward. Build smarter.*

## Features

- Public pages: Home, About, Services, Contact
- Animated dark tech UI with 3D hero (React Three Fiber)
- Admin dashboard for page content, services, SEO, settings, and contact inbox
- Prisma + SQLite (portable to Postgres later)

## Quick start

```bash
npm install
cp .env.example .env
npx prisma migrate dev
npm run db:seed
npm run dev
```

- Site: http://localhost:3000
- Admin: http://localhost:3000/admin/login

## Environment

Copy `.env.example` to `.env`:

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Prisma SQLite URL (`file:./dev.db`) |
| `ADMIN_EMAIL` | Seeded admin login email |
| `ADMIN_PASSWORD` | Seeded admin password |
| `SESSION_SECRET` | Cookie signing secret |

## Brand

Source assets live in `Assets/`. Runtime copies are in `public/brand/`.

Palette: Midnight Navy, Deep Navy, Electric Cyan, Royal Blue, Electric Violet, Off White, Cool Gray.

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Admin guide](docs/ADMIN.md)
- [Development](docs/DEVELOPMENT.md)
- Agent map / changelog: [PROJECT_MEMORY.md](PROJECT_MEMORY.md)

## Scripts

```bash
npm run dev        # development
npm run build      # production build
npm run start      # production server
npm run lint       # eslint
npm run db:seed    # seed admin + CMS defaults
npm run db:studio  # Prisma Studio
```
