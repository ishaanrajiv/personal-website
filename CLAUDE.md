# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ IMPORTANT: Public Repository

This is a PUBLIC open source repository. When making any changes or suggestions:
- **NEVER** add, suggest, or reference any sensitive information (API keys, secrets, passwords, tokens)
- **NEVER** include private file paths, system information, or personal details beyond what's already public
- **AVOID** adding any configuration that could expose sensitive data
- **ALWAYS** follow security best practices for public repositories

The repository uses dual licensing:
- Code: MIT License (freely usable)
- Content: Creative Commons Attribution 4.0 (requires attribution)

## Project Overview

This is a Next.js 15 personal website built with:
- React 19
- TypeScript 5
- Tailwind CSS 4
- App Router (Next.js 13+ app directory structure)

The project uses Turbopack for development builds. Its design follows the shared design language also used by the Lyrate site (lyrate.ishaanrajiv.com): label-colour text on paper grounds, navy or cream "lit" fills, a Sky accent, the "ir" mark and Geist Medium for the wordmark.

## Development Commands

- **Start development server**: `npm run dev` (uses Turbopack for faster builds)
- **Build for production**: `npm run build`
- **Start production server**: `npm start`
- **Lint code**: `npm run lint` (ESLint with Next.js rules)

## Architecture

The project follows Next.js App Router conventions:
- `/app/` - Contains all routes, layouts, and page components
- `/app/layout.tsx` - Root layout with font loading and metadata
- `/app/page.tsx` - Home page component
- `/app/globals.css` - Global styles with Tailwind directives
- `/app/icon.svg`, `/app/apple-icon.tsx`, `/app/opengraph-image.tsx` - Favicon (switches with the system appearance), generated touch icon and share image, all showing the "ir" mark
- `/lib/mark.ts` - The mark's geometry, shared by `components/Brand.tsx` (`Mark`, `AppIcon`, `Wordmark`) and the generated images (`lib/brand-image.tsx`)
- `/components/` - Reusable React components (Navigation, SiteUI, SiteFooter, Brand, ErrorBoundary, etc.)
- `/public/` - Static assets (SVG icons)

### Content Management System

The site uses a YAML-based content management system:
- `/content/` - Contains YAML files for all site content
- `/content/site.yaml` - Site configuration, hero, about, skills, and contact info
- `/content/cv.yaml` - CV/resume data
- `/content/blog.yaml` - Blog posts and articles
- `/content/projects.yaml` - Projects and applications data (screenshots go in `images.gallery`; set `images.aspect: "landscape"` for desktop window captures, which then show unframed at a fixed width instead of as phone-height tiles)
- `/lib/content.ts` - Content loading utilities with functions like `getSiteConfig()`, `getCVData()`, `getBlogData()`, `getProjectsData()`

The content system uses js-yaml for parsing and provides typed access to structured content data.

TypeScript configuration includes path mapping with `@/*` alias pointing to the root directory.

## Styling

Uses Tailwind CSS 4 with PostCSS configuration:
- Colour tokens `paper`, `paper-raised`, `ink`, `lit`, `on-lit` and `accent` are RGB triplets in `:root` and `.dark`, exposed to Tailwind through `@theme inline` in `globals.css` (use them as `bg-paper`, `text-ink/60`, etc.)
- Each colour has one job: `ink` (black / white) is text and its washes; `lit` with `on-lit` (navy / cream) fills only the primary button, the selected nav item and the mark; `accent` (Sky) is for links, focus rings and selection. Cream and navy are never text colours
- If the mark or accent changes, update `app/icon.svg`, `lib/mark.ts`, `lib/brand-image.tsx` and the mark variables in `globals.css` together
- Light and dark themes via `next-themes`, which sets a `.dark` class on `<html>`; the default follows the system and `components/ThemeToggle.tsx` switches it
- Shared component classes in `globals.css`: `label`, `display`, `lede`, `body-copy`, `button-primary`, `button-quiet`, `text-link`, `chip`, `rule`
- `.rise` fades sections in on scroll where scroll-driven animations are supported
- Responsive design patterns (sm:, md: breakpoints)

Body text uses the system UI font stack. Geist Medium (`app/fonts/Geist-Medium.ttf`, SIL OFL) is loaded with `next/font/local` as `--font-geist` for the wordmark, the name on the home page and the share image.