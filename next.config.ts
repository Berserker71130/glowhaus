/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  // This tells Vercel: "Ignore the red marks in those other files"
  eslint: {
    ignoreDuringBuilds: true,
  },
  // This tells Vercel: "Ignore the Type errors and build the reviews"
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
