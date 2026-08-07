<div align="center">

# Devzfy

**Modern Web Solutions for Students, Professionals & Businesses**

A futuristic, full-featured web development agency platform built with cutting-edge technology — featuring a stunning animated landing page, a full admin dashboard, and two dedicated order flows for student portfolios and business websites.

![Next.js](https://img.shields.io/badge/Next.js%2016-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React%2019-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS%20v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma%207-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![NextAuth](https://img.shields.io/badge/NextAuth%20v5-000000?style=for-the-badge&logo=auth0&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Available Scripts](#available-scripts)
- [Admin Dashboard](#admin-dashboard)
- [Order Flows](#order-flows)
- [API & Data Layer](#api--data-layer)
- [Deployment](#deployment)
- [License](#license)

---

## Overview

Devzfy is a complete, production-ready web agency platform. It combines a visually rich, animated marketing site with a powerful content-management backend, letting you showcase services, projects, testimonials, and blog posts — while collecting structured orders from two audiences:

- **Students** — order a personal developer portfolio with projects, awards, certificates, research, education, and experience.
- **Businesses** — order a company website with branding details, feature requirements, domain preferences, and design style.

Every order generates a unique order code so customers can track status. Admins manage everything through a protected dashboard.

---

## Features

### Public Site
- **Animated Landing Page** — hero with particle background, glass morphism cards, animated counters, and scroll-reveal animations powered by Framer Motion.
- **Sections** — Features, Services, Portfolio, Technologies, Testimonials, Blog, About, and Call-to-Action.
- **Pages** — `/about`, `/services`, `/pricing`, `/projects`, `/blog`, `/contact`.
- **SEO Ready** — dynamic metadata, Open Graph, Twitter cards, and site settings.
- **Light & Dark Mode** — theme switching with `next-themes`.

### Student Portfolio Orders
- Multi-step form for personal portfolio details: profile, contact, social links, education, experience, skills, and activities.
- Dynamic **projects** (name, tech stack, date, live URL, images), **awards** (name, competition, date, image), **certificates**, and **research** (title, role, conference, publication URL).
- Cloudinary-powered image uploads.
- Unique order code generated per submission.

### Business Website Orders
- Comprehensive form capturing business name, owner info, business type, product categories, website features, preferred domain, design style, social links, logo upload, and business images.
- Order status tracking via unique order code.

### Admin Dashboard (`/admin`)
- **Auth-protected** via NextAuth v5 (beta) with credential login.
- Manage **Hero content**, **Projects**, **Services**, **Blog posts**, **Testimonials**, **Technologies**, and **Site Settings**.
- **Messages** inbox for contact form submissions.
- **Orders** — dedicated views for student orders (with full detail + link/profile download) and business orders, including status updates (pending / delivered).
- Clean, shadcn-style UI built with Radix UI primitives and Tailwind CSS v4.

### Infrastructure
- Prisma 7 with Neon serverless PostgreSQL.
- Cloudinary integration for media management.
- Server-side rendering with the App Router.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript |
| Styling | Tailwind CSS v4 |
| Components | Radix UI, shadcn-style primitives |
| Animation | Framer Motion |
| State | Zustand |
| Database | PostgreSQL (Neon) |
| ORM | Prisma 7 |
| Auth | NextAuth v5 (beta) |
| Media | Cloudinary |
| Icons | lucide-react |
| Theming | next-themes |

> **Note on Next.js 16:** This project targets Next.js 16, which introduces breaking changes. `params`/`searchParams` are Promises, `next lint` is replaced by `eslint`, and there is no `middleware.ts` (use `proxy.ts`). Refer to the bundled docs in `node_modules/next/dist/docs/` before writing Next.js-specific code.

---

## Project Structure

```text
.
├── prisma/
│   ├── schema.prisma        # Database schema
│   ├── seed.ts              # Database seed script
│   └── migrations/          # Prisma migrations
├── public/                  # Static assets
├── src/
│   ├── app/                 # App Router pages
│   │   ├── (public pages)   # about, services, pricing, projects, blog, contact
│   │   ├── admin/           # Admin login + dashboard (hero, projects, services,
│   │   │                    #   blog, testimonials, technologies, messages, orders, settings)
│   │   ├── layout.tsx       # Root layout with providers, header, footer
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/              # Primitive components (button, card, input, ...)
│   │   ├── layout/          # Header, Footer, ThemeSwitcher
│   │   ├── sections/        # Landing page sections
│   │   ├── admin/           # Admin sidebar & header
│   │   ├── StudentOrderForm.tsx
│   │   └── BusinessOrderForm.tsx
│   ├── providers/           # ThemeProvider, SessionProvider
│   ├── lib/                 # Utilities, prisma client, auth, cloudinary
│   ├── prisma/generated/    # Generated Prisma client
│   └── types/               # TypeScript types
├── .env.example             # Environment variable template
├── next.config.ts
├── prisma.config.ts
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js 20+ (Node 22 recommended)
- npm, pnpm, or yarn
- A PostgreSQL database (local or [Neon](https://neon.tech))
- A [Cloudinary](https://cloudinary.com) account (for image uploads)

### 1. Clone & Install

```bash
git clone https://github.com/RajinShahriar10/Devzfy.git
cd Devzfy
npm install
```

### 2. Configure Environment Variables

Copy the template and fill in your credentials:

```bash
cp .env.example .env
```

See [Environment Variables](#environment-variables) for a full breakdown.

### 3. Set Up the Database

```bash
npx prisma migrate dev
npm run seed
```

Or, to reset and reseed:

```bash
npx prisma db push && npm run seed
```

### 4. Generate the Prisma Client

```bash
npx prisma generate
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3999](http://localhost:3999) (or the port set in `AUTH_URL`/`NEXT_PUBLIC_APP_URL`) in your browser.

> The development server is preconfigured to run on port `3999` via the environment variables. You can override it anytime with `npm run dev -- -p 3000`.

---

## Environment Variables

Create a `.env` file from `.env.example`:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/devzfy?schema=public"

# NextAuth
AUTH_SECRET="your-secret-key-at-least-32-chars-long"
AUTH_URL="http://localhost:3999"
NEXT_PUBLIC_APP_URL="http://localhost:3999"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Optional: Neon Database
# DIRECT_URL="postgresql://user:password@ep-xxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
```

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string used by Prisma. |
| `AUTH_SECRET` | Yes | Secret used by NextAuth to sign tokens (min 32 chars). |
| `AUTH_URL` | Yes | Full URL of the app for NextAuth callbacks. |
| `NEXT_PUBLIC_APP_URL` | Yes | Public base URL used for metadata and OG images. |
| `CLOUDINARY_CLOUD_NAME` | Yes* | Cloudinary cloud name for image uploads. |
| `CLOUDINARY_API_KEY` | Yes* | Cloudinary API key. |
| `CLOUDINARY_API_SECRET` | Yes* | Cloudinary API secret. |
| `DIRECT_URL` | No | Direct connection string (recommended for Neon serverless with connection pooling). |

> *Required only when using image upload features.

---

## Database Setup

### Schema Overview

The schema lives in [`prisma/schema.prisma`](prisma/schema.prisma) and includes:

| Model | Purpose |
|-------|---------|
| `User` | Admin/authenticated users with roles. |
| `Project` | Portfolio projects with tags, demo/GitHub links, and featured flag. |
| `Service` | Priced services with feature lists and popularity flag. |
| `BlogPost` | Blog posts with slug, excerpt, content, and publish state. |
| `ContactMessage` | Contact form submissions with read tracking. |
| `SiteSetting` | Key/value site-wide settings (used in the footer). |
| `Testimonial` | Client testimonials with ratings. |
| `Technology` | Technology stack items with icons and categories. |
| `StudentOrder` | Student portfolio order with related projects, awards, certificates, and research. |
| `BusinessOrder` | Business website order with branding and requirements. |
| `HeroContent` | Editable hero section copy (badge, title, subtitle, CTAs). |
| `SEOSettings` | Site name, tagline, description, keywords, and social metadata. |

### Migrations

Run migrations with the configured CLI:

```bash
npx prisma migrate dev          # apply migrations in dev
npx prisma migrate deploy       # apply migrations in production
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server. |
| `npm run build` | Create an optimized production build. |
| `npm start` | Start the production server (after `build`). |
| `npm run lint` | Lint the codebase with ESLint. |
| `npm run seed` | Seed the database with initial data. |

---

## Admin Dashboard

The admin area is available at `/admin` and protected by NextAuth credential authentication.

1. **Log in** at `/admin/login` using a user created via the seed script.
2. Use the sidebar to manage:

| Section | Route |
|---------|-------|
| Overview (stats) | `/admin` |
| Hero Content | `/admin/hero` |
| Projects | `/admin/projects` |
| Services | `/admin/services` |
| Blog | `/admin/blog` |
| Testimonials | `/admin/testimonials` |
| Technologies | `/admin/technologies` |
| Messages | `/admin/messages` |
| Student Orders | `/admin/orders/student` |
| Business Orders | `/admin/orders/business` |
| Settings | `/admin/settings` |

Orders can be updated between `pending` and `Delivered` statuses, and student order details include links and profile download options.

---

## Order Flows

### Student Portfolio Order
- Collects personal info, social links, education, experience, skills, activities, and additional notes.
- Supports repeating **projects**, **awards**, **certificates**, and **research** entries.
- Each project includes name, tech stack, date, live URL, and images; awards include competition and image; certificates include file upload; research includes role, conference, and publication URL.
- Returns a unique **order code** used for status lookup.

### Business Website Order
- Collects business identity, contact details, business type, product categories, website features, preferred domain, design style, social links, logo upload, and business images.
- Returns a unique **order code** used for status lookup.

---

## API & Data Layer

- **Prisma Client** is generated into `src/prisma/generated` and exposed through a shared client in `src/lib`.
- **Cloudinary** utilities in `src/lib` handle signed uploads and image transformations.
- **NextAuth v5 (beta)** configuration lives in `src/lib` and provides the JWT-backed credential session used by the admin dashboard.
- All mutations are performed via **Next.js Route Handlers / Server Actions** — no direct client-side database access.

---

## Deployment

### Deploy on Vercel (recommended)

1. Push the repository to GitHub.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Add all variables from [Environment Variables](#environment-variables) in the project settings.
4. Deploy — the build command runs `next build` automatically.

### Database on Neon
1. Create a project at [neon.tech](https://neon.tech).
2. Copy the pooled connection string into `DATABASE_URL` and the direct one into `DIRECT_URL` (optional).
3. Run `npx prisma migrate deploy` from CI or locally against the production database.

### Cloudinary
1. Create a Cloudinary account and note your cloud name, API key, and API secret.
2. Allow your production domain in the Cloudinary security settings.

---

## License

This project is private and intended for the Devzfy team. See the repository owner for usage rights.

---

<div align="center">

**Built with Next.js 16, React 19, Tailwind CSS v4, and a whole lot of caffeine.**

</div>
