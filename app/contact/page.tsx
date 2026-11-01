import Navigation from '@/components/Navigation';
import ContentErrorBoundary from '@/components/ContentErrorBoundary';
import SiteFooter from '@/components/SiteFooter';
import { ContactRow, PageHeader } from '@/components/SiteUI';
import { EmailIcon, GitHubIcon, LinkedInIcon } from '@/components/icons';
import { getSiteConfig } from '@/lib/content';

export default function ContactPage() {
  const { site } = getSiteConfig();

  return (
    <>
      <Navigation />

      <ContentErrorBoundary>
        <main className="px-4 pb-24 pt-14 sm:px-6 sm:pb-32 sm:pt-24">
          <div className="mx-auto max-w-[48rem]">
            <PageHeader
              label="Reach out"
              title="Contact"
              description="Feel free to reach out if you'd like to connect, collaborate, or just have a conversation about analytics, development, or emerging technologies."
            />

            <ul>
              <ContactRow
                label="Email"
                value={site.contact.email}
                href={`mailto:${site.contact.email}`}
                icon={<EmailIcon className="h-5 w-5" />}
              />
              <ContactRow
                label="LinkedIn"
                value={site.contact.linkedin.replace('https://in.linkedin.com/in/', 'linkedin.com/in/')}
                href={site.contact.linkedin}
                icon={<LinkedInIcon className="h-5 w-5" />}
              />
              <ContactRow
                label="GitHub"
                value={site.contact.github.replace('https://github.com/', 'github.com/')}
                href={site.contact.github}
                icon={<GitHubIcon className="h-5 w-5" />}
              />
            </ul>
          </div>
        </main>
      </ContentErrorBoundary>

      <SiteFooter />
    </>
  );
}
