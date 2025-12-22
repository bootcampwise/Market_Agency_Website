import { Request, Response, NextFunction } from 'express'
import Contact from '../models/Contact'
import { sendContactEmail } from '../utils/emailService'

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContact = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, phone, company, message } = req.body

    // Create contact entry
    const contact = await Contact.create({
      name,
      email,
      phone,
      company,
      message,
    })

    // Send notification email (optional)
    try {
      await sendContactEmail(contact)
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Continue even if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: contact,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get all contacts
// @route   GET /api/contact
// @access  Private (add auth middleware later)
export const getContacts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    })
  } catch (error) {
    next(error)
  }
}
