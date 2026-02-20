import React from 'react';
import { getSiteConfig, getCVData } from '@/lib/content';
import Navigation from '@/components/Navigation';
import ContentErrorBoundary from '@/components/ContentErrorBoundary';
import {
  ASCIIName,
  TerminalWindow,
  SectionHeader,
  TerminalCard,
  SkillTag,
  TimelineEntry,
  OutputLine,
} from '@/components/TerminalUI';
import { GitHubLink, LinkedInLink, EmailLink } from '@/components/icons';

export default function Home(): React.JSX.Element {
  const siteConfig = getSiteConfig();
  const cvData = getCVData();

  return (
    <div className="min-h-screen bg-black text-text-primary">
      <Navigation />

      <ContentErrorBoundary>
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-12 md:py-16">

          {/* ════════════════════════════════════════════════════════════════
              HERO SECTION - ASCII Art + Status
              ════════════════════════════════════════════════════════════════ */}
          <section className="mb-10 sm:mb-16 md:mb-20">
            {/* ASCII Name */}
            <div className="mb-4 sm:mb-6 overflow-x-auto -mx-2 px-2">
              <ASCIIName className="animate-fade-in-up" />
            </div>

            {/* Subtitle */}
            <div className="space-y-3 sm:space-y-4 font-mono animate-fade-in-up animation-delay-200">
              <div className="text-xs sm:text-sm">
                <span className="text-syntax-comment">{'// '}</span>
                <span className="text-text-secondary">
                  {siteConfig.site.hero.subtitle}
                </span>
              </div>

              {/* Status Output - More compact on mobile */}
              <div className="space-y-1.5 sm:space-y-2">
                <OutputLine prefix="→" prefixColor="cyan">
                  Senior Principal Product Analyst @ DB Digital
                </OutputLine>
                <OutputLine prefix="→" prefixColor="amber">
                  Building iOS apps & exploring AI/ML
                </OutputLine>
                <OutputLine prefix="→" prefixColor="magenta">
                  10+ years in product analytics
                </OutputLine>
              </div>
            </div>

            {/* Links Section */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mt-6 sm:mt-8 animate-fade-in-up animation-delay-400">
              <GitHubLink href={siteConfig.site.contact.github} />
              <LinkedInLink href={siteConfig.site.contact.linkedin} />
              <EmailLink email={siteConfig.site.contact.email} />
            </div>
          </section>

          {/* ════════════════════════════════════════════════════════════════
              ABOUT SECTION - Terminal Window Style
              ════════════════════════════════════════════════════════════════ */}
          <section className="mb-10 sm:mb-16 md:mb-20 animate-fade-in-up animation-delay-500">
            <SectionHeader title="about.md" comment="whoami" />

            <TerminalWindow title="cat about.md">
              <div className="space-y-3 sm:space-y-4 text-text-secondary text-sm sm:text-base leading-relaxed">
                {siteConfig.site.about.paragraphs.map((paragraph: string, index: number) => (
                  <p key={index} className="flex">
                    <span className="text-text-muted mr-3 sm:mr-4 select-none font-mono text-xs sm:text-sm shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span>{paragraph}</span>
                  </p>
                ))}
              </div>
            </TerminalWindow>
          </section>

          {/* ════════════════════════════════════════════════════════════════
              EXPERIENCE SECTION - Timeline
              ════════════════════════════════════════════════════════════════ */}
          <section className="mb-10 sm:mb-16 md:mb-20 animate-fade-in-up animation-delay-600">
            <SectionHeader title="experience" comment="git log --oneline" />

            <div className="ml-1 sm:ml-2">
              {cvData.cv.experience.map((exp, index) => (
                <TimelineEntry
                  key={index}
                  date={exp.period}
                  title={exp.title}
                  subtitle={exp.company}
                  description={exp.description}
                  isActive={index === 0}
                />
              ))}
            </div>
          </section>

          {/* ════════════════════════════════════════════════════════════════
              EDUCATION SECTION
              ════════════════════════════════════════════════════════════════ */}
          <section className="mb-10 sm:mb-16 md:mb-20">
            <SectionHeader title="education" comment="credentials --verify" />

            <TerminalCard>
              <div className="font-mono">
                <div className="flex items-start gap-3 sm:gap-4">
                  <span className="text-accent text-lg sm:text-xl">🎓</span>
                  <div>
                    {cvData.cv.education.map((edu, index) => (
                      <div key={index}>
                        <h4 className="text-text-primary text-sm sm:text-base font-semibold">
                          {edu.degree}
                        </h4>
                        <p className="text-syntax-cyan text-sm">{edu.institution}</p>
                        <p className="text-amber text-xs sm:text-sm mt-1">
                          Class of {edu.year}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TerminalCard>
          </section>

          {/* ════════════════════════════════════════════════════════════════
              SKILLS SECTION - Code Block Style
              ════════════════════════════════════════════════════════════════ */}
          <section className="mb-10 sm:mb-16 md:mb-20">
            <SectionHeader title="skills.json" comment="npm list --depth=0" />

            <TerminalWindow title="skills.json">
              <div className="font-mono text-xs sm:text-sm md:text-base">
                <div className="text-text-muted">{'{'}</div>

                {cvData.cv.technical_skills.map((skillCategory, index) => (
                  <div key={index} className="ml-3 sm:ml-4 my-3 sm:my-4">
                    <span className="text-syntax-cyan">&quot;{skillCategory.category}&quot;</span>
                    <span className="text-text-muted">: [</span>
                    <div className="ml-3 sm:ml-4 flex flex-wrap gap-1.5 sm:gap-2 my-2">
                      {skillCategory.skills.map((skill, skillIndex) => (
                        <SkillTag key={skillIndex} skill={skill} />
                      ))}
                    </div>
                    <span className="text-text-muted">
                      ]{index < cvData.cv.technical_skills.length - 1 ? ',' : ''}
                    </span>
                  </div>
                ))}

                <div className="text-text-muted">{'}'}</div>
              </div>
            </TerminalWindow>
          </section>

          {/* ════════════════════════════════════════════════════════════════
              FOOTER - Terminal Session End
              ════════════════════════════════════════════════════════════════ */}
          <footer className="border-t border-border pt-6 sm:pt-8 mt-10 sm:mt-16">
            <div className="font-mono text-xs sm:text-sm text-text-muted space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-accent">$</span>
                <span>echo &quot;Thanks for visiting!&quot;</span>
              </div>
              <div className="text-text-secondary pl-4">Thanks for visiting!</div>

              <div className="flex items-center gap-2 mt-3 sm:mt-4">
                <span className="text-accent">$</span>
                <span className="text-text-muted">exit</span>
              </div>

              <div className="mt-4 sm:mt-6 pt-4 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                <p className="text-text-muted text-xs">
                  <span className="text-syntax-comment">{'// '}</span>
                  Built with Next.js, TypeScript &amp; coffee
                </p>
                <p className="text-text-muted text-xs">
                  <span className="text-amber">©</span> {new Date().getFullYear()} {siteConfig.site.name}
                </p>
              </div>
            </div>
          </footer>

        </main>
      </ContentErrorBoundary>
    </div>
  );
}
