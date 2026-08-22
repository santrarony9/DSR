import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // VPS standalone output for self-hosting
  output: "standalone",

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Disable x-powered-by header
  poweredByHeader: false,

  // Enable compression
  compress: true,
};

export default nextConfig;
