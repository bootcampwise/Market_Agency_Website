import Link from 'next/link'
import Image from 'next/image'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicLink, PrismicRichText } from '@prismicio/react'
import { SettingsDocument } from '@/prismicio-types'

interface FooterProps {
  settings?: SettingsDocument | null
}

export default function Footer({ settings }: FooterProps) {
  const navLinks = settings?.data.nav_links || []
  const socialLinks = settings?.data.social_links || []

  return (
    <footer className="pb-0 pt-12">
      <div className="container mx-auto max-w-7xl px-4 lg:px-8">
        <div className="rounded-t-[45px] bg-dark p-8 text-white lg:p-12">
          <div className="mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <Link href="/" className="flex items-center gap-2">
              {settings?.data.footer_logo?.url ? (
                <Image
                  src={settings.data.footer_logo.url}
                  alt={settings.data.footer_logo.alt || 'Positivus'}
                  className="h-7 w-auto max-w-[180px]"
                  width={settings.data.footer_logo.dimensions?.width || 180}
                  height={settings.data.footer_logo.dimensions?.height || 29}
                />
              ) : (
                <span className="text-2xl font-bold">Positivus</span>
              )}
            </Link>

            <nav className="flex flex-wrap gap-6 text-lg lg:gap-8 [&>a]:underline [&>a]:underline-offset-2 [&>a]:transition-colors">
              {navLinks.map((item, index) => (
                <PrismicLink
                  key={index}
                  field={item.link}
                  className="hover:text-primary"
                >
                  {item.label}
                </PrismicLink>
              ))}
            </nav>

            <div className="flex gap-4 [&>a]:flex [&>a]:h-8 [&>a]:w-8 [&>a]:items-center [&>a]:justify-center [&>a]:rounded-full">
              {socialLinks.map((item, index) => (
                <PrismicLink
                  key={index}
                  field={item.link}
                  aria-label="Social Link"
                >
                  {item.icon.url && (
                    <PrismicNextImage
                      field={item.icon}
                      width={30}
                      height={30}
                      className="h-[30px] w-[30px]"
                    />
                  )}
                </PrismicLink>
              ))}
            </div>
          </div>

          <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="space-y-3">
              <div>
                <span className="rounded-[7px] bg-primary px-2 text-xl font-medium text-dark">
                  Contact us:
                </span>
              </div>
              <p className="text-lg font-normal">
                Email: {settings?.data.contact_email}
              </p>
              <p className="text-lg font-normal">
                Phone: {settings?.data.contact_phone}
              </p>
              <p className="text-lg font-normal">
                Address: {settings?.data.contact_address} <br />
                {settings?.data.contact_address2}
              </p>
            </div>

            <div className="flex justify-center rounded-xl bg-[#292A32] p-6 lg:p-8">
              <div className="m-auto flex flex-col gap-4 sm:flex-row">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 rounded-[14px] border border-white bg-transparent px-6 py-4 text-white placeholder-white focus:border-primary focus:bg-transparent focus:outline-none"
                />
                <button className="whitespace-nowrap rounded-[14px] bg-primary px-6 py-4 text-xl font-normal text-dark transition-colors hover:bg-primary/90">
                  Subscribe to news
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-white pt-8">
            <div className="flex flex-col items-start justify-start gap-4 sm:flex-row sm:items-center">
              <p className="text-lg font-normal">
                {settings?.data.copyright_text ||
                  '© 2023 Positivus. All Rights Reserved.'}
              </p>
              <Link
                href="/privacy"
                className="text-lg font-normal underline transition-colors hover:text-primary"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
