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
    // Only redirect if we are NOT already on the VPS
    // Vercel sets specific environment variables, so we can conditionally apply this
    if (process.env.VERCEL) {
      return [
        {
          source: "/admin/:path*",
          destination: "http://117.252.16.132:3000/admin/:path*",
          permanent: false,
        },
      ];
    }
    return [];
  },

  async rewrites() {
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
