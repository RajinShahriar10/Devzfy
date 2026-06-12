<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Devzfy Project

## Tech Stack
- Next.js 16 (App Router) - note: params/searchParams are Promises
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Prisma 7 (Neon)
- NextAuth v5 (beta)
- Cloudinary

## Project Structure
- `src/app/` - App Router pages
- `src/components/` - UI components
- `src/lib/` - Utilities and libraries
- `src/providers/` - React context providers
- `src/types/` - TypeScript types
- `prisma/` - Database schema
- `public/` - Static assets

## Getting Started
1. Copy `.env.example` to `.env` and fill in your credentials
2. `npm install`
3. `npx prisma generate`
4. `npm run dev`

## Build Commands
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm start` - Start production server

## Key Next.js 16 Notes
- Use `params: Promise<...>` in page/layout props
- No `middleware.ts` - use `proxy.ts` instead
- `revalidateTag(tag, 'max')` requires second argument
- `next/image` `priority` prop is deprecated, use `preload`
- `next lint` is removed - use `eslint` directly
