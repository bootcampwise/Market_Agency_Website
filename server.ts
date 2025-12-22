import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import connectDB from './config/database'
import errorHandler from './middleware/errorHandler'
import corsMiddleware from './middleware/cors'
import contactRoutes from './routes/contact'
import newsletterRoutes from './routes/newsletter'

// Load environment variables
dotenv.config({ path: './.env.local' })

// Initialize express app
const app = express()

// Connect to database
connectDB()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(corsMiddleware)

// Routes
app.use('/api/contact', contactRoutes)
app.use('/api/newsletter', newsletterRoutes)

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' })
})

// Error handling middleware
app.use(errorHandler)

// Start server
const PORT = process.env.BACKEND_PORT || 5000
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`)
})

export default app
