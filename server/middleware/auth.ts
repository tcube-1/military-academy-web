import { ExpressAuth } from "@auth/express";

// Basic Auth setup - will be expanded with actual providers and DB adapter
export const authMiddleware = ExpressAuth({
  providers: [],
  secret: process.env.AUTH_SECRET,
  trustHost: true,
});

export const requireAuth = (req: any, res: any, next: any) => {
  // To be implemented using @auth/express session check
  const session = res.locals.session;
  if (!session) {
    return res.status(401).json({ code: 401, message: "Unauthorized" });
  }
  next();
};
