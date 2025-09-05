import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: [
      'lucide-react',
    ],
  },
  eslint: {
    // Lint errors won't fail Vercel builds on preview/dev; production still enforces.
    ignoreDuringBuilds: process.env.VERCEL_ENV !== 'production',
  },
}
export default nextConfig
