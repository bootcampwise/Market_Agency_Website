import { createClient } from '@/prismicio'
import { PrismicRichText } from '@prismicio/react'
import PricingCard from '@/components/PricingCard'

export default async function PricingPage() {
  const client = createClient()
  const page = await client.getSingle('pricing').catch(() => null)

  const pricingTiers =
    page?.data?.pricing_tiers?.map((tier) => {
      const features: string[] = []

      if (tier.features && Array.isArray(tier.features)) {
        tier.features.forEach((block) => {
          if (
            block.type === 'paragraph' ||
            block.type === 'list-item' ||
            block.type === 'o-list-item'
          ) {
            if ('text' in block && block.text && block.text.trim().length > 0) {
              features.push(block.text)
            }
          }
        })
      }

      return {
        tier: tier.tier_name || '',
        description: tier.tier_description || '',
        price: tier.price || 0,
        features: features,
        isPopular: tier.is_popular || false,
        priceSuffix: tier.price_suffix,
        buttonText: tier.button_text,
      }
    }) || []

  return (
    <div className="container mx-auto max-w-7xl">
      <section className="container mx-auto px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-6 text-3xl font-bold lg:text-4xl">
            <PrismicRichText field={page?.data.hero_title} />
          </div>
          <div className="text-lg font-light leading-relaxed lg:text-xl">
            <PrismicRichText field={page?.data.hero_description} />
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 pb-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pricingTiers.map((tier, index) => (
            <PricingCard
              key={index}
              tier={tier.tier}
              description={tier.description}
              price={tier.price}
              features={tier.features}
              isPopular={tier.isPopular}
              priceSuffix={tier.priceSuffix}
              buttonText={tier.buttonText}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
