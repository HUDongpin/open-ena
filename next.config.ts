import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/open-ena",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
