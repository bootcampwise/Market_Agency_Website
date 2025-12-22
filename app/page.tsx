import { createClient } from '@/prismicio'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, PrismicLink } from '@prismicio/react'
import Image from 'next/image'
import Link from 'next/link'
import ProcessSection from '@/components/ProcessSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import AnimatedLogos from '@/components/AnimatedLogos'
import ContactForm from '@/components/ContactForm'

export default async function HomePage() {
  const client = createClient()
  const page = await client.getSingle('homepage').catch(() => null)

  const services =
    page?.data?.services?.map((item) => {
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
        border: 'border-dark',
        buttonTextColor: isDarkBg ? 'text-white' : 'text-dark',
        textColor: isDarkBg ? 'text-white' : 'text-dark',
      }
    }) || []

  const workingProcess =
    page?.data?.process_steps?.map((item) => ({
      number: item.number || '',
      title: item.title || '',
      description: <PrismicRichText field={item.description} />,
    })) || []

  const team =
    page?.data?.team_members?.map((item) => ({
      name: item.name || '',
      role: item.role || '',
      experience: item.experience || '',
      avatar: item.avatar,
    })) || []

  const testimonials =
    page?.data?.testimonials?.map((item) => ({
      quote: <PrismicRichText field={item.quote} />,
      author: item.author || '',
      position: item.position || '',
    })) || []

  return (
    <div className="container mx-auto max-w-7xl">
      <section className="container mx-auto px-4 py-4 lg:px-8 lg:py-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <div
              className="mb-6 max-w-[1440px] font-bold leading-tight"
              style={{ fontFamily: 'Space Grotesk', fontSize: '60px' }}
            >
              <PrismicRichText field={page?.data?.hero_title} />
            </div>
            <div className="lg:max-w-[86%]">
              <div
                className="mb-8 text-lg"
                style={{ fontFamily: 'Space Grotesk', fontSize: '20px' }}
              >
                <PrismicRichText field={page?.data?.hero_description} />
              </div>
            </div>
            <button className="btn-primary font-sm h-[68px] w-[264px] hover:border">
              <p style={{ fontFamily: 'Space Grotesk', fontSize: '20px' }}>
                {page?.data?.hero_button_text}
              </p>
            </button>
          </div>
          <div className="relative">
            {page?.data?.hero_image && (
              <PrismicNextImage
                field={page.data?.hero_image}
                className="h-full w-full object-contain lg:h-[515px]"
                priority
              />
            )}
          </div>
        </div>

        {page?.data?.client_logos &&
          page.data.client_logos.length > 0 && (
            <div className="mt-16">
              <AnimatedLogos logos={page.data.client_logos} />
            </div>
          )}
      </section>

      <section id="services" className="container mx-auto px-4 py-16 lg:px-8">
        <div className="mb-12 flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-8">
          <div
            className="section-heading flex items-center justify-center"
            style={{
              width: '178px',
              height: '51px',
              fontSize: '40px',
              fontFamily: 'Space Grotesk',
            }}
          >
            <PrismicRichText field={page?.data?.services_title} />
          </div>
          <div className="my-auto lg:w-[60%] xl:w-[48%]">
            <div
              className="text-center leading-tight md:text-left"
              style={{ fontFamily: 'Space Grotesk', fontSize: '18px' }}
            >
              <PrismicRichText field={page?.data?.services_description} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {services.map((service, index) => (
            <div
              key={index}
              className={` ${service.bgColor} ${service.border} flex h-full w-full flex-col gap-6 overflow-hidden rounded-[45px] border border-b-8 p-6 transition-all hover:shadow-lg md:flex-row md:gap-8 md:p-8`}
            >
              <div className="flex h-full flex-1 flex-col justify-between">
                <div className="flex flex-col items-center gap-0 md:items-start lg:mb-20">
                  <h3
                    className={`inline-block text-2xl font-semibold text-black xl:text-3xl ${service.titleBgColor} rounded-[7px] px-2 py-1`}
                  >
                    {service.title}
                  </h3>
                  {service.subtitle && (
                    <h3
                      className={`inline-block text-2xl font-semibold text-black xl:text-3xl ${service.titleBgColor} rounded-[7px] px-2 py-1`}
                    >
                      {service.subtitle}
                    </h3>
                  )}
                </div>
                <Link
                  href="/services/social-media-marketing"
                  className={`flex items-center gap-3 ${service.buttonTextColor} mt-10 justify-center rounded-full py-2.5 md:mt-auto md:justify-start`}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-dark">
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
                  <span className="text-[20px] font-medium">Learn more</span>
                </Link>
              </div>
              {service.image && (
                <div className="flex flex-1 items-center justify-center md:justify-end">
                  <PrismicNextImage
                    field={service.image}
                    className="h-36 w-36 object-contain md:h-44 md:w-44"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8">
        <div className="rounded-[45px] bg-gray-light px-5 py-10 sm:px-8 lg:px-14 lg:py-0">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="text-center lg:text-left">
              <div className="mb-4 text-2xl font-bold leading-snug sm:mb-6 sm:text-3xl lg:text-4xl">
                <PrismicRichText field={page?.data?.cta_title} />
              </div>

              <div className="mb-6 text-sm sm:mb-8 sm:text-base">
                <PrismicRichText field={page?.data?.cta_description} />
              </div>

              <div className="flex justify-center lg:justify-start">
                <PrismicLink
                  field={page?.data?.cta_button_link}
                  className="btn-primary"
                >
                  {page?.data?.cta_button_text || 'Get your free proposal'}
                </PrismicLink>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              {page?.data?.cta_image && (
                <PrismicNextImage
                  field={page.data?.cta_image}
                  className="w-52 object-contain sm:w-64 md:w-72 lg:-my-6 lg:me-20 lg:w-[359px]"
                  fallbackAlt=""
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="cases" className="container mx-auto px-4 py-16 lg:px-8">
        <div className="mb-12 flex flex-col items-center gap-8 md:flex-row">
          <div
            className="section-heading text-4xl lg:text-5xl"
            style={{ fontFamily: 'Space Grotesk', fontSize: '40px' }}
          >
            <PrismicRichText field={page?.data?.case_studies_title} />
          </div>
          <div className="my-auto lg:w-[60%] xl:w-[48%]">
            <div
              className="text-center text-lg md:text-left"
              style={{ fontFamily: 'Space Grotesk', fontSize: '18px' }}
            >
              <PrismicRichText field={page?.data?.case_studies_description} />
            </div>
          </div>
        </div>

        <div className="rounded-[45px] bg-dark px-5 py-12 text-white xl:px-10">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 xl:gap-8">
            {page?.data?.case_studies?.map((item, index) => (
              <div
                key={index}
                className={`border-b border-white pb-8 lg:border-b-0 lg:border-r lg:pb-0 ${index === 2 ? 'border-none' : ''}`}
              >
                <div className="mx-9 mb-4 text-lg">
                  <PrismicRichText field={item.description} />
                </div>
                <PrismicLink
                  field={item.link}
                  className="ms-9 flex items-center gap-3 text-primary hover:underline"
                >
                  <span className="text-[20px] font-medium">
                    {item.link_label || 'Learn more'}
                  </span>
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
                </PrismicLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 lg:px-8">
        <div className="mb-12 flex flex-col items-center gap-8 md:flex-row">
          <div
            className="section-heading text-center text-4xl md:text-left lg:text-5xl"
            style={{ fontFamily: 'Space Grotesk', fontSize: '40px' }}
          >
            <PrismicRichText field={page?.data?.process_title} />
          </div>
          <div className="my-auto lg:w-[35%] xl:w-[25%]">
            <div
              className="text-center text-lg md:text-left"
              style={{ fontFamily: 'Space Grotesk', fontSize: '18px' }}
            >
              <PrismicRichText field={page?.data?.process_description} />
            </div>
          </div>
        </div>

        <ProcessSection items={workingProcess} />
      </section>

      <section className="container mx-auto px-4 py-16 lg:px-8">
        <div className="mb-12 flex flex-col items-center gap-8 md:flex-row">
          <div className="section-heading text-4xl lg:text-5xl">
            <PrismicRichText field={page?.data?.team_title} />
          </div>
          <div className="my-auto lg:w-[55%] xl:w-[40%]">
            <div className="text-center text-lg md:text-left">
              <PrismicRichText field={page?.data?.team_description} />
            </div>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {team.map((member, index) => (
            <div
              key={index}
              className="relative rounded-[45px] border-2 border-b-8 border-dark p-8"
            >
              <div className="mb-6 flex items-start gap-4">
                <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden">
                  <PrismicNextImage
                    field={member.avatar}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="mb-1 text-xl font-semibold">{member.name}</h3>
                  <p className="font-medium">{member.role}</p>
                </div>
                <button className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-dark text-white">
                  in
                </button>
              </div>
              <div className="border-t-2 border-dark pt-6">
                <p className="text-sm">{member.experience}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button className="rounded-xl bg-dark px-8 py-4 font-medium text-white transition-all hover:bg-opacity-90">
            See all team
          </button>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 lg:px-8">
        <div className="mb-12 flex flex-col items-center gap-8 md:flex-row">
          <div className="section-heading text-4xl lg:text-5xl">
            <PrismicRichText field={page?.data?.testimonials_title} />
          </div>
          <div className="my-auto lg:w-[50%] xl:w-[40%]">
            <div className="text-center text-lg md:text-left">
              <PrismicRichText field={page?.data?.testimonials_description} />
            </div>
          </div>
        </div>

        <TestimonialsSection items={testimonials} />
      </section>

      <section
        id="contact"
        className="container mx-auto px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mb-12 flex flex-col items-center gap-8 md:flex-row">
          <div className="section-heading mb-4 text-3xl sm:text-4xl lg:mb-0 lg:text-5xl">
            <PrismicRichText field={page?.data?.contact_title} />
          </div>
          <div className="my-auto lg:w-[50%] xl:w-[30%]">
            <div className="text-center text-base sm:text-lg md:text-left">
              <PrismicRichText field={page?.data?.contact_description} />
            </div>
          </div>
        </div>{' '}
        <ContactForm />
      </section>
    </div>
  )
}
