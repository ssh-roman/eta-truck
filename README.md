# ETA Truck - Landing Page Boilerplate

This is a clean boilerplate for building a trucking/transportation landing page with Next.js 15, Payload CMS 3, and multi-language support (Romanian, English, Russian).

## Features

- **Next.js 15** with App Router
- **Payload CMS 3** for content management
- **Multi-language support** (Romanian, English, Russian) via next-intl
- **Tailwind CSS 4** for styling
- **PostgreSQL or SQLite** database support
- **S3 Storage** for media uploads
- **News/Blog system** with rich text editor
- **Contact form** functionality
- **Responsive design** with mobile menu

## Collections Included

- **Users** - Admin authentication
- **Media** - File uploads with S3 storage
- **News** - Blog/news articles with localization

## Quick Start

### Prerequisites

- Node.js 18.20.2+ or 20.9.0+
- pnpm 9 or 10
- PostgreSQL database (or SQLite for development)
- S3-compatible storage (AWS S3, Cloudflare R2, etc.)

### Setup

1. **Clone and install dependencies:**
   ```bash
   cd eta-truck
   pnpm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set:
   - `PAYLOAD_SECRET` - Random secret key for Payload
   - `DATABASE_TYPE` - "PG" for PostgreSQL or leave empty for SQLite
   - `DATABASE_URL` - Your database connection string
   - `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_REGION` - S3 credentials

3. **Run development server:**
   ```bash
   pnpm dev
   ```

4. **Access the app:**
   - Frontend: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

5. **Create your first admin user** through the admin panel on first access.

## Project Structure

```
src/
├── app/(frontend)/[locale]/    # Frontend pages (localized)
│   ├── page.tsx                # Home page
│   ├── news/                   # News listing and detail pages
│   ├── contacts/               # Contact page
│   └── layout.tsx              # Frontend layout
├── collections/                # Payload CMS collections
│   ├── Users.ts
│   ├── Media.ts
│   └── News.ts
├── components/                 # React components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Landing/
│   │   ├── Hero.tsx
│   │   └── News.tsx
│   └── microComponents/
├── locales/                    # Translation files
│   ├── en.json
│   ├── ro.json
│   └── ru.json
└── payload.config.ts           # Payload CMS configuration
```

## Pages Included

- **Home** (`/`) - Hero section with news
- **News** (`/news`) - News listing
- **News Detail** (`/news/[slug]`) - Individual news article
- **Contact** (`/contacts`) - Contact form

## Customization

### Adding Translations

Edit the JSON files in `src/locales/`:
- `en.json` - English
- `ro.json` - Romanian
- `ru.json` - Russian

### Styling

The app uses Tailwind CSS 4. Global styles are in `src/app/(frontend)/globals.css`.

Color scheme:
- Primary: Blue (trucking theme)
- You can customize colors in the component files or add Tailwind config

### Adding New Collections

1. Create a new file in `src/collections/`
2. Import and add it to `payload.config.ts`
3. Run `pnpm payload generate:types` to update TypeScript types

### Database

**PostgreSQL:**
```env
DATABASE_TYPE=PG
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

**SQLite (development only):**
```env
# DATABASE_TYPE left empty or removed
DATABASE_URL=file:./data.db
```

## Building for Production

```bash
pnpm build
pnpm start
```

## Docker Support

```bash
docker-compose up
```

The docker-compose file is pre-configured to work with your `.env` file.

## What Was Removed

This boilerplate was cleaned from a coffee shop e-commerce template. Removed:
- Product collections
- Category collections
- Shopping cart functionality
- E-commerce components
- Service pages
- About page
- Store/shop pages

## Next Steps

1. Update branding and logo
2. Add your company information in Footer and Contact pages
3. Create news articles through the admin panel
4. Customize the Hero section for your trucking business
5. Add additional pages as needed (Services, Fleet, About, etc.)

## Support

For Payload CMS questions, see the [Payload Documentation](https://payloadcms.com/docs).
For Next.js questions, see the [Next.js Documentation](https://nextjs.org/docs).

## License

MIT
