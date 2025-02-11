/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "assets.aceternity.com",
      "encrypted-tbn0.gstatic.com",
      "assets.leetcode.com",
      "cdn.codechef.com",
      "ui-avatars.com", // Added this line
      "your-new-domain.com", // Add any additional domains here
    ],
    deviceSizes: [640, 768, 1024, 1280, 1600], // Optional: Define responsive image sizes
    formats: ["image/avif", "image/webp"], // Optional: Optimize images
  },
  reactStrictMode: true, // Ensures better debugging
  experimental: {
    appDir: true, // Enable experimental features (optional)
  },
};

export default nextConfig;
