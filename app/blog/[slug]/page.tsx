import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import { getSiteConfig } from '@/lib/content';
import ContentErrorBoundary from '@/components/ContentErrorBoundary';

interface BlogPostProps {
  params: Promise<{
    slug: string;
  }>;
}

interface PostData {
  title: string;
  date: string;
  description: string;
  tags: string[];
  status: string;
  content: string;
  galleries: { [key: string]: string[] };
}

function processGalleryContent(content: string): { content: string; galleries: { [key: string]: string[] } } {
  let galleries: { [key: string]: string[] } = {};
  let galleryId = 0;
  
  // Replace gallery shortcodes with placeholders
  const processedContent = content.replace(
    /\[gallery\]([\s\S]*?)\[\/gallery\]/g,
    (match, images) => {
      const imageLines = images.trim().split('\n').filter((line: string) => line.trim());
      const imageUrls = imageLines.map((line: string) => {
        const match = line.match(/!\[.*?\]\((.*?)\)/);
        return match ? match[1] : null;
      }).filter(Boolean);
      
      if (imageUrls.length === 0) return match;
      
      const id = `gallery-${galleryId++}`;
      galleries[id] = imageUrls;
      return `<div data-gallery="${id}"></div>`;
    }
  );
  
  return { content: processedContent, galleries };
}

function getPostData(slug: string): PostData | null {
  try {
    const postsDirectory = path.join(process.cwd(), 'content/posts');
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const { content: processedContent, galleries } = processGalleryContent(content);
    
    return {
      title: data.title || 'Untitled',
      date: data.date || '',
      description: data.description || '',
      tags: data.tags || [],
      status: data.status || 'draft',
      content: processedContent,
      galleries,
    };
  } catch (error) {
    console.error(`Error loading blog post "${slug}":`, error);
    
    // In development, provide more detailed error information
    if (process.env.NODE_ENV === 'development') {
      console.error('Stack trace:', error instanceof Error ? error.stack : 'Unknown error');
    }
    
    return null;
  }
}

export async function generateMetadata({ params }: BlogPostProps) {
  const { slug } = await params;
  const postData = getPostData(slug);
  const siteConfig = getSiteConfig();
  
  if (!postData) {
    return {
      title: `Post Not Found - ${siteConfig.site.name}`,
    };
  }

  return {
    title: `${postData.title} - ${siteConfig.site.name}`,
    description: postData.description,
  };
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;
  const postData = getPostData(slug);

  if (!postData) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
        <Navigation />

        <ContentErrorBoundary>
          <main className="max-w-4xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold mb-8">Post Not Found</h1>
          <p className="text-[#737373] mb-8">
            The blog post you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link 
            href="/blog"
            className="border border-[#525252] text-[#ededed] px-4 py-2 rounded-xl hover:bg-[#262626] transition-colors"
          >
            ← Back to Blog
          </Link>
          
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-8 p-4 bg-[#1a1a1a] rounded-xl border border-[#262626]">
              <h3 className="text-lg font-semibold mb-2 text-yellow-400">Debug Info (Development)</h3>
              <p className="text-[#737373] text-sm">
                Attempted to load post with slug: <code className="text-[#ededed] bg-[#262626] px-1 rounded">{slug}</code>
              </p>
              <p className="text-[#737373] text-sm mt-2">
                Check the console for detailed error information and verify the post file exists in <code className="text-[#ededed] bg-[#262626] px-1 rounded">/content/posts/</code>
              </p>
            </div>
          )}
          </main>
        </ContentErrorBoundary>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
      <Navigation />

      <ContentErrorBoundary>
        <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Back Button */}
        <Link 
          href="/blog"
          className="inline-flex items-center text-[#737373] hover:text-[#ededed] transition-colors mb-8"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>

        {/* Post Header */}
        <header className="mb-12">
          <h1 className="text-5xl font-bold mb-6 leading-tight">{postData.title}</h1>
          
          <div className="flex items-center gap-4 text-[#737373] mb-6">
            <time dateTime={postData.date}>
              {new Date(postData.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            
            {postData.tags.length > 0 && (
              <>
                <span>•</span>
                <div className="flex gap-2">
                  {postData.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-[#262626] px-2 py-1 rounded-xl"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
          
          {postData.description && (
            <p className="text-xl text-[#737373] leading-relaxed">
              {postData.description}
            </p>
          )}
        </header>

        {/* Post Content */}
        <article className="prose prose-invert prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeRaw]}
            components={{
              h1: ({ children }) => <h1 className="text-4xl font-bold mb-6 text-[#ededed]">{children}</h1>,
              h2: ({ children }) => <h2 className="text-3xl font-bold mb-4 mt-8 text-[#ededed]">{children}</h2>,
              h3: ({ children }) => <h3 className="text-2xl font-bold mb-3 mt-6 text-[#ededed]">{children}</h3>,
              h4: ({ children }) => <h4 className="text-xl font-bold mb-2 mt-4 text-[#ededed]">{children}</h4>,
              p: ({ children }) => <p className="text-[#737373] mb-4 leading-relaxed">{children}</p>,
              a: ({ href, children }) => (
                <a 
                  href={href} 
                  className="text-[#ededed] underline underline-offset-4 hover:text-[#737373] transition-colors"
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {children}
                </a>
              ),
              ul: ({ children }) => <ul className="list-disc list-inside mb-4 text-[#737373] space-y-1">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside mb-4 text-[#737373] space-y-1">{children}</ol>,
              li: ({ children }) => <li className="text-[#737373]">{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-[#525252] pl-4 italic text-[#737373] my-6">
                  {children}
                </blockquote>
              ),
              code: ({ children, className }) => {
                const isInline = !className;
                if (isInline) {
                  return <code className="bg-[#262626] px-2 py-1 rounded text-sm text-[#ededed]">{children}</code>;
                }
                return <code className={className}>{children}</code>;
              },
              pre: ({ children }) => (
                <pre className="bg-[#1a1a1a] border border-[#262626] rounded-xl p-4 overflow-x-auto mb-4">
                  {children}
                </pre>
              ),
              strong: ({ children }) => <strong className="font-bold text-[#ededed]">{children}</strong>,
              em: ({ children }) => <em className="italic text-[#ededed]">{children}</em>,
              img: ({ src, alt }) => (
                <Image 
                  src={typeof src === 'string' ? src : ''} 
                  alt={alt || ''} 
                  width={800}
                  height={600}
                  className="w-full max-w-3xl mx-auto my-8 rounded-xl border border-[#262626]"
                />
              ),
              div: (props: any) => {
                const galleryId = props['data-gallery'];
                if (galleryId && postData.galleries[galleryId]) {
                  return (
                    <div className="my-8">
                      <div className="flex gap-4 overflow-x-auto pb-4">
                        {postData.galleries[galleryId].map((image: string, index: number) => (
                          <Image 
                            key={index}
                            src={image} 
                            alt={`Gallery image ${index + 1}`}
                            width={256}
                            height={192}
                            className="flex-none w-48 md:w-64 rounded-xl border border-[#262626]"
                          />
                        ))}
                      </div>
                    </div>
                  );
                }
                return <div {...props} />;
              },
            }}
          >
            {postData.content}
          </ReactMarkdown>
        </article>

        {/* Footer Navigation */}
        <footer className="mt-16 pt-8 border-t border-[#262626]">
          <Link 
            href="/blog"
            className="border border-[#525252] text-[#ededed] px-4 py-2 rounded-xl hover:bg-[#262626] transition-colors"
          >
            ← Back to All Posts
          </Link>
        </footer>
        </main>
      </ContentErrorBoundary>
    </div>
  );
}