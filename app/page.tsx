import React from 'react';
import { getSiteConfig, getCVData } from '@/lib/content';
import Navigation from '@/components/Navigation';
import ContentErrorBoundary from '@/components/ContentErrorBoundary';
import { GitHubLink, LinkedInLink, EmailLink } from '@/components/icons';

export default function Home(): React.JSX.Element {
  const siteConfig = getSiteConfig();
  const cvData = getCVData();

  return (
    <div className="min-h-screen bg-background text-primary">
      <Navigation siteName={siteConfig.site.name} />

      <ContentErrorBoundary>
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        {/* Bio Section */}
        <section className="mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 leading-tight">
            {siteConfig.site.hero.title}
          </h1>
          <div className="space-y-6 text-secondary text-lg leading-relaxed">
            {siteConfig.site.about.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* Links Section */}
        <section className="mb-16">
          <div className="flex gap-4">
            <GitHubLink href={siteConfig.site.contact.github} />
            <LinkedInLink href={siteConfig.site.contact.linkedin} />
            <EmailLink email={siteConfig.site.contact.email} />
          </div>
        </section>

        {/* CV Section */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Experience</h2>
          <div className="space-y-8">
            {/* Current Role Highlight */}
            <h3 className="text-lg sm:text-xl font-semibold">Current Role</h3>
            {cvData.cv.experience.length > 0 && (
              <div className="border border-border rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-2">{cvData.cv.experience[0].title}</h3>
                <p className="text-secondary mb-1">{cvData.cv.experience[0].company} • {cvData.cv.experience[0].period}</p>
                <p className="text-accent text-sm mb-4">{cvData.cv.experience[0].location}</p>
                <p className="text-secondary">
                  {cvData.cv.experience[0].description}
                </p>
              </div>
            )}

            {/* Experience History */}
            <div className="space-y-6">
              <h3 className="text-lg sm:text-xl font-semibold">Past Roles</h3>
              <div className="grid gap-4">
                {cvData.cv.experience.slice(1).map((exp, index) => (
                  <div key={index} className="border-l border-accent pl-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{exp.company}</h4>
                      <span className="text-sm text-accent">{exp.period}</span>
                    </div>
                    <p className="text-secondary text-sm">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4">Education</h3>
              {cvData.cv.education.map((edu, index) => (
                <div key={index} className="border-l border-accent pl-6">
                  <h4 className="font-medium">{edu.degree}</h4>
                  <p className="text-secondary text-sm">{edu.institution} • {edu.year}</p>
                </div>
              ))}
            </div>

            {/* Technical Skills */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4">Technical Skills</h3>
              <div className="space-y-3">
                {cvData.cv.technical_skills.map((skillCategory, index) => (
                  <div key={index} className="border-l border-accent pl-6">
                    <h4 className="font-medium text-primary mb-2">{skillCategory.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skillCategory.skills.map((skill, skillIndex) => (
                        <span 
                          key={skillIndex}
                          className="text-secondary text-sm bg-border px-2 py-1 rounded-xl"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        </main>
      </ContentErrorBoundary>
    </div>
  );
}
