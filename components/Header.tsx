'use client'

import Link from 'next/link'
import { useState } from 'react'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicLink } from '@prismicio/react'
import { SettingsDocument } from '@/prismicio-types'

interface HeaderProps {
  settings: SettingsDocument | null
}

export default function Header({ settings }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = settings?.data.nav_links || []

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="container mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            {settings?.data.header_logo.url ? (
              <PrismicNextImage
                field={settings.data.header_logo}
                className="h-9 w-auto"
                width={229}
                height={36}
                priority
              />
            ) : (
              <span className="text-2xl font-bold">Positivus</span>
            )}
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((item, index) => (
              <PrismicLink
                key={index}
                field={item.link}
                className="text-dark transition-colors hover:text-gray-600"
                style={{ fontFamily: 'Space Grotesk', fontSize: '20px' }}
              >
                {item.label}
              </PrismicLink>
            ))}
            {settings?.data.cta_text && (
              <PrismicLink
                field={settings.data.cta_link}
                className="transition-color inline-block rounded-lg border border-dark px-6 py-3 hover:bg-black hover:text-white"
                style={{ fontFamily: 'Space Grotesk', fontSize: '20px' }}
              >
                {settings.data.cta_text}
              </PrismicLink>
            )}
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex flex-col gap-1.5 lg:hidden"
            aria-label="Toggle menu"
          >
            <span className="h-0.5 w-6 bg-dark transition-all"></span>
            <span className="h-0.5 w-6 bg-dark transition-all"></span>
            <span className="h-0.5 w-6 bg-dark transition-all"></span>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-gray-200 py-4 lg:hidden">
            <nav className="flex flex-col gap-4">
              {navLinks.map((item, index) => (
                <PrismicLink
                  key={index}
                  field={item.link}
                  className="text-dark transition-colors hover:text-gray-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </PrismicLink>
              ))}
              {settings?.data.cta_text && (
                <PrismicLink
                  field={settings.data.cta_link}
                  className="btn-secondary text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {settings.data.cta_text}
                </PrismicLink>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
