import express from 'express'
import { submitContact, getContacts } from '../controllers/contactController'
import { validateContact } from '../middleware/validation'

const router = express.Router()

router.post('/', validateContact, submitContact)
router.get('/', getContacts)

export default router
