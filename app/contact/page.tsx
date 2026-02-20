import { getSiteConfig } from '@/lib/content';
import Navigation from '@/components/Navigation';
import ContentErrorBoundary from '@/components/ContentErrorBoundary';
import { EmailIcon, LinkedInIcon, GitHubIcon } from '@/components/icons';

export default function ContactPage() {
  const siteConfig = getSiteConfig();

  return (
    <div className="min-h-screen bg-black text-text-primary">
      <Navigation />

      <ContentErrorBoundary>
        <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-12 text-primary">Contact</h1>
        
        <div className="space-y-8">
          <p className="text-secondary text-lg leading-relaxed">
            Feel free to reach out if you&apos;d like to connect, collaborate, or just have a conversation about analytics, development, or emerging technologies.
          </p>
          
          <div className="space-y-6">
            <div className="border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <EmailIcon className="w-6 h-6" />
                <h2 className="text-xl font-semibold text-primary">Email</h2>
              </div>
              <a 
                href={`mailto:${siteConfig.site.contact.email}`}
                className="text-secondary hover:text-primary transition-colors"
              >
                {siteConfig.site.contact.email}
              </a>
            </div>
            
            <div className="border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <LinkedInIcon className="w-6 h-6" />
                <h2 className="text-xl font-semibold text-primary">LinkedIn</h2>
              </div>
              <a 
                href={siteConfig.site.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-primary transition-colors"
              >
                {siteConfig.site.contact.linkedin.replace('https://in.linkedin.com/in/', 'linkedin.com/in/')}
              </a>
            </div>
            
            <div className="border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <GitHubIcon className="w-6 h-6" />
                <h2 className="text-xl font-semibold text-primary">GitHub</h2>
              </div>
              <a 
                href={siteConfig.site.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-primary transition-colors"
              >
                {siteConfig.site.contact.github.replace('https://github.com/', 'github.com/')}
              </a>
            </div>
          </div>
        </div>
        </main>
      </ContentErrorBoundary>
    </div>
  );
}