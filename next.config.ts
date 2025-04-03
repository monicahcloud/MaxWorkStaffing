/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Clerk images use HTTPS
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "oqzhjtzfxcjutd5r.public.blob.vercel-storage.com",
      },
    ],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
};

module.exports = nextConfig;
