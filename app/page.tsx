import React from 'react';
import Link from 'next/link';

import Navigation from '@/components/Navigation';
import ContentErrorBoundary from '@/components/ContentErrorBoundary';
import SiteFooter from '@/components/SiteFooter';
import { Monogram } from '@/components/Brand';
import { Container, Section, externalLinkProps } from '@/components/SiteUI';
import { ArrowOutIcon, EmailIcon, GitHubIcon, LinkedInIcon } from '@/components/icons';
import { getCVData, getProjectsData, getSiteConfig } from '@/lib/content';

const FACTS = [
  { label: 'Now', body: 'Senior Principal Product Analyst at DB Digital' },
  { label: 'Building', body: 'iOS apps and AI/ML experiments' },
  { label: 'Experience', body: '10+ years in product analytics' },
];

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
            <Container className="flex flex-col items-center pt-16 text-center sm:pt-24">
              <Monogram className="h-20 w-20 drop-shadow-[0_18px_30px_rgb(35_40_56/0.22)] sm:h-24 sm:w-24" />

              <p className="label mt-10">Analytics lead · builder · writer</p>
              <h1 className="display mt-4 text-[3.25rem] sm:text-[5rem] lg:text-[6rem]">{site.name}</h1>
              {site.hero.subtitle ? <p className="lede mt-6 max-w-[36rem]">{site.hero.subtitle}</p> : null}

              <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
                <Link href="/projects" className="button-primary">
                  See my projects
                </Link>
                <Link href="/blog" className="button-quiet">
                  Read the blog
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

            <Container className="pb-20 pt-20 sm:pb-28 sm:pt-28">
              <ul className="grid gap-10 sm:grid-cols-3">
                {FACTS.map((fact) => (
                  <li key={fact.label} className="rise border-t rule pt-5">
                    <p className="label">{fact.label}</p>
                    <p className="mt-3 text-[1.0625rem] font-semibold tracking-[-0.01em]">{fact.body}</p>
                  </li>
                ))}
              </ul>
            </Container>
          </section>

          {/* Featured work, on an ink panel like the privacy section on the Lyrate site */}
          <section id="work" className="px-2 sm:px-4">
            <div className="mx-auto max-w-[80rem] rounded-[2rem] bg-ink px-6 py-20 text-on-ink sm:rounded-[2.5rem] sm:px-12 sm:py-28">
              <div className="mx-auto max-w-page">
                <div className="rise max-w-2xl">
                  <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-on-ink/55">Selected work</p>
                  <h2 className="display mt-4 text-[2.5rem] sm:text-[3.75rem]">Things I&apos;ve built.</h2>
                  <p className="mt-6 text-[1.0625rem] leading-relaxed text-on-ink/70 sm:text-lg">
                    Two iOS apps in beta, plus web tools and small games I make in my spare time.
                  </p>
                </div>

                <ul className="mt-16 grid gap-10 sm:grid-cols-2">
                  {projects.featured.map((project) => {
                    const href = project.links.website || project.links.app_store || project.links.testflight;

                    return (
                      <li key={project.name} className="rise border-t border-on-ink/15 pt-5">
                        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-on-ink/55">
                          {project.type}
                          {project.status ? ` · ${project.status}` : null}
                        </p>
                        <h3 className="mt-3 text-[1.375rem] font-bold tracking-[-0.02em]">{project.name}</h3>
                        <p className="mt-3 text-[0.9375rem] leading-relaxed text-on-ink/65">{project.description}</p>
                        {href ? (
                          <a
                            href={href}
                            {...externalLinkProps(href)}
                            className="mt-5 inline-flex items-center gap-1.5 rounded-sm text-[0.9375rem] font-semibold underline decoration-on-ink/40 underline-offset-4 transition-colors hover:decoration-on-ink focus-visible:outline-on-ink"
                          >
                            {project.links.website ? 'Visit the site' : 'Join the beta'}
                            <ArrowOutIcon className="h-4 w-4" />
                          </a>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>

                <Link
                  href="/projects"
                  className="mt-14 inline-flex h-12 items-center justify-center rounded-full bg-on-ink px-6 text-[0.9375rem] font-semibold text-ink transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-on-ink"
                >
                  All projects
                </Link>
              </div>
            </div>
          </section>

          <div className="h-20 sm:h-28" />

          <Section id="about" label="About" title="A decade in product analytics.">
            <div className="space-y-5">
              {site.about.paragraphs.map((paragraph, index) => (
                <p key={index} className="rise lede max-w-[42rem]">
                  {paragraph}
                </p>
              ))}
            </div>
          </Section>

          <Section id="experience" label="Experience" title="Where I've worked.">
            <ol className="border-t rule">
              {cv.experience.map((experience, index) => (
                <li
                  key={`${experience.company}-${experience.period}`}
                  className="rise grid gap-2 border-b rule py-6 sm:grid-cols-[minmax(0,1fr)_11rem] sm:gap-8"
                >
                  <div>
                    <h3 className="text-[1.125rem] font-semibold tracking-[-0.01em]">{experience.title}</h3>
                    <p className="mt-1 text-[0.9375rem] text-ink/60">{experience.company}</p>
                    {index === 0 ? <p className="body-copy mt-3 max-w-[36rem]">{experience.description}</p> : null}
                  </div>
                  <div className="text-[0.875rem] text-ink/45 sm:text-right">
                    <p className="tabular-nums">{experience.period}</p>
                    {index === 0 ? <p className="mt-1">{experience.location}</p> : null}
                  </div>
                </li>
              ))}
            </ol>
          </Section>

          <Section id="education" label="Education" title="Where I studied.">
            <ul className="border-t rule">
              {cv.education.map((education) => (
                <li
                  key={`${education.institution}-${education.year}`}
                  className="rise grid gap-2 border-b rule py-6 sm:grid-cols-[minmax(0,1fr)_11rem] sm:gap-8"
                >
                  <div>
                    <h3 className="text-[1.125rem] font-semibold tracking-[-0.01em]">{education.degree}</h3>
                    <p className="mt-1 text-[0.9375rem] text-ink/60">{education.institution}</p>
                  </div>
                  <p className="text-[0.875rem] text-ink/45 sm:text-right">Class of {education.year}</p>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="skills" label="Skills" title="What I work with.">
            <div className="border-t rule">
              {cv.technical_skills.map((group) => (
                <div
                  key={group.category}
                  className="rise grid gap-4 border-b rule py-6 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-8"
                >
                  <h3 className="text-[0.9375rem] font-semibold text-ink/60">{group.category}</h3>
                  <ul className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <li key={skill} className="chip">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          {/* Closing */}
          <section className="border-t rule">
            <Container className="flex flex-col items-center py-24 text-center sm:py-32">
              <Monogram className="rise h-20 w-20 drop-shadow-[0_18px_30px_rgb(35_40_56/0.22)] sm:h-24 sm:w-24" />
              <h2 className="display rise mt-10 text-[2.5rem] sm:text-[3.5rem]">Say hello.</h2>
              <p className="lede rise mt-5 max-w-[30rem]">
                I&apos;m happy to talk about analytics, iOS development, or anything you found here.
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
