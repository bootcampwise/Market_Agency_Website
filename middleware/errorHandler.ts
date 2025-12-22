import { Request, Response, NextFunction } from 'express'

interface CustomError extends Error {
  statusCode?: number
  code?: number
  errors?: Record<string, { message: string }>
}

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let error: { message: string; statusCode: number } = {
    message: err.message || 'Server Error',
    statusCode: err.statusCode || 500,
  }

  // Log to console for dev
  console.error(err)

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    error = {
      message: 'Resource not found',
      statusCode: 404,
    }
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    error = {
      message: 'Duplicate field value entered',
      statusCode: 400,
    }
  }

  // Mongoose validation error
  if (err.name === 'ValidationError' && err.errors) {
    const messages = Object.values(err.errors).map((val) => val.message)
    error = {
      message: messages.join(', '),
      statusCode: 400,
    }
  }

  res.status(error.statusCode).json({
    success: false,
    error: error.message,
  })
}

export default errorHandler
