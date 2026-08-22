import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "open-ena.com" }],
        destination: "https://www.open-ena.com/:path*",
        permanent: true,
      },
      {
        source: "/open-ena",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
