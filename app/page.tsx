import Link from 'next/link';
import { getSiteConfig, getCVData } from '@/lib/content';

export default function Home() {
  const siteConfig = getSiteConfig();
  const cvData = getCVData();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
      <nav className="border-b border-[#262626]">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-medium">
              {siteConfig.site.name}
            </Link>
            <div className="flex gap-8">
              <Link href="/blog" className="text-[#737373] hover:text-[#ededed] transition-colors">
                Blog
              </Link>
              <Link href="/projects" className="text-[#737373] hover:text-[#ededed] transition-colors">
                Projects
              </Link>
              <Link href="/contact" className="text-[#737373] hover:text-[#ededed] transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Bio Section */}
        <section className="mb-16">
          <h1 className="text-5xl font-bold mb-8 leading-tight">
            {siteConfig.site.hero.title}
          </h1>
          <div className="space-y-6 text-[#737373] text-lg leading-relaxed">
            {siteConfig.site.about.paragraphs.map((paragraph: string, index: number) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* Links Section */}
        <section className="mb-16">
          <div className="flex gap-6">
            <a 
              href={siteConfig.site.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#525252] text-[#ededed] px-4 py-2 rounded hover:bg-[#262626] transition-colors"
            >
              GitHub
            </a>
            <a 
              href={siteConfig.site.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#525252] text-[#ededed] px-4 py-2 rounded hover:bg-[#262626] transition-colors"
            >
              LinkedIn
            </a>
            <a 
              href={`mailto:${siteConfig.site.contact.email}`}
              className="border border-[#525252] text-[#ededed] px-4 py-2 rounded hover:bg-[#262626] transition-colors"
            >
              Email
            </a>
          </div>
        </section>

        {/* CV Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Experience</h2>
          <div className="space-y-8">
            {/* Current Role Highlight */}
            <div className="border border-[#262626] rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Senior Principal Product Analyst</h3>
              <p className="text-[#737373] mb-1">DB Digital (Dainik Bhaskar Digital) • Jan 2024 - Present</p>
              <p className="text-[#525252] text-sm mb-4">Noida, Uttar Pradesh, India</p>
              <p className="text-[#737373]">
                Leading analytics initiatives for one of India&apos;s largest digital news platforms
              </p>
            </div>

            {/* Key Experience */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Key Experience</h3>
              <div className="grid gap-4">
                <div className="border-l border-[#525252] pl-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Hike</h4>
                    <span className="text-sm text-[#525252]">Aug 2018 - Nov 2019</span>
                  </div>
                  <p className="text-[#737373] text-sm">Analytics Lead for Stickers, Chat and Web. Democratizing Data @ Hike</p>
                </div>
                
                <div className="border-l border-[#525252] pl-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Bobble AI Technologies</h4>
                    <span className="text-sm text-[#525252]">Jan 2018 - Aug 2018</span>
                  </div>
                  <p className="text-[#737373] text-sm">Cost Optimization, Content Recommendation Engine, Intent-based detection system</p>
                </div>
                
                <div className="border-l border-[#525252] pl-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Flipkart</h4>
                    <span className="text-sm text-[#525252]">Jul 2015 - Aug 2016</span>
                  </div>
                  <p className="text-[#737373] text-sm">Seller Price Abuse & Fraud Identification Systems</p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Education</h3>
              <div className="border-l border-[#525252] pl-6">
                <h4 className="font-medium">Bachelor of Technology</h4>
                <p className="text-[#737373] text-sm">Indian Institute of Technology, Guwahati • 2015</p>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Skills</h3>
              <div className="space-y-2">
              <div>
                  <span className="text-[#ededed] font-medium">Focus Areas:</span>
                  <span className="text-[#737373] ml-2">{siteConfig.site.skills.focus_areas}</span>
                </div>
                <div>
                  <span className="text-[#ededed] font-medium">Analytics:</span>
                  <span className="text-[#737373] ml-2">{siteConfig.site.skills.analytics}</span>
                </div>
                <div>
                  <span className="text-[#ededed] font-medium">Development:</span>
                  <span className="text-[#737373] ml-2">{siteConfig.site.skills.development}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
