import mongoose, { Document, Schema } from 'mongoose'

export interface INewsletter extends Document {
  email: string
  status: 'active' | 'unsubscribed'
  subscribedAt: Date
  unsubscribedAt?: Date
}

const newsletterSchema = new Schema<INewsletter>({
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email',
    ],
  },
  status: {
    type: String,
    enum: ['active', 'unsubscribed'],
    default: 'active',
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
  unsubscribedAt: {
    type: Date,
  },
})

export default mongoose.model<INewsletter>('Newsletter', newsletterSchema)
