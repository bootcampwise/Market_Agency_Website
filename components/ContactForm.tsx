'use client'
import { useState } from 'react'
import Image from 'next/image'

export default function ContactForm() {
  const [contactType, setContactType] = useState('hi')

  return (
    <div className="relative overflow-hidden rounded-[45px] bg-gray-light p-6 sm:p-8 lg:p-14">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        <form className="relative z-10 w-full space-y-5 lg:w-[55%]">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:gap-6">
            <label className="flex cursor-pointer items-center gap-2">
              <div className="relative flex items-center">
                <input
                  type="radio"
                  name="contactType"
                  value="hi"
                  checked={contactType === 'hi'}
                  onChange={(e) => setContactType(e.target.value)}
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-dark bg-white transition-all checked:border-black"
                />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div
                    className={
                      'h-2.5 w-2.5 rounded-full bg-primary transition-transform ' +
                      (contactType === 'hi' ? 'scale-100' : 'scale-0')
                    }
                  ></div>
                </div>
              </div>
              <span className="text-base">Say Hi</span>
            </label>

            <label className="flex cursor-pointer items-center gap-2">
              <div className="relative flex items-center">
                <input
                  type="radio"
                  name="contactType"
                  value="quote"
                  checked={contactType === 'quote'}
                  onChange={(e) => setContactType(e.target.value)}
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-dark bg-white transition-all checked:border-black"
                />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div
                    className={`h-2.5 w-2.5 rounded-full bg-primary transition-transform ${contactType === 'quote' ? 'scale-100' : 'scale-0'}`}
                  ></div>
                </div>
              </div>
              <span className="text-base">Get a Quote</span>
            </label>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Name</label>
            <input
              type="text"
              placeholder="Name"
              className="w-full rounded-2xl border border-dark bg-white px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-dark"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Email*</label>
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full rounded-2xl border border-dark bg-white px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-dark"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Message*</label>
            <textarea
              placeholder="Message"
              required
              rows={5}
              className="w-full resize-none rounded-2xl border border-dark bg-white px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-dark"
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-2xl bg-dark py-4 font-medium text-white transition-all hover:bg-opacity-90"
          >
            Send Message
          </button>
        </form>

        <div className="relative hidden w-full items-center justify-end lg:flex lg:w-[45%]">
          <Image
            src="/contact-illustration.png"
            alt="Contact illustration"
            width={400}
            height={600}
            className="absolute max-h-[510px] object-contain lg:right-[-113px]"
          />
        </div>
      </div>
    </div>
  )
}
