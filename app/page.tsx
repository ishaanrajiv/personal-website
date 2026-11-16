import React from 'react';
import Link from 'next/link';

import Navigation from '@/components/Navigation';
import ContentErrorBoundary from '@/components/ContentErrorBoundary';
import SiteFooter from '@/components/SiteFooter';
import { AppIcon } from '@/components/Brand';
import { Container, ProjectCard, Section, externalLinkProps } from '@/components/SiteUI';
import { EmailIcon, GitHubIcon, LinkedInIcon } from '@/components/icons';
import { getCVData, getProjectsData, getSiteConfig } from '@/lib/content';

export default function Home(): React.JSX.Element {
  const { site } = getSiteConfig();
  const { cv } = getCVData();
  const { projects } = getProjectsData();

  const socials = [
    { label: 'GitHub', href: site.contact.github, icon: GitHubIcon },
    { label: 'LinkedIn', href: site.contact.linkedin, icon: LinkedInIcon },
    { label: 'Email', href: `mailto:${site.contact.email}`, icon: EmailIcon },
  ];

  return (
    <>
      <Navigation />

      <ContentErrorBoundary>
        <main>
          {/* Hero */}
          <section id="top">
            <Container className="flex flex-col items-center pb-16 pt-14 text-center sm:pb-20 sm:pt-20">
              <AppIcon className="h-20 w-20 sm:h-24 sm:w-24" />

              <p className="label mt-10">Analytics lead · builder</p>
              {/* The name is the wordmark, so it is set in Geist Medium like the one in the nav. */}
              <h1 className="mt-4 font-wordmark text-[3.25rem] font-medium leading-[1.02] tracking-[-0.025em] sm:text-[5rem] lg:text-[6rem]">
                {site.name}
              </h1>
              {site.hero.subtitle ? <p className="lede mt-6 max-w-[36rem]">{site.hero.subtitle}</p> : null}

              <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
                <Link href="/projects" className="button-primary">
                  See my projects
                </Link>
                <Link href="/about" className="button-quiet">
                  About me
                </Link>
              </div>

              <ul className="mt-6 flex items-center gap-5 text-[0.875rem] text-ink/50">
                {socials.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...externalLinkProps(href)}
                      className="flex items-center gap-1.5 rounded-sm transition-colors hover:text-ink"
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </Container>

          </section>

          <Section id="about" title="About" compact>
            <div className="space-y-4">
              {site.about.short.map((paragraph, index) => (
                <p key={index} className="rise lede max-w-[42rem]">
                  {paragraph}
                </p>
              ))}
            </div>

            <ol className="mt-8 border-t rule">
              {cv.experience.map((experience) => (
                <li
                  key={`${experience.company}-${experience.period}`}
                  className="rise grid gap-x-8 gap-y-0.5 border-b rule py-3 text-[0.9375rem] sm:grid-cols-[9rem_minmax(0,1fr)_10rem]"
                >
                  <span className="font-semibold">{experience.company.replace(/ \(.*\)$/, '')}</span>
                  <span className="text-ink/60">{experience.title}</span>
                  <span className="tabular-nums text-ink/45 sm:text-right">{experience.period}</span>
                </li>
              ))}
            </ol>

            <Link href="/about" className="text-link mt-6 text-[0.9375rem]">
              More about me
            </Link>
          </Section>

          <Section id="projects" title="Projects" compact>
            <ul className="grid gap-4 sm:grid-cols-2">
              {[...projects.featured, ...projects.open_source.filter((project) => project.home), ...projects.wip].map((project) => (
                <ProjectCard key={project.name} project={project} />
              ))}
              <li className="rise flex">
                <Link
                  href="/projects"
                  className="flex grow flex-col justify-between rounded-2xl border rule p-5 transition-colors hover:bg-ink/[0.04]"
                >
                  <span className="label">And more</span>
                  <span>
                    <span className="mt-3 block text-[1.125rem] font-bold leading-tight tracking-[-0.02em]">All projects</span>
                    <span className="body-copy mt-2 block">
                      Screenshots and details for these, plus more libraries, tools and small web things.
                    </span>
                  </span>
                </Link>
              </li>
            </ul>
          </Section>

          {/* Closing */}
          <section className="border-t rule">
            <Container className="flex flex-col items-center py-16 text-center sm:py-24">
              <AppIcon className="rise h-20 w-20 sm:h-24 sm:w-24" />
              <h2 className="display rise mt-10 text-[2.5rem] sm:text-[3.5rem]">Say hello.</h2>
              <p className="lede rise mt-5 max-w-[30rem]">
                I&apos;m happy to talk about analytics, the apps, or anything you found here.
              </p>
              <div className="rise mt-9 flex flex-col items-center gap-3 sm:flex-row">
                <a href={`mailto:${site.contact.email}`} className="button-primary">
                  Send an email
                </a>
                <Link href="/contact" className="button-quiet">
                  Other ways to reach me
                </Link>
              </div>
            </Container>
          </section>
        </main>
      </ContentErrorBoundary>

      <SiteFooter />
    </>
  );
}
