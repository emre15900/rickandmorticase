/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['rickandmortyapi.com'],
  },
  experimental: {
    typedRoutes: true,
  },
};

module.exports = nextConfig;