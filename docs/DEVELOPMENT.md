# Development

## Setup

```bash
npm install
cp .env.example .env
npx prisma migrate dev
npx prisma db seed
npm run dev
```

## Conventions

- App Router only (`src/app`)
- Server Components by default; mark client components with `"use client"`
- Brand colors via CSS variables in `src/app/globals.css`
- Public CMS reads go through Prisma helpers in `src/lib/`
- Admin mutations go through `/api/admin/*` with session checks

## Adding a public page section

1. Extend the relevant `PageContent.sections` JSON in seed + admin Pages editor
2. Render the new fields in the page component under `src/app/(site)/`
3. Update `PROJECT_MEMORY.md` Structure/Changelog if routes or schema changed

## Adding a Prisma model

1. Edit `prisma/schema.prisma`
2. `npx prisma migrate dev --name <name>`
3. Update seed if needed
4. Refresh **Data model** + Changelog in `PROJECT_MEMORY.md`

## Agent memory workflow

See `.cursor/rules/project-memory.mdc`.

1. Read `PROJECT_MEMORY.md` before broad exploration
2. After structural/feature work, update memory sections
3. Append a Changelog entry (date, change, files, why)

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local Next.js server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run db:seed` | Seed CMS + admin user |
| `npm run db:studio` | Prisma Studio |

## Reduced motion

Hero 3D and Framer Motion reveals respect `prefers-reduced-motion`. Prefer keeping that contract when adding animation.
