import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
     remotePatterns: [
      {
        protocol: "https",
        hostname: "dsiwprmwzkvgdcdhzhwa.supabase.co",
      },
    ],
    domains: ['dsiwprmwzkvgdcdhzhwa.supabase.co'], // allow images from Supabase
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
