import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.sphereline.in',
  trustedOrigins: [
    'http://localhost:3000',
    'https://dev.sphereline.in',
    'https://sphereline.in',
  ],
});

export const { signIn, signUp, signOut, useSession } = authClient;
