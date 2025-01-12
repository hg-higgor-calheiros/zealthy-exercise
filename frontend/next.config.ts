import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/zealthy-exercise",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
