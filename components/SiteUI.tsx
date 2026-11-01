import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { ArrowOutIcon } from '@/components/icons';
import type { Project } from '@/lib/content';

interface PageHeaderProps {
  title: string;
  label?: string;
  description?: string;
}

interface SectionProps {
  label: string;
  title: string;
  children: React.ReactNode;
  id?: string;
}

interface ProjectRowProps {
  project: Project;
}

interface PostRowProps {
  title: string;
  slug: string;
  description: string;
  status: string;
  date?: string;
  tags?: string[];
}

interface ContactRowProps {
  label: string;
  value: string;
  href: string;
  icon?: React.ReactNode;
}

export function formatDate(date?: string): string | null {
  if (!date) {
    return null;
  }

  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function externalLinkProps(href: string) {
  return href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {};
}

function getProjectLinks(project: Project): Array<{ label: string; href: string }> {
  const entries = [
    { label: 'GitHub', href: project.links.github || '' },
    { label: 'TestFlight', href: project.links.testflight || '' },
    { label: 'App Store', href: project.links.app_store || '' },
    { label: 'Demo', href: project.links.demo || '' },
    { label: 'Website', href: project.links.website || '' },
  ];

  return entries.filter((entry) => entry.href.trim().length > 0);
}

/** Page width container used by every section. */
export function Container({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={`mx-auto max-w-page px-4 sm:px-6 ${className}`}>{children}</div>;
}

/** Label, display title and lede at the top of an inner page. */
export function PageHeader({ title, label, description }: PageHeaderProps): React.JSX.Element {
  return (
    <header className="border-b rule pb-10 sm:pb-12">
      {label ? <p className="label">{label}</p> : null}
      <h1 className="display mt-4 text-[2.75rem] sm:text-[4rem]">{title}</h1>
      {description ? <p className="lede mt-6 max-w-2xl">{description}</p> : null}
    </header>
  );
}

/** A section with its label and title in a left column and content on the right. */
export function Section({ label, title, children, id }: SectionProps): React.JSX.Element {
  return (
    <section id={id} className="border-t rule">
      <Container className="grid grid-cols-[minmax(0,1fr)] gap-10 py-20 sm:py-28 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-20">
        <div className="rise">
          <p className="label">{label}</p>
          <h2 className="display mt-4 text-[2.25rem] sm:text-[2.75rem]">{title}</h2>
        </div>
        <div>{children}</div>
      </Container>
    </section>
  );
}

export function ProjectRow({ project }: ProjectRowProps): React.JSX.Element {
  const links = getProjectLinks(project);
  const status = project.status ? project.status.replaceAll('_', ' ') : null;
  const images = project.images?.hero
    ? [project.images.hero, ...(project.images.gallery || [])]
    : project.images?.gallery || [];
  const landscape = project.images?.aspect === 'landscape';

  return (
    <article className="rise border-b rule py-10 first:pt-0 sm:py-12 sm:first:pt-0">
      <p className="label">
        {project.type}
        {status ? ` · ${status}` : null}
      </p>
      <h3 className="mt-3 text-[1.625rem] font-bold leading-tight tracking-[-0.025em] sm:text-[1.875rem]">
        {project.name}
      </h3>
      <p className="lede mt-4 max-w-[44rem]">{project.description}</p>

      {project.features && project.features.length > 0 ? (
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Key features">
          {project.features.map((feature) => (
            <li key={feature} className="chip">
              {feature}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        {links.map((link) => (
          <a key={link.label} href={link.href} {...externalLinkProps(link.href)} className="text-link text-[0.9375rem]">
            {link.label}
            <ArrowOutIcon className="h-4 w-4" />
          </a>
        ))}
        {project.technologies.length > 0 ? (
          <p className="text-[0.8125rem] text-ink/45">{project.technologies.join(' · ')}</p>
        ) : null}
      </div>

      {images.length > 0 ? (
        <div className={`shot-strip mt-8 ${landscape ? 'shot-strip--landscape' : ''}`}>
          {images.map((image, imageIndex) => (
            <div key={`${project.name}-${imageIndex}`} className="shot-strip__item">
              <Image
                src={image}
                alt={`${project.name} screenshot ${imageIndex + 1}`}
                width={landscape ? 1624 : 660}
                height={landscape ? 971 : 1434}
                sizes={landscape ? '(min-width: 768px) 44rem, 85vw' : '(min-width: 768px) 12rem, 30vw'}
                className="shot-strip__image"
              />
            </div>
          ))}
        </div>
      ) : null}
    </article>
  );
}

export function PostRow({ title, slug, description, status, date, tags = [] }: PostRowProps): React.JSX.Element {
  const formattedDate = formatDate(date);
  const isPublished = status === 'published';
  const meta = [formattedDate, tags.join(' · ')].filter(Boolean).join('  ·  ');

  return (
    <article className="rise border-b rule py-8 sm:py-10">
      <div className="flex flex-wrap items-center gap-3">
        {meta ? <p className="text-[0.8125rem] text-ink/45">{meta}</p> : null}
        {!isPublished ? <span className="chip">Coming soon</span> : null}
      </div>

      <h2 className="mt-3 text-[1.5rem] font-bold leading-snug tracking-[-0.025em] sm:text-[1.75rem]">
        {isPublished ? (
          <Link href={`/blog/${slug}`} className="rounded-sm transition-colors hover:text-ink/70">
            {title}
          </Link>
        ) : (
          <span className="text-ink/70">{title}</span>
        )}
      </h2>

      <p className="body-copy mt-3 max-w-[40rem] text-[1rem]">{description}</p>

      {isPublished ? (
        <Link href={`/blog/${slug}`} className="text-link mt-5 text-[0.9375rem]">
          Read the post
        </Link>
      ) : null}
    </article>
  );
}

export function ContactRow({ label, value, href, icon }: ContactRowProps): React.JSX.Element {
  return (
    <li className="flex flex-col gap-2 border-b rule py-6 sm:flex-row sm:items-center sm:gap-8">
      <div className="flex w-36 shrink-0 items-center gap-3 text-ink/60">
        {icon}
        <span className="text-[0.9375rem] font-semibold">{label}</span>
      </div>
      <a href={href} {...externalLinkProps(href)} className="text-link break-all text-[1.0625rem]">
        {value}
      </a>
    </li>
  );
}
