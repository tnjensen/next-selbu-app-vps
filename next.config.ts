import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wp.selbu.tnjensen.no",
      },
    ],
  },
};

export default nextConfig;
