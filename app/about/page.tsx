import React from 'react';
import type { Metadata } from 'next';

import Navigation from '@/components/Navigation';
import ContentErrorBoundary from '@/components/ContentErrorBoundary';
import SiteFooter from '@/components/SiteFooter';
import { Container, PageHeader, Section } from '@/components/SiteUI';
import { getCVData, getSiteConfig } from '@/lib/content';

export const metadata: Metadata = {
  title: 'About - Ishaan Rajiv',
  description: 'Ishaan Rajiv: a decade in product analytics at DB Digital, Hike, Roposo and Flipkart, and the software built outside work.',
};

export default function AboutPage(): React.JSX.Element {
  const { site } = getSiteConfig();
  const { cv } = getCVData();

  return (
    <>
      <Navigation />

      <ContentErrorBoundary>
        <main>
          <Container className="pb-16 pt-14 sm:pb-20 sm:pt-24">
            <PageHeader title="About" />
            <div className="mt-10 space-y-5 sm:mt-12">
              {site.about.paragraphs.map((paragraph, index) => (
                <p key={index} className="lede max-w-[42rem]">
                  {paragraph}
                </p>
              ))}
            </div>
          </Container>

          <Section id="experience" title="Experience">
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

          <Section id="education" title="Education">
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

          <Section id="skills" title="Skills">
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
        </main>
      </ContentErrorBoundary>

      <SiteFooter />
    </>
  );
}
