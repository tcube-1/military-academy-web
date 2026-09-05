import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { db } from '../../database/db.js';
import { betterAuth } from 'better-auth';
import * as schema from '../../database/schema/index.js';

const isLiveOrProd: boolean =
  process.env.NODE_ENV === 'production' ||
  (process.env.BETTER_AUTH_URL?.startsWith('https') ?? false);


const cookieDomain: string = process.env.COOKIE_DOMAIN || '.sphereline.in';

const rawTrustedOrigins: string[] =
  process.env.BETTER_AUTH_TRUSTED_ORIGINS
    ?.split(',')
    .map((origin: string) => origin.trim())
    .filter(Boolean) ?? [];

// Dynamic Trusted Origins with fallback
const trustedOrigins: string[] = Array.from(
  new Set([
    'http://localhost:3000',
    'http://localhost:5000',
    'https://dev.sphereline.in',
    'https://api.sphereline.in',
    'https://sphereline.in',
    ...rawTrustedOrigins,
  ]),
);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),

  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:5000',
  basePath: '/api/auth',
  secret: process.env.BETTER_AUTH_SECRET!,

  trustedOrigins,

  // Live lo crossSubdomain enable avtundi, local lo clean cookie untundi
  advanced: {
    crossSubDomainCookies: {
      enabled: Boolean(cookieDomain),
      ...(cookieDomain ? { domain: cookieDomain } : {}),
    },
    defaultCookieAttributes: {
      secure: true, // HTTPS lo true undali
      sameSite: 'none', // CRITICAL: Google redirect cookies ni block cheyakunda idi allow chesthundi
      partitioned: true, // Chrome CHIPS cookie partitioning support kosam
    },
    cookiePrefix: 'defence_proto',
  },
    account: {
    storeStateStrategy: 'database',
  },

  emailAndPassword: {
    enabled: true,
  },

  emailVerification: {
    autoSignInAfterVerification: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});