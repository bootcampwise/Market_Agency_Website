import Link from 'next/link'
import Image from 'next/image'

interface BlogCardProps {
  title: string
  excerpt: string
  author: string
  authorAvatar: string | null
  date: string
  badgeType?: 'Tutorial' | 'Article'
  slug: string
}

export default function BlogCard({
  title,
  excerpt,
  author,
  authorAvatar,
  date,
  badgeType,
  slug,
}: BlogCardProps) {
  return (
    <div
      className="flex h-full flex-col rounded-[45px] border-2 border-dark bg-white p-6 transition-all"
      style={{ boxShadow: '0px 8px 0px 0px rgba(0, 0, 0, 1)' }}
    >
      <div className="mb-4 flex items-center justify-between">
        {badgeType && (
          <span className="inline-flex items-center gap-1 rounded bg-primary px-2 py-1 text-xs font-semibold text-dark">
            {badgeType === 'Tutorial' && (
              <svg className="h-3 w-3" viewBox="0 0 16 16" fill="currentColor">
                <rect x="2" y="4" width="10" height="8" rx="1" />
                <path d="M12 6l2.5-1.5v7L12 10V6z" />
              </svg>
            )}
            {badgeType === 'Article' && (
              <svg className="h-3 w-3" viewBox="0 0 16 16" fill="currentColor">
                <rect
                  x="3"
                  y="2"
                  width="10"
                  height="12"
                  rx="1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <line
                  x1="5"
                  y1="5"
                  x2="11"
                  y2="5"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <line
                  x1="5"
                  y1="7"
                  x2="11"
                  y2="7"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <line
                  x1="5"
                  y1="9"
                  x2="9"
                  y2="9"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
            )}
            {badgeType}
          </span>
        )}
        <span className="ml-auto text-sm">{date}</span>
      </div>

      <h3 className="mb-3 line-clamp-2 text-2xl font-bold">{title}</h3>

      <p className="mb-6 line-clamp-3 flex-grow text-base font-light">
        {excerpt}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 flex-shrink-0 overflow-hidden rounded-full bg-gray-100">
            {authorAvatar ? (
              <Image
                src={authorAvatar}
                alt={author}
                width={28}
                height={28}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-primary text-xs font-bold text-dark">
                {author.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <span className="text-base font-medium">{author}</span>
        </div>
        <Link
          href={`/blogs/${slug}`}
          className="inline-flex items-center gap-1 text-base font-medium text-dark transition-colors hover:text-primary"
        >
          Read more
          <svg
            width="24"
            height="13"
            viewBox="0 0 24 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ml-1"
          >
            <path
              d="M1 8H22M22 8L15 1M22 8L15 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  )
}
