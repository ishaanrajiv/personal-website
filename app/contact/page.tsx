import Navigation from '@/components/Navigation';
import ContentErrorBoundary from '@/components/ContentErrorBoundary';
import { ContactRow, PageIntro } from '@/components/MonochromeUI';
import { EmailIcon, GitHubIcon, LinkedInIcon } from '@/components/icons';
import { getSiteConfig } from '@/lib/content';

export default function ContactPage() {
  const siteConfig = getSiteConfig();

  return (
    <div className="site-shell">
      <Navigation />

      <ContentErrorBoundary>
        <main className="page-frame page-offset">
          <PageIntro title="Contact" eyebrow="Reach out" />

          <section className="max-w-4xl py-8 md:py-10">
            <p className="mb-8 text-base leading-8 text-text-dim md:mb-10 md:text-lg">
              Feel free to reach out if you&apos;d like to connect, collaborate, or just have a
              conversation about analytics, development, or emerging technologies.
            </p>

            <div>
              <ContactRow
                label="Email"
                value={siteConfig.site.contact.email}
                href={`mailto:${siteConfig.site.contact.email}`}
                actionLabel="Write"
                icon={<EmailIcon className="h-4 w-4 text-text-faint" />}
              />
              <ContactRow
                label="LinkedIn"
                value={siteConfig.site.contact.linkedin.replace('https://in.linkedin.com/in/', 'linkedin.com/in/')}
                href={siteConfig.site.contact.linkedin}
                actionLabel="Open"
                icon={<LinkedInIcon className="h-4 w-4 text-text-faint" />}
              />
              <ContactRow
                label="GitHub"
                value={siteConfig.site.contact.github.replace('https://github.com/', 'github.com/')}
                href={siteConfig.site.contact.github}
                actionLabel="View"
                icon={<GitHubIcon className="h-4 w-4 text-text-faint" />}
              />
            </div>
          </section>
        </main>
      </ContentErrorBoundary>
    </div>
  );
}
