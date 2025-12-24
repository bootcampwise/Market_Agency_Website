'use client'
import { useState } from 'react'
import Image from 'next/image'

export default function ContactForm() {
  const [contactType, setContactType] = useState('hi')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle'
  )
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('https://formspree.io/f/xdanvnpn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          contactType: contactType === 'quote' ? 'Get a Quote' : 'Say Hi',
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Something went wrong')
      }

      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      setStatus('error')
      setErrorMessage((error as Error).message)
    }
  }

  return (
    <div className="relative overflow-hidden rounded-[45px] bg-gray-light p-6 sm:p-8 lg:p-14">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        <form
          onSubmit={handleSubmit}
          className="relative z-10 w-full space-y-5 lg:w-[55%]"
        >
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
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full rounded-2xl border border-dark bg-white px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-dark"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full rounded-2xl border border-dark bg-white px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-dark"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Message*</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              required
              rows={5}
              className="w-full resize-none rounded-2xl border border-dark bg-white px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-dark"
            />
          </div>

          {status === 'error' && (
            <div className="text-red-500">{errorMessage}</div>
          )}
          {status === 'success' && (
            <div className="text-green-600">Message sent successfully!</div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="mt-6 w-full rounded-2xl bg-dark py-4 font-medium text-white transition-all hover:bg-opacity-90 disabled:opacity-70"
          >
            {status === 'loading' ? 'Sending...' : 'Send Message'}
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
