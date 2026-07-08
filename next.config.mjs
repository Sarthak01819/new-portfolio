/** @type {import('next').NextConfig} */
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === "true" });

/**
 * Next 16 uses Turbopack by default. Avoid unsupported keys
 * and provide an empty `turbopack` config to silence warnings
 * when a webpack-based plugin is used (bundle-analyzer).
 */
const nextConfig = withBundleAnalyzer({
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizeCss: true,
  },
  // Keep an explicit (empty) turbopack config to indicate
  // we are aware Turbopack is in use and avoid the error.
  turbopack: {},
  // Allow requests from common local origins during development to avoid cross-origin warnings
  allowedDevOrigins: [
    "http://127.0.0.1:5173",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "http://127.0.0.1",
    "http://localhost",
    "http://[::1]",
  ],
});

export default nextConfig;
