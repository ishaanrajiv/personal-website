import Image from 'next/image';
import React from 'react';

import { ArrowOutIcon } from '@/components/icons';
import { RELEASE_LABELS } from '@/lib/content';
import type { Project } from '@/lib/content';

interface PageHeaderProps {
  title: string;
  description?: string;
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
  id?: string;
  // Less space above and below, for the homepage.
  compact?: boolean;
}

interface ProjectRowProps {
  project: Project;
}

interface ContactRowProps {
  label: string;
  value: string;
  href: string;
  icon?: React.ReactNode;
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

/** Display title and lede at the top of an inner page. */
export function PageHeader({ title, description }: PageHeaderProps): React.JSX.Element {
  return (
    <header className="border-b rule pb-10 sm:pb-12">
      <h1 className="display text-[2.75rem] sm:text-[4rem]">{title}</h1>
      {description ? <p className="lede mt-6 max-w-2xl">{description}</p> : null}
    </header>
  );
}

/** A section with its title in a left column and content on the right. */
export function Section({ title, children, id, compact = false }: SectionProps): React.JSX.Element {
  return (
    <section id={id} className="border-t rule">
      <Container
        className={`grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[18rem_minmax(0,1fr)] ${
          compact ? 'py-14 sm:py-20 lg:gap-16' : 'py-20 sm:py-28 lg:gap-20'
        }`}
      >
        <h2 className="display rise text-[2.25rem] sm:text-[2.75rem]">{title}</h2>
        <div>{children}</div>
      </Container>
    </section>
  );
}

/** A project's type and stage, with its release badge beside them. */
function ProjectMeta({ project }: ProjectRowProps): React.JSX.Element {
  const status = project.status ? project.status.replaceAll('_', ' ') : null;

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <p className="label">
        {project.type}
        {status ? ` · ${status}` : null}
      </p>
      {project.release ? <span className="badge">{RELEASE_LABELS[project.release]}</span> : null}
    </div>
  );
}

/** A project as a card, for the homepage: badge, name, one line and its links. */
export function ProjectCard({ project }: ProjectRowProps): React.JSX.Element {
  const links = getProjectLinks(project);

  return (
    <li className="rise flex flex-col rounded-2xl bg-paper-raised p-5">
      <ProjectMeta project={project} />
      <h3 className="mt-3 text-[1.125rem] font-bold leading-tight tracking-[-0.02em]">{project.name}</h3>
      <p className="body-copy mt-2 grow">{project.summary}</p>
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[0.875rem]">
        {links.length > 0 ? (
          links.map((link) => (
            <a key={link.label} href={link.href} {...externalLinkProps(link.href)} className="text-link">
              {link.label}
              <ArrowOutIcon className="h-3.5 w-3.5" />
            </a>
          ))
        ) : (
          <span className="text-ink/45">Not released</span>
        )}
      </div>
    </li>
  );
}

export function ProjectRow({ project }: ProjectRowProps): React.JSX.Element {
  const links = getProjectLinks(project);
  const images = project.images?.hero
    ? [project.images.hero, ...(project.images.gallery || [])]
    : project.images?.gallery || [];
  const landscape = project.images?.aspect === 'landscape';

  return (
    <article className="rise border-b rule py-10 first:pt-0 sm:py-12 sm:first:pt-0">
      <ProjectMeta project={project} />
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

      {project.note ? <p className="body-copy mt-6 max-w-[44rem]">{project.note}</p> : null}

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
