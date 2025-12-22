import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/prismicio'
import { PrismicRichText } from '@prismicio/react'
import type { Metadata } from 'next'

interface BlogPostPageProps {
  params: {
    uid: string
  }
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const client = createClient()

  try {
    const page = await client.getByUID('blog_post', params.uid)
    const data = page.data

    return {
      title:
        data.title?.[0] && 'text' in data.title[0]
          ? data.title[0].text
          : 'Blog Post',
      description:
        data.excerpt?.[0] && 'text' in data.excerpt[0]
          ? data.excerpt[0].text
          : '',
      openGraph: {
        images: data.featured_image?.url ? [data.featured_image.url] : [],
      },
    }
  } catch (error) {
    return {
      title: 'Blog Post Not Found',
    }
  }
}

export async function generateStaticParams() {
  const client = createClient()

  try {
    const posts = await client.getAllByType('blog_post')
    return posts.map((post) => ({
      uid: post.uid,
    }))
  } catch (error) {
    return []
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const client = createClient()

  const page = await client
    .getByUID('blog_post', params.uid)
    .catch(() => notFound())

  const data = page.data

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No date'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="mt-20 min-h-screen bg-white">
      <section className="container mx-auto px-4 pb-8 pt-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/blogs"
            className="mb-6 inline-flex items-center gap-2 font-medium text-dark transition-colors hover:text-primary"
          >
            <span className="text-base font-bold">←</span>
            <span className="text-base font-bold">All Articles</span>
          </Link>

          <h1 className="mb-4 text-3xl font-bold leading-tight lg:text-4xl">
            {data.title?.[0] && 'text' in data.title[0]
              ? data.title[0].text
              : 'Untitled'}
          </h1>

          <p className="mb-4 text-gray-600">
            Written by {data.author_name || 'Anonymous'} on{' '}
            {formatDate(data.publish_date as string)}
          </p>

          {data.tags && data.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {data.tags.map(
                (tagItem, index) =>
                  tagItem.tag && (
                    <span
                      key={index}
                      className="rounded-full px-3 py-1 text-xs font-medium text-gray-700"
                    >
                      #{tagItem.tag}
                    </span>
                  )
              )}
            </div>
          )}
        </div>
      </section>

      {data.featured_image?.url && (
        <section className="container mx-auto px-4 pb-12 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="overflow-hidden rounded-2xl">
              <Image
                src={data.featured_image.url}
                alt={
                  data.featured_image.alt ||
                  (data.title?.[0] && 'text' in data.title[0]
                    ? data.title[0].text
                    : 'Blog post image') ||
                  'Blog post image'
                }
                width={data.featured_image.dimensions?.width || 1200}
                height={data.featured_image.dimensions?.height || 700}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>
        </section>
      )}

      <article className="container mx-auto px-4 pb-16 lg:px-8">
        <div className="prose prose-lg mx-auto max-w-6xl">
          <div className="blog-content">
            <PrismicRichText field={data.content} />
          </div>
        </div>
      </article>
    </div>
  )
}
