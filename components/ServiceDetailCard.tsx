'use client'

import Link from 'next/link'

interface ServiceDetailCardProps {
  badge: {
    title: string
    icon: string
    description: string
  }
  title: string
  description: string
  benefits: string[]
  ctaText: string
  ctaLink: string
  colorScheme: 'light' | 'primary' | 'dark'
  illustrationEmoji?: string
  isReversed?: boolean
}

export default function ServiceDetailCard({
  badge,
  title,
  description,
  benefits,
  ctaText,
  ctaLink,
  colorScheme,
  illustrationEmoji = '🎨',
  isReversed = false,
}: ServiceDetailCardProps) {
  const colorClasses = {
    light: {
      bg: 'bg-gray-light',
      text: 'text-dark',
      badgeBg: 'bg-primary',
      badgeText: 'text-dark',
      benefitCheck: 'text-primary',
    },
    primary: {
      bg: 'bg-primary',
      text: 'text-dark',
      badgeBg: 'bg-white',
      badgeText: 'text-dark',
      benefitCheck: 'text-dark',
    },
    dark: {
      bg: 'bg-dark',
      text: 'text-white',
      badgeBg: 'bg-primary',
      badgeText: 'text-dark',
      benefitCheck: 'text-primary',
    },
  }

  const colors = colorClasses[colorScheme]

  return (
    <div
      className={`${colors.bg} ${colors.text} overflow-hidden rounded-3xl border-2 border-dark`}
    >
      <div
        className={`grid grid-cols-1 gap-8 p-8 lg:grid-cols-2 lg:p-12 ${isReversed ? 'lg:grid-flow-dense' : ''}`}
      >
        <div
          className={`flex items-center justify-center ${isReversed ? 'lg:col-start-2' : ''}`}
        >
          <div className="flex aspect-video w-full items-center justify-center rounded-2xl border-2 border-dark/10 bg-white/10">
            <div className="text-8xl">{illustrationEmoji}</div>
          </div>
        </div>

        <div
          className={`flex flex-col justify-between ${isReversed ? 'lg:col-start-1' : ''}`}
        >
          <div className="mb-8">
            <div
              className={`${colors.badgeBg} ${colors.badgeText} inline-flex items-center gap-3 rounded-lg border-2 border-dark px-4 py-2`}
            >
              <span className="text-2xl">{badge.icon}</span>
              <div>
                <h3 className="text-sm font-semibold">{badge.title}</h3>
                {badge.description && (
                  <p className="text-xs opacity-80">{badge.description}</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="mb-3 text-lg font-bold">{title}</h4>
              <p className="text-sm leading-relaxed opacity-90">
                {description}
              </p>
            </div>

            <div>
              <Link
                href={ctaLink}
                className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 font-medium transition-all ${
                  colorScheme === 'dark'
                    ? 'bg-primary text-dark hover:bg-primary/90'
                    : 'bg-dark text-white hover:bg-dark/90'
                }`}
              >
                <span>{ctaText}</span>
                <span className="text-lg">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 pb-8 lg:px-12 lg:pb-12">
        <div
          className={`border-t-2 pt-6 ${colorScheme === 'dark' ? 'border-white/20' : 'border-dark/20'}`}
        >
          <h4 className="mb-4 text-lg font-bold">Benefits</h4>
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <span
                  className={`${colors.benefitCheck} flex-shrink-0 text-xl`}
                >
                  ✓
                </span>
                <span className="text-sm">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
