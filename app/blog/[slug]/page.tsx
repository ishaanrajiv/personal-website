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
import SiteFooter from '@/components/SiteFooter';
import { formatDate } from '@/components/SiteUI';
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

  const backLink = (label: string) => (
    <Link href="/blog" className="text-link text-[0.9375rem]">
      <ArrowLeftIcon className="h-4 w-4" />
      {label}
    </Link>
  );

  if (!postData || postData.status === 'coming_soon') {
    return (
      <>
        <Navigation />

        <ContentErrorBoundary>
          <main className="px-4 pb-24 pt-14 sm:px-6 sm:pb-32 sm:pt-24">
            <div className="mx-auto max-w-[42rem]">
              {backLink('Back to the blog')}

              <h1 className="display mt-8 text-[2.75rem] sm:text-[4rem]">
                {postData?.status === 'coming_soon' ? 'Coming soon' : 'Post not found'}
              </h1>

              <p className="lede mt-6">
                {postData?.status === 'coming_soon'
                  ? 'This post is still being written. Check back later for the full article.'
                  : "The post you're looking for doesn't exist or has been moved."}
              </p>

              {process.env.NODE_ENV === 'development' ? (
                <div className="mt-8 rounded-2xl bg-paper-raised p-5 text-sm text-ink/65 ring-1 ring-ink/[0.08]">
                  <p>
                    Attempted to load post with slug:{' '}
                    <code className="rounded bg-ink/[0.07] px-2 py-1 text-ink">{slug}</code>
                  </p>
                  <p className="mt-3">
                    Check the console for detailed error information and verify the post file
                    exists in <code className="rounded bg-ink/[0.07] px-2 py-1 text-ink">/content/posts/</code>.
                  </p>
                </div>
              ) : null}
            </div>
          </main>
        </ContentErrorBoundary>

        <SiteFooter />
      </>
    );
  }

  const formattedDate = formatDate(postData.date);

  return (
    <>
      <Navigation />

      <ContentErrorBoundary>
        <main className="px-4 pb-24 pt-14 sm:px-6 sm:pb-32 sm:pt-24">
          <div className="mx-auto max-w-[42rem]">
            {backLink('Back to the blog')}

            <header className="mt-8 border-b rule pb-10 sm:pb-12">
              {formattedDate ? <p className="label">{formattedDate}</p> : null}
              <h1 className="display mt-4 text-[2.5rem] sm:text-[3.5rem]">{postData.title}</h1>
              {postData.description ? <p className="lede mt-6">{postData.description}</p> : null}
              {postData.tags.length > 0 ? (
                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tags">
                  {postData.tags.map((tag) => (
                    <li key={tag} className="chip">
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : null}
            </header>

            <article className="article-content mt-10 sm:mt-12">
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
                      className="h-auto w-full"
                    />
                  ),
                  div: (props: React.HTMLAttributes<HTMLDivElement>) => {
                    const galleryId = props['data-gallery' as keyof typeof props];

                    if (typeof galleryId === 'string' && postData.galleries[galleryId]) {
                      return (
                        <div className="shot-strip my-8">
                          {postData.galleries[galleryId].map((image: string, index: number) => (
                            <div key={`${galleryId}-${index}`} className="shot-strip__item">
                              <Image
                                src={image}
                                alt={`Gallery image ${index + 1}`}
                                width={960}
                                height={720}
                                className="shot-strip__image"
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

            <footer className="mt-12 border-t rule pt-8">{backLink('All posts')}</footer>
          </div>
        </main>
      </ContentErrorBoundary>

      <SiteFooter />
    </>
  );
}
