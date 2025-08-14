import Link from 'next/link';
import { getBlogData } from '@/lib/content';

export default function BlogPage() {
  const blogData = getBlogData();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
      <nav className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#262626]">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-medium hover:text-[#737373] transition-colors">
              Ishaan Rajiv
            </Link>
            <div className="flex gap-8">
              <Link href="/blog" className="text-[#ededed] font-medium">
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
        <h1 className="text-4xl font-bold mb-12">Blog</h1>
        
        <div className="space-y-8">
          {blogData.blog.featured_posts.map((post: any, index: number) => (
            <article key={index} className="border-b border-[#262626] pb-8 last:border-b-0">
              <h2 className="text-2xl font-semibold mb-3 hover:text-[#737373] transition-colors cursor-pointer">
                {post.title}
              </h2>
              <p className="text-[#737373] mb-4">
                {post.description}
              </p>
              <span className="text-sm text-[#525252]">
                {post.status === 'coming_soon' ? 'Coming Soon' : 'Read More →'}
              </span>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}