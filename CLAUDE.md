# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a trucking/transportation landing page built with **Next.js 15**, **Payload CMS 3**, and **next-intl** for internationalization. It was originally a coffee shop e-commerce template that has been cleaned and converted into a boilerplate for transportation/logistics businesses.

Key characteristics:
- Multi-language support (Romanian, English, Russian)
- Payload CMS for content management with localized content
- S3-compatible storage for media uploads
- Contact form with email notifications
- News/blog system with rich text editor

## Development Commands

### Running the Application
```bash
pnpm dev          # Start dev server with Turbopack on port 3000
pnpm devsafe      # Clean .next and start dev server (use if dev breaks)
pnpm build        # Production build
pnpm start        # Start production server on port 3000
```

### Code Quality
```bash
pnpm lint         # Run Next.js ESLint
```

### Testing
```bash
pnpm test         # Run all tests (integration + e2e)
pnpm test:int     # Run integration tests with Vitest
pnpm test:e2e     # Run e2e tests with Playwright
```

Integration tests are in `tests/int/` and use Vitest with jsdom.
E2E tests are in `tests/e2e/` and use Playwright.

### Payload CMS Commands
```bash
pnpm payload generate:types      # Generate TypeScript types from collections
pnpm payload generate:importmap  # Generate import map
```

**Important**: Run `pnpm payload generate:types` after modifying any Payload collections to update `src/payload-types.ts`.

## Architecture

### Multi-language System

The app uses a dual localization system:

1. **Frontend (next-intl)**: Handles UI translations
   - Configuration: `src/i18n/routing.ts`
   - Supported locales: `ro` (default), `en`, `ru`
   - Translation files: `src/locales/{locale}.json`
   - Locale prefix: Always in URL (e.g., `/ro/news`, `/en/news`)

2. **Backend (Payload CMS)**: Handles content localization
   - Configuration: `src/payload.config.ts`
   - Admin panel UI: Supports ro, en, ru languages
   - Content localization: `ro` (default), `en`, `ru`
   - Localized fields: Marked with `localized: true` in collections

### Route Structure

```
app/
├── (frontend)/[locale]/     # Public-facing pages (localized)
│   ├── page.tsx             # Home page
│   ├── news/                # News listing
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx  # Individual news article
│   └── contacts/page.tsx    # Contact form
│
├── (payload)/               # Payload CMS admin
│   ├── admin/               # Admin panel UI
│   └── api/                 # Payload API endpoints
│
└── api/                     # Custom Next.js API routes
    ├── contact/route.ts     # Contact form submission
    └── checkout/route.ts    # Legacy (may need removal)
```

**Important**: The middleware (`src/middleware.ts`) excludes `/admin`, `/api`, and static assets from locale routing. Only frontend routes get locale prefixes.

### Payload CMS Collections

Located in `src/collections/`:

1. **Users** (`Users.ts`): Admin authentication
   - Default admin collection for Payload

2. **Media** (`Media.ts`): File uploads
   - Configured with S3 storage adapter
   - Stores files in S3-compatible bucket (AWS S3, Cloudflare R2, etc.)

3. **News** (`News.ts`): Blog/news articles
   - **Localized fields**: `title`, `subtitle`, `content`, `slug`
   - **Non-localized fields**: `publishedDate`, `status`, `image`
   - Auto-generates slug from title if empty (per locale)
   - Rich text content with Lexical editor
   - Status: `draft` or `published`

### Database Configuration

Supports PostgreSQL or SQLite (configured via `DATABASE_TYPE` env var):

```typescript
// In src/payload.config.ts
process.env.DATABASE_TYPE === 'PG'
  ? postgresAdapter({ ... })
  : sqliteAdapter({ ... })
```

- **PostgreSQL**: Production use (set `DATABASE_TYPE=PG`)
- **SQLite**: Development/testing (leave `DATABASE_TYPE` empty or set to `SQLITE`)

### Email System

Contact form uses Nodemailer (`src/lib/email.ts`):
- Transporter configured for SMTP (default: Gmail)
- Sends two emails: one to business, one confirmation to customer
- Environment variables: `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASSWORD`, `EMAIL_FROM`, `EMAIL_TO`

Note: References to "GoCoffee" in email templates should be updated to match the actual business name.

### Storage

Media files use `@payloadcms/storage-s3`:
- Configured in `src/payload.config.ts`
- Requires: `S3_BUCKET`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`
- Works with any S3-compatible storage (AWS S3, Cloudflare R2, MinIO, etc.)

## Environment Variables

See `example.env` for all required variables:

**Required**:
- `PAYLOAD_SECRET`: Random secret for Payload CMS
- `DATABASE_URL`: Database connection string
- `S3_BUCKET`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`: S3 storage credentials

**Optional**:
- `DATABASE_TYPE`: Set to `PG` for PostgreSQL, leave empty for SQLite
- `EMAIL_*`: SMTP credentials for contact form
- `RESEND_API_KEY`: If using Resend instead of Nodemailer

## Key Implementation Details

### Adding New Collections

1. Create collection file in `src/collections/`
2. Import and add to `collections` array in `src/payload.config.ts`
3. Run `pnpm payload generate:types` to update TypeScript types

### Localization Best Practices

- Use `localized: true` for fields that need translation (title, content, etc.)
- Keep structural data non-localized (dates, status, relationships)
- Slug generation respects locale context (see `News.ts` hooks)
- Access localized content: `news.title.ro`, `news.title.en`, etc.

### Middleware Exclusions

The next-intl middleware excludes:
- `/admin/**`: Payload admin panel
- `/api/**`: API routes
- `/_next/**`, `/_vercel/**`: Next.js internals
- Files with extensions (e.g., `favicon.ico`, `robots.txt`)

If adding new admin routes or API endpoints, they're automatically excluded from locale routing.

### Clean Next.js Cache

If experiencing build issues or stale cache:
```bash
pnpm devsafe  # Removes .next directory and restarts dev server
```

## Legacy Notes

This codebase was cleaned from a coffee shop e-commerce template. If you encounter references to:
- "GoCoffee" in emails or code comments
- Products, Categories, Cart functionality
- E-commerce components

These are remnants that should be updated or removed as appropriate for the trucking/transportation context.
