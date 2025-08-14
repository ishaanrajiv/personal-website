import Link from 'next/link';
import { getAppsData } from '@/lib/content';

export default function ProjectsPage() {
  const appsData = getAppsData();

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
              <Link href="/projects" className="text-[#ededed] font-medium">
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
        <h1 className="text-4xl font-bold mb-12">Projects</h1>
        
        <div className="space-y-12">
          {appsData.apps.ios_apps.map((app: any, index: number) => (
            <div key={index} className="border border-[#262626] rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">{app.name}</h2>
              <p className="text-[#737373] mb-6 leading-relaxed">
                {app.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#525252] bg-[#262626] px-3 py-1 rounded">
                  {app.status === 'beta' ? 'Beta Testing' : app.status}
                </span>
                <button className="border border-[#525252] text-[#ededed] px-4 py-2 rounded hover:bg-[#262626] transition-colors">
                  {app.status === 'beta' ? 'Join Beta' : 'Learn More'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}