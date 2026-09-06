import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  allowedDevOrigins: ['maxima.bromn.biz.id'],
};

export default nextConfig;
