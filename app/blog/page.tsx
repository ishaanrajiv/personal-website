import Navigation from '@/components/Navigation';
import ContentErrorBoundary from '@/components/ContentErrorBoundary';
import SiteFooter from '@/components/SiteFooter';
import { PageHeader, PostRow } from '@/components/SiteUI';
import { getBlogData } from '@/lib/content';

export default function BlogPage() {
  const blogData = getBlogData();
  const posts = blogData.blog.featured_posts.filter(
    (post) => post.status === 'published' || post.status === 'coming_soon',
  );

  return (
    <>
      <Navigation />

      <ContentErrorBoundary>
        <main className="px-4 pb-24 pt-14 sm:px-6 sm:pb-32 sm:pt-24">
          <div className="mx-auto max-w-[48rem]">
            <PageHeader
              label="Writing"
              title="Blog"
              description="Notes on analytics, iOS development and building software with AI."
            />

            <section>
              {posts.map((post) => (
                <PostRow
                  key={post.slug}
                  title={post.title}
                  slug={post.slug}
                  description={post.description}
                  status={post.status}
                  date={post.date}
                  tags={post.tags}
                />
              ))}
            </section>
          </div>
        </main>
      </ContentErrorBoundary>

      <SiteFooter />
    </>
  );
}
