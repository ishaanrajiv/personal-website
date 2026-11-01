import Link from 'next/link';

import { Monogram, Wordmark } from '@/components/Brand';
import { NAV_ITEMS } from '@/components/site';
import { getSiteConfig } from '@/lib/content';

export default function SiteFooter() {
  const { site } = getSiteConfig();

  return (
    <footer className="border-t rule">
      <div className="mx-auto flex max-w-page flex-col gap-6 px-4 py-8 text-sm text-ink/60 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="flex items-center gap-2.5 text-ink" aria-label="Ishaan Rajiv, home">
          <Monogram className="h-6 w-6" />
          <Wordmark className="text-lg leading-none" />
        </Link>

        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {NAV_ITEMS.map((item) => (
            <li key={item.path}>
              <Link href={item.path} className="transition-colors hover:text-ink">
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <a href={site.contact.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
              GitHub
            </a>
          </li>
          <li>
            <a href={site.contact.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
              LinkedIn
            </a>
          </li>
        </ul>

        <p>
          © {new Date().getFullYear()} {site.name} · Built with Next.js, TypeScript and coffee
        </p>
      </div>
    </footer>
  );
}
