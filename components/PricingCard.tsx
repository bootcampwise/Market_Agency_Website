import Link from 'next/link'

interface PricingCardProps {
  tier: string
  description: string
  price: number
  features: string[]
  isPopular?: boolean
  priceSuffix?: string | null
  buttonText?: string | null
}

export default function PricingCard({
  tier,
  description,
  price,
  features,
  isPopular = false,
  priceSuffix,
  buttonText,
}: PricingCardProps) {
  return (
    <div
      className="flex flex-col rounded-[45px] border border-black bg-white p-6 transition-all"
      style={{ boxShadow: '0px 8px 0px 0px rgba(0, 0, 0, 1)' }}
    >
      <div className="flex justify-center">
        <h3 className="mb-3 text-2xl font-bold">{tier}</h3>
      </div>
      <div className="mx-auto flex items-center">
        <p className="mb-6 min-h-[3rem] text-center text-lg font-light">
          {description}
        </p>
      </div>
      <div className="flex justify-center">
        <div className="mb-8">
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-bold">${price}</span>
            <span className="text-base">{priceSuffix || '/month'}</span>
          </div>
        </div>
      </div>
      <ul className="mb-8 flex-grow space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <svg
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-black"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-base">{feature}</span>
          </li>
        ))}
      </ul>
      <button className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-dark transition-all hover:bg-dark hover:text-white">
        {buttonText || 'Get Started'}
      </button>
    </div>
  )
}
