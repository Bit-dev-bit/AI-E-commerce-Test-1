# MERN E-Commerce Platform

A production-quality full-stack e-commerce web application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features
- Full-featured shopping cart & checkout process
- User authentication & authorization (JWT)
- Product browsing, searching, filtering, and pagination
- Product reviews and ratings
- User profile & order history
- Admin dashboard for managing products, orders, and users
- Secure payment integration architecture (Razorpay ready)
- Responsive, modern UI using Tailwind CSS and Shadcn UI

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, Redux Toolkit, React Router, Lucide Icons
- **Backend:** Node.js, Express, Mongoose, JWT, bcrypt, Helmet, CORS
- **Database:** MongoDB Atlas

## Local Development Setup

### 1. Prerequisites
- Node.js (v18+)
- MongoDB Atlas cluster (or local MongoDB)

### 2. Install Dependencies
In the root directory, run:
```bash
npm install
npm install --prefix client
```

### 3. Environment Variables
Create a `.env` file in the `server` directory:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5174
```

Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://127.0.0.1:5000/api
```

### 4. Data Seeding
To populate the database with sample products and an admin user, run:
```bash
npm run data:import
```
*Note: Admin login is `admin@example.com` / `123456`*

### 5. Run the Application
Run both frontend and backend concurrently:
```bash
npm run dev
```

## Deployment Architecture

This application is designed to be deployed with separated frontend and backend services.

### Frontend Deployment (Vercel / Netlify)
1. Connect your repository to Vercel or Netlify.
2. Set the Framework Preset to **Vite**.
3. Build Command: `npm run build` (or `npm run build --prefix client` depending on root config).
4. Output Directory: `client/dist`.
5. Environment Variables:
   - `VITE_API_URL`: Your deployed Render backend URL (e.g., `https://your-api.onrender.com/api`).

### Backend Deployment (Render)
1. Create a new Web Service on Render.
2. Connect your repository.
3. Build Command: `npm install`
4. Start Command: `npm run start`
5. Environment Variables:
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: Your production MongoDB URI.
   - `JWT_SECRET`: A strong secret key.
   - `CLIENT_URL`: Your deployed Vercel/Netlify URL (for CORS).

### Database (MongoDB Atlas)
1. Ensure your cluster Network Access allows connections from Render's IP addresses (or allow all `0.0.0.0/0`).

## Architecture & Security
- **Data Integrity:** Pricing, cart totals, and stock validation are strictly handled on the backend.
- **Authentication:** HTTP-only cookies can be configured, or secure JWT headers are utilized for API requests.
- **Routing:** Frontend routing is protected by Redux state; Backend routes are protected by Express middleware.
