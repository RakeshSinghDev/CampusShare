# CampusShare

[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-v6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-v4-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status: Active Development](https://img.shields.io/badge/Status-Active_Development-blue.svg)]()

CampusShare is a student-focused marketplace for buying, selling, renting, and exchanging academic resources within a verified campus community. It enables students to trade course textbooks, graphing calculators, lab equipment, and campus electronics safely and affordably.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Architecture & Structure](#project-architecture--structure)
- [Local Development Setup](#local-development-setup)
- [REST API Reference](#rest-api-reference)
- [Environment Configuration](#environment-configuration)
- [Security & Best Practices](#security--best-practices)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

### Problem Solved
University textbooks and specialized academic gear (calculators, lab coats, hardware tools) are expensive when purchased new, yet often used for only a single semester. CampusShare provides a peer-to-peer marketplace designed specifically for students to monetize past course materials and rent or purchase required gear from peers at affordable rates.

### Target Audience
Verified college and university students seeking safe, local, in-person academic resource exchanges on campus.

### Main User Workflow
1. **Authentication**: Sign in using a verified student Google account or email credentials.
2. **Browse & Search**: Search resources by subject code, category, condition, campus location, or rental status.
3. **List & Upload**: Publish an academic listing in under 2 minutes with multi-photo uploads, pricing options (outright sale, weekly/semester rental), and campus pickup spots.
4. **Peer Messaging**: Chat directly with sellers/renters to coordinate in-person campus handoffs.
5. **Rental Management**: Track active rentals, return due dates, and refundable security deposits.

---

## Key Features

- **Student Identity & Verification**: Verified student badges grounded in campus email domain rules and Firebase Authentication.
- **Academic Resource Marketplace**: Specialized categories for Textbooks, Calculators, Lab Equipment, Electronics, and Semester Bundles.
- **Dual Transaction Modes**: Support for outright purchasing (`Buy`), short-term lending (`Rent`), or offering both options on a single listing.
- **Indian Rupee Currency System (INR / ₹)**: Standardized `₹` price rendering across listings, rentals, checkout summaries, and chat product context.
- **Listing Creation Wizard**: 5-step workflow featuring photo upload dropzones, condition selection cards, custom pricing, and campus pickup locations.
- **Real-Time Student Messaging**: In-app messaging contextualized by listing details to coordinate safe campus handoffs.
- **Instant Search & Autocomplete**: Real-time keyword debounced search with autocomplete suggestions, active removable filter chips, and sorting controls.
- **Wishlist & Saved Items**: Save favorite resources to personal wishlist for quick access.
- **Account & Privacy Settings**: Profile management, campus notifications, security controls, and session sign-out.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | React 18, Vite 6 |
| **Routing & Navigation** | React Router 6 |
| **State & Data Fetching** | TanStack React Query 5, Custom Hooks |
| **Styling & UI Components** | Tailwind CSS 3, Radix UI primitives, Lucide React icons, Sonner toasts |
| **Form & Validation** | React Hook Form, Zod schemas |
| **Backend Framework** | Node.js, Express 4 |
| **Database & ODM** | MongoDB Atlas, Mongoose 8 |
| **Authentication** | Firebase Authentication (Google OAuth), JWT (`jsonwebtoken`), `bcryptjs` |
| **Image Upload & Storage** | Multer multipart middleware (static storage under `/uploads`) |
| **Security & Middleware** | Helmet, CORS, Express Rate Limit, Cookie Parser |

---

## Project Architecture & Structure

```text
CampusShare/
├── client/                      # React + Vite Frontend Client
│   ├── public/                  # Static web assets
│   ├── src/
│   │   ├── components/          # Reusable UI elements, headers, forms, product cards
│   │   ├── constants/           # Categories, navigation, listing constants
│   │   ├── controllers/         # Client-side API orchestration controllers
│   │   ├── data/                # Mock fallback datasets
│   │   ├── hooks/               # Custom React hooks (useAuth, useChat, useWishlist, useDebounce)
│   │   ├── lib/                 # Utility functions, currency formatters (INR ₹), Firebase client
│   │   ├── models/              # Frontend domain models
│   │   ├── pages/               # Page views (Auth, Chats, Product, Profile, Rentals, Sell, Settings, Wishlist)
│   │   ├── routes/              # App router & ProtectedRoute guards
│   │   ├── schemas/             # Client Zod validation schemas
│   │   ├── services/            # Axios API client & endpoints (apiClient, chatService, listingService)
│   │   └── views/               # Core application views (HomeView, SearchView, ProductDetailsView, SellView)
│   ├── index.html               # Main HTML entrypoint
│   ├── package.json             # Frontend client dependencies & scripts
│   ├── tailwind.config.js       # Tailwind CSS design tokens
│   └── vite.config.js           # Vite bundler configuration
│
├── server/                      # Node.js + Express Backend API Server
│   ├── src/
│   │   ├── config/              # Environment variables & database configuration
│   │   ├── controllers/         # API endpoint controllers (auth, listing, search, conversation)
│   │   ├── database/            # MongoDB connection & category seed scripts
│   │   ├── middleware/          # Auth verification, Zod validation, Multer upload, rate limiting
│   │   ├── models/              # Mongoose database schemas (User, Listing, Category, Conversation, Message)
│   │   ├── modules/             # Modular routes & controllers (conversations)
│   │   ├── routes/              # Express API router definitions
│   │   ├── utils/               # Response formatters & API errors
│   │   ├── validators/          # Server Zod validation schemas
│   │   ├── app.js               # Express application initialization
│   │   └── server.js            # Node server listener entrypoint
│   ├── uploads/                 # Static uploaded image directory
│   └── package.json             # Backend server dependencies & scripts
│
├── .env.example                 # Root environment variable template
├── .gitignore                    # Git repository ignore rules
└── README.md                    # Project documentation
```

---

## Local Development Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB Atlas Account** (or local MongoDB instance)

### Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/CampusShare.git
   cd CampusShare
   ```

2. **Install Dependencies**:
   ```bash
   # Install root dependencies
   npm install

   # Install client dependencies
   npm --prefix client install

   # Install server dependencies
   npm --prefix server install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env` in the root or `server/` directory, and `client/.env.example` to `client/.env`.

   - **Root / Server (`.env`)**:
     ```env
     PORT=5000
     NODE_ENV=development
     CLIENT_URL=http://localhost:5173
     MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/campusshare?retryWrites=true&w=majority
     JWT_ACCESS_SECRET=your_jwt_access_secret
     JWT_REFRESH_SECRET=your_jwt_refresh_secret
     ALLOWED_STUDENT_EMAIL_DOMAINS=gmail.com,kuk.ac.in,edu
     ```

   - **Client (`client/.env`)**:
     ```env
     VITE_API_URL=http://localhost:5000/api/v1
     VITE_FIREBASE_API_KEY=your_firebase_api_key
     VITE_FIREBASE_AUTH_DOMAIN=campusshare-701ad.firebaseapp.com
     VITE_FIREBASE_PROJECT_ID=campusshare-701ad
     ```

4. **Seed Database Categories** (Optional initial seed):
   ```bash
   npm run seed
   ```

5. **Start Development Servers**:
   ```bash
   # Start Frontend Client on http://localhost:5173
   npm run client

   # In a separate terminal window, start Backend API Server on http://localhost:5000
   npm run server
   ```

---

## REST API Reference

Base Endpoint: `http://localhost:5000/api/v1`

### Authentication (`/auth`)
- `POST /api/v1/auth/register` — Register a new student account
- `POST /api/v1/auth/login` — Sign in with email & password credentials
- `POST /api/v1/auth/firebase` — Authenticate using Firebase ID Token (Google OAuth)
- `GET /api/v1/auth/me` — Fetch currently authenticated user session
- `POST /api/v1/auth/logout` — Sign out current session

### Resource Listings (`/listings`)
- `GET /api/v1/listings` — Fetch paginated listings with search & category filters
- `GET /api/v1/listings/:id` — Fetch single listing details
- `POST /api/v1/listings` — Create a new listing (Protected & Verified Student required)
- `POST /api/v1/listings/upload-images` — Upload listing photos via Multer
- `PATCH /api/v1/listings/:id` — Update listing details
- `DELETE /api/v1/listings/:id` — Remove listing

### Categories & Search (`/categories`, `/search`)
- `GET /api/v1/categories` — List all academic categories
- `GET /api/v1/search/suggestions` — Fetch live autocomplete search query suggestions

### Conversations & Messages (`/conversations`)
- `GET /api/v1/conversations` — Fetch user active conversations
- `POST /api/v1/conversations/start` — Initiate a conversation with seller for a listing
- `GET /api/v1/conversations/:id` — Fetch message history for a conversation
- `POST /api/v1/conversations/:id/messages` — Send a chat message

---

## Security & Best Practices

- **Environment Secrets**: All sensitive keys, database URIs, and JWT signing secrets reside strictly inside `.env` files and are ignored by Git.
- **Token Verification**: Protected backend endpoints enforce JWT Bearer token authorization (`Authorization: Bearer <token>`).
- **Input Validation**: Client & server parameters are strictly validated using Zod schemas.

---

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Project Status

**Status**: Active development
