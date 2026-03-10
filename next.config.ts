import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "cms.1ftt.com",
      },
      {
        protocol: "https",
        hostname: "cms.1ftt.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        // Proxy ALL CMS API calls through Next.js to avoid CORS
        source: "/api/:path*",
        destination: "https://cms.1ftt.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
