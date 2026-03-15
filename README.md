# Ronak Fire Industries Employee Portal (MERN)

A production-ready, secure employee portal built with MERN stack.

## Tech Stack

- Frontend: React + Vite + Tailwind CSS + Axios
- Backend: Node.js + Express.js
- Database: MongoDB Atlas
- Authentication: JWT + bcrypt password hashing
- Security: Helmet, CORS policy, rate-limiting, validation
- Image Storage: Cloudinary

## Project Structure

```text
client/
  src/
    components/
    pages/
    dashboard/
    services/
    context/
    App.jsx

server/
  controllers/
  routes/
  models/
  middleware/
  config/
  utils/
  server.js
```

## Features

- Secure login page (JWT based)
- Protected dashboard routes
- Employee Details tab
- KYC Details tab (sensitive values masked in UI)
- CTC Structure / Payslip tab
- Payslip PDF download
- Seed script for 5 dummy employees and related records
- Environment-driven configuration

## API Routes

### Auth

- `POST /api/auth/login`

### Employee (Protected)

- `GET /api/employee/profile`
- `GET /api/employee/kyc`
- `GET /api/employee/salary`
- `GET /api/employee/payslip`

## Environment Variables

### Backend (`server/.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection
JWT_SECRET=your_super_secret_key
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (`client/.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

## Local Setup

### 1. Backend Setup

```bash
cd server
npm install
```

Create `.env` using `.env.example`.

Seed data:

```bash
npm run seed
```

Run backend:

```bash
npm run dev
```

### 2. Frontend Setup

```bash
cd client
npm install
```

Create `.env` using `.env.example`.

Run frontend:

```bash
npm run dev
```

## Dummy Employee Credentials

All use password: `password123`

- `emp101`
- `emp102`
- `emp103`
- `emp104`
- `emp105`

## Deployment Guide

### Deploy Backend (Render or Railway)

1. Push repository to GitHub.
2. Create a new Web Service (Render) or Project (Railway) from `server` directory.
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables from `server/.env.example`.
6. Whitelist deployed backend domain in MongoDB Atlas network access if needed.

### Deploy Frontend (Vercel)

1. Import repository in Vercel.
2. Set root directory to `client`.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Set `VITE_API_URL` to deployed backend URL, e.g.:
   `https://your-backend-domain.com/api`
6. Redeploy.

## Production Security Notes

- Keep `JWT_SECRET` long and random.
- Use HTTPS in production.
- Restrict `CLIENT_URL` and CORS origins.
- Never commit `.env` files.
- Rotate Cloudinary and JWT secrets periodically.

## Scripts

### Backend (`server/package.json`)

- `npm run dev` - Start backend in development with nodemon
- `npm start` - Start backend in production
- `npm run seed` - Seed dummy employee data

### Frontend (`client/package.json`)

- `npm run dev` - Start Vite development server
- `npm run build` - Build production frontend
- `npm run preview` - Preview production build
