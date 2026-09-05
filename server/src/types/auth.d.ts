import { DefaultSession } from "@auth/express";

// Auth.js built-in types ni extend chestunnam
declare module "@auth/express" {
  interface Session {
    user: {
      id: string;
      status?: string;
    } & DefaultSession["user"];
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    dbUserId?: string;
    status?: string;
  }
}