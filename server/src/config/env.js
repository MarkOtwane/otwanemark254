import dotenv from 'dotenv';
dotenv.config({ quiet: true });

export const ENV = {
  PORT: process.env.PORT || 5000,
  DATABASE_URL: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/portfolio',
  JWT_SECRET: process.env.JWT_SECRET || 'change-me-in-production',
  JWT_EXPIRES: process.env.JWT_EXPIRES || '7d',
  NODE_ENV: process.env.NODE_ENV || 'development',
};
