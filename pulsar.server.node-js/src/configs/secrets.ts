import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env')) {
    dotenv.config({ path: '.env' });
}
export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === 'production'; // Anything else is treated as 'dev'

export const MONGODB_URI = process.env['MONGODB_URI']!;

export const STREAM_SECRET_KEY = process.env['STREAM_SECRET_KEY'];
export const IDENTITY_URL = process.env['IDENTITY_URL']!;
export const STREAM_SERVER_URL = process.env['STREAM_SERVER_URL']!;
