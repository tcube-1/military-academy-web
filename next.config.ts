import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  allowedDevOrigins: ['192.168.1.*', '*.trycloudflare.com', 'localhost'],
};

export default nextConfig;
