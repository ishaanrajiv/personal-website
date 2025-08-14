import Link from 'next/link';
import { getSiteConfig } from '@/lib/content';

export default function ContactPage() {
  const siteConfig = getSiteConfig();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
      <nav className="border-b border-[#262626]">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-medium hover:text-[#737373] transition-colors">
              Ishaan Rajiv
            </Link>
            <div className="flex gap-8">
              <Link href="/blog" className="text-[#737373] hover:text-[#ededed] transition-colors">
                Blog
              </Link>
              <Link href="/projects" className="text-[#737373] hover:text-[#ededed] transition-colors">
                Projects
              </Link>
              <Link href="/contact" className="text-[#ededed] font-medium">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-12">Contact</h1>
        
        <div className="space-y-8">
          <p className="text-[#737373] text-lg leading-relaxed">
            Feel free to reach out if you&apos;d like to connect, collaborate, or just have a conversation about analytics, development, or emerging technologies.
          </p>
          
          <div className="space-y-6">
            <div className="border border-[#262626] rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Email</h2>
              <a 
                href={`mailto:${siteConfig.site.contact.email}`}
                className="text-[#737373] hover:text-[#ededed] transition-colors"
              >
                {siteConfig.site.contact.email}
              </a>
            </div>
            
            <div className="border border-[#262626] rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">LinkedIn</h2>
              <a 
                href={siteConfig.site.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#737373] hover:text-[#ededed] transition-colors"
              >
                linkedin.com/in/yourprofile
              </a>
            </div>
            
            <div className="border border-[#262626] rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">GitHub</h2>
              <a 
                href={siteConfig.site.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#737373] hover:text-[#ededed] transition-colors"
              >
                github.com/yourusername
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}