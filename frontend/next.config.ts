import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  basePath: "/zealthy-exercise",
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
