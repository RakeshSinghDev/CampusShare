const path = require('path');
const dotenv = require('dotenv');

// 1. Initialize environment variables BEFORE any application module imports (ACS Logger Configured)
dotenv.config({ path: path.resolve(process.cwd(), '.env'), override: true });
dotenv.config({ path: path.resolve(__dirname, '../.env'), override: true });
dotenv.config({ path: path.resolve(__dirname, '../../.env'), override: true });

const app = require('./app');
const config = require('./config/env');
const { connectDatabase, disconnectDatabase } = require('./config/database');
const { syncDatabaseIndexes } = require('./database/indexes');
const { seedDatabase } = require('./database/seed');

let server;

// Handle Uncaught Exceptions
process.on('uncaughtException', (err) => {
  console.error('[Process] Uncaught Exception:', err.message);
  process.exit(1);
});

async function startServer() {
  try {
    // 2. Connect MongoDB first
    await connectDatabase();
    await syncDatabaseIndexes().catch(() => {});
    await seedDatabase().catch(() => {});

    // 3. Start HTTP Server Listener after database connection is ready
    server = app.listen(config.port, () => {
      console.log(
        `[Server] CampusShare Backend API running in [${config.nodeEnv}] mode on port ${config.port}`
      );
      console.log(`[Server] Health check available at: http://localhost:${config.port}/api/v1/health`);
    });
  } catch (err) {
    console.error('[Server] Failed to start backend server:', err.message);
    process.exit(1);
  }
}

// Handle Unhandled Rejections
process.on('unhandledRejection', (err) => {
  console.error('[Process] Unhandled Rejection:', err.message);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// Handle Shutdown Signals
const gracefulShutdown = async (signal) => {
  console.log(`[Process] Received ${signal}. Starting graceful shutdown...`);
  if (server) {
    server.close(async () => {
      console.log('[Server] HTTP server closed.');
      await disconnectDatabase();
      process.exit(0);
    });
  } else {
    await disconnectDatabase();
    process.exit(0);
  }
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

startServer();
