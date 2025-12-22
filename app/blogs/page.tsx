import { createClient } from '@/prismicio'
import { BlogPostDocument } from '@/prismicio-types'
import BlogList from '@/components/BlogList'

export default async function BlogsPage() {
  const client = createClient()
  let blogPosts: BlogPostDocument[] = []
  try {
    blogPosts = await client.getAllByType('blog_post', {
      orderings: [{ field: 'my.blog_post.publish_date', direction: 'desc' }],
    })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
  }

  return (
    <div className="container mx-auto max-w-7xl">
      <section className="container mx-auto px-4 pb-8 lg:px-8">
        <div className="mx-auto my-20 max-w-3xl text-center">
          <h1 className="mb-6 text-3xl font-bold lg:text-4xl">Our Blog</h1>
          <p className="mx-auto max-w-[82%] text-lg font-light leading-relaxed lg:text-xl">
            We use an agile approach to test assumptions and connect with the
            needs of your audience early and often.
          </p>
        </div>
      </section>
      <BlogList posts={blogPosts} />
    </div>
  )
}
