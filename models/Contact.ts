import mongoose, { Document, Schema } from 'mongoose'

export interface IContact extends Document {
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  status: 'new' | 'contacted' | 'closed'
  createdAt: Date
}

const contactSchema = new Schema<IContact>({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email',
    ],
  },
  phone: {
    type: String,
    trim: true,
  },
  company: {
    type: String,
    trim: true,
  },
  message: {
    type: String,
    required: [true, 'Please provide a message'],
    maxlength: [1000, 'Message cannot be more than 1000 characters'],
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'closed'],
    default: 'new',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model<IContact>('Contact', contactSchema)
