import { getSiteConfig, getBlogData, getAppsData } from '@/lib/content';

export default function Home() {
  const siteConfig = getSiteConfig();
  const blogData = getBlogData();
  const appsData = getAppsData();
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <header className="border-b border-gray-200 dark:border-gray-800">
        <nav className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{siteConfig.site.name}</h1>
            <div className="flex gap-6">
              <a href="#about" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">About</a>
              <a href="#cv" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">CV</a>
              <a href="#blog" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Blog</a>
              <a href="#apps" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Apps</a>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {siteConfig.site.hero.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              {siteConfig.site.hero.subtitle}
            </p>
            <div className="flex gap-4">
              <a href="#about" className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                Learn More
              </a>
              <a href="#blog" className="border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Read Blog
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-gray-50 dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{siteConfig.site.about.title}</h3>
                {siteConfig.site.about.paragraphs.map((paragraph: string, index: number) => (
                  <p key={index} className="text-gray-600 dark:text-gray-400 mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Skills & Interests</h4>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Analytics:</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">{siteConfig.site.skills.analytics}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Development:</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">{siteConfig.site.skills.development}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Focus Areas:</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">{siteConfig.site.skills.focus_areas}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CV Preview */}
        <section id="cv" className="max-w-6xl mx-auto px-6 py-20">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Experience & Background</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Professional Experience</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Analytics professional with experience in data analysis, visualization, and business intelligence.
              </p>
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                View Full CV →
              </a>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Technical Projects</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Currently developing iOS applications and exploring web development with modern frameworks.
              </p>
              <a href="#apps" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                View Projects →
              </a>
            </div>
          </div>
        </section>

        {/* Blog Preview */}
        <section id="blog" className="bg-gray-50 dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Latest Writing</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {blogData.blog.featured_posts.map((post: any, index: number) => (
                <article key={index} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{post.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {post.description}
                  </p>
                  <span className="text-sm text-gray-500 dark:text-gray-500">
                    {post.status === 'coming_soon' ? 'Coming Soon' : 'Read More'}
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Apps Section */}
        <section id="apps" className="max-w-6xl mx-auto px-6 py-20">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">iOS Applications</h3>
          <div className="max-w-2xl mx-auto">
            {appsData.apps.ios_apps.map((app: any, index: number) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center">
                <h4 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{app.name}</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {app.description}
                </p>
                <div className="space-y-4">
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Status: {app.status === 'beta' ? 'Beta Testing' : app.status}
                  </p>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Join Beta (TestFlight)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400">{siteConfig.site.copyright}</p>
            <div className="flex gap-6">
              <a href={`mailto:${siteConfig.site.contact.email}`} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                Email
              </a>
              <a href={siteConfig.site.contact.linkedin} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                LinkedIn
              </a>
              <a href={siteConfig.site.contact.github} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
