import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/prismicio'
import * as prismic from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, PrismicLink } from '@prismicio/react'
import { ServicesPageDocument } from '@/prismicio-types'

export default async function ServicesPage() {
  const client = createClient()
  const homepage = await client.getSingle('homepage').catch(() => null)
  const servicesPage = (await client
    .getSingle('services_page')
    .catch(() => null)) as ServicesPageDocument | null

  const services =
    homepage?.data?.services?.map((item) => {
      const bgColor = item.background_color || 'bg-gray-light'
      const isDarkBg =
        bgColor.includes('bg-dark') || bgColor.includes('bg-black')

      return {
        title: item.name,
        subtitle: item.subtitle,
        icon: item.icon,
        image: item.image,
        bgColor: bgColor,
        titleBgColor: item.title_background_color || 'bg-primary',
        badgeTextColor: 'text-dark',
        buttonBg: isDarkBg ? 'bg-white' : 'bg-dark',
        buttonTextColor: isDarkBg ? 'text-white' : 'text-dark',
        whatWeOffer: item.what_we_offer,
        ctaText: item.cta_text,
        ctaLink: item.cta_link,
        benefits: item.benefits,
      }
    }) || []

  return (
    <div className="container mx-auto min-h-screen max-w-7xl bg-white">
      <section className="container mx-auto px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-5xl font-medium lg:text-6xl">
            {servicesPage?.data?.hero_title || 'Our Services'}
          </h1>
          <p className="lg:wax-w-[55%] text-xl leading-relaxed">
            {servicesPage?.data?.hero_description ||
              'At Positivus, we offer a comprehensive range of digital marketing services designed to help your business thrive in the online world. Explore our services below to find the perfect solution for your needs.'}
          </p>
        </div>
      </section>

      <div className="container mx-auto space-y-16 px-4 pb-20 lg:px-8">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>

      <section className="container mx-auto px-4 py-20 lg:px-8">
        <div className="text-center">
          <h2 className="mb-6 text-4xl font-medium lg:text-4xl">
            {servicesPage?.data?.cta_title ||
              'Ready to transform your digital presence?'}
          </h2>

          <p className="mx-auto mb-10 text-xl leading-relaxed lg:w-[65%] xl:w-[55%]">
            {servicesPage?.data?.cta_description ||
              'Contact us today to discuss your digital marketing needs and discover how our services can help your business grow and succeed online.'}
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-2xl bg-dark px-11 py-5 text-xl font-medium text-white transition-colors hover:bg-gray-800"
          >
            {servicesPage?.data?.cta_button_text || 'Get in touch'}
          </Link>
        </div>
      </section>
    </div>
  )
}

interface ServiceData {
  title: prismic.KeyTextField
  subtitle: prismic.KeyTextField
  icon: prismic.KeyTextField
  image: prismic.ImageField<never>
  bgColor: string
  titleBgColor: string
  badgeTextColor: string
  buttonBg: string
  buttonTextColor: string
  whatWeOffer: prismic.RichTextField
  ctaText: prismic.KeyTextField
  ctaLink: prismic.LinkField
  benefits: prismic.GroupField<{ benefit: prismic.KeyTextField }>
}

function ServiceCard({
  service,
  index,
}: {
  service: ServiceData
  index: number
}) {
  const isDark = service.bgColor === 'bg-dark'
  const textColor = isDark ? 'text-white' : 'text-dark'
  const isEven = index % 2 === 0

  return (
    <div className="container mx-auto px-4 lg:px-8">
      <div className={isEven ? 'rounded-3xl bg-gray-100 p-8' : ''}>
        <div
          className={`${service.bgColor} relative mb-12 rounded-[45px] border-2 border-dark p-12 lg:p-8`}
        >
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="flex h-full min-h-[200px] flex-col justify-between">
              <div className="flex flex-col">
                <h3
                  className={`inline-block text-base font-semibold ${service.titleBgColor} w-fit rounded-[7px] px-2 py-1`}
                >
                  {service.title}
                </h3>
                {service.subtitle && (
                  <h3
                    className={`inline-block text-base font-semibold ${service.titleBgColor} w-fit rounded-[7px] px-2 py-1`}
                  >
                    {service.subtitle}
                  </h3>
                )}
              </div>

              <div className="mt-auto">
                <Link
                  href="/services/social-media-marketing"
                  className={`flex items-center gap-3 ${service.buttonTextColor} rounded-full px-1 py-2.5 md:px-5`}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-dark">
                    <svg
                      width="21"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.750244 13.6953C0.0328052 14.1096 -0.213008 15.0269 0.201206 15.7444C0.61542 16.4618 1.53281 16.7076 2.25024 16.2934L1.50024 14.9944L0.750244 13.6953ZM20.2696 5.38261C20.4841 4.58241 20.0092 3.75991 19.209 3.5455L6.16898 0.0514389C5.36878 -0.162974 4.54628 0.3119 4.33186 1.1121C4.11745 1.9123 4.59233 2.7348 5.39253 2.94922L16.9836 6.05505L13.8778 17.6462C13.6634 18.4464 14.1383 19.2689 14.9385 19.4833C15.7387 19.6977 16.5612 19.2228 16.7756 18.4226L20.2696 5.38261ZM1.50024 14.9944L2.25024 16.2934L19.5708 6.29342L18.8208 4.99438L18.0708 3.69535L0.750244 13.6953L1.50024 14.9944Z"
                        fill="#B9FF66"
                      />
                    </svg>
                  </span>
                  <span className="text-base font-normal">Service Info</span>
                </Link>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              {service.image && (
                <PrismicNextImage
                  field={service.image}
                  className="max-h-[325px] max-w-[535px] object-contain lg:h-[325px] lg:w-[535px]"
                />
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="mb-6 text-2xl font-medium">What we offer</h3>
            <div className="mb-8 text-base font-normal leading-relaxed">
              <PrismicRichText field={service.whatWeOffer} />
            </div>
            <PrismicLink
              field={service.ctaLink}
              className="inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 text-base font-medium text-dark transition-colors hover:bg-primary/90"
            >
              {service.ctaText || 'Learn more'}
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 10h10M10 5l5 5-5 5" />
              </svg>
            </PrismicLink>
          </div>

          <div
            className={isEven || !isEven ? 'rounded-3xl bg-gray-100 p-8' : ''}
          >
            <h3 className="mb-6 text-2xl font-medium">Benefits</h3>
            <ul className="space-y-4">
              {service.benefits?.map((item, index) => (
                <li key={index} className="my-auto flex items-start gap-3">
                  <div className="my-auto flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-primary">
                    <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M2 7l3 3 7-7"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-base font-normal">{item.benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
