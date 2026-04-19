import Navigation from '@/components/Navigation';
import ContentErrorBoundary from '@/components/ContentErrorBoundary';
import { PageIntro, PostRow } from '@/components/MonochromeUI';
import { getBlogData } from '@/lib/content';

export default function BlogPage() {
  const blogData = getBlogData();
  const posts = blogData.blog.featured_posts.filter(
    (post) => post.status === 'published' || post.status === 'coming_soon',
  );

  return (
    <div className="site-shell">
      <Navigation />

      <ContentErrorBoundary>
        <main className="page-frame page-offset">
          <PageIntro title="Blog" eyebrow="Writing" />

          <section className="py-8 md:py-10">
            {posts.map((post, index) => (
              <PostRow
                key={post.slug}
                index={index}
                title={post.title}
                slug={post.slug}
                description={post.description}
                status={post.status}
                date={post.date}
                tags={post.tags}
              />
            ))}
          </section>
        </main>
      </ContentErrorBoundary>
    </div>
  );
}
