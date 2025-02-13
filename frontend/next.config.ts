import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/zealthy-exercise",
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;