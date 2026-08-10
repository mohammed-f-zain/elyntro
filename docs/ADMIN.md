# Admin guide

## Access

1. Ensure `.env` has `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `SESSION_SECRET`
2. Run seed so the admin user exists: `npx prisma db seed`
3. Open http://localhost:3000/admin/login
4. Sign in with the env credentials

Default local credentials (change in production):

- Email: `admin@elyntro.com`
- Password: `elyntro-admin-change-me`

## Sections

### Overview

Dashboard counts: unread messages, published services, recent SEO updates.

### Messages

Contact form submissions land here.

- Mark read / unread
- Delete spam or resolved threads
- Unread count appears on Overview

### Pages

Edit JSON section blocks for:

- `home` — hero copy, stats, CTA labels
- `about` — mission, approach, values
- `services` — page intro (cards come from Services)
- `contact` — intro + sidebar info hints

Save applies immediately to the public site.

### Services

CRUD for service cards:

- Title, description, icon key, sort order, published flag
- Only published services appear on `/` and `/services`

### SEO

Per-route fields:

- `title`, `description`, `keywords`, `ogImage`
- Routes: `/`, `/about`, `/services`, `/contact`

Public pages load these via `generateMetadata`.

### Settings

Global site strings: name, tagline, primary/secondary CTAs, email, phone, social links.

## Security notes

- Never commit `.env`
- Rotate `ADMIN_PASSWORD` and `SESSION_SECRET` before any public deploy
- Admin APIs require a valid session cookie
