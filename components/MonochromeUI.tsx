import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { ArrowOutIcon } from '@/components/icons';
import type { Project } from '@/lib/content';

interface PageIntroProps {
  title: string;
  eyebrow?: string;
  description?: string;
}

interface SectionBandProps {
  index: string;
  title: string;
  children: React.ReactNode;
  id?: string;
}

interface MetaListProps {
  items: Array<{ label: string; value: React.ReactNode }>;
}

interface ProjectRowProps {
  project: Project;
  index: number;
}

interface PostRowProps {
  index: number;
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
  actionLabel: string;
  icon?: React.ReactNode;
}

function formatDate(date?: string): string | null {
  if (!date) {
    return null;
  }

  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
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

export function PageIntro({ title, eyebrow, description }: PageIntroProps): React.JSX.Element {
  return (
    <header className="space-y-5 border-b border-line pb-10 md:space-y-6 md:pb-12">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <div className="max-w-4xl space-y-4">
        <h1 className="page-title">{title}</h1>
        {description ? <p className="lede">{description}</p> : null}
      </div>
    </header>
  );
}

export function SectionBand({ index, title, children, id }: SectionBandProps): React.JSX.Element {
  return (
    <section id={id} className="section-rule py-10 md:py-14">
      <div className="grid gap-8 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-12">
        <div className="space-y-2">
          <p className="eyebrow">{index}</p>
          <h2 className="text-2xl font-semibold tracking-[-0.04em] text-text md:text-3xl">{title}</h2>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

export function MetaList({ items }: MetaListProps): React.JSX.Element {
  return (
    <dl className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="border-t border-line pt-4">
          <dt className="meta-text">{item.label}</dt>
          <dd className="mt-2 text-sm text-text-dim sm:text-base">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ProjectRow({ project, index }: ProjectRowProps): React.JSX.Element {
  const links = getProjectLinks(project);
  const status = project.status ? project.status.replaceAll('_', ' ') : null;
  const images = project.images?.hero
    ? [project.images.hero, ...(project.images.gallery || [])]
    : project.images?.gallery || [];

  return (
    <article className="list-row gap-8 py-8 md:gap-10 md:py-10">
      <div className="grid gap-8 xl:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] xl:gap-12">
        <div className="space-y-5">
          <p className="eyebrow">{String(index + 1).padStart(2, '0')}</p>
          <div className="space-y-3">
            <h3 className="text-3xl font-semibold tracking-[-0.05em] text-text md:text-4xl">
              {project.name}
            </h3>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm uppercase tracking-[0.16em] text-text-faint">
              <span>{project.type}</span>
              {status ? <span>{status}</span> : null}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <p className="max-w-3xl text-base leading-8 text-text-dim md:text-lg">{project.description}</p>

          {project.features && project.features.length > 0 ? (
            <div className="space-y-3">
              <p className="meta-text">Key Features</p>
              <div className="flex flex-wrap gap-2">
                {project.features.map((feature) => (
                  <span
                    key={feature}
                    className="border border-line px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-text-dim"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="space-y-3">
              <p className="meta-text">Links</p>
              <div className="flex flex-wrap gap-4">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interactive-line"
                  >
                    <span>{link.label}</span>
                    <ArrowOutIcon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="meta-text">Technology</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="border border-line px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-text-faint"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {images.length > 0 ? (
        <div className="image-strip">
          {images.map((image, imageIndex) => (
            <div key={`${project.name}-${imageIndex}`} className="group image-strip__item">
              <Image
                src={image}
                alt={`${project.name} screenshot ${imageIndex + 1}`}
                width={960}
                height={720}
                className="gallery-image transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
            </div>
          ))}
        </div>
      ) : null}
    </article>
  );
}

export function PostRow({
  index,
  title,
  slug,
  description,
  status,
  date,
  tags = [],
}: PostRowProps): React.JSX.Element {
  const formattedDate = formatDate(date);
  const isPublished = status === 'published';

  return (
    <article className="list-row py-7 md:py-8">
      <div className="grid gap-5 md:grid-cols-[5rem_minmax(0,1fr)_auto] md:items-start md:gap-8">
        <p className="eyebrow pt-1">{String(index + 1).padStart(2, '0')}</p>

        <div className="space-y-4">
          {isPublished ? (
            <Link href={`/blog/${slug}`} className="group block">
              <h2 className="text-2xl font-semibold tracking-[-0.04em] text-text transition-colors duration-300 group-hover:text-text-dim md:text-3xl">
                {title}
              </h2>
            </Link>
          ) : (
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-text md:text-3xl">{title}</h2>
          )}

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm uppercase tracking-[0.16em] text-text-faint">
            {formattedDate ? <span>{formattedDate}</span> : null}
            {tags.length > 0 ? <span>{tags.join(' / ')}</span> : null}
            {!isPublished ? <span>Coming soon</span> : null}
          </div>

          <p className="max-w-3xl text-base leading-8 text-text-dim md:text-lg">{description}</p>
        </div>

        <div className="md:pt-1">
          {isPublished ? (
            <Link href={`/blog/${slug}`} className="interactive-line">
              <span>Read</span>
              <ArrowOutIcon className="h-4 w-4" />
            </Link>
          ) : (
            <span className="meta-text">Soon</span>
          )}
        </div>
      </div>
    </article>
  );
}

export function ContactRow({ label, value, href, actionLabel, icon }: ContactRowProps): React.JSX.Element {
  return (
    <div className="list-row py-6 md:grid md:grid-cols-[10rem_minmax(0,1fr)_auto] md:items-center md:gap-8">
      <div className="flex items-center gap-3">
        {icon}
        <span className="meta-text">{label}</span>
      </div>

      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="break-all text-base text-text-dim transition-colors duration-300 hover:text-text md:text-lg"
      >
        {value}
      </a>

      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="interactive-line mt-4 md:mt-0"
      >
        <span>{actionLabel}</span>
        <ArrowOutIcon className="h-4 w-4" />
      </a>
    </div>
  );
}
