import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    turbopackFileSystemCacheForDev: false 
  },
  images: {
    // Keeping Cloudinary for when you eventually allow real photo uploads
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', 
      }
    ],
  },
};

export default nextConfig;