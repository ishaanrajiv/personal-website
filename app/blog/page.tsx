import Link from 'next/link';
import { getBlogData, getSiteConfig } from '@/lib/content';
import Navigation from '@/components/Navigation';
import ContentErrorBoundary from '@/components/ContentErrorBoundary';

export default function BlogPage() {
  const blogData = getBlogData();
  const siteConfig = getSiteConfig();

  return (
    <div className="min-h-screen bg-background text-primary">
      <Navigation siteName={siteConfig.site.name} />

      <ContentErrorBoundary>
        <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-12 text-primary">Blog</h1>
        
        <div className="space-y-8">
          {blogData.blog.featured_posts?.filter((post: any) => post.status === 'published').map((post: any, index: number) => (
            <article key={index} className="border-b border-border pb-8 last:border-b-0">
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-semibold mb-3 hover:text-primary transition-colors cursor-pointer text-primary">
                  {post.title}
                </h2>
              </Link>
              
              <div className="flex items-center gap-4 mb-3 text-sm text-accent">
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
                          className="bg-border px-2 py-1 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
              
              <p className="text-secondary mb-4 leading-relaxed">
                {post.description}
              </p>
              
              <Link 
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-sm text-primary hover:text-secondary transition-colors"
              >
                Read More
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </article>
          ))}
        </div>
        </main>
      </ContentErrorBoundary>
    </div>
  );
}