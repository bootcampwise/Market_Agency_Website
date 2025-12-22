import { createClient } from '@/prismicio'
import { PrismicRichText, PrismicImage, PrismicLink } from '@prismicio/react'
import Image from 'next/image'

export default async function SocialMediaMarketingPage() {
  const client = createClient()
  const page = await client
    .getSingle('social_media_marketing')
    .catch(() => null)

  if (!page) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-xl text-gray-600">
          Content not available. Please add content in Prismic.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto max-w-7xl">
        <section className="container mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-6 text-3xl font-bold leading-tight lg:text-[35px]">
                <PrismicRichText field={page.data.hero_title} />
              </div>
              <div className="mb-8 max-w-lg text-xl font-light text-[#191A23]">
                <PrismicRichText field={page.data.hero_description} />
              </div>
              {page.data.hero_button_text && (
                <PrismicLink
                  field={page.data.hero_button_link}
                  className="inline-block rounded-[5.25px] border border-dark px-8 py-3 text-sm font-semibold transition-colors hover:bg-dark hover:text-white"
                >
                  {page.data.hero_button_text}
                </PrismicLink>
              )}
            </div>
            <div className="flex justify-center lg:justify-end">
              {page.data.hero_image?.url && (
                <PrismicImage
                  field={page.data.hero_image}
                  className="w-full max-w-lg object-contain"
                />
              )}
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="overflow-hidden">
            <div className="w-full rounded-lg bg-primary py-3">
              <div className="flex items-center gap-5 whitespace-nowrap px-8 text-xs font-bold tracking-widest text-dark lg:ml-[250px]">
                {(page.data as any).banner_items && (page.data as any).banner_items.length > 0 && (
                  (page.data as any).banner_items.map((item: any, index: number) => (
                    <span key={index} className="flex items-center">
                      <span>{item.item_text}</span>
                      <Image
                        src="/separator-icon.png"
                        alt=""
                        width={10}
                        height={12}
                        className="inline-block ms-[2px]"
                      />
                    </span>
                  ))
                )}
              </div>
            </div>

            <div className="relative rounded-lg bg-black p-6 lg:p-6">
              <div className="relative z-10 mx-auto flex max-w-[860px] flex-col items-center text-center">
                <div className="mb-4 text-xl font-bold leading-tight text-white lg:text-[44px]">
                  {(() => {
                    const philosophyTitle = page.data.philosophy_title
                    const titleText =
                      philosophyTitle?.[0] && 'text' in philosophyTitle[0]
                        ? philosophyTitle[0].text
                        : ''

                    const parts = titleText.split(/([+=])/)

                    return (
                      <h2 className="text-white">
                        {parts.map((part, index) => {
                          if (part === '+' || part === '=') {
                            return (
                              <span key={index} className="text-primary">
                                {part}
                              </span>
                            )
                          }
                          return <span key={index}>{part}</span>
                        })}
                      </h2>
                    )
                  })()}
                </div>
                <div className="mb-5 text-sm leading-relaxed text-white lg:text-base">
                  <PrismicRichText field={page.data.philosophy_description} />
                </div>
              </div>

              <div className="absolute right-4 top-16 grid -translate-y-1/2 grid-cols-6 gap-3 opacity-40">
                {[...Array(42)].map((_, i) => (
                  <div key={i} className="h-2 w-2 rounded-full bg-white"></div>
                ))}
              </div>

              <div className="absolute -bottom-10 left-2 grid grid-cols-6 gap-4 opacity-40">
                {[...Array(30)].map((_, i) => (
                  <div key={i} className="h-2 w-2 rounded-full bg-white"></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 lg:max-w-[80%] lg:px-8">
          <h2 className="relative z-10 mb-16 inline-block text-[26px] font-bold">
            <span className="relative inline-block">
              <PrismicRichText field={page.data.services_title} />
              <span className="absolute bottom-2 left-0 -z-10 h-3 w-full bg-primary lg:w-[112%]"></span>
            </span>
          </h2>

          {page.data.service_icons && page.data.service_icons.length > 0 && (
            <div className="mx-auto flex max-w-3xl justify-between text-center">
              {page.data.service_icons.map((icon, index) => (
                <div key={index} className="flex flex-col items-center gap-3">
                  {icon.icon_image?.url && (
                    <PrismicImage
                      field={icon.icon_image}
                      className="h-14 w-14"
                    />
                  )}
                  <span className="text-xl font-semibold">
                    {icon.icon_label}
                  </span>
                  <div className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-dark bg-gray-200 transition-colors hover:border hover:bg-primary">
                    <svg
                      width="14"
                      height="7"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mt-[2px]"
                    >
                      <path
                        d="M1 1L5 5L9 1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {page.data.service_sections &&
          page.data.service_sections.slice(0, 2).map((section, index) => (
            <section
              key={index}
              className="container mx-auto px-4 py-12 lg:max-w-[80%] lg:px-8"
            >
              <div className="mb-8 w-full bg-primary px-6">
                <h3 className="text-[23px] font-semibold text-black">
                  {section.section_title}
                </h3>
              </div>
              <div className="grid grid-cols-1 items-start gap-12 text-xs lg:grid-cols-2">
                <div>
                  <div className="mb-8 leading-relaxed text-[#1D2327]">
                    <PrismicRichText field={section.section_description} />
                  </div>
                  <PrismicRichText
                    field={section.section_features}
                    components={{
                      list: ({ children }) => (
                        <ul className="columns-2 gap-x-12 space-y-2">
                          {children}
                        </ul>
                      ),
                      oList: ({ children }) => (
                        <ul className="columns-2 gap-x-12 space-y-2">
                          {children}
                        </ul>
                      ),
                      listItem: ({ children }) => (
                        <li className="break-inside-avoid text-xs">
                          • {children}
                        </li>
                      ),
                      oListItem: ({ children }) => (
                        <li className="break-inside-avoid text-xs">
                          • {children}
                        </li>
                      ),
                    }}
                  />
                </div>
                <div className="overflow-hidden rounded-xl">
                  {section.section_image?.url && (
                    <PrismicImage
                      field={section.section_image}
                      className="h-auto w-full object-cover"
                    />
                  )}
                </div>
              </div>
            </section>
          ))}

        {page.data.partner_logo?.url && (
          <section className="container mx-auto px-4 py-12 lg:max-w-[80%] lg:px-8">
            <div className="relative flex flex-col items-center justify-between gap-8 overflow-hidden rounded-[30px] bg-dark p-8 lg:flex-row lg:p-12">
              <div className="absolute bottom-0 left-0 top-0 z-0 grid w-24 grid-cols-6 gap-2 opacity-30">
                {[...Array(60)].map((_, i) => (
                  <div
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-white"
                  ></div>
                ))}
              </div>

              <div className="relative z-10 flex-1 px-8 lg:px-16">
                <p
                  className="text-2xl italic leading-relaxed text-white lg:text-3xl"
                  style={{ fontFamily: 'cursive' }}
                >
                  {(() => {
                    const text = `${page.data.partner_text_line1} ${page.data.partner_text_line2}`
                    const parts = text.split(/(social media marketing)/gi)

                    return parts.map((part, index) => {
                      if (part.toLowerCase() === 'social media marketing') {
                        return (
                          <span key={index} className="text-primary">
                            {part}
                          </span>
                        )
                      }
                      return <span key={index}>{part}</span>
                    })
                  })()}
                </p>
              </div>

              <div className="relative z-10 flex items-center gap-6 pr-8 lg:pr-16">
                <PrismicLink
                  field={page.data.partner_link}
                  className="flex items-center gap-6"
                >
                  {page.data.partner_logo?.url && (
                    <PrismicImage
                      field={page.data.partner_logo}
                      className="h-[72px] w-[101px] object-contain px-4"
                    />
                  )}
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 20H32M32 20L24 12M32 20L24 28"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </PrismicLink>
              </div>

              <div className="absolute bottom-0 right-0 top-0 z-0 grid w-24 grid-cols-6 gap-2 opacity-30">
                {[...Array(60)].map((_, i) => (
                  <div
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-white"
                  ></div>
                ))}
              </div>
            </div>
          </section>
        )}

        {page.data.service_sections &&
          page.data.service_sections.slice(2).map((section, index) => (
            <section
              key={index + 2}
              className="container mx-auto px-4 py-12 lg:max-w-[80%] lg:px-8"
            >
              <div className="mb-8 w-full bg-primary px-6">
                <h3 className="text-[24px] font-bold text-black">
                  {section.section_title}
                </h3>
              </div>
              <div className="grid grid-cols-1 items-start gap-12 text-xs lg:grid-cols-2">
                <div>
                  <div className="mb-8 leading-relaxed text-[#1D2327]">
                    <PrismicRichText field={section.section_description} />
                  </div>
                  <PrismicRichText
                    field={section.section_features}
                    components={{
                      list: ({ children }) => (
                        <ul className="columns-2 gap-x-12 space-y-2">
                          {children}
                        </ul>
                      ),
                      oList: ({ children }) => (
                        <ul className="columns-2 gap-x-12 space-y-2">
                          {children}
                        </ul>
                      ),
                      listItem: ({ children }) => (
                        <li className="break-inside-avoid text-xs">
                          • {children}
                        </li>
                      ),
                      oListItem: ({ children }) => (
                        <li className="break-inside-avoid text-xs">
                          • {children}
                        </li>
                      ),
                    }}
                  />
                </div>
                <div className="overflow-hidden rounded-xl">
                  {section.section_image?.url && (
                    <PrismicImage
                      field={section.section_image}
                      className="h-auto w-full object-cover"
                    />
                  )}
                </div>
              </div>
            </section>
          ))}
      </div>

      {page.data.case_studies && page.data.case_studies.length > 0 && (
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto max-w-5xl px-4 lg:px-8">
            <h2 className="relative z-10 mb-16 inline-block text-[27px] font-bold">
              <span className="relative inline-block">
                <PrismicRichText field={page.data.case_studies_title} />
                <span className="absolute bottom-2 left-0 -z-10 h-3 bg-primary"></span>
              </span>
            </h2>
            <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
              {page.data.case_studies.slice(0, 3).map((study, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-xl bg-white shadow-sm"
                >
                  <div className="relative h-[184px] w-full overflow-hidden">
                    {study.case_study_image?.url ? (
                      <PrismicImage
                        field={study.case_study_image}
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="px-4 py-2">
                    <span className="text-xs uppercase tracking-wider text-[#171616] underline decoration-gray-500 underline-offset-4">
                      {study.case_study_category}
                    </span>
                    <h3 className="mb-2 text-[15px] font-bold">
                      {study.case_study_name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-2 rounded-full ${i === 0 ? 'bg-dark' : 'bg-gray-300'}`}
                ></div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="container mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="rounded-[45px] bg-black p-12 text-center text-white lg:p-16">
          <div className="mb-6 text-3xl font-bold lg:text-4xl">
            {(() => {
              const ctaTitle = page.data.cta_title
              const titleText =
                ctaTitle?.[0] && 'text' in ctaTitle[0] ? ctaTitle[0].text : ''
              const words = titleText.split(' ')

              return (
                <h2>
                  {words.map((word, index) => (
                    <span
                      key={index}
                      className={
                        index % 2 === 0 ? 'text-white' : 'text-primary'
                      }
                    >
                      {word}
                      {index < words.length - 1 ? ' ' : ''}
                    </span>
                  ))}
                </h2>
              )
            })()}
          </div>
          <div className="mx-auto mb-8 max-w-2xl text-sm font-normal leading-relaxed text-gray-300">
            <PrismicRichText field={page.data.cta_description} />
          </div>
          {page.data.cta_button_text && (
            <PrismicLink
              field={page.data.cta_button_link}
              className="inline-block rounded-md border border-white px-8 py-3 text-[13px] font-semibold transition-colors hover:bg-white hover:text-dark"
            >
              {page.data.cta_button_text}
            </PrismicLink>
          )}
        </div>
      </section>

      {page.data.client_logos && page.data.client_logos.length > 0 && (
        <section className="container mx-auto px-4 lg:max-w-[70%] lg:px-8">
          <div className="mb-4 lg:ml-[10%]">
            <h2 className="relative z-10 mb-8 inline-block text-[27px] font-bold">
              <span className="relative inline-block">
                <PrismicRichText field={page.data.clients_title} />
                <span className="absolute bottom-2 left-0 -z-10 h-3 w-full bg-primary lg:w-[112%]"></span>
              </span>
            </h2>
          </div>
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-12 lg:gap-28">
            {page.data.client_logos.map(
              (client, index) =>
                client.client_logo?.url && (
                  <PrismicImage
                    key={index}
                    field={client.client_logo}
                    className="max-h-[60px] max-w-[150px] object-contain"
                  />
                )
            )}
          </div>
        </section>
      )}
    </div>
  )
}
