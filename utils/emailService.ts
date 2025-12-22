import nodemailer from 'nodemailer'
import { IContact } from '../models/Contact'

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

// Send contact form notification email
export const sendContactEmail = async (contact: IContact): Promise<void> => {
  const transporter = createTransporter()

  const mailOptions = {
    from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New Contact Form Submission from ${contact.name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${contact.name}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      ${contact.phone ? `<p><strong>Phone:</strong> ${contact.phone}</p>` : ''}
      ${contact.company ? `<p><strong>Company:</strong> ${contact.company}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${contact.message}</p>
      <hr>
      <p><small>Submitted at: ${new Date(contact.createdAt).toLocaleString()}</small></p>
    `,
  }

  await transporter.sendMail(mailOptions)
}

// Send welcome email to newsletter subscriber
export const sendWelcomeEmail = async (email: string): Promise<void> => {
  const transporter = createTransporter()

  const mailOptions = {
    from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
    to: email,
    subject: 'Welcome to Our Newsletter!',
    html: `
      <h2>Thank you for subscribing!</h2>
      <p>We're excited to have you on board. You'll receive our latest updates, news, and exclusive content.</p>
      <p>If you wish to unsubscribe at any time, please click the unsubscribe link in any of our emails.</p>
      <br>
      <p>Best regards,<br>The Team</p>
    `,
  }

  await transporter.sendMail(mailOptions)
}
