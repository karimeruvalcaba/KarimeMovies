import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["image.tmdb.org"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
