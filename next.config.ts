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

  async redirects() {
    // On Vercel, redirect ALL admin traffic to the VPS (port 80 via Nginx)
    // This ensures the same server renders the page AND handles API calls - no ID mismatch
    if (process.env.VERCEL) {
      return [
        {
          source: "/admin",
          destination: "http://117.252.16.132/admin",
          permanent: false,
        },
        {
          source: "/admin/:path*",
          destination: "http://117.252.16.132/admin/:path*",
          permanent: false,
        },
      ];
    }
    return [];
  },

  async rewrites() {
    // Always proxy /uploads/* to the VPS so images load on both Vercel and VPS
    return [
      {
        source: "/uploads/:path*",
        destination: "http://117.252.16.132:3000/uploads/:path*",
      },
    ];
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
