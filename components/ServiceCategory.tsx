import Image from 'next/image'

interface ServiceCategoryProps {
  title: string
  description: string
  services: string[]
  imageUrl?: string
  imageEmoji?: string
  isReversed?: boolean
}

export default function ServiceCategory({
  title,
  description,
  services,
  imageUrl,
  imageEmoji,
  isReversed = false,
}: ServiceCategoryProps) {
  const midPoint = Math.ceil(services.length / 2)
  const leftColumn = services.slice(0, midPoint)
  const rightColumn = services.slice(midPoint)

  return (
    <div className="mb-16">
      <div className="mb-8 w-full bg-primary px-6 py-3">
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>
      <div
        className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-start gap-8`}
      >
        <div className="w-full flex-1">
          <p className="mb-8 leading-relaxed text-gray-text">{description}</p>
          <div className="grid grid-cols-2 gap-x-12 gap-y-2">
            <div className="space-y-2">
              {leftColumn.map((service, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="mt-1 text-xl leading-none text-primary">
                    •
                  </span>
                  <span className="text-sm font-medium text-dark">
                    {service}
                  </span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {rightColumn.map((service, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="mt-1 text-xl leading-none text-primary">
                    •
                  </span>
                  <span className="text-sm font-medium text-dark">
                    {service}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex w-full flex-1 justify-center lg:justify-end">
          <div className="relative flex aspect-[4/3] w-full max-w-md items-center justify-center overflow-hidden rounded-2xl border-2 border-dark bg-gray-100">
            {imageUrl ? (
              <Image src={imageUrl} alt={title} fill className="object-cover" />
            ) : imageEmoji ? (
              <span role="img" aria-label={title} className="text-9xl">
                {imageEmoji}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
