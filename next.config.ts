import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";


const nextConfig: NextConfig = {
	turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
};

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development", // Disable caching in local development
  additionalPrecacheEntries: [
    { url: '/', revision: null },
    { url: '/car-canvas', revision: null },
    { url: '/About', revision: null },
  ],
});

export default withSerwist(nextConfig);