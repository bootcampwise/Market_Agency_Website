'use client'
import { useState, useRef, useEffect } from 'react'

interface TestimonialItem {
  quote: React.ReactNode
  author: string
  position: string
}

interface TestimonialsSectionProps {
  items: TestimonialItem[]
}

export default function TestimonialsSection({
  items,
}: TestimonialsSectionProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const [isAnimating, setIsAnimating] = useState(false)
  const touchStartX = useRef<number>(0)
  const touchEndX = useRef<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const nextTestimonial = () => {
    if (isAnimating) return
    setDirection('right')
    setIsAnimating(true)
    setCurrentTestimonial((prev) => (prev + 1) % items.length)
    setTimeout(() => setIsAnimating(false), 800)
  }

  const prevTestimonial = () => {
    if (isAnimating) return
    setDirection('left')
    setIsAnimating(true)
    setCurrentTestimonial((prev) => (prev - 1 + items.length) % items.length)
    setTimeout(() => setIsAnimating(false), 800)
  }

  const goToTestimonial = (index: number) => {
    if (isAnimating || index === currentTestimonial) return
    setDirection(index > currentTestimonial ? 'right' : 'left')
    setIsAnimating(true)
    setCurrentTestimonial(index)
    setTimeout(() => setIsAnimating(false), 800)
  }
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return

    const distance = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50

    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        nextTestimonial()
      } else {
        prevTestimonial()
      }
    }

    touchStartX.current = 0
    touchEndX.current = 0
  }
  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartX.current = e.clientX
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (touchStartX.current === 0) return
    touchEndX.current = e.clientX
  }

  const handleMouseUp = () => {
    if (!touchStartX.current || !touchEndX.current) {
      touchStartX.current = 0
      touchEndX.current = 0
      return
    }

    const distance = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50

    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        nextTestimonial()
      } else {
        prevTestimonial()
      }
    }

    touchStartX.current = 0
    touchEndX.current = 0
  }

  const handleMouseLeave = () => {
    touchStartX.current = 0
    touchEndX.current = 0
  }

  if (items.length === 0) return null

  const getPositionClass = (i: number) => {
    const offset = (i - currentTestimonial + items.length) % items.length

    const baseClasses =
      'absolute top-0 flex flex-col w-[350px] lg:w-[600px] transition-all duration-700 ease-in-out'
    if (items.length <= 3) {
      if (offset === 0) {
        return `${baseClasses} left-1/2 -translate-x-1/2 opacity-100 scale-100 z-30`
      } else if (offset === 1) {
        return `${baseClasses} left-1/2 translate-x-[50%] opacity-60 scale-90 z-20`
      } else if (offset === items.length - 1) {
        return `${baseClasses} left-1/2 -translate-x-[150%] opacity-60 scale-90 z-20`
      }
    }
    if (offset === 0) {
      return `${baseClasses} left-1/2 -translate-x-1/2 opacity-100 scale-100 z-30`
    } else if (offset === 1) {
      return `${baseClasses} left-1/2 translate-x-[45%] opacity-60 scale-90 z-20`
    } else if (offset === 2) {
      return `${baseClasses} left-1/2 translate-x-[90%] opacity-30 scale-80 z-10`
    } else if (offset === items.length - 1) {
      return `${baseClasses} left-1/2 -translate-x-[145%] opacity-60 scale-90 z-20`
    } else if (offset === items.length - 2) {
      return `${baseClasses} left-1/2 -translate-x-[190%] opacity-30 scale-80 z-10`
    } else {
      return `${baseClasses} opacity-0 scale-75 pointer-events-none z-0`
    }
  }

  return (
    <div className="overflow-hidden rounded-[45px] bg-dark pb-20 pt-20 text-white">
      <div
        ref={containerRef}
        className="relative min-h-[400px] w-full cursor-grab select-none active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {items.map((testimonial, i) => (
          <div key={i} className={getPositionClass(i)}>
            <div className="pointer-events-none relative mb-8 h-full rounded-[45px] border border-primary bg-dark p-12">
              <div className="line-clamp-6 text-base leading-6 text-white lg:line-clamp-none lg:text-lg">
                {testimonial.quote}
              </div>
              <div className="absolute -bottom-[1px] left-[50px] h-8 w-8 translate-y-1/2 rotate-45 transform border-b border-r border-primary bg-dark"></div>
            </div>
            <div className="pointer-events-none pl-10">
              <p className="text-xl font-medium text-primary">
                {testimonial.author}
              </p>
              <p className="text-lg font-normal text-white">
                {testimonial.position}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between px-4">
        <div className="mx-auto flex items-center gap-12">
          <button
            onClick={prevTestimonial}
            disabled={isAnimating}
            className="text-white transition-colors hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Previous testimonials"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 12H2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 19L2 12L9 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="mx-5 flex gap-4 lg:mx-24">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                disabled={isAnimating}
                className={`transition-all duration-300 disabled:cursor-not-allowed ${
                  currentTestimonial === index
                    ? 'scale-125 text-primary'
                    : 'scale-100 text-white'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L8.5716 4.83688H13.6574L9.5429 7.82624L11.1145 12.6631L7 9.67376L2.8855 12.6631L4.4571 7.82624L0.342604 4.83688H5.4284L7 0Z" />
                </svg>
              </button>
            ))}
          </div>
          <button
            onClick={nextTestimonial}
            disabled={isAnimating}
            className="text-white transition-colors hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Next testimonials"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 12H22"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 5L22 12L15 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
