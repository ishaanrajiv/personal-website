# Ishaan Rajiv - Personal Website

A modern personal website built with Next.js 15, styled in the same design language as the [Lyrate](https://lyrate.ishaanrajiv.com) site, and showcasing professional experience in product analytics and data science.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Frontend**: React 19 with TypeScript 5
- **Styling**: Tailwind CSS 4 with paper, ink, lit and accent colour tokens, light and dark themes via next-themes
- **Package Manager**: Bun
- **Fonts**: System UI for text, Geist Medium for the wordmark
- **Build Tool**: Turbopack (development)
- **Content**: YAML content management

## Features

- **Design**: A shared design language (label-colour text, a Sky accent, the "ir" mark), with a theme toggle that follows the system by default
- **Projects**: Every project carries a release badge: open source, App Store, TestFlight beta or WIP
- **Content Management**: YAML-based system for easy updates
- **Responsive**: Mobile-first design with Tailwind breakpoints

## Development

This project uses Bun for dependency management and local scripts.

```bash
# Install dependencies
bun install

# Start development server (with Turbopack)
bun run dev

# Build for production
bun run build

# Start production server
bun run start

# Lint code
bun run lint

# Type-check the project
bun run typecheck
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── app/                 # Next.js App Router pages and layouts
│   ├── about/          # About page: background, experience, education, skills
│   ├── contact/        # Contact page
│   ├── projects/       # Projects showcase
│   ├── globals.css     # Global styles and Tailwind directives
│   ├── icon.svg        # Site icon
│   ├── layout.tsx      # Root layout with fonts and metadata
│   └── page.tsx        # Home page
├── components/         # Reusable React components
│   ├── ContentErrorBoundary.tsx
│   ├── ErrorBoundary.tsx
│   └── Navigation.tsx
├── content/            # Content management files
│   ├── site.yaml      # Site configuration and content
│   ├── cv.yaml        # CV/resume data
│   └── projects.yaml  # Projects data
├── lib/               # Utilities and content loading
├── public/            # Static assets (SVG icons)
└── types/             # TypeScript type definitions
```

## Content Management

The site's content is YAML in `/content/`:

- `site.yaml` - Main site content (hero, about, contact)
- `cv.yaml` - Professional experience and resume data
- `projects.yaml` - Project portfolio data

### Projects

`projects.yaml` has four groups: `featured` (the apps), `wip` (not released yet), `open_source` (libraries and tools) and `web` (small things in a browser). A project's `release` is shown as a badge; leave it out for no badge:

| `release` | Badge | Means |
| --- | --- | --- |
| `open_source` | Open source | Source is public on GitHub |
| `app_store` | App Store | Released on the App Store |
| `testflight` | TestFlight beta | Public beta on TestFlight |
| `wip` | WIP | Still being built, not released |

`summary` is the one line the homepage shows; the homepage has a card for every `featured` and `wip` project, and for an `open_source` one that sets `home: true`. `note` is the line a project with no links shows instead. `status` is the stage (`alpha`, `beta`) where it's worth saying.

The blog is off the site for now; `/blog` addresses redirect home (`next.config.ts`).

## License

This project uses dual licensing:

- **Code** (application structure, components, configuration): [MIT License](LICENSE)
- **Content** (personal information, portfolio): [Creative Commons Attribution 4.0](LICENSE)

See the [LICENSE](LICENSE) file for full details.

**TL;DR**: You can freely use and modify the code, but please provide attribution when using the content.
