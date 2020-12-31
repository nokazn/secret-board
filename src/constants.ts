import dotenv from 'dotenv';

dotenv.config();

export const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE, SALT } = process.env as Record<
  string,
  string
>;
export const TRACKING_COOKIE_ID = 'tracking_id';

export const checkConfig = () => {
  if ([DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE, SALT].some((v) => v == null)) {
    throw new Error('Environment variables are not set correctly.');
  }
};
