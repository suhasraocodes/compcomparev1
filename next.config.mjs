/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "assets.aceternity.com",
      "encrypted-tbn0.gstatic.com",
      "assets.leetcode.com",
      "cdn.codechef.com", // Add this line
    ],
  },
};

export default nextConfig;
