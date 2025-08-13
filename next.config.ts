import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['rickandmortyapi.com'],
  },
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;