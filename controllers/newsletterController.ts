import { Request, Response, NextFunction } from 'express'
import Newsletter from '../models/Newsletter'

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter/subscribe
// @access  Public
export const subscribe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { email } = req.body

    // Check if email already exists
    const existingSubscription = await Newsletter.findOne({ email })

    if (existingSubscription) {
      if (existingSubscription.status === 'active') {
        return res.status(400).json({
          success: false,
          message: 'Email is already subscribed',
        })
      } else {
        // Reactivate subscription
        existingSubscription.status = 'active'
        existingSubscription.subscribedAt = new Date()
        existingSubscription.unsubscribedAt = undefined
        await existingSubscription.save()

        return res.status(200).json({
          success: true,
          message: 'Subscription reactivated successfully',
          data: existingSubscription,
        })
      }
    }

    // Create new subscription
    const subscription = await Newsletter.create({ email })

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      data: subscription,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Unsubscribe from newsletter
// @route   POST /api/newsletter/unsubscribe
// @access  Public
export const unsubscribe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { email } = req.body

    const subscription = await Newsletter.findOne({ email })

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Email not found in subscription list',
      })
    }

    subscription.status = 'unsubscribed'
    subscription.unsubscribedAt = new Date()
    await subscription.save()

    res.status(200).json({
      success: true,
      message: 'Successfully unsubscribed from newsletter',
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get all newsletter subscribers
// @route   GET /api/newsletter
// @access  Private (add auth middleware later)
export const getSubscribers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const subscribers = await Newsletter.find({ status: 'active' }).sort({
      subscribedAt: -1,
    })

    res.status(200).json({
      success: true,
      count: subscribers.length,
      data: subscribers,
    })
  } catch (error) {
    next(error)
  }
}
