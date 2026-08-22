import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  reactStrictMode: false,
  allowedDevOrigins: [
    '192.168.1.*',
    '*.trycloudflare.com',
    'localhost',
    'dev.sphereline.in',
  ],
};

export default bundleAnalyzer(nextConfig);
