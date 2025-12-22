'use client'
import { useState } from 'react'

interface ProcessItem {
  number: string
  title: string
  description: React.ReactNode
}

export default function ProcessSection({ items }: { items: ProcessItem[] }) {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0)

  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <div
          key={index}
          className={`overflow-hidden rounded-[45px] border-2 border-b-8 border-dark transition-all ${
            activeAccordion === index ? 'bg-primary' : 'bg-gray-light'
          }`}
        >
          <button
            onClick={() =>
              setActiveAccordion(activeAccordion === index ? null : index)
            }
            className="flex w-full items-center justify-between p-8 text-left"
          >
            <div className="flex items-center gap-6">
              <span className="text-5xl font-bold">{item.number}</span>
              <h3 className="text-2xl font-semibold">{item.title}</h3>
            </div>
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-dark text-2xl sm:h-12 sm:w-12 ${
                activeAccordion === index ? 'bg-gray-light' : 'bg-gray-light'
              }`}
            >
              {activeAccordion === index ? '−' : '+'}
            </div>
          </button>
          {activeAccordion === index && (
            <div className="px-8 pb-8">
              <div className="border-t-2 border-dark pt-6">
                <div className="text-lg">{item.description}</div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
