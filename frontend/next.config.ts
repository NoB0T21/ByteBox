import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
     remotePatterns: [
      {
        protocol: "https",
        hostname: "dsiwprmwzkvgdcdhzhwa.supabase.co",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      }
    ],
    domains: ['dsiwprmwzkvgdcdhzhwa.supabase.co','lh3.googleusercontent.com'], // allow images from Supabase
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "100MB",
    },
  },
};

export default nextConfig;
