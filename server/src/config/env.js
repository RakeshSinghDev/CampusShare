const path = require('path');
const dotenv = require('dotenv');

// Explicitly load environment variables from current process directory or relative paths
dotenv.config({ path: path.resolve(process.cwd(), '.env'), override: true });
dotenv.config({ path: path.resolve(__dirname, '../../.env'), override: true });
dotenv.config({ path: path.resolve(__dirname, '../../../.env'), override: true });

const rawMongoUri = process.env.MONGODB_URI;
const mongoUri = typeof rawMongoUri === 'string' ? rawMongoUri.trim() : '';

const rawDomains = process.env.ALLOWED_EMAIL_DOMAINS || process.env.ALLOWED_STUDENT_EMAIL_DOMAINS || '';
const allowedStudentEmailDomains = rawDomains
  .split(',')
  .map((d) => d.trim().toLowerCase())
  .filter(Boolean);

const isDomainAllowed = (email) => {
  if (!email || typeof email !== 'string') return false;
  const domain = email.toLowerCase().split('@')[1] || '';
  if (!allowedStudentEmailDomains.length) return true; // Default allow all if empty
  return allowedStudentEmailDomains.some(
    (d) =>
      d === '*' ||
      d === 'all' ||
      d === domain ||
      domain.endsWith('.' + d)
  );
};

const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: mongoUri,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || 'fallback_access_secret_campusshare_2026',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret_campusshare_2026',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  allowedStudentEmailDomains: allowedStudentEmailDomains,
  isDomainAllowed: isDomainAllowed,
  isProduction: process.env.NODE_ENV === 'production',
};

module.exports = config;
