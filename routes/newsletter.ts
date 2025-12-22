import express from 'express'
import {
  subscribe,
  unsubscribe,
  getSubscribers,
} from '../controllers/newsletterController'
import { validateEmail } from '../middleware/validation'

const router = express.Router()

router.post('/subscribe', validateEmail, subscribe)
router.post('/unsubscribe', validateEmail, unsubscribe)
router.get('/', getSubscribers)

export default router
