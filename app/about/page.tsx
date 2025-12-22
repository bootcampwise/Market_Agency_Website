import { createClient } from '@/prismicio'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText } from '@prismicio/react'
import Link from 'next/link'
import AnimatedLogos from '@/components/AnimatedLogos'

export default async function AboutPage() {
  const client = createClient()
  const page = await client.getSingle('homepage').catch(() => null)
  const aboutPage = await client.getSingle('about').catch(() => null)

  const services =
    page?.data.services.map((item) => {
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

  const team =
    page?.data.team_members.map((item) => ({
      name: item.name,
      role: item.role,
      experience: item.experience,
      avatar: item.avatar,
    })) || []

  return (
    <div className="container mx-auto max-w-7xl">
      <section className="lg:pt-15 container mx-auto mb-10 px-4 py-16 lg:px-8 lg:pb-5">
        <div className="mx-auto text-center">
          <div
            className="mx-auto mb-6 max-w-3xl text-center text-5xl font-medium lg:text-6xl"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            <PrismicRichText field={aboutPage?.data.hero_title} />
          </div>
          <div
            className="mb-8 text-xl font-normal leading-relaxed"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            <PrismicRichText field={aboutPage?.data.hero_description} />
          </div>
          <button className="btn-primary border text-xl font-normal">
            {aboutPage?.data.hero_button_text || 'Book a consultation'}
          </button>
        </div>
      </section>

      {page?.data?.client_logos &&
        page.data.client_logos.length > 0 && (
          <div className="mt-16">
            <AnimatedLogos logos={page.data.client_logos} />
          </div>
        )}

      <section className="container mx-auto px-4 py-8 lg:px-8">
        <div className="mb-12 flex flex-col items-center gap-8 md:flex-row">
          <div className="section-heading text-4xl md:text-5xl">
            <PrismicRichText field={page?.data.team_title} />
          </div>
          <div className="my-auto lg:w-[50%] xl:w-[40%]">
            <div className="text-center text-lg leading-6 md:text-left">
              <PrismicRichText field={page?.data.team_description} />
            </div>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
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
      </section>

      <section
        id="services"
        className="container mx-auto mb-12 px-4 py-8 lg:px-8"
      >
        <div className="mb-12 flex flex-col items-center gap-6 md:flex-row md:gap-8">
          <div
            className="section-heading flex items-center justify-center"
            style={{
              width: '178px',
              height: '51px',
              fontSize: '40px',
              fontFamily: 'Space Grotesk',
            }}
          >
            <PrismicRichText field={page?.data.services_title} />
          </div>
          <div className="my-auto lg:w-[65%] xl:w-[55%]">
            <div
              className="text-center text-lg leading-6 md:text-left"
              style={{ fontFamily: 'Space Grotesk', fontSize: '18px' }}
            >
              <PrismicRichText field={page?.data.services_description} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {services.map((service, index) => (
            <div
              key={index}
              className={` ${service.bgColor} ${service.border} ${service.textColor || 'text-dark'} flex h-full w-full flex-col gap-6 overflow-hidden rounded-[45px] border-2 border-b-8 p-6 transition-all hover:shadow-lg md:flex-row md:gap-8 md:p-8`}
            >
              <div className="flex h-full flex-1 flex-col justify-between">
                <div className="flex flex-col items-center md:items-start lg:mb-20 text-black">
                  <h3
                    className={`inline-block text-2xl font-semibold xl:text-3xl ${service.titleBgColor} rounded-[7px] px-2 py-1`}
                  >
                    {service.title}
                  </h3>
                  {service.subtitle && (
                    <h3
                      className={`inline-block text-2xl font-semibold xl:text-3xl ${service.titleBgColor} rounded-[7px] px-2 py-1`}
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
                  <span className="text-[20px] font-medium">Service Info</span>
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
    </div>
  )
}
