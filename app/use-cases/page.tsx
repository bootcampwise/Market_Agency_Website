import { createClient } from '@/prismicio'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, PrismicLink } from '@prismicio/react'
import { isFilled } from '@prismicio/client'
import Link from 'next/link'
import Image from 'next/image'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

export default async function UseCasesPage() {
  const client = createClient()
  const page = await client.getSingle('use_cases').catch(() => null)

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-[#2b2b2b] py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <div className="mb-8 flex justify-center">
            {page?.data.hero_logo && (
              <PrismicNextImage
                field={page.data.hero_logo}
                className="h-[52px] w-[165px] object-contain"
                width={165}
                height={52}
              />
            )}
          </div>

          <div
            className={`mb-6 text-lg tracking-wide text-white lg:text-[26px] ${montserrat.className}`}
          >
            <PrismicRichText field={page?.data.hero_subheading} />
          </div>
          <div
            className={`text-lg font-extrabold tracking-wide text-white lg:text-[28px] ${montserrat.className}`}
          >
            <PrismicRichText field={page?.data.hero_heading} />
          </div>
        </div>
      </section>
      <div className="container mx-auto max-w-7xl">
        <section className="py-10">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-[930px] text-center text-lg leading-relaxed">
              <PrismicRichText field={page?.data.description_text} />
            </div>
          </div>
        </section>

        <section className="pt-12">
          <div className="container mx-auto px-4 text-center lg:px-8">
            <h6 className="mb-4 text-2xl font-bold lg:text-[35px]">
              {page?.data.goal_title}
            </h6>
            <div className="text-lg text-[#504C4C]">
              <PrismicRichText field={page?.data.goal_description} />
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8 lg:px-8">
          <div className="rounded-[20px] bg-gray-light p-14 lg:p-20">
            <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
              <div className="w-full lg:w-[65%]">
                <h2 className="mb-6 text-2xl font-bold text-[#333C58] lg:text-3xl">
                  {page?.data.challenge_title}
                </h2>
                <div className="text-lg leading-relaxed text-black">
                  <PrismicRichText field={page?.data.challenge_description} />
                </div>
              </div>
              <div className="flex w-full items-center justify-center lg:w-[35%] lg:justify-start">
                {page?.data.challenge_image && (
                  <PrismicNextImage
                    field={page.data.challenge_image}
                    className="h-40 w-40 object-contain lg:h-48 lg:w-48"
                    width={192}
                    height={192}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 lg:px-8 lg:py-20">
          <div className="flex flex-col items-center justify-center gap-12 lg:flex-row lg:gap-24">
            <div className="flex-shrink-0">
              {page?.data.results_image && (
                <PrismicNextImage
                  field={page.data.results_image}
                  className="h-40 w-40 object-contain lg:h-48 lg:w-48"
                  width={192}
                  height={192}
                />
              )}
            </div>
            <div className="max-w-lg">
              <h2 className="text-blck mb-6 text-2xl font-bold lg:text-3xl">
                {page?.data.results_title}
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-[#312F2F]">
                <PrismicRichText field={page?.data.results_list} />
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 pb-20 lg:px-8">
          <div className="mx-auto grid grid-cols-1 gap-8 md:grid-cols-2">
            {page?.data.solution_cards?.map((card, index) => (
              <div
                key={index}
                className={`${card.background_color === 'primary' ? 'bg-primary' : card.background_color === 'gray' ? 'bg-gray-100' : 'bg-white'} flex items-center gap-6 rounded-[27px] border border-dark px-8 py-4`}
              >
                <div className="flex w-full items-center justify-center lg:w-[50%]">
                  <div className="h-[76px] w-[76px]">
                    {card.icon && (
                      <PrismicNextImage
                        field={card.icon}
                        className="h-full w-full object-contain"
                        width={76}
                        height={76}
                      />
                    )}
                  </div>
                </div>
                <div className="w-full lg:w-[50%]">
                  <div
                    className={`${card.background_color === 'gray' ? 'text-teal-600' : 'text-black'} text-[19px] leading-relaxed`}
                  >
                    <PrismicRichText field={card.description} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 lg:px-8">
          <div className="rounded-[30px] bg-black p-12 text-white lg:p-16 lg:px-[142px]">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div className="flex justify-center lg:justify-start">
                {page?.data.solution_image && (
                  <PrismicNextImage
                    field={page.data.solution_image}
                    className="h-48 w-48 object-contain lg:h-64 lg:w-64"
                    width={256}
                    height={256}
                  />
                )}
              </div>
              <div>
                <h2 className="mb-6 text-2xl font-bold lg:text-[35px]">
                  {page?.data.solution_title}
                </h2>
                <div className="text-lg font-normal leading-relaxed">
                  <PrismicRichText field={page?.data.solution_description} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 lg:py-20">
          <div className="mx-auto w-[70%]">
            <div className="bg-gray-light p-12 lg:p-16">
              <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-2">
                <div>
                  <h2 className="mb-6 text-2xl font-bold text-dark lg:text-3xl">
                    {page?.data.impact_title}
                  </h2>
                  <div className="space-y-4 text-base leading-relaxed text-[#333C58]">
                    <PrismicRichText field={page?.data.impact_description} />
                  </div>
                </div>
                <div className="flex h-full items-center justify-center">
                  {page?.data.impact_image && (
                    <PrismicNextImage
                      field={page.data.impact_image}
                      className="h-64 w-64 object-contain"
                      width={256}
                      height={256}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 text-3xl font-medium lg:text-4xl">
              <PrismicRichText field={page?.data.cta_title} />
            </div>
            <div className="mb-10 text-[20px] leading-relaxed">
              <PrismicRichText field={page?.data.cta_description} />
            </div>
            {isFilled.link(page?.data.cta_button_link) ? (
              <PrismicLink
                field={page.data.cta_button_link}
                className="inline-block rounded-2xl bg-dark px-10 py-4 text-[20px] font-medium text-white transition-colors hover:bg-gray-800"
              >
                {page?.data.cta_button_text || 'Get in touch'}
              </PrismicLink>
            ) : (
              <Link
                href="/contact"
                className="inline-block rounded-2xl bg-dark px-10 py-4 text-[20px] font-medium text-white transition-colors hover:bg-gray-800"
              >
                {page?.data.cta_button_text || 'Get in touch'}
              </Link>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
