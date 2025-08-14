# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 personal website built with:
- React 19
- TypeScript 5
- Tailwind CSS 4
- App Router (Next.js 13+ app directory structure)

The project uses Turbopack for development builds and includes font optimization with Geist Sans and Geist Mono fonts.

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
- `/public/` - Static assets (images, icons)

TypeScript configuration includes path mapping with `@/*` alias pointing to the root directory.

## Styling

Uses Tailwind CSS 4 with:
- CSS custom properties for fonts (`--font-geist-sans`, `--font-geist-mono`)
- Dark mode support built into components
- Responsive design patterns (sm:, md: breakpoints)