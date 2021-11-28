import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '.env' });

export const config = {
  jwt_secret: process.env.JWT_SECRET,
};
