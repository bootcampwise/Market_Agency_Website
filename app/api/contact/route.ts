import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  // Handle the contact form submission here
  console.log('Contact form submission:', body)
  return NextResponse.json({ message: 'Message sent successfully' })
}
