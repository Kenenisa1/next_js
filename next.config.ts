import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', 
      }
    ]
  },
  experimental: {
    turbopackFileSystemCacheForDev: true
  }
};

export default nextConfig;