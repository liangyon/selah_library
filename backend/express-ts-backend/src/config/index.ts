// src/config/index.ts

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

export const config = {
  jwtSecret: process.env.JWT_SECRET || 'your_fallback_secret_key_for_development', // Use environment variable in production
  jwtExpiry: process.env.JWT_EXPIRY || '24h',
  port: process.env.PORT || 3001,
  environment: process.env.NODE_ENV || 'development',
  dbConfig: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'your_db_name'
  }
};