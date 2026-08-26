import express from "express";
import helmet from "helmet";
import cors from "cors";
import { v1Router } from "./routes/v1";
import { errorHandler, notFoundHandler } from "./middleware/error";
import { correlationIdMiddleware } from "./middleware/correlationId";
import { env } from "./config/env";

const app = express();

// Basic rate limiting foundation - can be expanded with express-rate-limit later
// Structured request logging foundation - can be expanded with morgan or pino

app.use(correlationIdMiddleware);

// Security headers
app.use(helmet());

// Cross-origin resource sharing
app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  })
);

// Body parsers with size limit
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// API Routes
app.use("/api/v1", v1Router);

// 404 Handler
app.use(notFoundHandler);

// Global Error Handler
app.use(errorHandler);

export { app };
