import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: "https", hostname: "dsreventplanner.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
      { protocol: "http", hostname: "117.252.16.132" },
    ],
  },



  async rewrites() {
    if (process.env.VERCEL) {
      return {
        beforeFiles: [
          {
            source: "/uploads/:path*",
            destination: "http://117.252.16.132:3000/uploads/:path*",
          },
          {
            source: "/api/media",
            destination: "http://117.252.16.132:3000/api/media",
          },
          {
            source: "/api/media/:path*",
            destination: "http://117.252.16.132:3000/api/media/:path*",
          },
          {
            source: "/api/categories",
            destination: "http://117.252.16.132:3000/api/categories",
          },
          {
            source: "/api/categories/:path*",
            destination: "http://117.252.16.132:3000/api/categories/:path*",
          },
        ],
        afterFiles: [],
        fallback: []
      };
    }
    return [];
  },

  // Disable x-powered-by header
  poweredByHeader: false,
  // Enable compression
  compress: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb',
    },
  },
};

export default nextConfig;
