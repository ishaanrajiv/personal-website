import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import Navigation from '@/components/Navigation';
import ContentErrorBoundary from '@/components/ContentErrorBoundary';
import { ArrowLeftIcon } from '@/components/icons';
import { getSiteConfig } from '@/lib/content';

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
  const galleries: { [key: string]: string[] } = {};
  let galleryId = 0;

  const processedContent = content.replace(/\[gallery\]([\s\S]*?)\[\/gallery\]/g, (match, images) => {
    const imageLines = images.trim().split('\n').filter((line: string) => line.trim());
    const imageUrls = imageLines
      .map((line: string) => {
        const imageMatch = line.match(/!\[.*?\]\((.*?)\)/);
        return imageMatch ? imageMatch[1] : null;
      })
      .filter(Boolean) as string[];

    if (imageUrls.length === 0) {
      return match;
    }

    const id = `gallery-${galleryId++}`;
    galleries[id] = imageUrls;
    return `<div data-gallery="${id}"></div>`;
  });

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

    if (process.env.NODE_ENV === 'development') {
      console.error('Stack trace:', error instanceof Error ? error.stack : 'Unknown error');
    }

    return null;
  }
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
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

  if (!postData || postData.status === 'coming_soon') {
    return (
      <div className="site-shell">
        <Navigation />

        <ContentErrorBoundary>
          <main className="page-frame page-offset">
            <div className="max-w-3xl space-y-6 border-b border-line pb-10">
              <Link href="/blog" className="interactive-line">
                <ArrowLeftIcon className="h-4 w-4" />
                <span>Back to Blog</span>
              </Link>

              <h1 className="page-title">
                {postData?.status === 'coming_soon' ? 'Coming Soon' : 'Post Not Found'}
              </h1>

              <p className="lede">
                {postData?.status === 'coming_soon'
                  ? 'This blog post is coming soon. Check back later for the full article.'
                  : "The blog post you're looking for doesn't exist or has been moved."}
              </p>

              {process.env.NODE_ENV === 'development' ? (
                <div className="border border-line bg-surface p-5 text-sm text-text-dim">
                  <p>
                    Attempted to load post with slug:{' '}
                    <code className="border border-line px-2 py-1 text-text">{slug}</code>
                  </p>
                  <p className="mt-3">
                    Check the console for detailed error information and verify the post file
                    exists in{' '}
                    <code className="border border-line px-2 py-1 text-text">/content/posts/</code>.
                  </p>
                </div>
              ) : null}
            </div>
          </main>
        </ContentErrorBoundary>
      </div>
    );
  }

  return (
    <div className="site-shell">
      <Navigation />

      <ContentErrorBoundary>
        <main className="page-frame page-offset">
          <div className="mx-auto max-w-5xl">
            <Link href="/blog" className="interactive-line">
              <ArrowLeftIcon className="h-4 w-4" />
              <span>Back to Blog</span>
            </Link>

            <header className="mt-8 border-b border-line pb-10 md:pb-12">
              <div className="mx-auto max-w-4xl space-y-6">
                <h1 className="article-title">{postData.title}</h1>

                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm uppercase tracking-[0.16em] text-text-faint">
                  {postData.date ? <span>{formatDate(postData.date)}</span> : null}
                  {postData.tags.length > 0 ? <span>{postData.tags.join(' / ')}</span> : null}
                </div>

                {postData.description ? <p className="lede">{postData.description}</p> : null}
              </div>
            </header>

            <article className="article-content mx-auto py-10 md:py-12">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight, rehypeRaw]}
                components={{
                  img: ({ src, alt }) => (
                    <Image
                      src={typeof src === 'string' ? src : ''}
                      alt={alt || ''}
                      width={1200}
                      height={900}
                      className="h-auto w-full border border-line"
                    />
                  ),
                  div: (props: React.HTMLAttributes<HTMLDivElement>) => {
                    const galleryId = props['data-gallery' as keyof typeof props];

                    if (typeof galleryId === 'string' && postData.galleries[galleryId]) {
                      return (
                        <div className="image-strip my-8">
                          {postData.galleries[galleryId].map((image: string, index: number) => (
                            <div key={`${galleryId}-${index}`} className="image-strip__item">
                              <Image
                                src={image}
                                alt={`Gallery image ${index + 1}`}
                                width={960}
                                height={720}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ))}
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

            <footer className="mx-auto max-w-4xl border-t border-line pt-8">
              <Link href="/blog" className="interactive-line">
                <ArrowLeftIcon className="h-4 w-4" />
                <span>Back to All Posts</span>
              </Link>
            </footer>
          </div>
        </main>
      </ContentErrorBoundary>
    </div>
  );
}
