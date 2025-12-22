'use client'

import { useState } from 'react'
import BlogCard from '@/components/BlogCard'
import { BlogPostDocument } from '@/prismicio-types'

interface BlogListProps {
  posts: BlogPostDocument[]
}

export default function BlogList({ posts }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No date'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const filteredPosts = posts.filter((post) => {
    const data = post.data
    const title =
      data.title?.[0] && 'text' in data.title[0] ? data.title[0].text : ''
    const excerpt =
      data.excerpt?.[0] && 'text' in data.excerpt[0] ? data.excerpt[0].text : ''
    const query = searchQuery.toLowerCase()

    return (
      title.toLowerCase().includes(query) ||
      excerpt.toLowerCase().includes(query)
    )
  })

  return (
    <>
      <section className="container mx-auto px-4 pb-8 lg:px-8">
        <div className="w-full">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 rounded-lg border-2 border-dark bg-white px-6 py-3 text-sm outline-none"
            />
            <button
              className="flex items-center justify-center rounded-lg border-2 border-dark bg-dark p-3 text-white transition-colors hover:bg-primary hover:text-dark"
              aria-label="Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-4 lg:px-8">
        {filteredPosts.length === 0 ? (
          <div className="text-center">
            <p className="text-lg text-gray-600">
              {posts.length === 0
                ? 'No blog posts found. Please create blog posts in Prismic.'
                : 'No articles found matching your search.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {filteredPosts.map((post) => {
              const data = post.data
              return (
                <BlogCard
                  key={post.id}
                  title={
                    data.title?.[0] && 'text' in data.title[0]
                      ? data.title[0].text
                      : 'Untitled'
                  }
                  excerpt={
                    data.excerpt?.[0] && 'text' in data.excerpt[0]
                      ? data.excerpt[0].text
                      : ''
                  }
                  author={data.author_name || 'Anonymous'}
                  authorAvatar={data.author_avatar?.url || null}
                  date={formatDate(data.publish_date as string)}
                  badgeType={data.badge_type || 'Article'}
                  slug={post.uid || ''}
                />
              )
            })}
          </div>
        )}
      </section>
    </>
  )
}
