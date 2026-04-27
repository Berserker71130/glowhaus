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
  // This bypasses the strict TypeScript checks during Vercel's build phase
  typescript: {
    ignoreBuildErrors: true,
  },
  // This bypasses the ESLint checks during Vercel's build phase
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
