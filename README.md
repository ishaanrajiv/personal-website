# Ishaan Rajiv - Personal Website

A modern personal website built with Next.js 15, featuring a minimal black-themed design and showcasing professional experience in product analytics and data science.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Frontend**: React 19 with TypeScript 5
- **Styling**: Tailwind CSS 4 with custom black theme
- **Fonts**: Poppins & JetBrains Mono
- **Build Tool**: Turbopack (development)
- **Content**: YAML + Markdown hybrid content management
- **Blog**: Markdown with syntax highlighting and GitHub Flavored Markdown

## Features

- **Modern Design**: Minimal black theme with sticky navigation
- **Blog System**: Full markdown support with clickable posts and dynamic routing
- **Content Management**: YAML-based system for easy updates
- **Syntax Highlighting**: Code blocks with rehype-highlight
- **Responsive**: Mobile-first design with Tailwind breakpoints
- **SEO Optimized**: Dynamic metadata generation for blog posts
- **Typography**: Professional typography with Poppins and JetBrains Mono fonts

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
│   ├── blog/           # Blog pages and dynamic [slug] routing
│   │   ├── [slug]/     # Dynamic blog post pages
│   │   └── page.tsx    # Blog listing page
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
│   ├── posts/          # Markdown blog posts
│   │   └── *.md       # Individual blog post files
│   ├── site.yaml      # Site configuration and content
│   ├── cv.yaml        # CV/resume data
│   ├── blog.yaml      # Blog metadata and configuration
│   └── projects.yaml  # Projects data
├── lib/               # Utilities and content loading
├── public/            # Static assets (SVG icons)
└── types/             # TypeScript type definitions
```

## Content Management

The site uses a hybrid YAML + Markdown content management system:

### YAML Configuration Files
- `site.yaml` - Main site content (hero, about, skills, contact)
- `cv.yaml` - Professional experience and resume data
- `blog.yaml` - Blog post metadata, categories, and featured posts
- `projects.yaml` - Project portfolio data

### Blog System
The blog uses a markdown-based system located in `/content/posts/`:

#### Adding New Blog Posts
1. Create a new `.md` file in `/content/posts/`
2. Add frontmatter with required fields:
   ```yaml
   ---
   title: "Your Post Title"
   date: "YYYY-MM-DD"
   description: "Brief description of the post"
   tags: ["tag1", "tag2", "tag3"]
   status: "published" # or "draft"
   ---
   ```
3. Write your content in GitHub Flavored Markdown
4. Update `/content/blog.yaml` to include the post in `featured_posts` with matching slug

#### Blog Features
- **Markdown Support**: Full GitHub Flavored Markdown with syntax highlighting
- **Dynamic Routing**: Automatic slug-based URLs (`/blog/post-slug`)
- **Syntax Highlighting**: Code blocks with rehype-highlight
- **SEO**: Automatic meta tag generation
- **Status Control**: Draft vs. published post states
- **Responsive Design**: Mobile-optimized reading experience

## License

© 2025 Ishaan Rajiv. All rights reserved.
