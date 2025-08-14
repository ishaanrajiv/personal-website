import Link from 'next/link';
import { getBlogData, getSiteConfig } from '@/lib/content';
import Navigation from '@/components/Navigation';
import ContentErrorBoundary from '@/components/ContentErrorBoundary';

export default function BlogPage() {
  const blogData = getBlogData();
  const siteConfig = getSiteConfig();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
      <Navigation siteName={siteConfig.site.name} />

      <ContentErrorBoundary>
        <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-12">Blog</h1>
        
        <div className="space-y-8">
          {blogData.blog.featured_posts.map((post: any, index: number) => (
            <article key={index} className="border-b border-[#262626] pb-8 last:border-b-0">
              {post.status === 'published' && post.slug ? (
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-2xl font-semibold mb-3 hover:text-[#ededed] transition-colors cursor-pointer">
                    {post.title}
                  </h2>
                </Link>
              ) : (
                <h2 className="text-2xl font-semibold mb-3 text-[#525252]">
                  {post.title}
                </h2>
              )}
              
              <div className="flex items-center gap-4 mb-3 text-sm text-[#525252]">
                {post.date && (
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                )}
                
                {post.tags && post.tags.length > 0 && (
                  <>
                    {post.date && <span>•</span>}
                    <div className="flex gap-2">
                      {post.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                        <span 
                          key={tagIndex}
                          className="bg-[#262626] px-2 py-1 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
              
              <p className="text-[#737373] mb-4 leading-relaxed">
                {post.description}
              </p>
              
              {post.status === 'published' && post.slug ? (
                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-sm text-[#ededed] hover:text-[#737373] transition-colors"
                >
                  Read More
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ) : (
                <span className="text-sm text-[#525252]">
                  Coming Soon
                </span>
              )}
            </article>
          ))}
        </div>
        </main>
      </ContentErrorBoundary>
    </div>
  );
}