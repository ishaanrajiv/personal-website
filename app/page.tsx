import React from 'react';

import Navigation from '@/components/Navigation';
import ContentErrorBoundary from '@/components/ContentErrorBoundary';
import HeroName from '@/components/HeroName';
import { MetaList, SectionBand } from '@/components/MonochromeUI';
import { EmailIcon, GitHubIcon, LinkedInIcon } from '@/components/icons';
import { getCVData, getSiteConfig } from '@/lib/content';

export default function Home(): React.JSX.Element {
  const siteConfig = getSiteConfig();
  const cvData = getCVData();
  const [firstName = siteConfig.site.name, lastName = ''] = siteConfig.site.name.split(' ');

  return (
    <div className="site-shell">
      <Navigation />

      <ContentErrorBoundary>
        <main className="page-frame page-offset">
          <section className="min-h-[calc(100vh-7rem)] border-b border-line pb-12 pt-6 md:pb-16 md:pt-8">
            <div className="space-y-8 md:space-y-10">
              <p className="eyebrow">Analytics lead · builder · writer</p>
              <HeroName firstName={firstName} lastName={lastName} />
            </div>

            <div className="mt-10 grid gap-8 border-t border-line pt-8 lg:grid-cols-[minmax(0,1.15fr)_18rem] lg:items-start">
              <div className="space-y-6">
                <p className="lede max-w-4xl">{siteConfig.site.hero.subtitle}</p>

                <div className="space-y-3 text-base leading-8 text-text-dim md:text-lg">
                  <p>Senior Principal Product Analyst @ DB Digital</p>
                  <p>Building iOS apps &amp; exploring AI/ML</p>
                  <p>10+ years in product analytics</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="eyebrow">Connect</p>
                <div className="flex flex-col items-start gap-3">
                  <a
                    href={siteConfig.site.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interactive-line"
                  >
                    <GitHubIcon className="h-4 w-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={siteConfig.site.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interactive-line"
                  >
                    <LinkedInIcon className="h-4 w-4" />
                    <span>LinkedIn</span>
                  </a>
                  <a href={`mailto:${siteConfig.site.contact.email}`} className="interactive-line">
                    <EmailIcon className="h-4 w-4" />
                    <span>Email</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          <SectionBand index="01" title="About" id="about">
            <div className="stack-grid">
              {siteConfig.site.about.paragraphs.map((paragraph, index) => (
                <p key={index} className="max-w-4xl text-base leading-8 text-text-dim md:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </SectionBand>

          <SectionBand index="02" title="Experience" id="experience">
            <div>
              {cvData.cv.experience.map((experience, index) => {
                const isCurrent = index === 0;

                return (
                  <article
                    key={`${experience.company}-${experience.period}`}
                    className={`list-row ${isCurrent ? 'py-6 md:py-7' : 'py-4 md:py-5'}`}
                  >
                    <div
                      className={`grid gap-4 ${
                        isCurrent
                          ? 'lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-8'
                          : 'items-start md:grid-cols-[minmax(0,1fr)_14rem] md:gap-6'
                      }`}
                    >
                      <div className={isCurrent ? 'space-y-2' : 'space-y-1.5'}>
                        <h3
                          className={`font-semibold tracking-[-0.04em] ${
                            isCurrent
                              ? 'text-2xl text-text md:text-3xl'
                              : 'text-xl text-text-dim md:text-2xl'
                          }`}
                        >
                          {experience.title}
                        </h3>
                        <p className={isCurrent ? 'text-base text-text-dim md:text-lg' : 'text-sm text-text-faint md:text-base'}>
                          {experience.company}
                        </p>
                        {isCurrent ? (
                          <p className="max-w-3xl text-base leading-8 text-text-dim">
                            {experience.description}
                          </p>
                        ) : null}
                      </div>

                      {isCurrent ? (
                        <MetaList
                          items={[
                            { label: 'Period', value: experience.period },
                            { label: 'Location', value: experience.location },
                          ]}
                        />
                      ) : (
                        <div className="border-t border-line pt-3 md:border-t-0 md:pt-0">
                          <div>
                            <p className="meta-text">Period</p>
                            <p className="mt-1 text-sm text-text-faint md:text-[0.95rem]">{experience.period}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </SectionBand>

          <SectionBand index="03" title="Education" id="education">
            <div className="space-y-6">
              {cvData.cv.education.map((education) => (
                <article key={`${education.institution}-${education.year}`} className="list-row py-6 md:py-7">
                  <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_10rem] md:gap-8">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-semibold tracking-[-0.04em] text-text md:text-3xl">
                        {education.degree}
                      </h3>
                      <p className="text-base text-text-dim md:text-lg">{education.institution}</p>
                    </div>

                    <div className="space-y-2 md:text-right">
                      <p className="meta-text">Class of</p>
                      <p className="text-base text-text-dim md:text-lg">{education.year}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </SectionBand>

          <SectionBand index="04" title="Skills" id="skills">
            <div className="space-y-6">
              {cvData.cv.technical_skills.map((skillGroup) => (
                <div key={skillGroup.category} className="list-row py-6 md:grid md:grid-cols-[11rem_minmax(0,1fr)] md:gap-8">
                  <p className="meta-text">{skillGroup.category}</p>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.skills.map((skill) => (
                      <span
                        key={skill}
                        className="border border-line px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-text-dim"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SectionBand>

          <footer className="section-rule py-10 md:py-14">
            <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
              <div className="space-y-3">
                <p className="eyebrow">Thanks for visiting</p>
                <p className="max-w-2xl text-base leading-8 text-text-dim md:text-lg">
                  Built with Next.js, TypeScript &amp; coffee.
                </p>
              </div>

              <div className="space-y-2 md:text-right">
                <p className="meta-text">Copyright</p>
                <p className="text-sm text-text-faint">
                  © {new Date().getFullYear()} {siteConfig.site.name}
                </p>
              </div>
            </div>
          </footer>
        </main>
      </ContentErrorBoundary>
    </div>
  );
}
