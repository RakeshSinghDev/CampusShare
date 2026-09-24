const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');

const config = require('./config/env');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const { sendResponse } = require('./utils/response');

// Refactored Architecture Routes
const authRoutes = require('./routes/authRoutes');
const samlRoutes = require('./routes/samlRoutes');
const userRoutes = require('./routes/userRoutes');
const listingRoutes = require('./routes/listingRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const searchRoutes = require('./routes/searchRoutes');
const conversationRoutes = require('./modules/conversations/conversation.routes');

const app = express();

// 1. Helmet Security Middleware (Configure CORP for static image access)
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

// 2. CORS Configuration (Support dev ports 3000 & 5173, production Vercel domain, plus CLIENT_URL env var)
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
  config.clientUrl,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        (typeof origin === 'string' && origin.endsWith('.vercel.app'))
      ) {
        callback(null, true);
      } else {
        callback(new Error('CORS Policy: Origin not allowed by CampusShare server'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// 3. Static Uploads Serving (http://localhost:5000/uploads/listings/filename)
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));

// 4. Rate Limiting (100 requests / 15 mins)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again later.',
    code: 'RATE_LIMIT_EXCEEDED',
  },
});
app.use('/api', limiter);

// 5. Request Body Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// 6. Health Check Endpoint
app.get('/api/v1/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatusMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  sendResponse(res, 200, {
    status: 'healthy',
    environment: config.nodeEnv,
    database: dbStatusMap[dbState] || 'unknown',
    timestamp: new Date().toISOString(),
  }, 'CampusShare API is running');
});

// 7. Mount Module API Routes
// SAML 2.0 Single Sign-On Routes (Supports PingFederate SP endpoints)
app.use('/api/auth/saml', samlRoutes);
app.use('/api/v1/auth/saml', samlRoutes);

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/listings', listingRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/search', searchRoutes);
app.use('/api/v1/conversations', conversationRoutes);

// 8. 404 Route Handler
app.use(notFound);

// 9. Centralized Error Handler
app.use(errorHandler);

module.exports = app;
