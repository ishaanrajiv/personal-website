# Ishaan Rajiv - Personal Website

A modern personal website built with Next.js 15, showcasing professional experience in product analytics and data science.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Frontend**: React 19 with TypeScript 5
- **Styling**: Tailwind CSS 4
- **Fonts**: Geist Sans & Geist Mono
- **Build Tool**: Turbopack (development)
- **Content**: YAML-based content management system

## Features

- Modern responsive design with dark mode support
- YAML-based content management for easy updates
- TypeScript for type safety
- Optimized fonts and performance
- Clean, professional layout
- Blog with Markdown support
- Project portfolio showcase

## Development

```bash
# Install dependencies
npm install

# Start development server (with Turbopack)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── app/                 # Next.js App Router pages and layouts
│   ├── blog/           # Blog pages
│   ├── contact/        # Contact page
│   ├── projects/       # Projects showcase
│   └── ...
├── content/            # YAML content files
│   ├── site.yaml      # Site configuration and content
│   ├── cv.yaml        # CV/resume data
│   ├── blog.yaml      # Blog posts
│   └── projects.yaml  # Projects data
├── lib/               # Utilities and content loading
├── public/            # Static assets
└── types/             # TypeScript type definitions
```

## Content Management

The site uses a YAML-based content management system located in the `/content/` directory. This allows for easy updates to site content without modifying code:

- `site.yaml` - Main site content (hero, about, skills, contact)
- `cv.yaml` - Professional experience and resume data
- `blog.yaml` - Blog posts and articles
- `projects.yaml` - Project portfolio

## License

© 2025 Ishaan Rajiv. All rights reserved.
