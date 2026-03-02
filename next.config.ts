import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/login",
        destination: "http://cms.1ftt.com/api/login",
      },
    ];
  },
};

export default nextConfig;
