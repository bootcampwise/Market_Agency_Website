import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { createClient } from '@/prismicio'

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  title: 'Positivus - Digital Marketing Agency',
  description:
    'Navigating the digital landscape for success. Professional digital marketing services including SEO, PPC, Social Media, and more.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const client = createClient()
  const settings = await client.getSingle('settings').catch(() => null)

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Header settings={settings} />
        <main>{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  )
}
