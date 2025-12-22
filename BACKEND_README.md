# Marketing Agency Backend

This folder contains the Express.js backend API for the Marketing Agency website.

## Structure

```
├── config/           # Configuration files
│   └── database.js   # MongoDB connection
├── controllers/      # Request handlers
│   ├── contactController.js
│   └── newsletterController.js
├── middleware/       # Custom middleware
│   ├── cors.js
│   ├── errorHandler.js
│   └── validation.js
├── models/          # Database models
│   ├── Contact.js
│   └── Newsletter.js
├── routes/          # API routes
│   ├── contact.js
│   └── newsletter.js
├── utils/           # Utility functions
│   └── emailService.js
└── server.js        # Entry point
```

## Setup

1. Install backend dependencies:

```bash
npm install express mongoose dotenv cors nodemailer
npm install -D nodemon
```

2. Configure environment variables in `.env.local`:

```
BACKEND_PORT=5000
MONGODB_URI=mongodb://localhost:27017/marketing_agency
FRONTEND_URL=http://localhost:3000
# Add email configuration
```

3. Start the backend server:

```bash
node server.js
# or for development with auto-reload
npx nodemon server.js
```

## API Endpoints

### Contact Form

- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)

### Newsletter

- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `POST /api/newsletter/unsubscribe` - Unsubscribe from newsletter
- `GET /api/newsletter` - Get all subscribers (admin)

### Health Check

- `GET /api/health` - Check server status

## Notes

- All paths are configured to work from the frontend folder
- The backend runs on port 5000 by default
- CORS is configured to allow requests from the Next.js frontend (port 3000)
