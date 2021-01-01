import dotenv from 'dotenv';

dotenv.config();

export const {
  PORT,
  DB_URL,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  SALT,
} = process.env as Record<string, string>;
export const TRACKING_COOKIE_ID = 'tracking_id';

export const checkConfig = () => {
  const isInvalidInDevelopment =
    DB_URL == null &&
    [DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE, SALT].some((v) => v == null);
  const isInvalidInProduction = DB_URL != null && [PORT, SALT].some((v) => v == null);
  if (isInvalidInDevelopment || isInvalidInProduction) {
    throw new Error('Environment variables are not set correctly.');
  }
};
