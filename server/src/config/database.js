const mongoose = require('mongoose');
const config = require('./env');

/**
 * Connect to MongoDB Atlas database via Mongoose asynchronously
 */
const connectDatabase = async () => {
  const uri = process.env.MONGODB_URI || config.mongoUri;

  const isConfigured = Boolean(uri && typeof uri === 'string' && uri.trim() !== '');
  console.log('[Database] MONGODB_URI configured:', isConfigured);

  if (!isConfigured) {
    console.error('[Database] Error: MONGODB_URI is not configured in .env file or environment variables.');
    throw new Error('MONGODB_URI is not configured');
  }

  console.log('[Database] Connecting to MongoDB Atlas...');

  try {
    const conn = await mongoose.connect(uri.trim(), {
      serverSelectionTimeoutMS: 30000, // 30s timeout for seed-list replica discovery
    });

    console.log('[Database] MongoDB connected successfully.');

    mongoose.connection.on('error', (err) => {
      console.error('[Database] MongoDB connection error event:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('[Database] MongoDB connection disconnected.');
    });

    return conn;
  } catch (error) {
    console.error(`[Database] MongoDB connection error: ${error.message}`);
    throw error;
  }
};

/**
 * Gracefully close database connection
 */
const disconnectDatabase = async () => {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log('[Database] MongoDB connection closed gracefully.');
    }
  } catch (error) {
    console.error('[Database] Error closing MongoDB connection:', error.message);
  }
};

module.exports = {
  connectDatabase,
  disconnectDatabase,
};
