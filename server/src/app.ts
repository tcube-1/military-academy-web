import { correlationIdMiddleware } from './middleware/correlationId';
import { errorHandler, notFoundHandler } from './middleware/error';
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { v1Router } from "./routes/v1";
import { toNodeHandler } from 'better-auth/node';
import { auth } from './modules/auth/auth';



const app = express();
app.set('trust proxy', true);
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
);
app.use(
  cors({
    origin: [ 'https://dev.sphereline.in', 'https://sphereline.in','http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
    exposedHeaders: ['Set-Cookie'],
  }),
);

app.all('/api/auth/*splat', toNodeHandler(auth));

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is missing');
}

const parsedUrl = new URL(databaseUrl);

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
export { app };


// // 404 Handler
// app.use(notFoundHandler);

// // Global Error Handler
// app.use(errorHandler);
