import dotenv from 'dotenv';

// loading all environment variable..
dotenv.config();

// exporting port
export const PORT=process.env.PORT;

// exporting mongodb url
export const MONGODB_URL=process.env.MONGODB_URL;


// Exporting JWT secret key from environment variables
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;