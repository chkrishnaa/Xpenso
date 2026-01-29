# Xpenso

Xpenso is a full-stack expense tracking application designed to help users manage their personal finances in a structured and intuitive manner. It enables users to record income from multiple sources and track expenses across various categories, ensuring all financial activities are well organized and easy to review. By maintaining detailed records, users gain better control over their day-to-day spending and overall financial flow.

The application features an interactive dashboard that presents financial data through visually appealing charts and graphs. These visual representations display income, expenses, and current balance, allowing users to quickly identify spending patterns, compare trends over time, and understand their financial health at a glance without manual calculations.

Built using the MERN stack and styled with Tailwind CSS, Xpenso offers a modern, responsive, and seamless user experience. The frontend is optimized for usability and clarity, while the backend efficiently handles data storage, retrieval, and processing to ensure smooth performance across devices.

Secure authentication mechanisms protect user data and provide personalized access to financial records. With a strong focus on clarity, security, and usability, Xpenso empowers users to make informed financial decisions, plan budgets more effectively, and build healthier financial habits over time.

## Features

- 🔐 **Authentication**: Local authentication with email verification + Google OAuth
- 💰 **Expense & Income Tracking**: Add, view, and manage your financial transactions
- 📊 **Dashboard**: Visual analytics with charts and financial overview
- 🌙 **Dark/Light Mode**: Toggle between themes
- 📱 **Responsive Design**: Works seamlessly on all devices
- 📤 **Export Data**: Export your transactions to Excel

## Tech Stack

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- Passport.js for OAuth
- JWT for authentication
- Cloudinary for image storage
- Nodemailer for email services

### Frontend
- React 19
- Vite
- Tailwind CSS
- Recharts for data visualization
- Framer Motion for animations
- React Router for navigation

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)
- Google Cloud Console account (for OAuth)
- Cloudinary account (for image uploads)
- SMTP service (e.g., Brevo/SendGrid)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `backend` directory (use `env.example` as reference):
```env
PORT=your_port
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
SMTP_HOST=your_smtp_host
SMTP_PORT=smtp_port_number
SMTP_USERNAME=your_smtp_username
SMTP_PASSWORD=your_smtp_password
SENDER_EMAIL=your_email@example.com
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:xxxx/api/v1/auth/google/callback
```

4. Start the development server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `frontend` directory (use `env.example` as reference):
```env
VITE_BACKEND_URL=http://localhost:xxxx
```

4. Start the development server:
```bash
npm run dev
```

## Deployment Guide

### ⚠️ CRITICAL: Google OAuth Configuration

When deploying to production, you **MUST** configure Google OAuth correctly:

#### Step 1: Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** > **Credentials**
3. Edit your OAuth 2.0 Client ID
4. Add **BOTH** callback URLs to **Authorized redirect URIs**:
   - **Local Development**: `http://localhost:xxxx/api/v1/auth/google/callback`
   - **Production**: `https://your-backend-url.onrender.com/api/v1/auth/google/callback`

#### Step 2: Backend Environment Variables (Render)

In your Render dashboard, set these environment variables:

```env
PORT=your_port
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=https://your-frontend-url.vercel.app
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
SMTP_HOST=your_smtp_host
SMTP_PORT=smtp_port_number
SMTP_USERNAME=your_smtp_username
SMTP_PASSWORD=your_smtp_password
SENDER_EMAIL=your_email@example.com
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://your-backend-url.onrender.com/api/v1/auth/google/callback

//You can use any other domain instead Render
```

**⚠️ IMPORTANT**: Replace `your-backend-url.onrender.com` with your actual Render backend URL!

#### Step 3: Frontend Environment Variables (Vercel)

In your Vercel dashboard, set this environment variable:

```env
VITE_BACKEND_URL=https://your-backend-url.onrender.com
```

**⚠️ IMPORTANT**: Replace `your-backend-url.onrender.com` with your actual Render backend URL!

### Common Deployment Issues

#### Issue: Google OAuth redirects to localhost in production

**Solution**: 
1. Check that `GOOGLE_CALLBACK_URL` in Render is set to your Render backend URL (not localhost)
2. Verify that both callback URLs are added in Google Cloud Console
3. Make sure `CLIENT_URL` in Render points to your Vercel frontend URL

#### Issue: CORS errors

**Solution**: 
- Ensure `CLIENT_URL` in backend matches your frontend URL exactly (including `https://`)

#### Issue: Frontend can't connect to backend

**Solution**:
- Verify `VITE_BACKEND_URL` in Vercel matches your Render backend URL
- Check that your Render backend is running and accessible
- Ensure CORS is properly configured in `server.js`

## Project Structure

```
xpenso/
├── backend/
│   ├── config/          # Database, Cloudinary, Passport configs
│   ├── controllers/     # Route controllers
│   ├── middleware/       # Auth and upload middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   └── server.js         # Express server entry point
│
└── frontend/
    ├── public/           # Static assets
    └── src/
        ├── components/   # React components
        ├── context/      # React Context providers
        ├── hooks/        # Custom React hooks
        ├── pages/        # Page components
        └── utils/        # Utility functions
