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
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**', // All GitHub avatar paths allow chestundi
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        pathname: '/**', // JSDelivr CDN images allow chestundi
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        pathname: '/**', // JSDelivr CDN images allow chestundi
      },
    ],
  },
};

export default bundleAnalyzer(nextConfig);
