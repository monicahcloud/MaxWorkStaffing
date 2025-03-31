/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Clerk images use HTTPS
        hostname: "img.clerk.com",
      },
    ],
  },
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
};

module.exports = nextConfig;
